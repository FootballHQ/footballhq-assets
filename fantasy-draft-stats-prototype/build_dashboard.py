"""Fantasy Draft Statistics prototype checkpoint.

Inputs expected in the same folder or supplied by path:
- ESPN mDraftDetail JSON export
- ESPN mRoster JSON export
- Optional kona_player_info JSON export

This regenerates the browser dashboard used in the Sept. 4, 2026 prototype.
Raw league/account exports are intentionally not committed to GitHub.
"""

import json
from pathlib import Path
import pandas as pd

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


def build(draft_path, roster_path, kona_path=None, output="index.html"):
    draft = load_json(draft_path)
    roster = load_json(roster_path)
    player_map = {}

    if kona_path:
        kona = load_json(kona_path)
        for obj in kona.get("players", []):
            pl = obj.get("player", {})
            if pl.get("id") is not None:
                player_map[pl["id"]] = pl

    for team in roster.get("teams", []):
        for entry in team.get("roster", {}).get("entries", []):
            pl = entry.get("playerPoolEntry", {}).get("player", {})
            if pl.get("id") is not None:
                player_map[pl["id"]] = pl

    pick_order = draft["settings"]["draftSettings"]["pickOrder"]
    draft_slot = {team_id: i + 1 for i, team_id in enumerate(pick_order)}
    rows = []

    for p in draft["draftDetail"]["picks"]:
        pl = player_map.get(p["playerId"], {})
        own = pl.get("ownership") or {}
        adp = own.get("averageDraftPosition")
        if not isinstance(adp, (int, float)) or adp >= 169.5:
            adp = None
        delta = p["overallPickNumber"] - adp if adp is not None else None
        tag = ""
        if delta is not None:
            tag = "Reach" if delta <= -5 else ("Fall" if delta >= 5 else "Near ADP")
        rows.append({
            "Pick": p["overallPickNumber"],
            "Round": p["roundId"],
            "Rd Pick": p["roundPickNumber"],
            "Draft Slot": draft_slot.get(p["teamId"], ""),
            "Fantasy Team": p["teamId"],
            "Player": pl.get("fullName", f"Player {p['playerId']}"),
            "NFL": TEAM.get(pl.get("proTeamId", 0), "FA"),
            "Pos": POS.get(pl.get("defaultPositionId"), ""),
            "Auto": "Yes" if p.get("autoDraftTypeId", 0) else "No",
            "ESPN ADP": round(adp, 2) if adp is not None else "",
            "Vs ADP": round(delta, 2) if delta is not None else "",
            "Tag": tag,
            "Player ID": p["playerId"],
        })

    df = pd.DataFrame(rows)
    valid = df[df["Vs ADP"] != ""].copy()
    valid["Vs ADP num"] = valid["Vs ADP"].astype(float)
    reaches = valid.nsmallest(10, "Vs ADP num")[["Player","Pos","Pick","ESPN ADP","Vs ADP"]]
    fallers = valid.nlargest(10, "Vs ADP num")[["Player","Pos","Pick","ESPN ADP","Vs ADP"]]

    def player_html(row):
        pid = row["Player ID"]
        nfl = row["NFL"].lower()
        headshot = f'<img class="headshot" src="https://a.espncdn.com/i/headshots/nfl/players/full/{pid}.png" onerror="this.style.display=\'none\'">' if int(pid) > 0 else ""
        logo = f'<img class="logo" src="https://a.espncdn.com/i/teamlogos/nfl/500/{nfl}.png" onerror="this.style.display=\'none\'">'
        return f'{headshot}<div><b>{row["Player"]}</b><br>{logo} {row["NFL"]} · {row["Pos"]}</div>'

    board = []
    for _, r in df.iterrows():
        css = {"Reach":"reach","Fall":"fall","Near ADP":"near","":""}[r["Tag"]]
        board.append(f'<tr><td>{r["Pick"]}</td><td>{r["Round"]}.{r["Rd Pick"]:02d}</td><td class="player">{player_html(r)}</td><td>{r["Draft Slot"]}</td><td>{r["Fantasy Team"]}</td><td>{r["ESPN ADP"]}</td><td>{r["Vs ADP"]}</td><td><span class="pill {css}">{r["Tag"]}</span></td><td>{r["Auto"]}</td></tr>')

    manual = int((df["Auto"] == "No").sum())
    auto = int((df["Auto"] == "Yes").sum())
    counts = df["Pos"].value_counts().to_dict()
    html = f'''<!doctype html><html><head><meta charset="utf-8"><title>Fantasy Draft Statistics</title><style>
body{{font-family:Arial,Helvetica,sans-serif;margin:0;background:#f6f7fb;color:#111827}}.wrap{{max-width:1400px;margin:auto;padding:24px}}.hero{{background:#0B1F3A;color:white;padding:24px;border-radius:14px;margin-bottom:20px}}.cards{{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin:18px 0}}.card,.panel{{background:white;padding:16px;border-radius:12px;box-shadow:0 1px 4px #0001}}.card .num{{font-size:28px;font-weight:700}}.grid{{display:grid;grid-template-columns:1fr 1fr;gap:16px}}table{{width:100%;border-collapse:collapse;background:white}}th{{position:sticky;top:0;background:#0B1F3A;color:white;padding:10px;text-align:left}}td{{padding:8px 10px;border-bottom:1px solid #e5e7eb}}.player{{display:flex;align-items:center;gap:10px;min-width:260px}}.headshot{{width:42px;height:42px;object-fit:cover;border-radius:50%;background:#eef2f7}}.logo{{width:20px;height:20px;object-fit:contain;vertical-align:middle}}.pill{{padding:3px 8px;border-radius:999px;font-size:12px;font-weight:700}}.reach{{background:#fee2e2;color:#991b1b}}.fall{{background:#dcfce7;color:#166534}}.near{{background:#fef3c7;color:#92400e}}@media(max-width:900px){{.grid{{grid-template-columns:1fr}}}}
</style></head><body><div class="wrap"><div class="hero"><h1>Fantasy Draft Statistics — League #1</h1><div>League {draft['id']} · {draft['seasonId']} · {draft['status']['teamsJoined']} teams · {max(df['Round'])} rounds · Snake draft</div></div><div class="cards"><div class="card">Total picks<div class="num">{len(df)}</div></div><div class="card">Manual picks<div class="num">{manual}</div></div><div class="card">Auto picks<div class="num">{auto}</div></div><div class="card">WR drafted<div class="num">{counts.get('WR',0)}</div></div><div class="card">RB drafted<div class="num">{counts.get('RB',0)}</div></div><div class="card">QB drafted<div class="num">{counts.get('QB',0)}</div></div></div><div class="grid"><div class="panel"><h2>Biggest reaches vs ESPN ADP</h2>{reaches.to_html(index=False,border=0)}</div><div class="panel"><h2>Biggest fallers vs ESPN ADP</h2>{fallers.to_html(index=False,border=0)}</div></div><h2>Complete draft board</h2><div class="panel" style="padding:0;overflow:auto;max-height:900px"><table><thead><tr><th>Pick</th><th>Round</th><th>Player</th><th>Draft Slot</th><th>Fantasy Team</th><th>ESPN ADP</th><th>Vs ADP</th><th>Tag</th><th>Auto</th></tr></thead><tbody>{''.join(board)}</tbody></table></div></div></body></html>'''
    Path(output).write_text(html, encoding="utf-8")
    print(f"Wrote {output}")


if __name__ == "__main__":
    print("Import build() and pass your ESPN export paths to regenerate the dashboard.")
