"""Fantasy Draft Statistics stat-machine checkpoint.

Usage:
    from build_dashboard import build_multi
    build_multi([
        ("league1_draft.json", "league1_roster.json"),
        ("league2_draft.json", "league2_roster.json"),
    ], output="index.html")

Each pair is an ESPN mDraftDetail export and matching mRoster export.
Raw league/account exports are intentionally not committed to GitHub.
"""

import json
import statistics
from collections import defaultdict
from pathlib import Path

POS = {1: "QB", 2: "RB", 3: "WR", 4: "TE", 5: "K", 16: "D/ST"}
TEAM = {
    0:"FA",1:"ATL",2:"BUF",3:"CHI",4:"CIN",5:"CLE",6:"DAL",7:"DEN",8:"DET",9:"GB",10:"TEN",
    11:"IND",12:"KC",13:"LV",14:"LAR",15:"MIA",16:"MIN",17:"NE",18:"NO",19:"NYG",20:"NYJ",
    21:"PHI",22:"ARI",23:"PIT",24:"LAC",25:"SF",26:"SEA",27:"TB",28:"WSH",29:"CAR",30:"JAX",
    33:"BAL",34:"HOU"
}


def load_json(path):
    text = Path(path).read_text(encoding="utf-8").strip()
    if text.startswith("```"):
        text = text.strip("`").strip()
    return json.loads(text)


def build_multi(league_pairs, output="index.html"):
    records = []
    leagues = []
    global_players = {}

    for draft_path, roster_path in league_pairs:
        draft = load_json(draft_path)
        roster = load_json(roster_path)
        pmap = {}
        for team in roster.get("teams", []):
            for entry in team.get("roster", {}).get("entries", []):
                pl = entry.get("playerPoolEntry", {}).get("player", {})
                if pl.get("id") is not None:
                    pmap[pl["id"]] = pl
                    global_players[pl["id"]] = pl
        leagues.append((draft, pmap))

    for draft, pmap in leagues:
        pick_order = draft["settings"]["draftSettings"].get("pickOrder", [])
        slot_by_team = {team_id: i + 1 for i, team_id in enumerate(pick_order)}
        for p in draft["draftDetail"]["picks"]:
            pl = pmap.get(p["playerId"]) or global_players.get(p["playerId"], {})
            own = pl.get("ownership") or {}
            adp = own.get("averageDraftPosition")
            if not isinstance(adp, (int, float)) or adp >= 169.5:
                adp = None
            records.append({
                "league_id": draft["id"],
                "pick": p["overallPickNumber"],
                "round": p["roundId"],
                "round_pick": p["roundPickNumber"],
                "draft_slot": slot_by_team.get(p["teamId"], ""),
                "fantasy_team": p["teamId"],
                "player_id": p["playerId"],
                "player": pl.get("fullName", f"Player {p['playerId']}"),
                "nfl": TEAM.get(pl.get("proTeamId", 0), "FA"),
                "pos": POS.get(pl.get("defaultPositionId"), ""),
                "auto": bool(p.get("autoDraftTypeId", 0)),
                "espn_adp": adp,
                "vs_espn": p["overallPickNumber"] - adp if adp is not None else None,
            })

    by_player = defaultdict(list)
    for row in records:
        by_player[row["player_id"]].append(row)

    league_count = len(leagues)
    players = []
    for pid, rows in by_player.items():
        picks = [r["pick"] for r in rows]
        adps = [r["espn_adp"] for r in rows if r["espn_adp"] is not None]
        avg_pick = statistics.mean(picks)
        espn_adp = statistics.mean(adps) if adps else None
        reaches = sum(1 for r in rows if r["vs_espn"] is not None and r["vs_espn"] <= -5)
        fallers = sum(1 for r in rows if r["vs_espn"] is not None and r["vs_espn"] >= 5)
        base = rows[0]
        players.append({
            "player_id": pid,
            "player": base["player"],
            "nfl": base["nfl"],
            "pos": base["pos"],
            "drafts": len(rows),
            "drafted_pct": len(rows) / league_count * 100,
            "avg_pick": avg_pick,
            "median": statistics.median(picks),
            "earliest": min(picks),
            "latest": max(picks),
            "range": max(picks) - min(picks),
            "stdev": statistics.pstdev(picks) if len(picks) > 1 else 0.0,
            "espn_adp": espn_adp,
            "vs_espn": avg_pick - espn_adp if espn_adp is not None else None,
            "reach_rate": reaches / len(adps) * 100 if adps else None,
            "fall_rate": fallers / len(adps) * 100 if adps else None,
        })

    players.sort(key=lambda x: (x["avg_pick"], x["player"]))

    def fmt(v, digits=1, pct=False):
        if v is None:
            return "—"
        if pct:
            return f"{v:.0f}%"
        return f"{v:.{digits}f}"

    rows_html = []
    for p in players:
        delta = p["vs_espn"]
        tag = "Reach" if delta is not None and delta <= -5 else ("Fall" if delta is not None and delta >= 5 else "Near ADP")
        css = {"Reach":"reach", "Fall":"fall", "Near ADP":"near"}[tag]
        pid = p["player_id"]
        headshot = f"https://a.espncdn.com/i/headshots/nfl/players/full/{pid}.png"
        logo = f"https://a.espncdn.com/i/teamlogos/nfl/500/{p['nfl'].lower()}.png"
        rows_html.append(f'''<tr><td class="player"><img class="headshot" src="{headshot}" onerror="this.style.display='none'"><div><b>{p['player']}</b><br><img class="logo" src="{logo}" onerror="this.style.display='none'"> {p['nfl']} · {p['pos']}</div></td><td>{p['drafts']}</td><td>{fmt(p['drafted_pct'],0,True)}</td><td>{fmt(p['avg_pick'])}</td><td>{fmt(p['median'])}</td><td>{p['earliest']}</td><td>{p['latest']}</td><td>{p['range']}</td><td>{fmt(p['stdev'])}</td><td>{fmt(p['espn_adp'])}</td><td>{fmt(p['vs_espn'])}</td><td><span class="pill {css}">{tag}</span></td><td>{fmt(p['reach_rate'],0,True)}</td><td>{fmt(p['fall_rate'],0,True)}</td></tr>''')

    html = f'''<!doctype html><html><head><meta charset="utf-8"><title>Fantasy Draft Stat Machine</title><style>
body{{font-family:Arial,Helvetica,sans-serif;margin:0;background:#f6f7fb;color:#111827}}.wrap{{max-width:1500px;margin:auto;padding:24px}}.hero{{background:#0B1F3A;color:white;padding:24px;border-radius:14px;margin-bottom:18px}}.cards{{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;margin:16px 0}}.card{{background:white;padding:16px;border-radius:12px;box-shadow:0 1px 4px #0001}}.num{{font-size:26px;font-weight:700}}table{{width:100%;border-collapse:collapse;background:white}}th{{background:#0B1F3A;color:white;padding:9px;text-align:left;position:sticky;top:0}}td{{padding:8px 9px;border-bottom:1px solid #e5e7eb}}.player{{display:flex;align-items:center;gap:10px;min-width:250px}}.headshot{{width:42px;height:42px;object-fit:cover;border-radius:50%;background:#eef2f7}}.logo{{width:20px;height:20px;vertical-align:middle;object-fit:contain}}.pill{{padding:3px 8px;border-radius:999px;font-size:12px;font-weight:700}}.reach{{background:#fee2e2;color:#991b1b}}.fall{{background:#dcfce7;color:#166534}}.near{{background:#fef3c7;color:#92400e}}
</style></head><body><div class="wrap"><div class="hero"><h1>Fantasy Draft Statistics — Stat Machine</h1><div>{league_count} leagues · {len(records)} total selections</div></div><div class="cards"><div class="card">Leagues loaded<div class="num">{league_count}</div></div><div class="card">Total picks<div class="num">{len(records)}</div></div><div class="card">Unique players<div class="num">{len(players)}</div></div></div><h2>Master player statistics</h2><div style="overflow:auto;max-height:900px"><table><thead><tr><th>Player</th><th>Drafts</th><th>Drafted %</th><th>Avg Pick</th><th>Median</th><th>Earliest</th><th>Latest</th><th>Range</th><th>SD</th><th>ESPN ADP</th><th>Vs ESPN</th><th>Tag</th><th>Reach %</th><th>Fall %</th></tr></thead><tbody>{''.join(rows_html)}</tbody></table></div></div></body></html>'''
    Path(output).write_text(html, encoding="utf-8")
    print(f"Wrote {output}")


if __name__ == "__main__":
    print("Import build_multi() and pass a list of ESPN draft/roster export pairs.")
