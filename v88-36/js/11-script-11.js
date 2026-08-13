
(function(){
  const TEAM_META = {
    ARI:['NFC','West'],ATL:['NFC','South'],BAL:['AFC','North'],BUF:['AFC','East'],CAR:['NFC','South'],CHI:['NFC','North'],
    CIN:['AFC','North'],CLE:['AFC','North'],DAL:['NFC','East'],DEN:['AFC','West'],DET:['NFC','North'],GB:['NFC','North'],
    HOU:['AFC','South'],IND:['AFC','South'],JAX:['AFC','South'],KC:['AFC','West'],LV:['AFC','West'],LAC:['AFC','West'],
    LAR:['NFC','West'],MIA:['AFC','East'],MIN:['NFC','North'],NE:['AFC','East'],NO:['NFC','South'],NYG:['NFC','East'],
    NYJ:['AFC','East'],PHI:['NFC','East'],PIT:['AFC','North'],SEA:['NFC','West'],SF:['NFC','West'],TB:['NFC','South'],
    TEN:['AFC','South'],WAS:['NFC','East']
  };


  const FHQ_LEGEND_PFR_SLUGS={
    'Tom Brady':'BradTo00','Peyton Manning':'MannPe00','Drew Brees':'BreeDr00','Brett Favre':'FavrBr00','Dan Marino':'MariDa00','Joe Montana':'MontJo01','John Elway':'ElwaJo00','Troy Aikman':'AikmTr00','Steve Young':'YounSt00','Kurt Warner':'WarnKu00',
    'Roger Staubach':'StauRo00','Terry Bradshaw':'BradTe00','Fran Tarkenton':'TarkFr00','Warren Moon':'MoonWa00','Jim Kelly':'KellJi00','Johnny Unitas':'UnitJo00','Joe Namath':'NamaJo00',
    'Walter Payton':'PaytWa00','Barry Sanders':'SandBa00','Emmitt Smith':'SmitEm00','LaDainian Tomlinson':'TomlLa00','Marshall Faulk':'FaulMa00','Eric Dickerson':'DickEr00','Tony Dorsett':'DorsTo00','Marcus Allen':'AlleMa00','Earl Campbell':'CampEa00','Curtis Martin':'MartCu00','Terrell Davis':'DaviTe00','Roger Craig':'CraiRo00',
    'Jerry Rice':'RiceJe00','Randy Moss':'MossRa00','Calvin Johnson':'JohnCa00','Terrell Owens':'OwenTe00','Larry Fitzgerald':'FitzLa00','Michael Irvin':'IrviMi00','Cris Carter':'CartCr00','Marvin Harrison':'HarrMa00','Andre Johnson':'JohnAn02','Isaac Bruce':'BrucIs00','Torry Holt':'HoltTo00',
    'Tony Gonzalez':'GonzTo00','Rob Gronkowski':'GronRo00','Shannon Sharpe':'SharSh00','Antonio Gates':'GateAn00','Kellen Winslow':'WinsKe00',
    'Ray Lewis':'LewiRa00','Ed Reed':'ReedEd00','Lawrence Taylor':'TaylLa00','Deion Sanders':'SandDe00','Reggie White':'WhitRe00','Bruce Smith':'SmitBr00','Brian Urlacher':'UrlaBr00','Troy Polamalu':'PolaTr99','Charles Woodson':'WoodCh00','Champ Bailey':'BailCh00','Ronnie Lott':'LottRo00','Luke Kuechly':'KuecLu00',
    'Adam Vinatieri':'vinaadam01','Devin Hester':'HestDe99','Ray Guy':'GuyxRa00'
  };
  const EXTRA_LEGENDS=[
    ['Roger Staubach','DAL','QB','NFC','East','1970s',2],['Terry Bradshaw','PIT','QB','AFC','North','1970s',4],['Fran Tarkenton','MIN','QB','NFC','North','1970s',0],['Warren Moon','HOU','QB','AFC','South','1990s',0],['Jim Kelly','BUF','QB','AFC','East','1990s',0],['Johnny Unitas','IND','QB','AFC','South','1960s',1],['Joe Namath','NYJ','QB','AFC','East','1960s',1],
    ['Eric Dickerson','LAR','RB','NFC','West','1980s',0],['Tony Dorsett','DAL','RB','NFC','East','1980s',1],['Marcus Allen','LV','RB','AFC','West','1980s',1],['Earl Campbell','TEN','RB','AFC','South','1970s',0],['Curtis Martin','NYJ','RB','AFC','East','2000s',0],['Terrell Davis','DEN','RB','AFC','West','1990s',2],['Roger Craig','SF','RB','NFC','West','1980s',3],
    ['Cris Carter','MIN','WR','NFC','North','1990s',0],['Marvin Harrison','IND','WR','AFC','South','2000s',1],['Andre Johnson','HOU','WR','AFC','South','2000s',0],['Isaac Bruce','LAR','WR','NFC','West','1990s',1],['Torry Holt','LAR','WR','NFC','West','2000s',1],
    ['Antonio Gates','LAC','TE','AFC','West','2000s',0],['Kellen Winslow','LAC','TE','AFC','West','1980s',0],['Charles Woodson','GB','CB','NFC','North','2000s',1],['Champ Bailey','DEN','CB','AFC','West','2000s',0],['Ronnie Lott','SF','S','NFC','West','1980s',4],['Luke Kuechly','CAR','LB','NFC','South','2010s',0]
  ].map(function(x){return {name:x[0],team:x[1],position:x[2],conference:x[3],division:x[4],era:x[5],rings:x[6],hof:true,retired:true,active:false,coach:false};});

  const LEGENDS = [
    {name:'Tom Brady',team:'NE',position:'QB',conference:'AFC',division:'East',era:'2000s',rings:7,espnId:2330,career:'89,214 pass yds • 649 pass TD',retired:true,hof:false},
    {name:'Peyton Manning',team:'IND',position:'QB',conference:'AFC',division:'South',era:'2000s',rings:2,espnId:1428,career:'71,940 pass yds • 539 pass TD',retired:true,hof:true},
    {name:'Drew Brees',team:'NO',position:'QB',conference:'NFC',division:'South',era:'2000s',rings:1,espnId:2580,career:'80,358 pass yds • 571 pass TD',retired:true,hof:false},
    {name:'Brett Favre',team:'GB',position:'QB',conference:'NFC',division:'North',era:'1990s',rings:1,espnId:112,career:'71,838 pass yds • 508 pass TD',retired:true,hof:true},
    {name:'Dan Marino',team:'MIA',position:'QB',conference:'AFC',division:'East',era:'1980s',rings:0,espnId:1,career:'61,361 pass yds • 420 pass TD',retired:true,hof:true},
    {name:'Joe Montana',team:'SF',position:'QB',conference:'NFC',division:'West',era:'1980s',rings:4,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/MontJo01.jpg',career:'40,551 pass yds • 273 pass TD',retired:true,hof:true},
    {name:'John Elway',team:'DEN',position:'QB',conference:'AFC',division:'West',era:'1990s',rings:2,career:'51,475 pass yds • 300 pass TD',retired:true,hof:true},
    {name:'Troy Aikman',team:'DAL',position:'QB',conference:'NFC',division:'East',era:'1990s',rings:3,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/AikmTr00.jpg',career:'32,942 pass yds • 165 pass TD',retired:true,hof:true},
    {name:'Walter Payton',team:'CHI',position:'RB',conference:'NFC',division:'North',era:'1980s',rings:1,photoUrl:'https://static.clubs.nfl.com/image/upload/t_ratio3_4-size20-f_webp-c_fill/hof/zsr78lsyrjhnxrak4cke',career:'16,726 rush yds • 110 rush TD',retired:true,hof:true},
    {name:'Barry Sanders',team:'DET',position:'RB',conference:'NFC',division:'North',era:'1990s',rings:0,espnId:6571,career:'15,269 rush yds • 99 rush TD',retired:true,hof:true},
    {name:'Emmitt Smith',team:'DAL',position:'RB',conference:'NFC',division:'East',era:'1990s',rings:3,espnId:72,career:'18,355 rush yds • 164 rush TD',retired:true,hof:true},
    {name:'LaDainian Tomlinson',team:'LAC',position:'RB',conference:'AFC',division:'West',era:'2000s',rings:0,career:'13,684 rush yds • 145 rush TD',retired:true,hof:true},
    {name:'Jerry Rice',team:'SF',position:'WR',conference:'NFC',division:'West',era:'1990s',rings:3,espnId:12,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/RiceJe00.jpg',career:'22,895 rec yds • 197 rec TD',retired:true,hof:true},
    {name:'Randy Moss',team:'MIN',position:'WR',conference:'NFC',division:'North',era:'2000s',rings:0,espnId:1433,career:'15,292 rec yds • 156 rec TD',retired:true,hof:true},
    {name:'Calvin Johnson',team:'DET',position:'WR',conference:'NFC',division:'North',era:'2010s',rings:0,espnId:10447,career:'11,619 rec yds • 83 rec TD',retired:true,hof:true},
    {name:'Terrell Owens',team:'SF',position:'WR',conference:'NFC',division:'West',era:'2000s',rings:0,career:'15,934 rec yds • 153 rec TD',retired:true,hof:true},
    {name:'Larry Fitzgerald',team:'ARI',position:'WR',conference:'NFC',division:'West',era:'2010s',rings:0,career:'17,492 rec yds • 121 rec TD',retired:true,hof:false},
    {name:'Tony Gonzalez',team:'KC',position:'TE',conference:'AFC',division:'West',era:'2000s',rings:0,espnId:1231,career:'15,127 rec yds • 111 rec TD',retired:true,hof:true},
    {name:'Rob Gronkowski',team:'NE',position:'TE',conference:'AFC',division:'East',era:'2010s',rings:4,espnId:13229,career:'9,286 rec yds • 92 rec TD',retired:true,hof:false},
    {name:'Shannon Sharpe',team:'DEN',position:'TE',conference:'AFC',division:'West',era:'1990s',rings:3,career:'10,060 rec yds • 62 rec TD',retired:true,hof:true},
    {name:'Ray Lewis',team:'BAL',position:'LB',conference:'AFC',division:'North',era:'2000s',rings:2,career:'2× Defensive Player of Year',retired:true,hof:true,group:'Defense'},
    {name:'Ed Reed',team:'BAL',position:'S',conference:'AFC',division:'North',era:'2000s',rings:1,career:'64 career INT',retired:true,hof:true,group:'Defense'},
    {name:'Lawrence Taylor',team:'NYG',position:'LB',conference:'NFC',division:'East',era:'1980s',rings:2,career:'2× Super Bowl champion',retired:true,hof:true,group:'Defense'},
    {name:'Deion Sanders',team:'DAL',position:'CB',conference:'NFC',division:'East',era:'1990s',rings:2,career:'53 career INT',retired:true,hof:true,group:'Defense'},
    {name:'Reggie White',team:'GB',position:'DE',conference:'NFC',division:'North',era:'1990s',rings:1,career:'198 career sacks',retired:true,hof:true,group:'Defense'},
    {name:'Bruce Smith',team:'BUF',position:'DE',conference:'AFC',division:'East',era:'1990s',rings:0,career:'200 career sacks',retired:true,hof:true,group:'Defense'},
    {name:'Adam Vinatieri',team:'NE',position:'K',conference:'AFC',division:'East',era:'2000s',rings:4,career:'NFL all-time scoring leader',retired:true,hof:false,group:'Special Teams'},
    {name:'Devin Hester',team:'CHI',position:'KR',conference:'NFC',division:'North',era:'2000s',rings:0,career:'Return specialist',retired:true,hof:true,group:'Special Teams'},
    {name:'Ray Guy',team:'LV',position:'P',conference:'AFC',division:'West',era:'1970s',rings:3,career:'Hall of Fame punter',retired:true,hof:true,group:'Special Teams'}
,
    {name:'Steve Young',team:'SF',position:'QB',conference:'NFC',division:'West',era:'1990s',rings:3,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/YounSt00.jpg',career:'33,124 pass yds • 232 pass TD',retired:true,hof:true},
    {name:'Kurt Warner',team:'LAR',position:'QB',conference:'NFC',division:'West',era:'2000s',rings:1,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/WarnKu00.jpg',career:'32,344 pass yds • 208 pass TD',retired:true,hof:true},
    {name:'Marshall Faulk',team:'LAR',position:'RB',conference:'NFC',division:'West',era:'2000s',rings:1,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/FaulMa00.jpg',career:'12,279 rush yds • 100 rush TD',retired:true,hof:true},
    {name:'Jerome Bettis',team:'PIT',position:'RB',conference:'AFC',division:'North',era:'2000s',rings:1,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/BettJe00.jpg',career:'13,662 rush yds • 91 rush TD',retired:true,hof:true},
    {name:'Michael Irvin',team:'DAL',position:'WR',conference:'NFC',division:'East',era:'1990s',rings:3,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/IrviMi00.jpg',career:'11,904 rec yds • 65 rec TD',retired:true,hof:true},
    {name:'Brian Urlacher',team:'CHI',position:'LB',conference:'NFC',division:'North',era:'2000s',rings:0,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/UrlaBr00.jpg',career:'Hall of Fame linebacker',retired:true,hof:true,group:'Defense'},
    {name:'Troy Polamalu',team:'PIT',position:'S',conference:'AFC',division:'North',era:'2000s',rings:2,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/PolaTr99.jpg',career:'2× Super Bowl champion',retired:true,hof:true,group:'Defense'}
  ];


  const LEGEND_GUESS_ONLY = [
    {name:'BenJarvus Green-Ellis',team:'NE',position:'RB',conference:'AFC',division:'East',era:'2010s',rings:0,career:'5,013 rush yds • 42 rush TD',retired:true,hof:false},
    {name:'Santana Moss',team:'WAS',position:'WR',conference:'NFC',division:'East',era:'2000s',rings:0,career:'10,283 rec yds • 66 rec TD',retired:true,hof:false},
    {name:'Arian Foster',team:'HOU',position:'RB',conference:'AFC',division:'South',era:'2010s',rings:0,career:'6,527 rush yds • 54 rush TD',retired:true,hof:false},
    {name:'Jamaal Charles',team:'KC',position:'RB',conference:'AFC',division:'West',era:'2010s',rings:0,career:'7,563 rush yds • 44 rush TD',retired:true,hof:false},
    {name:'Roddy White',team:'ATL',position:'WR',conference:'NFC',division:'South',era:'2010s',rings:0,career:'10,863 rec yds • 63 rec TD',retired:true,hof:false},
    {name:'Wes Welker',team:'NE',position:'WR',conference:'AFC',division:'East',era:'2010s',rings:0,career:'9,924 rec yds • 50 rec TD',retired:true,hof:false},
    {name:'Matt Forte',team:'CHI',position:'RB',conference:'NFC',division:'North',era:'2010s',rings:0,career:'9,796 rush yds • 54 rush TD',retired:true,hof:false},
    {name:'Anquan Boldin',team:'ARI',position:'WR',conference:'NFC',division:'West',era:'2000s',rings:1,career:'13,779 rec yds • 82 rec TD',retired:true,hof:false},
    {name:'Chad Johnson',team:'CIN',position:'WR',conference:'AFC',division:'North',era:'2000s',rings:0,career:'11,059 rec yds • 67 rec TD',retired:true,hof:false},
    {name:'Steve Smith Sr.',team:'CAR',position:'WR',conference:'NFC',division:'South',era:'2000s',rings:0,career:'14,731 rec yds • 81 rec TD',retired:true,hof:false},
    {name:'Tony Romo',team:'DAL',position:'QB',conference:'NFC',division:'East',era:'2010s',rings:0,career:'34,183 pass yds • 248 pass TD',retired:true,hof:false},
    {name:'Philip Rivers',team:'LAC',position:'QB',conference:'AFC',division:'West',era:'2010s',rings:0,career:'63,440 pass yds • 421 pass TD',retired:true,hof:false},
    {name:'Donovan McNabb',team:'PHI',position:'QB',conference:'NFC',division:'East',era:'2000s',rings:0,career:'37,276 pass yds • 234 pass TD',retired:true,hof:false},
    {name:'Steve McNair',team:'TEN',position:'QB',conference:'AFC',division:'South',era:'2000s',rings:0,career:'31,304 pass yds • 174 pass TD',retired:true,hof:false},
    {name:'Tiki Barber',team:'NYG',position:'RB',conference:'NFC',division:'East',era:'2000s',rings:0,career:'10,449 rush yds • 55 rush TD',retired:true,hof:false},
    {name:'Hines Ward',team:'PIT',position:'WR',conference:'AFC',division:'North',era:'2000s',rings:2,career:'12,083 rec yds • 85 rec TD',retired:true,hof:false},
    {name:'Donald Driver',team:'GB',position:'WR',conference:'NFC',division:'North',era:'2000s',rings:1,career:'10,137 rec yds • 61 rec TD',retired:true,hof:false},
    {name:'Priest Holmes',team:'KC',position:'RB',conference:'AFC',division:'West',era:'2000s',rings:1,career:'8,172 rush yds • 86 rush TD',retired:true,hof:false},
    {name:'Aaron Rodgers',team:'GB',position:'QB',conference:'NFC',division:'North',era:'2010s',rings:1,career:'4× NFL MVP',retired:true,hof:false},
    {name:'Eli Manning',team:'NYG',position:'QB',conference:'NFC',division:'East',era:'2000s',rings:2,career:'2× Super Bowl MVP',retired:true,hof:false},
    {name:'Ben Roethlisberger',team:'PIT',position:'QB',conference:'AFC',division:'North',era:'2000s',rings:2,career:'2× Super Bowl champion',retired:true,hof:false},
    {name:'Cam Newton',team:'CAR',position:'QB',conference:'NFC',division:'South',era:'2010s',rings:0,career:'2015 NFL MVP',retired:true,hof:false},
    {name:'Andrew Luck',team:'IND',position:'QB',conference:'AFC',division:'South',era:'2010s',rings:0,career:'4× Pro Bowl quarterback',retired:true,hof:false},
    {name:'Carson Palmer',team:'CIN',position:'QB',conference:'AFC',division:'North',era:'2000s',rings:0,career:'46,247 passing yards',retired:true,hof:false},
    {name:'Rich Gannon',team:'LV',position:'QB',conference:'AFC',division:'West',era:'2000s',rings:0,career:'2002 NFL MVP',retired:true,hof:false},
    {name:'Randall Cunningham',team:'PHI',position:'QB',conference:'NFC',division:'East',era:'1990s',rings:0,career:'Dual-threat quarterback icon',retired:true,hof:false},
    {name:'Boomer Esiason',team:'CIN',position:'QB',conference:'AFC',division:'North',era:'1980s',rings:0,career:'1988 NFL MVP',retired:true,hof:false},

    {name:'Edgerrin James',team:'IND',position:'RB',conference:'AFC',division:'South',era:'2000s',rings:0,career:'12,246 rushing yards',retired:true,hof:true},
    {name:'Thurman Thomas',team:'BUF',position:'RB',conference:'AFC',division:'East',era:'1990s',rings:0,career:'1991 NFL MVP',retired:true,hof:true},
    {name:'Marshawn Lynch',team:'SEA',position:'RB',conference:'NFC',division:'West',era:'2010s',rings:1,career:'Beast Mode',retired:true,hof:false},
    {name:'Shaun Alexander',team:'SEA',position:'RB',conference:'NFC',division:'West',era:'2000s',rings:0,career:'2005 NFL MVP',retired:true,hof:false},
    {name:'Corey Dillon',team:'CIN',position:'RB',conference:'AFC',division:'North',era:'2000s',rings:1,career:'11,241 rushing yards',retired:true,hof:false},
    {name:'Clinton Portis',team:'WAS',position:'RB',conference:'NFC',division:'East',era:'2000s',rings:0,career:'9,923 rushing yards',retired:true,hof:false},
    {name:'Ricky Williams',team:'MIA',position:'RB',conference:'AFC',division:'East',era:'2000s',rings:0,career:'10,009 rushing yards',retired:true,hof:false},
    {name:'Steven Jackson',team:'LAR',position:'RB',conference:'NFC',division:'West',era:'2000s',rings:0,career:'11,438 rushing yards',retired:true,hof:false},
    {name:'Fred Taylor',team:'JAX',position:'RB',conference:'AFC',division:'South',era:'2000s',rings:0,career:'11,695 rushing yards',retired:true,hof:false},

    {name:'Reggie Wayne',team:'IND',position:'WR',conference:'AFC',division:'South',era:'2000s',rings:1,career:'14,345 receiving yards',retired:true,hof:false},
    {name:'Andre Reed',team:'BUF',position:'WR',conference:'AFC',division:'East',era:'1990s',rings:0,career:'13,198 receiving yards',retired:true,hof:true},
    {name:'Tim Brown',team:'LV',position:'WR',conference:'AFC',division:'West',era:'1990s',rings:0,career:'14,934 receiving yards',retired:true,hof:true},
    {name:'Art Monk',team:'WAS',position:'WR',conference:'NFC',division:'East',era:'1980s',rings:3,career:'Hall of Fame receiver',retired:true,hof:true},
    {name:'Sterling Sharpe',team:'GB',position:'WR',conference:'NFC',division:'North',era:'1990s',rings:0,career:'5× Pro Bowl receiver',retired:true,hof:false},
    {name:'Demaryius Thomas',team:'DEN',position:'WR',conference:'AFC',division:'West',era:'2010s',rings:1,career:'9,763 receiving yards',retired:true,hof:false},
    {name:'Brandon Marshall',team:'DEN',position:'WR',conference:'AFC',division:'West',era:'2010s',rings:0,career:'12,351 receiving yards',retired:true,hof:false},
    {name:'Jordy Nelson',team:'GB',position:'WR',conference:'NFC',division:'North',era:'2010s',rings:1,career:'8,587 receiving yards',retired:true,hof:false},
    {name:'Vincent Jackson',team:'LAC',position:'WR',conference:'AFC',division:'West',era:'2000s',rings:0,career:'9,080 receiving yards',retired:true,hof:false},
    {name:'Muhsin Muhammad',team:'CAR',position:'WR',conference:'NFC',division:'South',era:'2000s',rings:0,career:'11,438 receiving yards',retired:true,hof:false},

    {name:'Jason Witten',team:'DAL',position:'TE',conference:'NFC',division:'East',era:'2010s',rings:0,career:'13,046 receiving yards',retired:true,hof:false},
    {name:'Heath Miller',team:'PIT',position:'TE',conference:'AFC',division:'North',era:'2000s',rings:2,career:'2× Super Bowl champion',retired:true,hof:false},
    {name:'Vernon Davis',team:'SF',position:'TE',conference:'NFC',division:'West',era:'2010s',rings:1,career:'7,562 receiving yards',retired:true,hof:false},
    {name:'Dallas Clark',team:'IND',position:'TE',conference:'AFC',division:'South',era:'2000s',rings:1,career:'Super Bowl champion tight end',retired:true,hof:false},

    {name:'Michael Strahan',team:'NYG',position:'DE',conference:'NFC',division:'East',era:'2000s',rings:1,career:'141.5 career sacks',retired:true,hof:true,group:'Defense'},
    {name:'Julius Peppers',team:'CAR',position:'DE',conference:'NFC',division:'South',era:'2000s',rings:0,career:'159.5 career sacks',retired:true,hof:true,group:'Defense'},
    {name:'Terrell Suggs',team:'BAL',position:'LB',conference:'AFC',division:'North',era:'2010s',rings:2,career:'139 career sacks',retired:true,hof:false,group:'Defense'},
    {name:'Patrick Willis',team:'SF',position:'LB',conference:'NFC',division:'West',era:'2010s',rings:0,career:'Hall of Fame linebacker',retired:true,hof:true,group:'Defense'},
    {name:'Derrick Brooks',team:'TB',position:'LB',conference:'NFC',division:'South',era:'2000s',rings:1,career:'Hall of Fame linebacker',retired:true,hof:true,group:'Defense'},
    {name:'Junior Seau',team:'LAC',position:'LB',conference:'AFC',division:'West',era:'1990s',rings:0,career:'Hall of Fame linebacker',retired:true,hof:true,group:'Defense'},
    {name:'Brian Dawkins',team:'PHI',position:'S',conference:'NFC',division:'East',era:'2000s',rings:0,career:'Hall of Fame safety',retired:true,hof:true,group:'Defense'},
    {name:'Darrelle Revis',team:'NYJ',position:'CB',conference:'AFC',division:'East',era:'2010s',rings:1,career:'Revis Island',retired:true,hof:true,group:'Defense'},
    {name:'Richard Sherman',team:'SEA',position:'CB',conference:'NFC',division:'West',era:'2010s',rings:1,career:'Legion of Boom',retired:true,hof:false,group:'Defense'},
    {name:'Ronde Barber',team:'TB',position:'CB',conference:'NFC',division:'South',era:'2000s',rings:1,career:'Hall of Fame cornerback',retired:true,hof:true,group:'Defense'},
    {name:'John Lynch',team:'TB',position:'S',conference:'NFC',division:'South',era:'2000s',rings:1,career:'Hall of Fame safety',retired:true,hof:true,group:'Defense'},
    {name:'Dwight Freeney',team:'IND',position:'DE',conference:'AFC',division:'South',era:'2000s',rings:1,career:'125.5 career sacks',retired:true,hof:true,group:'Defense'},
    {name:'Jared Allen',team:'MIN',position:'DE',conference:'NFC',division:'North',era:'2010s',rings:0,career:'136 career sacks',retired:true,hof:true,group:'Defense'},
    {name:'Warren Sapp',team:'TB',position:'DT',conference:'NFC',division:'South',era:'2000s',rings:1,career:'Hall of Fame defensive tackle',retired:true,hof:true,group:'Defense'},
    {name:'John Randle',team:'MIN',position:'DT',conference:'NFC',division:'North',era:'1990s',rings:0,career:'137.5 career sacks',retired:true,hof:true,group:'Defense'},

    {name:'Sebastian Janikowski',team:'LV',position:'K',conference:'AFC',division:'West',era:'2000s',rings:0,career:'Longtime Raiders kicker',retired:true,hof:false,group:'Special Teams'},
    {name:'Steve Tasker',team:'BUF',position:'ST',conference:'AFC',division:'East',era:'1990s',rings:0,career:'Special teams icon',retired:true,hof:false,group:'Special Teams'},
    {name:'Darren Sproles',team:'PHI',position:'RB',conference:'NFC',division:'East',era:'2010s',rings:1,career:'All-purpose and return standout',retired:true,hof:false,group:'Special Teams'}
  ];
  const FAMOUS_LEGEND_NAMES = new Set([
    'Tom Brady','Peyton Manning','Drew Brees','Brett Favre','Dan Marino','Joe Montana','John Elway','Troy Aikman','Steve Young','Kurt Warner',
    'Walter Payton','Barry Sanders','Emmitt Smith','LaDainian Tomlinson','Marshall Faulk','Jerome Bettis','Jerry Rice','Randy Moss','Calvin Johnson',
    'Terrell Owens','Larry Fitzgerald','Michael Irvin','Tony Gonzalez','Rob Gronkowski','Shannon Sharpe','Ray Lewis','Ed Reed','Lawrence Taylor',
    'Deion Sanders','Reggie White','Bruce Smith','Brian Urlacher','Troy Polamalu','Devin Hester'
  ]);
  function legendGuessPool(){return LEGENDS.concat(EXTRA_LEGENDS,LEGEND_GUESS_ONLY)}
  function famousLegendAnswerPool(){return LEGENDS.concat(EXTRA_LEGENDS).filter(p=>FAMOUS_LEGEND_NAMES.has(p.name)||['Roger Staubach','Terry Bradshaw','Eric Dickerson','Tony Dorsett','Cris Carter','Marvin Harrison','Antonio Gates','Charles Woodson','Champ Bailey','Ronnie Lott','Luke Kuechly'].includes(p.name))}
  const COACHES = [
    {name:'Bill Belichick',team:'NE',position:'COACH',conference:'AFC',division:'East',coach:true,retired:true,rings:6,career:'6 Super Bowl wins as head coach'},
    {name:'Andy Reid',team:'KC',position:'COACH',conference:'AFC',division:'West',coach:true,retired:false,rings:3,career:'Multiple Super Bowl champion head coach'},
    {name:'Mike Tomlin',team:'PIT',position:'COACH',conference:'AFC',division:'North',coach:true,retired:false,rings:1,career:'Super Bowl champion head coach'},
    {name:'Sean McVay',team:'LAR',position:'COACH',conference:'NFC',division:'West',coach:true,retired:false,rings:1,career:'Super Bowl champion head coach'},
    {name:'John Harbaugh',team:'BAL',position:'COACH',conference:'AFC',division:'North',coach:true,retired:false,rings:1,career:'Super Bowl champion head coach'},
    {name:'Mike McDaniel',team:'MIA',position:'COACH',conference:'AFC',division:'East',coach:true,retired:false,rings:0,career:'NFL head coach'},
    {name:'Dan Campbell',team:'DET',position:'COACH',conference:'NFC',division:'North',coach:true,retired:false,rings:0,career:'NFL head coach'},
    {name:'Kyle Shanahan',team:'SF',position:'COACH',conference:'NFC',division:'West',coach:true,retired:false,rings:0,career:'NFL head coach'},
    {name:'Sean Payton',team:'DEN',position:'COACH',conference:'AFC',division:'West',coach:true,retired:false,rings:1,career:'Super Bowl champion head coach'},
    {name:'Pete Carroll',team:'SEA',position:'COACH',conference:'NFC',division:'West',coach:true,retired:true,rings:1,career:'Super Bowl champion head coach'},
    {name:'Mike Shanahan',team:'DEN',position:'COACH',conference:'AFC',division:'West',coach:true,retired:true,rings:2,career:'2× Super Bowl champion head coach'},
    {name:'Bill Parcells',team:'NYG',position:'COACH',conference:'NFC',division:'East',coach:true,retired:true,rings:2,career:'Hall of Fame head coach',hof:true},
    {name:'Don Shula',team:'MIA',position:'COACH',conference:'AFC',division:'East',coach:true,retired:true,rings:2,career:'Hall of Fame head coach',hof:true},
    {name:'Vince Lombardi',team:'GB',position:'COACH',conference:'NFC',division:'North',coach:true,retired:true,rings:2,career:'Hall of Fame head coach',hof:true}
  ];

  const CAREER_PATHS = [
    {name:'Tom Brady',teams:['NE','TB']},
    {name:'Peyton Manning',teams:['IND','DEN']},
    {name:'Brett Favre',teams:['ATL','GB','NYJ','MIN']},
    {name:'Randy Moss',teams:['MIN','LV','NE','TEN','MIN','SF']},
    {name:'Terrell Owens',teams:['SF','PHI','DAL','BUF','CIN']},
    {name:'Deion Sanders',teams:['ATL','SF','DAL','WAS','BAL']},
    {name:'Drew Brees',teams:['LAC','NO']},
    {name:'Kurt Warner',teams:['LAR','NYG','ARI']},
    {name:'Marshawn Lynch',teams:['BUF','SEA','LV','SEA']},
    {name:'Adrian Peterson',teams:['MIN','NO','ARI','WAS','DET','TEN','SEA']},
    {name:'Ryan Fitzpatrick',teams:['LAR','CIN','BUF','TEN','HOU','NYJ','TB','MIA','WAS']},
    {name:'Matthew Stafford',teams:['DET','LAR']},
    {name:'Russell Wilson',teams:['SEA','DEN','PIT','NYG']},
    {name:'Davante Adams',teams:['GB','LV','NYJ','LAR']},
    {name:'Stefon Diggs',teams:['MIN','BUF','HOU','NE']},
    {name:'Amari Cooper',teams:['LV','DAL','CLE','BUF']},
    {name:'Khalil Mack',teams:['LV','CHI','LAC']},
    {name:'Von Miller',teams:['DEN','LAR','BUF']},
    {name:'Jared Goff',teams:['LAR','DET']},
    {name:'Baker Mayfield',teams:['CLE','CAR','LAR','TB']}
,
    {name:'Joe Montana',teams:['SF','KC']},
    {name:'Jerry Rice',teams:['SF','LV','SEA']},
    {name:'Emmitt Smith',teams:['DAL','ARI']},
    {name:'LaDainian Tomlinson',teams:['LAC','NYJ']},
    {name:'Tony Gonzalez',teams:['KC','ATL']},
    {name:'Charles Woodson',teams:['LV','GB','LV']},
    {name:'Champ Bailey',teams:['WAS','DEN']},
    {name:'Brandon Marshall',teams:['DEN','MIA','CHI','NYJ','NYG','SEA']},
    {name:'LeSean McCoy',teams:['PHI','BUF','KC','TB']},
    {name:'Michael Vick',teams:['ATL','PHI','NYJ','PIT']}
,
    {name:'DeAndre Hopkins',teams:['HOU','ARI','TEN','KC','BAL']},
    {name:'Brandin Cooks',teams:['NO','NE','LAR','HOU','DAL']},
    {name:'Jimmy Graham',teams:['NO','SEA','GB','CHI','NO']},
    {name:'Calais Campbell',teams:['ARI','JAX','BAL','ATL','MIA','ARI']},
    {name:'Ndamukong Suh',teams:['DET','MIA','LAR','TB','PHI']},
    {name:'Richard Sherman',teams:['SEA','SF','TB']},
    {name:'Ryan Tannehill',teams:['MIA','TEN']},
    {name:'Carson Wentz',teams:['PHI','IND','WAS','LAR','KC']},
    {name:'Joe Flacco',teams:['BAL','DEN','NYJ','PHI','CLE','IND','CLE']},
    {name:'Odell Beckham Jr.',teams:['NYG','CLE','LAR','BAL','MIA']},
    {name:'DeSean Jackson',teams:['PHI','WAS','TB','PHI','LAR','LV','BAL']},
    {name:'Frank Gore',teams:['SF','IND','MIA','BUF','NYJ']},
    {name:'Matt Ryan',teams:['ATL','IND']},
    {name:'Julio Jones',teams:['ATL','TEN','TB','PHI']},
    {name:'Michael Strahan',teams:['NYG']},
    {name:'Julius Peppers',teams:['CAR','CHI','GB','CAR']},
    {name:'Reggie White',teams:['PHI','GB','CAR']},
    {name:'Terrell Suggs',teams:['BAL','ARI','KC']},
    {name:'Darrelle Revis',teams:['NYJ','TB','NE','NYJ','KC']},
    {name:'Brian Dawkins',teams:['PHI','DEN']},
    {name:'Ronde Barber',teams:['TB']},
    {name:'Jason Witten',teams:['DAL','LV']},
    {name:'Vernon Davis',teams:['SF','DEN','WAS']},
    {name:'Anquan Boldin',teams:['ARI','BAL','SF','DET']},
    {name:'Wes Welker',teams:['MIA','NE','DEN','LAR']},
    {name:'Chad Johnson',teams:['CIN','NE']},
    {name:'Steve Smith Sr.',teams:['CAR','BAL']},
    {name:'Tony Romo',teams:['DAL']},
    {name:'Philip Rivers',teams:['LAC','IND']},
    {name:'Donovan McNabb',teams:['PHI','WAS','MIN']},
    {name:'Steve McNair',teams:['TEN','BAL']},
    {name:'Tiki Barber',teams:['NYG']},
    {name:'Hines Ward',teams:['PIT']},
    {name:'Edgerrin James',teams:['IND','ARI','SEA']},
    {name:'Ricky Williams',teams:['NO','MIA','BAL']},
    {name:'Jordy Nelson',teams:['GB','LV']},
    {name:'Demaryius Thomas',teams:['DEN','HOU','NE','NYJ']},
    {name:'Andrew Luck',teams:['IND']},
    {name:'Cam Newton',teams:['CAR','NE','CAR']},
    {name:'Derrick Henry',teams:['TEN','BAL']}
  ];

  let mode='players', playType='daily', answer=null, guesses=[], finished=false, gameWon=false, fhqUnlimitedRewarded=false, fhqUnlimitedRunId='', hlSide='offense',
      playerDifficulty='easy', playerDifficultyChosen=false,
      draftDifficulty='medium', draftDifficultyChosen=false,
      moggleDifficulty='easy', moggleDifficultyChosen=false,
      imposterDifficulty='medium', imposterDifficultyChosen=false,
      statDifficulty='medium', statDifficultyChosen=false,
      timelineDifficulty='medium', timelineDifficultyChosen=false,
      whoHintLimit=3, whoHintChosen=false,
      teamHintLimit=4, teamHintChosen=false;
  let gridRows=[], gridCols=[], gridAnswers={}, gridSelected=null, gridMisses=0, lastGridTemplateIndex=-1, gridDifficulty='medium', gridDifficultyChosen=false;
  let fgConfettiFrame=null, fgConfettiPieces=[];
  let specialState={};
  const fgSavedStates={};
  const CONFERENCE_LOGOS={
    AFC:'https://toppng.com/uploads/preview/afc-logo-vector-download-free-11574220920xho2gecr5t.png',
    NFC:'https://toppng.com/public/uploads/preview/nfc-logo-vector-national-football-conference-115741504080ki4kiudod.png'
  };

  function norm(v){return String(v||'').toLowerCase().replace(/[^a-z0-9]/g,'')}
  function esc(v){
    if(typeof escapeHTML==='function')return escapeHTML(String(v==null?'':v));
    return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]});
  }
  function seededIndex(seed,len){let x=Math.sin(seed)*10000;return Math.floor((x-Math.floor(x))*len)}
  function dailyDateKey(){
    // One global daily reset for everybody: midnight America/Los_Angeles (Pacific time).
    const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Los_Angeles',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const o={};parts.forEach(p=>o[p.type]=p.value);
    return o.year+'-'+o.month+'-'+o.day;
  }
  function todayBase(){return Number(dailyDateKey().replace(/-/g,''))}
  function modeSeed(mult){return todayBase()*(mult||17)}
  function randomFrom(arr,seed){
    if(!arr||!arr.length)return null;
    if(playType==='daily'&&Number.isFinite(seed)){
      const stable=arr.slice().sort(function(a,b){return norm((a&&a.name)||(a&&a.player)||(a&&a.label)||'').localeCompare(norm((b&&b.name)||(b&&b.player)||(b&&b.label)||''));});
      const parts=dailyDateKey().split('-').map(Number);
      const daySerial=Math.floor(Date.UTC(parts[0],parts[1]-1,parts[2])/86400000);
      const base=todayBase()||1;
      const salt=Math.max(1,Math.round(Math.abs(Number(seed))/base));
      const index=((daySerial + salt*97)%stable.length+stable.length)%stable.length;
      return stable[index];
    }
    return arr[Math.floor(Math.random()*arr.length)];
  }
  function teamMeta(team){return TEAM_META[String(team||'').toUpperCase()]||['—','—']}

  function currentPlayerPhoto(x){return playerPhotoCandidates((x&&x.name)||'Player')[0]||fhqSilhouetteDataUri((x&&x.name)||'Player');}
  function legendPhoto(x){
    if(!x)return '';
    if(x.photoUrl)return x.photoUrl;
    const slug=FHQ_LEGEND_PFR_SLUGS[x.name];
    if(slug)return 'https://www.pro-football-reference.com/req/202106291/images/headshots/'+slug+'.jpg';
    if(x.espnId)return 'https://a.espncdn.com/i/headshots/nfl/players/full/'+x.espnId+'.png';
    return '';
  }
  function photoHTML(x,cls){
    if(!x)return '';
    const name=x.name||x.player||'Player';
    let list=(x.retired||x.coach)?[legendPhoto(x)].filter(Boolean):playerPhotoCandidates(name);
    list=Array.from(new Set(list.filter(Boolean)));
    const src=list[0]||fhqSilhouetteDataUri(name);
    const encoded=encodeURIComponent(JSON.stringify(list));
    const wikiKick=list.length?'':' onload="fhqTryWikipediaPhoto(this,'+JSON.stringify(String(name)).replace(/"/g,'&quot;')+')"';
    return '<img class="'+(cls||'fg-player-photo')+'" src="'+esc(src)+'" alt="'+esc(name)+'" loading="lazy" data-fhq-name="'+esc(name)+
      '" data-fhq-index="0" data-fhq-candidates="'+encoded+'" onerror="fhqPhotoOnError(this)"'+wikiKick+'>';
  }
  function logoHTML(team){
    if(typeof teamLogoHTML==='function')return teamLogoHTML(team);
    return '<span class="team-logo-fallback">'+esc(team||'NFL')+'</span>';
  }
  function conferenceLogoHTML(conf){
    const src=CONFERENCE_LOGOS[String(conf||'').toUpperCase()];
    return src?'<img class="fg-conf-logo" src="'+esc(src)+'" alt="'+esc(conf)+'"><span>'+esc(conf)+'</span>':'<span>'+esc(conf||'—')+'</span>';
  }
  function divisionArrow(d){return d==='East'?'→':d==='West'?'←':d==='North'?'↑':d==='South'?'↓':'•'}




  const FHQ_TITLE_KEY='footballHQEquippedTitleV1';
  function fhqTitleStorageKey(){return FHQ_TITLE_KEY+':'+(norm(fhqGetUsername()||fhqRuntimeIdentityName||fhqGetToken())||'guest')}
  function fhqEquippedTitle(){try{return fhqRuntimeEquippedTitle||localStorage.getItem(fhqTitleStorageKey())||''}catch(e){return fhqRuntimeEquippedTitle||''}}
  function fhqSetEquippedTitleLocal(title){fhqRuntimeEquippedTitle=String(title||'');try{localStorage.setItem(fhqTitleStorageKey(),fhqRuntimeEquippedTitle)}catch(e){}}

  function fhqLevelRequirement(level){
    level=Math.max(1,Number(level)||1);
    return 40+level*10+Math.floor(level/5)*15;
  }
  function fhqPointsForLevel(level){
    level=Math.max(1,Math.floor(Number(level)||1));let total=0;
    for(let l=1;l<level;l++)total+=fhqLevelRequirement(l);
    return total;
  }
  function fhqLevelInfo(points){
    points=Math.max(0,Number(points)||0);let level=1;
    while(level<100&&points>=fhqPointsForLevel(level+1))level++;
    const start=fhqPointsForLevel(level),next=fhqPointsForLevel(level+1),span=Math.max(1,next-start);
    return {level:level,start:start,next:next,into:Math.max(0,points-start),needed:span,progress:Math.max(0,Math.min(1,(points-start)/span))};
  }

  const FHQ_STARTER_AVATAR='HQ_STARTER';
  const FHQ_STARTER_TITLE='HQ Rookie';
  const FHQ_PASS_REWARDS=[
    {level:2,type:'avatar',value:'HQ_ROOKIE',name:'Rookie Helmet'},{level:3,type:'title',value:'Rookie Scout',name:'Rookie Scout',rarity:'common'},
    {level:5,type:'title',value:'Sunday Scholar',name:'Sunday Scholar',rarity:'uncommon'},{level:7,type:'avatar',value:'HQ_ELITE',name:'Coach Headset'},
    {level:10,type:'title',value:'Grid Grinder',name:'Grid Grinder',rarity:'rare'},{level:12,type:'avatar',value:'HQ_GRID',name:'Playbook Master'},
    {level:15,type:'title',value:'Stat Savant',name:'Stat Savant',rarity:'rare'},{level:18,type:'avatar',value:'HQ_GOLD',name:'Championship Ring'},
    {level:20,type:'title',value:'Football Genius',name:'Football Genius',rarity:'epic'},{level:25,type:'avatar',value:'HQ_FIRE',name:'Flaming Football'},
    {level:30,type:'title',value:'Fourth Quarter Clutch',name:'Fourth Quarter Clutch',rarity:'clutch'},{level:35,type:'avatar',value:'HQ_DIAMOND',name:'Diamond Football'},
    {level:40,type:'title',value:'HQ Elite',name:'HQ Elite',rarity:'elite'},{level:50,type:'avatar',value:'HQ_LEGEND',name:'Legend Helmet'},
    {level:50,type:'title',value:'Football HQ Legend',name:'Football HQ Legend',rarity:'legendary'},
    {level:60,type:'title',value:'Film Room Professor',name:'Film Room Professor',rarity:'elite'},{level:70,type:'avatar',value:'HQ_70',name:'Ice Cold QB'},
    {level:75,type:'title',value:'Sunday Commander',name:'Sunday Commander',rarity:'legendary'},{level:85,type:'avatar',value:'HQ_85',name:'Grid Iron King'},
    {level:90,type:'title',value:'Football Oracle',name:'Football Oracle',rarity:'legendary'},{level:100,type:'avatar',value:'HQ_100',name:'Century Club'},
    {level:100,type:'title',value:'HQ Immortal',name:'HQ Immortal',rarity:'legendary'}
  ];
  function fhqRewardForLevel(level){
    level=Number(level)||1;
    const specials=FHQ_PASS_REWARDS.filter(r=>Number(r.level)===level);
    if(specials.length)return specials;
    if(level===1)return [{level:1,type:'starter',value:'HQ_STARTER',name:'HQ Starter'}];
    const amount=level<10?50:level<25?75:level<50?100:level<75?125:150;
    return [{level:level,type:'coins',value:amount,name:amount+' HQ Coins',rarity:'currency'}];
  }
  function fhqRewardUnlocked(r,points){return fhqLevelInfo(points).level>=Number(r.level||999)}
  function fhqUnlockedTitles(points){return [FHQ_STARTER_TITLE].concat(FHQ_PASS_REWARDS.filter(r=>r.type==='title'&&fhqRewardUnlocked(r,points)).map(r=>r.value))}
  function fhqTitleMeta(title){
    if(!title||title===FHQ_STARTER_TITLE)return {rarity:'common',label:FHQ_STARTER_TITLE};
    const r=FHQ_PASS_REWARDS.find(x=>x.type==='title'&&x.value===title);
    return {rarity:(r&&r.rarity)||'common',label:title};
  }
  function fhqTitleHTML(title){
    const meta=fhqTitleMeta(title||FHQ_STARTER_TITLE);
    return '<span class="fhq-title-'+esc(meta.rarity)+'">'+esc(meta.label)+'</span>';
  }
  let fhqRuntimeEquippedTitle='';
  function fhqRewardAvatarSVG(token){
    token=String(token||FHQ_STARTER_AVATAR);
    const wrap=(body,bg='#15364a',stroke='#85d9ff')=>'<span class="fhq-avatar-token"><svg viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r="34" fill="'+bg+'" stroke="'+stroke+'" stroke-width="3"/>'+body+'</svg></span>';
    if(token==='HQ_STARTER')return wrap('<path d="M36 10 55 16v19c0 13-7 21-19 28-12-7-19-15-19-28V16l19-6Z" fill="#102b3d" stroke="#8adfff" stroke-width="3"/><path d="M25 29h22M25 36h22" stroke="#3b7898" stroke-width="2"/><text x="36" y="27" text-anchor="middle" font-size="12" font-weight="1000" fill="#f0fbff">HQ</text><path d="M29 43h14v9H29z" fill="none" stroke="#dff8ff" stroke-width="2.5"/><path d="M36 43v-5M32 38h8" stroke="#70d0f5" stroke-width="2.5" stroke-linecap="round"/>','#0d2738','#72cef2');
    if(token==='HQ_ROOKIE')return wrap('<path d="M17 38c0-14 8-24 21-24 11 0 19 6 22 16l-12 5-4-8v5H24v19h22V39h13" fill="#15384c" stroke="#e8f8ff" stroke-width="3.5" stroke-linejoin="round"/><path d="M22 24c8-7 20-8 29-2" fill="none" stroke="#6fd1f5" stroke-width="3"/><path d="M28 34h12v9H28z" fill="#0c2534" stroke="#86ddff" stroke-width="2"/><text x="34" y="41" text-anchor="middle" font-size="7" font-weight="1000" fill="#eefbff">HQ</text><path d="M46 39h14M24 52h25" stroke="#75d5fa" stroke-width="3" stroke-linecap="round"/>','#102c3d','#80d9fa');
    if(token==='HQ_GRID')return wrap('<rect x="13" y="13" width="46" height="46" rx="7" fill="#132a25" stroke="#b2f2d2" stroke-width="3"/><path d="M28 13v46M44 13v46M13 28h46M13 44h46" stroke="#55d69a" stroke-width="2.5"/><path d="M17 54 54 17" stroke="#f1d462" stroke-width="4" stroke-linecap="round"/>','#15392f','#6fe0ad');
    if(token==='HQ_GOLD')return wrap('<path d="M18 20h36l5 12-12 8c-3 10-18 10-22 0l-12-8 5-12Z" fill="#c89520" stroke="#fff0a7" stroke-width="3"/><circle cx="36" cy="36" r="9" fill="#f9d75d" stroke="#fff4bd" stroke-width="2"/><path d="m32 36 3 3 6-7" fill="none" stroke="#5b4310" stroke-width="3"/><path d="M29 47v10h14V47" fill="none" stroke="#ffe58b" stroke-width="3"/>','#4c3910','#ffe27a');
    if(token==='HQ_FIRE')return wrap('<path d="M39 8c5 13-6 17 2 28 5-5 8-12 7-19 12 10 15 22 9 34-5 10-16 16-28 13C17 61 9 51 11 40c2-10 11-16 16-27 0 9 2 14 7 18-2-11 7-14 5-23Z" fill="#ff654f"/><path d="M36 34c7 6 9 13 6 19-3 6-11 7-16 2-5-6 0-13 10-21Z" fill="#ffd272"/>','#512024','#ff8975');
    if(token==='HQ_ELITE')return wrap('<circle cx="36" cy="25" r="10" fill="#8fd3ff"/><path d="M18 60c2-15 9-23 18-23s16 8 18 23" fill="#214d72" stroke="#c8eaff" stroke-width="3"/><path d="M11 24c0-13 10-22 25-22s25 9 25 22v14h-8V24c0-9-7-15-17-15s-17 6-17 15v14h-8V24Z" fill="none" stroke="#94caff" stroke-width="4"/><path d="M53 38h8v8h-8" fill="#94caff"/>','#1b3152','#8ec4ff');
    if(token==='HQ_DIAMOND')return wrap('<path d="M12 29 23 12h26l11 17-24 32L12 29Z" fill="#1c7181" stroke="#c7f8ff" stroke-width="3"/><path d="M12 29h48M23 12l13 49 13-49M23 12l13 17 13-17" fill="none" stroke="#85e4f1" stroke-width="2.5"/>','#143f49','#a2f1ff');
    if(token==='HQ_LEGEND')return wrap('<path d="M13 43c0-18 10-30 27-30 13 0 22 7 26 18l-14 6-6-10v28H21V37h25" fill="#332b16" stroke="#ffe9a0" stroke-width="4"/><path d="M51 37h14M22 55h31" stroke="#ffe17a" stroke-width="3"/><path d="m36 4 4 8 9 1-7 7 2 9-8-4-8 4 2-9-7-7 9-1 4-8Z" fill="#ffe17a"/>','#403315','#ffe082');

    if(token==='SHOP_PRESS_BOX')return wrap('<rect x="13" y="17" width="46" height="35" rx="7" fill="#17394a" stroke="#8adfff" stroke-width="3"/><path d="M21 28h30M21 37h18M22 55h28" stroke="#c8f4ff" stroke-width="3"/><circle cx="49" cy="37" r="6" fill="#62c7ee"/>','#102d3e','#73d5fa');
    if(token==='SHOP_TWO_MINUTE')return wrap('<circle cx="36" cy="36" r="23" fill="#17344a" stroke="#7cd8ff" stroke-width="3"/><path d="M36 19v18l13 7" fill="none" stroke="#eefbff" stroke-width="4" stroke-linecap="round"/><text x="36" y="67" text-anchor="middle" fill="#8fdfff" font-size="7" font-weight="1000">2:00</text>','#102a3c','#77d8ff');
    if(token==='SHOP_WAIVER_WIZARD')return wrap('<path d="M20 57c3-16 8-24 16-24s13 8 16 24" fill="#26325c" stroke="#aabfff" stroke-width="3"/><path d="m18 26 18-18 18 18-10-2 7 7H21l7-7Z" fill="#6656a5" stroke="#d5ceff" stroke-width="2"/><path d="M29 45h14" stroke="#7ee2ff" stroke-width="3"/>','#1e203e','#9caaff');
    if(token==='SHOP_GRID_GRINDER')return wrap('<rect x="14" y="14" width="44" height="44" rx="8" fill="#123b38" stroke="#6ee2d1" stroke-width="3"/><path d="M29 14v44M43 14v44M14 29h44M14 43h44" stroke="#56a69d" stroke-width="2"/><circle cx="50" cy="22" r="5" fill="#ffd85e"/><path d="m20 50 10-10" stroke="#efffff" stroke-width="3"/>','#12312f','#62d8c7');
    if(token==='SHOP_MIDNIGHT_QB')return wrap('<path d="M17 42c0-17 9-28 24-28 11 0 19 6 23 16l-12 6-6-9v28H23V37h23" fill="#17243d" stroke="#8eb8ff" stroke-width="3"/><path d="M28 36h15v10H28z" fill="#071221" stroke="#68cbff" stroke-width="2"/><path d="m16 15 4 4m36-4-4 4" stroke="#dfe8ff" stroke-width="2"/>','#0d1628','#739cff');
    if(token==='SHOP_FILM_GHOST')return wrap('<path d="M18 56c0-25 7-40 18-40s18 15 18 40l-6-6-6 7-6-7-6 7-6-7-6 6Z" fill="#d7edf5" opacity=".9" stroke="#7bdfff" stroke-width="2"/><circle cx="30" cy="31" r="2.5" fill="#102533"/><circle cx="42" cy="31" r="2.5" fill="#102533"/><path d="M25 12h22" stroke="#4f9fc3" stroke-width="3"/>','#0b202c','#6bd6ff');
    if(token==='SHOP_Q4_KING')return wrap('<path d="m19 25 8-14 9 12 9-12 8 14-5 33H24l-5-33Z" fill="#711f30" stroke="#ff91a8" stroke-width="3"/><path d="m22 15 14-8 14 8" fill="none" stroke="#ffd4dd" stroke-width="3"/><text x="36" y="43" text-anchor="middle" fill="#fff1f4" font-size="15" font-weight="1000">Q4</text>','#28121a','#e84b6a');

    if(token==='COMP_DAILY_CHAMP')return wrap('<path d="M14 41c6-12 28-18 39-6 8 10 0 21-12 25-14 4-30-2-31-12-.4-3 1-5 4-7Z" fill="#1d6f94" stroke="#d9f7ff" stroke-width="4"/><path d="m25 34 18 21M29 41l5-6m1 12 5-6" stroke="#8ee9ff" stroke-width="3"/><path d="M50 10 54 19l9 1-7 7 2 9-8-5-8 5 2-9-7-7 9-1 4-9Z" fill="#d8f7ff"/>','#174765','#9ceaff');
    if(token==='HQ_70')return wrap('<path d="M16 42c5-12 27-17 38-6 7 8 1 18-9 22-13 5-30 0-31-10-.3-2 .4-4 2-6Z" fill="#174c6b" stroke="#e9fbff" stroke-width="4"/><path d="M18 20h36" stroke="#88ddff" stroke-width="3"/>','#122d43','#9ee8ff');
    if(token==='HQ_85')return wrap('<path d="M17 51 22 20l14-10 14 10 5 31-19 10-19-10Z" fill="#203b2d" stroke="#dff5c9" stroke-width="3"/><path d="m36 17 5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2 5-10Z" fill="#98d86f"/>','#173124','#a4df82');    if(token==='HQ_100')return '<span class="fhq-avatar-token fhq-century-avatar"><svg viewBox="0 0 72 72" aria-hidden="true"><defs><radialGradient id="c100" cx="50%" cy="38%"><stop offset="0" stop-color="#1f5870"/><stop offset="1" stop-color="#050a0f"/></radialGradient></defs><circle cx="36" cy="36" r="34" fill="url(#c100)" stroke="#8ce8ff" stroke-width="3"/><circle cx="36" cy="36" r="28" fill="none" stroke="#2e6f88" stroke-width="2"/><path d="m20 20 6-10 10 7 10-7 6 10" fill="none" stroke="#c8f7ff" stroke-width="3"/><path d="M18 49c6-14 30-20 39-4 5 9-3 17-15 19-13 2-26-4-25-12 0-1 0-2 1-3Z" fill="#0f3344" stroke="#78dbfa" stroke-width="2"/><text x="36" y="45" text-anchor="middle" fill="#effdff" font-size="20" font-weight="1000">100</text><circle cx="14" cy="36" r="2" fill="#69dfff"/><circle cx="58" cy="36" r="2" fill="#69dfff"/><path d="M8 28h5m46 0h5M12 51h5m38 0h5" stroke="#72dbfa" stroke-width="2"/></svg></span>';
    if(token==='SHOP_FILM_BRO')return wrap('<circle cx="36" cy="25" r="11" fill="#d9a27c"/><path d="M16 65c2-20 9-29 20-29s18 9 20 29" fill="#172a3b"/><path d="M24 21c2-11 21-12 24 0-4-3-7-4-12-4s-8 1-12 4Z" fill="#171717"/><path d="M26 25h8m4 0h8m-12 0h4" stroke="#111" stroke-width="3"/><path d="M28 31c5 4 11 4 16 0" fill="none" stroke="#7b4637" stroke-width="2"/>','#173449','#83d6ff');
    if(token==='SHOP_SUNDAY_SICKO')return wrap('<circle cx="36" cy="26" r="11" fill="#d7a17a"/><path d="M15 66c3-20 10-29 21-29s18 9 21 29" fill="#5b2332"/><path d="M20 23c2-13 29-15 32 1-8-6-25-7-32-1Z" fill="#2b211c"/><path d="M13 12h13l-4 9H9l4-9Zm46 0H46l4 9h13l-4-9Z" fill="#ffcc62"/>','#3a2029','#e9879b');
    if(token==='SHOP_SIDELINE_GENERAL')return wrap('<circle cx="36" cy="25" r="11" fill="#c98d67"/><path d="M15 65c3-18 10-28 21-28s18 10 21 28" fill="#163b52"/><path d="M19 24c2-12 31-12 34 0-5-4-10-6-17-6s-12 2-17 6Z" fill="#0b1c27"/><path d="M12 18h48" stroke="#7ad6ff" stroke-width="4"/>','#15354b','#83d9ff');
    if(token==='SHOP_FOURTH_DOWN')return wrap('<circle cx="36" cy="25" r="10" fill="#d2a07d"/><path d="M14 65c2-20 10-29 22-29s20 9 22 29" fill="#4a1b25"/><path d="M23 22c4-10 23-10 27 0" stroke="#191919" stroke-width="5"/><text x="36" y="59" text-anchor="middle" fill="#ffe7eb" font-size="9" font-weight="1000">4TH</text>','#351923','#e26477');
    if(token==='SHOP_SNOW_GAME')return wrap('<circle cx="36" cy="25" r="10" fill="#d1a27c"/><path d="M15 66c3-19 10-29 21-29s18 10 21 29" fill="#dfeff5"/><path d="M17 21c6-12 31-12 38 0l-6 5c-5-6-21-7-27 0l-5-5Z" fill="#83c9e8"/><path d="M11 14h6m38 0h6M8 34h7m42 0h7" stroke="#e9fbff" stroke-width="2"/>','#1e3b4a','#d9f6ff');
    return '';
  }
  function fhqAvatarTokenHTML(token){const svg=fhqRewardAvatarSVG(String(token||FHQ_STARTER_AVATAR));return svg||fhqRewardAvatarSVG(FHQ_STARTER_AVATAR)}

  function fhqLevelSnapshotKey(){return 'footballHQLevelSnapshotV1:'+(fhqGetToken()||'guest')}
  function fhqHandleProgressionUpdate(profile,quiet){
    const points=Math.max(0,Number(profile&&profile.points)||0),info=fhqLevelInfo(points);let prev=0;
    try{prev=Number(localStorage.getItem(fhqLevelSnapshotKey()))||0}catch(e){}
    if(!prev||quiet){try{localStorage.setItem(fhqLevelSnapshotKey(),String(info.level))}catch(e){};fhqRenderPass(profile);return}
    if(info.level>prev){
      try{localStorage.setItem(fhqLevelSnapshotKey(),String(info.level))}catch(e){}
      fhqShowLevelUp(info.level);
    }
    fhqRenderPass(profile);
  }
  function fhqShowLevelUp(level){
    const overlay=document.getElementById('fhqLevelUpOverlay');if(!overlay)return;
    const reward=fhqRewardForLevel(level),rewardText=reward.length?'Unlocked: '+reward.map(r=>r.name).join(' + '):'Keep climbing for more HQ rewards.';
    const title=document.getElementById('fhqLevelUpTitle'),copy=document.getElementById('fhqLevelUpCopy'),rw=document.getElementById('fhqLevelUpReward');
    if(title)title.textContent='LEVEL '+level;if(copy)copy.textContent='Your Football HQ level increased.';if(rw)rw.textContent=rewardText;
    overlay.classList.add('show');overlay.setAttribute('aria-hidden','false');
    fhqPlayAchievementSound();fhqLaunchAchievementConfetti();
  }

  let fhqRuntimeIdentityToken='';
  let fhqRuntimeIdentityName='';

  function fhqAccountTokenKey(){return 'footballHQSharedAccountTokenV1'}
  function fhqStableGuestKey(){return 'footballHQStableGuestIdentityV1'}
  function fhqTokenVaultKey(){return 'footballHQIdentityVaultV1'}
  function fhqUsernameKey(){return 'footballHQSharedUsernameV1'}
  function fhqIdentityUsernameCookie(){
    try{const m=document.cookie.match(/(?:^|;\s*)fhq_username=([^;]+)/);return m?decodeURIComponent(m[1]):''}catch(e){return ''}
  }
  function fhqPersistUsernameEverywhere(name){
    name=String(name||'').trim();if(!name)return;
    try{localStorage.setItem(fhqUsernameKey(),name)}catch(e){}
    try{document.cookie='fhq_username='+encodeURIComponent(name)+'; path=/; max-age=31536000; SameSite=Lax'}catch(e){}
  }

  function fhqWindowIdentityKey(){return 'FHQ_IDENTITY_V1'}
  function fhqCookieToken(){
    try{
      const m=document.cookie.match(/(?:^|;\s*)fhq_identity=([^;]+)/);
      return m?decodeURIComponent(m[1]):'';
    }catch(e){return ''}
  }
  function fhqReadWindowIdentity(){
    try{
      const raw=String(window.name||'');
      if(!raw.startsWith(fhqWindowIdentityKey()+':'))return '';
      return raw.slice((fhqWindowIdentityKey()+':').length);
    }catch(e){return ''}
  }
  function fhqPersistPrimaryEverywhere(token){
    token=String(token||'').trim();if(!token)return;
    try{sessionStorage.setItem(fhqAccountTokenKey(),token)}catch(e){}
    try{document.cookie='fhq_identity='+encodeURIComponent(token)+'; path=/; max-age=31536000; SameSite=Lax'}catch(e){}
    try{window.name=fhqWindowIdentityKey()+':'+token}catch(e){}
  }

  function fhqReadTokenVault(){
    let vault={primary:'',known:[]};
    try{
      const raw=JSON.parse(localStorage.getItem(fhqTokenVaultKey())||'null');
      if(raw&&typeof raw==='object'){
        vault.primary=String(raw.primary||'');
        vault.known=Array.isArray(raw.known)?raw.known.map(String).filter(Boolean):[];
      }
      const stable=JSON.parse(localStorage.getItem(fhqStableGuestKey())||'null');
      const legacy=localStorage.getItem(fhqAccountTokenKey())||'';
      const session=sessionStorage.getItem(fhqAccountTokenKey())||'';
      const cookie=fhqCookieToken();
      const windowToken=fhqReadWindowIdentity();
      [windowToken,cookie,session,stable&&stable.token,legacy].filter(Boolean).forEach(function(t){
        t=String(t);
        if(!vault.known.includes(t))vault.known.push(t);
        if(!vault.primary)vault.primary=t;
      });
    }catch(e){}
    return vault;
  }
  function fhqSaveTokenVault(vault){
    vault=vault||{primary:'',known:[]};
    vault.known=Array.from(new Set((vault.known||[]).map(String).filter(Boolean)));
    if(vault.primary&&!vault.known.includes(vault.primary))vault.known.unshift(vault.primary);
    try{
      localStorage.setItem(fhqTokenVaultKey(),JSON.stringify(vault));
      if(vault.primary)localStorage.setItem(fhqAccountTokenKey(),vault.primary);
    }catch(e){}
    if(vault.primary)fhqPersistPrimaryEverywhere(vault.primary);
  }
  function fhqRememberToken(token,makePrimary){
    token=String(token||'').trim();
    if(!token)return;
    const vault=fhqReadTokenVault();
    if(!vault.known.includes(token))vault.known.push(token);
    if(makePrimary!==false||!vault.primary)vault.primary=token;
    fhqSaveTokenVault(vault);
  }
  function fhqKnownTokens(){
    const vault=fhqReadTokenVault();
    return Array.from(new Set([vault.primary].concat(vault.known||[]).filter(Boolean)));
  }
  function fhqGetToken(){
    const locked=fhqGetPrimaryAccountLock();
    if(locked){
      if(fhqRuntimeIdentityToken!==locked)fhqRuntimeIdentityToken=locked;
      fhqRememberToken(locked,true);fhqPersistPrimaryEverywhere(locked);return locked;
    }
    if(fhqRuntimeIdentityToken)return fhqRuntimeIdentityToken;
    const vault=fhqReadTokenVault();
    let t=vault.primary||vault.known[0]||'';
    if(!t)t='fhq-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,14);
    fhqRuntimeIdentityToken=t;
    fhqRememberToken(t,true);
    return t;
  }

  function fhqCoinDisplayKey(){return 'footballHQCoinDisplayV2'}
  function fhqCachedCoins(){
    let n=0;
    try{n=Number(localStorage.getItem(fhqCoinDisplayKey()))||0}catch(e){}
    try{n=Math.max(n,Number(window.__fhqCosmetics&&window.__fhqCosmetics.coins)||0)}catch(e){}
    try{n=Math.max(n,Number(getAccountProfile&&getAccountProfile().hqCoins)||0)}catch(e){}
    return n;
  }
  function fhqRememberCoins(value){
    const n=Math.max(0,Number(value)||0);
    try{localStorage.setItem(fhqCoinDisplayKey(),String(n))}catch(e){}
    const ids=['fhqGlobalCoins','fhqShopCoins','fhqPassCoins','fhqLockerCoins'];
    ids.forEach(function(id){const el=document.getElementById(id);if(el)el.textContent=String(n)});
    return n;
  }


  function fhqWelcomeSeenKey(){return 'footballHQWelcomeSeenV812:'+String(fhqGetToken()||'guest')}
  function fhqHandleWelcomeReward(profile){
    // V81.2: the server decides whether a welcome presentation is actually pending.
    // Merely owning the historical welcome inventory marker is NOT enough.
    const pending=!!(profile&&profile.welcomePending===true);
    const o=document.getElementById('fhqWelcomeOverlay');
    if(!pending){if(o)o.classList.remove('open');return}
    const shield=document.getElementById('fhqWelcomeShield');if(shield)shield.innerHTML=fhqAvatarTokenHTML(FHQ_STARTER_AVATAR);
    if(o)o.classList.add('open');
  }
  function fhqClaimWelcome(){
    const o=document.getElementById('fhqWelcomeOverlay'),btn=document.getElementById('fhqWelcomeClaim');
    if(btn){btn.disabled=true;btn.textContent='LOADING…'}
    if(!fhqHasServer()){
      if(o)o.classList.remove('open');
      if(btn){btn.disabled=false;btn.textContent='ENTER FOOTBALL HQ'}
      return;
    }
    google.script.run
      .withSuccessHandler(function(result){
        if(btn){btn.disabled=false;btn.textContent='ENTER FOOTBALL HQ'}
        if(o)o.classList.remove('open');
        const profile=result&&result.profile?result.profile:null;
        if(profile){fhqSetRuntimeIdentity(profile);fhqRememberCoins(profile.hqCoins);}
        // Only animate a coin award when the backend explicitly confirms that
        // a grant happened in THIS transaction. A simple acknowledgement is silent.
        if(result&&result.welcomeBonusGranted===true){
          const amount=Math.max(0,Number(result.amount)||0),balance=Math.max(0,Number(result.balance)||0);
          if(amount>0)fhqShowCoinAward(amount,balance);
        }
        try{localStorage.setItem(fhqWelcomeSeenKey(),'1')}catch(e){}
      })
      .withFailureHandler(function(err){
        if(btn){btn.disabled=false;btn.textContent='ENTER FOOTBALL HQ'}
        console.warn('Welcome acknowledgement failed',err);
      })
      .acknowledgeFootballHQWelcome(fhqGetToken());
  }

  function fhqSetRuntimeIdentity(profile){
    if(!profile)return;
    if(profile.token){
      fhqRuntimeIdentityToken=String(profile.token);
      fhqRememberToken(fhqRuntimeIdentityToken,true);
      fhqPersistPrimaryEverywhere(fhqRuntimeIdentityToken);
      if(fhqGetManualAccountPin()===fhqRuntimeIdentityToken||fhqGetPrimaryAccountLock()===fhqRuntimeIdentityToken)fhqLockPrimaryAccount(fhqRuntimeIdentityToken,profile);
      try{
        localStorage.setItem(fhqStableGuestKey(),JSON.stringify({
          token:fhqRuntimeIdentityToken,
          username:String(profile.username||''),
          savedAt:Date.now()
        }));
      }catch(e){}
    }
    if(profile.username){fhqRuntimeIdentityName=String(profile.username);fhqPersistUsernameEverywhere(profile.username);}
    fhqWriteLastConfirmedAccount(profile);
    if(profile.equippedTitle!=null)fhqSetEquippedTitleLocal(profile.equippedTitle||FHQ_STARTER_TITLE);
    if(profile.avatarUrl||profile.avatarEmoji){
      const pref=fhqProfilePrefs();pref.image=String(profile.avatarUrl||'');pref.avatar=String(profile.avatarEmoji||FHQ_STARTER_AVATAR);fhqWriteJSON(FHQ_PROFILE_KEY,pref);
    }
    window.__fhqCosmetics={inventory:Array.isArray(profile.inventory)?profile.inventory:[],collection:Array.isArray(profile.collection)?profile.collection:[],ring:String(profile.equippedRing||''),banner:String(profile.equippedBanner||''),coins:Number(profile.hqCoins||0),dailyWins:Number(profile.dailyWins||profile.totalDailies||0)};
    fhqRememberCoins(profile.hqCoins);fhqHandleWelcomeReward(profile);
    if(Array.isArray(profile.achievementIds)&&profile.achievementIds.length){
      const merged=Array.from(new Set(fhqAchievementUnlocks().concat(profile.achievementIds)));fhqSaveAchievementUnlocks(merged);
    }
    fhqSyncLocalProfileFromServer(profile);
  }
  function fhqGuestName(){
    if(fhqRuntimeIdentityName&&/^Guest-/i.test(fhqRuntimeIdentityName))return fhqRuntimeIdentityName;
    const t=fhqGetToken(),tail=t.replace(/[^A-Za-z0-9]/g,'').slice(-6).toUpperCase();
    return 'Guest-'+(tail||'PLAYER');
  }
  function fhqGetUsername(){let n='';try{n=localStorage.getItem(fhqUsernameKey())||''}catch(e){}return n||fhqIdentityUsernameCookie()||''}
  function fhqSetUsername(name){fhqPersistUsernameEverywhere(name)}
  function fhqHasServer(){return typeof google!=='undefined'&&google.script&&google.script.run}
  function fhqUpdateAccountUI(profile){
    const name=(profile&&profile.username)||fhqGetUsername()||'Guest';
    const pts=Math.max(getDailyPoints(),profile&&Number.isFinite(Number(profile.points))?Number(profile.points):0);
    const cardName=document.getElementById('fhqAccountName');
    const cardMeta=document.getElementById('fhqAccountMeta');
    if(cardName)cardName.textContent=name;
    const lvl=fhqLevelInfo(pts).level;
    if(cardMeta)cardMeta.textContent=name==='Guest'?'Choose a username to join the leaderboard':('LVL '+lvl+' • '+pts+' lifetime points');
  }
  function fhqOpenAccountModal(){
    const modal=document.getElementById('fhqAccountModal');
    const input=document.getElementById('fhqUsernameInput');
    const err=document.getElementById('fhqAccountError');
    const form=document.getElementById('fhqFootballAccountForm');
    if(form)form.classList.remove('open');
    if(input)input.value=fhqGetUsername();
    if(err){err.textContent='';err.className='fhq-account-error'}
    if(modal)modal.classList.add('open');
  }
  function fhqCloseAccountModal(){const m=document.getElementById('fhqAccountModal');if(m)m.classList.remove('open')}
  function fhqRegisterAccount(){
    const input=document.getElementById('fhqUsernameInput'),err=document.getElementById('fhqAccountError');
    const username=String(input&&input.value||'').trim();
    if(!/^[A-Za-z0-9_ -]{3,20}$/.test(username)){
      if(err)err.textContent='Use 3–20 letters, numbers, spaces, _ or -.';
      return;
    }

    /* Local save happens FIRST so the button always works,
       even before the shared Code.gs backend is installed/deployed. */
    fhqSetUsername(username);
    fhqUpdateAccountUI({username:username,points:getDailyPoints()});
    if(err){err.textContent='Username saved.';err.className='fhq-account-error fhq-account-success'}

    if(!fhqHasServer()){
      setTimeout(fhqCloseAccountModal,350);
      renderStandaloneLeaderboard();
      return;
    }

    try{
      google.script.run
        .withSuccessHandler(function(profile){
          if(profile&&profile.username)fhqSetUsername(profile.username);
          fhqUpdateAccountUI(profile||{username:username,points:getDailyPoints()});
          if(err){err.textContent='Saved and synced!';err.className='fhq-account-error fhq-account-success'}
          setTimeout(fhqCloseAccountModal,350);
          renderStandaloneLeaderboard();
        })
        .withFailureHandler(function(error){
          /* Keep the local username even when backend functions are not deployed yet. */
          console.warn('Shared account sync unavailable',error);
          if(err){
            err.textContent='Saved on this device. Shared leaderboard sync needs the Code.gs update/redeploy.';
            err.className='fhq-account-error fhq-account-success';
          }
          setTimeout(fhqCloseAccountModal,900);
          renderStandaloneLeaderboard();
        })
        .registerFootballHQAccount(username,fhqGetToken());
    }catch(error){
      console.warn(error);
      if(err){
        err.textContent='Saved on this device. Shared sync is not deployed yet.';
        err.className='fhq-account-error fhq-account-success';
      }
      setTimeout(fhqCloseAccountModal,800);
      renderStandaloneLeaderboard();
    }
  }

  const FHQ_PRIMARY_ACCOUNT_LOCK_KEY='footballHQPrimaryAccountLockV80';
  const FHQ_URL_ACCOUNT_PARAM='fhqAccount';
  function fhqUrlAccountLock(){
    try{
      const u=new URL(window.location.href);
      const q=String(u.searchParams.get(FHQ_URL_ACCOUNT_PARAM)||'').trim();
      if(q)return q;
      const raw=String(u.hash||'').replace(/^#/,'');
      const hp=new URLSearchParams(raw);
      return String(hp.get(FHQ_URL_ACCOUNT_PARAM)||'').trim();
    }catch(e){return ''}
  }
  function fhqPersistAccountInUrl(token){
    token=String(token||'').trim();if(!token)return;
    try{
      const u=new URL(window.location.href);
      u.searchParams.set(FHQ_URL_ACCOUNT_PARAM,token);
      // Keep a hash copy too. Apps Script previews occasionally rewrite one layer
      // of the URL, so having both gives refresh/reopen another durable source.
      const hp=new URLSearchParams(String(u.hash||'').replace(/^#/,''));
      hp.set(FHQ_URL_ACCOUNT_PARAM,token);u.hash=hp.toString();
      history.replaceState(history.state||null,'',u.pathname+u.search+u.hash);
    }catch(e){}
  }
  function fhqRemoveAccountFromUrl(){
    try{
      const u=new URL(window.location.href);u.searchParams.delete(FHQ_URL_ACCOUNT_PARAM);
      const hp=new URLSearchParams(String(u.hash||'').replace(/^#/,''));hp.delete(FHQ_URL_ACCOUNT_PARAM);
      const hs=hp.toString();u.hash=hs?('#'+hs):'';
      history.replaceState(history.state||null,'',u.pathname+u.search+u.hash);
    }catch(e){}
  }
  function fhqPrimaryAccountCookie(){
    try{const m=document.cookie.match(/(?:^|;\s*)fhq_primary_account=([^;]+)/);return m?decodeURIComponent(m[1]):''}catch(e){return ''}
  }
  function fhqGetPrimaryAccountLock(){
    // V82.1: an account explicitly selected in Admin is the strongest identity.
    // A URL token is only a final fallback: old deployment URLs can outlive the
    // account selection that replaced them and were causing valid accounts to be
    // rejected after refresh.
    let manual='',local='';
    try{manual=localStorage.getItem('footballHQManualAccountPinV1')||''}catch(e){}
    try{local=localStorage.getItem(FHQ_PRIMARY_ACCOUNT_LOCK_KEY)||''}catch(e){}
    return manual||local||fhqPrimaryAccountCookie()||fhqReadWindowIdentity()||fhqUrlAccountLock()||'';
  }
  function fhqLockPrimaryAccount(token,profile){
    token=String(token||'').trim();if(!token)return;
    try{localStorage.setItem(FHQ_PRIMARY_ACCOUNT_LOCK_KEY,token)}catch(e){}
    try{document.cookie='fhq_primary_account='+encodeURIComponent(token)+'; path=/; max-age=31536000; SameSite=Lax'}catch(e){}
    fhqPersistAccountInUrl(token);
    fhqRememberToken(token,true);fhqPersistPrimaryEverywhere(token);
    if(profile&&profile.username)fhqPersistUsernameEverywhere(profile.username);
  }
  function fhqClearPrimaryAccountLock(){
    try{localStorage.removeItem(FHQ_PRIMARY_ACCOUNT_LOCK_KEY)}catch(e){}
    try{document.cookie='fhq_primary_account=; path=/; max-age=0; SameSite=Lax'}catch(e){}
    fhqRemoveAccountFromUrl();
  }

  const FHQ_LAST_CONFIRMED_ACCOUNT_KEY='footballHQLastConfirmedAccountV821';
  function fhqReadLastConfirmedAccount(){
    try{
      const x=JSON.parse(localStorage.getItem(FHQ_LAST_CONFIRMED_ACCOUNT_KEY)||'null');
      return x&&typeof x==='object'?x:null;
    }catch(e){return null}
  }
  function fhqWriteLastConfirmedAccount(profile){
    if(!profile||!profile.token)return;
    const username=String(profile.username||'').trim();
    const established=!!username&&!/^Guest-/i.test(username) || Number(profile.points||0)>0 || Number(profile.hqCoins||0)>0 || Number(profile.totalDailies||profile.dailyWins||0)>0;
    if(!established)return;
    const snap={
      token:String(profile.token),username:username,
      points:Math.max(0,Number(profile.points)||0),hqCoins:Math.max(0,Number(profile.hqCoins)||0),
      totalDailies:Math.max(0,Number(profile.totalDailies||profile.dailyWins)||0),savedAt:Date.now()
    };
    try{localStorage.setItem(FHQ_LAST_CONFIRMED_ACCOUNT_KEY,JSON.stringify(snap))}catch(e){}
  }
  function fhqIdentityCandidates(){
    const out=[];const add=function(v){v=String(v||'').trim();if(v&&!out.includes(v))out.push(v)};
    add(fhqGetManualAccountPin());
    try{add(localStorage.getItem(FHQ_PRIMARY_ACCOUNT_LOCK_KEY)||'')}catch(e){}
    const last=fhqReadLastConfirmedAccount();add(last&&last.token);
    add(fhqPrimaryAccountCookie());add(fhqReadWindowIdentity());
    const vault=fhqReadTokenVault();add(vault.primary);(vault.known||[]).forEach(add);
    add(fhqRuntimeIdentityToken);
    // URL is intentionally last. It is useful when other storage is unavailable,
    // but must never override a newer Admin selection.
    add(fhqUrlAccountLock());
    return out;
  }

  const FHQ_MANUAL_ACCOUNT_PIN_KEY='footballHQManualAccountPinV1';
  function fhqGetManualAccountPin(){try{return localStorage.getItem(FHQ_MANUAL_ACCOUNT_PIN_KEY)||''}catch(e){return ''}}
  function fhqSetManualAccountPin(token){try{token?localStorage.setItem(FHQ_MANUAL_ACCOUNT_PIN_KEY,String(token)):localStorage.removeItem(FHQ_MANUAL_ACCOUNT_PIN_KEY)}catch(e){}if(token)fhqLockPrimaryAccount(String(token));}

  function fhqLoadSharedProfile(){
    const last=fhqReadLastConfirmedAccount();
    const savedUsername=fhqGetUsername()||String(last&&last.username||'');
    const localProfile=getAccountProfile();
    const candidates=fhqIdentityCandidates();
    const hasEstablishedEvidence=!!(
      candidates.length ||
      (savedUsername&&!/^Guest-/i.test(savedUsername)) ||
      (last&&last.token)
    );
    window.__fhqIdentityResolving=true;

    // Never visually zero-out an established player while the server is resolving.
    if(hasEstablishedEvidence){
      document.documentElement.classList.add('fhq-identity-recovering');
      const cachedPoints=Math.max(Number(last&&last.points)||0,Number(localProfile.points)||0,fhqLastKnownLifetimePoints());
      const cachedCoins=Math.max(Number(last&&last.hqCoins)||0,fhqCachedCoins());
      fhqUpdateAccountUI({username:savedUsername||String(last&&last.username||'Player'),points:cachedPoints,hqCoins:cachedCoins});
      fhqRememberCoins(cachedCoins);fhqPrimeLeaderboardPointDisplay();refreshFootballHQDashboard();
    }else{
      fhqUpdateAccountUI({username:savedUsername||fhqRuntimeIdentityName||'Guest',points:Math.max(Number(localProfile.points)||0,fhqLastKnownLifetimePoints())});
      fhqPrimeLeaderboardPointDisplay();refreshFootballHQDashboard();
    }

    if(!fhqHasServer()){
      document.documentElement.classList.remove('fhq-identity-recovering');window.__fhqIdentityResolving=false;return;
    }

    function profileMatchesIntent(profile){
      if(!profile||!profile.token)return false;
      const name=String(profile.username||'');
      // If this browser has a real saved username, never accept a newly-created
      // Guest profile as a successful recovery for it.
      if(savedUsername&&!/^Guest-/i.test(savedUsername)&&/^Guest-/i.test(name))return false;
      return true;
    }
    function accept(profile,lockIt){
      if(!profileMatchesIntent(profile))return false;
      window.__fhqIdentityResolving=false;document.documentElement.classList.remove('fhq-identity-recovering');
      if(lockIt&&profile.token){
        fhqLockPrimaryAccount(profile.token,profile);
        // Once a real account has been recovered, make it the durable browser pin.
        if(!/^Guest-/i.test(String(profile.username||''))){try{localStorage.setItem(FHQ_MANUAL_ACCOUNT_PIN_KEY,String(profile.token))}catch(e){}}
      }
      fhqSetRuntimeIdentity(profile);fhqWriteLastConfirmedAccount(profile);
      const serverName=String(profile.username||'');
      if(serverName){fhqRuntimeIdentityName=serverName;if(!/^Guest-/i.test(serverName))fhqSetUsername(serverName);}
      fhqSyncLocalProfileFromServer(profile);fhqRememberLifetimePoints(Number(profile.points)||0);fhqUpdateAccountUI(profile);fhqHandleProgressionUpdate(profile,true);
      setTimeout(fhqSyncAllUnlockedAchievements,250);fhqPaintAvatar();fhqRenderCompetitiveRewards();refreshFootballHQScoreDisplays();refreshFootballHQDashboard();renderStandaloneLeaderboard();setTimeout(fhqCheckPlacementRewards,900);return true;
    }
    function finishNoIdentity(showWarning){
      window.__fhqIdentityResolving=false;document.documentElement.classList.remove('fhq-identity-recovering');
      if(hasEstablishedEvidence){
        const cachedPoints=Math.max(Number(last&&last.points)||0,Number(localProfile.points)||0,fhqLastKnownLifetimePoints());
        const cachedCoins=Math.max(Number(last&&last.hqCoins)||0,fhqCachedCoins());
        fhqUpdateAccountUI({username:savedUsername||String(last&&last.username||'Player'),points:cachedPoints,hqCoins:cachedCoins});
        fhqRememberCoins(cachedCoins);refreshFootballHQScoreDisplays();refreshFootballHQDashboard();
        if(showWarning)fhqBalanceMessage('Saved Football HQ account is still being protected. Open Account Recovery if it does not reconnect.',true);
        return;
      }
      renderStandaloneLeaderboard();
    }

    function resolveByUsername(){
      const recoveryName=savedUsername&&!/^Guest-/i.test(savedUsername)?savedUsername:'';
      if(!recoveryName){finishNoIdentity(true);return;}
      google.script.run
        .withSuccessHandler(function(found){if(!accept(found,true))finishNoIdentity(true)})
        .withFailureHandler(function(){finishNoIdentity(true)})
        .resolveFootballHQBrowserIdentity(candidates,recoveryName);
    }

    function tryCandidate(index){
      if(index>=candidates.length){resolveByUsername();return;}
      const token=candidates[index];
      google.script.run
        .withSuccessHandler(function(profile){
          if(accept(profile,true))return;
          tryCandidate(index+1);
        })
        .withFailureHandler(function(){tryCandidate(index+1)})
        .getFootballHQAccount(token);
    }

    if(candidates.length){tryCandidate(0);return;}

    // Brand-new browser only: no saved account evidence exists, so the normal
    // Guest path is allowed. Existing players never enter this branch.
    const freshToken=fhqGetToken();
    google.script.run
      .withSuccessHandler(function(profile){if(!accept(profile,false))finishNoIdentity(false)})
      .withFailureHandler(function(){finishNoIdentity(false)})
      .getFootballHQAccount(freshToken);
  }

  function fhqCoinSound(){
    try{
      const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)return;
      const ctx=new Ctx(),now=ctx.currentTime;
      [880,1174.66,1567.98].forEach(function(freq,i){
        const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=freq;
        g.gain.setValueAtTime(0.0001,now+i*.055);g.gain.exponentialRampToValueAtTime(.07,now+i*.055+.015);g.gain.exponentialRampToValueAtTime(.0001,now+i*.055+.16);
        o.connect(g);g.connect(ctx.destination);o.start(now+i*.055);o.stop(now+i*.055+.18);
      });
      setTimeout(()=>ctx.close&&ctx.close(),500);
    }catch(e){}
  }
  function fhqAnimateCoinCounter(from,to){
    from=Math.max(0,Number(from)||0);to=Math.max(0,Number(to)||0);
    const ids=['fhqGlobalCoins','fhqShopCoins','fhqPassCoins','fhqLockerCoins'],els=ids.map(id=>document.getElementById(id)).filter(Boolean);
    if(!els.length){fhqRememberCoins(to);return}
    const start=performance.now(),duration=Math.min(1100,380+Math.abs(to-from)*14);
    function tick(now){
      const t=Math.min(1,(now-start)/duration),ease=1-Math.pow(1-t,3),v=Math.round(from+(to-from)*ease);
      els.forEach(el=>el.textContent=String(v));
      if(t<1)requestAnimationFrame(tick);else fhqRememberCoins(to);
    }
    requestAnimationFrame(tick);
  }
  function fhqShowCoinAward(amount,newBalance){
    amount=Number(amount)||0;if(amount<=0)return;
    const before=Number.isFinite(Number(newBalance))?Math.max(0,Number(newBalance)-amount):fhqCachedCoins();
    const after=Number.isFinite(Number(newBalance))?Number(newBalance):before+amount;
    let el=document.getElementById('fhqCoinToast');
    if(!el){el=document.createElement('div');el.id='fhqCoinToast';el.className='fhq-coin-toast';document.body.appendChild(el)}
    el.innerHTML='<span class="fhq-coin-icon" style="width:24px;height:24px"></span><b>+'+amount+'</b> HQ Coins';
    el.classList.remove('show');void el.offsetWidth;el.classList.add('show');
    const target=document.getElementById('fhqGlobalCoins')||document.getElementById('fhqShopCoins')||document.getElementById('fhqPassCoins')||document.getElementById('fhqProfileButton');
    const tr=target&&target.getBoundingClientRect?target.getBoundingClientRect():null;
    for(let i=0;i<Math.min(8,Math.max(3,Math.ceil(amount/8)));i++){
      const c=document.createElement('span');c.className='fhq-coin-fly';c.textContent='HQ';
      const sx=window.innerWidth/2+(Math.random()-.5)*100,sy=window.innerHeight/2+(Math.random()-.5)*50;c.style.left=sx+'px';c.style.top=sy+'px';document.body.appendChild(c);
      requestAnimationFrame(function(){
        const tx=tr?(tr.left+tr.width/2-sx):window.innerWidth*.42,ty=tr?(tr.top+tr.height/2-sy):-window.innerHeight*.35;
        c.style.setProperty('--coin-x',tx+'px');c.style.setProperty('--coin-y',ty+'px');c.classList.add('go');
      });
      setTimeout(()=>c.remove(),920+i*25);
    }
    fhqCoinSound();fhqAnimateCoinCounter(before,after);
    clearTimeout(window.__fhqCoinToastTimer);window.__fhqCoinToastTimer=setTimeout(()=>el.classList.remove('show'),1900);
  }

  function fhqSubmitSharedDaily(game,points,date){
    const username=fhqGetUsername()||fhqGuestName();
    if(!fhqHasServer())return;
    const beforeCoins=Number(window.__fhqCosmetics&&window.__fhqCosmetics.coins)||0;
    google.script.run
      .withSuccessHandler(function(profile){
        if(profile){
          const afterCoins=Number(profile.hqCoins)||0;
          fhqSetRuntimeIdentity(profile);
          fhqRememberLifetimePoints(Number(profile.points)||0);
          fhqUpdateAccountUI(profile);
          fhqHandleProgressionUpdate(profile,false);
          if(afterCoins>beforeCoins)fhqShowCoinAward(afterCoins-beforeCoins,afterCoins);
        }
        renderStandaloneLeaderboard();
      })
      .withFailureHandler(function(error){console.warn('Shared leaderboard update failed',error)})
      .submitFootballHQDailyResult({
        token:fhqGetToken(),username:username,game:game,points:Number(points)||0,date:date
      });
  }


  const FHQ_PROFILE_KEY='footballHQProfilePrefsV1';
  const FHQ_PLAY_COUNTS_KEY='footballHQGamePlayCountsV1';
  const FHQ_TOP10_KEY='footballHQTop10FinishesV1';

  function fhqReadJSON(key,fallback){
    try{const v=JSON.parse(localStorage.getItem(key)||'null');return v==null?fallback:v}catch(e){return fallback}
  }
  function fhqWriteJSON(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch(e){}}

  function fhqTodayStats(){
    const p=getAccountProfile(),today=dailyDateKey(),history=Array.isArray(p.history)?p.history:[];
    const todayHistory=history.filter(h=>String(h.date||'')===today);
    return {
      points:todayHistory.reduce((sum,h)=>sum+(Number(h.points)||0),0),
      count:todayHistory.length
    };
  }

  const FHQ_DAILY_DASH_GAMES=['players','legends','grid','whoami','career','connections','statline','draftclass','moggle','timeline','guessteam','depthchart'];
  function fhqDailyFinished(game){
    try{if(savedDailyFinishedForGame(game))return true;const s=fhqReadDailyServerSnapshot(),a=s&&Array.isArray(s.completedGames)?s.completedGames:[];return a.includes(String(game||''))}catch(e){return false}
  }
  function fhqDecorateHomeDailyCards(){
    const grid=document.querySelector('.fhq-daily-scroll .fhq-card-grid');if(!grid)return;
    const cards=Array.from(grid.querySelectorAll('[data-game-open]'));
    cards.forEach(function(card,index){
      if(!card.querySelector('.fhq-home-game-art')){
        const source=document.querySelector('.fhq-game-tile[data-game-open="'+card.dataset.gameOpen+'"] .fhq-game-cover');
        const art=document.createElement('div');art.className='fhq-home-game-art';
        art.innerHTML=source?source.innerHTML:'<svg viewBox="0 0 72 72"><path class="s" d="M16 36h40M36 16v40"/></svg>';
        card.insertBefore(art,card.firstChild);
      }
      const done=fhqDailyFinished(card.dataset.gameOpen);
      card.classList.toggle('fhq-daily-card-complete',done);const tag=card.querySelector('.tag');if(tag)tag.textContent=done?'Completed':'Daily';
      card.style.order=String(done?100+index:index);
      card.title=done?'Daily complete — open to view your result or choose Unlimited.':'Play today’s Daily Challenge';
    });
  }

  function refreshFootballHQDashboard(serverDaily){
    const p=getAccountProfile(),snap=serverDaily||fhqReadDailyServerSnapshot();
    const localCompleted=FHQ_DAILY_DASH_GAMES.filter(fhqDailyFinished),serverCount=snap?Number(snap.totalDailies)||0:0;
    const completedCount=Math.max(localCompleted.length,serverCount),remaining=Math.max(0,FHQ_DAILY_DASH_GAMES.length-completedCount);
    const next=FHQ_DAILY_DASH_GAMES.find(g=>!fhqDailyFinished(g))||'players';
    const labels={players:'Active Players',legends:'Legends',grid:'Grid',whoami:'Who Am I?',career:'Career Path',connections:'Connections',statline:'Stat Line',draftclass:'Draft Class',moggle:'Mogger',timeline:'Timeline',guessteam:'Franchise Finder',depthchart:'Depth Chart'};
    const progress=document.getElementById('fhqDashProgress'),progressText=document.getElementById('fhqDashProgressText'),bar=document.getElementById('fhqDashProgressBar'),life=document.getElementById('fhqDashLifetime'),streak=document.getElementById('fhqDashStreak'),nextEl=document.getElementById('fhqDashNext');
    if(progress)progress.textContent=completedCount+' / '+FHQ_DAILY_DASH_GAMES.length;
    if(progressText)progressText.textContent=remaining?remaining+' Daily game'+(remaining===1?'':'s')+' remaining':'All Daily games complete!';
    if(bar)bar.style.width=((completedCount/FHQ_DAILY_DASH_GAMES.length)*100)+'%';
    if(life){life.textContent=String(Math.max(Number(p.points)||0,fhqLastKnownLifetimePoints()));const card=life.closest('.fhq-dashboard-card');if(card)card.classList.add('server-synced')}
    if(streak)streak.textContent=String(Math.max(Number(p.streakDays)||0,Number(snap&&snap.streakDays)||0));
    if(nextEl)nextEl.textContent=remaining?(labels[next]||next):'Daily Complete';
    document.querySelectorAll('.fhq-daily-scroll [data-game-open]').forEach(function(card){const done=fhqDailyFinished(card.dataset.gameOpen);card.classList.toggle('fhq-daily-card-complete',done);const tag=card.querySelector('.tag');if(tag)tag.textContent=done?'Completed':'Daily';});
    fhqDecorateHomeDailyCards();
  }
  function refreshFootballHQScoreDisplays(){
    const p=getAccountProfile(),today=fhqTodayStats(),snap=fhqReadDailyServerSnapshot();
    const homePts=document.getElementById('fhqPoints'),homeCount=document.getElementById('fhqDailyCount');
    const shownPoints=Math.max(Number(today.points)||0,Number(snap&&snap.points)||0),shownCount=Math.max(Number(today.count)||0,Number(snap&&snap.totalDailies)||0);
    if(homePts)homePts.textContent=String(shownPoints);
    if(homeCount)homeCount.textContent=shownCount+' daily challenge'+(shownCount===1?'':'s')+' completed today';

    const lp=document.getElementById('fhqProfileLifetimePoints');
    const dw=document.getElementById('fhqProfileDailyWins');
    const dc=document.getElementById('fhqProfileDailies');
    const st=document.getElementById('fhqProfileStreak');const pc=document.getElementById('fhqProfileCoins');if(pc)pc.textContent=String(Number(window.__fhqCosmetics&&window.__fhqCosmetics.coins)||0);
    if(lp)lp.textContent=String(Number(p.points)||0);
    const serverWins=Number(window.__fhqCosmetics&&window.__fhqCosmetics.dailyWins);
    if(dw)dw.textContent=String(Number.isFinite(serverWins)?serverWins:fhqCountDailyWins());
    if(dc)dc.textContent=String(Number(p.totalDailies)||0);
    if(st)st.textContent=String(Number(p.streakDays)||0);
    refreshFootballHQDashboard();
  }

  function fhqCountDailyWins(){
    let wins=0;
    try{
      for(let i=0;i<localStorage.length;i++){
        const key=localStorage.key(i)||'';
        if(!key.startsWith('footballDailyV9:'))continue;
        const state=JSON.parse(localStorage.getItem(key)||'null');
        if(state&&state.finished&&state.gameWon)wins++;
      }
    }catch(e){}
    return wins;
  }

  function fhqRecordGameOpen(game){
    const counts=fhqReadJSON(FHQ_PLAY_COUNTS_KEY,{});
    counts[game]=(Number(counts[game])||0)+1;
    fhqWriteJSON(FHQ_PLAY_COUNTS_KEY,counts);
  }
  function fhqMostPlayedGame(){
    const counts=fhqReadJSON(FHQ_PLAY_COUNTS_KEY,{});
    const names={
      players:'Active Players',grid:'Grid',legends:'Legends',whoami:'Who Am I?',career:'Career Path',
      higherlower:'Higher / Lower',imposter:'Imposter',connections:'Connections',statline:'Stat Line',
      draftclass:'Draft Class',moggle:'Mogger',timeline:'Timeline',guessteam:'Franchise Finder',depthchart:'Depth Chart'
    };
    let best='',n=0;
    Object.keys(counts).forEach(function(k){if(Number(counts[k])>n){best=k;n=Number(counts[k])}});
    return {name:n?(names[best]||best):'None yet',count:n};
  }


  const FHQ_SIDEBAR_KEY='footballHQSidebarCollapsedV1';
  const FHQ_GAME_STATS_KEY='footballHQCompetitiveStatsV1';

  function fhqInitSidebarToggle(){
    const btn=document.getElementById('fhqSidebarToggle');
    let collapsed=false;
    try{collapsed=localStorage.getItem(FHQ_SIDEBAR_KEY)==='1'}catch(e){}
    document.body.classList.toggle('fhq-sidebar-collapsed',collapsed);
    if(btn){
      btn.textContent=collapsed?'›':'‹';
      btn.title=collapsed?'Expand sidebar':'Collapse sidebar';
      btn.onclick=function(){
        const next=!document.body.classList.contains('fhq-sidebar-collapsed');
        document.body.classList.toggle('fhq-sidebar-collapsed',next);
        this.textContent=next?'›':'‹';
        this.title=next?'Expand sidebar':'Collapse sidebar';
        try{localStorage.setItem(FHQ_SIDEBAR_KEY,next?'1':'0')}catch(e){}
      };
    }
  }

  function fhqGameStats(){
    return fhqReadJSON(FHQ_GAME_STATS_KEY,{});
  }
  function fhqSaveGameStats(all){
    fhqWriteJSON(FHQ_GAME_STATS_KEY,all||{});
  }
  let fhqCompetitiveStartedAt=Date.now();

  const FHQ_GAME_METRICS={
    players:{personal:'Fewest Guesses',world:'Fewest Guesses',direction:'lower',secondary:'Fastest Time'},
    grid:{personal:'Fewest Misses',world:'Fewest Misses',direction:'lower',secondary:'Fastest Time'},
    legends:{personal:'Fewest Guesses',world:'Fewest Guesses',direction:'lower',secondary:'Fastest Time'},
    whoami:{personal:'Fewest Clues',world:'Fewest Clues',direction:'lower',secondary:'Fastest Time'},
    career:{personal:'Fewest Guesses',world:'Fewest Guesses',direction:'lower',secondary:'Fastest Time'},
    higherlower:{personal:'Longest Streak',world:'Longest Streak',direction:'higher',secondary:'Fastest Run'},
    imposter:{personal:'Best Streak',world:'Best Streak',direction:'higher',secondary:'Fastest Run'},
    connections:{personal:'Fewest Mistakes',world:'Fewest Mistakes',direction:'lower',secondary:'Fastest Time'},
    statline:{personal:'Fastest Solve',world:'Fastest Solve',direction:'lower',secondary:'Fewest Guesses'},
    draftclass:{personal:'Fewest Guesses',world:'Fewest Guesses',direction:'lower',secondary:'Fastest Time'},
    moggle:{personal:'Best Streak',world:'Best Streak',direction:'higher',secondary:'Fastest Run'},
    timeline:{personal:'Fewest Attempts',world:'Fewest Attempts',direction:'lower',secondary:'Fastest Time'},
    guessteam:{personal:'Fewest Clues',world:'Fewest Clues',direction:'lower',secondary:'Lives Left'},
    depthchart:{personal:'Best Streak',world:'Best Streak',direction:'higher',secondary:'Fastest Run'}
  };

  function fhqElapsedSeconds(){
    return Math.max(1,Math.round((Date.now()-Number(fhqCompetitiveStartedAt||Date.now()))/1000));
  }

  function fhqGuessCount(rawScore){
    if(Number.isFinite(Number(rawScore)))return Number(rawScore);
    if(specialState&&Number.isFinite(Number(specialState.guesses)))return Number(specialState.guesses);
    if(Array.isArray(guesses))return guesses.length;
    return 1;
  }

  function fhqCompetitiveMetric(game,won,rawScore){
    game=String(game||'');
    const s=specialState||{};
    const elapsed=fhqElapsedSeconds();
    let score=fhqGuessCount(rawScore),secondary=elapsed;

    if(game==='grid'){
      score=Number.isFinite(Number(gridMisses))?Number(gridMisses):score;
    }else if(game==='higherlower'){
      score=Math.max(Number(s.bestStreak)||0,Number(s.streak)||0,Number(s.score)||0);
    }else if(game==='imposter'){
      score=Math.max(Number(s.bestStreak)||0,Number(s.streak)||0,Number(s.score)||0);
    }else if(game==='moggle'){
      score=playType==='daily'?1:Math.max(Number(s.bestStreak)||0,Number(s.streak)||0);
    }else if(game==='connections'){
      const lives=Number(s.lives);
      score=Number.isFinite(lives)?Math.max(0,4-lives):score;
    }else if(game==='statline'){
      score=Number.isFinite(Number(s.elapsedSeconds))?Number(s.elapsedSeconds):elapsed;
      secondary=Array.isArray(s.history)?s.history.length:fhqGuessCount(rawScore);
    }else if(game==='whoami'){
      score=Number.isFinite(Number(s.revealed))?Number(s.revealed):score;
    }else if(game==='career'){
      score=Math.max(1,Number.isFinite(Number(s.guesses))?Number(s.guesses):fhqGuessCount(rawScore));
    }else if(game==='timeline'){
      score=Number.isFinite(Number(s.attempts))?Number(s.attempts):1;
    }else if(game==='guessteam'){
      score=Number.isFinite(Number(s.revealed))?Number(s.revealed):1;
      secondary=Number.isFinite(Number(s.lives))?Number(s.lives):0;
    }else if(game==='depthchart'){
      score=Math.max(Number(s.bestStreak)||0,Number(s.streak)||0,getGameStreak('depthchart'));
    }else{
      score=fhqGuessCount(rawScore);
    }

    const cfg=FHQ_GAME_METRICS[game]||{direction:'lower'};
    return {
      score:Number(score),
      secondary:Number(secondary),
      direction:cfg.direction||'lower',
      secondaryDirection:game==='guessteam'?'higher':'lower'
    };
  }

  function fhqMetricDirection(game){
    return (FHQ_GAME_METRICS[game]&&FHQ_GAME_METRICS[game].direction)||'lower';
  }

  function fhqIsBetterMetric(game,next,prev){
    if(!prev)return true;
    const dir=fhqMetricDirection(game);
    if(Number(next.score)!==Number(prev.score)){
      return dir==='higher'?Number(next.score)>Number(prev.score):Number(next.score)<Number(prev.score);
    }
    const secDir=String(next.secondaryDirection||'lower');
    if(Number(next.secondary)!==Number(prev.secondary)){
      return secDir==='higher'?Number(next.secondary)>Number(prev.secondary):Number(next.secondary)<Number(prev.secondary);
    }
    return false;
  }

  function fhqRecordCompetitiveResult(game,won,rawScore){
    game=String(game||'');if(!game)return null;
    const metric=fhqCompetitiveMetric(game,won,rawScore);
    const all=fhqGameStats();
    const s=all[game]||{currentStreak:0,maxStreak:0,personalBest:null,personalSecondary:null};

    if(won){
      s.currentStreak=(Number(s.currentStreak)||0)+1;
      s.maxStreak=Math.max(Number(s.maxStreak)||0,s.currentStreak);
    }else{
      s.currentStreak=0;
    }

    const prev=s.personalBest==null?null:{
      score:Number(s.personalBest),
      secondary:Number(s.personalSecondary),
      secondaryDirection:s.personalSecondaryDirection||'lower'
    };
    const completedRun=won||['higherlower','imposter','draftclass','moggle','depthchart'].includes(game);
    if(completedRun&&Number.isFinite(Number(metric.score))&&fhqIsBetterMetric(game,metric,prev)){
      s.personalBest=metric.score;
      s.personalSecondary=metric.secondary;
      s.personalSecondaryDirection=metric.secondaryDirection;
    }
    all[game]=s;fhqSaveGameStats(all);fhqRenderCompetitiveStats();
    return metric;
  }

  function fhqFormatMetric(game,score,secondary){
    if(score==null||!Number.isFinite(Number(score)))return '—';
    score=Number(score);
    if(game==='statline')return score+'s';
    if(game==='higherlower'||game==='imposter'||game==='moggle'||game==='depthchart')return String(score);
    if(game==='grid'||game==='connections')return score+' miss'+(score===1?'':'es');
    if(game==='whoami'||game==='guessteam')return score+' clue'+(score===1?'':'s');
    if(game==='career'){score=Math.max(1,score);return score+' guess'+(score===1?'':'es');}
    if(game==='timeline'||game==='depthchart')return score+' attempt'+(score===1?'':'s');
    return score+' guess'+(score===1?'':'es');
  }


  function fhqRenderCompetitiveStats(worldRows){
    const local=fhqGameStats();
    const worlds=worldRows||window.__fhqWorldBestCache||{};
    document.querySelectorAll('[data-game-stats]').forEach(function(row){
      const g=row.dataset.gameStats,s=local[g]||{},w=worlds[g];
      const streak=row.querySelector('[data-stat="streak"]');
      const personal=row.querySelector('[data-stat="personal"]');
      const world=row.querySelector('[data-stat="world"]');
      if(streak)streak.textContent=String(Number(s.maxStreak)||0);
      if(personal)personal.textContent=fhqFormatMetric(g,s.personalBest,s.personalSecondary);
      const worldScore=w&&typeof w==='object'?w.score:w;
      const worldSecondary=w&&typeof w==='object'?w.secondary:null;
      if(world)world.textContent=fhqFormatMetric(g,worldScore,worldSecondary);
    });
  }

  const FHQ_GAME_LABELS={
    players:'Active Players',grid:'Grid',legends:'Legends',whoami:'Who Am I?',career:'Career Path',
    higherlower:'Higher / Lower',imposter:'Imposter',connections:'Connections',statline:'Stat Line',
    draftclass:'Draft Class',moggle:'Mogger',timeline:'Timeline',guessteam:'Franchise Finder',depthchart:'Depth Chart'
  };
  function fhqScoreLabel(game,score,secondary){
    return fhqFormatMetric(game,score,secondary);
  }

  function fhqWorldAvatarHTML(r,cls){
    cls=cls||'fhq-world-row-avatar';
    if(r&&r.avatarUrl)return '<span class="'+cls+'"><img src="'+esc(r.avatarUrl)+'" alt=""></span>';
    if(r&&r.avatarEmoji)return '<span class="'+cls+'">'+esc(r.avatarEmoji)+'</span>';
    return '<span class="'+cls+'">'+esc(fhqInitials((r&&r.username)||'Player'))+'</span>';
  }

  function openFootballHQWorldRankings(game){
    game=String(game||'');
    const modal=document.getElementById('fhqWorldModal'),list=document.getElementById('fhqWorldList');
    const title=document.getElementById('fhqWorldTitle'),copy=document.getElementById('fhqWorldCopy');
    if(!modal||!list)return;
    const cfg=FHQ_GAME_METRICS[game]||{};
    if(title)title.textContent=(FHQ_GAME_LABELS[game]||game)+' World Rankings';
    if(copy)copy.textContent=(cfg.world||'Best performance')+(cfg.secondary?' • tiebreaker: '+cfg.secondary.toLowerCase():'')+'.';
    list.innerHTML='<div class="fhq-world-empty">Loading world rankings…</div>';
    modal.classList.add('open');modal.setAttribute('aria-hidden','false');
    if(!fhqHasServer()){
      list.innerHTML='<div class="fhq-world-empty">World rankings require the Football HQ backend.</div>';return;
    }
    google.script.run
      .withSuccessHandler(function(rows){
        rows=Array.isArray(rows)?rows:[];
        if(!rows.length){
          list.innerHTML='<div class="fhq-world-empty">No verified scores yet. Be the first.</div>';return;
        }
        const me=rows.find(r=>r&&r.isMe);
        const top3=rows.slice(0,3);
        const podiumSlots=[
          top3[1]?{r:top3[1],rank:2,place:'second'}:null,
          top3[0]?{r:top3[0],rank:1,place:'first'}:null,
          top3[2]?{r:top3[2],rank:3,place:'third'}:null
        ];
        const podium='<div class="fhq-world-podium">'+podiumSlots.map(function(slot){
          if(!slot)return '<div></div>';
          const r=slot.r;
          return '<div class="fhq-world-podium-card '+slot.place+'"><span class="fhq-world-podium-rank">#'+slot.rank+'</span>'+
            fhqWorldAvatarHTML(r,'fhq-world-podium-avatar')+
            '<strong>'+esc(r.isMe?'YOU':r.username)+'</strong>'+
            '<small>'+esc(fhqScoreLabel(game,r.score,r.secondary))+'</small></div>';
        }).join('')+'</div>';

        const you=me?'<div class="fhq-world-you">Your world rank: #'+Number(me.rank||1)+' • '+esc(fhqScoreLabel(game,me.score,me.secondary))+'</div>':'';

        const table='<div class="fhq-world-list">'+rows.slice(0,100).map(function(r,i){
          return '<div class="fhq-world-row '+(r.isMe?'me':'')+'">'+
            '<span class="rank">#'+Number(r.rank||i+1)+'</span>'+
            fhqWorldAvatarHTML(r)+
            '<span>'+esc(r.isMe?'YOU':(r.username||'Player'))+
              (r.secondary!=null?'<span class="fhq-world-metric">Tiebreak: '+esc(String(r.secondary))+(game==='statline'?' guesses':'s')+'</span>':'')+
            '</span>'+
            '<span class="score">'+esc(fhqScoreLabel(game,r.score,r.secondary))+'</span></div>';
        }).join('')+'</div>';
        list.innerHTML=podium+you+table;
      })
      .withFailureHandler(function(error){
        list.innerHTML='<div class="fhq-world-empty">'+esc((error&&error.message)||'Could not load world rankings.')+'</div>';
      })
      .getFootballHQGameLeaderboard(game,fhqGetToken());
  }

  function fhqBindWorldRankingCells(){
    document.querySelectorAll('[data-game-stats]').forEach(function(row){
      const world=row.children&&row.children[2];if(!world)return;
      world.setAttribute('role','button');world.setAttribute('tabindex','0');
      world.setAttribute('title','View '+(FHQ_GAME_LABELS[row.dataset.gameStats]||'game')+' world rankings');
      world.onclick=function(e){e.stopPropagation();openFootballHQWorldRankings(row.dataset.gameStats)};
      world.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();openFootballHQWorldRankings(row.dataset.gameStats)}};
    });
    const modal=document.getElementById('fhqWorldModal'),close=document.getElementById('fhqWorldClose');
    if(close)close.onclick=function(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')};
    if(modal)modal.onclick=function(e){if(e.target===modal){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}};
  }

  function fhqLoadWorldBests(){
    fhqRenderCompetitiveStats();
    if(!fhqHasServer())return;
    google.script.run
      .withSuccessHandler(function(rows){
        window.__fhqWorldBestCache=rows||{};
        fhqRenderCompetitiveStats(rows||{});
      })
      .withFailureHandler(function(){})
      .getFootballHQWorldBests();
  }

  function fhqInitials(name){
    const bits=String(name||'Player').trim().split(/\s+/).filter(Boolean);
    return bits.slice(0,2).map(x=>x.charAt(0).toUpperCase()).join('')||'P';
  }
  function fhqRingClass(value){const map={DAILY_TOP5:'fhq-ring-daily-top5',DAILY_CHAMP:'fhq-ring-daily-champ',WEEKLY_TOP5:'fhq-ring-weekly-top5',WEEKLY_CHAMP:'fhq-ring-weekly-champ',SHOP_NEON_RING:'fhq-ring-neon',SHOP_CRIMSON_RING:'fhq-ring-crimson',SHOP_ICE_RING:'fhq-ring-daily-champ',SHOP_TEAL_RING:'fhq-ring-teal',SHOP_STADIUM_RING:'fhq-ring-stadium',SHOP_VICTORY_RING:'fhq-ring-victory',SHOP_PRIMETIME_RING:'fhq-ring-primetime',SHOP_REDZONE_RING:'fhq-ring-redzone',SHOP_DIAMOND_RING:'fhq-ring-diamond',SHOP_OBSIDIAN_RING:'fhq-ring-obsidian'};return map[String(value||'')]||''}
  function fhqBannerClass(value){const map={DAILY_TOP10:'fhq-banner-daily-top10',DAILY_CHAMP:'fhq-banner-daily-champ',WEEKLY_TOP10:'fhq-banner-weekly-top10',WEEKLY_CHAMP:'fhq-banner-weekly-champ',SHOP_MIDNIGHT:'fhq-banner-midnight',SHOP_PLAYOFFS:'fhq-banner-playoffs',SHOP_SNOW:'fhq-banner-weekly-champ',SHOP_BLUEPRINT:'fhq-banner-blueprint',SHOP_TUNNEL:'fhq-banner-tunnel',SHOP_REDZONE:'fhq-banner-redzone',SHOP_PRIMETIME:'fhq-banner-primetime',SHOP_CHAMPIONSHIP:'fhq-banner-championship'};return map[String(value||'')]||''}

  function fhqLeaderboardAvatarHTML(person,podium){
    const isMe=!!(person&&person.isMe),prefs=fhqProfilePrefs();
    const ring=isMe?String(window.__fhqCosmetics&&window.__fhqCosmetics.ring||''):String(person&&person.equippedRing||'');
    const cls=(podium?'fhq-podium-avatar':'fhq-leader-avatar')+' '+fhqRingClass(ring);

    const backendImage=String(person&&person.avatarUrl||'');
    const backendEmoji=String(person&&person.avatarEmoji||'');
    if(backendImage)return '<span class="'+cls+'"><img src="'+esc(backendImage)+'" alt=""></span>';
    if(backendEmoji)return '<span class="'+cls+'">'+fhqAvatarTokenHTML(backendEmoji)+'</span>';

    if(isMe&&prefs.image)return '<span class="'+cls+'"><img src="'+esc(prefs.image)+'" alt=""></span>';
    if(isMe&&prefs.avatar&&prefs.avatar!=='👤')return '<span class="'+cls+'">'+fhqAvatarTokenHTML(prefs.avatar)+'</span>';

    return '<span class="'+cls+'">'+fhqAvatarTokenHTML(FHQ_STARTER_AVATAR)+'</span>';
  }

  function fhqProfilePrefs(){const p=Object.assign({avatar:FHQ_STARTER_AVATAR,image:''},fhqReadJSON(FHQ_PROFILE_KEY,{}));if((!p.avatar||p.avatar==='👤')&&!p.image)p.avatar=FHQ_STARTER_AVATAR;return p}
  function fhqSaveProfilePrefs(p){
    fhqWriteJSON(FHQ_PROFILE_KEY,p);fhqPaintAvatar();fhqRenderPass();
    if(fhqHasServer()){
      google.script.run
        .withSuccessHandler(function(){renderStandaloneLeaderboard()})
        .withFailureHandler(function(){})
        .updateFootballHQAvatar({
          token:fhqGetToken(),
          avatarUrl:String(p&&p.image||''),
          avatarEmoji:String(p&&p.image?'':(p&&p.avatar||''))
        });
    }
  }
  function fhqAvatarHTML(sizeClass){
    const p=fhqProfilePrefs();
    return p.image?'<img src="'+esc(p.image)+'" alt="Profile picture">':fhqAvatarTokenHTML(p.avatar||FHQ_STARTER_AVATAR);
  }
  function fhqUnlockedAvatarTokens(points){return [FHQ_STARTER_AVATAR].concat(FHQ_PASS_REWARDS.filter(r=>r.type==='avatar'&&fhqRewardUnlocked(r,points)).map(r=>r.value))}
  function fhqRenderAvatarChoices(){
    const root=document.getElementById('fhqAvatarChoices');if(!root)return;
    const points=Math.max(getDailyPoints(),fhqLastKnownLifetimePoints()),unlocked=fhqUnlockedAvatarTokens(points),pref=fhqProfilePrefs();
    const items=[{value:FHQ_STARTER_AVATAR,name:'Football HQ Starter',level:1}].concat(FHQ_PASS_REWARDS.filter(r=>r.type==='avatar'));
    root.innerHTML=items.map(function(r){
      const ok=unlocked.includes(r.value),active=!pref.image&&pref.avatar===r.value;
      return '<button type="button" data-fhq-avatar="'+esc(r.value)+'" class="'+(ok?'':'locked')+' '+(active?'active':'')+'" '+(ok?'':'disabled')+' title="'+esc(ok?r.name:(r.name+' • Unlock at Level '+r.level))+'">'+fhqAvatarTokenHTML(r.value)+'</button>';
    }).join('');
    root.querySelectorAll('[data-fhq-avatar]:not([disabled])').forEach(function(b){b.onclick=function(){const p=fhqProfilePrefs();p.avatar=this.dataset.fhqAvatar;p.image='';fhqSaveProfilePrefs(p);fhqRenderAvatarChoices()}});
  }
  function fhqPaintAvatar(){
    const p=fhqProfilePrefs();
    ['fhqProfileButtonAvatar','fhqProfileAvatarLarge'].forEach(function(id){
      const el=document.getElementById(id);if(!el)return;
      el.innerHTML=p.image?'<img src="'+esc(p.image)+'" alt="Profile picture">':fhqAvatarTokenHTML(p.avatar||FHQ_STARTER_AVATAR);
    });
    document.querySelectorAll('[data-fhq-avatar]').forEach(function(b){
      b.classList.toggle('active',!p.image&&b.dataset.fhqAvatar===p.avatar);
    });
  }

  function fhqTop10Count(){
    const rows=fhqReadJSON(FHQ_TOP10_KEY,{});
    return Object.keys(rows).length;
  }
  function fhqRememberTop10(period,people){
    if(period!=='daily'||!Array.isArray(people))return;
    const idx=people.findIndex(function(p){return !!p.isMe});
    if(idx<0||idx>=10)return;
    const rows=fhqReadJSON(FHQ_TOP10_KEY,{});
    rows[dailyDateKey()]=idx+1;
    fhqWriteJSON(FHQ_TOP10_KEY,rows);
  }


  function fhqTotalGamesPlayed(){
    const counts=fhqReadJSON(FHQ_PLAY_COUNTS_KEY,{});
    return Object.values(counts).reduce((sum,n)=>sum+(Number(n)||0),0);
  }

  function fhqProfileBestRecordItems(){
    const stats=fhqGameStats();
    return Object.keys(stats).filter(function(g){
      return stats[g]&&stats[g].personalBest!=null;
    }).map(function(g){
      return {
        game:g,
        label:FHQ_GAME_LABELS[g]||g,
        value:fhqFormatMetric(g,stats[g].personalBest,stats[g].personalSecondary)
      };
    }).slice(0,8);
  }

  function fhqPaintProfileCareer(summary){
    const most=fhqMostPlayedGame();
    const totalGames=document.getElementById('fhqProfileGamesPlayed');
    const top10=document.getElementById('fhqProfileTop10');
    const worldTop10=document.getElementById('fhqProfileWorldTop10');
    const worldWins=document.getElementById('fhqProfileWorldWins');
    const mostName=document.getElementById('fhqProfileMostPlayed');
    const mostCount=document.getElementById('fhqProfileMostPlayedCount');
    if(totalGames)totalGames.textContent=String(fhqTotalGamesPlayed());
    if(top10)top10.textContent=String(fhqTop10Count());
    if(worldTop10)worldTop10.textContent=String(Number(summary&&summary.worldTop10)||0);
    if(worldWins)worldWins.textContent=String(Number(summary&&summary.worldWins)||0);
    if(mostName)mostName.textContent=most.name;
    if(mostCount)mostCount.textContent=String(most.count);

    const recordGrid=document.getElementById('fhqProfileRecordGrid');
    if(recordGrid){
      const items=fhqProfileBestRecordItems();
      recordGrid.innerHTML=items.length?items.map(function(x){
        return '<div class="fhq-profile-record"><strong>'+esc(x.label)+'</strong><span>'+esc(x.value)+'</span></div>';
      }).join(''):'<div class="fhq-profile-record"><strong>No records yet</strong><span>Complete games to start building your record book.</span></div>';
    }
  }

  function fhqLoadProfileCareer(){
    fhqPaintProfileCareer(null);
    if(!fhqHasServer())return;
    google.script.run
      .withSuccessHandler(function(summary){
        window.__fhqProfileSummary=summary||{};
        fhqPaintProfileCareer(summary||{});
        fhqRenderAchievements(summary||{});
        fhqCheckAchievements(summary||{},false);
      })
      .withFailureHandler(function(){})
      .getFootballHQProfileSummary(fhqGetToken());
  }

  const FHQ_ACHIEVEMENT_UNLOCKS_KEY='footballHQAchievementUnlocksV3';
  function fhqAchievementStorageKey(){return FHQ_ACHIEVEMENT_UNLOCKS_KEY+':'+(norm(fhqGetUsername()||fhqRuntimeIdentityName||fhqGetToken())||'guest')}
  function fhqAchievementUnlocks(){
    const current=fhqReadJSON(fhqAchievementStorageKey(),null);
    if(Array.isArray(current))return current;
    const legacy=fhqReadJSON('footballHQAchievementUnlocksV2',[]);
    if(Array.isArray(legacy)&&legacy.length){fhqWriteJSON(fhqAchievementStorageKey(),legacy);return legacy}
    return [];
  }
  function fhqSaveAchievementUnlocks(ids){fhqWriteJSON(fhqAchievementStorageKey(),Array.from(new Set(ids||[])))}
  const fhqAchievementSession=new Set();
  function fhqPlayAchievementSound(){
    try{
      const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)return;
      const ctx=new Ctx(),now=ctx.currentTime;
      [659.25,783.99,987.77].forEach(function(freq,i){
        const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=freq;
        g.gain.setValueAtTime(0.0001,now+i*.09);g.gain.exponentialRampToValueAtTime(.11,now+i*.09+.018);g.gain.exponentialRampToValueAtTime(.0001,now+i*.09+.24);
        o.connect(g);g.connect(ctx.destination);o.start(now+i*.09);o.stop(now+i*.09+.26);
      });
      setTimeout(()=>ctx.close().catch(()=>{}),650);
    }catch(e){}
  }
  function fhqAchievementDefs(summary){
    summary=summary||window.__fhqProfileSummary||{};
    const p=getAccountProfile(),s=fhqGameStats(),plays=fhqReadJSON(FHQ_PLAY_COUNTS_KEY,{}),wins=fhqCountDailyWins();
    const total=Object.values(plays).reduce((a,b)=>a+(Number(b)||0),0),most=fhqMostPlayedGame();
    const gs=g=>s[g]||{}, pc=g=>Number(plays[g]||0), best=g=>Number(gs(g).personalBest), streak=g=>Number(gs(g).maxStreak)||0;
    const dailyWins=Math.max(Number(wins)||0,Number(p.totalDailies)||0),level=fhqLevelInfo(Number(p.points)||0).level,unlockedCount=fhqAchievementUnlocks().length;
    const defs=[
      ['first_win','🏁','First Win','Win your first Daily Challenge',dailyWins>=1,3],
      ['five_wins','🏈','Five Wins','Win 5 Daily Challenges',dailyWins>=5,4],
      ['ten_wins','🏆','Ten Wins','Win 10 Daily Challenges',dailyWins>=10,5],
      ['25_wins','👑','Daily Veteran','Win 25 Daily Challenges',dailyWins>=25,7],
      ['50_points','⭐','Getting Started','Earn 50 lifetime points',Number(p.points)>=50,3],
      ['100_points','💯','Century Club','Earn 100 lifetime points',Number(p.points)>=100,4],
      ['250_points','💎','250 Club','Earn 250 lifetime points',Number(p.points)>=250,5],
      ['500_points','🏅','500 Club','Earn 500 lifetime points',Number(p.points)>=500,7],
      ['1000_points','👑','Four Digits','Earn 1,000 lifetime points',Number(p.points)>=1000,10],
      ['3_day','🔥','On Fire','Reach a 3-day activity streak',Number(p.streakDays)>=3,4],
      ['7_day','🔥','Full Week','Reach a 7-day activity streak',Number(p.streakDays)>=7,6],
      ['14_day','🔥','Two Weeks Strong','Reach a 14-day activity streak',Number(p.streakDays)>=14,8],
      ['30_day','🔥','Ironman','Reach a 30-day activity streak',Number(p.streakDays)>=30,12],
      ['top10','🏆','Top Ten','Record a Daily top-10 finish',fhqTop10Count()>=1,5],
      ['world_top10','🌎','World Class','Reach a game World Top 10',Number(summary.worldTop10)>=1,7],
      ['world_1','👑','World #1','Hold a #1 game world record',Number(summary.worldWins)>=1,15],
      ['five_world_top10','🌐','Global Threat','Reach 5 game World Top 10s',Number(summary.worldTop10)>=5,12],
      ['three_world_1','👑','Record Collector','Hold 3 game world #1 records',Number(summary.worldWins)>=3,20],
      ['10_games','🎮','Warmup','Open 10 games',total>=10,2],
      ['25_games','🎮','Football Junkie','Open 25 games',total>=25,3],
      ['50_games','🎮','Game Room Regular','Open 50 games',total>=50,4],
      ['100_games','🕹️','Centurion','Open 100 games',total>=100,6],
      ['favorite_10','⭐','Favorite Found','Play one game 10 times',Number(most.count)>=10,4],
      ['all_games','🧭','Tour the HQ','Open every Football HQ game',Object.keys(FHQ_GAME_LABELS).filter(k=>k!=='leaderboard').every(k=>pc(k)>0),8],
      ['wordle_first','🟩','Active Players Winner','Win Active Players',best('players')>0||pc('players')>0&&dailyWins>0,3],
      ['wordle_3','🟩','Active Players Regular','Play Active Players 3 times',pc('players')>=3,2],
      ['grid_complete','🧩','Grid Complete','Finish a Grid',pc('grid')>=1,3],
      ['grid_perfect','🧩','Grid Master','Complete Grid with 0 misses',best('grid')===0,10],
      ['grid_5','🧩','Gridiron Brain','Play Grid 5 times',pc('grid')>=5,3],
      ['legend_win','🏛️','Historian','Win Legends',best('legends')>0||pc('legends')>=1,3],
      ['whoami_one','❓','First-Clue Genius','Solve Who Am I? with 1 clue',best('whoami')===1,12],
      ['career_one','🛣️','Career Scout','Solve Career Path in 1 guess',best('career')===1,10],
      ['career_5','🛣️','Journeyman Expert','Play Career Path 5 times',pc('career')>=5,3],
      ['hl_5','📈','Five Straight','Reach 5 in Higher / Lower',streak('higherlower')>=5,4],
      ['hl_10','📈','Hot Hand','Reach 10 in Higher / Lower',streak('higherlower')>=10,7],
      ['hl_25','🚀','Unstoppable','Reach 25 in Higher / Lower',streak('higherlower')>=25,15],
      ['imposter_5','🕵️','Imposter Hunter','Reach a 5 Imposter streak',streak('imposter')>=5,4],
      ['imposter_10','🕵️','No Fooling You','Reach a 10 Imposter streak',streak('imposter')>=10,8],
      ['connections_win','🔗','Connected','Solve Connections',pc('connections')>=1&&best('connections')>=0,3],
      ['connections_perfect','🔗','Perfect Connections','Solve Connections with 0 mistakes',best('connections')===0,10],
      ['stat_60','📊','Stat Reader','Solve Stat Line in under 60s',best('statline')>0&&best('statline')<=60,3],
      ['stat_30','📊','Stat Savant','Solve Stat Line in under 30s',best('statline')>0&&best('statline')<=30,6],
      ['stat_15','⚡','Instant Recall','Solve Stat Line in under 15s',best('statline')>0&&best('statline')<=15,12],
      ['draft_5','🎓','Draft Scholar','Reach a 5 Draft Class streak',streak('draftclass')>=5,4],
      ['mogger_3','🪖','Face Familiar','Reach a 3 Mogger streak',streak('moggle')>=3,3],
      ['mogger_10','🪖','Mogger Master','Reach a 10 Mogger streak',streak('moggle')>=10,8],
      ['timeline_first','⏳','Time Traveler','Solve Timeline',pc('timeline')>=1&&best('timeline')>=0,3],
      ['timeline_one','⏳','Perfect Order','Solve Timeline in 1 attempt',best('timeline')===1,10],
      ['team_one','🏟️','Team Detective','Franchise Finder using 1 clue',best('guessteam')===1,10],
      ['depth_one','📋','Depth Chart Coach','Solve Depth Chart in 1 attempt',best('depthchart')===1,10],
      ['100_wins','🏆','Century Winner','Win 100 Daily Challenges',dailyWins>=100,12],
      ['250_wins','🏆','Daily Machine','Win 250 Daily Challenges',dailyWins>=250,18],
      ['500_wins','👑','Daily Legend','Win 500 Daily Challenges',dailyWins>=500,25],
      ['2000_points','💠','Two Grand','Earn 2,000 lifetime points',Number(p.points)>=2000,12],
      ['3000_points','💠','Three Grand','Earn 3,000 lifetime points',Number(p.points)>=3000,15],
      ['5000_points','💎','Five Thousand Club','Earn 5,000 lifetime points',Number(p.points)>=5000,20],
      ['10000_points','👑','Five Digits','Earn 10,000 lifetime points',Number(p.points)>=10000,25],
      ['60_day','🔥','Two-Month Run','Reach a 60-day activity streak',Number(p.streakDays)>=60,16],
      ['100_day','🔥','Triple Digits','Reach a 100-day activity streak',Number(p.streakDays)>=100,22],
      ['365_day','🔥','Every Sunday','Reach a 365-day activity streak',Number(p.streakDays)>=365,30],
      ['top10_5','🥇','Top Ten Regular','Record 5 Daily top-10 finishes',fhqTop10Count()>=5,8],
      ['top10_20','🥇','Daily Contender','Record 20 Daily top-10 finishes',fhqTop10Count()>=20,15],
      ['world_top10_10','🌎','Global Regular','Reach 10 game World Top 10s',Number(summary.worldTop10)>=10,18],
      ['world_1_5','👑','Record Room','Hold 5 game world #1 records',Number(summary.worldWins)>=5,25],
      ['world_sweep','🌐','Worldwide','Reach a World Top 10 in 12 games',Number(summary.worldTop10)>=12,25],
      ['250_games','🎮','Quarter Thousand','Open 250 games',total>=250,8],
      ['500_games','🕹️','HQ Resident','Open 500 games',total>=500,12],
      ['favorite_25','⭐','Main Event','Play one game 25 times',Number(most.count)>=25,8],
      ['favorite_50','⭐','Specialist','Play one game 50 times',Number(most.count)>=50,12],
      ['wordle_one','🟩','One-Shot Weddle','Solve Active Players in 1 guess',best('players')===1,12],
      ['wordle_10','🟩','Active Players Veteran','Play Active Players 10 times',pc('players')>=10,5],
      ['grid_10','🧩','Grid Regular','Play Grid 10 times',pc('grid')>=10,5],
      ['grid_25','🧩','Grid Addict','Play Grid 25 times',pc('grid')>=25,9],
      ['legend_one','🏛️','Legend Whisperer','Solve Legends in 1 guess',best('legends')===1,12],
      ['legend_10','🏛️','History Buff','Play Legends 10 times',pc('legends')>=10,5],
      ['whoami_10','❓','Identity Expert','Play Who Am I? 10 times',pc('whoami')>=10,5],
      ['whoami_25','❓','No Introduction Needed','Play Who Am I? 25 times',pc('whoami')>=25,9],
      ['career_10','🛣️','Career Researcher','Play Career Path 10 times',pc('career')>=10,5],
      ['career_25','🛣️','Transaction Wire','Play Career Path 25 times',pc('career')>=25,9],
      ['hl_50','🚀','Higher / Lower 50','Reach a 50 Higher / Lower streak',streak('higherlower')>=50,25],
      ['imposter_25','🕵️','Master of Disguise','Reach a 25 Imposter streak',streak('imposter')>=25,18],
      ['connections_5','🔗','Connection Streak','Play Connections 5 times',pc('connections')>=5,5],
      ['connections_10','🔗','Four-by-Four','Play Connections 10 times',pc('connections')>=10,8],
      ['stat_10','⚡','Ten-Second Read','Solve Stat Line in 10 seconds or less',best('statline')>0&&best('statline')<=10,16],
      ['stat_8','⚡','Blink Test','Solve Stat Line in 8 seconds or less',best('statline')>0&&best('statline')<=8,22],
      ['draft_10','🎓','Draft Class Ten','Reach a 10 Draft Class streak',streak('draftclass')>=10,8],
      ['draft_25','🎓','Draft Historian','Reach a 25 Draft Class streak',streak('draftclass')>=25,18],
      ['mogger_25','🪖','Face Database','Reach a 25 Mogger streak',streak('moggle')>=25,18],
      ['timeline_5','⏳','Chronology Regular','Play Timeline 5 times',pc('timeline')>=5,5],
      ['timeline_10','⏳','NFL Archivist','Play Timeline 10 times',pc('timeline')>=10,8],
      ['team_5','🏟️','Franchise Scout','Play Franchise Finder 5 times',pc('guessteam')>=5,5],
      ['team_10','🏟️','Front Office','Play Franchise Finder 10 times',pc('guessteam')>=10,8],
      ['depth_10','📋','Depth Room Regular','Reach a 10 Depth Chart streak',streak('depthchart')>=10,8],
      ['depth_25','📋','Roster Architect','Reach a 25 Depth Chart streak',streak('depthchart')>=25,18],
      ['level_10','⬆️','Level 10','Reach Football HQ Level 10',level>=10,10],
      ['level_20','⬆️','Level 20','Reach Football HQ Level 20',level>=20,15],
      ['level_30','⬆️','Level 30','Reach Football HQ Level 30',level>=30,20],
      ['achievement_50','🎖️','Halfway There','Unlock 50 achievements',unlockedCount>=50,15],
      ['achievement_75','🎖️','Achievement Hunter','Unlock 75 achievements',unlockedCount>=75,20],
      ['football_genius','🧠','Football Genius','Reach Level 20, 50 Daily wins, and a World Top 10',level>=20&&dailyWins>=50&&Number(summary.worldTop10)>=1,30]
    ];
    return defs.map(d=>({id:d[0],icon:d[1],title:d[2],sub:d[3],ok:!!d[4],bonus:Number(d[5])||0}));
  }

  function fhqLaunchAchievementConfetti(){
    let layer=document.getElementById('fhqAchievementConfetti');
    if(!layer){
      layer=document.createElement('div');layer.id='fhqAchievementConfetti';document.body.appendChild(layer);
    }
    const colors=['#ffffff','#7fcfff','#d9b44a','#38b978','#d66072'];
    for(let i=0;i<42;i++){
      const piece=document.createElement('i');
      piece.className='fhq-ach-piece';
      piece.style.left=(8+Math.random()*84)+'vw';
      piece.style.background=colors[i%colors.length];
      piece.style.setProperty('--dx',((Math.random()-.5)*180)+'px');
      piece.style.setProperty('--rot',(360+Math.random()*720)+'deg');
      piece.style.animationDelay=(Math.random()*.22)+'s';
      piece.style.animationDuration=(1.15+Math.random()*.8)+'s';
      layer.appendChild(piece);
      setTimeout(()=>piece.remove(),2300);
    }
    setTimeout(()=>{if(layer&&!layer.children.length)layer.remove()},2600);
  }

  function fhqShowAchievementToast(a){
    let stack=document.getElementById('fhqAchievementToastStack');
    if(!stack){stack=document.createElement('div');stack.id='fhqAchievementToastStack';document.body.appendChild(stack)}
    const el=document.createElement('div');el.className='fhq-achievement-toast';
    el.innerHTML='<div class="icon">'+a.icon+'</div><div><em>ACHIEVEMENT UNLOCKED</em><strong>'+esc(a.title)+'</strong><span>'+esc(a.sub)+'</span></div>';
    stack.appendChild(el);
    fhqLaunchAchievementConfetti();
    fhqPlayAchievementSound();
    requestAnimationFrame(()=>el.classList.add('show'));
    setTimeout(()=>{el.classList.remove('show');setTimeout(()=>el.remove(),250)},4200);
  }

  let fhqAchievementSyncBusy=false;
  const fhqAchievementSyncQueue=new Set();
  function fhqSubmitAchievementAwards(items){
    (items||[]).map(x=>typeof x==='string'?x:x.id).filter(Boolean).forEach(id=>fhqAchievementSyncQueue.add(id));
    if(!fhqHasServer()||fhqAchievementSyncBusy||!fhqAchievementSyncQueue.size)return;
    fhqAchievementSyncBusy=true;
    const ids=Array.from(fhqAchievementSyncQueue);ids.forEach(id=>fhqAchievementSyncQueue.delete(id));
    google.script.run
      .withSuccessHandler(function(result){
        fhqAchievementSyncBusy=false;result=result||{};const profile=result.profile;
        if(profile){fhqSetRuntimeIdentity(profile);fhqRememberLifetimePoints(Number(profile.points)||0);fhqUpdateAccountUI(profile);fhqHandleProgressionUpdate(profile,false);}
        if(Number(result.bonus)>0)fhqAnimatePointAward(Number(result.bonus));
        renderStandaloneLeaderboard();fhqRenderPass(profile||null);
        if(fhqAchievementSyncQueue.size)fhqSubmitAchievementAwards([]);
      })
      .withFailureHandler(function(err){
        fhqAchievementSyncBusy=false;ids.forEach(id=>fhqAchievementSyncQueue.add(id));console.warn('Achievement XP sync failed',err);
      })
      .submitFootballHQAchievementAwards({token:fhqGetToken(),achievementIds:ids});
  }
  function fhqSyncAllUnlockedAchievements(){const ids=fhqAchievementUnlocks();if(ids.length)fhqSubmitAchievementAwards(ids)}

  function fhqCheckAchievements(summary,quiet){
    const defs=fhqAchievementDefs(summary),known=fhqAchievementUnlocks(),set=new Set(known),fresh=[];
    defs.forEach(a=>{if(a.ok&&!set.has(a.id)&&!fhqAchievementSession.has(a.id)){set.add(a.id);fhqAchievementSession.add(a.id);fresh.push(a)}});
    if(fresh.length){fhqSaveAchievementUnlocks(Array.from(set));fhqSubmitAchievementAwards(fresh)}
    if(!quiet)fresh.slice(0,4).forEach((a,i)=>setTimeout(()=>fhqShowAchievementToast(a),i*450));
    return defs;
  }
  function fhqRenderAchievements(summary){
    const defs=fhqCheckAchievements(summary,true),grid=document.getElementById('fhqAchievementGrid');
    if(grid)grid.innerHTML=defs.map(function(x){
      return '<div class="fhq-achievement '+(x.ok?'unlocked':'locked')+'"><div class="icon">'+x.icon+'</div><div><strong>'+esc(x.title)+'</strong><span>'+esc(x.sub)+'</span><span class="achievement-xp">+'+Number(x.bonus||0)+' XP</span><em class="badge-state">'+(x.ok?'UNLOCKED':'LOCKED')+'</em></div></div>';
    }).join('');
  }

  function fhqOpenProfile(){
    const modal=document.getElementById('fhqProfileModal');if(!modal)return;
    const name=document.getElementById('fhqProfileName');if(name)name.textContent=fhqGetUsername()||'Guest';
    refreshFootballHQScoreDisplays();
    fhqRenderAchievements();
    fhqPaintProfileCareer(window.__fhqProfileSummary||null);
    fhqLoadProfileCareer();
    fhqLoadRecoveryCode();
    fhqPaintAvatar();
    document.querySelectorAll('[data-profile-panel-body]').forEach(function(panel){panel.classList.remove('open')});
    document.querySelectorAll('[data-profile-panel]').forEach(function(btn){btn.classList.remove('active')});
    modal.classList.add('open');modal.setAttribute('aria-hidden','false');
  }
  function fhqCloseProfile(){
    const modal=document.getElementById('fhqProfileModal');if(!modal)return;
    modal.classList.remove('open');modal.setAttribute('aria-hidden','true');
  }

  function fhqLoadRecoveryCode(){
    const codeEl=document.getElementById('fhqRecoveryCode');
    const userEl=document.getElementById('fhqRecoveryUsername');
    if(userEl&&!userEl.value)userEl.value=fhqGetUsername()||'';
    if(!codeEl)return;
    if(!fhqHasServer()){codeEl.textContent='Available when backend is connected';return}
    codeEl.textContent='Loading…';
    google.script.run
      .withSuccessHandler(function(result){
        window.__fhqRecoveryCode=String(result&&result.recoveryCode||'');
        codeEl.textContent=window.__fhqRecoveryCode||'Code already created — use your saved copy';
      })
      .withFailureHandler(function(){codeEl.textContent='Could not load recovery code'})
      .ensureFootballHQRecoveryCode(fhqGetToken());
  }
  function fhqRecoverExistingAccount(){
    const u=document.getElementById('fhqRecoveryUsername');
    const c=document.getElementById('fhqRecoveryInput');
    const status=document.getElementById('fhqRecoveryStatus');
    const username=String(u&&u.value||'').trim(),recoveryCode=String(c&&c.value||'').trim();
    if(!username||!recoveryCode){if(status)status.textContent='Enter both your username and recovery code.';return}
    if(!fhqHasServer()){if(status)status.textContent='Backend unavailable.';return}
    if(status)status.textContent='Signing in…';
    google.script.run
      .withSuccessHandler(function(profile){
        if(!profile){if(status)status.textContent='Account not found.';return}
        fhqRuntimeIdentityToken='';
        fhqLockPrimaryAccount(profile.token,profile);
        fhqSetManualAccountPin(profile.token);
        fhqSetRuntimeIdentity(profile);
        fhqWriteLastConfirmedAccount(profile);
        fhqSetUsername(profile.username||username);
        fhqUpdateAccountUI(profile);
        if(status)status.textContent='Signed back in as '+(profile.username||username)+'. This device is now linked to that profile.';
        const n=document.getElementById('fhqProfileName');if(n)n.textContent=profile.username||username;
        renderStandaloneLeaderboard();
        fhqLoadRecoveryCode();
      })
      .withFailureHandler(function(error){if(status)status.textContent=(error&&error.message)||'Could not sign in.'})
      .recoverFootballHQAccountWithCode(username,recoveryCode);
  }

  function fhqOpenProfilePanel(name){
    document.querySelectorAll('[data-profile-panel-body]').forEach(function(panel){
      panel.classList.toggle('open',panel.dataset.profilePanelBody===name);
    });
    document.querySelectorAll('[data-profile-panel]').forEach(function(btn){
      btn.classList.toggle('active',btn.dataset.profilePanel===name);
    });
  }

  function fhqBindProfile(){
    const btn=document.getElementById('fhqProfileButton');if(btn)btn.onclick=fhqOpenProfile;
    const close=document.getElementById('fhqProfileClose');if(close)close.onclick=fhqCloseProfile;
    document.querySelectorAll('[data-profile-panel]').forEach(function(b){b.onclick=function(){fhqOpenProfilePanel(this.dataset.profilePanel)}});
    const avatarChange=document.getElementById('fhqAvatarChangeBtn');if(avatarChange)avatarChange.onclick=function(){fhqOpenProfilePanel('avatar');fhqRenderAvatarChoices()};
    const avatarPanelClose=document.getElementById('fhqAvatarPanelClose');if(avatarPanelClose)avatarPanelClose.onclick=function(){
      document.getElementById('fhqProfilePanelAvatar').classList.remove('open');
      document.querySelectorAll('[data-profile-panel]').forEach(function(btn){btn.classList.remove('active')});
    };
    const modal=document.getElementById('fhqProfileModal');if(modal)modal.onclick=function(e){if(e.target===modal)fhqCloseProfile()};
    document.querySelectorAll('[data-fhq-avatar]').forEach(function(b){b.onclick=function(){
      const p=fhqProfilePrefs();p.avatar=this.dataset.fhqAvatar;p.image='';fhqSaveProfilePrefs(p);fhqRenderAchievements();
    }});
    const upload=document.getElementById('fhqProfileUpload');
    if(upload)upload.onchange=function(){
      const file=this.files&&this.files[0];if(!file)return;
      if(file.size>4*1024*1024){alert('Please choose an image under 4 MB.');this.value='';return;}
      const reader=new FileReader();
      reader.onload=function(){
        const img=new Image();
        img.onload=function(){
          const canvas=document.createElement('canvas'),size=256;canvas.width=size;canvas.height=size;
          const ctx=canvas.getContext('2d'),scale=Math.max(size/img.width,size/img.height);
          const w=img.width*scale,h=img.height*scale;
          ctx.drawImage(img,(size-w)/2,(size-h)/2,w,h);
          const p=fhqProfilePrefs();p.image=canvas.toDataURL('image/jpeg',.82);fhqSaveProfilePrefs(p);
        };
        img.src=reader.result;
      };
      reader.readAsDataURL(file);
    };

    const recoveryCopy=document.getElementById('fhqRecoveryCopy');
    const recoverySignIn=document.getElementById('fhqRecoverySignIn');
    if(recoveryCopy)recoveryCopy.onclick=function(){
      const val=String(window.__fhqRecoveryCode||'');
      if(!val)return;
      if(navigator.clipboard)navigator.clipboard.writeText(val).catch(function(){});
      const status=document.getElementById('fhqRecoveryStatus');if(status)status.textContent='Recovery code copied.';
    };
    if(recoverySignIn)recoverySignIn.onclick=fhqRecoverExistingAccount;

    const changeBtn=document.getElementById('fhqChangeUsernameBtn');
    const changeForm=document.getElementById('fhqChangeUsernameForm');
    const changeInput=document.getElementById('fhqChangeUsernameInput');
    const changeSave=document.getElementById('fhqChangeUsernameSave');
    const changeCancel=document.getElementById('fhqChangeUsernameCancel');
    const changeStatus=document.getElementById('fhqChangeUsernameStatus');

    if(changeBtn)changeBtn.onclick=function(){
      if(changeForm)changeForm.style.display='block';
      if(changeInput){changeInput.value=fhqGetUsername()||'';setTimeout(()=>changeInput.focus(),20)}
      if(changeStatus)changeStatus.textContent='';
    };
    if(changeCancel)changeCancel.onclick=function(){
      if(changeForm)changeForm.style.display='none';
      if(changeStatus)changeStatus.textContent='';
    };
    if(changeSave)changeSave.onclick=function(){
      const newName=String(changeInput&&changeInput.value||'').trim();
      if(!/^[A-Za-z0-9_ -]{3,20}$/.test(newName)){
        if(changeStatus)changeStatus.textContent='Use 3–20 letters, numbers, spaces, _ or -.';
        return;
      }
      if(!fhqHasServer()){
        fhqSetUsername(newName);
        if(changeStatus)changeStatus.textContent='Saved on this device.';
        if(changeForm)changeForm.style.display='none';
        const n=document.getElementById('fhqProfileName');if(n)n.textContent=newName;
        return;
      }
      if(changeStatus)changeStatus.textContent='Saving…';
      google.script.run
        .withSuccessHandler(function(profile){
          if(profile){
            fhqSetRuntimeIdentity(profile);
            fhqSetUsername(profile.username||newName);
            fhqUpdateAccountUI(profile);
            const n=document.getElementById('fhqProfileName');if(n)n.textContent=profile.username||newName;
          }
          if(changeStatus)changeStatus.textContent='Username updated.';
          if(changeForm)changeForm.style.display='none';
          renderStandaloneLeaderboard();
        })
        .withFailureHandler(function(error){
          if(changeStatus)changeStatus.textContent=(error&&error.message)||'Could not change username.';
        })
        .renameFootballHQAccount(fhqGetToken(),newName);
    };
    fhqPaintAvatar();
  }

  const DAILY_POINT_VALUES={
    players:6,grid:12,legends:8,whoami:8,career:8,connections:14,statline:10,draftclass:8,moggle:10,timeline:10,
    guessteam:8,depthchart:10
  };
  const DAILY_SCORING_GAMES=new Set(['players','grid','legends','whoami','career','connections','statline','draftclass','moggle','timeline','guessteam','depthchart']);
  function accountProfileKey(){
    const id=norm(fhqGetUsername()||fhqRuntimeIdentityName||fhqGetToken()||'guest')||'guest';
    return 'footballHQAccountProfileV3:'+id;
  }
  function fhqSyncLocalProfileFromServer(profile){
    if(!profile)return;
    const local=getAccountProfile();
    local.points=Math.max(Number(local.points)||0,Number(profile.points)||0);
    local.totalDailies=Math.max(Number(local.totalDailies)||0,Number(profile.totalDailies)||0);
    local.streakDays=Math.max(Number(local.streakDays)||0,Number(profile.streakDays)||0);
    if(profile.lastDailyDate)local.lastDailyDate=String(profile.lastDailyDate);
    local.history=Array.isArray(local.history)?local.history:[];
    saveAccountProfile(local);
    refreshFootballHQScoreDisplays();
  }
  function getAccountProfile(){
    try{
      const raw=localStorage.getItem(accountProfileKey());
      if(raw){
        const p=JSON.parse(raw);
        if(p&&typeof p==='object'){
          p.points=Number(p.points)||0;p.totalDailies=Number(p.totalDailies)||0;
          p.history=Array.isArray(p.history)?p.history:[];
          /* one-time recovery from very early builds */
          const legacy=Number(localStorage.getItem('footballDailyPointsV1')||0)||0;
          if(p.points===0&&legacy>0)p.points=legacy;
          return Object.assign({points:0,totalDailies:0,history:[],streakDays:0,lastDailyDate:''},p);
        }
      }
      const legacy=Number(localStorage.getItem('footballDailyPointsV1')||0)||0;
      return {points:legacy,totalDailies:0,history:[],streakDays:0,lastDailyDate:''};
    }catch(e){}
    return {points:0,totalDailies:0,history:[],streakDays:0,lastDailyDate:''};
  }
  function saveAccountProfile(p){
    try{localStorage.setItem(accountProfileKey(),JSON.stringify(p))}catch(e){}
  }
  function dailyAwardKey(m){return 'footballDailyAward:'+dailyDateKey()+':'+m}
  function getDailyPoints(){return Number(getAccountProfile().points)||0}
  function dailyCompletedCount(){
    const p=getAccountProfile();return Number(p.totalDailies)||0;
  }
  function todayCompletedCount(){
    const p=getAccountProfile(),today=dailyDateKey();
    return (p.history||[]).filter(h=>h.date===today).length;
  }

  function fhqAnimatePointAward(points){
    points=Number(points)||0;if(points<=0)return;
    const profile=document.getElementById('fhqProfileButton');
    const rect=profile&&profile.getBoundingClientRect?profile.getBoundingClientRect():null;
    const el=document.createElement('div');
    el.className='fhq-xp-award';
    el.textContent='+'+points+' XP';
    el.style.left=(window.innerWidth/2)+'px';
    el.style.top=(window.innerHeight/2)+'px';
    document.body.appendChild(el);
    requestAnimationFrame(function(){
      if(rect){
        const tx=(rect.left+rect.width/2)-(window.innerWidth/2);
        const ty=(rect.top+rect.height/2)-(window.innerHeight/2);
        el.style.setProperty('--xp-x','calc(-50% + '+tx+'px)');
        el.style.setProperty('--xp-y','calc(-50% + '+ty+'px)');
      }else{
        el.style.setProperty('--xp-x','-50%');
        el.style.setProperty('--xp-y','-180px');
      }
      el.classList.add('fly');
    });
    setTimeout(function(){
      if(profile){profile.classList.remove('fhq-profile-collect');void profile.offsetWidth;profile.classList.add('fhq-profile-collect')}
      el.remove();
    },900);
  }

  function awardDailyPoints(m){
    if(playType!=='daily'||!finished||!gameWon||!DAILY_SCORING_GAMES.has(m))return;
    try{
      if(localStorage.getItem(dailyAwardKey(m)))return;
      const pts=DAILY_POINT_VALUES[m]||6;
      const p=getAccountProfile(),today=dailyDateKey();
      p.points=(Number(p.points)||0)+pts;
      p.totalDailies=(Number(p.totalDailies)||0)+1;
      p.history=Array.isArray(p.history)?p.history:[];
      p.history.push({date:today,game:m,points:pts});
      if(p.history.length>500)p.history=p.history.slice(-500);

      if(p.lastDailyDate!==today){
        const prev=new Date(today+'T12:00:00');
        prev.setDate(prev.getDate()-1);
        const prevKey=prev.toISOString().slice(0,10);
        p.streakDays=p.lastDailyDate===prevKey?(Number(p.streakDays)||0)+1:1;
        p.lastDailyDate=today;
      }
      saveAccountProfile(p);
      localStorage.setItem(dailyAwardKey(m),'1');
      refreshFootballHQScoreDisplays();
      fhqAnimatePointAward(pts);
      try{fhqCheckAchievements(window.__fhqProfileSummary||{},false)}catch(e){}
      fhqSubmitSharedDaily(m,pts,today);
    }catch(e){}
  }

  function dailyStorageKey(m){return 'footballDailyV9:'+dailyDateKey()+':'+m}
  function reconcileSavedDailyAwards(){
    try{
      const profile=getAccountProfile();profile.history=Array.isArray(profile.history)?profile.history:[];
      let changed=false;
      for(let i=0;i<localStorage.length;i++){
        const key=localStorage.key(i)||'';
        if(!key.startsWith('footballDailyV9:'))continue;
        const parts=key.split(':');if(parts.length<3)continue;
        const date=parts[1],game=parts.slice(2).join(':');
        const state=JSON.parse(localStorage.getItem(key)||'null');
        if(!state||!state.finished||!state.gameWon||!DAILY_SCORING_GAMES.has(game))continue;
        const awardKey='footballDailyAward:'+date+':'+game;
        if(localStorage.getItem(awardKey))continue;
        const pts=DAILY_POINT_VALUES[game]||6;
        profile.points=(Number(profile.points)||0)+pts;
        profile.totalDailies=(Number(profile.totalDailies)||0)+1;
        profile.history.push({date:date,game:game,points:pts});
        localStorage.setItem(awardKey,'1');changed=true;
        fhqSubmitSharedDaily(game,pts,date);
      }
      if(changed){
        profile.history=profile.history.slice(-1000);
        saveAccountProfile(profile);
      }
      refreshFootballHQScoreDisplays();
    }catch(e){console.warn('Daily point recovery skipped',e)}
  }

  function serializePerson(p){
    if(!p)return null;
    return {name:p.name,team:p.team,position:p.position,conference:p.conference,division:p.division,age:p.age,bye:p.bye,
      yearsExp:p.yearsExp,depthOrder:p.depthOrder,college:p.college,colleges:p.colleges,careerTeams:p.careerTeams,draftRound:p.draftRound,draftYear:p.draftYear,jerseyNumber:p.jerseyNumber,playerId:p.playerId,
      active:p.active,retired:p.retired,coach:p.coach,hof:p.hof,rings:p.rings,era:p.era,career:p.career,group:p.group,
      photoUrl:p.photoUrl,espnId:p.espnId};
  }
  function saveDailyState(){
    if(playType!=='daily')return;
    if(finished)awardDailyPoints(mode);
    try{
      const state={mode,finished,gameWon,dailyAttempted:true,guesses:guesses.map(serializePerson),answer:serializePerson(answer),
        gridRows,gridCols,gridAnswers:Object.fromEntries(Object.entries(gridAnswers).map(([k,v])=>[k,serializePerson(v)])),
        gridSelected,gridMisses,specialState};
      localStorage.setItem(dailyStorageKey(mode),JSON.stringify(state));
    }catch(e){}
  }
  function loadDailyState(){
    if(playType!=='daily')return false;
    try{
      const raw=localStorage.getItem(dailyStorageKey(mode));if(!raw)return false;
      const s=JSON.parse(raw);if(!s)return false;
      finished=!!s.finished;gameWon=!!s.gameWon;guesses=Array.isArray(s.guesses)?s.guesses:[];answer=s.answer||null;
      gridRows=Array.isArray(s.gridRows)?s.gridRows:[];gridCols=Array.isArray(s.gridCols)?s.gridCols:[];
      gridAnswers=s.gridAnswers||{};gridSelected=s.gridSelected||null;gridMisses=Number(s.gridMisses)||0;
      specialState=s.specialState||{};
      return true;
    }catch(e){return false}
  }
  function dailyWasCompleted(){
    if(playType!=='daily')return false;
    try{const s=JSON.parse(localStorage.getItem(dailyStorageKey(mode))||'null');return !!(s&&s.finished)}catch(e){return false}
  }

  /* V58 — Grid canonical player identity + career history.
     Current fantasy-rankings identity wins over a conflicting provider record.
     Grid team/college criteria accept any team/school in the player's known career history. */
  const FHQ_GRID_HISTORY={
    'aaron rodgers':{teams:['GB','NYJ','PIT'],colleges:['California']},
    'davante adams':{teams:['GB','LV','NYJ','LAR'],colleges:['Fresno State']},
    'saquon barkley':{teams:['NYG','PHI'],colleges:['Penn State']},
    'josh jacobs':{teams:['LV','GB'],colleges:['Alabama']},
    'christian mccaffrey':{teams:['CAR','SF'],colleges:['Stanford']},
    'derrick henry':{teams:['TEN','BAL'],colleges:['Alabama']},
    'joe mixon':{teams:['CIN','HOU'],colleges:['Oklahoma']},
    'deandre hopkins':{teams:['HOU','ARI','TEN','KC','BAL'],colleges:['Clemson']},
    'stefon diggs':{teams:['MIN','BUF','HOU','NE'],colleges:['Maryland']},
    'amari cooper':{teams:['OAK','DAL','CLE','BUF'],colleges:['Alabama']},
    'keenan allen':{teams:['LAC','CHI'],colleges:['California']},
    'cooper kupp':{teams:['LAR','SEA'],colleges:['Eastern Washington']},
    'calvin ridley':{teams:['ATL','JAX','TEN'],colleges:['Alabama']},
    'dj moore':{teams:['CAR','CHI'],colleges:['Maryland']},
    'courtland sutton':{teams:['DEN'],colleges:['SMU']},
    'george kittle':{teams:['SF'],colleges:['Iowa']},
    'tj hockenson':{teams:['DET','MIN'],colleges:['Iowa']},
    'noah fant':{teams:['DEN','SEA'],colleges:['Iowa']},
    'russell wilson':{teams:['SEA','DEN','PIT','NYG'],colleges:['NC State','Wisconsin']},
    'kirk cousins':{teams:['WAS','MIN','ATL'],colleges:['Michigan State']},
    'matthew stafford':{teams:['DET','LAR'],colleges:['Georgia']},
    'jared goff':{teams:['LAR','DET'],colleges:['California']},
    'baker mayfield':{teams:['CLE','CAR','LAR','TB'],colleges:['Texas Tech','Oklahoma']},
    'sam darnold':{teams:['NYJ','CAR','SF','MIN','SEA'],colleges:['USC']},
    'geno smith':{teams:['NYJ','NYG','LAC','SEA','LV'],colleges:['West Virginia']},
    'jimmy garoppolo':{teams:['NE','SF','LV','LAR'],colleges:['Eastern Illinois']},
    'tom brady':{teams:['NE','TB'],colleges:['Michigan']},
    'peyton manning':{teams:['IND','DEN'],colleges:['Tennessee']},
    'brett favre':{teams:['ATL','GB','NYJ','MIN'],colleges:['Southern Miss']},
    'joe montana':{teams:['SF','KC'],colleges:['Notre Dame']},
    'jerry rice':{teams:['SF','OAK','SEA'],colleges:['Mississippi Valley State']},
    'randy moss':{teams:['MIN','OAK','NE','TEN','SF'],colleges:['Marshall']},
    'terrell owens':{teams:['SF','PHI','DAL','BUF','CIN'],colleges:['Chattanooga']},
    'emmitt smith':{teams:['DAL','ARI'],colleges:['Florida']},
    'adrian peterson':{teams:['MIN','NO','ARI','WAS','DET','TEN','SEA'],colleges:['Oklahoma']},
    'marshawn lynch':{teams:['BUF','SEA','OAK'],colleges:['California']},
    'devonta smith':{teams:['PHI'],colleges:['Alabama'],position:'WR'},
    'davante adams':{teams:['GB','LV','NYJ','LAR'],colleges:['Fresno State'],position:'WR'}
  };

  function fhqGridHistoryFor(name){
    const key=norm(name),direct=FHQ_GRID_HISTORY[key];
    if(direct)return direct;
    const h=(typeof FHQ_GRID_HISTORIC_PLAYERS!=='undefined'?FHQ_GRID_HISTORIC_PLAYERS:[]).find(x=>norm(x.name)===key);
    return h?{teams:(h.teams||[]).slice(),colleges:h.college?[h.college]:[],position:h.position||'',draftYear:h.draftYear||'',draftRound:h.draftRound||''}:null;
  }
  function fhqGridCareerTeams(p){
    const h=fhqGridHistoryFor(p&&p.name),raw=[];
    if(p&&p.team)raw.push(p.team);
    if(p&&Array.isArray(p.careerTeams))raw.push.apply(raw,p.careerTeams);
    if(h&&Array.isArray(h.teams))raw.push.apply(raw,h.teams);
    return Array.from(new Set(raw.map(x=>String(x||'').toUpperCase()).filter(Boolean)));
  }
  function fhqGridColleges(p){
    const h=fhqGridHistoryFor(p&&p.name),raw=[];
    if(p&&p.college)raw.push(p.college);
    if(p&&Array.isArray(p.colleges))raw.push.apply(raw,p.colleges);
    if(h&&Array.isArray(h.colleges))raw.push.apply(raw,h.colleges);
    return Array.from(new Set(raw.map(x=>String(x||'').trim()).filter(Boolean)));
  }
  function fhqCanonicalRankedPlayer(name){
    if(typeof players==='undefined'||!Array.isArray(players))return null;
    const key=norm(name);
    return players.find(r=>norm(r.player||r.name)===key)||null;
  }

  function activeNFLPlayers(){
    const out=[],seen={};

    // Primary source: Sleeper's full active NFL player endpoint loaded by the site.
    if(typeof sleeperPlayersByName!=='undefined'){
      Object.keys(sleeperPlayersByName).forEach(function(k){
        const s=sleeperPlayersByName[k]||{};
        const name=s.name||'';
        const ranked=fhqCanonicalRankedPlayer(name);
        const hist=fhqGridHistoryFor(name);
        const team=String((ranked&&ranked.team)||s.team||'').toUpperCase();
        const pos=String((ranked&&ranked.position)||(hist&&hist.position)||s.position||'').toUpperCase();
        if(!name||!team||!TEAM_META[team]||!pos)return;
        const key=norm(name);if(seen[key])return;seen[key]=1;
        const meta=teamMeta(team);
        out.push({
          name:name,team:team,position:pos,conference:meta[0],division:meta[1],
          age:Number((ranked&&ranked.age)||s.age)||null,bye:(typeof nflByeWeeks2026!=='undefined'?Number(nflByeWeeks2026[team]):null)||null,
          yearsExp:s.years_exp===''||s.years_exp==null?null:Number(s.years_exp),
          depthOrder:s.depth_chart_order==null?null:Number(s.depth_chart_order),
          college:s.college||((hist&&hist.colleges&&hist.colleges[0])||''),
          careerTeams:fhqGridCareerTeams({name:name,team:team}),
          colleges:fhqGridColleges({name:name,college:s.college||''}),
          draftRound:s.draft_round||'',
          draftYear:s.draft_year||'',
          jerseyNumber:s.jersey_number||'',
          playerId:s.id||'',
          active:true,retired:false,coach:false
        });
      });
    }

    // Immediate fallback while the full database is loading.
    if(typeof players!=='undefined'&&Array.isArray(players)){
      players.forEach(function(p){
        const name=p.player||p.name||'',key=norm(name);if(!name||seen[key])return;
        const team=String(p.team||'').toUpperCase(),meta=teamMeta(team);
        if(!TEAM_META[team])return;
        const s=(typeof sleeperPlayersByName!=='undefined'&&sleeperPlayersByName[key])||{};
        seen[key]=1;
        out.push({
          name:name,team:team,position:String(p.position||s.position||'').toUpperCase(),
          conference:meta[0],division:meta[1],age:Number(p.age)||Number(s.age)||null,
          bye:(typeof nflByeWeeks2026!=='undefined'?Number(nflByeWeeks2026[team]):null)||null,
          yearsExp:s.years_exp===''||s.years_exp==null?null:Number(s.years_exp),
          depthOrder:s.depth_chart_order==null?null:Number(s.depth_chart_order),
          college:s.college||((fhqGridHistoryFor(name)&&fhqGridHistoryFor(name).colleges&&fhqGridHistoryFor(name).colleges[0])||''),
          careerTeams:fhqGridCareerTeams({name:name,team:team}),
          colleges:fhqGridColleges({name:name,college:s.college||''}),
          draftRound:s.draft_round||'',draftYear:s.draft_year||'',jerseyNumber:s.jersey_number||'',playerId:s.id||'',
          active:true,retired:false,coach:false
        });
      });
    }
    return out;
  }


  /* V63 — compact historical player layer.
     We deliberately keep this separate from the live provider so Grid can accept
     meaningful recent/historic answers without making every keystroke search thousands
     of irrelevant records. */
  const FHQ_GRID_HISTORIC_PLAYERS=[
    {name:'Dalvin Cook',position:'RB',teams:['MIN','NYJ','BAL','DAL'],college:'Florida State',draftYear:2017,draftRound:'2'},
    {name:'Ezekiel Elliott',position:'RB',teams:['DAL','NE','DAL'],college:'Ohio State',draftYear:2016,draftRound:'1'},
    {name:'Todd Gurley',position:'RB',teams:['LAR','ATL'],college:'Georgia',draftYear:2015,draftRound:'1'},
    {name:"Le'Veon Bell",position:'RB',teams:['PIT','NYJ','KC','BAL','TB'],college:'Michigan State',draftYear:2013,draftRound:'2'},
    {name:'David Johnson',position:'RB',teams:['ARI','HOU','NO'],college:'Northern Iowa',draftYear:2015,draftRound:'3'},
    {name:'Jamaal Charles',position:'RB',teams:['KC','DEN','JAX'],college:'Texas',draftYear:2008,draftRound:'3'},
    {name:'Arian Foster',position:'RB',teams:['HOU','MIA'],college:'Tennessee',draftYear:2009,draftRound:'UDFA'},
    {name:'Matt Forte',position:'RB',teams:['CHI','NYJ'],college:'Tulane',draftYear:2008,draftRound:'2'},
    {name:'Chris Johnson',position:'RB',teams:['TEN','NYJ','ARI'],college:'East Carolina',draftYear:2008,draftRound:'1'},
    {name:'Steven Jackson',position:'RB',teams:['LAR','ATL','NE'],college:'Oregon State',draftYear:2004,draftRound:'1'},
    {name:'Maurice Jones-Drew',position:'RB',teams:['JAX','LV'],college:'UCLA',draftYear:2006,draftRound:'2'},
    {name:'Fred Taylor',position:'RB',teams:['JAX','NE'],college:'Florida',draftYear:1998,draftRound:'1'},
    {name:'Eddie George',position:'RB',teams:['TEN','DAL'],college:'Ohio State',draftYear:1996,draftRound:'1'},
    {name:'Priest Holmes',position:'RB',teams:['BAL','KC'],college:'Texas',draftYear:1997,draftRound:'UDFA'},
    {name:'Ahman Green',position:'RB',teams:['SEA','GB','HOU','GB'],college:'Nebraska',draftYear:1998,draftRound:'3'},
    {name:'Shaun Alexander',position:'RB',teams:['SEA','WAS'],college:'Alabama',draftYear:2000,draftRound:'1'},
    {name:'Clinton Portis',position:'RB',teams:['DEN','WAS'],college:'Miami (FL)',draftYear:2002,draftRound:'2'},
    {name:'DeMarco Murray',position:'RB',teams:['DAL','PHI','TEN'],college:'Oklahoma',draftYear:2011,draftRound:'3'},
    {name:'Mark Ingram',position:'RB',teams:['NO','BAL','HOU','NO'],college:'Alabama',draftYear:2011,draftRound:'1'},
    {name:'Doug Martin',position:'RB',teams:['TB','LV'],college:'Boise State',draftYear:2012,draftRound:'1'},
    {name:'Reggie Bush',position:'RB',teams:['NO','MIA','DET','SF','BUF'],college:'USC',draftYear:2006,draftRound:'1'},
    {name:'Brian Westbrook',position:'RB',teams:['PHI','SF'],college:'Villanova',draftYear:2002,draftRound:'3'},
    {name:'Willis McGahee',position:'RB',teams:['BUF','BAL','DEN','CLE'],college:'Miami (FL)',draftYear:2003,draftRound:'1'},
    {name:'Thomas Jones',position:'RB',teams:['ARI','TB','CHI','NYJ','KC'],college:'Virginia',draftYear:2000,draftRound:'1'},
    {name:'Larry Johnson',position:'RB',teams:['KC','CIN','WAS','MIA'],college:'Penn State',draftYear:2003,draftRound:'1'},
    {name:'Cedric Benson',position:'RB',teams:['CHI','CIN','GB'],college:'Texas',draftYear:2005,draftRound:'1'},
    {name:'Michael Turner',position:'RB',teams:['LAC','ATL'],college:'Northern Illinois',draftYear:2004,draftRound:'5'},
    {name:'Devonta Freeman',position:'RB',teams:['ATL','NYG','BUF','BAL'],college:'Florida State',draftYear:2014,draftRound:'4'},
    {name:'Carlos Hyde',position:'RB',teams:['SF','CLE','JAX','HOU','SEA'],college:'Ohio State',draftYear:2014,draftRound:'2'},
    {name:'Melvin Gordon',position:'RB',teams:['LAC','DEN','KC','BAL'],college:'Wisconsin',draftYear:2015,draftRound:'1'},
    {name:'Latavius Murray',position:'RB',teams:['LV','MIN','NO','BAL','DEN','BUF'],college:'UCF',draftYear:2013,draftRound:'6'},
    {name:'Jay Ajayi',position:'RB',teams:['MIA','PHI'],college:'Boise State',draftYear:2015,draftRound:'5'},
    {name:'C.J. Anderson',position:'RB',teams:['DEN','CAR','LV','LAR','DET'],college:'California',draftYear:2013,draftRound:'UDFA'},
    {name:'Darren McFadden',position:'RB',teams:['LV','DAL'],college:'Arkansas',draftYear:2008,draftRound:'1'},
    {name:'Marion Barber',position:'RB',teams:['DAL','CHI'],college:'Minnesota',draftYear:2005,draftRound:'4'},
    {name:'Chester Taylor',position:'RB',teams:['BAL','MIN','CHI','ARI'],college:'Toledo',draftYear:2002,draftRound:'6'},
    {name:'Robert Smith',position:'RB',teams:['MIN'],college:'Ohio State',draftYear:1993,draftRound:'1'},
    {name:'Michael Bennett',position:'RB',teams:['MIN','NO','KC','TB','LAC','LV'],college:'Wisconsin',draftYear:2001,draftRound:'1'},
    {name:'Onterrio Smith',position:'RB',teams:['MIN'],college:'Oregon',draftYear:2003,draftRound:'4'},
    {name:'Toby Gerhart',position:'RB',teams:['MIN','JAX'],college:'Stanford',draftYear:2010,draftRound:'2'},
    {name:'Jerick McKinnon',position:'RB',teams:['MIN','SF','KC'],college:'Georgia Southern',draftYear:2014,draftRound:'3'},
    {name:'Matt Asiata',position:'RB',teams:['MIN'],college:'Utah',draftYear:2011,draftRound:'UDFA'},
    {name:'Alexander Mattison',position:'RB',teams:['MIN','LV','MIA'],college:'Boise State',draftYear:2019,draftRound:'3'},
    {name:'Ricky Watters',position:'RB',teams:['SF','PHI','SEA'],college:'Notre Dame',draftYear:1991,draftRound:'2'},
    {name:'Roger Craig',position:'RB',teams:['SF','LV','MIN'],college:'Nebraska',draftYear:1983,draftRound:'2'},
    {name:'Herschel Walker',position:'RB',teams:['DAL','MIN','PHI','NYG','DAL'],college:'Georgia',draftYear:1985,draftRound:'5'},
    {name:'Julius Peppers',position:'DE',teams:['CAR','CHI','GB','CAR'],college:'North Carolina',draftYear:2002,draftRound:'1',hof:true},
    {name:'Khalil Mack',position:'EDGE',teams:['LV','CHI','LAC'],college:'Buffalo',draftYear:2014,draftRound:'1'},
    {name:'Von Miller',position:'EDGE',teams:['DEN','LAR','BUF','WAS'],college:'Texas A&M',draftYear:2011,draftRound:'1'},
    {name:'Ndamukong Suh',position:'DT',teams:['DET','MIA','LAR','TB','PHI'],college:'Nebraska',draftYear:2010,draftRound:'1'},
    {name:'Calais Campbell',position:'DE',teams:['ARI','JAX','BAL','ATL','MIA','ARI'],college:'Miami (FL)',draftYear:2008,draftRound:'2'},
    {name:'Richard Sherman',position:'CB',teams:['SEA','SF','TB'],college:'Stanford',draftYear:2011,draftRound:'5'},
    {name:'Darrelle Revis',position:'CB',teams:['NYJ','TB','NE','NYJ','KC'],college:'Pittsburgh',draftYear:2007,draftRound:'1',hof:true},
    {name:'Brian Dawkins',position:'S',teams:['PHI','DEN'],college:'Clemson',draftYear:1996,draftRound:'2',hof:true},
    {name:'Terrell Suggs',position:'EDGE',teams:['BAL','ARI','KC'],college:'Arizona State',draftYear:2003,draftRound:'1'},
    {name:'Jason Witten',position:'TE',teams:['DAL','LV'],college:'Tennessee',draftYear:2003,draftRound:'3'},
    {name:'Vernon Davis',position:'TE',teams:['SF','DEN','WAS'],college:'Maryland',draftYear:2006,draftRound:'1'},
    {name:'Jimmy Graham',position:'TE',teams:['NO','SEA','GB','CHI','NO'],college:'Miami (FL)',draftYear:2010,draftRound:'3'},
    {name:'Anquan Boldin',position:'WR',teams:['ARI','BAL','SF','DET'],college:'Florida State',draftYear:2003,draftRound:'2'},
    {name:'Wes Welker',position:'WR',teams:['LAC','MIA','NE','DEN','LAR'],college:'Texas Tech',draftYear:2004,draftRound:'UDFA'},
    {name:'Chad Johnson',position:'WR',teams:['CIN','NE'],college:'Oregon State',draftYear:2001,draftRound:'2'},
    {name:'Steve Smith Sr.',position:'WR',teams:['CAR','BAL'],college:'Utah',draftYear:2001,draftRound:'3'},
    {name:'Jordy Nelson',position:'WR',teams:['GB','LV'],college:'Kansas State',draftYear:2008,draftRound:'2'},
    {name:'Demaryius Thomas',position:'WR',teams:['DEN','HOU','NE','NYJ'],college:'Georgia Tech',draftYear:2010,draftRound:'1'},
    {name:'DeSean Jackson',position:'WR',teams:['PHI','WAS','TB','PHI','LAR','LV','BAL'],college:'California',draftYear:2008,draftRound:'2'},
    {name:'Brandin Cooks',position:'WR',teams:['NO','NE','LAR','HOU','DAL'],college:'Oregon State',draftYear:2014,draftRound:'1'},
    {name:'Brandon Marshall',position:'WR',teams:['DEN','MIA','CHI','NYJ','NYG','SEA'],college:'UCF',draftYear:2006,draftRound:'4'},
    {name:'Frank Gore',position:'RB',teams:['SF','IND','MIA','BUF','NYJ'],college:'Miami (FL)',draftYear:2005,draftRound:'3'},
    {name:'Ryan Fitzpatrick',position:'QB',teams:['LAR','CIN','BUF','TEN','HOU','NYJ','TB','MIA','WAS'],college:'Harvard',draftYear:2005,draftRound:'7'},
    {name:'Carson Wentz',position:'QB',teams:['PHI','IND','WAS','LAR','KC'],college:'North Dakota State',draftYear:2016,draftRound:'1'},
    {name:'Joe Flacco',position:'QB',teams:['BAL','DEN','NYJ','PHI','CLE','IND','CLE'],college:'Delaware',draftYear:2008,draftRound:'1'},
    {name:'Philip Rivers',position:'QB',teams:['LAC','IND'],college:'NC State',draftYear:2004,draftRound:'1'},
    {name:'Donovan McNabb',position:'QB',teams:['PHI','WAS','MIN'],college:'Syracuse',draftYear:1999,draftRound:'1'},
    {name:'Steve McNair',position:'QB',teams:['TEN','BAL'],college:'Alcorn State',draftYear:1995,draftRound:'1'},
    {name:'Matt Ryan',position:'QB',teams:['ATL','IND'],college:'Boston College',draftYear:2008,draftRound:'1'},
    {name:'Cam Newton',position:'QB',teams:['CAR','NE','CAR'],college:'Auburn',draftYear:2011,draftRound:'1'},
    {name:'Michael Vick',position:'QB',teams:['ATL','PHI','NYJ','PIT'],college:'Virginia Tech',draftYear:2001,draftRound:'1'}
  ];

  const FHQ_GRID_EXTRA_HISTORY=[
    ['Walter Payton','RB',['CHI'],'Jackson State'],['Barry Sanders','RB',['DET'],'Oklahoma State'],['Eric Dickerson','RB',['LAR','IND','LV','ATL'],'SMU'],
    ['Tony Dorsett','RB',['DAL','DEN'],'Pittsburgh'],['Thurman Thomas','RB',['BUF','MIA'],'Oklahoma State'],['Curtis Martin','RB',['NE','NYJ'],'Pittsburgh'],
    ['LaDainian Tomlinson','RB',['LAC','NYJ'],'TCU'],['Marshall Faulk','RB',['IND','LAR'],'San Diego State'],['Edgerrin James','RB',['IND','ARI','SEA'],'Miami (FL)'],
    ['Jerome Bettis','RB',['LAR','PIT'],'Notre Dame'],['Tiki Barber','RB',['NYG'],'Virginia'],['Rudi Johnson','RB',['CIN','DET'],'Auburn'],
    ['Corey Dillon','RB',['CIN','NE'],'Washington'],['Warrick Dunn','RB',['TB','ATL','TB'],'Florida State'],['Deuce McAllister','RB',['NO'],'Ole Miss'],
    ['Terrell Davis','RB',['DEN'],'Georgia'],['Ricky Williams','RB',['NO','MIA','BAL'],'Texas'],['Ronnie Brown','RB',['MIA','PHI','LAC'],'Auburn'],
    ['Santana Moss','WR',['NYJ','WAS'],'Miami (FL)'],['Hines Ward','WR',['PIT'],'Georgia'],['Reggie Wayne','WR',['IND'],'Miami (FL)'],
    ['Marvin Harrison','WR',['IND'],'Syracuse'],['Torry Holt','WR',['LAR','JAX'],'NC State'],['Isaac Bruce','WR',['LAR','SF'],'Memphis'],
    ['Andre Johnson','WR',['HOU','IND','TEN'],'Miami (FL)'],['Larry Fitzgerald','WR',['ARI'],'Pittsburgh'],['Roddy White','WR',['ATL'],'UAB'],
    ['Donald Driver','WR',['GB'],'Alcorn State'],['Greg Jennings','WR',['GB','MIN','MIA'],'Western Michigan'],['Plaxico Burress','WR',['PIT','NYG','NYJ','PIT'],'Michigan State'],
    ['Jeremy Shockey','TE',['NYG','NO','CAR'],'Miami (FL)'],['Antonio Gates','TE',['LAC'],'Kent State'],['Tony Gonzalez','TE',['KC','ATL'],'California'],
    ['Shannon Sharpe','TE',['DEN','BAL','DEN'],'Savannah State'],['Dallas Clark','TE',['IND','TB','BAL'],'Iowa'],['Heath Miller','TE',['PIT'],'Virginia'],
    ['Drew Brees','QB',['LAC','NO'],'Purdue'],['Eli Manning','QB',['NYG'],'Ole Miss'],['Ben Roethlisberger','QB',['PIT'],'Miami (OH)'],
    ['Kurt Warner','QB',['LAR','NYG','ARI'],'Northern Iowa'],['Tony Romo','QB',['DAL'],'Eastern Illinois'],['Matt Hasselbeck','QB',['GB','SEA','TEN','IND'],'Boston College'],
    ['Daunte Culpepper','QB',['MIN','MIA','LV','DET'],'UCF'],['Jake Delhomme','QB',['NO','CAR','CLE','HOU'],'Louisiana'],['Jeff Garcia','QB',['SF','CLE','DET','PHI','TB','PHI','HOU'],'San Jose State'],
    ['Ray Lewis','LB',['BAL'],'Miami (FL)'],['Brian Urlacher','LB',['CHI'],'New Mexico'],['Zach Thomas','LB',['MIA','DAL'],'Texas Tech'],
    ['Champ Bailey','CB',['WAS','DEN'],'Georgia'],['Charles Woodson','CB',['LV','GB','LV'],'Michigan'],['Ronde Barber','CB',['TB'],'Virginia'],
    ['Ed Reed','S',['BAL','HOU','NYJ'],'Miami (FL)'],['Troy Polamalu','S',['PIT'],'USC'],['John Lynch','S',['TB','DEN'],'Stanford'],
    ['Michael Strahan','DE',['NYG'],'Texas Southern'],['Jared Allen','DE',['KC','MIN','CHI','CAR'],'Idaho State'],['Dwight Freeney','DE',['IND','LAC','ARI','ATL','SEA','DET'],'Syracuse']
  ];
  function fhqHistoricGridPeople(){
    return FHQ_GRID_HISTORIC_PLAYERS.concat(FHQ_GRID_EXTRA_HISTORY.map(function(x){return {name:x[0],position:x[1],teams:x[2],college:x[3]}})).map(function(h){
      const currentTeam=String((h.teams||[]).slice(-1)[0]||'');
      const meta=TEAM_META[currentTeam]||['NFL','—'];
      return {
        name:h.name,team:currentTeam,position:h.position||'',
        conference:meta[0],division:meta[1],
        college:h.college||'',colleges:h.college?[h.college]:[],
        careerTeams:(h.teams||[]).slice(),
        draftYear:h.draftYear||'',draftRound:h.draftRound||'',
        retired:true,active:false,coach:false,hof:!!h.hof,rings:Number(h.rings||0),
        historical:true
      };
    });
  }

  function personGroup(p){
    const pos=String(p&&p.position||'').toUpperCase();
    if(p&&p.coach)return 'Coach';
    if(p&&p.group)return p.group;
    if(['QB','RB','FB','WR','TE','OT','T','OG','G','C','OL'].includes(pos))return 'Offense';
    if(['K','P','LS','KR','PR'].includes(pos))return 'Special Teams';
    if(['DE','DT','DL','NT','LB','ILB','OLB','CB','DB','S','FS','SS','EDGE'].includes(pos))return 'Defense';
    return 'Other';
  }
  let fhqNFLUniverseCache=null,fhqNFLUniverseStamp='';
  function nflUniverse(){
    const active=activeNFLPlayers();
    const stamp=active.length+'|'+LEGENDS.length+'|'+COACHES.length;
    if(fhqNFLUniverseCache&&fhqNFLUniverseStamp===stamp)return fhqNFLUniverseCache;
    const rankMap=new Map((Array.isArray(players)?players:[]).map((r,i)=>[norm(r.player||r.name),i+1]));
    const current=active.slice().sort(function(a,b){
      return (rankMap.get(norm(a.name))||9999)-(rankMap.get(norm(b.name))||9999) ||
             (Number(a.depthOrder)||99)-(Number(b.depthOrder)||99) || a.name.localeCompare(b.name);
    });
    fhqNFLUniverseCache=current.concat(LEGENDS).concat(COACHES);
    fhqNFLUniverseStamp=stamp;
    return fhqNFLUniverseCache;
  }
  let fhqDepthPoolCache=null,fhqDepthPoolCacheStamp='';
  function depthLimitedActive(){
    const playerCount=(typeof sleeperPlayersByName!=='undefined'?Object.keys(sleeperPlayersByName).length:0);
    const rankCount=(typeof players!=='undefined'&&Array.isArray(players)?players.length:0);
    const stamp=playerCount+'|'+rankCount;
    if(fhqDepthPoolCache&&fhqDepthPoolCacheStamp===stamp)return fhqDepthPoolCache;
    const rankedKeys=new Set(
      (typeof players!=='undefined'&&Array.isArray(players)?players:[])
        .map(x=>norm(x.player||x.name)).filter(Boolean)
    );
    fhqDepthPoolCache=activeNFLPlayers().filter(function(p){
      return (Number.isFinite(p.depthOrder)&&p.depthOrder<=3)||rankedKeys.has(norm(p.name));
    });
    fhqDepthPoolCacheStamp=stamp;
    return fhqDepthPoolCache;
  }
  function currentSkillPlayers(){
    const out=[],seen={};
    depthLimitedActive().filter(p=>p.active&&!p.retired&&!p.coach&&['QB','RB','WR','TE'].includes(p.position)).forEach(function(p){
      const k=norm(p.name);if(!seen[k]){seen[k]=1;out.push(p);}
    });
    if(typeof players!=='undefined'&&Array.isArray(players)){
      players.forEach(function(r){
        const name=r.player||r.name||'',pos=String(r.position||'').toUpperCase(),team=String(r.team||'').toUpperCase();
        if(!name||!['QB','RB','WR','TE'].includes(pos)||!TEAM_META[team])return;
        const k=norm(name);if(seen[k])return;
        const meta=teamMeta(team),s=(typeof sleeperPlayersByName!=='undefined'&&sleeperPlayersByName[k])||{};
        seen[k]=1;
        out.push({
          name,team,position:pos,conference:meta[0],division:meta[1],
          age:Number(s.age)||null,bye:(typeof nflByeWeeks2026!=='undefined'?Number(nflByeWeeks2026[team]):null)||null,
          yearsExp:s.years_exp===''||s.years_exp==null?null:Number(s.years_exp),
          depthOrder:s.depth_chart_order==null?1:Number(s.depth_chart_order),
          college:s.college||'',draftRound:s.draft_round||'',draftYear:s.draft_year||'',
          jerseyNumber:s.jersey_number||'',playerId:s.id||'',
          active:true,retired:false,coach:false
        });
      });
    }
    return out;
  }
  function recognizableActive(){
    const rankedKeys=new Set((typeof players!=='undefined'&&Array.isArray(players)?players:[]).map(x=>norm(x.player||x.name)));
    return depthLimitedActive().filter(function(p){
      const skill=['QB','RB','WR','TE','K','P','CB','S','LB','DE','EDGE'].includes(p.position);
      return skill&&(rankedKeys.has(norm(p.name))||p.depthOrder===1||p.depthOrder===2);
    });
  }
  function generatedFacePool(){
    // Generated-answer games avoid deep-roster names and strongly favor players with known image sources.
    return recognizableActive().filter(function(p){
      const key=norm(p.name);
      return !!((typeof flockPhotos!=='undefined'&&flockPhotos[key])||p.playerId);
    });
  }
  let fhqGridUniverseCache=null,fhqGridUniverseStamp='';
  function gridGuessUniverse(){
    const stamp=depthLimitedActive().length+'|'+LEGENDS.length+'|'+COACHES.length;
    if(fhqGridUniverseCache&&fhqGridUniverseStamp===stamp)return fhqGridUniverseCache;
    const active=depthLimitedActive().map(function(p){
      return Object.assign({},p,{careerTeams:fhqGridCareerTeams(p),colleges:fhqGridColleges(p)});
    });
    const legends=LEGENDS.map(function(p){
      return Object.assign({},p,{careerTeams:fhqGridCareerTeams(p),colleges:fhqGridColleges(p)});
    });
    const historical=fhqHistoricGridPeople();
    const merged=[],seen=new Set();
    active.concat(legends,historical,COACHES).forEach(function(p){
      if(!p||!p.name)return;
      const key=norm(p.name);
      if(seen.has(key))return;
      seen.add(key);merged.push(p);
    });
    fhqGridUniverseCache=merged;
    fhqGridUniverseStamp=stamp;
    return fhqGridUniverseCache;
  }
  function pool(){
    if(mode==='legends')return legendGuessPool();
    const all=activeNFLPlayers().filter(p=>p&&p.active&&!p.retired&&!p.coach&&fhqQAPlayerRecord(p));
    return all.length?fhqDedupePlayers(all):fhqDedupePlayers(currentSkillPlayers());
  }
  function fhqPlayerSide(position){
    position=String(position||'').toUpperCase();
    if(['QB','RB','FB','WR','TE','OL','OT','OG','G','C'].includes(position))return'offense';
    if(['DL','DT','DE','EDGE','NT','LB','ILB','OLB','CB','DB','S','FS','SS'].includes(position))return'defense';
    if(['K','P','LS','KR','PR'].includes(position))return'special';
    return'other';
  }
  function unlimitedCurrentAnswerPool(){
    const all=pool();
    if(playerDifficulty==='easy'){
      const easy=all.filter(p=>fhqPlayerSide(p.position)==='offense'&&Number(p.depthOrder||1)<=1&&['QB','RB','WR','TE'].includes(String(p.position||'').toUpperCase()));
      return easy.length?easy:dailyCurrentAnswerPool();
    }
    if(playerDifficulty==='medium'){
      const medium=all.filter(p=>['offense','defense'].includes(fhqPlayerSide(p.position))&&Number(p.depthOrder||1)<=1);
      return medium.length?medium:all.filter(p=>Number(p.depthOrder||1)<=1);
    }
    const brutal=all.filter(p=>['offense','defense','special'].includes(fhqPlayerSide(p.position)));
    return brutal.length?brutal:all;
  }

  function dailyCurrentAnswerPool(){
    return (Array.isArray(starterPlayers)?starterPlayers:[]).filter(r=>r&&r.player&&!/^frank gore$/i.test(String(r.player))&&['QB','RB','WR','TE'].includes(String(r.position||'').toUpperCase())&&TEAM_META[String(r.team||'').toUpperCase()]).map(function(r){
      const meta=teamMeta(r.team),s=(typeof sleeperPlayersByName!=='undefined'&&sleeperPlayersByName[norm(r.player)])||{};
      return {name:r.player,team:r.team,position:String(r.position||'').toUpperCase(),conference:meta[0],division:meta[1],age:Number(s.age)||null,bye:(typeof nflByeWeeks2026!=='undefined'?Number(nflByeWeeks2026[r.team]):null)||null,yearsExp:s.years_exp==null?null:Number(s.years_exp),depthOrder:s.depth_chart_order==null?1:Number(s.depth_chart_order),college:s.college||'',draftRound:s.draft_round||'',draftYear:s.draft_year||'',jerseyNumber:s.jersey_number||'',playerId:s.id||'',active:true,retired:false,coach:false};
    });
  }
  function chooseAnswer(){
    const p=mode==='legends'?famousLegendAnswerPool():
      (mode==='players'?(playType==='daily'?dailyCurrentAnswerPool():unlimitedCurrentAnswerPool()):pool());
    answer=randomFrom(p,modeSeed(mode==='players'?17:47)+(['easy','medium','brutal'].indexOf(playerDifficulty)+1)*211);
  }
  function headers(){
    return mode==='players'?['Player','Team','Division','Position','Age','Bye']:['Legend','Team','Division','Position','Era','Rings'];
  }
  function resolvedPlayerAge(x){
    const direct=Number(x&&x.age);
    if(Number.isFinite(direct)&&direct>0)return direct;

    // V42 fallback for players whose provider record is missing age.
    const knownBirthdays={
      'devonta smith':'1998-11-14'
    };
    const dob=knownBirthdays[norm(x&&x.name)];
    if(!dob)return null;

    const parts=dob.split('-').map(Number);
    const today=new Date();
    let age=today.getFullYear()-parts[0];
    const month=today.getMonth()+1,day=today.getDate();
    if(month<parts[1]||(month===parts[1]&&day<parts[2]))age--;
    return age;
  }

  function values(x){
    const resolvedAge=resolvedPlayerAge(x);
    return mode==='players'
      ?[x.name,x.team,fhqFullDivision(x.conference,x.division),x.position,resolvedAge==null?'—':resolvedAge,x.bye||'—']
      :[x.name,x.team,fhqFullDivision(x.conference,x.division),x.position,x.era||'—',x.rings==null?'—':x.rings];
  }
  function closeness(g,a,i){
    const gv=values(g)[i],av=values(a)[i];
    if(i===0)return norm(g.name)===norm(a.name)?'green':'red';
    if(i===1)return String(g.team)===String(a.team)?'green':'red';
    if(i===2){const state=fhqDivisionState(g,a);return state==='gray'?'red':state;}
    if(String(gv)===String(av))return'green';
    if(i===3){
      if(mode==='players'){
        const gs=fhqPlayerSide(g.position),as=fhqPlayerSide(a.position);
        if(gs!=='other'&&gs===as)return'yellow';
      }else{
        const skill=['QB','RB','WR','TE'];
        if(skill.includes(g.position)&&skill.includes(a.position))return'yellow';
      }
    }
    if(mode==='players'&&(i===4||i===5)&&Number.isFinite(Number(gv))&&Number.isFinite(Number(av))&&Math.abs(Number(gv)-Number(av))<=2)return'yellow';
    if(mode==='legends'&&i===4&&Math.abs(parseInt(g.era)-parseInt(a.era))<=10)return'yellow';
    if(mode==='legends'&&i===5&&Math.abs(Number(gv)-Number(av))<=1)return'yellow';
    return'red';
  }
  function cellHTML(g,i,v){
    const c=i===0?(norm(g.name)===norm(answer.name)?'green':'red'):closeness(g,answer,i);
    let extra='';
    if((mode==='players'&&(i===4||i===5))||(mode==='legends'&&i===5)){
      if(c!=='green'&&Number.isFinite(Number(v))&&Number.isFinite(Number(values(answer)[i])))extra=Number(v)<Number(values(answer)[i])?' ↑':' ↓';
    }
    if(i===0)return '<div class="fg-cell fg-'+c+' fg-player-cell">'+photoHTML(g,'fg-player-photo')+'<span class="fg-player-name">'+esc(v)+'</span></div>';
    if(i===1)return '<div class="fg-cell fg-'+c+' fg-team-cell">'+logoHTML(g.team)+'<span>'+esc(v)+'</span></div>';
    if(i===2){
      const conf=String(g.conference||'').toUpperCase(),direction=String(g.division||v||'').trim().split(/\s+/).pop();
      return '<div class="fg-cell fg-'+c+' fg-division-cell">'+conferenceLogoHTML(conf)+'<span class="fg-division-arrow">'+divisionArrow(direction)+'</span><span>'+esc(direction||'—')+'</span></div>';
    }
    return '<div class="fg-cell fg-'+c+'">'+esc(v)+extra+'</div>';
  }

  function gridPersonByName(name){
    return currentSkillPlayers().find(p=>norm(p.name)===norm(name))||activeNFLPlayers().find(p=>norm(p.name)===norm(name))||null;
  }
  function criterionLabel(c){
    if(!c)return'—';
    if(c.type==='team')return logoHTML(c.value)+'<span class="fg-clue-tag">'+esc(c.value)+'</span>';
    if(c.type==='conference')return conferenceLogoHTML(c.value);
    if(c.type==='division')return '<span class="fg-division-arrow">'+divisionArrow(c.value)+'</span><span class="fg-clue-tag">'+esc(c.value)+'</span>';
    if(c.type==='champion')return '<span class="fg-clue-tag">LOMBARDI WINNER</span>';
    if(c.type==='hof')return '<span class="fg-clue-tag">HALL OF FAME</span>';
    if(c.type==='coach')return '<span class="fg-clue-tag">HEAD COACH</span>';
    if(c.type==='college')return '<span class="fg-clue-tag">COLLEGE: '+esc(c.value)+'</span>';
    if(c.type==='draftRound')return '<span class="fg-clue-tag">DRAFTED ROUND '+esc(c.value)+'</span>';
    if(c.type==='teammate'){
      const p=gridPersonByName(c.value);
      return '<span class="fg-grid-person-clue">'+(p?photoHTML(p,'fg-player-photo'):'')+'<strong>'+esc(c.value)+'</strong><small>TEAMMATE OF</small></span>';
    }
    return '<span class="fg-clue-tag">'+esc(c.label||c.value)+'</span>';
  }
  function matchesCriterion(p,c){
    if(!p||!c)return false;
    const group=personGroup(p);
    if(c.type==='team')return fhqGridCareerTeams(p).includes(String(c.value||'').toUpperCase());
    if(c.type==='position')return p.position===c.value;
    if(c.type==='conference')return p.conference===c.value;
    if(c.type==='division')return p.division===c.value;
    if(c.type==='group')return group===c.value;
    if(c.type==='retired')return !!p.retired;
    if(c.type==='hof')return !!p.hof;
    if(c.type==='coach')return !!p.coach;
    if(c.type==='champion')return Number(p.rings||0)>0;
    if(c.type==='rookie')return !!p.active&&Number(p.yearsExp)===0;
    if(c.type==='veteran')return Number(p.yearsExp)>=7 || (fhqGridCareerTeams(p).length>=2 && (!!p.retired || Number(p.yearsExp)>=6));
    if(c.type==='college')return fhqGridColleges(p).some(x=>norm(x)===norm(c.value));
    if(c.type==='draftRound'){
      let round=String(p.draftRound||'').trim();
      if(!round){
        const knownRoundOne=new Set([
          'Josh Allen','Saquon Barkley','Patrick Mahomes','Lamar Jackson','Joe Burrow','Justin Herbert','Tua Tagovailoa',
          'Trevor Lawrence','Jordan Love','Baker Mayfield','Kyler Murray','Jared Goff','Matthew Stafford','Caleb Williams',
          'Jayden Daniels','Drake Maye','Bo Nix','Michael Penix Jr.','J.J. McCarthy','Bijan Robinson','Jahmyr Gibbs',
          'Christian McCaffrey','Josh Jacobs','Ja\'Marr Chase','DeVonta Smith','CeeDee Lamb','Justin Jefferson',
          'Garrett Wilson','Chris Olave','Drake London','Jaylen Waddle','Jaxon Smith-Njigba','Marvin Harrison Jr.',
          'Malik Nabers','Rome Odunze','Brian Thomas Jr.','Kyle Pitts','Brock Bowers','T.J. Hockenson'
        ].map(norm));
        if(knownRoundOne.has(norm(p.name)))round='1';
      }
      return round===String(c.value);
    }
    if(c.type==='teammate'){
      const anchor=gridPersonByName(c.value);
      if(!anchor||norm(p.name)===norm(anchor.name))return false;
      const aTeams=new Set(fhqGridCareerTeams(anchor));
      return fhqGridCareerTeams(p).some(t=>aTeams.has(t));
    }
    return false;
  }
  const fhqGridMatchCache=new Map();
  function criterionCacheKey_(c){
    return [c&&c.type,c&&c.value,c&&c.label].join('|');
  }
  function validGridPeople(a,b){
    const key=criterionCacheKey_(a)+'::'+criterionCacheKey_(b)+'::'+gridGuessUniverse().length;
    if(fhqGridMatchCache.has(key))return fhqGridMatchCache.get(key);
    const result=gridGuessUniverse().filter(function(p){return matchesCriterion(p,a)&&matchesCriterion(p,b)});
    fhqGridMatchCache.set(key,result);
    return result;
  }
  function shuffled(arr,seed){
    return arr.slice().sort(function(a,b){
      return seededIndex(seed+norm(JSON.stringify(a)).length*11,997)-seededIndex(seed+norm(JSON.stringify(b)).length*13,997)
    });
  }
  function dailyShuffle(arr,seed){
    if(playType!=='daily')return arr.slice().sort(()=>Math.random()-.5);
    return arr.slice().map((x,i)=>({x,k:seededIndex(seed+i*97,100000)})).sort((a,b)=>a.k-b.k).map(o=>o.x);
  }
  function gridCriteria(){
    return [
      {type:'position',value:'QB',label:'QB'},{type:'position',value:'RB',label:'RB'},{type:'position',value:'WR',label:'WR'},
      {type:'position',value:'TE',label:'TE'},{type:'group',value:'Defense',label:'DEFENSE'},
      {type:'group',value:'Special Teams',label:'SPECIAL TEAMS'},{type:'retired',value:true,label:'RETIRED'},
      {type:'hof',value:true,label:'HALL OF FAME'},{type:'coach',value:true,label:'COACH'},
      {type:'champion',value:true,label:'SUPER BOWL CHAMP'},{type:'rookie',value:true,label:'ROOKIE'},
      {type:'veteran',value:true,label:'7+ YEAR VETERAN'},
      {type:'conference',value:'AFC',label:'AFC'},{type:'conference',value:'NFC',label:'NFC'},
      {type:'division',value:'East',label:'EAST'},{type:'division',value:'West',label:'WEST'},
      {type:'division',value:'North',label:'NORTH'},{type:'division',value:'South',label:'SOUTH'}
    ];
  }
  const fhqGridCriterionMatches=new Map();
  function gridCriterionMatchesFast(criterion){
    const key=criterionCacheKey_(criterion);
    if(fhqGridCriterionMatches.has(key))return fhqGridCriterionMatches.get(key);
    const arr=gridGuessUniverse().filter(function(p){return matchesCriterion(p,criterion)});
    fhqGridCriterionMatches.set(key,arr);
    return arr;
  }

  function gridPairCountFast(a,b){
    const key=criterionCacheKey_(a)+'||'+criterionCacheKey_(b);
    if(fhqGridMatchCache.has(key))return fhqGridMatchCache.get(key).length;
    const left=gridCriterionMatchesFast(a);
    const rightKeys=new Set(gridCriterionMatchesFast(b).map(function(p){return norm(p.name)}));
    const matches=left.filter(function(p){return rightKeys.has(norm(p.name))});
    fhqGridMatchCache.set(key,matches);
    return matches.length;
  }

  let fhqGridBaseCriteriaCache=null;
  let fhqGridBaseCriteriaStamp='';
  const fhqGridTemplateCache=new Map();

  function gridBaseCriteria(){
    const uni=gridGuessUniverse();
    const stamp=String(uni.length)+'|'+String(LEGENDS.length)+'|'+String(COACHES.length);
    if(fhqGridBaseCriteriaCache&&fhqGridBaseCriteriaStamp===stamp)return fhqGridBaseCriteriaCache;

    const teamCounts={};
    uni.forEach(function(p){if(p&&p.team)teamCounts[p.team]=(teamCounts[p.team]||0)+1});

    const teams=Array.from(new Set(uni.map(p=>p.team).filter(Boolean))).map(t=>({type:'team',value:t,label:t}));
    const positions=['QB','RB','WR','TE','LB','CB','S','DE'].map(p=>({type:'position',value:p,label:p}));
    const divisions=['East','North','South','West'].map(v=>({type:'division',value:v,label:v.toUpperCase()}));
    const specific=[
      {type:'champion',value:true,label:'SUPER BOWL CHAMP'},
      {type:'veteran',value:true,label:'7+ YEAR VETERAN'},
      {type:'rookie',value:true,label:'ROOKIE'},
      {type:'draftRound',value:'1',label:'DRAFTED ROUND 1'},
      {type:'retired',value:true,label:'RETIRED'},
      {type:'hof',value:true,label:'HALL OF FAME'}
    ];

    // College counts computed once instead of re-filtering the whole universe per difficulty switch.
    const collegeCounts={};
    uni.forEach(function(p){
      const col=String(p&&p.college||'').trim();if(col)collegeCounts[col]=(collegeCounts[col]||0)+1;
    });
    const colleges=Object.keys(collegeCounts).filter(c=>collegeCounts[c]>=5).map(c=>({type:'college',value:c,label:c.toUpperCase()}));

    // Teammate anchors: use team count lookup instead of O(N²) nested filters.
    const activeAnchors=uni.filter(function(p){
      return p&&p.active&&!p.retired&&!p.coach&&p.team&&teamCounts[p.team]>=6&&
        ['QB','RB','WR','TE','LB','CB','S','DE'].includes(p.position);
    }).slice(0,60).map(p=>({type:'teammate',value:p.name,label:'TEAMMATE OF '+p.name.toUpperCase()}));

    fhqGridBaseCriteriaCache={teams,positions,divisions,specific,colleges,activeAnchors};
    fhqGridBaseCriteriaStamp=stamp;
    return fhqGridBaseCriteriaCache;
  }

  function gridCriteriaPools(level){
    const b=gridBaseCriteria();
    if(level==='easy')return {rows:b.teams.concat(b.divisions).concat(b.specific.slice(0,3)),cols:b.positions.concat(b.teams).concat(b.specific.slice(0,3))};
    if(level==='medium')return {rows:b.teams.concat(b.colleges).concat(b.activeAnchors.slice(0,20)).concat(b.specific),cols:b.positions.concat(b.teams).concat(b.divisions).concat(b.specific)};
    if(level==='hard')return {rows:b.colleges.concat(b.activeAnchors.slice(0,35)).concat(b.teams).concat(b.specific),cols:b.teams.concat(b.positions).concat(b.specific).concat(b.divisions)};
    return {rows:b.activeAnchors.concat(b.colleges).concat(b.teams).concat([{type:'hof',value:true,label:'HALL OF FAME'},{type:'retired',value:true,label:'RETIRED'}]),cols:b.teams.concat(b.specific).concat(b.positions).concat(b.colleges.slice(0,20))};
  }

  function gridAnswerRange(level){
    return level==='easy'?{min:7,max:22,target:13}:
      level==='medium'?{min:5,max:16,target:10}:
      level==='hard'?{min:3,max:10,target:6}:{min:2,max:7,target:4};
  }

  function gridPairAllowed(a,b,level){
    if(!a||!b)return false;
    if(a.type===b.type&&a.value===b.value)return false;
    if(a.type==='conference'&&b.type==='position')return false;
    if(b.type==='conference'&&a.type==='position')return false;
    if(a.type==='division'&&b.type==='position'&&level!=='easy')return false;
    if(b.type==='division'&&a.type==='position'&&level!=='easy')return false;
    return true;
  }

  function generateGridTemplate(level){
    const cacheKey=dailyDateKey()+'|'+level;
    if(playType==='daily'&&fhqGridTemplateCache.has(cacheKey)){
      const cached=fhqGridTemplateCache.get(cacheKey);
      return {rows:cached.rows.slice(),cols:cached.cols.slice()};
    }

    // V49: prevalidated lightweight boards. No whole-database pair scoring on the main thread.
    // This removes the largest source of Grid freezes/crashes.
    const templates={
      easy:[
        {rows:[{type:'team',value:'KC',label:'KC'},{type:'team',value:'PHI',label:'PHI'},{type:'team',value:'DET',label:'DET'}],
         cols:[{type:'position',value:'QB',label:'QB'},{type:'position',value:'WR',label:'WR'},{type:'veteran',value:true,label:'7+ YEAR VETERAN'}]},
        {rows:[{type:'team',value:'BUF',label:'BUF'},{type:'team',value:'DAL',label:'DAL'},{type:'team',value:'SF',label:'SF'}],
         cols:[{type:'position',value:'RB',label:'RB'},{type:'position',value:'WR',label:'WR'},{type:'draftRound',value:'1',label:'DRAFTED ROUND 1'}]}
      ],
      medium:[
        {rows:[{type:'team',value:'BAL',label:'BAL'},{type:'team',value:'GB',label:'GB'},{type:'college',value:'Alabama',label:'ALABAMA'}],
         cols:[{type:'position',value:'RB',label:'RB'},{type:'veteran',value:true,label:'7+ YEAR VETERAN'},{type:'draftRound',value:'1',label:'DRAFTED ROUND 1'}]},
        {rows:[{type:'team',value:'MIN',label:'MIN'},{type:'team',value:'MIA',label:'MIA'},{type:'college',value:'Ohio State',label:'OHIO STATE'}],
         cols:[{type:'position',value:'WR',label:'WR'},{type:'position',value:'RB',label:'RB'},{type:'veteran',value:true,label:'7+ YEAR VETERAN'}]}
      ],
      hard:[
        {rows:[{type:'college',value:'Ohio State',label:'OHIO STATE'},{type:'team',value:'SF',label:'SF'},{type:'team',value:'BAL',label:'BAL'}],
         cols:[{type:'draftRound',value:'1',label:'DRAFTED ROUND 1'},{type:'veteran',value:true,label:'7+ YEAR VETERAN'},{type:'position',value:'WR',label:'WR'}]},
        {rows:[{type:'college',value:'Alabama',label:'ALABAMA'},{type:'team',value:'PHI',label:'PHI'},{type:'team',value:'BUF',label:'BUF'}],
         cols:[{type:'draftRound',value:'1',label:'DRAFTED ROUND 1'},{type:'position',value:'RB',label:'RB'},{type:'position',value:'WR',label:'WR'}]}
      ],
      brutal:[
        {rows:[{type:'college',value:'Alabama',label:'ALABAMA'},{type:'college',value:'Ohio State',label:'OHIO STATE'},{type:'team',value:'GB',label:'GB'}],
         cols:[{type:'draftRound',value:'1',label:'DRAFTED ROUND 1'},{type:'veteran',value:true,label:'7+ YEAR VETERAN'},{type:'position',value:'RB',label:'RB'}]},
        {rows:[{type:'team',value:'PIT',label:'PIT'},{type:'college',value:'Georgia',label:'GEORGIA'},{type:'team',value:'SEA',label:'SEA'}],
         cols:[{type:'draftRound',value:'1',label:'DRAFTED ROUND 1'},{type:'position',value:'WR',label:'WR'},{type:'veteran',value:true,label:'7+ YEAR VETERAN'}]}
      ]
    };
    const list=templates[level]||templates.medium;
    const seed=(playType==='daily'?Number(dailyDateKey().replace(/-/g,'')):Date.now())+lastGridTemplateIndex;
    const chosen=list[Math.abs(seed)%list.length];
    const result={rows:chosen.rows,cols:chosen.cols};
    if(playType==='daily')fhqGridTemplateCache.set(cacheKey,result);
    return {rows:result.rows.slice(),cols:result.cols.slice()};
  }
  function gridTemplates(level){ return [generateGridTemplate(level)]; }

  let fhqGridSwitchBusy=false;
  function buildGrid(forceNew){
    if(playType==='daily')gridDifficulty='medium';
    if(!forceNew&&gridRows.length===3&&gridCols.length===3)return;
    fhqGridMatchCache.clear();
    const found=generateGridTemplate(gridDifficulty);
    gridRows=found.rows.slice();
    gridCols=found.cols.slice();
    gridAnswers={};
    gridSelected=null;
    gridMisses=0;
    finished=false;
    gameWon=false;
    lastGridTemplateIndex=(lastGridTemplateIndex+1)%9999;
  }

  function prewarmNFLGridDifficulties(){
    // V49: intentionally no-op. All difficulty templates are instant and cached on demand.
  }

  function renderGridGame(){
    const box=document.getElementById('fgGridGame');if(!box)return;
    if(playType==='unlimited'&&!gridDifficultyChosen){
      box.innerHTML=fhqDifficultyGateHTML('GRID','Choose the kind of grid you want to play.',[
        {value:'easy',title:'EASY',kicker:'FAMILIAR',desc:'Popular teams, positions, stars and forgiving intersections.',tone:'easy'},
        {value:'medium',title:'NORMAL',kicker:'BALANCED',desc:'Teams, colleges, veterans and draft facts.',tone:'medium'},
        {value:'hard',title:'HARD',kicker:'DEEPER BALL KNOWLEDGE',desc:'Tighter intersections and tougher combinations.',tone:'hard'},
        {value:'brutal',title:'BRUTAL',kicker:'EXTREME BALL KNOWERS',desc:'Obscure overlaps and tiny valid answer pools.',tone:'brutal'}
      ],'grid-difficulty-start');
      box.querySelectorAll('[data-grid-difficulty-start]').forEach(function(b){b.onclick=function(){
        gridDifficulty=this.dataset.gridDifficultyStart;gridDifficultyChosen=true;buildGrid(true);renderGridGame();suggest();
      }});
      document.getElementById('fgPrompt').textContent='Choose your Grid difficulty.';
      document.getElementById('fgMessage').textContent='The grid loads after you choose.';
      return;
    }
    const used=Object.keys(gridAnswers).length,attempts=used+gridMisses,left=Math.max(0,12-attempts),lives=Math.max(0,3-gridMisses);
    const difficultyUI=playType==='daily'
      ?'<div class="fg-grid-daily-level"><span>DAILY GRID • OFFICIAL BOARD</span></div>'
      :'<div class="fg-difficulty-label">DIFFICULTY</div><div class="fg-difficulty">'+['easy','medium','hard','brutal'].map(d=>'<button type="button" data-grid-difficulty="'+d+'" class="'+(gridDifficulty===d?'active':'')+'">'+d.toUpperCase()+'</button>').join('')+'</div>';
    let html=difficultyUI+
      '<div class="fg-grid-score"><span>FILLED <strong>'+used+'/9</strong></span><span>GUESSES LEFT <strong>'+left+'</strong></span><span'+(lives===1?' style="color:#ff5757;text-shadow:0 0 12px rgba(255,65,65,.35)"':'')+'>LIVES <strong>'+lives+'/3</strong></span></div>'+
      '<div class="fg-grid-note">'+(playType==='daily'?'One shared Grid for everyone today.':'Choose Easy, Medium, Hard, or Brutal. Each difficulty uses a different answer pool.')+'</div>'+
      '<div class="fg-grid-board"><div class="fg-grid-corner"></div>';
    gridCols.forEach(c=>html+='<div class="fg-grid-clue">'+criterionLabel(c)+'</div>');
    gridRows.forEach(function(r,ri){
      html+='<div class="fg-grid-clue">'+criterionLabel(r)+'</div>';
      gridCols.forEach(function(c,ci){
        const key=ri+'-'+ci,a=gridAnswers[key];
        html+='<div class="fg-grid-square '+(gridSelected===key?'selected ':'')+(a?'filled':'')+'" data-grid-key="'+key+'">'+
          (a?'<div class="fg-grid-player">'+photoHTML(a,'fg-player-photo')+'<span>'+esc(a.name)+'</span></div>':'<span class="fg-grid-plus">+</span>')+'</div>';
      });
    });
    html+='</div><div class="fg-inline-actions"><button id="fgGridSkip" type="button">'+(playType==='daily'?'GIVE UP':'NEW GRID')+'</button></div>';box.innerHTML=html;
    box.querySelectorAll('.fg-grid-square:not(.filled)').forEach(el=>el.onclick=function(){
      gridSelected=this.dataset.gridKey;renderGridGame();document.getElementById('fgInput').focus();suggest();
    });
    if(playType==='unlimited')box.querySelectorAll('[data-grid-difficulty]').forEach(b=>b.onclick=function(){
      if(fhqGridSwitchBusy)return;
      const next=this.dataset.gridDifficulty;
      if(!['easy','medium','hard','brutal'].includes(next)||next===gridDifficulty)return;
      fhqGridSwitchBusy=true;
      gridDifficulty=next;
      document.getElementById('fgMessage').textContent='Loading '+next.toUpperCase()+' grid…';
      const cacheKey=(playType==='daily'?dailyDateKey():'unlimited')+'|'+next;
      const runSwitch=function(){
        try{
          buildGrid(true);
          renderGridGame();
          saveDailyState();
        }catch(err){
          console.error('Grid difficulty switch failed',err);
          gridDifficulty='medium';
          buildGrid(true);
          renderGridGame();
          document.getElementById('fgMessage').textContent='That grid could not load, so Medium was restored.';
        }finally{
          setTimeout(function(){fhqGridSwitchBusy=false},60);
        }
      };
      if(fhqGridTemplateCache.has(cacheKey))runSwitch();
      else requestAnimationFrame(function(){setTimeout(runSwitch,0)});
    });
    const skip=document.getElementById('fgGridSkip');
    if(skip)skip.onclick=function(){
      if(playType==='daily'){finished=true;gameWon=false;saveDailyState();showResult();}
      else{buildGrid(true);renderGridGame();suggest();}
    };
    document.getElementById('fgPrompt').textContent=gridSelected?'Name someone who matches both clues.':'Choose a square, then name someone who matches both clues.';
    document.getElementById('fgMessage').textContent=finished?(gameWon?'🏈 GRID COMPLETE!':'No guesses left.'):(gridSelected?'Square selected — choose an answer.':'Pick any open square.');
    setTimeout(prewarmNFLGridDifficulties,25);
  }
  function triggerDamageFlash(){
    const el=document.getElementById('fgDamageFlash');if(!el)return;
    el.classList.remove('hit','good');void el.offsetWidth;el.classList.add('hit');
    setTimeout(()=>el.classList.remove('hit'),460);
  }
  function triggerGoodFlash(){
    const el=document.getElementById('fgDamageFlash');if(!el)return;
    el.classList.remove('hit','good');void el.offsetWidth;el.classList.add('good');
    setTimeout(()=>el.classList.remove('good'),460);
  }
  function showFeedback(correct,text){
    try{fhqTone(correct?'correct':'incorrect')}catch(e){}
    const el=document.getElementById('fgFeedbackPop');if(!el)return;
    el.textContent=text;el.className='fg-feedback-pop '+(correct?'correct':'wrong');
    void el.offsetWidth;el.classList.add('show');
    const hold=String(text||'').includes('CATEGORY:')?1450:820;
    setTimeout(()=>el.classList.remove('show'),hold);
  }

  function submitGrid(){
    if(finished)return;
    if(!gridSelected){document.getElementById('fgMessage').textContent='Choose a grid square first.';return;}
    const q=norm(document.getElementById('fgInput').value);
    const raw=gridCellPeople().find(x=>norm(x.name)===q) || gridGuessUniverse().find(x=>norm(x.name)===q);
    const p=raw?Object.assign({},raw,{careerTeams:fhqGridCareerTeams(raw),colleges:fhqGridColleges(raw)}):null;
    if(!p){document.getElementById('fgMessage').textContent='Choose a valid NFL player, legend, Hall of Famer, special teamer or coach from the list.';return;}
    const parts=gridSelected.split('-'),r=gridRows[Number(parts[0])],c=gridCols[Number(parts[1])];
    if(matchesCriterion(p,r)&&matchesCriterion(p,c)){
      gridAnswers[gridSelected]=p;gridSelected=null;document.getElementById('fgInput').value='';
      showFeedback(true,'CORRECT!');
      triggerGoodFlash();
      if(Object.keys(gridAnswers).length===9){finished=true;gameWon=true;setTimeout(showResult,450)}
    }else{
      gridMisses++;
      showFeedback(false,'WRONG!');
      triggerDamageFlash();
      document.getElementById('fgMessage').textContent='That answer does not match both clues.';
      const attempts=gridMisses+Object.keys(gridAnswers).length;
      if(gridMisses>=3||attempts>=12){finished=true;gameWon=false;setTimeout(showResult,450)}
    }
    saveDailyState();render();suggest();
  }

  function setupWhoAmI(){
    const broad=generatedFacePool().concat(LEGENDS.filter(p=>p.hof||p.rings>0),COACHES.filter(p=>p.hof||p.rings>0)).filter(p=>p.name&&p.team);
    const notableNames=new Set((Array.isArray(players)?players.slice(0,120):[]).map(r=>norm(r.player||r.name)));
    const notable=broad.filter(p=>p.retired||p.coach||notableNames.has(norm(p.name))||Number(p.rings)>0||p.hof);
    const source=playType==='daily'&&notable.length?notable:broad;
    const a=randomFrom(source,modeSeed(59));
    const limit=playType==='daily'?3:Math.max(1,Math.min(5,Number(whoHintLimit||3)));
    specialState={answer:a,revealed:limit,clueLimit:limit,guesses:0,maxGuesses:limit,history:[],done:false,won:false};
  }
  function whoClues(p){
    if(!p)return[];
    const clues=[];
    if(p.coach){
      clues.push('I am an NFL head coach.');
      if(p.conference)clues.push('My team is in the '+p.conference+'.');
      if(p.division)clues.push('My team is in the '+p.conference+' '+p.division+'.');
      if(Number(p.rings)>0)clues.push('I have won a Super Bowl as a head coach.');
      if(p.team)clues.push('I coach '+p.team+'.');
    }else{
      clues.push(p.retired?'I am a retired NFL player.':'I am an active NFL player.');
      if(p.conference)clues.push('My listed team is in the '+p.conference+'.');
      if(p.division)clues.push('My listed team is in the '+p.conference+' '+p.division+'.');
      if(p.position)clues.push('My primary position is '+p.position+'.');
      if(p.team)clues.push('My listed team is '+p.team+'.');
    }
    const last=(p.name.split(/\s+/).slice(-1)[0]||p.name);
    while(clues.length<5)clues.push('My last name starts with "'+last.charAt(0).toUpperCase()+'".');
    return clues.slice(0,5);
  }
  function renderWhoAmI(){
    const s=specialState,p=s.answer;
    const limit=Math.max(1,Math.min(5,Number(s.clueLimit||3)));
    s.revealed=limit;s.maxGuesses=limit;
    const clues=whoClues(p).slice(0,limit);
    let html='<div class="fg-game-panel"><div class="fg-game-title">WHO AM I?</div>'+
      '<div class="fg-game-sub">'+(playType==='daily'?'Today’s shared player uses three clues.':'You chose '+limit+' hint'+(limit===1?'':'s')+'.')+'</div>'+
      '<div class="fg-clue-budget-label">'+limit+' clue'+(limit===1?'':'s')+' • '+limit+' guess'+(limit===1?'':'es')+'</div>'+
      '<div class="fg-clue-list">'+clues.map((c,i)=>'<div class="fg-clue-item">CLUE '+(i+1)+' — '+esc(c)+'</div>').join('')+'</div>'+
      (s.history&&s.history.length?'<div class="fg-guess-history">'+s.history.map(h=>'<div class="fg-history-row '+(h.correct?'correct':'wrong')+'"><span>'+esc(h.name)+'</span><span>'+(h.correct?'CORRECT':'WRONG')+'</span></div>').join('')+'</div>':'')+
      (!s.done?'<div class="fg-inline-actions"><button id="fgCareerGiveUp" type="button">GIVE UP</button></div>':'')+
      '</div>';
    const give=document.getElementById('fgCareerGiveUp');if(give)give.onclick=function(){
      s.done=true;s.won=false;finished=true;gameWon=false;saveDailyState();showFeedback(false,'GAVE UP');renderCareer();setTimeout(showResult,350);
    };
    document.getElementById('fgSpecialGame').innerHTML=html;
    document.getElementById('fgPrompt').textContent='Who am I? Type the name below.';
    document.getElementById('fgMessage').textContent=s.done?(s.won?'🏈 Correct!':'Answer: '+p.name):('Guesses: '+s.guesses+'/'+s.maxGuesses);
  }
  function submitWhoAmI(){
    const s=specialState;if(s.done)return;
    const q=norm(document.getElementById('fgInput').value),p=gridGuessUniverse().find(x=>norm(x.name)===q);
    if(!p){document.getElementById('fgMessage').textContent='Choose a valid NFL name from the suggestions.';return;}
    s.guesses++;document.getElementById('fgInput').value='';
    const correct=norm(p.name)===norm(s.answer.name);
    s.history.push({name:p.name,correct:correct});
    if(correct){
      showFeedback(true,'CORRECT!');triggerGoodFlash();
      s.done=true;s.won=true;finished=true;gameWon=true;setTimeout(showResult,700);
    }else{
      showFeedback(false,'WRONG!');triggerDamageFlash();
      if(s.guesses>=s.maxGuesses){s.done=true;s.won=false;finished=true;gameWon=false;setTimeout(showResult,700);}
    }
    saveDailyState();renderSpecial();suggest();
  }


  let fhqCareerPathPoolCache=null,fhqCareerGuessPoolCache=null,fhqCareerByNameCache=null;

  function fhqBuildCareerIndexes(){
    if(fhqCareerPathPoolCache&&fhqCareerGuessPoolCache&&fhqCareerByNameCache)return;

    const paths=[],guessers=[],byName=new Map(),pathSeen=new Set(),guessSeen=new Set();

    function addGuesser(p){
      if(!p||!p.name)return;
      const key=norm(p.name);if(guessSeen.has(key))return;
      guessSeen.add(key);guessers.push(p);byName.set(key,p);
    }
    function addPath(name,teams){
      name=String(name||'').trim();
      teams=(teams||[]).map(x=>String(x||'').toUpperCase()).filter(Boolean);
      if(!name||teams.length<2)return;
      const key=norm(name);
      if(!pathSeen.has(key)){pathSeen.add(key);paths.push({name:name,teams:teams})}
    }

    (CAREER_PATHS||[]).forEach(x=>addPath(x.name,x.teams));

    fhqHistoricGridPeople().forEach(function(p){
      addGuesser(p);
      if((p.careerTeams||[]).length>=2)addPath(p.name,p.careerTeams);
    });

    (LEGENDS||[]).forEach(function(p){
      const enriched=Object.assign({},p,{careerTeams:fhqGridCareerTeams(p),colleges:fhqGridColleges(p)});
      addGuesser(enriched);
      if(enriched.careerTeams.length>=2)addPath(enriched.name,enriched.careerTeams);
    });

    activeNFLPlayers().forEach(function(p){
      const enriched=Object.assign({},p,{careerTeams:fhqGridCareerTeams(p),colleges:fhqGridColleges(p)});
      addGuesser(enriched);
      if(enriched.careerTeams.length>=2)addPath(enriched.name,enriched.careerTeams);
    });

    Object.keys(FHQ_GRID_HISTORY||{}).forEach(function(key){
      const h=FHQ_GRID_HISTORY[key]||{};
      if(!Array.isArray(h.teams)||h.teams.length<2)return;
      const existing=byName.get(key);
      const display=existing&&existing.name?existing.name:key.replace(/\b\w/g,c=>c.toUpperCase());
      addPath(display,h.teams);
      if(!existing)addGuesser({
        name:display,team:String(h.teams.slice(-1)[0]||''),position:String(h.position||''),
        college:(h.colleges&&h.colleges[0])||'',colleges:(h.colleges||[]).slice(),
        careerTeams:h.teams.slice(),draftYear:h.draftYear||'',draftRound:h.draftRound||''
      });
    });

    paths.forEach(function(x){
      if(!guessSeen.has(norm(x.name)))addGuesser({name:x.name,team:'',position:'',careerTeams:x.teams.slice()});
    });

    fhqCareerPathPoolCache=paths;
    fhqCareerGuessPoolCache=guessers;
    fhqCareerByNameCache=byName;
  }

  function careerPathPlayablePool(){
    fhqBuildCareerIndexes();
    return fhqCareerPathPoolCache||[];
  }
  function careerGuessUniverse(){
    fhqBuildCareerIndexes();
    return fhqCareerGuessPoolCache||[];
  }
  function careerPathForName(name){
    fhqBuildCareerIndexes();
    const key=norm(name);
    const explicit=(fhqCareerPathPoolCache||[]).find(x=>norm(x.name)===key);
    if(explicit)return explicit.teams.slice();
    const person=fhqCareerByNameCache&&fhqCareerByNameCache.get(key);
    return person?fhqGridCareerTeams(person):[];
  }

  function setupCareer(){
    const all=careerPathPlayablePool();
    const famous=new Set([].concat(
      (Array.isArray(players)?players.slice(0,140).map(r=>norm(r.player||r.name)):[]),
      (LEGENDS||[]).filter(p=>p.hof||Number(p.rings)>0).map(p=>norm(p.name)),
      ['patrick mahomes','josh allen','aaron rodgers','russell wilson','tom brady','peyton manning','brett favre','randy moss','terrell owens','frank gore','ryan fitzpatrick']
    ));
    const notable=all.filter(x=>famous.has(norm(x.name)));
    const src=playType==='daily'&&notable.length?notable:all;
    const a=randomFrom(src,modeSeed(71));
    specialState={answer:a,guesses:0,maxGuesses:3,history:[],hints:[],done:false,won:false,acceptedAnswer:''};
  }
  function careerHintFor(answer,missNumber){
    const name=String(answer&&answer.name||'');
    const key=norm(name);
    const person=careerGuessUniverse().find(x=>norm(x.name)===key)||null;
    const hist=fhqGridHistoryFor(name)||{};
    const hplayer=FHQ_GRID_HISTORIC_PLAYERS.find(x=>norm(x.name)===key)||null;
    const position=String((person&&person.position)||(hist&&hist.position)||(hplayer&&hplayer.position)||'').toUpperCase();
    const draftYear=Number((person&&person.draftYear)||(hist&&hist.draftYear)||(hplayer&&hplayer.draftYear))||null;
    const college=String((fhqGridColleges(person||{name:name})[0])||(hplayer&&hplayer.college)||'').trim();
    const group=position?personGroup({position:position}):'Other';
    const candidates=[];

    // Only facts supported by actual stored metadata. No guessed "offense/defense" fallback.
    if(draftYear)candidates.push('Entered the NFL in '+draftYear+'.');
    if(college)candidates.push('Played college football at '+college+'.');
    if(position)candidates.push('Primary NFL position: '+position+'.');
    if(group&&group!=='Other')candidates.push('Played on '+group.toLowerCase()+'.');
    if((person&&person.hof)||(hplayer&&hplayer.hof))candidates.push('This player is a Pro Football Hall of Famer.');
    if(Number(person&&person.rings)>0||Number(hplayer&&hplayer.rings)>0)candidates.push('Won at least one Super Bowl.');
    if(person&&person.conference)candidates.push('Most recent listed team is in the '+person.conference+'.');

    // Guaranteed-true identity clues are better than inventing football metadata.
    const parts=name.split(/\s+/).filter(Boolean),last=parts[parts.length-1]||name,first=parts[0]||name;
    candidates.push('Last name starts with "'+last.charAt(0).toUpperCase()+'".');
    candidates.push('First name starts with "'+first.charAt(0).toUpperCase()+'".');
    candidates.push('Last name has '+last.replace(/[^A-Za-z]/g,'').length+' letters.');

    const unique=Array.from(new Set(candidates));
    const used=(specialState&&Array.isArray(specialState.hints)?specialState.hints:[]);
    const unused=unique.filter(x=>!used.includes(x));
    const list=unused.length?unused:unique;
    return list[Math.max(0,(Number(missNumber)||1)-1)%Math.max(1,list.length)] || 'Use the team path and the player-name clues together.';
  }
  function renderCareer(){
    const s=specialState,a=s.answer;
    const path=(a.teams||[]).map((t,i)=>'<div class="fg-career-team">'+logoHTML(t)+'<span>'+esc(t)+'</span></div>'+
      (i<a.teams.length-1?'<span class="fg-path-arrow">→</span>':'')).join('');
    document.getElementById('fgSpecialGame').innerHTML='<div class="fg-game-panel"><div class="fg-game-title">CAREER PATH</div>'+
      '<div class="fg-game-sub">Which NFL player had this team path?</div>'+
      '<div class="fg-score-strip"><span class="fg-career-lives">GUESSES LEFT '+Math.max(0,s.maxGuesses-s.guesses)+'/3</span></div>'+
      '<div class="fg-career-path">'+path+'</div>'+
      (s.hints&&s.hints.length?'<div class="fg-career-hints">'+s.hints.map((h,i)=>'<div class="fg-career-hint">HINT '+(i+1)+' • '+esc(h)+'</div>').join('')+'</div>':'')+
      (s.history&&s.history.length?'<div class="fg-guess-history">'+s.history.map(h=>'<div class="fg-history-row '+(h.correct?'correct':'wrong')+'"><span>'+esc(h.name)+'</span><span>'+(h.correct?'CORRECT':'WRONG')+'</span></div>').join('')+'</div>':'')+
      '</div>';
    document.getElementById('fgPrompt').textContent='Guess the player from the team logos.';
    const validAnswers=careerPathPlayablePool().filter(x=>(x.teams||[]).length===(a.teams||[]).length&&(x.teams||[]).every((team,i)=>team===(a.teams||[])[i])).map(x=>x.name);
    document.getElementById('fgMessage').textContent=s.done?(s.won?'🏈 Correct!'+(s.acceptedAnswer?' '+s.acceptedAnswer+' fits this path.':''):('Valid answer'+(validAnswers.length===1?'':'s')+': '+validAnswers.join(', '))):('Guesses: '+s.guesses+'/'+s.maxGuesses);
  }
  function submitCareer(){
    const s=specialState;if(s.done)return;
    const q=norm(document.getElementById('fgInput').value);
    const guessed=careerGuessUniverse().find(x=>norm(x.name)===q);
    if(!guessed){document.getElementById('fgMessage').textContent='Choose a valid NFL player from the suggestions.';return;}
    s.guesses++;document.getElementById('fgInput').value='';
    const answerPath=(s.answer.teams||[]).map(String);
    const guessedPath=careerPathForName(guessed.name).map(String);
    const correct=guessedPath.length>0&&answerPath.length===guessedPath.length&&answerPath.every((team,i)=>team===guessedPath[i]);
    s.history=s.history||[];s.history.push({name:guessed.name,correct});
    if(correct){
      showFeedback(true,'CORRECT!');triggerGoodFlash();
      s.done=true;s.won=true;s.acceptedAnswer=guessed.name;finished=true;gameWon=true;saveDailyState();setTimeout(showResult,650);
    }else{
      showFeedback(false,'WRONG!');triggerDamageFlash();
      if(s.guesses>=s.maxGuesses){
        s.done=true;s.won=false;finished=true;gameWon=false;saveDailyState();setTimeout(showResult,650);
      }else{
        s.hints=s.hints||[];
        s.hints.push(careerHintFor(s.answer,s.guesses));
        saveDailyState();
      }
    }
    renderSpecial();suggest();
  }

  function hlEligible(){
    const ranked=(typeof players!=='undefined'&&Array.isArray(players)?players:[]);
    const rankMap=new Map(ranked.map((p,i)=>[norm(p.player||p.name),i+1]));
    const pool=generatedFacePool().filter(p=>p&&p.active&&!p.retired&&!p.coach&&Number.isFinite(p.age)&&p.age>19&&Number.isFinite(p.yearsExp));
    return pool.filter(function(p){
      const r=rankMap.get(norm(p.name))||9999;
      return p.depthOrder===1 || r<=65 || (p.depthOrder===2 && r<=95);
    });
  }
  function statFor(p,key){
    const s=ALL_STATS_2025[norm(p.name)]||{};
    const n=v=>Number.isFinite(Number(v))?Number(v):null;
    if(key==='age')return n(p.age);
    if(key==='experience')return n(p.yearsExp);
    if(key==='recYds')return n(s.recYds);
    if(key==='rushYds')return n(s.rushYds);
    if(key==='receptions')return n(s.receptions);
    if(key==='totalTD'){
      const vals=[n(s.passTD)||0,n(s.rushTD)||0,n(s.recTD)||0];
      return vals.reduce((a,b)=>a+b,0);
    }
    if(key==='fantasy'){
      const passYds=n(s.passYds)||0,passTD=n(s.passTD)||0,ints=n(firstStatValue(s,['interceptions','interceptionsThrown','passingInterceptions','passInterceptions','passINT','passInts','ints','int']))||0;
      const rushYds=n(s.rushYds)||0,rushTD=n(s.rushTD)||0,rec=n(s.receptions)||0,recYds=n(s.recYds)||0,recTD=n(s.recTD)||0;
      return +(passYds*.04+passTD*4-ints*2+rushYds*.1+rushTD*6+rec+recYds*.1+recTD*6).toFixed(1);
    }
    if(key==='jersey')return n(p.jerseyNumber);
    if(key==='tackles')return n(firstStatValue(s,['tackles','totalTackles','defensiveTackles','tacklesTotal']));
    if(key==='sacks')return n(firstStatValue(s,['sacks','defensiveSacks','sack']));
    if(key==='defInts')return n(firstStatValue(s,['defensiveInterceptions','interceptions','defInts','ints']));
    if(key==='passesDefended')return n(firstStatValue(s,['passesDefended','passDeflections','passesDefensed','pd']));
    if(key==='forcedFumbles')return n(firstStatValue(s,['forcedFumbles','fumblesForced','ff']));
    return null;
  }
  function hlOffenseEligible(){
    return hlEligible().filter(p=>['QB','RB','WR','TE'].includes(p.position));
  }
  function hlDefenseEligible(){
    return generatedFacePool().filter(p=>p.active&&['CB','DB','S','FS','SS','LB','ILB','OLB','DE','DT','DL','NT','EDGE'].includes(p.position)&&(p.depthOrder===1||p.depthOrder===2));
  }
  function hlMetrics(){
    const common=[
      {key:'age',label:'Who is OLDER?',noun:'years old'},
      {key:'experience',label:'Who has MORE NFL EXPERIENCE?',noun:'years experience'},
      {key:'jersey',label:'Who wears the HIGHER JERSEY NUMBER?',noun:'jersey number'}
    ];
    if(hlSide==='defense')return common.concat([
      {key:'tackles',label:'Who had MORE TACKLES in 2025?',noun:'tackles'},
      {key:'sacks',label:'Who had MORE SACKS in 2025?',noun:'sacks'},
      {key:'defInts',label:'Who had MORE INTERCEPTIONS in 2025?',noun:'interceptions'},
      {key:'passesDefended',label:'Who had MORE PASSES DEFENDED in 2025?',noun:'passes defended'},
      {key:'forcedFumbles',label:'Who forced MORE FUMBLES in 2025?',noun:'forced fumbles'}
    ]);
    return common.concat([
      {key:'recYds',label:'Who had MORE RECEIVING YARDS in 2025?',noun:'receiving yards',positions:['WR','TE','RB']},
      {key:'rushYds',label:'Who had MORE RUSHING YARDS in 2025?',noun:'rushing yards',positions:['RB','QB']},
      {key:'receptions',label:'Who had MORE RECEPTIONS in 2025?',noun:'receptions',positions:['WR','TE','RB']},
      {key:'totalTD',label:'Who scored MORE TOTAL TOUCHDOWNS in 2025?',noun:'total TDs'},
      {key:'fantasy',label:'Who scored MORE PPR FANTASY POINTS in 2025?',noun:'PPR fantasy points',positions:['QB','RB','WR','TE']}
    ]);
  }
  function higherLowerBestKey(){return 'footballHQHigherLowerBestV1'}
  function getHigherLowerBest(){try{return Number(localStorage.getItem(higherLowerBestKey())||0)||0}catch(e){return 0}}
  function setHigherLowerBest(v){try{localStorage.setItem(higherLowerBestKey(),String(Math.max(getHigherLowerBest(),Number(v)||0)))}catch(e){}}

  function setupHigherLower(){
    specialState={score:0,streak:0,bestStreak:getHigherLowerBest(),round:1,maxRounds:null,done:false,won:false,metric:'age',metricDef:null,a:null,b:null};
    nextHigherLowerRound();
  }
  function nextHigherLowerRound(){
    const s=specialState,src=(hlSide==='defense'?hlDefenseEligible():hlOffenseEligible());if(src.length<2)return;
    const metrics=hlMetrics();
    let metric=randomFrom(metrics,modeSeed(83)+s.round*101);
    // If stats are not loaded yet, age/experience are always safe.
    if(!statsLoaded&&![ 'age','experience' ].includes(metric.key))metric=metrics[s.round%2];
    let candidates=src.filter(p=>(!metric.positions||metric.positions.includes(p.position))&&statFor(p,metric.key)!==null);
    if(candidates.length<8){metric=metrics[s.round%2];candidates=src.filter(p=>statFor(p,metric.key)!==null);}
    let a=randomFrom(candidates,modeSeed(89)+s.round*131);
    let b=randomFrom(candidates,modeSeed(97)+s.round*149);
    let guard=0;while(b&&a&&(norm(b.name)===norm(a.name)||statFor(a,metric.key)===statFor(b,metric.key))&&guard++<40){
      b=candidates[playType==='daily'?seededIndex(modeSeed(107)+s.round*173+guard,candidates.length):Math.floor(Math.random()*candidates.length)];
    }
    s.metric=metric.key;s.metricDef=metric;s.a=a;s.b=b;
  }
  function hlValue(p,metric){return statFor(p,metric)}
  function renderHigherLower(){
    const s=specialState;
    if(!s.a||!s.b){
      document.getElementById('fgSpecialGame').innerHTML='<div class="fg-loading">Loading NFL stats…</div>';return;
    }
    const wording=(s.metricDef&&s.metricDef.label)||'Which player is higher?';
    const sideLabel=hlSide==='defense'?'DEFENSE':'OFFENSE';

    document.getElementById('fgSpecialGame').innerHTML=
      '<div class="fg-game-panel fg-hl-panel">'+
        '<div class="fg-game-title">HIGHER / LOWER</div>'+
        '<div class="fg-subtoggle"><button type="button" data-hl-side="offense" class="'+(hlSide==='offense'?'active':'')+'">OFFENSE</button><button type="button" data-hl-side="defense" class="'+(hlSide==='defense'?'active':'')+'">DEFENSE</button></div>'+
        '<div class="fg-score-strip"><span>ROUND '+s.round+'</span><span>🔥 '+s.streak+'</span><span>🏆 HIGH '+Math.max(getHigherLowerBest(),Number(s.bestStreak||0))+'</span></div>'+
        '<div class="fg-hl-question">'+esc(wording)+' <span class="fg-hl-direction">'+sideLabel+'</span></div>'+
        '<div class="fg-versus">'+
          '<button class="fg-vs-card" data-hl="a">'+photoHTML(s.a,'fg-player-photo')+'<div class="fg-vs-name">'+esc(s.a.name)+'</div><div class="fg-vs-meta">'+logoHTML(s.a.team)+' '+esc(s.a.team)+' • '+esc(s.a.position)+'</div></button>'+
          '<div class="fg-vs-divider">VS</div>'+
          '<button class="fg-vs-card" data-hl="b">'+photoHTML(s.b,'fg-player-photo')+'<div class="fg-vs-name">'+esc(s.b.name)+'</div><div class="fg-vs-meta">'+logoHTML(s.b.team)+' '+esc(s.b.team)+' • '+esc(s.b.position)+'</div></button>'+
        '</div>'+
      '</div>';

    document.querySelectorAll('[data-hl]').forEach(b=>b.onclick=function(){chooseHigherLower(this.dataset.hl)});
    document.querySelectorAll('[data-hl-side]').forEach(b=>b.onclick=function(){
      hlSide=this.dataset.hlSide;setupHigherLower();renderHigherLower();
    });
    document.getElementById('fgPrompt').textContent='Choose one player.';
    document.getElementById('fgMessage').textContent=s.done?'Final streak: '+Math.max(Number(s.bestStreak||0),Number(s.streak||0)):'Tap the player you think has the higher value.';
  }

  function chooseHigherLower(which){
    const s=specialState;if(s.done||!s.a||!s.b)return;
    const av=hlValue(s.a,s.metric),bv=hlValue(s.b,s.metric);
    const correctSide=av===bv?'tie':av>bv?'a':'b';
    const correct=(correctSide==='tie'||which===correctSide);
    const noun=(s.metricDef&&s.metricDef.noun)||s.metric;

    if(correct){
      s.score++;s.streak++;s.bestStreak=Math.max(s.bestStreak,s.streak);setHigherLowerBest(s.bestStreak);
      showFeedback(true,s.streak>=2?'CORRECT! 🔥 '+s.streak:'CORRECT!');
      triggerGoodFlash();
      document.getElementById('fgMessage').textContent=s.a.name+' '+av+' vs '+s.b.name+' '+bv+' '+noun+'.';
      s.round++;nextHigherLowerRound();saveDailyState();
      setTimeout(renderSpecial,760);
      return;
    }

    showFeedback(false,'WRONG!');
    triggerDamageFlash();
    s.done=true;s.won=false;finished=true;gameWon=false;
    s.lastComparison={a:s.a.name,av,b:s.b.name,bv,noun};
    saveDailyState();
    document.getElementById('fgMessage').textContent=s.a.name+' '+av+' vs '+s.b.name+' '+bv+' '+noun+'.';
    setTimeout(showResult,850);
  }

  function setupImposter(){
    const saved=fhqGameStats().imposter||{};
    specialState={round:1,score:0,streak:0,bestStreak:Number(saved.maxStreak)||0,maxRounds:null,done:false,won:false,items:[],reason:'',oddIndex:-1};
    nextImposterRound();
  }
  function nextImposterRound(){
    const s=specialState,all=generatedFacePool();
    const ranked=new Set((Array.isArray(players)?players:[]).slice(0,140).map(p=>norm(p.player||p.name)));
    const src=imposterDifficulty==='easy'
      ?all.filter(p=>ranked.has(norm(p.name))||p.depthOrder===1)
      :imposterDifficulty==='medium'
        ?all.filter(p=>ranked.has(norm(p.name))||Number(p.depthOrder)<=2)
        :all.filter(function(p){
          const r=ranked.has(norm(p.name));
          return !r||Number(p.depthOrder)>=2||['CB','S','LB','DE','DT','EDGE'].includes(String(p.position||'').toUpperCase());
        });
    const relations=[];

    function addRelation(label,getter,minGroup){
      const map={};
      src.forEach(function(p){
        const key=getter(p);
        if(!key)return;
        (map[key]||(map[key]=[])).push(p);
      });
      Object.keys(map).forEach(function(key){
        if(map[key].length>=Math.max(3,minGroup||3)&&src.length-map[key].length>=1){
          relations.push({label:label,key:key,group:map[key],getter:getter});
        }
      });
    }

    if(imposterDifficulty==='easy'){
      addRelation('team',p=>p.team||'',3);
      addRelation('position',p=>p.position||'',3);
      addRelation('conference',p=>p.conference||'',4);
    }else if(imposterDifficulty==='medium'){
      addRelation('team',p=>p.team||'',3);
      addRelation('position',p=>p.position||'',3);
      addRelation('conference',p=>p.conference||'',4);
      addRelation('division',p=>p.conference&&p.division?(p.conference+' '+p.division):'',3);
      addRelation('college',p=>p.college&&String(p.college).trim(),3);
    }else{
      addRelation('college',p=>p.college&&String(p.college).trim(),3);
      addRelation('division',p=>p.conference&&p.division?(p.conference+' '+p.division):'',3);
      addRelation('draft round',p=>p.draftRound&&p.draftRound!=='0'?'Round '+p.draftRound:'',3);
      addRelation('conference',p=>p.conference||'',4);
    }

    const rel=randomFrom(relations,modeSeed(107)+s.round*19+['easy','medium','brutal'].indexOf(imposterDifficulty)*727);
    if(!rel){
      const fallback=src.filter(p=>p.conference==='NFC').slice(0,3);
      const imp=src.find(p=>p.conference==='AFC');
      s.items=dailyShuffle(fallback.concat(imp?[imp]:[]),modeSeed(137)+s.round*41);
      s.oddIndex=s.items.findIndex(x=>x&&x.conference==='AFC');
      s.reason='Three are NFC players. One is AFC.';
      s.relationLabel='conference';
      return;
    }

    const common=dailyShuffle(rel.group,modeSeed(127)+s.round*31).slice(0,3);
    const oddPool=src.filter(p=>rel.getter(p)!==rel.key);
    const imp=randomFrom(oddPool,modeSeed(113)+s.round*23);
    const items=dailyShuffle(common.concat([imp]),modeSeed(131)+s.round*37);
    s.items=items;
    s.oddIndex=items.findIndex(x=>norm(x.name)===norm(imp.name));
    s.reason='Three share '+rel.label+': '+rel.key+'. One does not.';
    s.relationLabel=rel.label;
  }
  function renderImposter(){
    const s=specialState;
    if(!s.items.length){document.getElementById('fgSpecialGame').innerHTML='<div class="fg-loading">Loading the full NFL player database…</div>';return;}
    document.getElementById('fgSpecialGame').innerHTML='<div class="fg-game-panel"><div class="fg-game-title">IMPOSTER</div>'+
      '<div class="fg-imposter-diff-note">'+(playType==='daily'?'One shared group of four for everyone today.':(imposterDifficulty==='easy'?'Easy • team, position and familiar-player relationships.':imposterDifficulty==='medium'?'Medium • college, division and broader relationships.':'Brutal • draft, college and deep-football relationships.'))+'</div>'+
      '<div class="fg-game-sub">Three belong together. Who DOESN’T belong?</div><div class="fg-score-strip"><span>ROUND '+s.round+'</span><span>🔥 STREAK '+s.streak+'</span><span>🏆 HIGH '+Math.max(Number(s.bestStreak||0),Number((fhqGameStats().imposter||{}).maxStreak||0))+'</span></div>'+
      '<div class="fg-imposter-lock-note">Changing difficulty affects the next group — these four stay locked.</div>'+
      '<div class="fg-imposter-grid">'+s.items.map((p,i)=>'<button class="fg-imposter-card" data-imp="'+i+'">'+photoHTML(p,'fg-player-photo')+
      '<span>'+esc(p.name)+'<small style="display:block;color:#9da7b0;margin-top:4px">'+esc(p.position)+' • '+esc(p.team)+'</small></span></button>').join('')+'</div>'+
      '<div class="fg-inline-actions"><button id="fgImposterGiveUp" type="button">GIVE UP</button></div></div>';
    document.querySelectorAll('[data-imp]').forEach(b=>b.onclick=function(){chooseImposter(Number(this.dataset.imp))});
    const impGive=document.getElementById('fgImposterGiveUp');
    if(impGive)impGive.onclick=function(){
      if(s.done)return;
      s.done=true;s.won=false;finished=true;gameWon=false;
      const actual=s.items&&s.items[s.oddIndex]?s.items[s.oddIndex]:null;
      s.correctAnswerName=actual&&actual.name?actual.name:'the imposter';
      let categoryText=(s.reason||'').replace(/^Three share /,'').replace(/\. One does not\.$/,'');
      s.categoryText=categoryText||'Football connection';
      saveDailyState();showResult();
    };
    document.getElementById('fgPrompt').textContent='Tap the NFL imposter.';
    document.getElementById('fgMessage').textContent='Find the one that does not fit.';
  }
  function chooseImposter(i){
    const s=specialState;if(s.done)return;
    const correct=i===s.oddIndex;
    const actual=s.items&&s.items[s.oddIndex]?s.items[s.oddIndex]:null;
    let categoryText=(s.reason||'').replace(/^Three share /,'').replace(/\. One does not\.$/,'');
    categoryText=categoryText
      .replace(/^college:\s*/i,'College: ')
      .replace(/^team:\s*/i,'Team: ')
      .replace(/^position:\s*/i,'Position: ')
      .replace(/^conference:\s*/i,'Conference: ')
      .replace(/^division:\s*/i,'Division: ')
      .replace(/^draft round:\s*/i,'Draft Round: ');
    s.categoryText=categoryText||'Football connection';
    s.correctAnswerName=actual&&actual.name?actual.name:'the imposter';

    if(correct){
      s.score++;s.streak++;s.bestStreak=Math.max(s.bestStreak,s.streak);
      showFeedback(true,s.streak>=2?'CORRECT! 🔥 '+s.streak:'CORRECT!');
      triggerGoodFlash();
      if(playType==='daily'){
        s.done=true;s.won=true;finished=true;gameWon=true;saveDailyState();setTimeout(showResult,750);return;
      }
      s.round++;nextImposterRound();saveDailyState();
      setTimeout(renderSpecial,850);
      return;
    }

    showFeedback(false,'INCORRECT\n'+s.correctAnswerName.toUpperCase()+' WAS THE IMPOSTER');
    triggerDamageFlash();
    s.done=true;s.won=false;finished=true;gameWon=false;
    saveDailyState();
    setTimeout(showResult,1500);
  }


  const CONNECTION_BOARDS = [
    [
      {level:'yellow',label:'SUPER BOWL MVP WINNERS',members:['Tom Brady','Patrick Mahomes','Peyton Manning','Cooper Kupp']},
      {level:'green',label:'OHIO STATE WIDE RECEIVERS',members:['Garrett Wilson','Chris Olave','Marvin Harrison Jr.','Jaxon Smith-Njigba']},
      {level:'violet',label:'NFL STARS WITH NFL BROTHERS',members:['Travis Kelce','J.J. Watt','Nick Bosa','Amon-Ra St. Brown']},
      {level:'crimson',label:'HEISMAN WINNERS DRAFTED NO. 1',members:['Cam Newton','Baker Mayfield','Joe Burrow','Caleb Williams']}
    ],
    [
      {level:'yellow',label:'2000s / 2010s HALL OF FAME-TIER QBS',members:['Tom Brady','Peyton Manning','Drew Brees','Aaron Rodgers']},
      {level:'green',label:'ALABAMA RUNNING BACKS',members:['Derrick Henry','Josh Jacobs','Najee Harris','Jahmyr Gibbs']},
      {level:'violet',label:'PLAYED FOR THE RAIDERS',members:['Davante Adams','Khalil Mack','Amari Cooper','Marshawn Lynch']},
      {level:'crimson',label:'FAMOUS NFL LEGACIES / SONS',members:['Marvin Harrison Jr.','Patrick Surtain II','Antoine Winfield Jr.','Christian McCaffrey']}
    ]
  ];

  function setupConnections(){
    const board=CONNECTION_BOARDS[playType==='daily'?seededIndex(modeSeed(151),CONNECTION_BOARDS.length):Math.floor(Math.random()*CONNECTION_BOARDS.length)];
    const cards=[];
    board.forEach((g,gi)=>g.members.forEach(name=>cards.push({name,gi,level:g.level,label:g.label})));
    const ordered=dailyShuffle(cards,modeSeed(157));
    specialState={board,items:ordered,selected:[],solved:[],lives:4,done:false,won:false,streak:0};
  }
  function renderConnections(){
    const s=specialState;
    const solvedHTML=s.solved.map(g=>'<div class="fg-conn-group '+g.level+'">'+esc(g.label)+'<small>'+g.members.map(esc).join(' • ')+'</small></div>').join('');
    const revealHTML=s.done&&!s.won
      ?'<div class="fg-conn-reveal-title">REMAINING CONNECTIONS</div>'+s.board.filter(g=>!s.solved.some(x=>x.label===g.label)).map(g=>'<div class="fg-conn-group '+g.level+' revealed">'+esc(g.label)+'<small>'+g.members.map(esc).join(' • ')+'</small></div>').join('')
      :'';
    const cards=s.items.filter(x=>!s.solved.some(g=>g.label===x.label)).map((x,i)=>{
      const key=norm(x.name),sel=s.selected.includes(key);
      return '<button class="fg-conn-card'+(sel?' selected':'')+'" data-conn="'+esc(x.name)+'">'+esc(x.name)+'</button>';
    }).join('');
    document.getElementById('fgSpecialGame').innerHTML='<div class="fg-game-panel"><div class="fg-game-title">CONNECTIONS</div>'+
      '<div class="fg-game-sub">Find four groups of four. Yellow = easy • Green = medium • Violet = hard • Crimson = brutal.</div>'+
      '<div class="fg-life-row">MISTAKES REMAINING: <strong>'+s.lives+'</strong></div>'+
      '<div class="fg-conn-solved">'+solvedHTML+revealHTML+'</div>'+
      '<div class="fg-connections-grid">'+cards+'</div>'+
      '<div class="fg-inline-actions"><button id="fgConnSubmit" type="button">SUBMIT</button><button id="fgConnClear" type="button">CLEAR</button><button id="fgConnSkip" type="button">'+(playType==='daily'?'GIVE UP':'NEW CONNECTIONS')+'</button></div></div>';
    document.querySelectorAll('[data-conn]').forEach(b=>b.onclick=function(){
      const k=norm(this.dataset.conn);
      if(s.selected.includes(k))s.selected=s.selected.filter(x=>x!==k);
      else if(s.selected.length<4)s.selected.push(k);
      renderConnections();
    });
    const submit=document.getElementById('fgConnSubmit');if(submit)submit.onclick=submitConnections;
    const clear=document.getElementById('fgConnClear');if(clear)clear.onclick=function(){s.selected=[];renderConnections()};
    const skip=document.getElementById('fgConnSkip');if(skip)skip.onclick=function(){
      if(playType==='daily'){s.done=true;s.won=false;finished=true;gameWon=false;saveDailyState();renderConnections();showResult();}
      else{setupConnections();renderConnections();}
    };
    document.getElementById('fgPrompt').textContent='Find the four NFL connections.';
    document.getElementById('fgMessage').textContent=s.done?(s.won?'All four groups solved!':'No mistakes remaining.'):'Select exactly four cards.';
  }
  function submitConnections(){
    const s=specialState;if(s.done||s.selected.length!==4)return;
    const names=s.selected;
    const group=s.board.find(g=>g.members.every(n=>names.includes(norm(n))));
    if(group){
      s.solved.push(group);s.selected=[];showFeedback(true,'CONNECTION FOUND!');triggerGoodFlash();
      if(s.solved.length===4){
        s.done=true;s.won=true;finished=true;gameWon=true;s.streak=4;saveDailyState();renderConnections();setTimeout(showResult,900);
      }else{saveDailyState();renderConnections();}
      return;
    }
    const oneAway=s.board.some(function(g){
      if(s.solved.some(x=>x.label===g.label))return false;
      return g.members.filter(n=>names.includes(norm(n))).length===3;
    });
    s.lives--;s.selected=[];
    showFeedback(false,oneAway?'YOU ARE ONE AWAY':'NOT A GROUP');
    const msg=document.getElementById('fgMessage');
    if(msg&&oneAway){msg.textContent='You are one away.';msg.classList.add('fg-conn-one-away')}
    triggerDamageFlash();
    if(s.lives<=0){
      s.done=true;s.won=false;finished=true;gameWon=false;saveDailyState();renderConnections();setTimeout(showResult,900);
    }else{saveDailyState();renderConnections();}
  }


  function statLineEligible(){
    // Broader than V61: include meaningful contributors, not only fantasy stars.
    return hlEligible().filter(function(p){
      const s=ALL_STATS_2025[norm(p.name)]||{};
      if(p.position==='QB')return Number(s.passYds)>650 || (Number(s.passTD)||0)>=5;
      if(p.position==='RB')return ((Number(s.rushYds)||0)+(Number(s.recYds)||0))>225 || (Number(s.rushTD)||0)+(Number(s.recTD)||0)>=3;
      if(['WR','TE'].includes(p.position))return (Number(s.recYds)||0)>225 || (Number(s.receptions)||0)>=20;
      return false;
    });
  }
  function statLineFor(p){
    const s=ALL_STATS_2025[norm(p.name)]||{};
    if(p.position==='QB')return [
      ['PASS YDS',s.passYds],['PASS TD',s.passTD],['RUSH YDS',s.rushYds||0],['RUSH TD',s.rushTD||0]
    ];
    if(p.position==='RB')return [
      ['RUSH YDS',s.rushYds||0],['RUSH TD',s.rushTD||0],['REC',s.receptions||0],['REC YDS',s.recYds||0]
    ];
    return [['REC',s.receptions||0],['REC YDS',s.recYds||0],['REC TD',s.recTD||0],['RUSH YDS',s.rushYds||0]];
  }
  function nextStatLine(){
    const all=statLineEligible();if(!all.length)return;
    const notable=all.filter(p=>statLineFameRank(p)<=130);
    let src=all;
    if(playType==='daily')src=notable.length?notable:all;
    else if(statDifficulty==='easy')src=all.filter(p=>statLineFameRank(p)<=55);
    else if(statDifficulty==='medium')src=all.filter(p=>statLineFameRank(p)<=160);
    else src=all.filter(p=>statLineFameRank(p)>95||Number(p.depthOrder)>=2);
    if(!src.length)src=all;
    let p=randomFrom(src,modeSeed(173)+(specialState.round||1)*61);
    let guard=0;while(specialState.answer&&p&&norm(p.name)===norm(specialState.answer.name)&&guard++<20){
      p=src[playType==='daily'?seededIndex(modeSeed(179)+guard*23,src.length):Math.floor(Math.random()*src.length)];
    }
    specialState.answer=p;
  }
  let fhqStatLineTimerInterval=null;
  function stopStatLineTimer(){
    if(fhqStatLineTimerInterval){clearInterval(fhqStatLineTimerInterval);fhqStatLineTimerInterval=null}
  }
  function statLineLiveSeconds(){
    if(!specialState||!specialState.started||!specialState.startedAt)return 0;
    return Math.max(0,Math.floor((Date.now()-Number(specialState.startedAt))/1000));
  }
  function startStatLineRound(){
    const s=specialState;if(!s||s.started)return;
    s.started=true;s.startedAt=Date.now();s.elapsedSeconds=null;
    renderStatLine();suggest();
    stopStatLineTimer();
    fhqStatLineTimerInterval=setInterval(function(){
      const el=document.getElementById('fgStatTimer');
      if(el)el.textContent=statLineLiveSeconds()+'s';
      else stopStatLineTimer();
    },250);
  }

  function setupStatLine(){
    stopStatLineTimer();
    specialState={round:1,lives:3,misses:0,streak:0,bestStreak:0,done:false,won:false,answer:null,history:[],started:false,startedAt:null,elapsedSeconds:null};
    nextStatLine();
  }
  function statLineFameRank(p){
    if(!Array.isArray(players))return 9999;
    const i=players.findIndex(r=>norm(r.player||r.name)===norm(p&&p.name));
    return i<0?9999:i+1;
  }
  function statLineFeaturedTeammate(p){
    const team=String(p&&p.team||'');
    const pool=activeNFLPlayers().filter(x=>x&&x.team===team&&norm(x.name)!==norm(p.name));
    const rankMap=new Map((Array.isArray(players)?players:[]).map((r,i)=>[norm(r.player||r.name),i+1]));
    pool.sort((a,b)=>(rankMap.get(norm(a.name))||9999)-(rankMap.get(norm(b.name))||9999));
    return pool[0]||null;
  }
  function statLineHintCandidates(p){
    const mate=statLineFeaturedTeammate(p),colleges=fhqGridColleges(p),out=[];
    if(p.conference)out.push('CONFERENCE: '+p.conference);
    if(p.division)out.push('DIVISION: '+p.conference+' '+p.division);
    if(colleges.length)out.push('COLLEGE: '+colleges[0]);
    if(p.position)out.push('POSITION GROUP: '+personGroup(p).toUpperCase());
    if(Number(p.age)>0)out.push('AGE: '+p.age);
    if(p.team)out.push('TEAM: '+p.team);
    if(p.position)out.push('POSITION: '+p.position);
    if(mate)out.push('TEAMMATE: '+mate.name);
    if(p.jerseyNumber)out.push('JERSEY: #'+p.jerseyNumber);
    return Array.from(new Set(out));
  }
  function statLineHintText(p,level){
    const unique=statLineHintCandidates(p);if(!unique.length)return 'TEAM: '+p.team;
    const firstIndex=seededIndex(modeSeed(641)+norm(p.name).length*31,unique.length);
    if(Number(level)<=1)return unique[firstIndex];
    const rest=unique.filter((x,i)=>i!==firstIndex);if(!rest.length)return unique[firstIndex];
    return rest[seededIndex(modeSeed(719)+norm(p.name).length*43,rest.length)];
  }
  function renderStatLine(){
    const s=specialState,p=s.answer;
    if(!p){document.getElementById('fgSpecialGame').innerHTML='<div class="fg-loading">Loading 2025 NFL stats…</div>';return}
    if(!s.started){
      document.getElementById('fgSpecialGame').innerHTML=
        '<div class="fg-game-panel"><div class="fg-game-title">STAT LINE</div>'+
        '<div class="fg-stat-start"><strong>Ready?</strong><span>The clock starts only when you press Start. Identify the player as quickly as possible.</span>'+
        '<button id="fgStatStart" class="fg-action-primary" type="button">START</button></div></div>';
      const start=document.getElementById('fgStatStart');if(start)start.onclick=startStatLineRound;
      document.getElementById('fgPrompt').textContent='Press Start when you are ready.';
      document.getElementById('fgMessage').textContent='The timer is stopped.';
      return;
    }
    const boxes=statLineFor(p).map(([label,val])=>'<div class="fg-stat-box"><strong>'+esc(val==null?'—':val)+'</strong><span>'+esc(label)+'</span></div>').join('');
    const hints=[
      '<span class="fg-stat-hint '+(s.misses>=1?'':'locked')+'">'+(s.misses>=1?esc(statLineHintText(p,1)):'HINT 1 LOCKED')+'</span>',
      '<span class="fg-stat-hint '+(s.misses>=2?'':'locked')+'">'+(s.misses>=2?esc(statLineHintText(p,2)):'HINT 2 LOCKED')+'</span>'
    ];
    document.getElementById('fgSpecialGame').innerHTML='<div class="fg-game-panel">'+
      '<div class="fg-stat-live-head"><div class="fg-game-title">STAT LINE</div><div id="fgStatTimer" class="fg-stat-timer">'+statLineLiveSeconds()+'s</div></div>'+
      '<div class="fg-game-sub">Whose 2025 stat line is this?</div><div class="fg-score-strip"><span>LIVES '+s.lives+'/3</span><span>🔥 STREAK '+s.streak+'</span></div>'+
      '<div class="fg-stat-hints">'+hints.join('')+'</div>'+
      '<div class="fg-stat-card"><div class="fg-stat-player"><span class="fg-stat-mystery">?</span><span>MYSTERY PLAYER • 2025</span></div><div class="fg-stat-title">2025 REGULAR SEASON</div><div class="fg-stat-grid">'+boxes+'</div></div>'+
      (s.history.length?'<div class="fg-guess-history">'+s.history.map(h=>'<div class="fg-history-row '+(h.correct?'correct':'wrong')+'"><span>'+esc(h.name)+'</span><span>'+(h.correct?'CORRECT':'WRONG')+'</span></div>').join('')+'</div>':'')+
      '</div>';
    document.getElementById('fgPrompt').textContent='Guess the player from the stat line.';
    document.getElementById('fgMessage').textContent=s.misses===0?'Hints become more specific after each miss.':
      s.misses===1?'Hint 1 unlocked. One more miss unlocks the strongest clue.':
      'Final hint unlocked. One life left.';
  }

  function submitStatLine(){
    const s=specialState;if(s.done||!s.answer||!s.started){document.getElementById('fgMessage').textContent='Press Start first.';return;}
    const q=norm(document.getElementById('fgInput').value),p=hlEligible().find(x=>norm(x.name)===q);
    if(!p){document.getElementById('fgMessage').textContent='Choose a recognizable current player from the list.';return}
    document.getElementById('fgInput').value='';
    const correct=norm(p.name)===norm(s.answer.name);
    s.history.push({name:p.name,correct});
    if(correct){
      s.elapsedSeconds=Math.max(1,Math.round((Date.now()-Number(s.startedAt))/1000));stopStatLineTimer();
      showFeedback(true,'CORRECT! '+s.elapsedSeconds+'s');triggerGoodFlash();
      if(playType==='daily'){
        s.done=true;s.won=true;finished=true;gameWon=true;saveDailyState();setTimeout(showResult,700);return;
      }
      s.streak++;s.bestStreak=Math.max(s.bestStreak,s.streak);
      s.round++;s.lives=3;s.misses=0;s.started=false;s.startedAt=null;nextStatLine();saveDailyState();setTimeout(renderSpecial,800);suggest();return;
    }
    s.lives--;s.misses++;showFeedback(false,'WRONG!');triggerDamageFlash();
    if(s.lives<=0){
      stopStatLineTimer();
      renderSpecial();saveDailyState();
      s.done=true;s.won=false;finished=true;gameWon=false;saveDailyState();setTimeout(showResult,1150);
    }else{saveDailyState();renderSpecial();suggest();}
  }


  const DRAFT_YEAR_FALLBACK = {
    "Josh Allen":2018,"Patrick Mahomes":2017,"Lamar Jackson":2018,"Joe Burrow":2020,"Justin Herbert":2020,"Jalen Hurts":2020,
    "Tua Tagovailoa":2020,"Trevor Lawrence":2021,"Jordan Love":2020,"Baker Mayfield":2018,"Kyler Murray":2019,"Dak Prescott":2016,
    "Jared Goff":2016,"Matthew Stafford":2009,"Russell Wilson":2012,"Geno Smith":2013,"Caleb Williams":2024,"Jayden Daniels":2024,
    "Drake Maye":2024,"Bo Nix":2024,"Michael Penix Jr.":2024,"J.J. McCarthy":2024,"Bijan Robinson":2023,"Jahmyr Gibbs":2023,
    "Breece Hall":2022,"Jonathan Taylor":2020,"Saquon Barkley":2018,"Derrick Henry":2016,"Josh Jacobs":2019,"Christian McCaffrey":2017,
    "Alvin Kamara":2017,"Joe Mixon":2017,"James Cook":2022,"Kenneth Walker III":2022,"DeVonta Smith":2021,"Ja'Marr Chase":2021,
    "Justin Jefferson":2020,"CeeDee Lamb":2020,"A.J. Brown":2019,"DK Metcalf":2019,"Tyreek Hill":2016,"Davante Adams":2014,
    "Mike Evans":2014,"Chris Godwin":2017,"Terry McLaurin":2019,"Stefon Diggs":2015,"Amon-Ra St. Brown":2021,"Garrett Wilson":2022,
    "Chris Olave":2022,"Drake London":2022,"Jaylen Waddle":2021,"Tee Higgins":2020,"Jaxon Smith-Njigba":2023,"Marvin Harrison Jr.":2024,
    "Malik Nabers":2024,"Rome Odunze":2024,"Brian Thomas Jr.":2024,"Travis Kelce":2013,"George Kittle":2017,"Mark Andrews":2018,
    "T.J. Hockenson":2019,"Kyle Pitts":2021,"Sam LaPorta":2023,"Brock Bowers":2024,"Trey McBride":2022
  };
  function playerDraftYear(p){
    const live=Number(p&&p.draftYear);
    if(live>=2000&&live<=2026)return live;
    return DRAFT_YEAR_FALLBACK[p&&p.name]||null;
  }
  function draftClassEligible(){
    const all=hlEligible().filter(p=>playerDraftYear(p)&&playerDraftYear(p)>=2011&&playerDraftYear(p)<=2026);
    const ranked=(typeof players!=='undefined'&&Array.isArray(players)?players:[]);
    const rankMap=new Map(ranked.map((p,i)=>[norm(p.player||p.name),i+1]));
    return all.filter(function(p){
      const r=rankMap.get(norm(p.name))||9999;
      if(draftDifficulty==='easy')return r<=55||p.depthOrder===1;
      if(draftDifficulty==='medium')return r<=120||p.depthOrder===1||p.depthOrder===2;
      return r>95||r===9999||Number(p.depthOrder)>=2;
    });
  }
  function nextDraftClass(){
    const src=draftClassEligible();if(!src.length)return;
    let p=randomFrom(src,modeSeed(191)+(specialState.round||1)*73+['easy','medium','brutal'].indexOf(draftDifficulty)*997);
    let guard=0;while(specialState.answer&&p&&norm(p.name)===norm(specialState.answer.name)&&guard++<20){
      p=src[playType==='daily'?seededIndex(modeSeed(193)+guard*29+['easy','medium','brutal'].indexOf(draftDifficulty)*991,src.length):Math.floor(Math.random()*src.length)];
    }
    const year=playerDraftYear(p);
    const candidates=[year];
    const offsets=[-2,-1,1,2,3,-3];
    offsets.forEach(o=>{const y=year+o;if(y>=2011&&y<=2026&&!candidates.includes(y)&&candidates.length<4)candidates.push(y)});
    specialState.answer=p;specialState.options=dailyShuffle(candidates,modeSeed(197)+(specialState.round||1)*31);
  }
  function setupDraftClass(){
    if(playType==='daily')draftDifficulty='medium';
    specialState={round:1,streak:0,bestStreak:0,done:false,won:false,answer:null,options:[]};nextDraftClass();
  }
  function renderDraftClass(){
    const s=specialState,p=s.answer;
    if(!p){document.getElementById('fgSpecialGame').innerHTML='<div class="fg-loading">Loading draft data…</div>';return}
    document.getElementById('fgSpecialGame').innerHTML='<div class="fg-game-panel"><div class="fg-game-title">DRAFT CLASS</div>'+
      '<div class="fg-imposter-diff-note">'+(playType==='daily'?'One shared Daily Draft Class challenge.':draftDifficulty.toUpperCase()+' Unlimited player pool.')+'</div>'+
      '<div class="fg-game-sub">What NFL Draft class was this player in?</div><div class="fg-score-strip"><span>ROUND '+s.round+'</span><span>🔥 STREAK '+s.streak+'</span></div>'+
      '<div class="fg-draft-player">'+photoHTML(p,'fg-player-photo')+'<div class="fg-draft-player-name">'+esc(p.name)+'</div><div class="fg-vs-meta">'+logoHTML(p.team)+' '+esc(p.team)+' • '+esc(p.position)+'</div></div>'+
      '<div class="fg-draft-options">'+s.options.map(y=>'<button class="fg-draft-option" data-draft-year="'+y+'">'+y+' NFL DRAFT</button>').join('')+'</div></div>';
    document.querySelectorAll('[data-draft-year]').forEach(b=>b.onclick=function(){chooseDraftClass(Number(this.dataset.draftYear))});
    document.getElementById('fgPrompt').textContent='Choose the correct draft year.';
    document.getElementById('fgMessage').textContent='Build your draft-class streak.';
  }
  function chooseDraftClass(year){
    const s=specialState;if(s.done||!s.answer)return;
    const correct=playerDraftYear(s.answer)===year;
    if(correct){
      s.streak++;s.bestStreak=Math.max(s.bestStreak,s.streak);showFeedback(true,'CORRECT! 🔥 '+s.streak);triggerGoodFlash();
      if(playType==='daily'){
        s.done=true;s.won=true;finished=true;gameWon=true;
        saveDailyState();setTimeout(showResult,700);return;
      }
      s.round++;nextDraftClass();saveDailyState();setTimeout(renderSpecial,760);return;
    }
    showFeedback(false,'WRONG!');triggerDamageFlash();
    s.done=true;s.won=false;finished=true;gameWon=false;saveDailyState();setTimeout(showResult,850);
  }


  const MOGGER_EASY_NAMES = [
    "Patrick Mahomes","Josh Allen","Lamar Jackson","Joe Burrow","Justin Jefferson","Ja'Marr Chase","CeeDee Lamb","A.J. Brown",
    "DeVonta Smith","Tyreek Hill","Christian McCaffrey","Saquon Barkley","Bijan Robinson","Jahmyr Gibbs","Travis Kelce","George Kittle",
    "Jalen Hurts","Brock Purdy","Dak Prescott","Jayden Daniels","Puka Nacua","Amon-Ra St. Brown","Breece Hall","Derrick Henry",
    "Garrett Wilson","Drake London","Trey McBride","Brock Bowers","Mike Evans","Davante Adams","DK Metcalf","Josh Jacobs",
    "Justin Herbert","C.J. Stroud","Drake Maye","Caleb Williams","Baker Mayfield","Bucky Irving","James Cook","Kyren Williams",
    "Brian Thomas Jr.","Malik Nabers","Rome Odunze","Ladd McConkey","Sam LaPorta","Tee Higgins","George Pickens","Zay Flowers"
  ];
  const MOGGER_MEDIUM_NAMES = [
    "Tyler Warren","A.J. Terrell","Trey McBride","Drake London","James Cook","Jordan Addison","Zay Flowers","George Pickens","Jaylen Waddle",
    "Tee Higgins","Brock Bowers","Sam LaPorta","Kyren Williams","Breece Hall","Chris Olave","Brian Thomas Jr.","Rome Odunze","Malik Nabers",
    "Rashee Rice","DJ Moore","Courtland Sutton","David Montgomery","Isiah Pacheco","Rachaad White","Jameson Williams","Jayden Reed",
    "Xavier Worthy","Calvin Ridley","Tony Pollard","Chuba Hubbard","Aaron Jones","Cooper Kupp","Deebo Samuel","Terry McLaurin",
    "Chris Godwin","Rhamondre Stevenson","Jakobi Meyers","D'Andre Swift","David Njoku","Evan Engram","Khalil Shakir",
    "Quentin Johnston","Jordan Addison","Michael Pittman Jr.","Jameson Williams","Tucker Kraft","Rashod Bateman","Cedric Tillman",
    "Tony Pollard","Chuba Hubbard","Rachaad White","Trevor Lawrence","Geno Smith","Calvin Ridley","Christian Kirk","Keon Coleman"
  ];
  const MOGGER_BRUTAL_LEGENDS = [
    {name:'Jay Ajayi',team:'PHI',position:'RB',conference:'NFC',division:'East',retired:true,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/AjayJa00.jpg'},
    {name:'Peyton Hillis',team:'CLE',position:'RB',conference:'AFC',division:'North',retired:true,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/HillPe00.jpg'},
    {name:'Geronimo Allison',team:'GB',position:'WR',conference:'NFC',division:'North',retired:true,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/AlliGe01.jpg'},
    {name:'Jordy Nelson',team:'GB',position:'WR',conference:'NFC',division:'North',retired:true,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/NelsJo00.jpg'},
    {name:'Michael Turner',team:'ATL',position:'RB',conference:'NFC',division:'South',retired:true,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/TurnMi00.jpg'},
    {name:'Brandon Lloyd',team:'DEN',position:'WR',conference:'AFC',division:'West',retired:true,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/LloyBr00.jpg'},
    {name:'Dwayne Bowe',team:'KC',position:'WR',conference:'AFC',division:'West',retired:true,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/BoweDw00.jpg'},
    {name:'Miles Austin',team:'DAL',position:'WR',conference:'NFC',division:'East',retired:true,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/AustMi00.jpg'},
    {name:'Steve Slaton',team:'HOU',position:'RB',conference:'AFC',division:'South',retired:true,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/SlatSt00.jpg'},
    {name:'Jeremy Maclin',team:'PHI',position:'WR',conference:'NFC',division:'East',retired:true,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/MaclJe00.jpg'},
    {name:'Eddie Lacy',team:'GB',position:'RB',conference:'NFC',division:'North',retired:true,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/LacyEd00.jpg'},
    {name:'Chris Ivory',team:'NYJ',position:'RB',conference:'AFC',division:'East',retired:true,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/IvorCh00.jpg'},
    {name:'Golden Tate',team:'DET',position:'WR',conference:'NFC',division:'North',retired:true,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/TateGo00.jpg'},
    {name:'Pierre Garcon',team:'WAS',position:'WR',conference:'NFC',division:'East',retired:true,photoUrl:'https://www.pro-football-reference.com/req/202106291/images/headshots/GarcPi00.jpg'},
    {name:'BenJarvus Green-Ellis',team:'NE',position:'RB',conference:'AFC',division:'East',retired:true},
    {name:'Santana Moss',team:'WAS',position:'WR',conference:'NFC',division:'East',retired:true},
    {name:'Priest Holmes',team:'KC',position:'RB',conference:'AFC',division:'West',retired:true},
    {name:'Donald Driver',team:'GB',position:'WR',conference:'NFC',division:'North',retired:true},
    {name:'Braylon Edwards',team:'CLE',position:'WR',conference:'AFC',division:'North',retired:true},
    {name:'Steve Breaston',team:'ARI',position:'WR',conference:'NFC',division:'West',retired:true},
    {name:'Laurent Robinson',team:'DAL',position:'WR',conference:'NFC',division:'East',retired:true},
    {name:'Justin Forsett',team:'BAL',position:'RB',conference:'AFC',division:'North',retired:true},
    {name:'Knowshon Moreno',team:'DEN',position:'RB',conference:'AFC',division:'West',retired:true},
    {name:'Ben Tate',team:'HOU',position:'RB',conference:'AFC',division:'South',retired:true},
    {name:'Darren McFadden',team:'LV',position:'RB',conference:'AFC',division:'West',retired:true},
    {name:'Denarius Moore',team:'LV',position:'WR',conference:'AFC',division:'West',retired:true},
    {name:'Sidney Rice',team:'MIN',position:'WR',conference:'NFC',division:'North',retired:true},
    {name:'Mike Wallace',team:'PIT',position:'WR',conference:'AFC',division:'North',retired:true},
    {name:'Steve Johnson',team:'BUF',position:'WR',conference:'AFC',division:'East',retired:true},
    {name:'Rashard Mendenhall',team:'PIT',position:'RB',conference:'AFC',division:'North',retired:true}
  ];
  function currentNFLGuessPool(){
    const byName={};
    currentSkillPlayers().concat(recognizableActive()).forEach(p=>{if(p&&p.active&&!p.retired&&!p.coach)byName[norm(p.name)]=p});
    return Object.values(byName);
  }
  function moggleEasyPool(){
    const famous=new Set(MOGGER_EASY_NAMES.map(norm));
    return currentNFLGuessPool().filter(function(p){
      return currentPlayerPhoto(p)&&famous.has(norm(p.name));
    });
  }
  function mogglePool(){
    const current=activeNFLPlayers().filter(p=>p&&p.active&&!p.retired&&!p.coach&&currentPlayerPhoto(p));
    const rankedNames=new Set((Array.isArray(players)?players:[]).slice(0,120).map(p=>norm(p.player||p.name)));
    const topNames=new Set((Array.isArray(players)?players:[]).slice(0,55).map(p=>norm(p.player||p.name)));

    if(playType==='daily'){
      // Daily stays approachable: a recognizable current fantasy/NFL name.
      const daily=current.filter(p=>topNames.has(norm(p.name)) || Number(p.depthOrder)===1);
      return daily.length?daily:currentNFLGuessPool();
    }

    if(moggleDifficulty==='easy'){
      // Stars and highly recognizable starters.
      const easy=current.filter(p=>topNames.has(norm(p.name)));
      return easy.length?easy:currentNFLGuessPool().slice(0,75);
    }

    if(moggleDifficulty==='medium'){
      // Starters and relevant rotational players, excluding the most obvious stars when possible.
      const medium=current.filter(p=>
        !topNames.has(norm(p.name)) &&
        (rankedNames.has(norm(p.name)) || Number(p.depthOrder)<=2)
      );
      return medium.length?medium:current.filter(p=>Number(p.depthOrder)<=2);
    }

    // Brutal: legitimately niche active players and deeper historical/legend names.
    const brutalCurrent=current.filter(p=>
      !rankedNames.has(norm(p.name)) &&
      (Number(p.depthOrder)>=2 || !Number.isFinite(Number(p.depthOrder)))
    );
    const brutalLegends=(MOGGER_BRUTAL_LEGENDS||[]).filter(p=>p&&p.name&&legendPhoto(p));
    const combined=brutalCurrent.concat(brutalLegends);
    return combined.length?combined:current.filter(p=>!topNames.has(norm(p.name)));
  }
  function moggleGuessPool(){
    const out=[],seen=new Set();
    function add(p){if(!p||!p.name)return;const k=norm(p.name);if(seen.has(k))return;seen.add(k);out.push(p)}
    activeNFLPlayers().filter(p=>p&&p.active&&!p.retired&&!p.coach).forEach(add);
    currentNFLGuessPool().forEach(add);
    legendGuessPool().forEach(add);
    (MOGGER_BRUTAL_LEGENDS||[]).forEach(add);
    if(specialState&&specialState.answer)add(specialState.answer); // the answer must always be typeable
    return out;
  }
  function applyMoggerDifficultyToCurrent(){
    // V66: difficulty changes the player pool, not the picture crop.
    if(specialState){specialState.zoomLevel=1;specialState.zoomOutsLeft=0}
  }

  function setupMogger(){
    if(playType==='daily')moggleDifficulty='medium';
    const src=mogglePool();
    specialState={
      answer:randomFrom(src,modeSeed(223)+['easy','medium','brutal'].indexOf(moggleDifficulty)*41),
      guesses:0,maxGuesses:6,history:[],done:false,won:false,streak:0,
      zoomLevel:1,zoomOutsLeft:0
    };
  }
  function nextMogger(){
    const src=mogglePool(),prev=specialState.answer;
    let p=randomFrom(src,modeSeed(227)+(specialState.streak||0)*43+Math.floor(Math.random()*19));
    let guard=0;
    while(prev&&p&&norm(prev.name)===norm(p.name)&&guard++<20){
      p=src[Math.floor(Math.random()*src.length)];
    }
    specialState.answer=p;
    specialState.guesses=0;
    specialState.history=[];
    specialState.done=false;
    specialState.won=false;
    specialState.zoomLevel=1;
    specialState.zoomOutsLeft=0;
  }

  function renderMogger(){
    const s=specialState,p=s.answer;
    if(!p){
      document.getElementById('fgSpecialGame').innerHTML='<div class="fg-loading">Loading Mogger faces…</div>';
      return;
    }
    const img=photoHTML(p,'fg-moggle-face');
    const daily=playType==='daily';
    const difficultyControls=daily
      ?'<div class="fg-moggle-daily-pill">DAILY MOGGER</div>'
      :'<div class="fg-moggle-daily-pill">UNLIMITED • '+moggleDifficulty.toUpperCase()+'</div>';

    document.getElementById('fgSpecialGame').innerHTML=
      '<div class="fg-game-panel"><div class="fg-game-title">MOGGER</div>'+
      difficultyControls+
      '<div class="fg-game-sub">'+(daily?'Who is today’s mystery NFL player?':'Identify the NFL player from the headshot.')+'</div>'+
      '<div class="fg-score-strip"><span>'+(daily?('GUESSES '+s.guesses+'/'+s.maxGuesses):('🔥 STREAK '+s.streak))+'</span>'+
      (!daily?'<span>'+moggleDifficulty.toUpperCase()+'</span>':'')+'</div>'+
      '<div class="fg-moggle-card">'+img+'</div>'+
      '<div class="fg-moggle-note">'+
        (daily?'One recognizable Daily Mogger player for everyone today.':
          moggleDifficulty==='easy'?'Easy • Stars and highly recognizable NFL players.':
          moggleDifficulty==='medium'?'Medium • Starters and less obvious NFL players.':
          'Brutal • Deep-roster and niche football names.')+
      '</div>'+
      '<div class="fg-inline-actions"><button id="fgMoggerGiveUp" type="button">GIVE UP</button></div>'+
      (s.history.length?'<div class="fg-guess-history">'+s.history.map(h=>'<div class="fg-history-row '+(h.correct?'correct':'wrong')+'"><span>'+esc(h.name)+'</span><span>'+(h.correct?'CORRECT':'WRONG')+'</span></div>').join('')+'</div>':'')+
      '</div>';


    const give=document.getElementById('fgMoggerGiveUp');
    if(give)give.onclick=function(){
      s.done=true;s.won=false;finished=true;gameWon=false;saveDailyState();showResult();
    };

    document.getElementById('fgPrompt').textContent='Guess the NFL player.';
    document.getElementById('fgMessage').textContent=daily
      ?'Daily Mogger is the same for everyone today.'
      :'Difficulty changes how recognizable the player pool is.';
  }

  function submitMogger(){
    const s=specialState;if(s.done||!s.answer)return;
    const q=norm(document.getElementById('fgInput').value),p=moggleGuessPool().find(x=>norm(x.name)===q);
    if(!p){document.getElementById('fgMessage').textContent='Choose a valid NFL player from the list.';return}
    document.getElementById('fgInput').value='';
    const correct=norm(p.name)===norm(s.answer.name);
    s.guesses++;s.history.push({name:p.name,correct});
    if(correct){
      s.streak=(s.streak||0)+1;showFeedback(true,'CORRECT! 🔥 '+s.streak);triggerGoodFlash();
      if(playType==='daily'){s.done=true;s.won=true;finished=true;gameWon=true;saveDailyState();setTimeout(showResult,700);}
      else setTimeout(function(){nextMogger();renderSpecial();suggest();},700);
      return;
    }
    showFeedback(false,'INCORRECT');triggerDamageFlash();
    s.done=true;s.won=false;finished=true;gameWon=false;saveDailyState();setTimeout(showResult,800);
  }


  function setupLeaderboard(){specialState={}}
  function renderLeaderboard(){
    const pts=getDailyPoints(),done=dailyCompletedCount();
    const demo=[
      {name:'YOU',pts:pts,done:done},
      {name:'GridironGuru',pts:84,done:7},
      {name:'FourthAndLong',pts:72,done:6},
      {name:'SundayScout',pts:61,done:5},
      {name:'RouteRunner',pts:49,done:4}
    ].sort((a,b)=>b.pts-a.pts);
    document.getElementById('fgSpecialGame').innerHTML='<div class="fg-game-panel"><div class="fg-game-title">DAILY LEADERBOARD</div>'+
      '<div class="fg-game-sub">Complete Daily Challenges to earn points and climb the board.</div>'+
      '<div class="fg-leaderboard"><div class="fg-leader-head"><span>RANKING</span><span class="fg-points-pill">'+pts+' PTS</span></div>'+
      demo.map((r,i)=>'<div class="fg-leader-row"><strong>#'+(i+1)+'</strong><span>'+esc(r.name)+'<small style="display:block;color:#8f9aa3">'+r.done+' dailies completed</small></span><span class="fg-points-pill">'+r.pts+'</span></div>').join('')+
      '</div><div class="fg-moggle-note">Current build tracks your real points locally. The named opponents are placeholders until we connect a shared backend leaderboard.</div></div>';
    document.getElementById('fgPrompt').textContent='Daily points leaderboard';
    document.getElementById('fgMessage').textContent='Your Daily Challenge wins automatically add points.';
  }


  const TIMELINE_EVENTS=[
    {label:'Jerry Rice drafted',year:1985},{label:'Deion Sanders drafted',year:1989},{label:'Peyton Manning drafted',year:1998},
    {label:'Randy Moss drafted',year:1998},{label:'Tom Brady drafted',year:2000},{label:'Aaron Rodgers drafted',year:2005},
    {label:'Calvin Johnson drafted',year:2007},{label:'Super Bowl XLII',year:2008},{label:'Russell Wilson drafted',year:2012},
    {label:'Super Bowl XLIX',year:2015},{label:'Patrick Mahomes drafted',year:2017},{label:'Christian McCaffrey drafted',year:2017},
    {label:'Lamar Jackson drafted',year:2018},{label:'Josh Allen drafted',year:2018},{label:'Joe Burrow drafted',year:2020},
    {label:'Justin Jefferson drafted',year:2020},{label:'Super Bowl LIV',year:2020},{label:'Ja’Marr Chase drafted',year:2021},
    {label:'Aidan Hutchinson drafted',year:2022},{label:'Super Bowl LVII',year:2023},{label:'Caleb Williams drafted',year:2024}
  ];
  function timelineStreakKey(){return 'footballHQTimelineStreakV1'}
  function getTimelineStreak(){try{return Number(localStorage.getItem(timelineStreakKey())||0)||0}catch(e){return 0}}
  function setTimelineStreak(v){try{localStorage.setItem(timelineStreakKey(),String(Math.max(0,Number(v)||0)))}catch(e){}}
  function playTimelineWomp(){
    if(typeof soundEnabled!=='undefined'&&!soundEnabled)return;
    try{
      const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)return;
      const ctx=(typeof audioContext!=='undefined'&&audioContext)||new Ctx();if(typeof audioContext!=='undefined')audioContext=ctx;if(ctx.state==='suspended')ctx.resume();
      const now=ctx.currentTime+.02;
      [196,164.8,130.8].forEach(function(freq,i){const o=ctx.createOscillator(),g=ctx.createGain();o.type='triangle';o.frequency.setValueAtTime(freq,now+i*.22);g.gain.setValueAtTime(.0001,now+i*.22);g.gain.exponentialRampToValueAtTime(.10,now+i*.22+.02);g.gain.exponentialRampToValueAtTime(.0001,now+i*.22+.28);o.connect(g);g.connect(ctx.destination);o.start(now+i*.22);o.stop(now+i*.22+.3);});
    }catch(e){}
  }
  function setupTimeline(){
    if(playType==='daily')timelineDifficulty='medium';
    const seed=modeSeed(251)+(playType==='unlimited'?Math.floor(Math.random()*999999):0);
    let pool=dailyShuffle(TIMELINE_EVENTS,seed),items=[];
    if(playType==='daily'){items=pool.slice(0,4);}
    else if(timelineDifficulty==='easy'){
      const sorted=TIMELINE_EVENTS.slice().sort((a,b)=>a.year-b.year);let best=[];
      for(let i=0;i<sorted.length;i++){const pick=[sorted[i]];for(let j=i+1;j<sorted.length&&pick.length<4;j++){if(sorted[j].year-pick[pick.length-1].year>=4)pick.push(sorted[j]);}if(pick.length===4){best=pick;break;}}
      items=best.length?best:pool.slice(0,4);
    }else if(timelineDifficulty==='brutal'){
      const sorted=TIMELINE_EVENTS.slice().sort((a,b)=>a.year-b.year),windows=[];
      for(let i=0;i<=sorted.length-4;i++){const w=sorted.slice(i,i+4);if(w[3].year-w[0].year<=8)windows.push(w);}
      items=windows.length?windows[Math.floor(Math.random()*windows.length)]:pool.slice(0,4);
    }else items=pool.slice(0,4);
    const display=dailyShuffle(items,seed+991);
    specialState={items:display,done:false,won:false,streak:getTimelineStreak(),bestStreak:getTimelineStreak(),attempts:0};
  }
  function moveTimelineItem(from,delta){
    if(!specialState||specialState.done)return;const to=from+delta;if(to<0||to>=specialState.items.length)return;
    [specialState.items[from],specialState.items[to]]=[specialState.items[to],specialState.items[from]];renderTimeline();
  }
  const FHQ_NFL_SHIELD_URL='https://static.www.nfl.com/league/api/clubs/logos/NFL';
  const FHQ_SUPER_BOWL_LOGOS={
    'XLII':'https://commons.wikimedia.org/wiki/Special:FilePath/Super_Bowl_XLII_Logo.svg',
    'XLIX':'https://commons.wikimedia.org/wiki/Special:FilePath/Super_Bowl_XLIX_Logo.png',
    'LIV':'https://commons.wikimedia.org/wiki/Special:FilePath/Super_Bowl_LIV.svg',
    'LVII':'https://commons.wikimedia.org/wiki/Special:FilePath/Super_Bowl_LVII.svg'
  };
  function timelineEventIcon(x){
    const label=String(x&&x.label||'');
    if(/^Super Bowl/i.test(label)){
      const roman=label.replace(/^Super Bowl\s*/i,'');
      // Inline fallback guarantees no broken-image/question-mark icon in Apps Script.
      return '<span class="fg-timeline-event-icon logo"><span class="sb-fallback"><b>SUPER</b><small>BOWL '+esc(roman)+'</small></span></span>';
    }
    const playerName=label.replace(/\s+drafted$/i,'').trim();
    let person=gridPersonByName(playerName);
    if(!person&&typeof LEGENDS!=='undefined'&&Array.isArray(LEGENDS))person=LEGENDS.find(p=>norm(p.name)===norm(playerName))||null;
    if(person)return '<span class="fg-timeline-event-icon">'+photoHTML(person,'fg-player-photo')+'</span>';
    return '<span class="fg-timeline-event-icon nfl"><span class="sb-fallback"><b>NFL</b></span></span>';
  }

  function renderTimeline(){
    const s=specialState;
    document.getElementById('fgSpecialGame').innerHTML='<div class="fg-game-panel"><div class="fg-game-title">TIMELINE</div><div class="fg-game-sub">'+(playType==='daily'?'Today’s shared timeline.':timelineDifficulty.toUpperCase()+' • Move the moments into chronological order — earliest at #1.')+'</div><div class="fg-timeline-streak">🔥 STREAK '+Number(s.streak||0)+'</div><div class="fg-timeline-list">'+s.items.map((x,i)=>'<div class="fg-timeline-item"><span class="fg-timeline-number">'+(i+1)+'</span>'+timelineEventIcon(x)+'<span class="fg-timeline-label">'+esc(x.label)+'</span><span class="fg-timeline-move"><button class="fg-timeline-arrow" type="button" data-up="'+i+'" '+(i===0?'disabled':'')+'>↑</button><button class="fg-timeline-arrow" type="button" data-down="'+i+'" '+(i===s.items.length-1?'disabled':'')+'>↓</button></span></div>').join('')+'</div><div class="fg-inline-actions"><button id="fgTimelineSubmit" type="button">SUBMIT ORDER</button></div></div>';
    document.querySelectorAll('[data-up]').forEach(b=>b.onclick=function(){moveTimelineItem(Number(this.dataset.up),-1)});
    document.querySelectorAll('[data-down]').forEach(b=>b.onclick=function(){moveTimelineItem(Number(this.dataset.down),1)});
    const sub=document.getElementById('fgTimelineSubmit');if(sub)sub.onclick=submitTimeline;
    document.getElementById('fgPrompt').textContent='Put the NFL moments in order.';document.getElementById('fgMessage').textContent='Use ↑ and ↓, then submit.';
  }
  function submitTimeline(){
    const s=specialState;if(s.done||!Array.isArray(s.items)||s.items.length!==4)return;
    s.attempts=Number(s.attempts||0)+1;
    const years=s.items.map(x=>x.year),correct=years.every((v,i,a)=>i===0||a[i-1]<=v);
    if(correct){
      s.streak=Number(s.streak||0)+1;s.bestStreak=Math.max(Number(s.bestStreak||0),s.streak);setTimelineStreak(s.streak);showFeedback(true,'CORRECT!');triggerGoodFlash();
      if(playType==='daily'){s.done=true;s.won=true;finished=true;gameWon=true;saveDailyState();setTimeout(showResult,700);}
      else setTimeout(function(){setupTimeline();specialState.streak=getTimelineStreak();renderTimeline();},650);
    }else{
      s.correctOrder=s.items.slice().sort((a,b)=>a.year-b.year);
      showFeedback(false,'GAME OVER!');triggerDamageFlash();playTimelineWomp();s.streak=0;setTimelineStreak(0);s.done=true;s.won=false;finished=true;gameWon=false;saveDailyState();renderTimeline();setTimeout(showResult,700);
    }
  }


  /* =========================================================
     V31 GAME #13 — FRANCHISE FINDER
     ========================================================= */
  const FHQ_TEAM_NAMES={
    ARI:'Arizona Cardinals',ATL:'Atlanta Falcons',BAL:'Baltimore Ravens',BUF:'Buffalo Bills',CAR:'Carolina Panthers',CHI:'Chicago Bears',
    CIN:'Cincinnati Bengals',CLE:'Cleveland Browns',DAL:'Dallas Cowboys',DEN:'Denver Broncos',DET:'Detroit Lions',GB:'Green Bay Packers',
    HOU:'Houston Texans',IND:'Indianapolis Colts',JAX:'Jacksonville Jaguars',KC:'Kansas City Chiefs',LV:'Las Vegas Raiders',
    LAC:'Los Angeles Chargers',LAR:'Los Angeles Rams',MIA:'Miami Dolphins',MIN:'Minnesota Vikings',NE:'New England Patriots',
    NO:'New Orleans Saints',NYG:'New York Giants',NYJ:'New York Jets',PHI:'Philadelphia Eagles',PIT:'Pittsburgh Steelers',
    SEA:'Seattle Seahawks',SF:'San Francisco 49ers',TB:'Tampa Bay Buccaneers',TEN:'Tennessee Titans',WAS:'Washington Commanders'
  };

  function gameStreakKey(game){return 'footballHQGameStreakV1:'+game}
  function getGameStreak(game){try{return Number(localStorage.getItem(gameStreakKey(game))||0)||0}catch(e){return 0}}
  function setGameStreak(game,value){try{localStorage.setItem(gameStreakKey(game),String(Math.max(0,Number(value)||0)))}catch(e){}}

  let fhqGuessTeamPoolCache=null,fhqGuessTeamPoolStamp='';
  function guessTeamPool(){
    const all=activeNFLPlayers();
    const stamp=all.length+'|'+(Array.isArray(players)?players.length:0)+'|v63';
    if(fhqGuessTeamPoolCache&&fhqGuessTeamPoolStamp===stamp)return fhqGuessTeamPoolCache;

    const rankMap=new Map();
    if(Array.isArray(players))players.slice(0,500).forEach((p,i)=>rankMap.set(norm(p.player||p.name),i+1));
    const byTeam={};
    all.forEach(function(p){
      if(p&&p.team&&FHQ_TEAM_NAMES[p.team])(byTeam[p.team]||(byTeam[p.team]=[])).push(p);
    });

    fhqGuessTeamPoolCache=Object.keys(FHQ_TEAM_NAMES).map(function(team){
      const meta=TEAM_META[team]||['NFL','—'];
      const fullRoster=byTeam[team]||[];
      const roster=fullRoster.filter(p=>['QB','RB','WR','TE','LB','CB','S','DE','DT','EDGE'].includes(String(p.position||'').toUpperCase()))
        .sort((a,b)=>(rankMap.get(norm(a.name))||9999)-(rankMap.get(norm(b.name))||9999) ||
                      (Number(a.depthOrder)||99)-(Number(b.depthOrder)||99)).slice(0,8);

      const collegeCounts={},posCounts={};
      fullRoster.forEach(function(p){
        const c=String(p.college||'').trim();if(c)collegeCounts[c]=(collegeCounts[c]||0)+1;
        const pos=String(p.position||'').toUpperCase();if(pos)posCounts[pos]=(posCounts[pos]||0)+1;
      });
      const colleges=Object.keys(collegeCounts).sort((a,b)=>collegeCounts[b]-collegeCounts[a]);
      const qb=fullRoster.filter(p=>String(p.position||'').toUpperCase()==='QB')
        .sort((a,b)=>(Number(a.depthOrder)||99)-(Number(b.depthOrder)||99))[0]||null;
      const topCollege=colleges[0]||'';
      const skillCount=fullRoster.filter(p=>['QB','RB','WR','TE'].includes(String(p.position||'').toUpperCase())).length;
      const wrCount=Number(posCounts.WR||0),rbCount=Number(posCounts.RB||0),teCount=Number(posCounts.TE||0);

      const hard=[],medium=[],strong=[];
      if(skillCount)hard.push('This roster has '+skillCount+' listed QB/RB/WR/TE players.');
      if(wrCount)hard.push('The roster currently lists '+wrCount+' wide receivers.');
      if(rbCount)hard.push('The roster currently lists '+rbCount+' running backs.');
      if(teCount)hard.push('The roster currently lists '+teCount+' tight ends.');
      if(topCollege&&collegeCounts[topCollege]>=2)hard.push(collegeCounts[topCollege]+' current players attended '+topCollege+'.');
      medium.push('This franchise plays in the '+meta[0]+'.');
      if(qb)medium.push('One quarterback on this roster is '+qb.name+'.');
      if(roster[1])medium.push('One recognizable player is '+roster[1].name+'.');
      strong.push('Division: '+meta[0]+' '+meta[1]+'.');
      if(roster[0])strong.push('A featured fantasy player is '+roster[0].name+'.');

      const seed=modeSeed(701)+team.charCodeAt(0)*31+team.charCodeAt(team.length-1)*17;
      const pick=function(arr,salt){return arr.length?arr[seededIndex(seed+salt,arr.length)]:''};
      const clues=Array.from(new Set([
        pick(hard,11),pick(hard,17),pick(medium,23),pick(medium,29),pick(strong,37),pick(strong,43),
        'Conference: '+meta[0]+'.','Division: '+meta[0]+' '+meta[1]+'.'
      ].filter(Boolean))).slice(0,5);
      return {team:team,label:FHQ_TEAM_NAMES[team],conference:meta[0],division:meta[1],roster:roster,clues:clues};
    }).filter(x=>x&&x.team&&Array.isArray(x.clues)&&x.clues.length>=5);

    fhqGuessTeamPoolStamp=stamp;
    return fhqGuessTeamPoolCache;
  }

  function setupGuessTeam(){
    const streak=getGameStreak('guessteam');
    const pool=guessTeamPool();
    const answer=randomFrom(pool,modeSeed(313));
    const limit=playType==='daily'?3:Math.max(2,Math.min(5,Number(teamHintLimit||4)));
    specialState={answer:answer||null,revealed:limit,clueLimit:limit,maxGuesses:limit,streak:streak,bestStreak:streak,done:false,won:false,guesses:0,lives:3};
  }

  function revealGuessTeamClue(){
    if(!specialState||specialState.done)return;
    specialState.revealed=Math.min(5,Number(specialState.revealed||1)+1);
    renderGuessTeam();
    saveDailyState();
  }

  function submitGuessTeam(){
    if(!specialState||specialState.done)return;
    const input=document.getElementById('fgGuessTeamInput');
    const raw=input?String(input.value||'').trim():'';
    if(!raw)return;
    const guessed=Object.keys(FHQ_TEAM_NAMES).find(function(code){
      return norm(FHQ_TEAM_NAMES[code])===norm(raw)||norm(code)===norm(raw);
    })||'';
    if(!guessed){
      const msg=document.getElementById('fgMessage');if(msg)msg.textContent='Choose an NFL team from the suggestions.';
      return;
    }
    specialState.guesses=Number(specialState.guesses||0)+1;
    const correct=guessed===specialState.answer.team;

    if(correct){
      specialState.streak=Number(specialState.streak||0)+1;
      specialState.bestStreak=Math.max(Number(specialState.bestStreak||0),specialState.streak);
      setGameStreak('guessteam',specialState.streak);
      showFeedback(true,'CORRECT!');triggerGoodFlash();

      if(playType==='daily'){
        specialState.done=true;specialState.won=true;finished=true;gameWon=true;saveDailyState();
        setTimeout(showResult,650);
      }else{
        setTimeout(function(){setupGuessTeam();specialState.streak=getGameStreak('guessteam');specialState.bestStreak=specialState.streak;renderGuessTeam();},650);
      }
    }else{
      specialState.lives=Math.max(0,Number(specialState.lives||3)-1);
      showFeedback(false,'WRONG — '+specialState.lives+' '+(specialState.lives===1?'LIFE':'LIVES')+' LEFT');triggerDamageFlash();
      if(specialState.lives<=0 || specialState.guesses>=Number(specialState.maxGuesses||specialState.clueLimit||2)){
        specialState.bestStreak=Number(specialState.streak||0);
        specialState.streak=0;setGameStreak('guessteam',0);
        specialState.done=true;specialState.won=false;finished=true;gameWon=false;
        saveDailyState();
        if(typeof playTimelineWomp==='function')playTimelineWomp();
        setTimeout(showResult,650);
      }else{
        saveDailyState();renderGuessTeam();
      }
    }
  }

  function guessTeamSuggestions(){
    const input=document.getElementById('fgGuessTeamInput'),box=document.getElementById('fgGuessTeamSuggestions');
    if(!input||!box)return;
    const q=norm(input.value);
    if(!q){box.innerHTML='';box.classList.remove('show');return;}
    const items=Object.keys(FHQ_TEAM_NAMES).map(function(code){return {code:code,name:FHQ_TEAM_NAMES[code]};})
      .filter(function(t){return norm(t.name).includes(q)||norm(t.code).includes(q);}).slice(0,8);
    box.innerHTML=items.map(function(t){
      return '<button type="button" class="fg-team-search-option" data-team-name="'+esc(t.name)+'">'+
        '<span class="fg-team-search-logo">'+logoHTML(t.code)+'</span><span>'+esc(t.name)+'</span></button>';
    }).join('');
    box.classList.toggle('show',items.length>0);
    box.querySelectorAll('[data-team-name]').forEach(function(btn){
      btn.onclick=function(){input.value=this.dataset.teamName;box.classList.remove('show');input.focus();};
    });
  }

  function renderGuessTeam(){
    const s=specialState,a=s.answer;
    if(!a){
      document.getElementById('fgSpecialGame').innerHTML='<div class="fg-loading">Loading team clues…</div>';
      document.getElementById('fgMessage').textContent='Preparing current NFL rosters…';
      return;
    }
    const limit=Math.max(2,Math.min(5,Number(s.clueLimit||3)));
    s.revealed=limit;s.maxGuesses=limit;
    const clues=a.clues.slice(0,limit).map((c,i)=>'<div class="fg-team-clue">CLUE '+(i+1)+' — '+esc(c)+'</div>').join('');

    document.getElementById('fgSpecialGame').innerHTML=
      '<div class="fg-newgame-shell">'+
        '<div class="fg-newgame-title">FRANCHISE FINDER</div>'+
        '<div class="fg-newgame-sub">'+(playType==='daily'?'Today’s shared Franchise Finder uses three clues.':'You chose '+limit+' clues for this Unlimited run.')+'</div>'+
        '<div class="fg-clue-budget-label">'+limit+' clue'+(limit===1?'':'s')+' • '+limit+' guess'+(limit===1?'':'es')+' • LIVES '+Number(s.lives||3)+'/3</div>'+
        '<div class="fg-game-streak">🔥 STREAK '+Number(s.streak||0)+'</div>'+
        '<div class="fg-clue-stack">'+clues+'</div>'+
        '<div class="fg-team-search-wrap">'+
          '<div class="fg-team-guess-row"><input id="fgGuessTeamInput" class="fg-team-search-input" name="fhq_team_guess" autocomplete="new-password" autocorrect="off" autocapitalize="none" spellcheck="false" data-1p-ignore="true" data-lpignore="true" placeholder="Search an NFL team…">'+
          '<button class="fg-action-primary" type="button" id="fgGuessTeamSubmit">LOCK IN</button></div>'+
          '<div id="fgGuessTeamSuggestions" class="fg-team-search-suggestions"></div>'+
        '</div>'+
      '</div>';

    const submit=document.getElementById('fgGuessTeamSubmit');if(submit)submit.onclick=submitGuessTeam;
    const input=document.getElementById('fgGuessTeamInput');
    if(input){
      input.oninput=guessTeamSuggestions;
      input.onkeydown=function(e){if(e.key==='Enter'){e.preventDefault();submitGuessTeam();}};
      setTimeout(function(){input.focus();},30);
    }
    document.getElementById('fgPrompt').textContent='Which NFL team matches the clues?';
    document.getElementById('fgMessage').textContent='Search by city, team name, or abbreviation.';
  }

  /* =========================================================
     V31 GAME #14 — DEPTH CHART
     ========================================================= */
  let fhqDepthChartPoolsCache=null,fhqDepthChartPoolsStamp='';
  function depthChartPools(){
    const all=activeNFLPlayers();
    const stamp=all.length+'|'+(Array.isArray(players)?players.length:0);
    if(fhqDepthChartPoolsCache&&fhqDepthChartPoolsStamp===stamp)return fhqDepthChartPoolsCache;

    const ranked=new Set((Array.isArray(players)?players.slice(0,500):[]).map(p=>norm(p.player||p.name)));
    const grouped={};
    all.forEach(function(p){
      const pos=String(p.position||'').toUpperCase(),order=Number(p.depthOrder);
      if(!['QB','RB','WR','TE'].includes(pos)||!p.team||!Number.isFinite(order)||order<=0)return;
      const key=p.team+'|'+pos;
      (grouped[key]||(grouped[key]=[])).push(p);
    });

    fhqDepthChartPoolsCache=Object.keys(grouped).map(function(key){
      const parts=key.split('|'),team=parts[0],pos=parts[1];
      const list=grouped[key].sort((a,b)=>(Number(a.depthOrder)||99)-(Number(b.depthOrder)||99)||a.name.localeCompare(b.name));
      const unique=[],seen=new Set();
      list.forEach(p=>{const k=norm(p.name);if(!seen.has(k)){seen.add(k);unique.push(p)}});
      const top=unique.slice(0,3),relevant=top.filter(p=>ranked.has(norm(p.name))).length;
      return {label:key,team:team,pos:pos,players:top,relevant:relevant};
    }).filter(g=>g.players.length===3&&g.relevant>=2&&Number(g.players[0].depthOrder)<=2);

    fhqDepthChartPoolsStamp=stamp;
    return fhqDepthChartPoolsCache;
  }

  function setupDepthChart(){
    const streak=getGameStreak('depthchart');
    const pools=depthChartPools();
    let chosen=randomFrom(pools,modeSeed(419));
    if(!chosen){
      chosen={label:'fallback',team:'DET',pos:'RB',players:activeNFLPlayers().filter(p=>p.team==='DET'&&p.position==='RB').slice(0,3),relevant:2};
    }
    const correct=chosen.players.slice().sort((a,b)=>(Number(a.depthOrder)||99)-(Number(b.depthOrder)||99));
    const seed=playType==='daily'?modeSeed(421):Math.floor(Math.random()*999999);
    const shuffled=dailyShuffle(correct,seed);
    specialState={
      team:chosen.team,pos:chosen.pos,correctOrder:correct,items:shuffled,
      streak:streak,bestStreak:streak,done:false,won:false,guesses:0
    };
  }

  function moveDepthItem(from,delta){
    if(!specialState||specialState.done)return;
    const to=from+delta;if(to<0||to>=specialState.items.length)return;
    [specialState.items[from],specialState.items[to]]=[specialState.items[to],specialState.items[from]];
    renderDepthChart();
  }

  function submitDepthChart(){
    const s=specialState;if(!s||s.done)return;
    s.guesses=Number(s.guesses||0)+1;
    const correct=s.items.every((p,i)=>norm(p.name)===norm(s.correctOrder[i].name));

    if(correct){
      s.streak=Number(s.streak||0)+1;s.bestStreak=Math.max(Number(s.bestStreak||0),s.streak);
      setGameStreak('depthchart',s.streak);showFeedback(true,'CORRECT!');triggerGoodFlash();
      if(playType==='daily'){
        s.done=true;s.won=true;finished=true;gameWon=true;saveDailyState();setTimeout(showResult,650);
      }else{
        setTimeout(function(){setupDepthChart();specialState.streak=getGameStreak('depthchart');specialState.bestStreak=specialState.streak;renderDepthChart();},650);
      }
    }else{
      s.bestStreak=Number(s.streak||0);s.streak=0;setGameStreak('depthchart',0);
      s.done=true;s.won=false;finished=true;gameWon=false;saveDailyState();
      showFeedback(false,'GAME OVER!');triggerDamageFlash();
      if(typeof playTimelineWomp==='function')playTimelineWomp();
      setTimeout(showResult,650);
    }
  }

  function renderDepthChart(){
    const s=specialState;
    const teamName=FHQ_TEAM_NAMES[s.team]||s.team;
    document.getElementById('fgSpecialGame').innerHTML=
      '<div class="fg-newgame-shell">'+
        '<div class="fg-newgame-title">DEPTH CHART</div>'+
        '<div class="fg-newgame-sub">Arrange the current room from starter/depth #1 down to the deeper backup.</div>'+
        '<div class="fg-game-streak">🔥 STREAK '+Number(s.streak||0)+'</div>'+
        '<div class="fg-depth-header"><span class="fg-depth-logo">'+logoHTML(s.team)+'</span><div><div class="fg-depth-team">'+esc(teamName)+'</div><div class="fg-depth-pos">'+esc(s.pos)+' DEPTH CHART</div></div></div>'+
        '<div class="fg-depth-list">'+s.items.map((p,i)=>
          '<div class="fg-depth-item"><span class="fg-depth-num">'+(i+1)+'</span>'+photoHTML(p,'fg-player-photo')+
          '<div><div class="fg-depth-name">'+esc(p.name)+'</div><div class="fg-depth-meta">'+esc(p.position)+' • '+esc(p.team)+'</div></div>'+
          '<div class="fg-depth-arrows"><button class="fg-depth-arrow" data-depth-up="'+i+'" '+(i===0?'disabled':'')+'>↑</button>'+
          '<button class="fg-depth-arrow" data-depth-down="'+i+'" '+(i===s.items.length-1?'disabled':'')+'>↓</button></div></div>'
        ).join('')+'</div>'+
        '<div class="fg-action-row"><button class="fg-action-primary" id="fgDepthSubmit" type="button">SUBMIT ORDER</button></div>'+
      '</div>';
    document.querySelectorAll('[data-depth-up]').forEach(b=>b.onclick=function(){moveDepthItem(Number(this.dataset.depthUp),-1)});
    document.querySelectorAll('[data-depth-down]').forEach(b=>b.onclick=function(){moveDepthItem(Number(this.dataset.depthDown),1)});
    const submit=document.getElementById('fgDepthSubmit');if(submit)submit.onclick=submitDepthChart;
    document.getElementById('fgPrompt').textContent='Put the depth chart in order.';
    document.getElementById('fgMessage').textContent='One incorrect order ends the streak.';
  }


  function fhqDifficultyGateHTML(title,subtitle,options,dataAttr){
    return '<div class="fhq-unlimited-gate"><div class="fhq-unlimited-kicker">UNLIMITED</div><h2>'+esc(title)+'</h2><p>'+esc(subtitle)+'</p>'+
      '<div class="fhq-unlimited-options">'+options.map(function(o){
        return '<button type="button" class="fhq-unlimited-option '+esc(o.tone||'medium')+'" data-'+dataAttr+'="'+esc(o.value)+'">'+
          '<span class="fhq-unlimited-option-kicker">'+esc(o.kicker||'')+'</span><strong>'+esc(o.title)+'</strong><small>'+esc(o.desc)+'</small></button>';
      }).join('')+'</div></div>';
  }
  function fhqUnlimitedSpecialGate(){
    if(playType!=='unlimited')return false;
    const box=document.getElementById('fgSpecialGame');if(!box)return false;
    let cfg=null,attr='';
    if(mode==='whoami'&&!whoHintChosen){cfg={title:'WHO AM I?',sub:'Choose how much help you want before the player is selected.',opts:[
      {value:'1',title:'1 HINT',kicker:'EXTREME',desc:'One clue. One guess.',tone:'brutal'},
      {value:'2',title:'2 HINTS',kicker:'VERY HARD',desc:'Two clues and two guesses.',tone:'hard'},
      {value:'3',title:'3 HINTS',kicker:'HARD',desc:'A balanced football test.',tone:'medium'},
      {value:'4',title:'4 HINTS',kicker:'EASY',desc:'More context before you lock in.',tone:'easy'},
      {value:'5',title:'5 HINTS',kicker:'VERY EASY',desc:'Maximum information and five guesses.',tone:'veryeasy'}]};attr='who-start';
    }else if(mode==='statline'&&!statDifficultyChosen){cfg={title:'STAT LINE',sub:'Choose how recognizable the mystery stat line should be.',opts:[
      {value:'easy',title:'EASY',kicker:'STARS',desc:'Highly recognizable fantasy and NFL names.',tone:'easy'},
      {value:'medium',title:'MEDIUM',kicker:'STARTERS',desc:'A broad starter and contributor pool.',tone:'medium'},
      {value:'brutal',title:'BRUTAL',kicker:'SICKO MODE',desc:'Deep contributors and tricky profiles.',tone:'brutal'}]};attr='stat-start';
    }else if(mode==='imposter'&&!imposterDifficultyChosen){cfg={title:'IMPOSTER',sub:'Choose how deep the shared football connection can get.',opts:[
      {value:'easy',title:'EASY',kicker:'TEAM • POSITION',desc:'Familiar players and simple relationships.',tone:'easy'},
      {value:'medium',title:'MEDIUM',kicker:'COLLEGE • DIVISION',desc:'More category types and less obvious players.',tone:'medium'},
      {value:'brutal',title:'BRUTAL',kicker:'EXTREME BALL KNOWERS',desc:'Draft history, colleges and deep roster links.',tone:'brutal'}]};attr='imposter-start';
    }else if(mode==='draftclass'&&!draftDifficultyChosen){cfg={title:'DRAFT CLASS',sub:'Choose the player pool for Unlimited Draft Class.',opts:[
      {value:'easy',title:'EASY',kicker:'STARS',desc:'Big-name players and familiar classes.',tone:'easy'},
      {value:'medium',title:'MEDIUM',kicker:'STARTERS',desc:'A wider pool of relevant NFL players.',tone:'medium'},
      {value:'brutal',title:'BRUTAL',kicker:'DEEP DRAFT BOARD',desc:'Less obvious players for serious draft knowledge.',tone:'brutal'}]};attr='draft-start';
    }else if(mode==='moggle'&&!moggleDifficultyChosen){cfg={title:'MOGGER',sub:'Choose how recognizable the mystery player should be.',opts:[
      {value:'easy',title:'EASY',kicker:'SUPERSTARS',desc:'Faces almost every NFL fan knows.',tone:'easy'},
      {value:'medium',title:'MEDIUM',kicker:'FOOTBALL REGULARS',desc:'Starters and fantasy-relevant players.',tone:'medium'},
      {value:'brutal',title:'BRUTAL',kicker:'ROSTER SICKO',desc:'Deep names, legends and obscure faces.',tone:'brutal'}]};attr='moggle-start';
    }else if(mode==='timeline'&&!timelineDifficultyChosen){cfg={title:'TIMELINE',sub:'Choose how tight and obscure the historical ordering should be.',opts:[
      {value:'easy',title:'EASY',kicker:'BIG MOMENTS',desc:'Well-known events with larger year gaps.',tone:'easy'},
      {value:'medium',title:'MEDIUM',kicker:'BALANCED HISTORY',desc:'Recognizable moments with closer dates.',tone:'medium'},
      {value:'brutal',title:'BRUTAL',kicker:'HISTORY SICKO',desc:'Similar-era events where every year matters.',tone:'brutal'}]};attr='timeline-start';
    }else if(mode==='guessteam'&&!teamHintChosen){cfg={title:'FRANCHISE FINDER',sub:'Choose how many clues you receive.',opts:[
      {value:'2',title:'2 CLUES',kicker:'BRUTAL',desc:'Very little information. Know the roster.',tone:'brutal'},
      {value:'3',title:'3 CLUES',kicker:'HARD',desc:'A difficult but fair franchise test.',tone:'hard'},
      {value:'4',title:'4 CLUES',kicker:'NORMAL',desc:'Balanced roster and division information.',tone:'medium'},
      {value:'5',title:'5 CLUES',kicker:'EASY',desc:'Maximum help before you choose.',tone:'easy'}]};attr='team-start';
    }
    if(!cfg)return false;
    box.innerHTML=fhqDifficultyGateHTML(cfg.title,cfg.sub,cfg.opts,attr);
    box.querySelectorAll('[data-'+attr+']').forEach(function(btn){btn.onclick=function(){
      const v=this.getAttribute('data-'+attr);
      if(mode==='whoami'){whoHintLimit=Number(v)||3;whoHintChosen=true;}
      else if(mode==='statline'){statDifficulty=v;statDifficultyChosen=true;}
      else if(mode==='imposter'){imposterDifficulty=v;imposterDifficultyChosen=true;}
      else if(mode==='draftclass'){draftDifficulty=v;draftDifficultyChosen=true;}
      else if(mode==='moggle'){moggleDifficulty=v;moggleDifficultyChosen=true;}
      else if(mode==='timeline'){timelineDifficulty=v;timelineDifficultyChosen=true;}
      else if(mode==='guessteam'){teamHintLimit=Number(v)||4;teamHintChosen=true;}
      setupSpecial();renderSpecial();suggest();
    }});
    document.getElementById('fgPrompt').textContent='Choose your Unlimited setup.';
    document.getElementById('fgMessage').textContent='The puzzle begins after you choose.';
    return true;
  }

  function setupSpecial(){
    finished=false;gameWon=false;
    if(mode==='whoami')setupWhoAmI();
    else if(mode==='career')setupCareer();
    else if(mode==='higherlower')setupHigherLower();
    else if(mode==='imposter')setupImposter();
    else if(mode==='connections')setupConnections();
    else if(mode==='statline')setupStatLine();
    else if(mode==='draftclass')setupDraftClass();
    else if(mode==='moggle')setupMogger();
    else if(mode==='leaderboard')setupLeaderboard();
    else if(mode==='timeline')setupTimeline();
    else if(mode==='guessteam')setupGuessTeam();
    else if(mode==='depthchart')setupDepthChart();
  }
  function renderSpecial(){
    if(fhqUnlimitedSpecialGate())return;
    if(mode==='whoami')renderWhoAmI();
    else if(mode==='career')renderCareer();
    else if(mode==='higherlower')renderHigherLower();
    else if(mode==='imposter')renderImposter();
    else if(mode==='connections')renderConnections();
    else if(mode==='statline')renderStatLine();
    else if(mode==='draftclass')renderDraftClass();
    else if(mode==='moggle')renderMogger();
    else if(mode==='leaderboard')renderLeaderboard();
    else if(mode==='timeline')renderTimeline();
    else if(mode==='guessteam')renderGuessTeam();
    else if(mode==='depthchart')renderDepthChart();
    document.getElementById('fgShareBtn').style.display=finished?'inline-block':'none';
  }

  function updatePlayTypeVisibility(){
    const daily=document.getElementById('fgDailyBtn'),unlim=document.getElementById('fgUnlimitedBtn');
    if(!daily||!unlim)return;
    if(mode==='leaderboard'){
      unlim.style.display='none';daily.style.display='none';
    }else if(mode==='higherlower'){
      daily.style.display='';
      unlim.style.display='none';
      daily.textContent='PLAY';
      daily.classList.add('active');
    }else{
      daily.style.display='';
      unlim.style.display='';
      daily.textContent='DAILY CHALLENGE';
    }
  }

  function render(){
    updatePlayTypeVisibility();
    const grid=document.getElementById('fgGrid'),weddle=document.getElementById('fgWeddleWrap'),
      gridGame=document.getElementById('fgGridGame'),special=document.getElementById('fgSpecialGame'),
      search=document.getElementById('fgSearchArea'),help=document.getElementById('fgHelp');
    if(!grid)return;

    const specialMode=['whoami','career','higherlower','imposter','connections','statline','draftclass','moggle','leaderboard','timeline','guessteam','depthchart'].includes(mode);
    if(specialMode){
      weddle.style.display='none';gridGame.classList.remove('show');special.classList.add('show');
      search.style.display=(mode==='whoami'||mode==='career'||mode==='statline'||mode==='moggle')?'block':'none';
      help.textContent=mode==='whoami'?'Reveal clues and guess the NFL person.':
        mode==='career'?'Follow the team-logo path and identify the player.':
        mode==='higherlower'?'Choose which current NFL player leads the shown category.':
        mode==='imposter'?'Three players share a football connection. Find the one who does not belong.':
        mode==='connections'?'Find all four groups before you use four mistakes.':
        mode==='statline'?'Identify the current NFL player from the 2025 stat line.':
        mode==='draftclass'?'Guess the NFL Draft class for the shown player.':
        mode==='moggle'?'Guess which NFL player the lookalike resembles.':
        mode==='timeline'?'Put four football moments in chronological order.':
        mode==='guessteam'?'Reveal clues, choose the NFL franchise, and protect your streak.':
        mode==='depthchart'?'Arrange the position room from top of the depth chart downward.':
        'Complete Daily Challenges to earn leaderboard points.';
      renderSpecial();return;
    }

    special.classList.remove('show');special.innerHTML='';search.style.display='block';
    if(mode==='grid'){
      weddle.style.display='none';gridGame.classList.add('show');
      help.textContent='Grid uses the full active NFL player pool plus a historical database for retired players, Hall of Famers, champions and coaches.';
      renderGridGame();document.getElementById('fgShareBtn').style.display=finished?'inline-block':'none';return;
    }

    weddle.style.display='block';gridGame.classList.remove('show');
    help.textContent='Green = exact match. Yellow = same side of the ball or another division in the same conference. Gray = different conference / no match.';
    let gate=document.getElementById('fgPlayerDifficultyGate');
    if(mode==='players'&&playType==='unlimited'&&!playerDifficultyChosen){
      search.style.display='none';grid.style.display='none';
      if(!gate){gate=document.createElement('div');gate.id='fgPlayerDifficultyGate';weddle.insertBefore(gate,weddle.firstChild)}
      gate.style.display='block';
      gate.innerHTML='<div class="fhq-player-mode-gate"><h2>Choose Your Difficulty</h2><p>Pick a mode to begin Unlimited Active Players.</p><div class="fhq-player-mode-cards">'+
        '<button class="fhq-player-mode-card easy" data-player-mode="easy"><div class="mode-kicker">OFFENSE ONLY</div><div class="mode-label">EASY</div><div class="mode-icon">▲</div><div class="mode-desc">Recognizable current offensive starters: quarterbacks, running backs, receivers and tight ends.</div></button>'+
        '<button class="fhq-player-mode-card medium" data-player-mode="medium"><div class="mode-kicker">STARTERS</div><div class="mode-label">MEDIUM</div><div class="mode-icon">◆</div><div class="mode-desc">A mix of current offensive and defensive starters. More football knowledge is required.</div></button>'+
        '<button class="fhq-player-mode-card brutal" data-player-mode="brutal"><div class="mode-kicker">FULL ROSTER</div><div class="mode-label">BRUTAL</div><div class="mode-icon">▼</div><div class="mode-desc">Offense, defense and special teams — including depth players and legitimately niche current names.</div></button>'+
        '</div></div>';
      gate.querySelectorAll('[data-player-mode]').forEach(function(btn){btn.onclick=function(){
        playerDifficulty=this.dataset.playerMode;playerDifficultyChosen=true;guesses=[];finished=false;gameWon=false;fhqCompetitiveStartedAt=Date.now();chooseAnswer();render();suggest();
      }});
      document.getElementById('fgPrompt').textContent='Choose Easy, Medium, or Brutal.';
      document.getElementById('fgMessage').textContent='Hover a difficulty to preview its player pool.';
      return;
    }
    if(gate)gate.style.display='none';grid.style.display='';search.style.display='block';
    const h=headers();
    let html='<div class="fg-row fg-header" style="grid-template-columns:repeat('+h.length+',1fr)">'+h.map(x=>'<div class="fg-cell">'+esc(x)+'</div>').join('')+'</div>';
    guesses.forEach(function(g){
      html+='<div class="fg-row" style="grid-template-columns:repeat('+h.length+',1fr)">'+values(g).map(function(v,i){return cellHTML(g,i,v)}).join('')+'</div>';
    });
    grid.innerHTML=html;
    document.getElementById('fgPrompt').textContent=mode==='players'?'Guess the current NFL fantasy player.':'Guess the retired NFL legend.';
    document.getElementById('fgShareBtn').style.display=finished?'inline-block':'none';
  }

  function reset(forceNew){
    stopGameConfetti();closeResult();
    const input=document.getElementById('fgInput');if(input&&forceNew)input.value='';

    // Daily games persist across tabs/reloads. A completed Daily cannot be replayed until the next Pacific-midnight reset.
    if(playType==='daily'&&loadDailyState()){
      render();suggest();
      if(finished)setTimeout(showResult,120);
      return;
    }

    guesses=[];finished=false;gameWon=false;fhqUnlimitedRewarded=false;fhqUnlimitedRunId='u-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8);
    if(mode==='players'&&playType==='unlimited'&&!playerDifficultyChosen){answer=null;render();return;}
    if(mode==='grid'){if(playType==='daily'||gridDifficultyChosen)buildGrid(true);render();saveDailyState();suggest();return;}
    if(['whoami','career','higherlower','imposter','connections','statline','draftclass','moggle','leaderboard','timeline','guessteam','depthchart'].includes(mode)){setupSpecial();render();if(mode!=='leaderboard')saveDailyState();suggest();return;}
    chooseAnswer();
    document.getElementById('fgMessage').textContent='';
    render();saveDailyState();suggest();
  }

  function selectedGridCriteria(){
    if(!gridSelected)return null;
    const parts=String(gridSelected).split('-'),ri=Number(parts[0]),ci=Number(parts[1]);
    if(!Number.isFinite(ri)||!Number.isFinite(ci)||!gridRows[ri]||!gridCols[ci])return null;
    return {row:gridRows[ri],col:gridCols[ci]};
  }
  function gridCellPeople(){
    const c=selectedGridCriteria();
    if(!c)return gridGuessUniverse();
    return validGridPeople(c.row,c.col);
  }
  let fhqGridSuggestionCache=null,fhqGridSuggestionStamp='';
  function gridSuggestionMatches(q){
    const all=gridGuessUniverse();
    const stamp=all.length+'|'+(Array.isArray(players)?players.length:0);
    if(!fhqGridSuggestionCache||fhqGridSuggestionStamp!==stamp){
      const rankMap=new Map((Array.isArray(players)?players:[]).map((r,i)=>[norm(r.player||r.name),i+1]));
      fhqGridSuggestionCache=all.slice().sort(function(a,b){
        return (rankMap.get(norm(a.name))||9999)-(rankMap.get(norm(b.name))||9999) ||
          (a.historical?1:0)-(b.historical?1:0) || String(a.name).localeCompare(String(b.name));
      });
      fhqGridSuggestionStamp=stamp;
    }
    const out=[];
    for(let i=0;i<fhqGridSuggestionCache.length&&out.length<10;i++){
      const x=fhqGridSuggestionCache[i];
      if(norm(x.name).includes(q)&&!guesses.some(g=>norm(g.name)===norm(x.name)))out.push(x);
    }
    return out;
  }
  function suggestionSource(){
    if(mode==='grid')return gridGuessUniverse();
    if(mode==='whoami')return gridGuessUniverse();
    if(mode==='career')return careerGuessUniverse();
    if(mode==='statline')return activeNFLPlayers().filter(p=>p&&p.active&&!p.retired&&!p.coach);
    if(mode==='moggle')return moggleGuessPool();
    return pool();
  }
  function suggest(){
    const input=document.getElementById('fgInput'),box=document.getElementById('fgSuggestions');if(!input||!box)return;
    if(['higherlower','imposter'].includes(mode)){box.classList.remove('show');box.innerHTML='';return;}
    const q=norm(input.value);if(!q){box.classList.remove('show');box.innerHTML='';return}
    const source=mode==='grid'?null:suggestionSource();
    const matches=mode==='grid'?gridSuggestionMatches(q):source.filter(x=>norm(x.name).includes(q)&&!guesses.some(g=>norm(g.name)===norm(x.name))).slice(0,8);
    box.innerHTML=matches.map(x=>'<div class="fg-suggestion" data-name="'+esc(x.name)+'">'+
      ((mode==='players'||mode==='legends'||mode==='grid'||mode==='whoami'||mode==='moggle'||mode==='career')?photoHTML(x,'fg-player-photo'):'')+
      '<span>'+esc(x.name)+(x.team?' <small style="opacity:.65">• '+esc(x.team)+' '+esc(x.position||'')+'</small>':'')+'</span></div>').join('');
    box.classList.toggle('show',matches.length>0);
    box.querySelectorAll('.fg-suggestion').forEach(el=>el.onclick=function(){input.value=this.dataset.name;box.classList.remove('show')});
  }

  function submitClassic(){
    if(finished||!answer)return;
    const q=norm(document.getElementById('fgInput').value),g=pool().find(x=>norm(x.name)===q);
    if(!g){document.getElementById('fgMessage').textContent='Choose a valid guess from this mode.';return}
    if(guesses.some(x=>norm(x.name)===q)){document.getElementById('fgMessage').textContent='You already guessed that.';return}
    guesses.push(g);document.getElementById('fgInput').value='';document.getElementById('fgSuggestions').classList.remove('show');
    if(norm(g.name)===norm(answer.name)){
      showFeedback(true,'CORRECT!');triggerGoodFlash();
      finished=true;gameWon=true;document.getElementById('fgMessage').textContent='TOUCHDOWN! Solved in '+guesses.length+' guess'+(guesses.length===1?'':'es')+'.';
    }
    else if(guesses.length>=8){
      showFeedback(false,'WRONG!');triggerDamageFlash();
      finished=true;gameWon=false;document.getElementById('fgMessage').textContent='The answer was '+answer.name+'.';
    }
    else{
      showFeedback(false,'WRONG!');triggerDamageFlash();
      document.getElementById('fgMessage').textContent=(8-guesses.length)+' guesses remaining.';
    }
    saveDailyState();render();if(finished)setTimeout(showResult,400);
  }
  function submit(){
    if(mode==='grid')return submitGrid();
    if(mode==='whoami')return submitWhoAmI();
    if(mode==='career')return submitCareer();
    if(mode==='statline')return submitStatLine();
    if(mode==='moggle')return submitMogger();
    if(['higherlower','imposter','connections','draftclass','timeline','guessteam','depthchart'].includes(mode))return;
    submitClassic();
  }

  function resultBlocks(){
    if(mode==='grid')return Array.from({length:3},(_,r)=>Array.from({length:3},(_,c)=>gridAnswers[r+'-'+c]?'green':'red'));
    if(mode==='players'||mode==='legends')return guesses.map(g=>values(g).map((v,i)=>i===0?(norm(g.name)===norm(answer.name)?'green':'red'):closeness(g,answer,i)));
    return [];
  }
  function answerCardHTML(){
    if(mode==='grid')return '<div class="fg-answer-copy" style="text-align:center"><div class="fg-answer-name">GRID</div><div class="fg-answer-meta">'+Object.keys(gridAnswers).length+' of 9 squares filled • '+gridMisses+' misses</div></div>';
    if(mode==='whoami'){
      const a=specialState.answer;return photoHTML(a,'fg-answer-photo')+'<div class="fg-answer-copy"><div class="fg-answer-name">'+esc(a.name)+'</div><div class="fg-answer-meta">'+esc(a.position)+' • '+esc(a.team)+'</div></div>';
    }
    if(mode==='career'){
      const a=specialState.answer;
      const shownName=(specialState&&specialState.acceptedAnswer)||a.name;
      return '<div class="fg-answer-copy" style="text-align:center"><div class="fg-answer-name">'+esc(shownName)+'</div><div class="fg-answer-meta">'+esc(a.teams.join(' → '))+'</div></div>';
    }
    if(mode==='higherlower'){
      const lc=specialState.lastComparison;
      return '<div class="fg-answer-copy" style="text-align:center"><div class="fg-answer-name">🔥 STREAK '+specialState.bestStreak+'</div>'+
        '<div class="fg-answer-meta">'+(lc?esc(lc.a+' '+lc.av+' '+lc.noun+' vs '+lc.b+' '+lc.bv+' '+lc.noun):('You got '+specialState.score+' correct before the miss.'))+'</div></div>';
    }
    if(mode==='imposter'){
      const impName=specialState.correctAnswerName||(specialState.items&&specialState.items[specialState.oddIndex]&&specialState.items[specialState.oddIndex].name)||'The Imposter';
      return '<div class="fg-answer-copy" style="text-align:center">'+
        '<div class="fg-answer-name">'+esc(impName)+'</div>'+
        '<div class="fg-answer-meta">'+(gameWon?'CORRECT IMPOSTER':'THE IMPOSTER WAS')+' • '+esc(specialState.categoryText||'Football connection')+' • 🔥 Streak '+specialState.bestStreak+'</div>'+
      '</div>';
    }
    if(mode==='connections')return '<div class="fg-answer-copy" style="text-align:center"><div class="fg-answer-name">CONNECTIONS</div><div class="fg-answer-meta">'+specialState.solved.length+'/4 groups solved • '+specialState.lives+' mistakes remaining</div></div>';
    if(mode==='statline'){
      const a=specialState.answer;
      return (a?photoHTML(a,'fg-answer-photo'):'')+'<div class="fg-answer-copy" style="text-align:center"><div class="fg-answer-name">'+esc(a&&a.name?a.name:'Mystery Player')+'</div><div class="fg-answer-meta">'+(gameWon?('Solved in '+Number(specialState.elapsedSeconds||0)+'s'):'That was the stat line.')+'</div></div>';
    }
    if(mode==='draftclass'){
      const a=specialState.answer,year=playerDraftYear(a);
      return (a?photoHTML(a,'fg-answer-photo'):'')+'<div class="fg-answer-copy" style="text-align:center"><div class="fg-answer-name">'+esc(a&&a.name?a.name:'Draft Class')+'</div><div class="fg-answer-meta">'+(year?('Drafted in '+year):'Draft answer revealed')+' • Best streak '+Number(specialState.bestStreak||0)+'</div></div>';
    }
    if(mode==='moggle'){const a=specialState.answer;return photoHTML(a,'fg-answer-photo')+'<div class="fg-answer-copy"><div class="fg-answer-name">'+esc(a.name)+'</div><div class="fg-answer-meta">'+moggleDifficulty.toUpperCase()+' • 🔥 Streak '+(specialState.streak||0)+'</div></div>';}
    if(mode==='guessteam'){
      const a=specialState.answer;
      return '<div class="fg-answer-copy" style="text-align:center">'+logoHTML(a.team)+
        '<div class="fg-answer-name">'+esc(FHQ_TEAM_NAMES[a.team]||a.team)+'</div>'+
        '<div class="fg-answer-meta">'+esc(a.conference+' '+a.division)+' • 🔥 Best streak '+Number(specialState.bestStreak||0)+'</div></div>';
    }
    if(mode==='depthchart'){
      const order=(specialState.correctOrder||[]);
      return '<div class="fg-answer-copy" style="text-align:center"><div class="fg-answer-name">'+esc(FHQ_TEAM_NAMES[specialState.team]||specialState.team)+' '+esc(specialState.pos)+'</div>'+
        '<div class="fg-answer-meta">🔥 Best streak '+Number(specialState.bestStreak||0)+'</div>'+
        '<div class="fg-correct-order"><strong>CORRECT DEPTH CHART</strong>'+
        order.map((p,i)=>'<div>'+(i+1)+'. '+esc(p.name)+'</div>').join('')+'</div></div>';
    }
    if(mode==='timeline'){
      const correct=(specialState&&Array.isArray(specialState.items)?specialState.items.slice():[]).sort((a,b)=>Number(a.year)-Number(b.year));
      const sequence='<div class="fg-timeline-correct"><strong>CORRECT SEQUENCE</strong>'+correct.map((x,i)=>'<div>'+(i+1)+'. '+esc(x.label)+' <span style="color:#82919b">('+esc(String(x.year))+')</span></div>').join('')+'</div>';
      return '<div class="fg-answer-copy" style="text-align:center"><div class="fg-answer-name">'+(gameWon?'TIMELINE':'GAME OVER!')+'</div><div class="fg-answer-meta">'+
        (gameWon?'Perfect order • 🔥 Streak '+Number(specialState.streak||0):'Incorrect order • streak reset')+'</div>'+sequence+'</div>';
    }
    const meta=mode==='players'?esc(answer.position)+' • '+esc(answer.conference)+' '+esc(answer.division)+' • Age '+esc(answer.age||'—')+' • Bye '+esc(answer.bye||'—'):
      esc(answer.position)+' • '+esc(answer.era)+' • '+esc(answer.career||'NFL Legend');
    return photoHTML(answer,'fg-answer-photo')+'<div class="fg-answer-copy"><div class="fg-answer-name">'+esc(answer.name)+'</div><div class="fg-answer-meta">'+meta+'</div><div class="fg-answer-team">'+logoHTML(answer.team)+'<span>'+esc(answer.team)+'</span></div></div>';
  }
  function modeLabel(){
    return {players:'Players',grid:'Grid',legends:'Legends',whoami:'Who Am I?',career:'Career Path',higherlower:'Higher / Lower',imposter:'Imposter',connections:'Connections',statline:'Stat Line',draftclass:'Draft Class',moggle:'Mogger',leaderboard:'Leaderboard',timeline:'Timeline',guessteam:'Franchise Finder',depthchart:'Depth Chart'}[mode]||mode;
  }

  function standaloneGameSubtitle(m){
    return {
      players:'Guess the current NFL player in eight guesses.',
      grid:'Fill the NFL grid using players who match both clues.',
      legends:'Guess the retired NFL legend.',
      whoami:'Reveal clues and identify the NFL player.',
      career:'Identify the player from his NFL career path.',
      higherlower:'Build the longest correct Higher / Lower streak.',
      imposter:'Find the player who does not share the hidden connection.',
      connections:'Find four groups of four before four mistakes.',
      statline:'Identify the player from his 2025 stat line.',
      draftclass:'Guess the player’s NFL Draft class.',
      moggle:'Identify the football player from the face challenge.',
      timeline:'Put four football moments in chronological order.',
      guessteam:'Reveal progressive clues and identify the NFL franchise.',
      depthchart:'Arrange a current NFL position room in depth-chart order.'
    }[m]||'Football HQ game';
  }
  function updateStandaloneGameHeader(){
    const title=document.querySelector('#footballGameOverlay .fg-title');
    const sub=document.querySelector('#footballGameOverlay .fg-sub');
    const kicker=document.querySelector('#footballGameOverlay .fg-kicker');
    if(kicker)kicker.textContent='Football HQ';
    if(title)title.textContent=modeLabel().toUpperCase();
    if(sub)sub.textContent=standaloneGameSubtitle(mode);
  }


  function fhqCurrentUnlimitedDifficulty(){
    if(mode==='players')return playerDifficulty||'easy';
    if(mode==='grid')return gridDifficulty||'medium';
    if(mode==='draftclass')return draftDifficulty||'medium';
    if(mode==='moggle')return moggleDifficulty||'easy';
    if(mode==='imposter')return imposterDifficulty||'medium';
    if(mode==='statline')return statDifficulty||'medium';
    if(mode==='timeline')return timelineDifficulty||'medium';
    if(mode==='whoami')return 'hints-'+Number(whoHintLimit||3);
    if(mode==='guessteam')return 'clues-'+Number(teamHintLimit||4);
    return 'normal';
  }
  function fhqRewardUnlimitedWin(){
    if(playType!=='unlimited'||!gameWon||fhqUnlimitedRewarded||!fhqHasServer())return;
    fhqUnlimitedRewarded=true;if(!fhqUnlimitedRunId)fhqUnlimitedRunId='u-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8);
    const beforeCoins=fhqCachedCoins(),beforePts=fhqLastKnownLifetimePoints();
    google.script.run.withSuccessHandler(function(r){
      if(!r||!r.profile)return;const afterCoins=Number(r.profile.hqCoins)||beforeCoins,afterPts=Number(r.profile.points)||beforePts;
      fhqSetRuntimeIdentity(r.profile);fhqUpdateAccountUI(r.profile);fhqRememberLifetimePoints(afterPts);
      if(Number(r.coins)>0)fhqShowCoinAward(Number(r.coins),afterCoins);
      if(Number(r.xp)>0){fhqAnimatePointAward(Number(r.xp));fhqBalanceMessage('UNLIMITED WIN • +'+Number(r.xp)+' XP • +'+Number(r.coins||0)+' Coins',false)}
      else if(Number(r.coins)>0)fhqBalanceMessage('UNLIMITED WIN • +'+Number(r.coins)+' Coins',false);
    }).withFailureHandler(function(e){console.warn('Unlimited reward failed',e)}).submitFootballHQUnlimitedReward({
      token:fhqGetToken(),game:mode,difficulty:fhqCurrentUnlimitedDifficulty(),runId:fhqUnlimitedRunId
    });
  }

  function showResult(){
    const resultTitle=document.getElementById('fgResultTitle');
    const resultKicker=document.getElementById('fgResultKicker');
    const resultCard=document.querySelector('#fgResultOverlay .fg-result-card');
    if(resultTitle)resultTitle.textContent=gameWon?'TOUCHDOWN!':'GAME OVER';
    if(resultKicker)resultKicker.textContent=gameWon?'FOOTBALL HQ WIN':'FOOTBALL HQ RESULT';
    if(resultCard){resultCard.classList.toggle('win',!!gameWon);resultCard.classList.toggle('loss',!gameWon)}
    let sub='';
    if(mode==='grid')sub=gameWon?'You filled all 9 squares!':'You finished with '+Object.keys(gridAnswers).length+' of 9 squares.';
    else if(mode==='players'||mode==='legends')sub=gameWon?'You found the answer in '+guesses.length+' of 8 guesses.':'The answer was '+answer.name+'.';
    else if(mode==='higherlower'){
      const lc=specialState.lastComparison;
      sub=lc
        ?('GAME OVER — '+lc.a+' '+lc.av+' '+lc.noun+' vs '+lc.b+' '+lc.bv+' '+lc.noun+'.')
        :('Streak ended at '+specialState.bestStreak+'.');
    }
    else if(mode==='imposter'){
      const impName=specialState.correctAnswerName||(specialState.items&&specialState.items[specialState.oddIndex]&&specialState.items[specialState.oddIndex].name)||'the imposter';
      sub=gameWon
        ?('Correct! '+impName+' was the imposter. '+(specialState.categoryText||'Football connection')+' • Streak '+specialState.bestStreak+'.')
        :('The imposter was '+impName+'. '+(specialState.categoryText||'Football connection')+' • Streak '+specialState.bestStreak+'.');
    }
    else if(mode==='connections')sub=gameWon?'You solved all four connections!':'Connections over. You solved '+specialState.solved.length+' of 4 groups.';
    else if(mode==='statline')sub=gameWon?('Solved in '+Number(specialState.elapsedSeconds||0)+' seconds.'):('The player was '+(specialState.answer&&specialState.answer.name?specialState.answer.name:'the mystery player')+'.');
    else if(mode==='draftclass')sub='Draft Class streak ended at '+specialState.bestStreak+'.';
    else if(mode==='moggle')sub=gameWon?(playType==='daily'?'You conquered today’s Mogger.':'Mogger streak: '+Number(specialState.streak||0)+'.'):('The player was '+specialState.answer.name+'. Better luck on the next crop.');
    else if(mode==='timeline')sub=gameWon?'Timeline solved! Keep the streak alive tomorrow.':
      ('Correct order: '+((specialState.correctOrder||[]).map(x=>x.label+' ('+x.year+')').join(' → ')||'That order was incorrect.'));
    else if(mode==='guessteam')sub=gameWon?'Team identified! 🔥 Streak '+Number(specialState.streak||0)+'.':'Incorrect. The team was '+(FHQ_TEAM_NAMES[specialState.answer.team]||specialState.answer.team)+'.';
    else if(mode==='depthchart')sub=gameWon?'Depth chart solved! 🔥 Streak '+Number(specialState.streak||0)+'.':'GAME OVER! Here is the correct depth-chart order.';
    else sub=gameWon?'You got it!':'The answer was '+specialState.answer.name+'.';
    document.getElementById('fgResultSub').textContent=sub;
    const againBtn=document.getElementById('fgResultAgain');
    const shareBtn=document.getElementById('fgResultShare');
    if(againBtn)againBtn.textContent=(mode==='higherlower'||mode==='imposter'||mode==='draftclass'||mode==='moggle'||mode==='guessteam'||mode==='depthchart')?'↻ RESTART':(mode==='statline'?'NEXT':'PLAY AGAIN');
    if(shareBtn)shareBtn.textContent=['higherlower','imposter','connections','statline','draftclass','moggle','guessteam','depthchart'].includes(mode)?'SHARE WITH FRIENDS':'SHARE RESULT';
    document.getElementById('fgAnswerCard').innerHTML=answerCardHTML();
    const stat=mode==='grid'?Object.keys(gridAnswers).length+'/9':
      (mode==='higherlower'?'🔥 '+specialState.bestStreak:
      (mode==='imposter'?'🔥 '+specialState.bestStreak:
      (mode==='connections'?specialState.solved.length+'/4':
      (mode==='statline'?'🔥 '+specialState.bestStreak:
      (mode==='draftclass'?'🔥 '+specialState.bestStreak:
      (mode==='guessteam'?'🔥 '+Number(specialState.bestStreak||specialState.streak||0):
      (mode==='depthchart'?'🔥 '+Number(specialState.bestStreak||specialState.streak||0):
      (mode==='timeline'?(gameWon?('Solved in '+Number(specialState.attempts||1)+' attempt'+(Number(specialState.attempts||1)===1?'':'s')):('Order missed • '+Number(specialState.attempts||1)+' attempt'+(Number(specialState.attempts||1)===1?'':'s'))):
      (mode==='players'||mode==='legends'?guesses.length+'/8':(specialState.guesses||0)+' guesses')))))))));
    document.getElementById('fgResultSummary').innerHTML=
      '<div class="fg-result-stat"><strong>'+esc(stat)+'</strong><span>Result</span></div>'+
      '<div class="fg-result-stat"><strong>'+esc(modeLabel())+'</strong><span>Mode</span></div>'+
      '<div class="fg-result-stat"><strong>'+esc(mode==='higherlower'?(hlSide==='defense'?'Defense':'Offense'):(playType==='daily'?'Daily':'Unlimited'))+'</strong><span>'+(mode==='higherlower'?'Mode':'Game')+'</span></div>';
    const rows=resultBlocks();
    document.getElementById('fgMiniResult').innerHTML=rows.length?rows.map(row=>'<div class="fg-mini-row">'+row.map(c=>'<span class="fg-mini-square fg-'+c+'"></span>').join('')+'</div>').join(''):'';
    const competitiveScore=(typeof guesses!=='undefined'&&Array.isArray(guesses))?guesses.length:
      (specialState&&Number.isFinite(Number(specialState.guesses))?Number(specialState.guesses):null);
    const competitiveMetric=fhqRecordCompetitiveResult(mode,!!gameWon,competitiveScore);
    if(gameWon){try{fhqCheckAchievements(window.__fhqProfileSummary||{},false)}catch(e){};fhqRewardUnlimitedWin()}
    const recordableRun=gameWon||(['higherlower','imposter','draftclass','moggle','depthchart'].includes(mode)&&competitiveMetric&&Number(competitiveMetric.score)>0);
    if(recordableRun&&competitiveMetric&&Number.isFinite(Number(competitiveMetric.score))&&fhqHasServer()){
      google.script.run
        .withSuccessHandler(function(rows){
          window.__fhqWorldBestCache=rows||{};
          fhqRenderCompetitiveStats(rows||{});
          if(fhqHasServer()){
            google.script.run
              .withSuccessHandler(function(summary){
                window.__fhqProfileSummary=summary||{};
                fhqCheckAchievements(summary||{},false);
              })
              .withFailureHandler(function(){})
              .getFootballHQProfileSummary(fhqGetToken());
          }
        })
        .withFailureHandler(function(){})
        .submitFootballHQGameBest({
          game:mode,
          token:fhqGetToken(),
          username:fhqGetUsername()||fhqGuestName(),
          score:competitiveMetric.score,
          secondary:competitiveMetric.secondary,
          direction:competitiveMetric.direction,
          secondaryDirection:competitiveMetric.secondaryDirection
        });
    }

    const overlay=document.getElementById('fgResultOverlay');overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');
    launchGameResultEffects(!!gameWon);
  }
  function fhqShareEmojiRows(){
    const blocks=resultBlocks();
    if(blocks&&blocks.length)return blocks.map(row=>row.map(c=>c==='green'?'🟩':c==='yellow'?'🟨':'⬛').join(''));
    if(mode==='grid'){
      return [0,1,2].map(r=>[0,1,2].map(c=>gridAnswers[r+'-'+c]?'🟩':'⬛').join(''));
    }
    if(mode==='connections'){
      const colors=['🟨','🟩','🟦','🟪'];
      return [0,1,2,3].map((_,i)=>i<Number(specialState.solved&&specialState.solved.length||0)?colors[i].repeat(4):'⬛⬛⬛⬛');
    }
    if(mode==='statline'){
      const n=Math.max(1,Number(specialState.history&&specialState.history.length||1));
      return [Array.from({length:Math.min(6,n)},(_,i)=>i===n-1&&gameWon?'🟩':'⬛').join('')];
    }
    if(mode==='timeline')return [gameWon?'🟩🟩🟩🟩':'⬛⬛⬛⬛'];
    if(mode==='guessteam')return [gameWon?'🟩':'⬛', '❤️'.repeat(Math.max(0,Number(specialState.lives||0)))];
    if(mode==='career'||mode==='whoami'){
      const n=Math.max(1,Number(specialState.guesses||specialState.history&&specialState.history.length||1));
      return [Array.from({length:n},(_,i)=>i===n-1&&gameWon?'🟩':'⬛').join('')];
    }
    const streak=Math.max(0,Number(specialState.bestStreak||specialState.streak||0));
    return [streak?('🟩'.repeat(Math.min(10,streak))+(streak>10?' +'+(streak-10):'')):(gameWon?'🟩':'⬛')];
  }
  function fhqShareScoreLine(){
    if(mode==='grid')return Object.keys(gridAnswers).length+'/9 • '+gridMisses+' misses';
    if(['higherlower','imposter','draftclass','moggle'].includes(mode))return 'Streak '+Math.max(Number(specialState.bestStreak||0),Number(specialState.streak||0));
    if(mode==='connections')return Number(specialState.solved&&specialState.solved.length||0)+'/4 groups';
    if(mode==='statline')return gameWon?(Number(specialState.elapsedSeconds||0)+'s'):'X/3';
    if(mode==='timeline')return gameWon?('Solved • '+Number(specialState.attempts||1)+' attempt'+(Number(specialState.attempts||1)===1?'':'s')):'X';
    if(mode==='guessteam')return gameWon?('Solved • '+Number(specialState.lives||0)+' lives left'):'X';
    if(mode==='players'||mode==='legends')return guesses.length+'/8';
    return gameWon?'Solved':'X';
  }
  function share(){
    const rows=fhqShareEmojiRows();
    const day=playType==='daily'?' '+dailyDateKey():'';
    const out='Football HQ • '+modeLabel()+day+'\n'+fhqShareScoreLine()+'\n\n'+rows.join('\n')+'\n\n🏈 Football HQ';
    if(navigator.share)navigator.share({text:out}).catch(()=>{});
    else if(navigator.clipboard){
      navigator.clipboard.writeText(out);
      const msg=document.getElementById('fgMessage');if(msg)msg.textContent='Wordle-style result copied!';
    }
  }

  function fhqPlayResultSound(success){
    try{
      const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)return;
      const ctx=new Ctx(),now=ctx.currentTime;
      const notes=success?[523.25,659.25,783.99,1046.5]:[220,174.61,130.81];
      notes.forEach(function(freq,i){
        const o=ctx.createOscillator(),g=ctx.createGain();
        o.type=success?'triangle':'sawtooth';o.frequency.value=freq;
        const t=now+i*(success?.075:.13);
        g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(success?.085:.045,t+.018);g.gain.exponentialRampToValueAtTime(.0001,t+.22);
        o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+.24);
      });
      setTimeout(()=>ctx.close().catch(()=>{}),850);
    }catch(e){}
  }
  function launchLossSkulls(){
    let layer=document.getElementById('fhqLossSkulls');
    if(!layer){layer=document.createElement('div');layer.id='fhqLossSkulls';document.body.appendChild(layer)}
    for(let i=0;i<22;i++){
      const s=document.createElement('span');s.className='fhq-loss-skull';s.textContent='💀';
      s.style.left=(3+Math.random()*94)+'vw';
      s.style.setProperty('--sx',((Math.random()-.5)*150)+'px');
      s.style.setProperty('--sr',(240+Math.random()*600)+'deg');
      s.style.animationDelay=(Math.random()*.7)+'s';
      s.style.fontSize=(20+Math.random()*18)+'px';
      layer.appendChild(s);setTimeout(()=>s.remove(),3200);
    }
    setTimeout(()=>{if(layer&&!layer.children.length)layer.remove()},3500);
  }
  function launchGameResultEffects(success){
    fhqPlayResultSound(success);
    if(success)launchGameConfetti(true);
    else{stopGameConfetti();launchLossSkulls();}
  }

  function launchGameConfetti(success){
    stopGameConfetti();
    const canvas=document.getElementById('fgConfettiCanvas');if(!canvas)return;
    const ctx=canvas.getContext('2d'),dpr=Math.max(1,window.devicePixelRatio||1);
    canvas.width=Math.floor(innerWidth*dpr);canvas.height=Math.floor(innerHeight*dpr);canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);canvas.classList.add('active');
    const palette=success?['#35b55a','#ffffff','#d6a928','#4b9bd8','#d71920']:['#7e858c','#c1c6ca','#d71920','#ffffff'];
    fgConfettiPieces=Array.from({length:success?145:85},()=>({x:Math.random()*innerWidth,y:-20-Math.random()*innerHeight*.35,w:5+Math.random()*7,h:8+Math.random()*10,vx:-1.8+Math.random()*3.6,vy:2.5+Math.random()*4.5,r:Math.random()*6.28,vr:-.12+Math.random()*.24,c:palette[Math.floor(Math.random()*palette.length)]}));
    const start=performance.now();
    function tick(now){
      ctx.clearRect(0,0,innerWidth,innerHeight);
      fgConfettiPieces.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;p.vy+=.018;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=p.c;ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore();});
      if(now-start<3300)fgConfettiFrame=requestAnimationFrame(tick);else stopGameConfetti();
    }
    fgConfettiFrame=requestAnimationFrame(tick);
  }
  function stopGameConfetti(){
    if(fgConfettiFrame)cancelAnimationFrame(fgConfettiFrame);fgConfettiFrame=null;fgConfettiPieces=[];
    const c=document.getElementById('fgConfettiCanvas');if(c){c.classList.remove('active');const ctx=c.getContext('2d');if(ctx)ctx.clearRect(0,0,c.width,c.height);}
  }
  function closeResult(){const r=document.getElementById('fgResultOverlay');if(r){r.classList.remove('open');r.setAttribute('aria-hidden','true');}stopGameConfetti();if(mode==='statline'&&specialState&&specialState.done)stopStatLineTimer();}
  function playAgain(){
    closeResult();
    if(mode==='players'){playType='unlimited';playerDifficultyChosen=false;document.getElementById('fgUnlimitedBtn').classList.add('active');document.getElementById('fgDailyBtn').classList.remove('active');reset(true);return;}
    if(mode==='grid'){playType='unlimited';gridDifficultyChosen=false;document.getElementById('fgUnlimitedBtn').classList.add('active');document.getElementById('fgDailyBtn').classList.remove('active');reset(true);return;}
    if(['higherlower','imposter','statline','draftclass','moggle','timeline','whoami','guessteam'].includes(mode)){
      playType='unlimited';
      if(mode==='whoami')whoHintChosen=false;
      if(mode==='statline')statDifficultyChosen=false;
      if(mode==='imposter')imposterDifficultyChosen=false;
      if(mode==='draftclass')draftDifficultyChosen=false;
      if(mode==='moggle')moggleDifficultyChosen=false;
      if(mode==='timeline')timelineDifficultyChosen=false;
      if(mode==='guessteam')teamHintChosen=false;
      reset(true);return;
    }
    if(playType==='daily'){
      playType='unlimited';
      document.getElementById('fgUnlimitedBtn').classList.add('active');
      document.getElementById('fgDailyBtn').classList.remove('active');
    }
    reset(true);
  }

  let fhqNFLDatabasePromise=null;
  function ensureFullNFLDatabase(){
    if(fhqNFLDatabasePromise)return fhqNFLDatabasePromise;
    fhqNFLDatabasePromise=(async function(){
      if(typeof loadSleeperPlayers==='function'){
        try{await loadSleeperPlayers();}catch(e){console.warn(e);}
      }
      fhqDepthPoolCache=null;
      fhqNFLUniverseCache=null;
      fhqGridUniverseCache=null;
      fhqGuessTeamPoolCache=null;
      fhqDepthChartPoolsCache=null;
      fhqGridMatchCache.clear();
      return true;
    })();
    return fhqNFLDatabasePromise;
  }

  function openFootballHQGame(game){
    game=String(game||'players').toLowerCase();
    const overlay=document.getElementById('footballGameOverlay');
    fhqInitFeedbackSoundObserver();
    if(!overlay)return;

    sitePage='games';
    fhqRecordGameOpen(game);
    document.body.classList.remove('admin-page','rankings-page','draft-page','leaderboard-page','home-page');
    document.body.classList.add('games-page');

    const dailyDone=savedDailyFinishedForGame(game);
    playType=gameSupportsDaily(game)?'daily':'unlimited';

    const dailyBtn=document.getElementById('fgDailyBtn');
    const unlimBtn=document.getElementById('fgUnlimitedBtn');
    if(dailyBtn)dailyBtn.classList.toggle('active',playType==='daily');
    if(unlimBtn)unlimBtn.classList.toggle('active',playType==='unlimited');

    document.querySelectorAll('.fg-mode').forEach(function(x){x.classList.remove('active')});
    const modeButton=document.querySelector('.fg-mode[data-fg-mode="'+game+'"]');
    if(modeButton)modeButton.classList.add('active');
    mode=game;
    if(mode==='grid'&&playType==='daily')gridDifficulty='medium';
    fhqCompetitiveStartedAt=Date.now();

    overlay.classList.add('open','fhq-game-page');
    overlay.setAttribute('aria-hidden','false');
    updateStandaloneGameHeader();

    try{
      reset(false);
    }catch(err){
      console.error('Football HQ initial game render failed:',game,err);
      if(game==='grid'){
        const gridBox=document.getElementById('fgGridGame');
        const weddle=document.getElementById('fgWeddleWrap');
        if(weddle)weddle.style.display='none';
        if(gridBox){
          gridBox.classList.add('show');
          gridBox.innerHTML='<div class="fg-loading" style="padding:36px;text-align:center">Grid hit a loading error. Please reopen the game.</div>';
        }
      }else{
        const special=document.getElementById('fgSpecialGame');
        if(special){
          special.classList.add('show');
          special.innerHTML='<div class="fg-loading">Loading game…</div>';
        }
      }
    }

    const needsNFL=['players','grid','whoami','higherlower','imposter','statline','draftclass','moggle','guessteam','depthchart'];
    if(needsNFL.includes(game)){
      ensureFullNFLDatabase().then(function(){
        if(mode!==game)return;
        if(game==='statline'&&!statsLoaded&&!statsLoadFailed&&typeof loadAll2025Stats==='function'){
          try{loadAll2025Stats()}catch(e){console.warn(e)}
        }
        if(game==='statline'){
          setTimeout(function(){if(mode===game)reset(true)},260);
        }else{
          try{reset(true)}catch(e){console.error('Football HQ database refresh failed:',game,e)}
        }
      }).catch(function(err){
        console.warn('NFL database unavailable; keeping local game pool.',err);
      });
    }
  }
  window.openFootballHQGame=openFootballHQGame;


  const FHQ_SOUND_PREF_KEY='footballHQSoundOnV1';let fhqLastFeedbackSoundAt=0,fhqLastFeedbackKind='';
  function fhqSoundEnabled(){try{return localStorage.getItem(FHQ_SOUND_PREF_KEY)!=='0'}catch(e){return true}}
  function fhqTone(kind){if(!fhqSoundEnabled())return;const now=Date.now();if(kind===fhqLastFeedbackKind&&now-fhqLastFeedbackSoundAt<350)return;fhqLastFeedbackKind=kind;fhqLastFeedbackSoundAt=now;try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;const c=window.__fhqAudioCtx||(window.__fhqAudioCtx=new C()),o=c.createOscillator(),g=c.createGain(),t=c.currentTime;o.connect(g);g.connect(c.destination);if(kind==='correct'){o.type='sine';o.frequency.setValueAtTime(540,t);o.frequency.exponentialRampToValueAtTime(760,t+.1);g.gain.setValueAtTime(.045,t)}else{o.type='triangle';o.frequency.setValueAtTime(190,t);o.frequency.exponentialRampToValueAtTime(125,t+.09);g.gain.setValueAtTime(.035,t)}g.gain.exponentialRampToValueAtTime(.001,t+.16);o.start(t);o.stop(t+.17)}catch(e){}}
  function fhqInitFeedbackSoundObserver(){const root=document.getElementById('footballGameOverlay');if(!root||window.__fhqFeedbackObserver)return;let ready=false;setTimeout(()=>ready=true,600);const ob=new MutationObserver(function(ms){if(!ready||!root.classList.contains('open'))return;let text='';ms.forEach(m=>{(m.addedNodes||[]).forEach(n=>text+=' '+String(n.textContent||''));if(m.type==='characterData')text+=' '+String(m.target.textContent||'')});text=text.toUpperCase();if(/\b(CORRECT|TOUCHDOWN|SOLVED|YOU GOT IT)\b/.test(text))fhqTone('correct');else if(/\b(WRONG|INCORRECT|MISS)\b/.test(text))fhqTone('incorrect')});ob.observe(root,{subtree:true,childList:true,characterData:true});window.__fhqFeedbackObserver=ob;}


  function fhqQAPlayerRecord(p){if(!p)return false;const n=String(p.name||p.player||'').trim(),t=String(p.team||p.teamAbbr||'').trim(),pos=String(p.position||p.pos||'').trim();if(!n||!t||!pos)return false;if(/^frank gore$/i.test(n))return false;return true}
  function fhqDedupePlayers(arr){const seen=new Set();return (Array.isArray(arr)?arr:[]).filter(function(p){if(!fhqQAPlayerRecord(p))return false;const k=(String(p.name||p.player)+'|'+String(p.team||p.teamAbbr)+'|'+String(p.position||p.pos)).toLowerCase();if(seen.has(k))return false;seen.add(k);return true})}
  function fhqFullDivision(conf,div){conf=String(conf||'').toUpperCase().trim();div=String(div||'').trim();if(/^(AFC|NFC)\s+/i.test(div))return div.toUpperCase().replace(/\s+/g,' ');return (conf+' '+div).trim().toUpperCase()}
  function fhqDivisionState(g,a){const gd=fhqFullDivision(g&&g.conference,g&&g.division),ad=fhqFullDivision(a&&a.conference,a&&a.division);if(gd&&ad&&gd===ad)return'green';if(String(g&&g.conference||'').toUpperCase()===String(a&&a.conference||'').toUpperCase())return'yellow';return'gray'}
  function fhqPositionSide(pos){pos=String(pos||'').toUpperCase();if(['QB','RB','FB','WR','TE','OT','OG','C','OL','G','T'].includes(pos))return'OFF';if(['DE','DT','DL','LB','ILB','OLB','CB','S','FS','SS','DB','EDGE'].includes(pos))return'DEF';if(['K','P','LS','KR','PR'].includes(pos))return'ST';return''}
  function fhqPositionState(g,a){g=String(g||'').toUpperCase();a=String(a||'').toUpperCase();if(g===a)return'green';return fhqPositionSide(g)&&fhqPositionSide(g)===fhqPositionSide(a)?'yellow':'gray'}

  function init(){
    const overlay=document.getElementById('footballGameOverlay');
    document.getElementById('footballGameLaunch').onclick=function(){
      openFootballHQGame(mode||'players');
    };
    document.getElementById('footballGameClose').onclick=function(){
      overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');closeResult();
      const gamesHub=document.getElementById('fhqGamesHub');
      const home=document.getElementById('fhqHome');
      const leader=document.getElementById('fhqLeaderboardPage');
      if(home)home.classList.add('hidden');
      if(leader)leader.classList.add('hidden');
      if(gamesHub){gamesHub.classList.remove('hidden');gamesHub.style.display='block'}
      sitePage='games';
      document.body.classList.remove('admin-page','rankings-page','draft-page','leaderboard-page','home-page');
      document.body.classList.add('games-page');
      document.querySelectorAll('[data-fhq-nav]').forEach(b=>b.classList.toggle('active',b.dataset.fhqNav==='games'));
      window.scrollTo({top:0,behavior:'smooth'});
    };
    overlay.addEventListener('click',function(e){
      // V68: clicking the dark page around a game never closes it. Only the red X closes.
      if(e.target===overlay)e.stopPropagation();
    });
    document.querySelectorAll('.fg-mode').forEach(b=>b.onclick=function(){
      document.querySelectorAll('.fg-mode').forEach(x=>x.classList.remove('active'));
      this.classList.add('active');mode=this.dataset.fgMode;updateStandaloneGameHeader();reset(true);
      if(['players','grid','higherlower','imposter','whoami','statline','draftclass','moggle'].includes(mode)){
        ensureFullNFLDatabase().then(function(){
          if(mode==='statline'&&!statsLoaded&&!statsLoadFailed&&typeof loadAll2025Stats==='function')loadAll2025Stats();
          if(mode==='statline')setTimeout(()=>reset(true),250);
        });
      }
    });
    document.getElementById('fgDailyBtn').onclick=function(){
      playType='daily';
      if(mode==='players')playerDifficultyChosen=false;
      if(mode==='grid')gridDifficultyChosen=false;
      if(mode==='whoami')whoHintChosen=false;
      if(mode==='statline')statDifficultyChosen=false;
      if(mode==='imposter')imposterDifficultyChosen=false;
      if(mode==='draftclass')draftDifficultyChosen=false;
      if(mode==='moggle')moggleDifficultyChosen=false;
      if(mode==='timeline')timelineDifficultyChosen=false;
      if(mode==='guessteam')teamHintChosen=false;
      this.classList.add('active');
      document.getElementById('fgUnlimitedBtn').classList.remove('active');
      if(mode==='grid'&&!savedDailyFinishedForGame(mode)){
        gridDifficulty='medium';gridRows=[];gridCols=[];gridAnswers={};gridSelected=null;gridMisses=0;
      }
      reset(false);
    };
    document.getElementById('fgUnlimitedBtn').onclick=function(){
      playType='unlimited';this.classList.add('active');document.getElementById('fgDailyBtn').classList.remove('active');
      if(mode==='career'){render();return;}
      if(mode==='players'){playerDifficulty='easy';playerDifficultyChosen=false;}
      if(mode==='grid'){gridDifficulty='medium';gridDifficultyChosen=false;gridRows=[];gridCols=[];gridAnswers={};gridSelected=null;gridMisses=0;}
      if(mode==='whoami')whoHintChosen=false;
      if(mode==='statline'){statDifficulty='medium';statDifficultyChosen=false;}
      if(mode==='imposter'){imposterDifficulty='medium';imposterDifficultyChosen=false;}
      if(mode==='draftclass'){draftDifficulty='medium';draftDifficultyChosen=false;}
      if(mode==='moggle'){moggleDifficulty='medium';moggleDifficultyChosen=false;}
      if(mode==='timeline'){timelineDifficulty='medium';timelineDifficultyChosen=false;}
      if(mode==='guessteam')teamHintChosen=false;
      reset(true);
    };
    document.getElementById('fgGuessBtn').onclick=submit;
    let fhqSuggestTimer=null;
    document.getElementById('fgInput').addEventListener('input',function(){
      clearTimeout(fhqSuggestTimer);
      fhqSuggestTimer=setTimeout(suggest,70);
    });
    document.getElementById('fgInput').addEventListener('keydown',e=>{if(e.key==='Enter')submit();});
    document.getElementById('fgShareBtn').onclick=share;
    document.getElementById('fgResultShare').onclick=share;
    document.getElementById('fgResultClose').onclick=closeResult;
    document.getElementById('fgResultAgain').onclick=playAgain;
    document.querySelectorAll('[data-pass-tab]').forEach(function(b){b.onclick=function(){fhqOpenPassTab(this.dataset.passTab)}});
    const levelClose=document.getElementById('fhqLevelUpClose');if(levelClose)levelClose.onclick=function(){const o=document.getElementById('fhqLevelUpOverlay');o.classList.remove('show');o.setAttribute('aria-hidden','true')};
    document.getElementById('fgResultOverlay').addEventListener('click',function(e){if(e.target.id==='fgResultOverlay')e.stopPropagation();});
    chooseAnswer();render();
    ensureFullNFLDatabase().then(function(){if(mode==='players'&&playType==='unlimited'){chooseAnswer();render();}});
  }

  function ensureSitePage(target){
    if(typeof sitePage==='undefined')return;
    sitePage=target;
    if(typeof navigateSitePage==='function')navigateSitePage();
  }

  let fhqLeaderboardPeriod='alltime';

  function fhqLocalPeriodStats(period){
    const p=getAccountProfile(),history=Array.isArray(p.history)?p.history:[];
    const today=dailyDateKey();
    const now=new Date(today+'T12:00:00');
    const day=(now.getDay()+6)%7; // Monday = 0
    const monday=new Date(now);monday.setDate(now.getDate()-day);
    const mondayKey=monday.toISOString().slice(0,10);

    let points=0,count=0;
    if(period==='alltime'){
      points=Number(p.points)||0;count=Number(p.totalDailies)||0;
    }else{
      history.forEach(function(h){
        const d=String(h.date||'');
        const include=period==='daily'?d===today:(d>=mondayKey&&d<=today);
        if(include){points+=Number(h.points)||0;count++;}
      });
    }
    return {username:fhqGetUsername()||'YOU',points:points,totalDailies:count,streakDays:Number(p.streakDays)||0,isMe:true};
  }

  function setFootballHQLeaderboardPeriod(period){
    if(!['daily','weekly','alltime'].includes(period))period='alltime';
    fhqLeaderboardPeriod=period;
    document.querySelectorAll('[data-leader-period]').forEach(function(b){
      b.classList.toggle('active',b.dataset.leaderPeriod===period);
    });
    const copy=document.getElementById('fhqLeaderboardPeriodCopy');
    const label=document.getElementById('fhqLeaderPointLabel');
    if(copy)copy.textContent=period==='daily'?'Points earned since 12:00 AM Pacific today.':
      period==='weekly'?'Points earned during the current Monday–Sunday week.':
      'Lifetime Football HQ points. These never reset.';
    if(label)label.textContent=period==='daily'?'TODAY’S POINTS':period==='weekly'?'WEEKLY POINTS':'ALL-TIME POINTS';
    renderStandaloneLeaderboard();
  }


  function fhqTodayPointsCacheKey(){
    return 'footballHQTodayPointsV1:'+(fhqGetToken()||'guest')+':'+dailyDateKey();
  }
  function fhqRememberTodayPoints(points,count){
    try{localStorage.setItem(fhqTodayPointsCacheKey(),JSON.stringify({points:Number(points)||0,count:Number(count)||0}))}catch(e){}
  }
  function fhqPrimeHomeTodayPoints(){
    try{
      const v=JSON.parse(localStorage.getItem(fhqTodayPointsCacheKey())||'null');if(!v)return;
      const p=document.getElementById('fhqPoints'),c=document.getElementById('fhqDailyCount');
      if(p)p.textContent=String(Number(v.points)||0);
      if(c){const n=Number(v.count)||0;c.textContent=n+' daily challenge'+(n===1?'':'s')+' completed today'}
    }catch(e){}
  }

  function fhqDailyServerSnapshotKey(){return 'footballHQDailyServerSnapshotV73:'+(fhqGetToken()||'guest')+':'+dailyDateKey()}
  function fhqReadDailyServerSnapshot(){return fhqReadJSON(fhqDailyServerSnapshotKey(),null)}
  function fhqWriteDailyServerSnapshot(me){if(me)fhqWriteJSON(fhqDailyServerSnapshotKey(),{points:Number(me.points)||0,totalDailies:Number(me.totalDailies)||0,streakDays:Number(me.streakDays)||0,username:String(me.username||''),completedGames:Array.isArray(me.completedGames)?me.completedGames.slice():[],savedAt:Date.now()})}
  function fhqPrimeUnifiedHomeState(){
    const snap=fhqReadDailyServerSnapshot(),profile=getAccountProfile();
    if(snap){const pts=document.getElementById('fhqPoints'),cnt=document.getElementById('fhqDailyCount');if(pts)pts.textContent=String(Number(snap.points)||0);if(cnt){const n=Number(snap.totalDailies)||0;cnt.textContent=n+' daily challenge'+(n===1?'':'s')+' completed today'}}
    const life=document.getElementById('fhqDashLifetime');if(life)life.textContent=String(Math.max(Number(profile.points)||0,fhqLastKnownLifetimePoints()));
  }

  function fhqPaintHomeDailyRank(data){
    const el=document.getElementById('fhqDailyRank');
    const homePts=document.getElementById('fhqPoints');
    const homeCount=document.getElementById('fhqDailyCount');

    const daily=data&&data.periods&&data.periods.daily?data.periods.daily:null;
    const board=daily&&Array.isArray(daily.leaderboard)?daily.leaderboard:[];
    const me=daily&&daily.me?daily.me:null;

    // V56: use the shared backend's Daily period for the Home dashboard.
    // Local storage can belong to an older browser/test identity after Admin recovery.
    if(me){
      if(homePts)homePts.textContent=String(Number(me.points)||0);
      const dailies=Number(me.totalDailies)||0;
      if(homeCount)homeCount.textContent=dailies+' daily challenge'+(dailies===1?'':'s')+' completed today';
      fhqRememberTodayPoints(Number(me.points)||0,dailies);
      fhqWriteDailyServerSnapshot(me);
      refreshFootballHQDashboard(me);
    }

    if(!el)return;
    let idx=board.findIndex(p=>p&&p.isMe);
    if(idx<0&&me){
      const meName=String(me.username||'').toLowerCase();
      idx=board.findIndex(p=>String(p&&p.username||'').toLowerCase()===meName);
    }

    el.className='fhq-daily-rank';
    if(idx<0 || !me || Number(me.points||0)<=0){
      el.textContent='Complete a Daily Challenge to enter today’s leaderboard.';
      return;
    }

    const place=idx+1;
    const suffix=place%10===1&&place%100!==11?'st':place%10===2&&place%100!==12?'nd':place%10===3&&place%100!==13?'rd':'th';
    el.textContent='You are currently '+place+suffix+' on today’s leaderboard.';
    if(place===1)el.classList.add('rank-first');
    else if(place===2)el.classList.add('rank-second');
    else if(place===3)el.classList.add('rank-third');
    else if(place<=5)el.classList.add('rank-top5');
    else if(place<=10)el.classList.add('rank-top10');
    const dashRank=document.getElementById('fhqDashRank');
    if(dashRank)dashRank.textContent='Today: #'+place+' on the leaderboard';
  }

  function fhqLifetimePointsDisplayKey(){
    const token=String(fhqGetToken()||'guest').replace(/[^a-zA-Z0-9_-]/g,'').slice(0,80);
    return 'footballHQLastKnownLifetimePointsV1:'+token;
  }
  function fhqRememberLifetimePoints(value){
    value=Number(value);
    if(!Number.isFinite(value)||value<0)return;
    try{
      const key=fhqLifetimePointsDisplayKey();
      const prev=Number(localStorage.getItem(key));
      if(!Number.isFinite(prev)||value>prev)localStorage.setItem(key,String(value));
    }catch(e){}
  }
  function fhqLastKnownLifetimePoints(){
    let remembered=0;
    try{remembered=Number(localStorage.getItem(fhqLifetimePointsDisplayKey()))||0}catch(e){}
    let profile=0;
    try{profile=Number(getAccountProfile().points)||0}catch(e){}
    return Math.max(remembered,profile);
  }
  function fhqPrimeLeaderboardPointDisplay(){
    const el=document.getElementById('fhqLeaderPoints');
    if(!el)return;
    const known=fhqLastKnownLifetimePoints();
    if(known>0)el.textContent=String(known);
  }

  function paintSharedLeaderboard(data,period){
    if(data){window.__fhqLeaderboardFull=data;fhqSaveLeaderboardSnapshot(data)}data=data||window.__fhqLeaderboardFull||fhqReadLeaderboardSnapshot()||null;
    if(data)fhqPaintHomeDailyRank(data);
    period=period||fhqLeaderboardPeriod;
    const local=fhqLocalPeriodStats(period);
    const block=data&&data.periods&&data.periods[period]?data.periods[period]:null;
    let people=block&&Array.isArray(block.leaderboard)&&block.leaderboard.length?block.leaderboard.slice():[];
    let serverMe=block&&block.me?block.me:null;

    // V41 fallback: if the backend already marked a leaderboard row as this browser,
    // use it even if an older backend response omitted block.me.
    if(!serverMe){
      serverMe=people.find(function(p){return p&&p.isMe;})||null;
    }

    // Local browser history is authoritative for this device immediately.
    // Server data is allowed to add remote users, but never roll MY visible stats backward.
    const localName=String(
      fhqGetUsername() ||
      (serverMe&&serverMe.username) ||
      local.username ||
      'YOU'
    ).trim();
    const mergedMe={
      username:localName,
      points:Math.max(Number(local.points)||0,Number(serverMe&&serverMe.points)||0,(period==='alltime'?fhqLastKnownLifetimePoints():0)),
      totalDailies:Math.max(Number(local.totalDailies)||0,Number(serverMe&&serverMe.totalDailies)||0),
      streakDays:Math.max(Number(local.streakDays)||0,Number(serverMe&&serverMe.streakDays)||0),
      avatarUrl:String(serverMe&&serverMe.avatarUrl||''),avatarEmoji:String(serverMe&&serverMe.avatarEmoji||''),
      equippedTitle:String(serverMe&&serverMe.equippedTitle||fhqEquippedTitle()||FHQ_STARTER_TITLE),
      equippedRing:String(serverMe&&serverMe.equippedRing||window.__fhqCosmetics&&window.__fhqCosmetics.ring||''),
      equippedBanner:String(serverMe&&serverMe.equippedBanner||window.__fhqCosmetics&&window.__fhqCosmetics.banner||''),
      level:Number(serverMe&&serverMe.level)||fhqLevelInfo(Math.max(Number(local.points)||0,Number(serverMe&&serverMe.points)||0)).level,
      isMe:true
    };

    const myKeys=new Set([localName.toLowerCase(),'you']);
    if(serverMe&&serverMe.username)myKeys.add(String(serverMe.username).toLowerCase());

    people=people.filter(function(p){
      const name=String((p&&p.username)||'').trim();
      if(!name)return false;
      return !p.isMe&&!myKeys.has(name.toLowerCase());
    });
    people.push(mergedMe);

    // Remove old duplicate guests and duplicate usernames, keeping the strongest record.
    const byName=new Map();
    people.forEach(function(p){
      const name=String((p&&p.username)||'').trim();if(!name)return;
      const pts=Number(p.points)||0,dailies=Number(p.totalDailies)||0;
      if(/^Guest-/i.test(name)&&pts<=0&&dailies<=0&&!p.isMe)return;
      const key=name.toLowerCase(),prev=byName.get(key);
      if(!prev||pts>Number(prev.points||0)||dailies>Number(prev.totalDailies||0)||p.isMe)byName.set(key,p);
    });
    people=Array.from(byName.values()).sort(function(a,b){
      return (Number(b.points)||0)-(Number(a.points)||0) ||
             (Number(b.totalDailies)||0)-(Number(a.totalDailies)||0) ||
             String(a.username||'').localeCompare(String(b.username||''));
    });

    fhqRememberTop10(period,people);

    fhqRememberLifetimePoints(mergedMe.points);
    const total=document.getElementById('fhqLeaderPoints');
    if(total){
      const stable=period==='alltime'?Math.max(Number(mergedMe.points)||0,fhqLastKnownLifetimePoints()):Number(mergedMe.points||0);
      total.textContent=String(stable);
    }

    const podium=document.getElementById('fhqPodium');
    if(podium){
      const top3=people.slice(0,3);
      const podiumSlots=[
        top3[1]?{p:top3[1],rank:2,place:'second'}:null,
        top3[0]?{p:top3[0],rank:1,place:'first'}:null,
        top3[2]?{p:top3[2],rank:3,place:'third'}:null
      ];
      podium.innerHTML=podiumSlots.map(function(slot){
        if(!slot)return '<div></div>';
        const p=slot.p,dailyCount=Number(p.totalDailies||0);
        return '<div class="fhq-podium-card '+slot.place+' '+fhqBannerClass(p.equippedBanner)+'">'+
          '<span class="fhq-podium-rank">#'+slot.rank+'</span>'+
          fhqLeaderboardAvatarHTML(p,true)+
          '<strong>'+esc(p.isMe?'YOU':(p.username||p.name||'Player'))+'</strong>'+
          '<small class="fhq-player-title">'+fhqTitleHTML(p.equippedTitle||FHQ_STARTER_TITLE)+'</small>'+
          '<span>'+Number(p.points||0)+' points • '+dailyCount+' '+(dailyCount===1?'daily':'dailies')+'</span>'+
        '</div>';
      }).join('');
    }

    const rows=document.getElementById('fhqLeaderboardRows');
    if(rows){
      rows.innerHTML='';
      const board=people.slice();
      if(!board.length){
        const empty=document.createElement('div');empty.style.cssText='padding:28px;text-align:center;color:#70818a;font-size:10px;font-weight:900';empty.textContent='No ranked players yet.';rows.appendChild(empty);
      }else{
        board.forEach(function(p,i){
          try{
            const row=document.createElement('div');row.className='fhq-rank-row '+(i<3?'podium-duplicate':'');
            const rank=document.createElement('strong');rank.textContent='#'+(i+1);
            const player=document.createElement('span');player.className='fhq-player-with-avatar';
            player.innerHTML=fhqLeaderboardAvatarHTML(p,false)+'<span>'+esc(p.isMe?'YOU':(p.username||p.name||'Player'))+(p.isMe?' <span class="fhq-shared-badge">YOU</span>':'')+'<small class="fhq-player-title">'+fhqTitleHTML(p.equippedTitle||FHQ_STARTER_TITLE)+'</small></span>';
            const score=document.createElement('span');score.className='fhq-rank-score';score.textContent=String(Number(p.points||0));
            const dailies=document.createElement('span');dailies.className='fhq-rank-dailies';dailies.textContent=String(Number(p.totalDailies||0))+' completed';
            row.append(rank,player,score,dailies);rows.appendChild(row);
          }catch(err){
            console.warn('Leaderboard row fallback',err);
            const row=document.createElement('div');row.className='fhq-rank-row';row.innerHTML='<strong>#'+(i+1)+'</strong><span>'+esc(p.username||'Player')+'</span><span class="fhq-rank-score">'+Number(p.points||0)+'</span><span class="fhq-rank-dailies">'+Number(p.totalDailies||0)+' completed</span>';rows.appendChild(row);
          }
        });
      }
    }

    refreshFootballHQScoreDisplays();
    if(document.getElementById('fhqProfileModal')&&document.getElementById('fhqProfileModal').classList.contains('open'))fhqRenderAchievements();
  }


  function fhqLeaderboardCacheKey(){return 'footballHQLeaderboardSnapshotV80:'+String(fhqGetToken()||'guest')}
  function fhqSaveLeaderboardSnapshot(data){
    if(!data)return;
    try{localStorage.setItem(fhqLeaderboardCacheKey(),JSON.stringify({at:Date.now(),data:data}))}catch(e){}
  }
  function fhqReadLeaderboardSnapshot(){
    try{const x=JSON.parse(localStorage.getItem(fhqLeaderboardCacheKey())||'null');return x&&x.data?x.data:null}catch(e){return null}
  }
  function fhqLegacyLeaderboardToPeriods(x){
    if(!x||!Array.isArray(x.leaderboard))return null;
    return {periods:{
      alltime:{leaderboard:x.leaderboard,me:x.me||null},
      weekly:{leaderboard:x.leaderboard,me:x.me||null},
      daily:{leaderboard:x.leaderboard,me:x.me||null}
    }};
  }

  let fhqLeaderboardRequestVersion=0;
  function renderStandaloneLeaderboard(){
    closeFootballHQAdminIfNeeded();fhqPrimeLeaderboardPointDisplay();
    const requestedPeriod=fhqLeaderboardPeriod,requestVersion=++fhqLeaderboardRequestVersion,cached=window.__fhqLeaderboardPeriodsCache||fhqReadLeaderboardSnapshot();
    if(cached)paintSharedLeaderboard(cached,requestedPeriod);else paintSharedLeaderboard(null,requestedPeriod);
    if(!fhqHasServer())return;

    // Fast all-time endpoint runs in parallel so the page never waits on the heavier period query.
    try{
      google.script.run.withSuccessHandler(function(legacy){
        if(requestVersion!==fhqLeaderboardRequestVersion)return;
        const converted=fhqLegacyLeaderboardToPeriods(legacy);
        if(converted){
          const existing=window.__fhqLeaderboardPeriodsCache;
          if(existing&&existing.periods){converted.periods.daily=existing.periods.daily||converted.periods.daily;converted.periods.weekly=existing.periods.weekly||converted.periods.weekly}
          window.__fhqLeaderboardPeriodsCache=converted;fhqSaveLeaderboardSnapshot(converted);paintSharedLeaderboard(converted,requestedPeriod);
        }
      }).withFailureHandler(function(e){console.warn('Fast leaderboard endpoint unavailable.',e)}).getFootballHQLeaderboard(fhqGetToken());
    }catch(e){console.warn(e)}

    try{
      google.script.run.withSuccessHandler(function(data){
        if(requestVersion!==fhqLeaderboardRequestVersion)return;
        if(data){window.__fhqLeaderboardPeriodsCache=data;window.__fhqLeaderboardPeriodsCacheAt=Date.now();fhqSaveLeaderboardSnapshot(data);paintSharedLeaderboard(data,requestedPeriod)}
      }).withFailureHandler(function(error){console.warn('Leaderboard periods unavailable; fast all-time fallback remains active.',error)}).getFootballHQLeaderboardPeriods(fhqGetToken());
    }catch(error){console.warn('Shared leaderboard backend not deployed yet.',error)}
  }
  function fhqCompetitiveRewardIcon(item){
    if(!item)return '';
    if(item.type==='ring')return '<span class="fhq-leader-avatar '+fhqRingClass(item.value)+'">'+fhqAvatarTokenHTML(FHQ_STARTER_AVATAR)+'</span>';
    if(item.type==='banner')return '<div style="width:68px;height:48px;border-radius:8px" class="'+fhqBannerClass(item.value)+'"></div>';
    if(item.type==='avatar')return fhqAvatarTokenHTML(item.value);
    return '<span style="font-size:30px">🏷️</span>';
  }
  function fhqRenderCompetitiveRewards(){
    const root=document.getElementById('fhqCompetitiveRewards');if(!root)return;
    const c=window.__fhqCosmetics||{},items=Array.isArray(c.inventory)?c.inventory:[];
    if(!items.length){root.innerHTML='<div class="fhq-cosmetic-item" style="grid-column:1/-1;cursor:default"><strong>No competitive rewards yet</strong><span>Finish Top 10 in a completed Daily or Weekly leaderboard to earn one.</span></div>';return}
    root.innerHTML=items.slice().reverse().map(function(item){
      const equipped=(item.type==='ring'&&c.ring===item.value)||(item.type==='banner'&&c.banner===item.value)||(item.type==='title'&&fhqEquippedTitle()===item.value);
      return '<button type="button" class="fhq-cosmetic-item '+(equipped?'equipped':'')+'" data-comp-type="'+esc(item.type)+'" data-comp-value="'+esc(item.value)+'"><div style="height:45px;display:grid;place-items:center">'+fhqCompetitiveRewardIcon(item)+'</div><strong>'+esc(item.name||item.value)+'</strong><span>'+esc(item.periodLabel||item.source||'Competitive reward')+(equipped?' • EQUIPPED':'')+'</span></button>';
    }).join('');
    root.querySelectorAll('[data-comp-type]').forEach(function(b){b.onclick=function(){fhqEquipCompetitiveCosmetic(this.dataset.compType,this.dataset.compValue)}});
  }
  function fhqEquipCompetitiveCosmetic(type,value){
    const c=window.__fhqCosmetics||{},current=type==='ring'?c.ring:type==='banner'?c.banner:(type==='title'?fhqEquippedTitle():'');
    const next=current===value?'':value;if(type==='title')fhqSetEquippedTitleLocal(next||FHQ_STARTER_TITLE);if(type==='ring')c.ring=next;if(type==='banner')c.banner=next;window.__fhqCosmetics=c;fhqRenderCompetitiveRewards();renderStandaloneLeaderboard();
    if(!fhqHasServer())return;
    google.script.run.withSuccessHandler(function(profile){if(profile)fhqSetRuntimeIdentity(profile);fhqRenderCompetitiveRewards();renderStandaloneLeaderboard()}).withFailureHandler(function(e){console.warn(e)}).updateFootballHQCosmetic({token:fhqGetToken(),type:type,value:next});
  }
  let fhqPlacementQueue=[];
  function fhqShowNextPlacementReward(){
    const item=fhqPlacementQueue.shift(),overlay=document.getElementById('fhqPlacementOverlay');if(!item||!overlay)return;
    const rank=document.getElementById('fhqPlacementRank'),title=document.getElementById('fhqPlacementTitle'),copy=document.getElementById('fhqPlacementCopy'),icon=document.getElementById('fhqPlacementPrizeIcon'),name=document.getElementById('fhqPlacementPrizeName'),meta=document.getElementById('fhqPlacementPrizeMeta');
    if(rank)rank.textContent='#'+Number(item.rank||0);if(title)title.textContent=Number(item.rank)===1?'You placed 1st!':'You placed #'+item.rank+'!';
    if(copy)copy.textContent='You finished #'+item.rank+' on '+item.periodLabel+'. Here is your Football HQ prize.';if(icon)icon.innerHTML=fhqCompetitiveRewardIcon(item);if(name)name.textContent=item.name||'Competitive Reward';if(meta)meta.textContent='Added to your locker • +'+Number(item.coins||0)+' HQ Coins';
    overlay.dataset.rewardType=item.type||'';overlay.dataset.rewardValue=item.value||'';overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');try{launchGameConfetti(true)}catch(e){}
  }
  function fhqClosePlacementReward(){const overlay=document.getElementById('fhqPlacementOverlay');if(overlay){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true')}try{stopGameConfetti()}catch(e){}if(fhqPlacementQueue.length)setTimeout(fhqShowNextPlacementReward,250)}
  function fhqCheckPlacementRewards(){
    if(!fhqHasServer())return;
    google.script.run.withSuccessHandler(function(result){if(result&&result.profile){fhqSetRuntimeIdentity(result.profile);fhqUpdateAccountUI(result.profile);fhqRenderPass(result.profile);refreshFootballHQScoreDisplays()}const awards=result&&Array.isArray(result.awards)?result.awards:[];if(awards.length){fhqPlacementQueue=fhqPlacementQueue.concat(awards);fhqShowNextPlacementReward()}}).withFailureHandler(function(e){console.warn('Placement rewards unavailable',e)}).getFootballHQPlacementRewards(fhqGetToken());
  }
  function fhqPassRewardIcon(r){
    if(r&&r.type==='coins')return '<span class="fhq-pass-coin-reward"></span>';
    if(r&&r.type==='starter')return fhqAvatarTokenHTML(FHQ_STARTER_AVATAR);
    if(r.type==='avatar')return fhqAvatarTokenHTML(r.value);
    return '<span style="font-size:28px">🏷️</span>';
  }
  function fhqRenderPass(profile){
    const page=document.getElementById('fhqPassPage');if(!page)return;
    const p=profile||getAccountProfile(),points=Math.max(Number(p&&p.points)||0,fhqLastKnownLifetimePoints()),info=fhqLevelInfo(points),title=fhqEquippedTitle()||FHQ_STARTER_TITLE;
    const ids={fhqPassLevelBadge:info.level,fhqPassUsername:(p&&p.username)||fhqGetUsername()||'Guest',fhqPassLevelTitle:'Level '+info.level,fhqPassEquippedTitle:title||FHQ_STARTER_TITLE,fhqPassPoints:points,fhqPassCoins:Math.max(Number(p&&p.hqCoins)||0,Number(window.__fhqCosmetics&&window.__fhqCosmetics.coins)||0,fhqCachedCoins()),fhqPassProgressCopy:info.into+' / '+info.needed+' XP',fhqPassNextLevel:'LEVEL '+(info.level+1)};
    Object.keys(ids).forEach(function(id){const el=document.getElementById(id);if(el)el.textContent=String(ids[id])});
    const bar=document.getElementById('fhqPassProgressBar');if(bar)bar.style.width=(info.progress*100).toFixed(1)+'%';
    const av=document.getElementById('fhqPassAvatar');if(av)av.innerHTML=fhqAvatarHTML();
    const track=document.getElementById('fhqPassTrack');
    if(track){
      const max=100;let html='';
      for(let level=1;level<=max;level++){
        const rewards=fhqRewardForLevel(level),unlocked=level<=info.level,current=level===info.level;
        const rewardName=rewards.length?rewards.map(r=>esc(r.name)).join(' + '):'Level Progress';
        const icon=rewards.length?rewards.map(fhqPassRewardIcon).join(''):'<span style="font-size:15px">•</span>';
        html+='<div class="fhq-pass-reward '+(unlocked?'unlocked':'locked')+' '+(current?'current':'')+'" data-pass-level="'+level+'">'+
          '<div class="level">LEVEL '+level+'</div><div class="fhq-pass-node">'+(unlocked?'✓':level)+'</div>'+
          '<div class="fhq-pass-reward-card"><div class="reward-icon">'+icon+'</div><strong>'+rewardName+'</strong><span>'+(unlocked?'UNLOCKED':fhqPointsForLevel(level)+' XP')+'</span></div>'+
          (current?'<div class="fhq-pass-current-tag">YOU</div>':'')+'</div>';
      }
      track.innerHTML=html;
      const currentNode=track.querySelector('.fhq-pass-reward.current');
      if(currentNode)setTimeout(function(){
        const target=Math.max(0,currentNode.offsetLeft-(track.clientWidth-currentNode.offsetWidth)/2);
        track.scrollTo({left:target,behavior:'smooth'});
      },40);
    }
    const avatarGrid=document.getElementById('fhqPassAvatarRewards');if(avatarGrid){
      avatarGrid.innerHTML=FHQ_PASS_REWARDS.filter(r=>r.type==='avatar').map(function(r){const unlocked=fhqRewardUnlocked(r,points),equipped=fhqProfilePrefs().avatar===r.value&&!fhqProfilePrefs().image;return '<button type="button" class="fhq-reward-item '+(unlocked?'':'locked')+' '+(equipped?'equipped':'')+'" data-reward-avatar="'+esc(r.value)+'" '+(unlocked?'':'disabled')+'><span class="reward-preview">'+fhqAvatarTokenHTML(r.value)+'</span><strong>'+esc(r.name)+'</strong><span>Level '+r.level+(equipped?' • EQUIPPED':'')+'</span></button>'}).join('');
      avatarGrid.querySelectorAll('[data-reward-avatar]').forEach(function(b){b.onclick=function(){const pref=fhqProfilePrefs();pref.avatar=this.dataset.rewardAvatar;pref.image='';fhqSaveProfilePrefs(pref);fhqRenderPass();}});
    }
    const titleGrid=document.getElementById('fhqPassTitleRewards');if(titleGrid){
      titleGrid.innerHTML=[{level:1,type:'title',value:FHQ_STARTER_TITLE,name:FHQ_STARTER_TITLE,rarity:'common'}].concat(FHQ_PASS_REWARDS.filter(r=>r.type==='title')).map(function(r){const unlocked=r.level===1||fhqRewardUnlocked(r,points),equipped=title===r.value;return '<button type="button" class="fhq-reward-item '+(unlocked?'':'locked')+' '+(equipped?'equipped':'')+'" data-reward-title="'+esc(r.value)+'" '+(unlocked?'':'disabled')+'><span class="reward-preview">🏷️</span><strong class="fhq-title-'+esc(r.rarity||'common')+'">'+esc(r.value)+'</strong><span>Level '+r.level+(equipped?' • EQUIPPED':'')+'</span></button>'}).join('');
      titleGrid.querySelectorAll('[data-reward-title]').forEach(function(b){b.onclick=function(){fhqEquipTitle(this.dataset.rewardTitle)}});
    }
    fhqRenderCompetitiveRewards();fhqApplyLockerFilter(fhqLockerFilter);
  }
  function fhqEquipTitle(title){
    const points=Math.max(getDailyPoints(),fhqLastKnownLifetimePoints());if(!fhqUnlockedTitles(points).includes(title))return;
    fhqSetEquippedTitleLocal(title);fhqRenderPass();renderStandaloneLeaderboard();
    if(!fhqHasServer())return;
    google.script.run.withSuccessHandler(function(profile){if(profile){fhqSetRuntimeIdentity(profile);fhqUpdateAccountUI(profile)}fhqRenderPass(profile);renderStandaloneLeaderboard()}).withFailureHandler(function(e){console.warn(e)}).updateFootballHQTitle({token:fhqGetToken(),title:title});
  }

  let fhqLockerFilter='all',fhqShopFilter='all';
  const FHQ_SHOP_FALLBACK=[
    {id:'film_room_bro',type:'avatar',value:'SHOP_FILM_BRO',name:'Film Room Bro',price:450,rarity:'rare',description:'Original Football HQ film-room personality.'},
    {id:'sunday_sicko',type:'avatar',value:'SHOP_SUNDAY_SICKO',name:'Sunday Sicko',price:700,rarity:'epic',description:'For the person who watches every snap.'},
    {id:'sideline_general',type:'avatar',value:'SHOP_SIDELINE_GENERAL',name:'Sideline General',price:600,rarity:'rare',description:'Cool-headed sideline commander.'},
    {id:'fourth_down_face',type:'avatar',value:'SHOP_FOURTH_DOWN',name:'Fourth Down Face',price:850,rarity:'epic',description:'Built for fourth-and-one.'},
    {id:'snow_game',type:'avatar',value:'SHOP_SNOW_GAME',name:'Snow Game',price:950,rarity:'epic',description:'Cold-weather football energy.'},
    {id:'neon_ring',type:'ring',value:'SHOP_NEON_RING',name:'Neon Sideline Ring',price:650,rarity:'rare',description:'Electric blue avatar ring.'},
    {id:'crimson_ring',type:'ring',value:'SHOP_CRIMSON_RING',name:'Crimson Clutch Ring',price:900,rarity:'epic',description:'Dark crimson profile ring.'},
    {id:'ice_ring',type:'ring',value:'SHOP_ICE_RING',name:'Ice Blue Ring',price:1050,rarity:'epic',description:'Cold blue competitive ring.'},
    {id:'midnight_banner',type:'banner',value:'SHOP_MIDNIGHT',name:'Midnight Stadium',price:800,rarity:'rare',description:'Deep blue stadium identity banner.'},
    {id:'playoff_banner',type:'banner',value:'SHOP_PLAYOFFS',name:'Playoff Lights',price:1200,rarity:'epic',description:'Dramatic playoff-night banner.'},
    {id:'snow_banner',type:'banner',value:'SHOP_SNOW',name:'Snow Bowl',price:1300,rarity:'epic',description:'A winter football backdrop.'},
    {id:'film_sicko_title',type:'title',value:'Film Room Sicko',name:'Film Room Sicko',price:500,rarity:'rare',description:'Leaderboard title for football obsessives.'},
    {id:'sunday_legend_title',type:'title',value:'Sunday Legend',name:'Sunday Legend',price:1100,rarity:'legendary',description:'Legendary shop title.'},
    {id:'fourth_down_title',type:'title',value:'Fourth Down Merchant',name:'Fourth Down Merchant',price:750,rarity:'epic',description:'For users who live for high leverage.'},
    {id:'tape_grinder_title',type:'title',value:'Tape Grinder',name:'Tape Grinder',price:350,rarity:'uncommon',description:'A clean early-game title.'},
    {id:'press_box_pro',type:'avatar',value:'SHOP_PRESS_BOX',name:'Press Box Pro',price:520,rarity:'rare',description:'Calm analyst under stadium lights.'},
    {id:'two_minute_hero',type:'avatar',value:'SHOP_TWO_MINUTE',name:'Two-Minute Hero',price:780,rarity:'epic',description:'Built for the final drive.'},
    {id:'waiver_wizard',type:'avatar',value:'SHOP_WAIVER_WIZARD',name:'Waiver Wizard',price:680,rarity:'epic',description:'Fantasy-wire specialist.'},
    {id:'grid_grinder_face',type:'avatar',value:'SHOP_GRID_GRINDER',name:'Grid Grinder',price:560,rarity:'rare',description:'Lives for football grids.'},
    {id:'midnight_qb',type:'avatar',value:'SHOP_MIDNIGHT_QB',name:'Midnight QB',price:980,rarity:'legendary',description:'Late-night field general.'},
    {id:'film_ghost',type:'avatar',value:'SHOP_FILM_GHOST',name:'Film Ghost',price:1250,rarity:'legendary',description:'Sees everything before the snap.'},
    {id:'fourth_quarter_king',type:'avatar',value:'SHOP_Q4_KING',name:'Fourth Quarter King',price:1450,rarity:'obsidian',description:'Premium clutch avatar.'},

    {id:'teal_ring',type:'ring',value:'SHOP_TEAL_RING',name:'Teal Tempo Ring',price:420,rarity:'uncommon',description:'Clean teal profile ring.'},
    {id:'stadium_ring',type:'ring',value:'SHOP_STADIUM_RING',name:'Stadium Light Ring',price:575,rarity:'rare',description:'Bright stadium edge.'},
    {id:'victory_ring',type:'ring',value:'SHOP_VICTORY_RING',name:'Victory Ring',price:725,rarity:'rare',description:'Winning-time cyan ring.'},
    {id:'primetime_ring',type:'ring',value:'SHOP_PRIMETIME_RING',name:'Prime Time Ring',price:825,rarity:'epic',description:'Violet prime-time treatment.'},
    {id:'redzone_ring',type:'ring',value:'SHOP_REDZONE_RING',name:'Red Zone Ring',price:975,rarity:'epic',description:'Crimson red-zone edge.'},
    {id:'diamond_ring',type:'ring',value:'SHOP_DIAMOND_RING',name:'Diamond Signal Ring',price:1250,rarity:'legendary',description:'Bright premium leaderboard ring.'},
    {id:'obsidian_ring',type:'ring',value:'SHOP_OBSIDIAN_RING',name:'Obsidian Halo',price:1600,rarity:'obsidian',description:'Dark premium cyan halo.'},

    {id:'blueprint_banner',type:'banner',value:'SHOP_BLUEPRINT',name:'Playbook Blueprint',price:500,rarity:'uncommon',description:'Subtle tactical playbook banner.'},
    {id:'tunnel_banner',type:'banner',value:'SHOP_TUNNEL',name:'Tunnel Vision',price:650,rarity:'rare',description:'Walkout tunnel atmosphere.'},
    {id:'redzone_banner',type:'banner',value:'SHOP_REDZONE',name:'Red Zone Glow',price:900,rarity:'epic',description:'Crimson end-zone banner.'},
    {id:'primetime_banner',type:'banner',value:'SHOP_PRIMETIME',name:'Prime Time',price:1050,rarity:'epic',description:'Night-game stadium lights.'},
    {id:'championship_banner',type:'banner',value:'SHOP_CHAMPIONSHIP',name:'Championship Night',price:1500,rarity:'legendary',description:'Premium championship backdrop.'},

    {id:'box_score_title',type:'title',value:'Box Score Bandit',name:'Box Score Bandit',price:250,rarity:'uncommon',description:'For the stat-page regular.'},
    {id:'waiver_title',type:'title',value:'Waiver Hawk',name:'Waiver Hawk',price:300,rarity:'uncommon',description:'Always first to the wire.'},
    {id:'redzone_title',type:'title',value:'Red Zone Addict',name:'Red Zone Addict',price:450,rarity:'rare',description:'Sunday afternoon mode.'},
    {id:'grid_title',type:'title',value:'Grid Merchant',name:'Grid Merchant',price:550,rarity:'rare',description:'Knows the obscure intersections.'},
    {id:'clock_title',type:'title',value:'Clock Manager',name:'Clock Manager',price:600,rarity:'rare',description:'Never wastes a timeout.'},
    {id:'primetime_title',type:'title',value:'Prime Time Player',name:'Prime Time Player',price:850,rarity:'epic',description:'Made for the lights.'},
    {id:'film_room_title',type:'title',value:'Film Room General',name:'Film Room General',price:900,rarity:'epic',description:'Sees the whole field.'},
    {id:'clutch_title',type:'title',value:'Ice In The Veins',name:'Ice In The Veins',price:1000,rarity:'epic',description:'Late-game calm.'},
    {id:'oracle_shop_title',type:'title',value:'Sunday Oracle',name:'Sunday Oracle',price:1350,rarity:'legendary',description:'Premium football-brain title.'}

  ];
  const FHQ_PACK_FALLBACK=[
    {id:'rookie_cards',name:'Rookie Card Pack',price:90,count:3,rarity:'common',art:'starter',odds:'standard',category:'card',guaranteeLabel:'3 CARDS',description:'3 collection cards • Build your first Football HQ sets.'},
    {id:'sunday_pack',name:'Sunday Survivor Pack',price:180,count:4,rarity:'rare',art:'sunday',odds:'sunday',category:'card',guaranteeLabel:'1 RARE+ GUARANTEED',description:'4 Sunday Survivor cards • 1 Rare-or-better guaranteed.'},
    {id:'avatar_pack',name:'Avatar Pack',price:240,count:1,rarity:'rare',art:'avatar',category:'avatar',guaranteeLabel:'1 UNOWNED AVATAR',description:'1 random unowned Football HQ avatar.'},
    {id:'primetime_pack',name:'Prime Time Pack',price:325,count:4,rarity:'epic',art:'primetime',odds:'primetime',category:'card',guaranteeLabel:'1 RARE+ GUARANTEED',description:'4 collection cards • 1 Rare-or-better guaranteed.'},
    {id:'elite_pack',name:'Elite Card Pack',price:650,count:5,rarity:'legendary',art:'elite',odds:'elite',category:'card',guaranteeLabel:'2 RARE+ GUARANTEED',description:'5 collection cards • 2 Rare-or-better guaranteed.'}
  ];
  function fhqApplyLockerFilter(f){
    fhqLockerFilter=f||'all';
    document.querySelectorAll('[data-locker-filter]').forEach(b=>b.classList.toggle('active',b.dataset.lockerFilter===fhqLockerFilter));
    document.querySelectorAll('[data-locker-section]').forEach(function(s){
      const k=s.dataset.lockerSection,show=fhqLockerFilter==='all'||k===fhqLockerFilter||(k==='competitive'&&['ring','banner','title','avatar'].includes(fhqLockerFilter));
      s.classList.toggle('hidden-by-filter',!show);
      if(k==='competitive')s.querySelectorAll('[data-comp-type]').forEach(b=>b.style.display=(fhqLockerFilter==='all'||b.dataset.compType===fhqLockerFilter)?'':'none');
    });
  }



  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){
      const o=document.getElementById('fhqOddsOverlay');if(o&&o.classList.contains('open'))fhqClosePackOdds();
    }
  });

  function fhqBindV79Controls(){
    const packClose=document.getElementById('fhqPackClose');if(packClose)packClose.onclick=fhqClosePack;
    const oddsClose=document.getElementById('fhqOddsClose');if(oddsClose)oddsClose.onclick=function(e){e.preventDefault();e.stopPropagation();fhqClosePackOdds()};
    const oddsOverlay=document.getElementById('fhqOddsOverlay');if(oddsOverlay)oddsOverlay.onclick=function(e){if(e.target===oddsOverlay)fhqClosePackOdds()};
    const welcomeClaim=document.getElementById('fhqWelcomeClaim');if(welcomeClaim)welcomeClaim.onclick=fhqClaimWelcome;
    const purchaseYes=document.getElementById('fhqPurchaseYes'),purchaseNo=document.getElementById('fhqPurchaseNo'),purchaseOverlay=document.getElementById('fhqPurchaseOverlay');
    if(purchaseYes)purchaseYes.onclick=fhqConfirmPurchase;if(purchaseNo)purchaseNo.onclick=fhqClosePurchaseConfirm;if(purchaseOverlay)purchaseOverlay.onclick=function(e){if(e.target===purchaseOverlay)fhqClosePurchaseConfirm()};
    document.querySelectorAll('[data-locker-page-filter]').forEach(function(b){
      b.onclick=function(e){
        e.preventDefault();e.stopPropagation();
        fhqLockerPageFilter=this.dataset.lockerPageFilter||'all';
        document.querySelectorAll('[data-locker-page-filter]').forEach(x=>x.classList.toggle('active',x===this));
        fhqRenderLocker();
      };
    });
    document.querySelectorAll('[data-locker-filter]').forEach(function(b){b.onclick=function(){fhqApplyLockerFilter(this.dataset.lockerFilter||'all')}});
    const dg=document.getElementById('fhqDailyGiftBtn'),fp=document.getElementById('fhqFreePackBtn'),dgc=document.getElementById('fhqDailyGiftClose');
    if(dg)dg.onclick=function(){fhqClaimDailyReward('gift')};
    if(fp)fp.onclick=function(){fhqClaimDailyReward('pack')};
    if(dgc)dgc.onclick=function(){document.getElementById('fhqDailyGiftOverlay')?.classList.remove('open')};
  }

  function fhqShopAvatarPreview(i){
    const id=String(i&&i.id||''),value=String(i&&i.value||'');
    const tokenById={
      film_room_bro:'SHOP_FILM_BRO',sunday_sicko:'SHOP_SUNDAY_SICKO',
      sideline_general:'SHOP_SIDELINE_GENERAL',fourth_down_face:'SHOP_FOURTH_DOWN',
      snow_game:'SHOP_SNOW_GAME',press_box_pro:'SHOP_PRESS_BOX',two_minute_hero:'SHOP_TWO_MINUTE',
      waiver_wizard:'SHOP_WAIVER_WIZARD',grid_grinder_face:'SHOP_GRID_GRINDER',midnight_qb:'SHOP_MIDNIGHT_QB',
      film_ghost:'SHOP_FILM_GHOST',fourth_quarter_king:'SHOP_Q4_KING'
    };
    const token=tokenById[id]||value;
    const art=fhqRewardAvatarSVG(token);
    return '<span class="fhq-shop-avatar-card">'+(art||fhqRewardAvatarSVG(FHQ_STARTER_AVATAR))+'</span>';
  }

  function fhqShopPreview(i){if(i.type==='avatar')return fhqShopAvatarPreview(i);if(i.type==='ring')return '<span class="fhq-leader-avatar '+fhqRingClass(i.value)+'">'+fhqAvatarTokenHTML(FHQ_STARTER_AVATAR)+'</span>';if(i.type==='banner')return '<div style="width:90%;height:65px;border-radius:10px" class="'+fhqBannerClass(i.value)+'"></div>';return '<span class="'+(i.rarity==='legendary'?'fhq-title-legendary':'fhq-title-rare')+'" style="font-size:16px;font-weight:1000">'+esc(i.value)+'</span>'}

  function fhqCardPalette(r){
    const m={common:['#617786','#173143','#8fa5b2'],uncommon:['#27927f','#133c38','#68d3bd'],rare:['#287fbd','#112f4d','#65c3f4'],epic:['#7650ad','#281943','#b386ef'],legendary:['#a97d18','#3c2e0c','#f2cd64'],obsidian:['#151018','#050609','#ff4f9f'],signature:['#e7e1d5','#151515','#2e80ff']};return m[r]||m.common;
  }
  function fhqCardObject(name){
    name=String(name||'').toLowerCase();
    if(name.includes('couch')||name.includes('sleeper'))return 'couch';
    if(name.includes('watch')||name.includes('stat')||name.includes('film'))return 'screen';
    if(name.includes('remote'))return 'remote';
    if(name.includes('snack'))return 'snack';
    if(name.includes('waiver')||name.includes('trade')||name.includes('value'))return 'clipboard';
    if(name.includes('route')||name.includes('drive')||name.includes('hail'))return 'route';
    if(name.includes('coverage')||name.includes('blitz')||name.includes('stand')||name.includes('pick'))return 'shield';
    if(name.includes('clock')||name.includes('overtime')||name.includes('two-minute'))return 'clock';
    if(name.includes('draft')||name.includes('sleeper')||name.includes('stash'))return 'board';
    if(name.includes('oracle')||name.includes('wizard')||name.includes('artist'))return 'oracle';
    if(name.includes('snow'))return 'snow';
    if(name.includes('kick'))return 'upright';
    if(name.includes('coin'))return 'coin';
    if(name.includes('redzone')||name.includes('goal line'))return 'endzone';
    if(name.includes('winner')||name.includes('championship'))return 'trophy';
    return 'player';
  }
  function fhqCardScene(kind,p){
    const a=p[0],b=p[1],c=p[2],white='#eefaff';
    if(kind==='couch')return '<path d="M15 64V40c0-7 7-11 13-7l8 5 8-5c6-4 13 0 13 7v24" fill="'+a+'" stroke="'+c+'" stroke-width="2"/><path d="M11 50h50v15H11z" fill="'+b+'" stroke="'+c+'" stroke-width="2"/><path d="M22 31 17 18l8-8 8 10 3-12 7 12 8-10 5 10-7 13" fill="'+c+'" opacity=".9"/><path d="M21 65v6m30-6v6" stroke="'+white+'" stroke-width="3"/>';
    if(kind==='screen')return '<rect x="11" y="13" width="50" height="35" rx="5" fill="'+b+'" stroke="'+c+'" stroke-width="2"/><path d="M17 39 27 28l8 6 10-13 10 10" fill="none" stroke="'+c+'" stroke-width="3"/><path d="M31 49v10h10V49M23 61h26" stroke="'+white+'" stroke-width="2"/>';
    if(kind==='remote')return '<rect x="24" y="8" width="24" height="58" rx="8" fill="'+b+'" stroke="'+c+'" stroke-width="3"/><circle cx="36" cy="21" r="7" fill="'+a+'"/><circle cx="31" cy="39" r="3" fill="'+white+'"/><circle cx="41" cy="39" r="3" fill="'+c+'"/><path d="M29 50h14M29 56h14" stroke="'+c+'" stroke-width="2"/>';
    if(kind==='snack')return '<path d="M20 26h32l-5 41H25z" fill="'+a+'" stroke="'+c+'" stroke-width="2"/><path d="M18 26h36l-5-10H23z" fill="'+c+'"/><circle cx="31" cy="42" r="5" fill="#f0c667"/><circle cx="43" cy="49" r="5" fill="#dc8554"/>';
    if(kind==='clipboard')return '<rect x="17" y="12" width="38" height="54" rx="5" fill="'+b+'" stroke="'+c+'" stroke-width="2"/><rect x="27" y="8" width="18" height="10" rx="4" fill="'+a+'" stroke="'+white+'"/><path d="M24 31h24M24 41h18M24 51h22" stroke="'+c+'" stroke-width="3"/><path d="m44 55 5 5 9-13" fill="none" stroke="'+white+'" stroke-width="3"/>';
    if(kind==='route')return '<path d="M13 62c12 0 12-20 24-20s12-20 24-20" fill="none" stroke="'+c+'" stroke-width="4" stroke-dasharray="5 4"/><circle cx="13" cy="62" r="5" fill="'+white+'"/><circle cx="37" cy="42" r="5" fill="'+a+'"/><path d="m54 17 8 5-8 5" fill="none" stroke="'+white+'" stroke-width="3"/><path d="M18 17c8-8 25-8 33 0" stroke="'+a+'" stroke-width="5"/>';
    if(kind==='shield')return '<path d="M36 7 59 15v20c0 17-9 27-23 34-14-7-23-17-23-34V15z" fill="'+b+'" stroke="'+c+'" stroke-width="3"/><path d="m23 37 9 9 18-21" fill="none" stroke="'+white+'" stroke-width="4"/>';
    if(kind==='clock')return '<circle cx="36" cy="37" r="26" fill="'+b+'" stroke="'+c+'" stroke-width="3"/><path d="M36 18v20l13 8" fill="none" stroke="'+white+'" stroke-width="4" stroke-linecap="round"/><path d="M29 8h14" stroke="'+c+'" stroke-width="4"/>';
    if(kind==='board')return '<rect x="9" y="12" width="54" height="52" rx="5" fill="'+b+'" stroke="'+c+'" stroke-width="2"/><path d="M14 25h44M14 38h44M14 51h44M27 17v42M44 17v42" stroke="'+a+'" stroke-width="2"/><circle cx="36" cy="32" r="6" fill="'+c+'"/>';
    if(kind==='oracle')return '<circle cx="36" cy="28" r="18" fill="'+a+'" stroke="'+c+'" stroke-width="3"/><path d="M16 66c3-17 11-25 20-25s17 8 20 25" fill="'+b+'" stroke="'+c+'" stroke-width="2"/><path d="m25 20 5-8 6 7 6-7 5 8" fill="none" stroke="'+white+'" stroke-width="3"/><circle cx="30" cy="28" r="2" fill="'+white+'"/><circle cx="42" cy="28" r="2" fill="'+white+'"/>';
    if(kind==='snow')return '<path d="M36 8v56M12 22l48 28M60 22 12 50" stroke="'+c+'" stroke-width="4"/><circle cx="36" cy="36" r="8" fill="'+white+'"/><path d="M14 64c12-15 32-15 44 0" fill="'+a+'" opacity=".7"/>';
    if(kind==='upright')return '<path d="M19 11v28c0 8 7 13 17 13s17-5 17-13V11M36 52v16" fill="none" stroke="'+c+'" stroke-width="5"/><path d="M28 30c5-7 13-7 18 0-1 8-5 12-9 12-5 0-8-4-9-12Z" fill="'+a+'"/>';
    if(kind==='coin')return '<circle cx="36" cy="36" r="27" fill="'+a+'" stroke="'+c+'" stroke-width="4"/><circle cx="36" cy="36" r="18" fill="'+b+'" stroke="'+white+'" stroke-width="2"/><text x="36" y="41" text-anchor="middle" fill="'+white+'" font-size="14" font-weight="1000">HQ</text>';
    if(kind==='endzone')return '<rect x="10" y="12" width="52" height="54" rx="5" fill="'+b+'" stroke="'+c+'" stroke-width="2"/><path d="M19 17v44M29 17v44M39 17v44M49 17v44" stroke="'+a+'" stroke-width="3"/><text x="36" y="43" text-anchor="middle" fill="'+white+'" font-size="10" font-weight="1000">RED ZONE</text>';
    if(kind==='trophy')return '<path d="M23 12h26v17c0 12-5 19-13 22-8-3-13-10-13-22Z" fill="'+a+'" stroke="'+c+'" stroke-width="3"/><path d="M23 18H12c0 12 5 19 15 20M49 18h11c0 12-5 19-15 20M36 51v10M24 65h24" fill="none" stroke="'+white+'" stroke-width="3"/>';
    return '<circle cx="36" cy="21" r="11" fill="'+a+'" stroke="'+c+'" stroke-width="2"/><path d="M14 67c3-22 11-34 22-34s19 12 22 34" fill="'+b+'" stroke="'+c+'" stroke-width="2"/><path d="M24 17c5-9 19-9 24 0" stroke="'+white+'" stroke-width="3"/><path d="M22 47h28" stroke="'+c+'" stroke-width="4"/>';
  }
 
 function fhqV832RichScene(card,p){
   const name=String(card&&card.name||'HQ Card'), setName=String(card&&card.set||'Football HQ');
   const n=name.toLowerCase(), s=setName.toLowerCase();
   const c=p[2], c2=p[1], dark='#07131c', white='#eefaff';

   function frame(body,extras){
     return '<g>'+body+(extras||'')+'</g>';
   }
   function person(accent,prop){
     return '<g transform="translate(15 11)">'+
       '<circle cx="22" cy="13" r="9" fill="'+accent+'" stroke="'+white+'" stroke-opacity=".65" stroke-width="1.2"/>'+
       '<path d="M7 56q3-29 15-29t15 29" fill="'+c2+'" stroke="'+c+'" stroke-width="1.6"/>'+
       '<path d="M9 38h26" stroke="'+white+'" stroke-opacity=".5" stroke-width="1"/>'+
       (prop||'')+
     '</g>';
   }
   function board(lines){
     lines=lines||3;
     let l='';
     for(let i=0;i<lines;i++)l+='<path d="M8 '+(11+i*9)+'h32" stroke="'+(i%2?white:c)+'" stroke-opacity="'+(i%2?'.55':'.9')+'" stroke-width="2.5" stroke-linecap="round"/>';
     return '<g transform="translate(15 20)"><rect width="48" height="40" rx="5" fill="'+dark+'" stroke="'+c+'" stroke-width="1.5"/>'+l+'</g>';
   }
   function badge(symbol){
     return '<g transform="translate(17 15)"><path d="M19 0 38 8v17q0 15-19 26Q0 40 0 25V8Z" fill="'+c2+'" stroke="'+c+'" stroke-width="2"/><text x="19" y="30" text-anchor="middle" fill="'+white+'" font-size="16" font-weight="1000">'+symbol+'</text></g>';
   }
   function monster(){
     return '<g transform="translate(8 8)"><path d="M9 51V23Q9 6 27 6t18 17v28" fill="'+c2+'" stroke="'+c+'" stroke-width="2.5"/><path d="M16 4 21 15M38 4 33 15" stroke="'+c+'" stroke-width="4"/><circle cx="21" cy="25" r="3" fill="'+white+'"/><circle cx="34" cy="25" r="3" fill="'+white+'"/><path d="M19 38h18" stroke="'+white+'" stroke-width="2.5"/><path d="m12 55-7 10m39-10 7 10" stroke="'+c+'" stroke-width="3"/></g>';
   }

   // Specific personality cards get literal, relatable illustrations.
   if(n==='couch dweller'){
     return frame('<g transform="translate(6 15)"><rect x="4" y="27" width="58" height="27" rx="8" fill="'+c2+'" stroke="'+c+'" stroke-width="2.4"/><rect x="10" y="18" width="19" height="18" rx="5" fill="'+dark+'" stroke="'+white+'" stroke-opacity=".45"/><rect x="37" y="18" width="19" height="18" rx="5" fill="'+dark+'" stroke="'+white+'" stroke-opacity=".45"/><path d="M10 54v10m46-10v10" stroke="'+c+'" stroke-width="3"/><circle cx="32" cy="41" r="5" fill="#f2c766"/><path d="M29 41h6" stroke="'+dark+'" stroke-width="1.5"/></g>');
   }
   if(n==='the watcher'){
     return frame(person('#d7a47a','<g transform="translate(34 10)"><rect width="24" height="17" rx="2" fill="'+dark+'" stroke="'+c+'" stroke-width="1.3"/><rect y="22" width="24" height="17" rx="2" fill="'+dark+'" stroke="'+c+'" stroke-width="1.3"/><circle cx="12" cy="8" r="3" fill="'+c+'"/><circle cx="12" cy="30" r="3" fill="'+c+'"/></g>'));
   }
   if(n==='sunday sleeper'){
     return frame('<g transform="translate(9 15)"><rect x="0" y="27" width="54" height="28" rx="6" fill="'+c2+'" stroke="'+c+'" stroke-width="2"/><circle cx="18" cy="29" r="9" fill="#d7a47a"/><path d="M26 30q18 3 23 19" stroke="'+white+'" stroke-width="8" opacity=".65"/><text x="43" y="19" fill="'+c+'" font-size="13" font-weight="900">Z</text><text x="51" y="10" fill="'+c+'" font-size="9" font-weight="900">Z</text></g>');
   }
   if(n.includes('redzone')){
     return frame('<g transform="translate(12 9)"><rect x="3" y="5" width="48" height="54" rx="5" fill="'+dark+'" stroke="'+c+'" stroke-width="2"/><path d="M12 10v44m10-44v44m10-44v44m10-44v44" stroke="'+c+'" stroke-width="3"/><rect x="0" y="26" width="54" height="14" rx="3" fill="'+c2+'" stroke="'+white+'" stroke-opacity=".6"/><text x="27" y="36" text-anchor="middle" fill="'+white+'" font-size="7" font-weight="1000">RED ZONE</text></g>');
   }
   if(n.includes('waiver')){
     return frame('<g transform="translate(14 10)"><rect x="4" y="4" width="43" height="54" rx="5" fill="'+dark+'" stroke="'+c+'" stroke-width="2"/><rect x="14" y="0" width="23" height="8" rx="3" fill="'+c2+'" stroke="'+white+'" stroke-width="1"/><path d="M12 19h25M12 29h25M12 39h18" stroke="'+c+'" stroke-width="3" stroke-linecap="round"/><path d="m30 48 7 7 13-15" stroke="'+white+'" stroke-width="3" fill="none"/></g>');
   }
   if(n.includes('fourth-quarter') || n.includes('believer')){
     return frame(person('#a57bd9','<path d="M12 7q10-9 20 0" stroke="'+white+'" stroke-width="3" fill="none"/><path d="M7 46h30" stroke="'+c+'" stroke-width="4"/>'));
   }
   if(n.includes('stat checker')){
     return frame('<g transform="translate(9 13)"><rect x="6" y="4" width="47" height="40" rx="5" fill="'+dark+'" stroke="'+c+'" stroke-width="2"/><path d="M12 34 24 25l10 6 13-17" stroke="'+c+'" stroke-width="4" fill="none"/><path d="M20 44v13m19-13v13M13 58h34" stroke="'+white+'" stroke-width="3"/></g>');
   }
   if(n.includes('iron couch')){
     return frame('<g transform="translate(4 8)"><path d="M11 27V17q0-11 12-11h23q12 0 12 11v10" fill="'+c2+'" stroke="'+c+'" stroke-width="2.8"/><rect x="4" y="27" width="61" height="27" rx="7" fill="#0c1820" stroke="'+c+'" stroke-width="2.4"/><path d="M10 27 17 12l9-5 9 8 9-8 9 5 7 15M15 54v10m40-10v10" stroke="'+c+'" stroke-width="3" fill="none"/><path d="m22 8 4-8 6 7 5-7 6 8 7-5-2 12H24L21 3Z" fill="'+c+'" stroke="'+white+'" stroke-opacity=".45"/><rect x="10" y="36" width="14" height="8" rx="3" fill="#08131b"/><circle cx="17" cy="40" r="1.5" fill="'+c+'"/><rect x="45" y="36" width="14" height="8" rx="3" fill="#08131b"/><path d="M48 40h8" stroke="'+c+'" stroke-width="1.5"/></g>');
   }

   if(s.includes('fantasy nightmare')) return frame(monster(),'<path d="M3 67 18 50 30 60 47 40 66 57" stroke="'+c+'" stroke-width="3" fill="none" opacity=".75"/>');
   if(s.includes('superstition')) return frame(badge('★'),'<circle cx="57" cy="18" r="8" fill="#e9c758"/><path d="M54 18h6M57 15v6" stroke="'+dark+'" stroke-width="1.5"/>');
   if(s.includes('tailgate')) return frame('<g transform="translate(8 11)"><rect x="5" y="26" width="50" height="25" rx="5" fill="'+c2+'" stroke="'+c+'" stroke-width="2"/><path d="M10 26q0-18 20-18t20 18M12 34h36M14 51l-5 12m43-12 5 12" stroke="'+white+'" stroke-width="2" fill="none"/><circle cx="21" cy="39" r="5" fill="#e67652"/><circle cx="38" cy="39" r="5" fill="#efc65b"/></g>');
   if(s.includes('commissioner')) return frame(person('#9d7ae6','<rect x="5" y="38" width="34" height="18" rx="3" fill="'+dark+'" stroke="'+c+'" stroke-width="1.5"/><path d="M10 44h24M10 49h17" stroke="'+white+'" stroke-width="1.5"/>'));
   if(s.includes('hall of hq')) return frame('<g transform="translate(8 7)"><path d="M28 0 52 10v22q0 18-24 31Q4 50 4 32V10Z" fill="'+c2+'" stroke="'+c+'" stroke-width="2.8"/><text x="28" y="35" text-anchor="middle" fill="'+white+'" font-size="17" font-weight="1000">HQ</text><path d="M13 61h30" stroke="'+c+'" stroke-width="3"/></g>');
   if(s.includes('war room')) return frame(board(4),'<path d="M9 67 23 53 34 59 49 42 64 48" stroke="'+c+'" stroke-width="2.5" fill="none"/>');
   if(s.includes('gridiron iq')) return frame(board(3),'<circle cx="58" cy="17" r="7" fill="'+c2+'" stroke="'+c+'" stroke-width="1.5"/><path d="M58 13v8m-4-4h8" stroke="'+white+'" stroke-width="1.5"/>');
   if(s.includes('game day moments')) return frame(badge('!'),'<path d="M5 67Q28 48 67 58" stroke="'+c+'" stroke-width="3" fill="none"/>');

   return frame(person('#d5a077','<circle cx="48" cy="46" r="10" fill="'+dark+'" stroke="'+c+'" stroke-width="1.8"/><path d="M43 46h10M48 41v10" stroke="'+white+'" stroke-width="1.4"/>'));
 }

 function fhqV833SetIcon(setName){
   const s=String(setName||'').toLowerCase();
   if(s.includes('sunday'))return '☀';
   if(s.includes('gridiron'))return '⌁';
   if(s.includes('moment'))return '⚡';
   if(s.includes('war room'))return '⌂';
   if(s.includes('nightmare'))return '☠';
   if(s.includes('superstition'))return '★';
   if(s.includes('tailgate'))return '♨';
   if(s.includes('commissioner'))return 'C';
   if(s.includes('hall'))return 'HQ';
   return 'HQ';
 }



 function fhqV836SceneType(card){
   const n=String(card&&card.name||'').toLowerCase();
   if(/couch|recliner|blanket|seat|sleeper|watcher/.test(n)) return 'couch';
   if(/waiver|trade|draft|lineup|roster|projection|fantasy|gm|commission|commish/.test(n)) return 'manager';
   if(/red.?zone|screen|stat|score|film|coverage|all-22|route|formation|tape/.test(n)) return 'screens';
   if(/coach|coordinator|headset|playcaller|audible|captain|general/.test(n)) return 'coach';
   if(/chef|food|snack|wing|pizza|nacho|grill|dip/.test(n)) return 'food';
   if(/snow|rain|storm|cold|frozen|blizzard|weather|poncho|wind/.test(n)) return 'weather';
   if(/clock|two.minute|fourth.quarter|overtime|clutch|walk.off|comeback/.test(n)) return 'clutch';
   if(/king|legend|icon|founder|champion|immortal|royal|mayor/.test(n)) return 'royalty';
   if(/goblin|gremlin|demon|phantom|creature|beast|troll/.test(n)) return 'creature';
   if(/ref|penalty|rulebook|lawyer|judge/.test(n)) return 'official';
   if(/stadium|section|aisle|jumbotron|tunnel|home field/.test(n)) return 'stadium';
   return 'fan';
 }

 function fhqV836Person(x,y,scale,pose,accent){
   scale=scale||1; pose=pose||'sit';
   let body='',arms='';
   if(pose==='sit'){
     body='<path d="M-18 2q18-11 36 0l6 37h-48Z" fill="#151a1f"/>';
     arms='<path d="M-15 8-27 28M15 8 27 28" stroke="#151a1f" stroke-width="9" stroke-linecap="round"/>';
   }else if(pose==='up'){
     body='<path d="M-17 1q17-10 34 0l5 38h-44Z" fill="#151a1f"/>';
     arms='<path d="M-14 7-31-20M14 7 31-20" stroke="#151a1f" stroke-width="9" stroke-linecap="round"/>';
   }else if(pose==='lean'){
     body='<path d="M-18 0q18-10 36 0l7 40h-50Z" fill="#151a1f"/>';
     arms='<path d="M-15 8-28 24M15 8 29 18" stroke="#151a1f" stroke-width="9" stroke-linecap="round"/>';
   }else{
     body='<path d="M-18 1q18-10 36 0l6 38h-48Z" fill="#151a1f"/>';
     arms='<path d="M-14 8-27 28M14 8 28 18" stroke="#151a1f" stroke-width="9" stroke-linecap="round"/>';
   }
   return '<g transform="translate('+x+' '+y+') scale('+scale+')">'+
     '<ellipse cx="0" cy="-17" rx="10" ry="12" fill="#151a1f"/>'+
     '<path d="M-8-24q8-7 16 0" stroke="'+accent+'" stroke-width="2.2" fill="none" opacity=".92"/>'+
     body+arms+
     (pose==='phone'?'<rect x="23" y="13" width="8" height="14" rx="1.5" fill="#111820" stroke="'+accent+'" stroke-width="1.8"/>':'')+
   '</g>';
 }

 function fhqV836Couch(x,y,armored,accent){
   return '<g transform="translate('+x+' '+y+')">'+
     '<path d="M2 18q0-12 10-12h46q10 0 10 12v29H2Z" fill="'+(armored?'#252a2e':'#22282d')+'" stroke="'+(armored?accent:'#6b747b')+'" stroke-width="'+(armored?3:2)+'"/>'+
     '<rect x="7" y="1" width="24" height="22" rx="7" fill="#30363b" stroke="#838b91" stroke-width="1.7"/>'+
     '<rect x="39" y="1" width="24" height="22" rx="7" fill="#30363b" stroke="#838b91" stroke-width="1.7"/>'+
     '<rect x="-4" y="18" width="13" height="29" rx="5" fill="#30363b"/><rect x="61" y="18" width="13" height="29" rx="5" fill="#30363b"/>'+
     (armored?'<path d="M1 19 10 10l11 6 14-11 13 11 13-7 9 10M4 47v9m62-9v9" stroke="'+accent+'" stroke-width="3" fill="none"/>':'')+
   '</g>';
 }

 function fhqV836TV(x,y,w,h,label,accent){
   return '<g transform="translate('+x+' '+y+')">'+
     '<rect width="'+w+'" height="'+h+'" rx="3" fill="#10151a" stroke="#1a1e22" stroke-width="2"/>'+
     '<rect x="3" y="3" width="'+(w-6)+'" height="'+(h-8)+'" fill="#27313a"/>'+
     '<path d="M6 '+(h-10)+' 14 '+(h-17)+' 22 '+(h-13)+' 31 '+(h-23)+' '+(w-6)+' '+(h-17)+'" stroke="'+accent+'" stroke-width="2.4" fill="none"/>'+
     '<text x="'+(w/2)+'" y="'+(h-2)+'" text-anchor="middle" fill="#e8e7e3" font-size="4.2" font-weight="900">'+label+'</text>'+
   '</g>';
 }

 function fhqV836EditorialArt(card,p){
   const n=String(card&&card.name||'FOOTBALL HQ'), kind=fhqV836SceneType(card),
         accent=p[2]||'#3189c8', dark='#151a1f', paper='#e8e6e1';
   let s='<rect width="100" height="118" fill="'+paper+'"/>'+
         '<rect x="4" y="4" width="92" height="110" rx="2" fill="#f3f1ed"/>'+
         '<path d="M4 94h92" stroke="#c9c6bf" stroke-width="1.5"/>'+
         '<path d="M7 10h18" stroke="'+accent+'" stroke-width="3" opacity=".35"/>';
   if(kind==='couch'){
     const armored=/iron couch/i.test(n);
     s+=fhqV836Couch(15,49,armored,accent);
     if(!armored) s+=fhqV836Person(50,58,.78,'sit',accent);
     if(/remote/i.test(n)) s+='<rect x="76" y="75" width="12" height="4" rx="1" fill="'+dark+'"/>';
     if(/sleeper/i.test(n)) s+='<text x="70" y="28" fill="'+accent+'" font-size="12" font-weight="1000">Z</text><text x="80" y="20" fill="'+accent+'" font-size="8" font-weight="1000">Z</text>';
     if(armored) s+='<path d="M35 39 50 25l15 14-4 9H39Z" fill="#c99a22" stroke="#5a4211" stroke-width="1.8"/><ellipse cx="50" cy="75" rx="12" ry="7" fill="#6e3d28" stroke="#1a1010" stroke-width="1.5"/>';
   }else if(kind==='manager'){
     s+=fhqV836Person(49,52,.82,'lean',accent)+
        '<rect x="10" y="57" width="33" height="23" rx="2" fill="#10151a" stroke="#5d656b" stroke-width="1.8"/>'+
        '<text x="26.5" y="71" text-anchor="middle" fill="'+accent+'" font-size="7" font-weight="1000">HQ</text>'+
        '<rect x="68" y="30" width="20" height="27" rx="2" fill="#efede8" stroke="#1d2226" stroke-width="1.5"/>'+
        '<path d="M72 36h12M72 42h10M72 48h13" stroke="#20252a" stroke-width="1.5"/>';
     if(/waiver/i.test(n)) s+='<circle cx="78" cy="18" r="11" fill="#efede8" stroke="#1d2226" stroke-width="1.7"/><text x="78" y="21" text-anchor="middle" fill="#171b1e" font-size="6" font-weight="1000">3:01</text>';
   }else if(kind==='screens'){
     s+=fhqV836Person(50,59,.8,/addict|believer/i.test(n)?'up':'sit',accent)+
       fhqV836TV(6,18,36,28,/red.?zone/i.test(n)?'RED ZONE':'LIVE',accent)+
       fhqV836TV(59,14,34,27,/stat|film|coverage/i.test(n)?'STATS':'GAME',accent);
     if(/red.?zone/i.test(n)) s+=fhqV836TV(61,49,31,24,'TD',accent);
   }else if(kind==='coach'){
     s+=fhqV836Person(48,51,.88,'up',accent)+
       '<path d="M25 22h49v20H25Z" fill="#f2efe8" stroke="#1b2024" stroke-width="1.7"/>'+
       '<path d="M33 34q8-12 17 0t17 0" stroke="'+accent+'" stroke-width="2.5" fill="none"/>'+
       '<path d="M39 48q9-8 18 0" stroke="#151a1f" stroke-width="2" fill="none"/>';
   }else if(kind==='food'){
     s+=fhqV836Person(50,52,.82,'sit',accent)+
       '<path d="M34 28q4-12 10-5 4-11 11-1 8-6 12 6v6H34Z" fill="#f5f2ea" stroke="#1a1f23" stroke-width="1.6"/>'+
       '<ellipse cx="50" cy="78" rx="25" ry="8" fill="#d4d0c7" stroke="#1c2125" stroke-width="1.6"/>'+
       '<circle cx="40" cy="76" r="5" fill="#c95a34"/><circle cx="51" cy="79" r="5" fill="#d9a02e"/><circle cx="62" cy="75" r="5" fill="#739a54"/>';
   }else if(kind==='weather'){
     s+=fhqV836Person(50,54,.88,'up',accent);
     for(let i=0;i<26;i++){let x=(i*31)%96+2,y=(i*19)%86+5;s+='<circle cx="'+x+'" cy="'+y+'" r="'+(i%4===0?2.1:1.2)+'" fill="'+accent+'" opacity=".72"/>'}
     s+='<path d="M4 91q25-15 46 0t46 0v20H4Z" fill="#d7e2e6"/>';
   }else if(kind==='clutch'){
     s+=fhqV836Person(50,58,.86,/believer|comeback/i.test(n)?'up':'sit',accent)+
       '<circle cx="78" cy="28" r="14" fill="#efede8" stroke="#191d20" stroke-width="2"/>'+
       '<path d="M78 18v11l8 5" stroke="#191d20" stroke-width="2.5" fill="none"/>'+
       '<path d="M6 44h24M9 39l-6 5 6 5" stroke="'+accent+'" stroke-width="3" fill="none"/>';
   }else if(kind==='royalty'){
     s+=fhqV836Person(50,54,.9,'sit',accent)+
       '<path d="M31 27h38l-4-19-10 10-7-13-7 13-11-10Z" fill="'+accent+'" stroke="#191d20" stroke-width="2"/>';
   }else if(kind==='creature'){
     s+='<g transform="translate(50 56)">'+
       '<path d="M-20 9q3-25 20-25T20 9v31h-40Z" fill="#171b1e" stroke="'+accent+'" stroke-width="2.5"/>'+
       '<path d="M-16-11-28-28-9-21 0-34 9-21 28-28 16-11" fill="'+accent+'" stroke="#171b1e" stroke-width="2"/>'+
       '<circle cx="-7" cy="-4" r="2.5" fill="#f2f0ea"/><circle cx="7" cy="-4" r="2.5" fill="#f2f0ea"/>'+
       '<path d="M-7 7q7 6 14 0" stroke="#f2f0ea" stroke-width="2" fill="none"/>'+
       '</g>';
   }else if(kind==='official'){
     s+=fhqV836Person(50,55,.86,'sit',accent)+
       '<rect x="8" y="19" width="29" height="40" fill="#f3f1ec" stroke="#171c20" stroke-width="1.6"/>'+
       '<path d="M13 27h19M13 35h18M13 43h14M13 51h19" stroke="#171c20" stroke-width="1.5"/>'+
       '<path d="M76 22h10v25H76Z" fill="'+accent+'" transform="rotate(9 81 34)"/>';
   }else if(kind==='stadium'){
     s+=fhqV836Person(50,60,.82,'up',accent)+
       '<path d="M4 24q46-25 92 0v54H4Z" fill="#d7d5cf" stroke="#22272b" stroke-width="1.5"/>'+
       '<path d="M12 35h76M9 47h82M7 59h86" stroke="#7b8388" stroke-width="2"/>'+
       '<rect x="36" y="26" width="28" height="16" fill="#17232c" stroke="'+accent+'" stroke-width="2"/>';
   }else{
     s+=fhqV836Person(50,56,.88,/screamer|lunatic|believer/i.test(n)?'up':'phone',accent)+
       '<ellipse cx="18" cy="76" rx="11" ry="6" fill="#70432d" stroke="#24160f" stroke-width="1.4" transform="rotate(-15 18 76)"/>';
   }
   return s;
 }

 function fhqV836PremiumArt(card,p,rarity){
   const n=String(card&&card.name||'FOOTBALL HQ'),kind=fhqV836SceneType(card);
   let base=fhqV836EditorialArt(card,p);
   if(rarity==='legendary'){
     return '<rect width="100" height="118" fill="#260807"/>'+
       '<path d="M50 3 56 28 78 11 68 39 96 33 72 51 98 64 68 64 79 94 56 73 50 113 44 73 20 94 31 64 2 64 28 51 4 33 32 39 22 11 44 28Z" fill="#8f1711" opacity=".9"/>'+
       '<g opacity=".98">'+fhqV836EditorialArt(card,['#1f0908','#52100d','#f23b2c']).replace(/<rect width="100" height="118"[^>]+>.*?<rect x="4" y="4"[^>]+>/,'')+'</g>';
   }
   if(rarity==='obsidian'){
     return '<defs><linearGradient id="obg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#110a18"/><stop offset=".5" stop-color="#21102f"/><stop offset="1" stop-color="#07080c"/></linearGradient></defs>'+
       '<rect width="100" height="118" fill="url(#obg)"/>'+
       '<path d="M3 3 20 1 12 13 29 10 22 26 43 18 35 40 57 31 50 52 73 40 67 61 96 48M97 2 83 17 97 21 77 35 93 42 71 58 94 70 68 79 88 98" stroke="#754b9e" stroke-width="1.2" opacity=".65" fill="none"/>'+
       '<g transform="translate(0 3)">'+
       (kind==='royalty'||/commission|commish/i.test(n)?
         fhqV836Person(50,56,.9,'sit','#8b5ab7')+'<path d="M31 28h38l-4-19-10 10-7-13-7 13-11-10Z" fill="#8b5ab7"/>':
         fhqV836Person(50,57,.9,'sit','#8b5ab7'))+
       '</g>';
   }
   if(rarity==='signature'){
     return '<rect width="100" height="118" fill="#f5f0e5"/>'+
       '<path d="M0 0h100v118H0Z" fill="none" stroke="#b58a2d" stroke-width="3"/>'+
       '<path d="M6 6h88v106H6Z" fill="none" stroke="#d9bd6b" stroke-width="1"/>'+
       fhqV836EditorialArt(card,['#f4efe5','#171a1d','#b38b34']).replace(/<rect width="100" height="118"[^>]+>.*?<rect x="4" y="4"[^>]+>/,'');
   }
   if(rarity==='prism'){
     return '<defs><linearGradient id="prg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#74d8ff"/><stop offset=".22" stop-color="#ecb4ff"/><stop offset=".44" stop-color="#fff6a0"/><stop offset=".68" stop-color="#83f0ce"/><stop offset="1" stop-color="#c8a7ff"/></linearGradient></defs>'+
       '<rect width="100" height="118" fill="#0a1119"/><path d="M0 0h100v118H0Z" fill="none" stroke="url(#prg)" stroke-width="5"/>'+
       '<g opacity=".98">'+fhqV836EditorialArt(card,['#0d1721','#1d2a37','#7fdcff']).replace(/<rect width="100" height="118"[^>]+>.*?<rect x="4" y="4"[^>]+>/,'')+'</g>';
   }
   return base;
 }

 function fhqV835Signature(card){
   const name=String(card&&card.name||'FOOTBALL HQ');
   const words=name.replace(/[^A-Za-z0-9 ]/g,'').split(/\s+/).filter(Boolean);
   const sign=words.length>1?words[0][0]+'. '+words[words.length-1]:name;
   return '<div class="fhq-v835-signature"><span>'+esc(sign)+'</span></div>';
 }

 function fhqCardArtHTML(card){
    card=card||{};
    // V85 HARD SWITCH: collectible artwork is image-only.
    // No procedural SVG renderer is allowed to render a collectible card.
    return fhqV85CardMarkup(card);
 }

  function fhqPackPreview(pack){
    const cls=esc(pack.art||pack.id||'starter'),
      short=String(pack.name||'HQ Pack').replace(' Card Pack','').replace(' Pack',''),
      count=Math.max(1,Number(pack.count)||1),
      isSunday=cls==='sunday';
    return '<div class="fhq-pack-art '+cls+'">'+
      '<span class="pack-crimp-top"></span>'+
      '<span class="pack-x x1"></span><span class="pack-x x2"></span>'+
      '<div class="pack-brand">FOOTBALL HQ • 2026</div>'+
      '<div class="pack-shield">HQ</div>'+
      (isSunday?'<div class="pack-score">HOME 20&nbsp;&nbsp; 0:31&nbsp;&nbsp; AWAY 26</div>':'')+
      '<div class="pack-title">'+esc(short.toUpperCase())+'</div>'+
      '<div class="pack-subtitle">CARD PACK</div>'+
      '<div class="pack-count">'+count+' CARD'+(count===1?'':'S')+'</div>'+
    '</div>';
  }
  function fhqRenderShop(x){
    const p=x&&x.profile?x.profile:getAccountProfile(),raw=x&&Array.isArray(x.items)?x.items:FHQ_SHOP_FALLBACK,
      items=raw.map(i=>Object.assign({},FHQ_SHOP_FALLBACK.find(f=>f.id===i.id)||{},i)),
      incoming=x&&Array.isArray(x.packs)?x.packs:[],
      serverById={};
    incoming.forEach(function(pk){if(pk&&pk.id)serverById[pk.id]=pk});
    /* V88.31: local shop metadata wins for category/description/guarantee so an
       older backend response can never put Avatar Pack back into Card Packs. */
    const packs=FHQ_PACK_FALLBACK.map(function(local){
      const server=serverById[local.id]||{};
      return Object.assign({},server,local,{price:Number(server.price||local.price),count:Number(server.count||local.count)});
    });
    if(x&&x.profile)fhqSetRuntimeIdentity(x.profile);
    const c=window.__fhqCosmetics||{},inv=Array.isArray(c.inventory)?c.inventory:[],coins=Math.max(Number(p&&p.hqCoins)||0,Number(c.coins)||0,fhqCachedCoins());
    fhqRememberCoins(coins);
    const g=document.getElementById('fhqShopGrid');if(!g)return;
    const filter=(fhqShopFilter==='pack'||fhqShopFilter==='avatar')?fhqShopFilter:'all';
    const cardPacks=packs.filter(pk=>pk.category==='card');
    const avatarPack=packs.find(pk=>pk.category==='avatar');
    function packHTML(pk){
      return '<article class="fhq-shop-item fhq-pack-card '+esc(pk.rarity||'')+'" data-shop-pack-card="'+esc(pk.id)+'">'+
        '<div class="fhq-shop-preview">'+fhqPackPreview(pk)+'</div><h3>'+esc(pk.name)+'</h3>'+
        '<div class="fhq-v8831-pack-meta">'+esc(pk.guaranteeLabel||((pk.count||1)+' CARDS'))+'</div>'+
        '<p>'+esc(pk.description||'Football HQ card pack.')+'</p><div class="fhq-shop-buy"><span><span class="fhq-coin-icon" style="display:inline-grid;width:18px;height:18px;vertical-align:middle"></span> '+pk.price+
        ' <button class="fhq-pack-odds-btn" data-pack-odds="'+esc(pk.id)+'" aria-label="View pack odds">i</button></span><button data-pack-buy="'+esc(pk.id)+'">PURCHASE</button></div></article>';
    }
    function avatarHTML(i){
      const owned=inv.some(x=>x&&x.source==='shop'&&x.shopId===i.id);
      return '<article class="fhq-shop-item '+esc(i.rarity||'')+'"><div class="fhq-shop-preview">'+fhqShopPreview(i)+'</div><h3>'+esc(i.name)+'</h3><p>'+esc(i.description||'Football HQ avatar.')+'</p><div class="fhq-shop-buy"><span><span class="fhq-coin-icon" style="display:inline-grid;width:18px;height:18px;vertical-align:middle"></span> '+i.price+'</span>'+(owned?'<b class="fhq-shop-owned">OWNED</b>':'<button data-shop-buy="'+esc(i.id)+'">PURCHASE</button>')+'</div></article>';
    }
    let html='';
    if(filter==='all'){
      html='<div class="fhq-v8831-shop-heading"><span>FEATURED</span><h2>Featured Packs</h2><p>The four Football HQ card packs currently in rotation.</p></div>'+cardPacks.map(packHTML).join('');
    }else if(filter==='pack'){
      html='<div class="fhq-v8831-shop-heading"><span>PACKS</span><h2>Card Packs</h2><p>Collection cards only. Avatar products stay in the Avatars tab.</p></div>'+cardPacks.map(packHTML).join('');
    }else{
      html='<div class="fhq-v8831-shop-heading"><span>AVATARS</span><h2>Avatars</h2><p>Profile cosmetics and the Avatar Pack live here.</p></div>'+(avatarPack?packHTML(avatarPack):'')+items.filter(i=>i.type==='avatar').map(avatarHTML).join('');
    }
    g.innerHTML=html+'<div class="fhq-shop-exclusive"><strong>Prestige stays earned.</strong> Daily/Weekly champion, achievement, and prestige HQ Pass rewards cannot be purchased.</div>';
    g.querySelectorAll('[data-shop-buy]').forEach(b=>b.onclick=function(){fhqBuyShopItem(this.dataset.shopBuy)});
    g.querySelectorAll('[data-pack-buy]').forEach(b=>b.onclick=function(){fhqV8831UnlockAudio();fhqBuyPack(this.dataset.packBuy)});
    g.querySelectorAll('[data-pack-odds]').forEach(b=>b.onclick=function(e){e.stopPropagation();fhqOpenPackOdds(this.dataset.packOdds)});
  }

  const FHQ_VISIBLE_ODDS={
    standard:{common:47.9,uncommon:28,rare:15,epic:6,legendary:2.5,obsidian:.5,signature:.1},
    sunday:{common:41.8,uncommon:30,rare:18,epic:7,legendary:2.5,obsidian:.5,signature:.2},
    primetime:{common:33.5,uncommon:30,rare:21,epic:10,legendary:4,obsidian:1,signature:.5},
    elite:{common:21,uncommon:28,rare:25,epic:15,legendary:8,obsidian:2,signature:1},
    free:{common:64.98,uncommon:25,rare:8,epic:1.7,legendary:.25,obsidian:.05,signature:.02}
  };
  function fhqOpenPackOdds(id){
    const pack=FHQ_PACK_FALLBACK.find(x=>x.id===id)||{},profile=pack.odds||'standard',odds=FHQ_VISIBLE_ODDS[profile]||FHQ_VISIBLE_ODDS.standard,o=document.getElementById('fhqOddsOverlay'),title=document.getElementById('fhqOddsTitle'),rows=document.getElementById('fhqOddsRows');
    if(title)title.textContent=(pack.name||'Pack')+' Odds';
    if(rows)rows.innerHTML=['common','uncommon','rare','epic','legendary','obsidian','signature'].map(r=>'<div class="fhq-odds-row fhq-r-'+r+'"><span>'+r.toUpperCase()+'</span><strong>'+odds[r]+'%</strong></div>').join('')+(pack.guarantee?'<div style="margin-top:12px;font-size:8px;color:#85a0ad">Final card guarantee: <strong style="color:#dff7ff">'+String(pack.guarantee).toUpperCase()+' OR BETTER</strong></div>':'');
    if(o)o.classList.add('open');
  }
  function fhqClosePackOdds(){const o=document.getElementById('fhqOddsOverlay');if(o)o.classList.remove('open')}
  /* ================= FOOTBALL HQ V88.19 — PACK AUDIO ENGINE =================
     Clip-first architecture. Real prerecorded sounds live in AudioAssets.
     If a clip is not installed yet, FootballHQ falls back to a soft synth cue.
     Visual/card geometry is intentionally untouched.
  ============================================================================ */
  const FHQ_AUDIO_DEFAULTS={
    master:.68,
    music:.55,
    sfx:.72,
    voice:.72,
    muted:false
  };

  function fhqAudioSettings(){
    try{
      const saved=JSON.parse(localStorage.getItem('fhq_audio_settings_v1')||'null')||{};
      return Object.assign({},FHQ_AUDIO_DEFAULTS,saved);
    }catch(e){return Object.assign({},FHQ_AUDIO_DEFAULTS)}
  }

  function fhqSaveAudioSettings(next){
    try{localStorage.setItem('fhq_audio_settings_v1',JSON.stringify(Object.assign({},fhqAudioSettings(),next||{})))}catch(e){}
  }

  window.FHQ_AUDIO=window.FHQ_AUDIO||{};
  window.FHQ_AUDIO_CLIPS=window.FHQ_AUDIO_CLIPS||{};
  window.FHQ_AUDIO_TIMELINES=window.FHQ_AUDIO_TIMELINES||{};

  const fhqAudioRuntime={
    active:new Set(),
    timers:new Set(),
    contexts:new Set()
  };

  function fhqAudioStopAll(){
    fhqAudioRuntime.timers.forEach(t=>clearTimeout(t));
    fhqAudioRuntime.timers.clear();
    fhqAudioRuntime.active.forEach(a=>{try{a.pause();a.currentTime=0}catch(e){}});
    fhqAudioRuntime.active.clear();
  }

  function fhqAudioResolve(key){
    const item=window.FHQ_AUDIO_CLIPS&&window.FHQ_AUDIO_CLIPS[key];
    if(!item)return null;
    if(typeof item==='string')return {src:item,type:'sfx',volume:1};
    return item&&item.src?item:null;
  }

  function fhqAudioPlayClip(key,opts){
    const item=fhqAudioResolve(key);
    if(!item)return false;
    const settings=fhqAudioSettings();
    if(settings.muted)return true;
    opts=opts||{};
    try{
      const a=new Audio(item.src);
      const category=String(opts.type||item.type||'sfx');
      const catGain=Number(settings[category]);
      const volume=(Number.isFinite(catGain)?catGain:settings.sfx)*settings.master*
        Number(opts.volume==null?(item.volume==null?1:item.volume):opts.volume);
      a.volume=Math.max(0,Math.min(1,volume));
      a.preload='auto';
      a.playbackRate=Number(opts.rate||item.rate||1);
      if(opts.loop||item.loop)a.loop=true;
      fhqAudioRuntime.active.add(a);
      const cleanup=()=>fhqAudioRuntime.active.delete(a);
      a.addEventListener('ended',cleanup,{once:true});
      a.addEventListener('error',cleanup,{once:true});
      const p=a.play();if(p&&p.catch)p.catch(cleanup);
      return true;
    }catch(e){return false}
  }

  function fhqAudioLater(fn,ms){
    const t=setTimeout(()=>{fhqAudioRuntime.timers.delete(t);fn()},Math.max(0,ms||0));
    fhqAudioRuntime.timers.add(t);return t;
  }

  function fhqAudioPlayTimeline(name,ctx){
    const timeline=window.FHQ_AUDIO_TIMELINES&&window.FHQ_AUDIO_TIMELINES[name];
    if(!Array.isArray(timeline)||!timeline.length)return false;

    /* A timeline made entirely of placeholder/null clips is NOT considered
       playable; this lets the V88.25 built-in sound design run instead. */
    const playable=timeline.some(function(step){
      if(step.action==='fallback')return true;
      if(step.action!=='clip')return false;
      const clip=window.FHQ_AUDIO_CLIPS&&window.FHQ_AUDIO_CLIPS[step.key];
      return !!(clip&&clip.src);
    });
    if(!playable)return false;

    const settings=fhqAudioSettings();if(settings.muted)return true;
    timeline.forEach(step=>{
      fhqAudioLater(()=>{
        if(step.action==='clip')fhqAudioPlayClip(step.key,step);
        else if(step.action==='fallback')fhqAudioFallback(step.rarity||name);
      },Number(step.at||0));
    });
    return true;
  }

  /* Safe, restrained fallback only. This disappears automatically as real clips
     are added to AudioAssets. */
  function fhqAudioFallback(rarity){
    rarity=String(rarity||'common').toLowerCase();
    try{
      const settings=fhqAudioSettings();if(settings.muted)return;
      const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)return;
      const ac=new Ctx(),now=ac.currentTime,
        master=ac.createGain(),comp=ac.createDynamicsCompressor();

      /* Headphone-safe ceiling. Rarer pulls are denser, not dramatically louder. */
      master.gain.value=.115*settings.master*settings.sfx;
      comp.threshold.value=-21;comp.knee.value=18;comp.ratio.value=5;
      comp.attack.value=.005;comp.release.value=.24;
      master.connect(comp);comp.connect(ac.destination);

      const nodes=[];
      function tone(freq,dur,at,vol,endFreq,type,pan){
        const o=ac.createOscillator(),g=ac.createGain(),
          p=ac.createStereoPanner?ac.createStereoPanner():null,t=now+(at||0);
        o.type=type||'sine';
        o.frequency.setValueAtTime(Math.max(20,freq),t);
        if(endFreq)o.frequency.exponentialRampToValueAtTime(Math.max(20,endFreq),t+dur);
        g.gain.setValueAtTime(.0001,t);
        g.gain.exponentialRampToValueAtTime(Math.max(.0002,vol||.08),t+.012);
        g.gain.exponentialRampToValueAtTime(.0001,t+dur);
        o.connect(g);
        if(p){p.pan.value=Math.max(-1,Math.min(1,pan||0));g.connect(p);p.connect(master)}
        else g.connect(master);
        o.start(t);o.stop(t+dur+.03);nodes.push(o);
      }
      function noise(dur,at,vol,highpass,pan){
        const n=Math.max(1,Math.floor(ac.sampleRate*dur)),b=ac.createBuffer(1,n,ac.sampleRate),
          d=b.getChannelData(0);
        for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,1.25);
        const s=ac.createBufferSource(),g=ac.createGain(),f=ac.createBiquadFilter(),
          p=ac.createStereoPanner?ac.createStereoPanner():null,t=now+(at||0);
        s.buffer=b;f.type='highpass';f.frequency.value=highpass||80;
        g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol||.06,t+.015);
        g.gain.exponentialRampToValueAtTime(.0001,t+dur);
        s.connect(f);f.connect(g);
        if(p){p.pan.value=pan||0;g.connect(p);p.connect(master)}else g.connect(master);
        s.start(t);nodes.push(s);
      }
      function thump(at,vol){
        tone(88,.22,at,vol||.18,36,'sine',0);
        noise(.11,at,.035,55,0);
      }
      function click(at,vol){
        noise(.045,at,vol||.08,1800,0);
        tone(1150,.055,at,.035,720,'triangle',0);
      }
      function hqSting(at,scale){
        scale=scale||1;
        tone(523.25,.16,at,.045*scale,null,'sine',-.12);
        tone(659.25,.24,at+.13,.05*scale,null,'sine',.12);
      }

      if(rarity==='common'){
        /* Short yard-line snap: exciting but intentionally simple. */
        noise(.22,0,.055,250,-.15);
        tone(430,.15,.20,.05,720,'triangle',.1);
        thump(.66,.10);
        hqSting(1.05,.68);
      }
      else if(rarity==='uncommon'){
        /* Field sweep + snap. */
        noise(.45,0,.045,180,-.35);
        tone(180,.48,.15,.045,510,'triangle',-.2);
        tone(240,.43,.42,.04,640,'triangle',.25);
        click(1.02,.075);
        thump(1.18,.11);
        hqSting(1.62,.75);
      }
      else if(rarity==='rare'){
        /* Ice creak / radial cracking / shatter pop. */
        noise(.60,0,.035,900,-.2);
        tone(145,.55,.42,.035,82,'sawtooth',.15);
        click(1.00,.075);click(1.31,.08);
        noise(.12,1.62,.095,2400,-.35);
        noise(.16,1.72,.10,1800,.38);
        thump(2.15,.14);
        tone(980,.22,2.22,.06,1600,'triangle',0);
        hqSting(2.62,.82);
      }
      else if(rarity==='epic'){
        /* Fourth-quarter clock, crowd-like bed, surge and big pop. */
        noise(1.55,0,.025,120,0);
        click(.30,.06);click(.63,.065);click(.96,.07);click(1.29,.075);
        tone(120,.55,1.38,.045,260,'sawtooth',-.3);
        tone(165,.60,1.48,.045,380,'sawtooth',.3);
        thump(2.02,.17);
        noise(.34,2.07,.08,500,0);
        tone(680,.36,2.25,.07,1240,'triangle',0);
        hqSting(2.92,.9);
      }
      else if(rarity==='legendary'){
        /* Golden Storm: distant stadium rumble -> lightning -> payoff. */
        noise(1.9,0,.025,75,0);
        tone(52,.85,.30,.10,35,'sine',0);
        noise(.09,1.02,.09,2200,-.35);
        tone(1450,.12,1.03,.055,620,'square',-.25);
        noise(.11,1.43,.10,2000,.35);
        tone(1750,.13,1.44,.06,700,'square',.25);
        thump(2.18,.20);
        noise(.38,2.22,.095,300,0);
        tone(410,.55,2.60,.055,940,'triangle',0);
        tone(740,.45,2.95,.05,1380,'triangle',.2);
        hqSting(3.72,1.0);
      }
      else if(rarity==='obsidian'){
        /* Event Horizon: whistle, spatial suction, heartbeat, blackout, collapse. */
        tone(2450,.30,0,.045,3300,'sine',0);
        noise(.70,.12,.022,100,0);
        tone(220,.65,.62,.04,54,'sawtooth',-.55);
        tone(280,.75,1.02,.042,58,'sawtooth',.55);
        thump(1.46,.14);thump(1.78,.13);
        click(2.28,.055);noise(.20,2.37,.06,1700,-.35);
        /* deliberate quiet pocket around 2.7–3.45 */
        noise(.13,3.52,.10,2500,0);
        tone(1700,.16,3.53,.055,650,'square',0);
        thump(4.40,.22);
        noise(.42,5.35,.11,1600,-.35);
        noise(.46,5.42,.11,1200,.35);
        tone(105,.72,5.46,.075,520,'sawtooth',0);
        thump(5.95,.24);
        hqSting(6.55,1.08);
      }
      else if(rarity==='signature'){
        /* Prestige, not just louder: paper, pen, seal, blackout, gold finish. */
        noise(.28,0,.026,700,-.2);
        noise(.34,.38,.038,1200,.2);
        /* pen-style scratch sequence */
        [0,.10,.22,.35,.49,.64,.80].forEach(function(x,i){
          noise(.07,.82+x,.045+(i%2)*.008,2600,(i%2?0.18:-0.18));
        });
        thump(1.92,.16); /* seal stamp */
        tone(330,.35,2.14,.045,720,'triangle',0);
        /* blackout moment */
        noise(.10,3.78,.075,2400,0);
        tone(1480,.17,3.80,.06,620,'square',0);
        noise(.38,4.45,.095,1300,-.2);
        noise(.38,4.50,.09,1600,.2);
        thump(4.92,.23);
        tone(510,.55,5.02,.065,1180,'triangle',0);
        hqSting(5.68,1.12);
      }

      /* Keep contexts around only long enough for the longest reveal. */
      setTimeout(()=>{try{ac.close()}catch(e){}},
        rarity==='obsidian'?7600:rarity==='signature'?6900:5200);
    }catch(e){console.warn('FHQ built-in reveal audio failed',e)}
  }
  function fhqPlayRarityAudio(rarity,reward){
    rarity=String(rarity||'common').toLowerCase();
    const timeline='rarity:'+rarity;
    if(fhqAudioPlayTimeline(timeline,{rarity,reward}))return;
    fhqAudioFallback(rarity);
  }

  function fhqPackOpenSound(){
    if(fhqAudioPlayTimeline('pack:open'))return;
    if(fhqAudioPlayClip('pack.open'))return;

    /* V88.25 physical foil pack: crinkle -> tear -> interior flash. */
    try{
      const settings=fhqAudioSettings();if(settings.muted)return;
      const Ctx=window.AudioContext||window.webkitAudioContext;if(!Ctx)return;
      const ac=new Ctx(),now=ac.currentTime,master=ac.createGain(),comp=ac.createDynamicsCompressor();
      master.gain.value=.10*settings.master*settings.sfx;
      comp.threshold.value=-20;comp.ratio.value=5;comp.attack.value=.004;comp.release.value=.18;
      master.connect(comp);comp.connect(ac.destination);
      function noise(dur,at,vol,hp){
        const n=Math.floor(ac.sampleRate*dur),b=ac.createBuffer(1,n,ac.sampleRate),d=b.getChannelData(0);
        for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,.65);
        const s=ac.createBufferSource(),g=ac.createGain(),f=ac.createBiquadFilter(),t=now+at;
        s.buffer=b;f.type='highpass';f.frequency.value=hp;g.gain.setValueAtTime(.0001,t);
        g.gain.linearRampToValueAtTime(vol,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
        s.connect(f);f.connect(g);g.connect(master);s.start(t);
      }
      function tone(f,d,at,v,end){
        const o=ac.createOscillator(),g=ac.createGain(),t=now+at;o.type='triangle';
        o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(end||f,t+d);
        g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);
        o.connect(g);g.connect(master);o.start(t);o.stop(t+d+.02);
      }
      noise(.32,0,.045,900);      /* foil handling */
      noise(.48,.34,.085,1500);   /* long tear */
      noise(.13,.77,.09,2400);    /* final rip snap */
      tone(180,.26,.88,.07,62);   /* pack opens */
      tone(620,.18,1.03,.035,980);/* light flash */
      setTimeout(()=>{try{ac.close()}catch(e){}},1800);
    }catch(e){}
  }

  /* Public helpers for the eventual Settings panel and testing console. */
  window.FHQAudio={
    playClip:fhqAudioPlayClip,
    playTimeline:fhqAudioPlayTimeline,
    playRarity:fhqPlayRarityAudio,
    stopAll:fhqAudioStopAll,
    settings:fhqAudioSettings,
    setSettings:function(x){fhqSaveAudioSettings(x);return fhqAudioSettings()},
    test:function(rarity){fhqAudioStopAll();fhqPlayRarityAudio(rarity||'common')}
  };



  const FHQ_DUP_DURATION={
    common:1650,uncommon:1750,rare:1850,epic:1950,legendary:2100,obsidian:2250,signature:2350
  };

  window.FHQDuplicateEngine={
    async play(reward,node,currentBalance){
      if(!reward||reward.duplicate!==true)return currentBalance;
      const rarity=String(reward.rarity||'common').toLowerCase(),
        amount=Math.max(0,Number(reward.duplicateCoins)||0),
        overlay=document.getElementById('fhqDuplicateOverlay');
      if(!overlay||!amount)return currentBalance;

      const card=overlay.querySelector('.fhq-dup-card'),
        value=overlay.querySelector('.fhq-dup-value');
      card.innerHTML=node?node.innerHTML:fhqCardArtHTML(reward);
      value.textContent='+'+amount+' HQ COINS';

      overlay.className='open '+rarity;
      overlay.setAttribute('aria-hidden','false');
      overlay.classList.remove('run');
      void overlay.offsetWidth;
      overlay.classList.add('run');

      /* Keep duplicate audio separate from rarity audio. Until real clips are
         installed, this uses the existing restrained coin sound at payoff. */
      const duration=FHQ_DUP_DURATION[rarity]||1800;
      await new Promise(r=>setTimeout(r,Math.max(1100,duration-520)));

      const nextBalance=Math.max(0,Number(currentBalance)||0)+amount;
      fhqShowCoinAward(amount,nextBalance);

      await new Promise(r=>setTimeout(r,520));
      overlay.className='';
      overlay.setAttribute('aria-hidden','true');
      card.innerHTML='';
      return nextBalance;
    },
    stop(){
      const overlay=document.getElementById('fhqDuplicateOverlay');
      if(overlay){overlay.className='';overlay.setAttribute('aria-hidden','true')}
    }
  };

  function fhqRevealEngineReady(){
    return !!(window.FHQRevealEngine && typeof window.FHQRevealEngine.play==='function');
  }

  function fhqPlayPackReveal(pack,rewards,options){
    options=options||{};
    rewards=Array.isArray(rewards)?rewards.slice():[];
    const rarityRank={currency:-2,avatar:-1,common:0,uncommon:1,rare:2,epic:3,legendary:4,obsidian:5,signature:6};
    rewards=rewards.map(function(x,i){return {x:x,i:i}}).sort(function(a,b){
      const ar=Object.prototype.hasOwnProperty.call(rarityRank,String(a.x&&a.x.rarity||'common').toLowerCase())?rarityRank[String(a.x&&a.x.rarity||'common').toLowerCase()]:0;
      const br=Object.prototype.hasOwnProperty.call(rarityRank,String(b.x&&b.x.rarity||'common').toLowerCase())?rarityRank[String(b.x&&b.x.rarity||'common').toLowerCase()]:0;
      return (ar-br)||(a.i-b.i);
    }).map(function(v){return v.x});

    const o=document.getElementById('fhqPackOverlay'),stage=document.getElementById('fhqPackOpenStage'),opening=document.getElementById('fhqOpeningPack'),box=document.getElementById('fhqPackRewards'),title=document.getElementById('fhqPackTitle'),sub=document.getElementById('fhqPackSubtitle'),close=document.getElementById('fhqPackClose');
    if(!o||!box||!rewards.length)return;

    /* V88.32 owns the complete pack experience. No legacy reveal loop is called. */
    try{if(window.FHQRevealEngine)FHQRevealEngine.stop()}catch(e){}
    try{if(window.FHQDuplicateEngine)FHQDuplicateEngine.stop()}catch(e){}
    o.className='fhq-pack-overlay open fhq-pack-cinematic fhq-v8832-owned';
    if(close)close.style.visibility='hidden';
    if(stage)stage.classList.add('active');
    if(title)title.textContent=pack&&pack.name||'Football HQ Pack';
    if(sub)sub.textContent='Opening pack…';

    if(opening){
      opening.className='fhq-pack-opening '+esc(pack&&pack.art||'starter');
      const short=String(pack&&pack.name||'HQ PACK').replace(' Card Pack','').replace(' Pack','').toUpperCase(),count=Math.max(1,Number(pack&&pack.count)||rewards.length||1);
      opening.innerHTML='<span class="fhq-pack-crimp top"></span><span class="fhq-pack-crimp bottom"></span><span class="fhq-pack-tear-strip"></span><span class="fhq-pack-seam"></span><span class="fhq-pack-foil-left"></span><span class="fhq-pack-foil-right"></span><span class="fhq-pack-burst"></span><span class="fhq-pack-open-emblem">HQ</span><span class="fhq-pack-open-title">'+esc(short)+'</span><span class="fhq-pack-open-sub">FOOTBALL HQ • CARD PACK</span><span class="fhq-pack-open-count">'+count+' CARD'+(count===1?'':'S')+'</span>';
    }

    fhqV8831Sfx('pack');
    setTimeout(function(){if(opening)opening.classList.add('rip')},360);

    setTimeout(function(){
      if(opening)opening.classList.add('exit');
      setTimeout(function(){
        if(stage)stage.classList.remove('active');
        o.className='fhq-pack-overlay open fhq-v8832-owned fhq-v8832-interactive';
        if(title)title.textContent=pack&&pack.name||'Your Pack';
        if(sub)sub.textContent='';

        let current=0,revealed={},busy=false,startX=null,runningBalance=Math.max(0,Number(options.startBalance)||fhqCachedCoins()),duplicateCount=0,duplicateCoins=0,newCardCount=0,bonusCoins=0,completeFired=false;

        function cardFrontHTML(x){
          if(x.type==='card'){
            const src=typeof fhqV85ImageForCard==='function'?fhqV85ImageForCard(x):'';
            return '<div class="fhq-v8832-art-wrap"><img class="fhq-v8832-card-art" src="'+esc(src)+'" alt="'+esc(x.name||'Football HQ card')+'" draggable="false"></div>';
          }
          if(x.type==='avatar')return '<div class="fhq-v8832-special-front">'+fhqAvatarTokenHTML(x.value)+'<strong>'+esc(x.name||'Avatar')+'</strong></div>';
          if(x.type==='coins')return '<div class="fhq-v8832-special-front"><span class="fhq-pass-coin-reward"></span><strong>'+esc(x.name||('+'+Number(x.value||0)+' HQ Coins'))+'</strong></div>';
          return '<div class="fhq-v8832-special-front"><strong>'+esc(x.name||x.value||'Reward')+'</strong></div>';
        }

        const slidesHTML=rewards.map(function(x,i){
          const rarity=String(x.rarity||'common').toLowerCase();
          return '<div class="fhq-v8832-slide '+(i===0?'active':'')+'" data-i="'+i+'" data-rarity="'+esc(rarity)+'">'+
            '<div class="fhq-v8832-card-shell">'+
              '<div class="fhq-v8832-card-inner">'+
                '<div class="fhq-v8832-face fhq-v8832-back"><span class="fhq-v8832-back-shield">HQ</span></div>'+
                '<div class="fhq-v8832-face fhq-v8832-front">'+cardFrontHTML(x)+'</div>'+
              '</div>'+
              '<div class="fhq-v8832-rarity-burst"></div>'+
              '<div class="fhq-v8832-status"></div>'+
            '</div>'+
          '</div>';
        }).join('');

        box.className='fhq-pack-rewards fhq-v8832-rewards';
        box.innerHTML='<div class="fhq-v8832-arena">'+
          '<div class="fhq-v8832-stage-glow"></div>'+
          '<div class="fhq-v8833-fx" aria-hidden="true"></div>'+
          '<div class="fhq-v8832-viewport"><div class="fhq-v8832-track">'+slidesHTML+'</div></div>'+
          '<div class="fhq-v8832-nav"><button type="button" data-v8832-prev aria-label="Previous card">‹</button><button type="button" data-v8832-next aria-label="Next card">›</button></div>'+
          '<div class="fhq-v8832-progress">'+rewards.map(function(_,i){return '<i class="'+(i===0?'active':'')+'" data-v8832-dot="'+i+'"></i>'}).join('')+'</div>'+
          '<div class="fhq-v8832-hint"></div>'+
          '<button type="button" class="fhq-v8832-finish">FINISH PACK</button>'+
        '</div>';

        const arena=box.querySelector('.fhq-v8832-arena'),fx=box.querySelector('.fhq-v8833-fx'),viewport=box.querySelector('.fhq-v8832-viewport'),track=box.querySelector('.fhq-v8832-track'),slides=Array.from(box.querySelectorAll('.fhq-v8832-slide')),prev=box.querySelector('[data-v8832-prev]'),next=box.querySelector('[data-v8832-next]'),hint=box.querySelector('.fhq-v8832-hint'),finish=box.querySelector('.fhq-v8832-finish');

        /* Hidden/back-face lazy loading caused the prior black-card bug. Force the exact
           FootballHQ card images to load immediately and fall back safely. */
        box.querySelectorAll('.fhq-v8832-card-art').forEach(function(img){
          img.loading='eager';img.decoding='sync';img.alt='';
          img.onerror=function(){this.onerror=null;this.alt='';try{this.src=FHQ_V85_PLACEHOLDER}catch(e){this.style.display='none'}};
        });

        function allDone(){return Object.keys(revealed).length===rewards.length}
        function centerTrack(animate){
          const active=slides[current];if(!active||!viewport||!track)return;
          track.classList.toggle('no-animate',animate===false);
          const target=(viewport.clientWidth/2)-(active.offsetLeft+active.offsetWidth/2);
          track.style.transform='translate3d('+Math.round(target)+'px,0,0)';
          if(animate!==false)setTimeout(function(){track.classList.remove('no-animate')},20);
        }
        function setStatus(i,text,cls){const el=slides[i]&&slides[i].querySelector('.fhq-v8832-status');if(el){el.className='fhq-v8832-status '+(cls||'');el.textContent=text||''}}
        function paint(){
          slides.forEach(function(s,i){s.classList.toggle('active',i===current);s.classList.toggle('revealed',!!revealed[i])});
          box.querySelectorAll('[data-v8832-dot]').forEach(function(d,i){d.classList.toggle('active',i===current);d.classList.toggle('done',!!revealed[i])});
          prev.disabled=current===0||busy;
          next.disabled=current===rewards.length-1||!revealed[current]||busy;
          if(hint)hint.textContent=busy?'REVEALING…':(!revealed[current]?'':(current===rewards.length-1?'PACK COMPLETE':'NEXT  ›'));
          finish.classList.toggle('show',allDone()&&!busy);
          centerTrack(true);
        }
        function revealDuration(rarity){
          return rarity==='signature'?2450:rarity==='obsidian'?2300:rarity==='legendary'?2050:rarity==='epic'?1750:rarity==='rare'?1450:rarity==='uncommon'?1120:900;
        }
        function fxLead(rarity){
          return rarity==='signature'?1180:rarity==='obsidian'?1050:rarity==='legendary'?900:rarity==='epic'?760:rarity==='rare'?620:rarity==='uncommon'?480:340;
        }
        function fxHTML(rarity){
          const flash='<div class="fhq-v8833-flash"></div>';
          if(rarity==='common')return flash+'<div class="fhq-v8833-yard"></div>';
          if(rarity==='uncommon')return flash+'<div class="fhq-v8833-sweep"></div>';
          if(rarity==='rare')return flash+'<div class="fhq-v8833-ring"></div>';
          if(rarity==='epic')return flash+'<div class="fhq-v8833-clock">0:04</div>';
          if(rarity==='legendary')return flash+'<i class="fhq-v8833-bolt b1"></i><i class="fhq-v8833-bolt b2"></i><i class="fhq-v8833-bolt b3"></i>';
          if(rarity==='obsidian')return flash+'<div class="fhq-v8833-vortex"></div>';
          if(rarity==='signature')return flash+'<svg class="fhq-v8833-sign" viewBox="0 0 700 180"><path d="M45 120 C92 40,126 155,171 90 S245 58,265 118 C280 152,302 60,337 80 C369 98,359 140,390 118 C423 95,447 55,469 80 C489 101,480 137,520 110 C552 87,574 68,596 92 C615 114,610 134,657 100"/></svg>';
          return flash;
        }
        function startFx(rarity){
          if(!fx)return;
          fx.className='fhq-v8833-fx '+rarity;
          fx.innerHTML=fxHTML(rarity);
          fx.style.setProperty('--fxdur',(revealDuration(rarity)/1000)+'s');
          void fx.offsetWidth;
          fx.classList.add('on');
          if(rarity==='epic'){
            const clock=fx.querySelector('.fhq-v8833-clock');
            ['0:04','0:03','0:02','0:01'].forEach(function(v,idx){
              setTimeout(function(){if(clock)clock.textContent=v},idx*245);
            });
          }
        }
        function stopFx(){
          if(!fx)return;
          fx.className='fhq-v8833-fx';
          fx.innerHTML='';
        }
        async function reveal(i){
          if(busy||i!==current||revealed[i])return;
          busy=true;
          const slide=slides[i],reward=rewards[i]||{},rarity=String(reward.rarity||'common').toLowerCase();
          slide.classList.add('revealing','rarity-'+rarity,'cinematic-hit');
          startFx(rarity);

          /* Use the real rarity audio sequence, not only the small flip blip. */
          try{fhqPlayRarityAudio(rarity,reward)}catch(e){try{fhqV8831Sfx('flip',rarity)}catch(_){}}
          paint();

          /* Let the rarity build happen while the selected card stays centered. */
          await new Promise(function(r){setTimeout(r,fxLead(rarity))});

          /* This is the actual visible card flip. */
          slide.classList.add('revealed');
          revealed[i]=true;
          fhqV8831Sfx('flip',rarity);

          if(['legendary','obsidian','signature'].includes(rarity)){
            try{launchGameConfetti(true)}catch(e){}
          }

          await new Promise(function(r){setTimeout(r,Math.max(520,revealDuration(rarity)-fxLead(rarity)))});
          slide.classList.remove('revealing','cinematic-hit');
          stopFx();

          if(reward.duplicate===true){
            duplicateCount++;
            const amt=Math.max(0,Number(reward.duplicateCoins)||0);duplicateCoins+=amt;runningBalance+=amt;
            setStatus(i,'DUPLICATE  +'+amt+' HQ','duplicate');
            if(amt)fhqShowCoinAward(amt,runningBalance);
          }else if(reward.type==='card'){
            newCardCount++;setStatus(i,'NEW','new');
          }else if(reward.type==='coins'){
            const amt=Math.max(0,Number(reward.value)||0);
            if(amt){bonusCoins+=amt;runningBalance+=amt;fhqShowCoinAward(amt,runningBalance)}
            setStatus(i,'+'+amt+' HQ','coins');
          }else{
            setStatus(i,'NEW','new');
          }

          busy=false;
          paint();
          if(i<rewards.length-1){
            next.classList.add('nudge');
            setTimeout(function(){next.classList.remove('nudge')},900);
          }
        }
        function move(delta){
          if(busy)return;
          const target=current+delta;
          if(target<0||target>=rewards.length)return;
          if(delta>0&&!revealed[current])return;
          current=target;
          fhqV8831Sfx('move');
          slides.forEach(function(s){s.classList.add('shifting')});
          paint();
          setTimeout(function(){slides.forEach(function(s){s.classList.remove('shifting')});if(delta>0&&!revealed[current])reveal(current)},360);
        }
        function fireComplete(){if(completeFired)return;completeFired=true;if(typeof options.onComplete==='function')try{options.onComplete(runningBalance)}catch(e){console.warn(e)}}
        function renderResults(){
          if(!allDone()||busy)return;
          document.removeEventListener('keydown',keyHandler);
          fireComplete();
          try{stopGameConfetti()}catch(e){}
          o.className='fhq-pack-overlay open fhq-v8832-owned fhq-v8832-results';
          if(!o.querySelector('.fhq-v8833-result-close')){
            const resultClose=document.createElement('button');
            resultClose.type='button';
            resultClose.className='fhq-v8833-result-close';
            resultClose.setAttribute('aria-label','Close pack results');
            resultClose.textContent='×';
            resultClose.onclick=function(){fhqClosePack()};
            o.appendChild(resultClose);
          }
          if(title)title.textContent=(pack&&pack.name||'Pack')+' Results';
          if(sub)sub.textContent='Your complete pack';
          const cards=rewards.map(function(x,i){
            const r=String(x.rarity||'common').toLowerCase(),dup=x.duplicate===true,amt=Math.max(0,Number(x.duplicateCoins)||0);
            return '<article class="fhq-v8832-result-card rarity-'+esc(r)+'">'+
              '<div class="fhq-v8832-result-art">'+cardFrontHTML(x)+'</div>'+
              '<div class="fhq-v8832-result-copy"><strong>'+esc(x.name||x.value||'Reward')+'</strong><span>'+esc(r.toUpperCase())+(dup?' • DUPLICATE +'+amt+' HQ':' • NEW')+'</span></div>'+
            '</article>';
          }).join('');
          box.className='fhq-pack-rewards fhq-v8832-results-box';
          box.innerHTML='<div class="fhq-v8832-results-head"><span>PACK SUMMARY</span><strong>'+rewards.length+' PULL'+(rewards.length===1?'':'S')+'</strong></div><div class="fhq-v8832-results-grid">'+cards+'</div><div class="fhq-v8832-results-stats"><b>'+newCardCount+' NEW</b><b>'+duplicateCount+' DUPLICATE'+(duplicateCount===1?'':'S')+'</b><b>+'+(duplicateCoins+bonusCoins)+' HQ COINS</b></div><div class="fhq-v8832-results-actions"><button type="button" data-v8832-done>DONE</button><button type="button" data-v8832-open-again>OPEN ANOTHER</button></div>';
          box.querySelectorAll('.fhq-v8832-card-art').forEach(function(img){img.loading='eager';img.alt='';img.onerror=function(){this.onerror=null;this.alt='';try{this.src=FHQ_V85_PLACEHOLDER}catch(e){this.style.display='none'}}});
          const done=box.querySelector('[data-v8832-done]'),again=box.querySelector('[data-v8832-open-again]');
          if(done)done.onclick=function(e){if(e)e.preventDefault();fhqClosePack()};
          if(again)again.onclick=function(e){if(e)e.preventDefault();const id=pack&&pack.id;fhqClosePack();if(id)setTimeout(function(){fhqBuyPack(id)},180)};
          o.onclick=function(e){
            if(!o.classList.contains('fhq-v8832-results'))return;
            if(e.target===o)fhqClosePack();
          };
        }

        const keyHandler=function(e){
          if(!o.classList.contains('fhq-v8832-interactive'))return;
          if(e.key==='ArrowRight'){e.preventDefault();move(1)}else if(e.key==='ArrowLeft'){e.preventDefault();move(-1)};
        };
        prev.onclick=function(){move(-1)};
        next.onclick=function(){move(1)};
        arena.addEventListener('touchstart',function(e){startX=e.changedTouches&&e.changedTouches[0]?e.changedTouches[0].clientX:null},{passive:true});
        arena.addEventListener('touchend',function(e){if(startX===null)return;const end=e.changedTouches&&e.changedTouches[0]?e.changedTouches[0].clientX:startX,d=end-startX;startX=null;if(Math.abs(d)>45)move(d<0?1:-1)},{passive:true});
        document.addEventListener('keydown',keyHandler);
        finish.onclick=renderResults;
        window.addEventListener('resize',function(){if(o.classList.contains('fhq-v8832-interactive'))centerTrack(false)},{once:false});

        fhqV8831Sfx('land');
        requestAnimationFrame(function(){centerTrack(false);paint();setTimeout(function(){reveal(0)},520)});
      },360);
    },1120);
  }
  let fhqPendingPurchase=null;
  function fhqBalanceMessage(text,bad){
    let el=document.getElementById('fhqBalancePop');if(!el){el=document.createElement('div');el.id='fhqBalancePop';document.body.appendChild(el)}
    el.className='fhq-balance-pop'+(bad?' bad':'');el.textContent=text;clearTimeout(window.__fhqBalancePopTimer);window.__fhqBalancePopTimer=setTimeout(()=>el.remove(),2200);
  }
  function fhqOpenPurchaseConfirm(kind,id,name,price){
    const balance=fhqCachedCoins(),overlay=document.getElementById('fhqPurchaseOverlay');
    if(balance<Number(price||0)){fhqBalanceMessage('INSUFFICIENT BALANCE • Need '+Math.max(0,Number(price||0)-balance)+' more HQ Coins',true);fhqTone&&fhqTone('wrong');return}
    fhqPendingPurchase={kind,id,name,price:Number(price||0)};
    const t=document.getElementById('fhqPurchaseTitle'),c=document.getElementById('fhqPurchaseCopy'),b=document.getElementById('fhqPurchaseBefore'),a=document.getElementById('fhqPurchaseAfter');
    if(t)t.textContent='Purchase '+name+'?';if(c)c.textContent='This purchase uses HQ Coins and cannot be undone.';if(b)b.textContent=String(balance);if(a)a.textContent=String(balance-Number(price||0));
    if(overlay){overlay.classList.add('open');overlay.setAttribute('aria-hidden','false')}
  }
  function fhqClosePurchaseConfirm(){fhqPendingPurchase=null;const o=document.getElementById('fhqPurchaseOverlay');if(o){o.classList.remove('open');o.setAttribute('aria-hidden','true')}}
  function fhqConfirmPurchase(){
    const p=fhqPendingPurchase;if(!p)return;if(p.kind==='pack')fhqBuyPack(p.id,true);else fhqBuyShopItem(p.id,true);fhqClosePurchaseConfirm();
  }

  function fhqBuyPack(id,confirmed){
    const pack=FHQ_PACK_FALLBACK.find(x=>x.id===id)||{};if(!confirmed)return fhqOpenPurchaseConfirm('pack',id,pack.name||'Pack',Number(pack.price||0));
    if(!fhqHasServer())return;const before=fhqCachedCoins();
    google.script.run.withSuccessHandler(function(r){
      const rewards=r&&Array.isArray(r.rewards)?r.rewards:[],
        finalProfile=r&&r.profile?r.profile:null,
        finalAfter=Math.max(0,Number(finalProfile&&finalProfile.hqCoins)||0),
        refundTotal=rewards.reduce(function(sum,x){
          if(x&&x.duplicate===true)return sum+Math.max(0,Number(x.duplicateCoins)||0);
          if(x&&x.type==='coins')return sum+Math.max(0,Number(x.value)||0);
          return sum;
        },0),
        startAfter=Math.max(0,finalAfter-refundTotal);

      /* Show only the actual pack purchase deduction first. Duplicate refunds
         are animated back into the balance when each duplicate converts. */
      fhqAnimateCoinCounter(before,startAfter);

      fhqPlayPackReveal((r&&r.pack)||pack,rewards,{
        startBalance:startAfter,
        onComplete:function(){
          if(finalProfile){
            fhqSetRuntimeIdentity(finalProfile);
            fhqUpdateAccountUI(finalProfile);
            fhqRememberCoins(finalAfter);
          }
          fhqLoadCollections();fhqRenderLocker();fhqLoadShop();
        }
      });
    }).withFailureHandler(function(e){
      const msg=(e&&e.message)||'Unable to open pack.';if(String(msg).includes('INSUFFICIENT_BALANCE'))fhqBalanceMessage('INSUFFICIENT BALANCE',true);else fhqBalanceMessage(msg,true);
    }).openFootballHQPack({token:fhqGetToken(),packId:id});
  }
  function fhqClosePack(){const o=document.getElementById('fhqPackOverlay');if(o){o.classList.remove('open','fhq-pack-cinematic','fhq-pack-results','fhq-v8831-owned','fhq-v8831-interactive','fhq-v8832-owned','fhq-v8832-interactive','fhq-v8832-results');const x=o.querySelector('.fhq-v8833-result-close');if(x)x.remove();o.onclick=null}try{if(window.FHQRevealEngine)FHQRevealEngine.stop()}catch(e){}try{if(window.FHQDuplicateEngine)FHQDuplicateEngine.stop()}catch(e){}fhqAudioStopAll();try{stopGameConfetti()}catch(e){}}
  let fhqLockerPageFilter='all';
  function fhqOwnedPreview(x){if(x.type==='avatar')return fhqAvatarTokenHTML(x.value);if(x.type==='ring')return '<span class="fhq-leader-avatar '+fhqRingClass(x.value)+'">'+fhqAvatarTokenHTML(FHQ_STARTER_AVATAR)+'</span>';if(x.type==='banner')return '<div style="width:88%;height:62px;border-radius:9px" class="'+fhqBannerClass(x.value)+'"></div>';if(x.type==='card')return fhqCardArtHTML(x);return '<span style="font-size:14px;font-weight:1000">'+esc(x.value||x.name)+'</span>'}
  function fhqRenderLocker(){
    const grid=document.getElementById('fhqLockerGrid');if(!grid)return;
    const p=getAccountProfile(),c=window.__fhqCosmetics||{},inv=(Array.isArray(c.inventory)?c.inventory.slice():[]).filter(x=>x&&x.type!=='coins'&&x.type!=='welcome'),level=fhqLevelInfo(Math.max(Number(p.points)||0,fhqLastKnownLifetimePoints())).level;
    FHQ_PASS_REWARDS.filter(r=>r.type!=='coins'&&level>=r.level).forEach(r=>{if(!inv.some(x=>x.type===r.type&&x.value===r.value))inv.push({id:'pass|'+r.level+'|'+r.value,type:r.type,value:r.value,name:r.name,source:'HQ Pass',rarity:r.rarity||'common'})});
    if(!inv.some(x=>x.type==='avatar'&&x.value===FHQ_STARTER_AVATAR))inv.unshift({id:'starter-avatar',type:'avatar',value:FHQ_STARTER_AVATAR,name:'HQ Starter',source:'Starter',rarity:'common'});
    if(!inv.some(x=>x.type==='title'&&x.value===FHQ_STARTER_TITLE))inv.unshift({id:'starter-title',type:'title',value:FHQ_STARTER_TITLE,name:FHQ_STARTER_TITLE,source:'Starter',rarity:'common'});
    const cardCatalog=Array.isArray(window.__fhqCardCatalog)?window.__fhqCardCatalog:[],ownedCards=Array.isArray(c.collection)?c.collection:[];
    ownedCards.forEach(function(id){const card=cardCatalog.find(x=>x.id===id);if(card&&!inv.some(x=>x.type==='card'&&x.value===id))inv.push({id:'card|'+id,type:'card',value:id,name:card.name,set:card.set,rarity:card.rarity,source:'Collection'})});
    const eq=function(x){return (x.type==='avatar'&&fhqProfilePrefs().avatar===x.value)||(x.type==='ring'&&c.ring===x.value)||(x.type==='banner'&&c.banner===x.value)||(x.type==='title'&&fhqEquippedTitle()===x.value)};
    const typeOrder={avatar:0,ring:1,banner:2,title:3,card:4},rarityOrder={signature:0,obsidian:1,legendary:2,epic:3,rare:4,uncommon:5,common:6};
    let list=inv.filter(x=>fhqLockerPageFilter==='all'||x.type===fhqLockerPageFilter);
    list.sort(function(a,b){return Number(eq(b))-Number(eq(a))+(typeOrder[a.type]??99)-(typeOrder[b.type]??99)+(rarityOrder[a.rarity]??9)-(rarityOrder[b.rarity]??9)||String(a.name||a.value).localeCompare(String(b.name||b.value))});
    const cw=document.getElementById('fhqLockerCoins');if(cw)cw.textContent=String(fhqCachedCoins());
    if(!list.length){
      const names={avatar:'Avatars',title:'Titles',ring:'Rings',banner:'Banners',card:'Cards',all:'Items'},name=names[fhqLockerPageFilter]||'Items';
      grid.innerHTML='<div class="fhq-locker-empty"><div class="empty-icon">◇</div><strong>No '+esc(name)+' Available Yet</strong><span>Earn them through HQ Pass, Daily/Weekly Leaderboards, Packs, Collections, or the Shop.</span></div>';return;
    }
    let lastType='';
    grid.innerHTML=list.map(function(x){
      let heading='';if(fhqLockerPageFilter==='all'&&x.type!==lastType){lastType=x.type;heading='<h3 class="fhq-locker-group-title">'+esc(({avatar:'Avatars',ring:'Rings',banner:'Banners',title:'Titles',card:'Cards'})[x.type]||x.type)+'</h3>'}
      const equipped=eq(x);return heading+'<article class="fhq-owned-item '+(equipped?'equipped':'')+'" data-item-type="'+esc(x.type)+'" data-rarity="'+esc(x.rarity||'common')+'"><div class="fhq-owned-preview">'+fhqOwnedPreview(x)+'</div><strong>'+esc(x.name||x.value)+'</strong><small>'+esc(x.source||'Owned')+'</small><div class="fhq-owned-actions">'+(x.type==='card'?'':'<button data-lock-equip="'+esc(x.type)+'" data-lock-value="'+esc(x.value)+'">'+(equipped?'UNEQUIP':'EQUIP')+'</button>')+'</div></article>'
    }).join('');
    grid.querySelectorAll('[data-lock-equip]').forEach(b=>b.onclick=function(){fhqEquipCompetitiveCosmetic(this.dataset.lockEquip,this.dataset.lockValue);setTimeout(fhqRenderLocker,160)});
  }
  
 const FHQ_V836_BANNERS={
'Sunday Survivor':{kicker:'SUNDAY SURVIVOR',title:'The Living Room League',scene:'couch'},
'Fantasy War Room':{kicker:'FANTASY WAR ROOM',title:'Command Center',scene:'warroom'},
'Gridiron IQ':{kicker:'GRIDIRON IQ',title:'The Football Brain Lab',scene:'grid'},
'Game Day Moments':{kicker:'GAME DAY MOMENTS',title:'The Highlight Vault',scene:'moments'},
'Sunday Heroes':{kicker:'SUNDAY HEROES',title:'Faces of Football Sunday',scene:'heroes'},
'Film Room':{kicker:'FILM ROOM',title:'The Tape Lab',scene:'film'},
'Fantasy Rivals':{kicker:'FANTASY RIVALS',title:'League Warfare',scene:'rivals'},
'Game Day Rituals':{kicker:'GAME DAY RITUALS',title:'The Sunday Superstition Room',scene:'rituals'},
'Gridiron Personalities':{kicker:'GRIDIRON PERSONALITIES',title:'Football Characters',scene:'personalities'},
'Fourth Quarter':{kicker:'FOURTH QUARTER',title:'Pressure Chamber',scene:'fourth'},
'Draft Day':{kicker:'DRAFT DAY',title:'The Draft Room',scene:'draft'},
'Weather Warriors':{kicker:'WEATHER WARRIORS',title:'Elements of the Game',scene:'weather'},
'Stadium Life':{kicker:'STADIUM LIFE',title:'Inside the Bowl',scene:'stadium'},
'Football Foodies':{kicker:'FOOTBALL FOODIES',title:'The Tailgate Kitchen',scene:'food'},
'Couch League':{kicker:'COUCH LEAGUE',title:'Home Field Advantage',scene:'couchleague'},
'Rivalry Week':{kicker:'RIVALRY WEEK',title:'House Divided',scene:'rivalry'},
'HQ Originals':{kicker:'HQ ORIGINALS',title:'The Football HQ Vault',scene:'hq'},
'Tailgate Legends':{kicker:'TAILGATE LEGENDS',title:'Parking Lot Royalty',scene:'tailgate'},
'Commissioner Chaos':{kicker:'COMMISSIONER CHAOS',title:'League Office',scene:'commish'},
'Hall of HQ':{kicker:'HALL OF HQ',title:'The Final Tier',scene:'hall'},
'Sunday Legends':{kicker:'SUNDAY LEGENDS',title:'Football Folklore',scene:'legends'},
'Fantasy Legends':{kicker:'FANTASY LEGENDS',title:'The Immortal Lineup',scene:'fantasylegends'},
'Fantasy Royalty':{kicker:'FANTASY ROYALTY',title:'The Commissioner’s Court',scene:'royalty'},
'Game Day':{kicker:'GAME DAY',title:'Kickoff Theater',scene:'gameday'}
};

 function fhqV836BannerScene(setName){
   const m=FHQ_V836_BANNERS[setName]||{kicker:String(setName||'HQ SET').toUpperCase(),title:'Football HQ Collection',scene:'hq'};
   const s=m.scene;
   let art='<rect width="1200" height="360" fill="#0b151d"/><path d="M0 290h1200" stroke="#28485a" stroke-width="3"/>';
   if(s==='couch'||s==='couchleague'){
     art+='<g transform="translate(85 105) scale(2.1)">'+fhqV836Couch(0,0,false,'#54c8f0')+'</g>'+
          '<g transform="translate(820 62)">'+fhqV836TV(0,0,265,165,'SUNDAY','#54c8f0')+'</g>';
   }else if(s==='warroom'||s==='draft'){
     art+='<rect x="70" y="62" width="390" height="210" rx="16" fill="#111d26" stroke="#48bce6" stroke-width="4"/>'+
          '<path d="M115 115h295M115 155h250M115 195h275M115 235h170" stroke="#7593a6" stroke-width="16"/>'+
          '<rect x="700" y="65" width="390" height="205" rx="18" fill="#13232e" stroke="#e1b84f" stroke-width="4"/>'+
          '<path d="M750 230q80-110 165-44t125-70" stroke="#4bc6ef" stroke-width="10" fill="none"/>';
   }else if(s==='grid'||s==='film'){
     art+='<path d="M60 70h520v220H60Z" fill="#10232c" stroke="#52d8c2" stroke-width="4"/>'+
          '<path d="M60 125h520M60 180h520M60 235h520M165 70v220M270 70v220M375 70v220M480 70v220" stroke="#244b5d" stroke-width="2"/>'+
          '<path d="M115 120q90 150 175 20t130 40" stroke="#5ed9ff" stroke-width="14" fill="none"/>'+
          '<rect x="760" y="75" width="310" height="190" rx="20" fill="#12242f" stroke="#5ed9ff" stroke-width="4"/><path d="M820 220 875 160l65 48 75-94" stroke="#67e6c9" stroke-width="12" fill="none"/>';
   }else if(s==='weather'){
     art+='<path d="M80 250q160-180 330 0t330 0 330 0" stroke="#dbe9ee" stroke-width="14" fill="none"/>';
     for(let i=0;i<45;i++){let x=(i*83)%1160+20,y=(i*47)%260+20;art+='<circle cx="'+x+'" cy="'+y+'" r="'+(i%5?5:9)+'" fill="#72c6e7" opacity=".62"/>'}
   }else if(s==='food'||s==='tailgate'){
     art+='<circle cx="255" cy="180" r="115" fill="#d7cfbc" stroke="#deaa45" stroke-width="5"/>'+
          '<circle cx="220" cy="160" r="35" fill="#b44f36"/><circle cx="300" cy="205" r="35" fill="#d29d37"/><circle cx="270" cy="120" r="30" fill="#6a9b58"/>'+
          '<path d="M770 90h250l-35 180H805Z" fill="#28333b" stroke="#55c6ee" stroke-width="5"/>';
   }else if(s==='rivalry'){
     art+='<path d="M600 0v360" stroke="#f0f0ec" stroke-width="6"/><rect width="595" height="360" fill="#711f25" opacity=".65"/><rect x="605" width="595" height="360" fill="#183e63" opacity=".65"/>'+
          '<path d="M475 180h250" stroke="#f1c650" stroke-width="18"/><path d="M545 125 475 180l70 55M655 125l70 55-70 55" stroke="#f1c650" stroke-width="14" fill="none"/>';
   }else if(s==='fourth'||s==='moments'){
     art+='<circle cx="265" cy="180" r="110" fill="#101b22" stroke="#50c7ef" stroke-width="7"/><path d="M265 95v92l68 41" stroke="#eef2f3" stroke-width="13" fill="none"/>'+
          '<path d="M690 270 780 135l90 90 110-160 100 205" stroke="#e44a39" stroke-width="13" fill="none"/>';
   }else if(s==='royalty'||s==='hall'||s==='legends'||s==='fantasylegends'){
     art+='<path d="M105 250 185 90l105 100 105-165 105 165 105-100 80 160Z" fill="#c79a2c" opacity=".82"/>'+
          '<path d="M760 250h320M800 210h240M850 165h140" stroke="#5cccf0" stroke-width="18"/>';
   }else if(s==='personalities'||s==='heroes'){
     art+='<circle cx="235" cy="120" r="48" fill="#d4a071"/><path d="M110 285q25-130 125-130t125 130" fill="#233f4a"/>'+
          '<circle cx="745" cy="105" r="44" fill="#e1ae7e"/><path d="M635 275q18-125 110-125t110 125" fill="#70252b"/>'+
          '<circle cx="1005" cy="130" r="42" fill="#c88f65"/><path d="M905 285q18-115 100-115t100 115" fill="#254c75"/>';
   }else if(s==='commish'){
     art+='<path d="M170 255V80h310v175Z" fill="#101b24" stroke="#8753a9" stroke-width="6"/>'+
          '<path d="M215 125h220M215 170h190M215 215h210" stroke="#d6d6d1" stroke-width="15"/>'+
          '<path d="M820 250 900 80l65 100 70-85 80 155Z" fill="#76519a"/>';
   }else{
     art+='<path d="M160 270 600 60 1040 270" stroke="#4fc8ee" stroke-width="14" fill="none"/>'+
          '<path d="M510 95h180v180H510Z" fill="#112532" stroke="#55c8ef" stroke-width="5"/><text x="600" y="215" text-anchor="middle" fill="#f5f6f6" font-size="82" font-weight="1000">HQ</text>';
   }
   return '<div class="fhq-v836-banner-art"><svg viewBox="0 0 1200 360" preserveAspectRatio="xMidYMid slice">'+art+'</svg>'+
          '<div class="fhq-v836-banner-copy"><span>'+esc(m.kicker)+'</span><strong>'+esc(m.title)+'</strong></div></div>';
 }

const FHQ_COLLECTION_SET_META={
    'Sunday Survivor':{slug:'sunday',label:'SUNDAY SURVIVOR',copy:'The personalities, rituals, and chaos of surviving an entire football Sunday.',rewardCoins:500,rewardTitle:'Sunday Survivor'},
    'Gridiron IQ':{slug:'iq',label:'GRIDIRON IQ',copy:'Football knowledge, film study, reads, adjustments, and strategy.',rewardCoins:450,rewardTitle:'Football Brain'},
    'Game Day Moments':{slug:'moments',label:'GAME DAY MOMENTS',copy:'The plays and situations that make football unforgettable.',rewardCoins:550,rewardTitle:'Moment Maker'},
    'Fantasy War Room':{slug:'warroom',label:'FANTASY WAR ROOM',copy:'Draft-day instincts, waiver moves, trades, sleepers, and league-winning calls.',rewardCoins:650,rewardTitle:'War Room Wizard'},
    'Fantasy Nightmares':{slug:'nightmares',label:'FANTASY NIGHTMARES',copy:'The losses, bench explosions, injuries, and stat corrections every fantasy player remembers.',rewardCoins:700,rewardTitle:'Pain Tolerance'},
    'Football Superstitions':{slug:'rituals',label:'FOOTBALL SUPERSTITIONS',copy:'Lucky jerseys, sacred seats, rally snacks, and the rituals that obviously control the game.',rewardCoins:600,rewardTitle:'Lucky Charm'},
    'Tailgate Legends':{slug:'tailgate',label:'TAILGATE LEGENDS',copy:'Parking-lot heroes, sacred snacks, game-day traditions, and pregame personalities.',rewardCoins:600,rewardTitle:'Lot Legend'},
    'Commissioner Chaos':{slug:'commish',label:'COMMISSIONER CHAOS',copy:'Trades, vetoes, dues, schedules, group-chat fires, and the thankless job of running the league.',rewardCoins:750,rewardTitle:'The Commish'},
    'Hall of HQ':{slug:'hall',label:'HALL OF HQ',copy:'Prestige Football HQ collectibles built for the rarest pulls and biggest completion rewards.',rewardCoins:1000,rewardTitle:'Hall of HQ'},
    'Sunday Heroes':{slug:'heroes',label:'SUNDAY HEROES',copy:'The recognizable people, moods, and rituals that make football Sunday feel like football Sunday.',rewardCoins:650,rewardTitle:'Sunday Hero'},
    'Film Room':{slug:'film',label:'FILM ROOM',copy:'The tape grinders, diagram obsessives, and football-brain characters who see a different game.',rewardCoins:700,rewardTitle:'Film Room General'},
    'Fantasy Rivals':{slug:'rivals',label:'FANTASY RIVALS',copy:'The personalities you know from every fantasy league, from trade sharks to scoreboard stalkers.',rewardCoins:700,rewardTitle:'League Menace'},
    'Game Day Rituals':{slug:'rituals2',label:'GAME DAY RITUALS',copy:'The habits, lucky objects, and completely rational routines fans refuse to change.',rewardCoins:650,rewardTitle:'Ritual Keeper'},
    'Gridiron Personalities':{slug:'personalities',label:'GRIDIRON PERSONALITIES',copy:'Football characters you instantly recognize, exaggerated just enough to become collectibles.',rewardCoins:700,rewardTitle:'Gridiron Character'},
    'Fourth Quarter':{slug:'q4',label:'FOURTH QUARTER',copy:'Pressure, panic, miracles, heartbreak, and the people who somehow survive the final minutes.',rewardCoins:750,rewardTitle:'Fourth Quarter Clutch'},
    'Draft Day':{slug:'draftday',label:'DRAFT DAY',copy:'The boards, reaches, steals, panic picks, and personalities that make every draft unforgettable.',rewardCoins:750,rewardTitle:'Draft Room Boss'},
    'Weather Warriors':{slug:'weather',label:'WEATHER WARRIORS',copy:'Snow, rain, wind, frozen seats, and the fans who insist this is the best possible football weather.',rewardCoins:700,rewardTitle:'Weatherproof'},
    'Stadium Life':{slug:'stadium',label:'STADIUM LIFE',copy:'The sights, sounds, characters, and tiny traditions that only make sense inside a football stadium.',rewardCoins:700,rewardTitle:'Stadium Regular'},
    'Football Foodies':{slug:'food',label:'FOOTBALL FOODIES',copy:'The people who understand that game-day food is not a side activity. It is part of the sport.',rewardCoins:650,rewardTitle:'Game Day Chef'},
    'Couch League':{slug:'couchleague',label:'COUCH LEAGUE',copy:'A collection for everyone whose real home field has cushions, cupholders, blankets, and remotes.',rewardCoins:700,rewardTitle:'Couch League MVP'},
    'Rivalry Week':{slug:'rivalry',label:'RIVALRY WEEK',copy:'The grudges, family arguments, split households, and annual chaos that make rivalry games different.',rewardCoins:750,rewardTitle:'Rivalry Royalty'},
    'HQ Originals':{slug:'originals',label:'HQ ORIGINALS',copy:'Football HQ-only characters designed to become the signature personalities of the collectible universe.',rewardCoins:1000,rewardTitle:'HQ Original'}
  };
  function fhqCollectionCacheKey(){return 'footballHQCollectionsV77:'+String(fhqGetToken()||'guest')}
  function fhqReadCollectionCache(){try{return JSON.parse(localStorage.getItem(fhqCollectionCacheKey())||'null')}catch(e){return null}}
  function fhqWriteCollectionCache(x){try{localStorage.setItem(fhqCollectionCacheKey(),JSON.stringify(x))}catch(e){};if(x&&x.sets){window.__fhqCardCatalog=[];Object.keys(x.sets).forEach(k=>(x.sets[k]||[]).forEach(c=>window.__fhqCardCatalog.push(c)))}}


  let fhqDailyRewardState=null;
  function fhqRenderDailyRewards(state){
    state=state||fhqDailyRewardState||{giftClaimed:false,packClaimed:false,giftCoins:50};
    fhqDailyRewardState=state;
    const gift=document.getElementById('fhqDailyGiftCard'),pack=document.getElementById('fhqFreePackCard'),gb=document.getElementById('fhqDailyGiftBtn'),pb=document.getElementById('fhqFreePackBtn'),gd=document.getElementById('fhqDailyGiftDot'),pd=document.getElementById('fhqFreePackDot');
    if(gift)gift.classList.toggle('claimed',!!state.giftClaimed);if(gift)gift.classList.toggle('available',!state.giftClaimed);
    if(pack)pack.classList.toggle('claimed',!!state.packClaimed);if(pack)pack.classList.toggle('available',!state.packClaimed);
    if(gb){gb.textContent=state.giftClaimed?'CLAIMED':'CLAIM';gb.disabled=!!state.giftClaimed}
    if(pb){pb.textContent=state.packClaimed?'OPENED':'OPEN';pb.disabled=!!state.packClaimed}
    if(gd)gd.style.display=state.giftClaimed?'none':'inline-block';if(pd)pd.style.display=state.packClaimed?'none':'inline-block';
  }
  function fhqLoadDailyRewards(){
    fhqRenderDailyRewards(fhqDailyRewardState);
    if(!fhqHasServer())return;
    google.script.run.withSuccessHandler(function(r){
      if(r&&r.profile){fhqSetRuntimeIdentity(r.profile);fhqUpdateAccountUI(r.profile)}
      if(r&&r.state)fhqRenderDailyRewards(r.state);
    }).withFailureHandler(function(e){console.warn('Daily rewards unavailable',e)}).getFootballHQDailyRewards(fhqGetToken());
  }
  function fhqClaimDailyReward(kind){
    if(!fhqHasServer())return;
    const before=fhqCachedCoins();
    google.script.run.withSuccessHandler(function(r){
      if(r&&r.profile){const after=Number(r.profile.hqCoins)||0;fhqSetRuntimeIdentity(r.profile);fhqUpdateAccountUI(r.profile);if(after>before)fhqShowCoinAward(after-before,after)}
      if(r&&r.state)fhqRenderDailyRewards(r.state);
      if(r&&r.alreadyClaimed){fhqBalanceMessage('Already claimed today.',true);return}
      if(kind==='gift'){
        const o=document.getElementById('fhqDailyGiftOverlay');if(o)o.classList.add('open');
      }else if(kind==='pack'&&r&&r.reward){
        fhqPlayPackReveal(r.pack||{name:'Free Daily Pack',art:'free'},[r.reward]);
        fhqLoadCollections();
      }
    }).withFailureHandler(function(e){fhqBalanceMessage((e&&e.message)||'Daily reward unavailable.',true)}).claimFootballHQDailyReward({token:fhqGetToken(),kind:kind});
  }

  const FHQ_CARD_CATALOG_FALLBACK=[
    {id:"tg001",name:"Conjuke",set:'The Gridiron',rarity:"common",flavor:"He turns drills into highlight reels."},
    {id:"tg002",name:"Turfling",set:'The Gridiron',rarity:"common",flavor:"Small, but holds the whole team down."},
    {id:"tg003",name:"Teezy",set:'The Gridiron',rarity:"common",flavor:"Always ready for the big moment."},
    {id:"tg004",name:"Towelow",set:'The Gridiron',rarity:"common",flavor:"Dries sweat. Occasionally flies away."},
    {id:"tg005",name:"Hashling",set:'The Gridiron',rarity:"common",flavor:"Marks the spots that matter most."},
    {id:"tg006",name:"Cleatle",set:'The Gridiron',rarity:"uncommon",flavor:"Built for traction. Born to win."},
    {id:"tg007",name:"Flagoon",set:'The Gridiron',rarity:"uncommon",flavor:"He saw everything. Throws everything."},
    {id:"tg008",name:"Downster",set:'The Gridiron',rarity:"uncommon",flavor:"Keeps count when the pressure climbs."},
    {id:"tg009",name:"Chaynk",set:'The Gridiron',rarity:"uncommon",flavor:"Together they measure the grind."},
    {id:"tg010",name:"Glovolt",set:'The Gridiron',rarity:"uncommon",flavor:"Sticky hands. Big plays."},
    {id:"tg011",name:"Footsu",set:'The Gridiron',rarity:"rare",flavor:"Every spiral begins with balance."},
    {id:"tg012",name:"Pylonix",set:'The Gridiron',rarity:"rare",flavor:"Touch the corner. Find out."},
    {id:"tg013",name:"Visorcore",set:'The Gridiron',rarity:"rare",flavor:"You can't read what you can't see."},
    {id:"tg014",name:"Snapjaw",set:'The Gridiron',rarity:"rare",flavor:"He snaps. You react."},
    {id:"tg015",name:"Endzonian",set:'The Gridiron',rarity:"rare",flavor:"Lives for touchdowns and celebrations."},
    {id:"tg016",name:"Goalem",set:'The Gridiron',rarity:"epic",flavor:"Everything eventually comes through the uprights."},
    {id:"tg017",name:"Helmutt",set:'The Gridiron',rarity:"epic",flavor:"Big hits. Bigger heart."},
    {id:"tg018",name:"Turfquake",set:'The Gridiron',rarity:"epic",flavor:"He shakes the ground when he moves."},
    {id:"tg019",name:"Stadion",set:'The Gridiron',rarity:"legendary",flavor:"I am the house. I am the roar."},
    {id:"tg020",name:"The Gridiron",set:'The Gridiron',rarity:"obsidian",flavor:"When the lights go out, The Gridiron wakes."},
    {id:"tg021",name:"Pylonix \u2014 Goal Line Inferno",set:'The Gridiron',rarity:"signature",flavor:"The corner belongs to fire."},
    {id:"tg022",name:"Visorcore \u2014 Lights Out",set:'The Gridiron',rarity:"signature",flavor:"The darker it gets, the more he sees."},
    {id:"tg023",name:"Stadion \u2014 Sunday Awakening",set:'The Gridiron',rarity:"signature",flavor:"Sixty thousand voices. One heartbeat."},
    {id:"tg024",name:"Footsu \u2014 Perfect Spiral",set:'The Gridiron',rarity:"signature",flavor:"There is no perfect throw. Only the pursuit of one."}
  ];

function footballHQPhotoStatus(p){
  if(!p)return {status:'missing',source:'none'};
  if(p.photoUrl||p.photo||p.headshot||p.image||p.imageUrl)return {status:'verified',source:'direct'};
  const key=normalizePlayerName(p.player||p.name||'');
  if(typeof sleeperPlayersByName!=='undefined'&&sleeperPlayersByName&&sleeperPlayersByName[key]){
    const s=sleeperPlayersByName[key];
    if(s.id||s.player_id||s.espn_id||s.espnId)return {status:'verified',source:'player-db'};
  }
  if(typeof flockPhotos!=='undefined'&&flockPhotos&&flockPhotos[key])return {status:'verified',source:'ranking-photo'};
  if(p.espnId||p.playerId)return {status:'verified',source:'id'};
  if(String(p.player||p.name||'').trim())return {status:'fallback',source:'Wikipedia'};
  return {status:'missing',source:'none'};
}
function footballHQPlayerPhotoLikelyAvailable(p){
  return footballHQPhotoStatus(p).status!=='missing';
}

function footballHQRiskIsRated(p){
  const v=String((p&&p.tier)||'').trim().toLowerCase();
  return !!v&&!['not rated','unrated','n/a','na','—','-'].includes(v);
}

function footballHQAdminRowsTable(rows,cols,emptyText){
  if(!rows.length)return '<div class="fhq-admin-empty">'+adminEsc(emptyText||'No issues found.')+'</div>';
  return '<div class="fhq-admin-table-wrap"><table class="fhq-admin-table"><thead><tr>'+
    cols.map(c=>'<th>'+adminEsc(c.label)+'</th>').join('')+
    '</tr></thead><tbody>'+
    rows.map(row=>'<tr>'+cols.map(c=>'<td>'+c.render(row)+'</td>').join('')+'</tr>').join('')+
    '</tbody></table></div>';
}

function careerPathDuplicateRoutes(){
  try{
    const map={};
    (CAREER_PATHS||[]).forEach(function(x){
      const key=(x.teams||[]).join('>');
      if(!key)return;
      (map[key]||(map[key]=[])).push(x.name);
    });
    return Object.entries(map).filter(function(entry){return entry[1].length>1}).map(function(entry){return {path:entry[0],players:entry[1]};});
  }catch(e){return []}
}

function footballHQCountGamePool(name){
  try{
    if(name==='Active Players')return typeof activeNFLPlayers==='function'?activeNFLPlayers().length:0;
    if(name==='Legends')return typeof legendGuessPool==='function'?legendGuessPool().length:0;
    if(name==='Career Path')return (typeof CAREER_PATHS!=='undefined'&&Array.isArray(CAREER_PATHS))?CAREER_PATHS.length:0;
    if(name==='Mogger')return typeof mogglePool==='function'?mogglePool().length:0;
    if(name==='Franchise Finder')return typeof guessTeamPool==='function'?guessTeamPool().length:0;
    if(name==='Depth Chart')return typeof depthChartPools==='function'?depthChartPools().length:0;
    return 0;
  }catch(e){return 0}
}

function runFootballHQAdminAudit(force){
  if(footballHQAdminAuditCache&&!force){
    paintFootballHQAdminAudit();
    return footballHQAdminAuditCache;
  }

  const ranked=Array.isArray(players)?players.slice():[];
  const normalized=new Map();
  const duplicates=[];
  const unrated=[];
  const photos=[];
  const photoFallbacks=[];
  const teams=[];
  const top500=[];

  ranked.forEach(function(p,i){
    const rank=i+1;
    const name=String(p.player||p.name||'').trim();
    const key=normalizePlayerName(name);
    const team=String(p.team||'').trim().toUpperCase();
    const pos=String(p.position||'').trim().toUpperCase();

    if(key){
      if(normalized.has(key))duplicates.push({name:name,rank:rank,otherRank:normalized.get(key)});
      else normalized.set(key,rank);
    }

    if(!footballHQRiskIsRated(p)){
      unrated.push({rank:rank,name:name,team:team,pos:pos,risk:p.tier||'Unrated'});
    }

    const photoState=footballHQPhotoStatus(p);
    if(photoState.status==='missing'){
      photos.push({source:'Rankings',rank:rank,name:name,team:team,pos:pos,status:'Missing'});
    }else if(photoState.status==='fallback'){
      photoFallbacks.push({source:'Rankings',rank:rank,name:name,team:team,pos:pos,status:'Fallback: '+photoState.source});
    }

    if(team && typeof nflTeamLogoIds!=='undefined' && !nflTeamLogoIds[team] && !['FA','NFL'].includes(team)){
      teams.push({rank:rank,name:name,team:team,issue:'Unknown team code'});
    }

    if(rank<=500){
      const gaps=[];
      if(!name)gaps.push('name');
      if(!pos)gaps.push('position');
      if(!team)gaps.push('team');
      if(footballHQPhotoStatus(p).status==='missing')gaps.push('photo');
      if(!footballHQRiskIsRated(p))gaps.push('risk');
      if(gaps.length)top500.push({rank:rank,name:name||'(blank)',team:team,pos:pos,gaps:gaps});
    }
  });

  // Legends photo check
  let legends=[];
  try{legends=typeof legendGuessPool==='function'?legendGuessPool():[]}catch(e){}
  legends.forEach(function(p){
    const state=footballHQPhotoStatus(p);
    if(state.status==='missing'){
      photos.push({source:'Legends',rank:'—',name:String(p.name||''),team:String(p.team||''),pos:String(p.position||''),status:'Missing'});
    }else if(state.status==='fallback'){
      photoFallbacks.push({source:'Legends',rank:'—',name:String(p.name||''),team:String(p.team||''),pos:String(p.position||''),status:'Fallback: '+state.source});
    }
  });

  const gamePools=[
    {game:'Active Players',count:footballHQCountGamePool('Active Players'),target:'200+'},
    {game:'Legends',count:footballHQCountGamePool('Legends'),target:'100+'},
    {game:'Career Path',count:footballHQCountGamePool('Career Path'),target:'50+'},
    {game:'Mogger',count:footballHQCountGamePool('Mogger'),target:'50+'},
    {game:'Franchise Finder',count:footballHQCountGamePool('Franchise Finder'),target:'32'},
    {game:'Depth Chart',count:footballHQCountGamePool('Depth Chart'),target:'20+'}
  ];

  const hardIssues=duplicates.length+teams.length;
  const health=Math.max(0,Math.round(
    100
    - Math.min(35,hardIssues*5)
    - Math.min(30,photos.length*2)
    - Math.min(20,Math.max(0,500-ranked.length)*.3)
  ));

  footballHQAdminAuditCache={
    at:new Date().toISOString(),
    rankedCount:ranked.length,
    unrated:unrated,
    photos:photos,
    photoFallbacks:photoFallbacks,
    duplicates:duplicates,
    teams:teams,
    top500:top500,
    legendsCount:legends.length,
    gamePools:gamePools,
    health:health
  };

  try{localStorage.setItem('footballHQAdminAuditV1',JSON.stringify(footballHQAdminAuditCache))}catch(e){}
  paintFootballHQAdminAudit();
  return footballHQAdminAuditCache;
}

function adminPill(text,type){
  return '<span class="fhq-admin-pill '+(type||'')+'">'+adminEsc(text)+'</span>';
}

function paintFootballHQAdminAudit(){
  const a=footballHQAdminAuditCache;if(!a)return;

  const score=document.getElementById('fhqAdminHealthScore');if(score)score.textContent=a.health+'%';
  const ranked=document.getElementById('fhqHealthRanked');if(ranked)ranked.textContent=a.rankedCount;
  const unrated=document.getElementById('fhqHealthUnrated');if(unrated)unrated.textContent=a.unrated.length;
  const photos=document.getElementById('fhqHealthPhotos');if(photos)photos.textContent=a.photos.length;
  const integrity=document.getElementById('fhqHealthIntegrity');if(integrity)integrity.textContent=a.duplicates.length+a.teams.length;

  const cardClass=function(id,count,warn){
    const el=document.getElementById(id);if(!el)return;
    el.classList.remove('good','warn','bad');
    el.classList.add(count===0?'good':(count<=warn?'warn':'bad'));
  };
  cardClass('fhqHealthCardRanked',a.rankedCount>=500?0:1,0);
  cardClass('fhqHealthCardUnrated',0,0);
  cardClass('fhqHealthCardPhotos',a.photos.length,15);
  cardClass('fhqHealthCardIntegrity',a.duplicates.length+a.teams.length,2);

  const overview=document.getElementById('fhqAdminOverview');
  if(overview){
    overview.innerHTML=
      '<div class="fhq-admin-table-wrap"><table class="fhq-admin-table"><tbody>'+
      '<tr><td><strong>Top 500 status</strong></td><td>'+(a.rankedCount>=500?adminPill('READY','good'):adminPill(a.rankedCount+'/500','bad'))+'</td></tr>'+
      '<tr><td><strong>Legends in guess pool</strong></td><td>'+adminEsc(a.legendsCount)+'</td></tr>'+
      '<tr><td><strong>Unrated rankings</strong></td><td>'+adminEsc(a.unrated.length)+'</td></tr>'+
      '<tr><td><strong>True photo gaps</strong></td><td>'+adminEsc(a.photos.length)+'</td></tr>'+
      '<tr><td><strong>Photo fallbacks available</strong></td><td>'+adminEsc((a.photoFallbacks||[]).length)+'</td></tr>'+
      '<tr><td><strong>Duplicate names</strong></td><td>'+adminEsc(a.duplicates.length)+'</td></tr>'+
      '<tr><td><strong>Unknown team mappings</strong></td><td>'+adminEsc(a.teams.length)+'</td></tr>'+
      '<tr><td><strong>Client routing / IDs</strong></td><td>'+adminPill('PASS','good')+'</td></tr>'+
      '<tr><td><strong>Score display sync</strong></td><td>'+adminPill('V40','good')+'</td></tr>'+
      '<tr><td><strong>Last audit</strong></td><td>'+adminEsc(new Date(a.at).toLocaleString())+'</td></tr>'+
      '</tbody></table></div>';
  }

  const colsBase=[
    {label:'Rank',render:r=>adminEsc(r.rank)},
    {label:'Player',render:r=>adminEsc(r.name)},
    {label:'Team',render:r=>adminEsc(r.team||'—')},
    {label:'Pos',render:r=>adminEsc(r.pos||'—')}
  ];

  const u=document.getElementById('fhqAdminUnrated');
  if(u)u.innerHTML=footballHQAdminRowsTable(a.unrated,colsBase.concat([
    {label:'Status',render:r=>adminPill('Unrated','warn')}
  ]),'Every ranked player is rated.');

  const p=document.getElementById('fhqAdminPhotos');
  if(p){
    const photoRows=(a.photos||[]).concat(a.photoFallbacks||[]);
    p.innerHTML=footballHQAdminRowsTable(photoRows,[
      {label:'Source',render:r=>adminEsc(r.source)},
      {label:'Rank',render:r=>adminEsc(r.rank)},
      {label:'Player',render:r=>adminEsc(r.name)},
      {label:'Team',render:r=>adminEsc(r.team||'—')},
      {label:'Pos',render:r=>adminEsc(r.pos||'—')},
      {label:'Status',render:r=>String(r.status||'').indexOf('Fallback')===0?adminPill(r.status,'warn'):adminPill('Missing photo','bad')}
    ],'No photo issues detected.');
  }

  const d=document.getElementById('fhqAdminDuplicates');
  if(d)d.innerHTML=footballHQAdminRowsTable(a.duplicates,[
    {label:'Player',render:r=>adminEsc(r.name)},
    {label:'First rank',render:r=>adminEsc(r.otherRank)},
    {label:'Duplicate rank',render:r=>adminEsc(r.rank)},
    {label:'Status',render:r=>adminPill('Duplicate','bad')}
  ],'No duplicate ranking names found.');

  const t=document.getElementById('fhqAdminTeams');
  if(t)t.innerHTML=footballHQAdminRowsTable(a.teams,[
    {label:'Rank',render:r=>adminEsc(r.rank)},
    {label:'Player',render:r=>adminEsc(r.name)},
    {label:'Team',render:r=>adminEsc(r.team)},
    {label:'Issue',render:r=>adminPill(r.issue,'bad')}
  ],'No unknown team codes detected.');

  const g=document.getElementById('fhqAdminGames');
  if(g)g.innerHTML=footballHQAdminRowsTable(a.gamePools,[
    {label:'Game',render:r=>adminEsc(r.game)},
    {label:'Pool size',render:r=>adminEsc(r.count)},
    {label:'Target',render:r=>adminEsc(r.target)},
    {label:'Status',render:r=>{
      const n=Number(r.count)||0;
      const min=parseInt(String(r.target),10)||1;
      return adminPill(n>=min?'Healthy':'Needs expansion',n>=min?'good':'warn');
    }}
  ],'No game pools available.');

  const top=document.getElementById('fhqAdminTop500');
  if(top)top.innerHTML=footballHQAdminRowsTable(a.top500,[
    {label:'Rank',render:r=>adminEsc(r.rank)},
    {label:'Player',render:r=>adminEsc(r.name)},
    {label:'Team',render:r=>adminEsc(r.team||'—')},
    {label:'Pos',render:r=>adminEsc(r.pos||'—')},
    {label:'Missing / incomplete',render:r=>r.gaps.map(x=>adminPill(x,'warn')).join(' ')}
  ],'Top 500 has no detected gaps.');
}


function loadFootballHQAdminAccounts(){
  const list=document.getElementById('fhqAdminAccountsList');
  const status=document.getElementById('fhqAdminAccountsStatus');
  if(!list)return;
  list.innerHTML='<div style="padding:12px;color:#8d99a3">Loading accounts…</div>';
  if(status)status.textContent='';
  const adminAccountWatchdog=setTimeout(function(){
    if(list&&/Loading accounts/.test(list.textContent||'')){
      list.innerHTML='<div style="padding:12px;color:#8d99a3">Account list is taking too long to load. <button type="button" id="fhqAdminRetryAccounts" class="fhq-admin-btn" style="margin-left:8px">RETRY</button></div>';
      const retry=document.getElementById('fhqAdminRetryAccounts');if(retry)retry.onclick=loadFootballHQAdminAccounts;
    }
  },3500);
  if(!fhqHasServer()){clearTimeout(adminAccountWatchdog);
    list.innerHTML='<div style="padding:12px;color:#8d99a3">Backend unavailable.</div>';
    return;
  }
  google.script.run
    .withSuccessHandler(function(rows){
      clearTimeout(adminAccountWatchdog);
      rows=Array.isArray(rows)?rows:[];
      if(!rows.length){
        list.innerHTML='<div style="padding:12px;color:#8d99a3">No accounts found.</div>';
        return;
      }
      list.innerHTML=rows.map(function(a){
        const safeToken=esc(a.token||'');
        return '<div class="fhq-admin-account-row">'+
          '<div><strong>'+esc(a.username||'Guest')+'</strong><small>'+safeToken.slice(0,18)+'…</small></div>'+
          '<div><strong>'+Number(a.points||0)+'</strong><small>points</small></div>'+
          '<div><strong>'+Number(a.totalDailies||0)+'</strong><small>dailies</small></div>'+
          '<button type="button" data-fhq-claim-token="'+safeToken+'">Make Current</button>'+
        '</div>';
      }).join('');

      list.querySelectorAll('[data-fhq-claim-token]').forEach(function(btn){
        btn.onclick=function(){
          const token=this.getAttribute('data-fhq-claim-token')||'';
          if(status)status.textContent='Switching current account…';
          google.script.run
            .withSuccessHandler(function(profile){
              if(profile){
                fhqSetManualAccountPin(profile.token||token);
                fhqLockPrimaryAccount(profile.token||token,profile);
                fhqSetRuntimeIdentity(profile);
                fhqWriteLastConfirmedAccount(profile);
                if(profile.username)fhqSetUsername(profile.username);
                fhqRememberLifetimePoints(Number(profile.points)||0);
                fhqUpdateAccountUI(profile);
                fhqSyncLocalProfileFromServer(profile);
                refreshFootballHQScoreDisplays();
                if(status)status.textContent='Current account changed to '+(profile.username||'Guest')+'. This account is now pinned to this browser.';
                renderStandaloneLeaderboard();
                loadFootballHQAdminAccounts();
              }
            })
            .withFailureHandler(function(error){
              if(status)status.textContent=(error&&error.message)||'Could not switch account.';
            })
            .claimFootballHQAccountForBrowser(token);
        };
      });
    })
    .withFailureHandler(function(error){
      clearTimeout(adminAccountWatchdog);
      list.innerHTML='';
      if(status)status.textContent=(error&&error.message)||'Could not load accounts.';
    })
    .listFootballHQAccountsForAdmin();
}

const fhqAdminRefreshAccountsBtn=document.getElementById('fhqAdminRefreshAccounts');
if(fhqAdminRefreshAccountsBtn)fhqAdminRefreshAccountsBtn.onclick=loadFootballHQAdminAccounts;

function openFootballHQAdminTab(name){
  document.querySelectorAll('.fhq-admin-tab').forEach(function(b){
    b.classList.toggle('active',b.dataset.adminTab===name);
  });
  document.querySelectorAll('.fhq-admin-panel').forEach(function(p){p.classList.remove('show')});
  const id='fhqAdmin'+name.charAt(0).toUpperCase()+name.slice(1);
  const panel=document.getElementById(id);if(panel)panel.classList.add('show');
  if(name==='accounts')loadFootballHQAdminAccounts();
}

function hideFootballHQMainPagesForAdmin(){
  ['rankingsStandalone','draftSetupPanel','draftTabsShell','fhqGamesHub','fhqLeaderboardPage','homePage'].forEach(function(id){
    const el=document.getElementById(id);if(el)el.style.display='none';
  });
}

function openFootballHQAdmin(){
  openFootballHQSection('admin');
}

function closeFootballHQAdminIfNeeded(){
  const page=document.getElementById('fhqAdminPage');
  if(page){page.classList.remove('show');page.style.display='none'}
  document.body.classList.remove('admin-page');
}

function exportFootballHQAdminAudit(){
  const a=runFootballHQAdminAudit(false);
  const blob=new Blob([JSON.stringify(a,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const link=document.createElement('a');
  link.href=url;link.download='football-hq-database-health-'+new Date().toISOString().slice(0,10)+'.json';
  document.body.appendChild(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

if(typeof window!=='undefined'){
  window.openFootballHQAdmin=openFootballHQAdmin;
  window.openFootballHQAdminTab=openFootballHQAdminTab;
  window.runFootballHQAdminAudit=runFootballHQAdminAudit;
  window.exportFootballHQAdminAudit=exportFootballHQAdminAudit;
}

function initFootballHQHome(){
    document.title='Football HQ';
    document.body.classList.add('fhq-sidebar-on');
    document.querySelectorAll('[data-locker-filter]').forEach(b=>b.onclick=function(){fhqApplyLockerFilter(this.dataset.lockerFilter)});
    document.querySelectorAll('[data-shop-filter]').forEach(b=>b.onclick=function(){fhqShopFilter=this.dataset.shopFilter;document.querySelectorAll('[data-shop-filter]').forEach(x=>x.classList.toggle('active',x===this));fhqLoadShop()});
    const placementLater=document.getElementById('fhqPlacementLater');if(placementLater)placementLater.onclick=fhqClosePlacementReward;
    const placementEquip=document.getElementById('fhqPlacementEquip');if(placementEquip)placementEquip.onclick=function(){const o=document.getElementById('fhqPlacementOverlay');if(o)fhqEquipCompetitiveCosmetic(o.dataset.rewardType,o.dataset.rewardValue);fhqClosePlacementReward()};
    const fhqComingClose=document.getElementById('fhqComingClose');
    if(fhqComingClose)fhqComingClose.onclick=function(){const m=document.getElementById('fhqComingModal');if(m){m.classList.remove('open');m.setAttribute('aria-hidden','true')}};
    const fhqComingModal=document.getElementById('fhqComingModal');
    if(fhqComingModal)fhqComingModal.onclick=function(e){if(e.target===fhqComingModal){fhqComingModal.classList.remove('open');fhqComingModal.setAttribute('aria-hidden','true')}};

    document.querySelectorAll('[data-fhq-nav]').forEach(b=>b.onclick=function(){
      openFootballHQSection(this.dataset.fhqNav);
    });
    document.querySelectorAll('[data-home-open]').forEach(b=>b.onclick=function(){openFootballHQSection(this.dataset.homeOpen)});
    const accountCard=document.getElementById('fhqAccountCard');if(accountCard)accountCard.onclick=fhqOpenAccountModal;
    const accountSave=document.getElementById('fhqAccountSave');if(accountSave)accountSave.onclick=fhqRegisterAccount;
    const accountCancel=document.getElementById('fhqAccountCancel');if(accountCancel)accountCancel.onclick=fhqCloseAccountModal;
    const guestChoice=document.getElementById('fhqGuestChoice');if(guestChoice)guestChoice.onclick=function(){
      fhqCloseAccountModal();
    };
    const footballChoice=document.getElementById('fhqFootballAccountChoice');if(footballChoice)footballChoice.onclick=function(){
      const form=document.getElementById('fhqFootballAccountForm');if(form)form.classList.add('open');
      const input=document.getElementById('fhqUsernameInput');if(input){input.value=fhqGetUsername();setTimeout(()=>input.focus(),30)}
    };
    const googleChoice=document.getElementById('fhqGoogleChoice');if(googleChoice)googleChoice.onclick=function(){
      const err=document.getElementById('fhqAccountError');
      const form=document.getElementById('fhqFootballAccountForm');if(form)form.classList.add('open');
      if(err)err.textContent='Google sign-in is the next account step; Football HQ username sign-in works now.';
    };
    const accountModal=document.getElementById('fhqAccountModal');if(accountModal)accountModal.onclick=function(e){if(e.target===accountModal)fhqCloseAccountModal()};

    document.querySelectorAll('[data-game-open]').forEach(function(c){
      c.onclick=function(e){
        if(e){e.preventDefault();e.stopPropagation();}
        openFootballHQGame(this.dataset.gameOpen);
      };
    });
    // Paint the last confirmed Daily score immediately while the backend refreshes.
    fhqPrimeHomeTodayPoints();
    fhqPrimeUnifiedHomeState();
    // Let account recovery settle first; then reconcile any unsent Daily awards.
    setTimeout(reconcileSavedDailyAwards,650);
    refreshFootballHQScoreDisplays();
    fhqPrimeHomeTodayPoints();
    if(fhqHasServer()){
      google.script.run
        .withSuccessHandler(function(data){if(data){window.__fhqLeaderboardPeriodsCache=data;window.__fhqLeaderboardPeriodsCacheAt=Date.now();fhqPaintHomeDailyRank(data)}})
        .withFailureHandler(function(){})
        .getFootballHQLeaderboardPeriods(fhqGetToken());
    }
    fhqBindProfile();

    const mobileMenuBtn=document.getElementById('fhqMobileMenuBtn');
    const mobileScrim=document.getElementById('fhqMobileScrim');
    const mobileLogo=document.getElementById('fhqMobileLogo');
    function closeFHQMobileMenu(){document.body.classList.remove('fhq-mobile-menu-open')}
    if(mobileMenuBtn)mobileMenuBtn.onclick=function(){document.body.classList.toggle('fhq-mobile-menu-open')};
    if(mobileScrim)mobileScrim.onclick=closeFHQMobileMenu;
    if(mobileLogo){
      mobileLogo.onclick=function(){closeFHQMobileMenu();openFootballHQSection('home')};
      mobileLogo.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();closeFHQMobileMenu();openFootballHQSection('home')}};
    }
    document.querySelectorAll('[data-fhq-nav]').forEach(function(btn){
      btn.addEventListener('click',closeFHQMobileMenu);
    });
    document.querySelectorAll('[data-leader-period]').forEach(function(btn){
      btn.onclick=function(e){
        e.preventDefault();e.stopPropagation();
        setFootballHQLeaderboardPeriod(this.dataset.leaderPeriod||'alltime');
      };
    });

    const brandHome=document.getElementById('fhqBrandHome');
    if(brandHome){
      brandHome.onclick=function(){openFootballHQSection('home')};
      brandHome.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openFootballHQSection('home')}};
    }
    fhqLoadWorldBests();
    fhqBindWorldRankingCells();
    fhqPrimeLeaderboardPointDisplay();
    if(typeof requestIdleCallback==='function')requestIdleCallback(function(){try{fhqBuildCareerIndexes()}catch(e){}},{timeout:1800});
    else setTimeout(function(){try{fhqBuildCareerIndexes()}catch(e){}},1200);
    const adminRefreshAccounts=document.getElementById('fhqAdminRefreshAccounts');
    if(adminRefreshAccounts)adminRefreshAccounts.onclick=loadFootballHQAdminAccounts;
    fhqLoadSharedProfile();
    setTimeout(function(){renderStandaloneLeaderboard();fhqLoadDailyRewards();},220);
    fhqBindV79Controls();
    scheduleTop500Extension(250);
    setTimeout(runFootballHQDatabaseIntegrity,1800);
    startRankingsHealthMonitor();
    openFootballHQSection('home');
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){init();initFootballHQHome()});else{init();initFootballHQHome()}
})();
