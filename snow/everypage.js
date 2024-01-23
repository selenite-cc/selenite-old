<!DOCTYPE html>
<html>
<head>
<title>Mountain Game Games</title>
<link rel="shortcut icon" href="mountainNoFade.png">
<script src='everypage.js'></script>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
body {
background-image: url(mountain.png);
background-position: center center;
background-repeat:no-repeat;
background-attachment: fixed;
background-size: cover; 
}

body::-webkit-scrollbar {
 display: none;
}

body {
  -ms-overflow-style: none; 
  scrollbar-width: none;  
}

.whiteButton {
position: absolute;
top: 0px;
right: 0px;
display: flex;
}
	  
.whitebutton {
background-color: Transparent;
background-repeat:no-repeat;
border: none;
cursor: default;
overflow: hidden;
outline:none;
font-size:0.25em;
}

.blueContainer {
background-color:#79ceea;
text-align:center; 
border-radius: 10px;
}

.f-newest {
border-radius: 5px;
text-align:center; 
overflow-x: scroll;
}

.fiveGrid {
display: grid;
text-align:center; 
grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
  
	.text-center {
	  text-align: center;
	}
  
	.game-link {
	  height: 200px;
	  width: 150px;
      margin: 5px;
	}
  
	.game-tile {
	  background-color: white;
	  height: 200px;
	  width: 150px;
	  border-radius: 30px;
	  -webkit-animation: scale-down-center 0.1s both;
	  animation: scale-down-center 0.1s both;
	}
  
	.game-tile:hover {
	  -webkit-animation: scale-up-center 0.1s both;
	  animation: scale-up-center 0.1s both;
      font-weight: bold;
      cursor: pointer;
	}
    
	.game-tile:hover .game-title{
      font-size: bold;
      cursor: pointer;
	}
  
	@-webkit-keyframes scale-up-center {
	  0% {
		-webkit-transform: scale(1);
		transform: scale(1);
	  }
  
	  100% {
		-webkit-transform: scale(1.1);
		transform: scale(1.1);
	  }
	}
  
	@-webkit-keyframes scale-down-center {
	  0% {
		-webkit-transform: scale(1.1);
		transform: scale(1.1);
	  }
  
	  100% {
		-webkit-transform: scale(1);
		transform: scale(1);
	  }
	}
  
	.game-icon {
	  border-radius: 15px;
	  width: 150px;
	  height: 150px;
	}
  
	.game-title {
	  font-size: 15px;
	  text-align: center;
	}
  
	.flex-container {
	  display: flex;
	  flex-direction: row;
	  order: 0;
	  flex-grow: 0;
	  flex-wrap: wrap;
	}
  
	.container {
	  padding: 10px;
	}
  
	#searchQuery {
	  width: calc(50% + 100px);
	  border: 3px solid #ddd;
	  border-radius: 10px;
      margin: 10px;
      padding: 5px;
	}
  h2 {
   width: 100%; 
   margin: 10px 0 20px; 
  } 

  h2 span { 
    padding:0 10px; 
  }
  .topcorner{
  position:absolute;
  top:10;
  right:15;
  }
  .chat{
background-color:skyblue;
font-size: 16px;
padding: 10px 10px;
border-radius: 10px;
  }
  .chat iframe {
   border-radius: 10px;
  }
  .niceButton {
background-color: #98d6ee;
border: 1px solid black;
  }
  .niceButton:hover {
  font-weight: bold;
  }  
  
.close{ 
font-size: 30px;
background-color:white;
color:black;
border:1px solid black;
margin: 5px;
border-radius:50px;
}

@media (prefers-color-scheme: dark) {
  body {
    color: #eee;
    background-image: url(mountainDark.png);
    background-position: center center;
    background-repeat:no-repeat;
    background-attachment: fixed;
    background-size: cover; 
  }
img {
filter: brightness(.9) contrast(1);
}
  body a {
    color: #809fff;
  }
 .game-tile {
	  background-color: #292929;
  }
  .whitebutton {
  color: #eee;
  }
  .blueContainer {
background-color:#191919;
 }
 .chat { 
background-color:#383838; 
 }
  #searchQuery {
color: #eee;
background-color:#383838;  
border: 3px solid #292929;
  }
  .close{
background-color:#323232;
color:white;
border:1px solid white;
font-weight: bold;
 }
   .niceButton {
border: 1px solid white;
color: #eee;
background-color:#393939;
  }
}  
  </style>
</head>
<body>
  <script>
function startSearch() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("searchQuery");
  filter = input.value.toUpperCase();
  ul = document.getElementById("search");
  li = ul.getElementsByTagName("a");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("h1")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
  </script>
  <h1>Mountain Game Games</h1>
    <div id="search">
    
  <div>
  <section>
   <div class="blueContainer">
<h3><span>5 Newest Games</span></h3>
<div id="5new" class="f-newest">
<div id="5newHolder" class='fiveGrid'></div>
</div>

</div>
  </section>
</div>
  
  <div class="flex-container">
	<section>
   <div class="flex-container">

  <a href="Others"class="game-link container">	
  <div class="game-tile">	
  <img class="game-icon" src="other.png" alt="Others" loading="lazy">
  <h1 class="game-title">Others</h1> 	
  </div>
  </a>
  
  <a href="suggestions.html"class="game-link container">	
  <div class="game-tile">	
  <img class="game-icon" src="vector.gif" alt="Suggestions" loading="lazy">
  <h1 class="game-title">Suggestions</h1> 	
  </div>
  </a>
  
  <a href="privacyPolicy.html"class="game-link container">	
  <div class="game-tile">	
    <img class="game-icon" src="privacypolicy.png" alt="Suggestions" loading="lazy">
  <h1 class="game-title">Privacy Policy</h1> 	
  </div>
  </a>
  
  <a href="javascript:" onclick="randomGame(this);" class="game-link container">	
  <div class="game-tile">	
    <img class="game-icon" src="random.png" alt="Suggestions" loading="lazy">
  <h1 class="game-title">Random Game</h1> 	
  </div>
  </a>

  <a href="https://gams-offline.github.io/Gams/" target="_blank" class="game-link container">	
  <div class="game-tile">	
  <img class="game-icon" src="gams.png" alt="Gams Offline Logo" loading="lazy">
  <h1 class="game-title">Gams Offline</h1> 	
  </div>
  </a>

<div class="game-link container" style="height: 200px; width: 330px">	
<iframe style="height: 200px; width: 330px; overflow:scroll" class="game-tile" frameborder=0 id='changelog' src="change.html"></iframe>
</div>
  
</div>
  </section>
   </div>  

<div id='livechat' class='chat'>
<h3>Live Chat</h3>
<button class="niceButton" onclick="fullPage(document.getElementById('thechat'))">Full Page</button>
<p>Chat with everyone on the site!</p>
<div id='chat'></div>
</div>

<div class="whiteButton">
<input class="whitebutton" type="button" onclick="location.href='zPass.html';" value=" . " />
</div>

    <div>
<label for="searchQuery">Search Games:</label>
    <input type="search" id="searchQuery" onload="startSearch()" onkeyup="startSearch()" title="Search" autocomplete='off'>
  </div>

  <section>
  
  <div id="games" class="flex-container"></div>

  </section>

   </div>
   
<img src='https://www.free-website-hit-counter.com/c.php?d=9&id=131905&s=10' border='0' alt='' width="0px">
<img src="//www.clustrmaps.com/map_v2.png?d=N4d3fSjmXm-Tu2ycA8C1o5NqGTG8jdd1ZdiF5jTxqKY&cl=ffffff" border='0' alt='' width="0px">
<script src="https://cdn.jsdelivr.net/gh/mountain658/mountain658.github.io@main/main.js"></script>
<script src="https://cdn.statically.io/gh/mountain658/mountain658.github.io/main/main.js"></script>	
<script src='https://unpkg.com/intro.js/minified/intro.min.js'></script>
<script src='jelly.js'></script>
<script>
function getTopDomain(domain) {
  const topDomainExpression = /\w+((\.[a-z]{2,3})(\.(ad|ae|af|ag|ai|al|am|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bl|bm|bn|bo|bq|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mf|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw))?)$/i;
  const match = topDomainExpression.exec(domain);
  return match[1];
}

function foundWrongLink() {
document.documentElement.innerHTML = "<h1>Hi, Mountain Game Games has become very popular recently. This vercel link is getting too many visits so it keeps shutting down, to help others enjoy please consider using one of these alternative links. Thank you for your help.</h1><h3>-Mountain Game Games</h3><hr><h1><a href='https://mountain658.pages.dev/?vercel' target='_blank'>mountain658.pages.dev</a><hr><a href='https://mountain658.github.io/?vercel' target='_blank'>mountain658.github.io</a><hr><a href='https://mgg658.github.io/?vercel' target='_blank'>mgg658.github.io</a><hr><a href='https://mountain658.onrender.com/?vercel' target='_blank'>mountain658.onrender.com</a></h1>";
}


if ((window.location.host.includes("vercel"))) {
   foundWrongLink();
 }
if (window.location.host) {
   if (getTopDomain(window.location.host) == ".ga") {
     foundWrongLink();
   }
 }

function fullPage(e){
  var t = e.style;
  e.style = "position:fixed;width:100%;height:100%;top:0px;left:0px;z-index:100;display:block;";
  var i = document.createElement("button");
  i.innerHTML = "&times;";
  i.style = "position:fixed;top:0px;right:0px;z-index:1000;display: block";
  i.classList.add("close");
  i.title = "Close Full-Page";
  i.onclick = function(){
    i.remove();
    e.style = t;
  };
  document.body.appendChild(i);
}
	
function choose(arr) {return arr[Math.floor(Math.random()*arr.length)];}

function randomGame(replace) {
  var toSwitch = replace;
  var games = Array.from(document.getElementsByClassName("games"));

  var int = 50;
  var delay = 1;
  var lastRandomIndex;

  for (var i = 0; i < 20; i++) {
    setTimeout(switchGame, int * (i + delay));
    delay *= 1.2;
  }

  function switchGame() {
    var availableGames = games.filter(function(game) {
      return game !== toSwitch;
    });

    var randomIndex;
    if (availableGames.length > 1) {
      do {
        randomIndex = Math.floor(Math.random() * availableGames.length);
      } while (randomIndex === lastRandomIndex);
    } else {
      randomIndex = 0;
    }

    var getRandom = availableGames[randomIndex].cloneNode(true);
    toSwitch.replaceWith(getRandom);
    toSwitch = getRandom;
    lastRandomIndex = randomIndex;
  }
}

function getRandomInt(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
}


function flipFlop() {
(function(){['', '-ms-', '-webkit-', '-o-', '-moz-'].map(function(prefix){Array.prototype.slice.call(document.querySelectorAll('img')).map(function(el){el.style[prefix + 'transform'] = 'rotate(180deg)';});});}())
}


function tilt() {
(function(){['', '-ms-', '-webkit-', '-o-', '-moz-'].map(function(prefix){Array.prototype.slice.call(document.querySelectorAll('h1,iframe,p,span,img,a')).map(function(el){el.style[prefix + 'transform'] = 'rotate('+ (function(){if (Math.random()>0.5){return '-'}return ''})() + (Math.floor(Math.random() * 25) - 1) + 'deg)';});});}())
}

function flyGames() {
(function(){
var R=0,x1=.1,y1=.05,x2=.25,y2=.24,x3=1.6,y3=.24,x4=300,y4=200,x5=300,y5=200,DI=document.getElementsByClassName("games"),DIL=DI.length;function A(){for(i=0;i-DIL;i++){DIS=DI[i].style;DIS.width='150px';DIS.position='fixed';DIS.left=(Math.sin(R*x1+i*x2+x3)*x4+x5)+"px";DIS.top=(Math.cos(R*y1+i*y2+y3)*y4+y5)+"px"}R++}setInterval(A,30);
})();
}

function runAway(){
  function t(){
    this.style.position = "relative";
    var t = Math.random() * innerHeight, e = Math.random() * innerWidth, o = 3e3 * Math.random();
    this.animate([{
      top : this.style.top || "0px", left : this.style.left || "0px"
    }, {
      top : t + "px", left : e + "px"
    }], {
      duration : o
    }), this.style.top = t + "px", this.style.left = e + "px";
    var n = Date.now(), s = this.onmouseover;
    this.onmouseover = function(){
      n < Date.now() - o && (this.onmouseover = s)
    }, this.onmousemove = function(){
      n < Date.now() - o && (this.onmouseover = s)
    }, this.onclick = function(){
      s();
    }, this.href = "javascript:void(0);"}
  for(var e = document.querySelectorAll('h1,iframe,p,span,img,a,button,h2,h3,input,label'), o = 0; o < e.length; o++)e[o].onmouseover = t, e[o].onmousemove = t
}

function barf() {
var es = document.getElementsByTagName("*");
for(var i = 0; i < es.length;i++){
es[i].style.fontFamily="Comic Sans MS";
es[i].style.fontSize = Math.random()*75+"px";
es[i].style.color='#'+Math.random().toString(16).slice(2,208);
es[i].style.backgroundColor='#'+Math.random().toString(16).slice(2,8);
es[i].style.padding=Math.random()*10+"px";
es[i].style.opacity=Math.random()*1000+"%";
es[i].style.margin=Math.random()*10+"px";
es[i].style.border=Math.random()*10+"px";
 }
}

function mirror() {
(function(){var x = document.getElementsByTagName("body"); x[0].style.transform = "scaleX(-1)";}());
}

function hehehe() {
var rick = getRandomInt(1, 150);
var jellyMaybe = getRandomInt(1, 100);
var runMaybe = getRandomInt(1, 125);
var flipFlopMaybe = getRandomInt(1, 125);
var barfMaybe = getRandomInt(1, 150);
var mirrorMaybe = getRandomInt(1, 150);
var tiltMaybe = getRandomInt(1, 175);
var flyGamesMaybe = getRandomInt(1, 225);

if ((rick == 1)) {
window.location="zzz.html";
}
	
if ((jellyMaybe == 1)) {
jelly();
}

if ((flipFlopMaybe == 1)) {
flipFlop();
}

if ((tiltMaybe == 1)) {
tilt();
 }
 
 if ((flyGamesMaybe == 1)) {
flyGames();
 }
 
 if ((runMaybe == 1)) {
runAway();
 }
 
 if ((barfMaybe == 1)) {
barf();
 }
 
 if ((mirrorMaybe == 1)) {
mirror();
 }
}

function suggestNew() {
	if (localStorage.suggestionsNew) {
localStorage.suggestionsNew = Number(localStorage.suggestionsNew)+1;
} else {
localStorage.suggestionsNew = 0;
}
if (Number(localStorage.suggestionsNew) >= 5) {}else{
introJs().start();
 }
}

	function joinChat() {
document.getElementById('chat').innerHTML = ("<iframe width='99%' height = '350px' id='thechat' src="
+"'ccc.html'></iframe>");
}

function startSite() {
joinChat();
suggestNew();
}

function displayGames() {
for (let i = 0; i < g.length; i++) {
var uniName = (g[i].n);
uniName = uniName.toLowerCase();
uniName = uniName.replace(/\s/g, '');
var smallN = (g[i].sn || uniName);
var img = (g[i].m || (smallN+'.png'));
var desc = (g[i].d || '');
function f() {if (g[i].f) {return (g[i].f+'/')} else {return ''}}
function s() {if (g[i].h) {return (g[i].h)} else {return '.html'}}
var subFolder = (f());
var gC = document.createElement("a");
gC.classList.add("game-link");
gC.classList.add("container");
gC.classList.add("games");

gC.innerHTML = '<div class="game-tile"><span style="font-size:0px;position:fixed">'+desc+'</span><div><img class="game-icon" src="'+img+'" loading="lazy" alt="'+g[i].n+'"></div><h1 class="game-title">'+g[i].n+'</h1></div>';
gC.href = subFolder+smallN+s();
if (i < g.length-5) {
document.getElementById('games').appendChild(gC);
 }else{
document.getElementById('games').appendChild(gC);
var gCNewest = gC.cloneNode(true);
document.getElementById('5newHolder').appendChild(gCNewest);
  }
 }
}

var g = [
{
n : 'The Mountain Game',
sn : 'mountain',
m : 'mountainNoFade.png',
d : 'idle clicker',
 },
{
n : 'Retro Bowl',
sn : 'retro',
m : 'retrobowl.png',
d : 'sports football',
 },
{
n : 'Slope',
sn : 'slope',
 },
{
n : 'Tube Jumpers',
sn : 'jumpers',
m : 'tube-jumpers.png',
 },
{
n : '2048',
d : 'puzzle',
 },
{
n : 'Tetris',
d : 'puzzle',
 },
{
n : 'Tom And Jerry',
sn : 'tandj',
m : 'tom-and-jerry.png',
d : 'simple',
 },
{
n : 'Geometry Dash 1 & 2',
sn : 'dashHome',
m : 'geometry-dash.png',
d : 'jumping run',
f : 'dash'
 },
{
n : 'Duck Life',
 },
{
n : 'Flood Runner',
sn : 'floodRunner',
m : 'flood-runner.png',
 },
{
n : 'Electro Man',
sn : 'ElectroMan',
m : 'electric-man.png',
 },
{
n : 'World\'s Hardest Game',
sn : 'WorldsHardestGame',
m : 'worlds-hardest-game.png',
 },
{
n : '1 on 1 Soccer',
sn : '1v1Soccer',
m : '1-on-1-soccer.png',
d : 'sports',
 },
{
n : 'Chess',
d : 'board',
 },
{
n : 'Snake',
d : 'google',
 },
{
n : 'Cookie Clicker',
sn : 'cookie',
 },
{
n : 'T-rex Game',
sn : 't-rex-game',
h : '/',
m : 't-rex.jpeg'
 },
{
n : 'Madalin Stunt Cars 2',
sn : 'StuntCars',
m : 'madalin-stunt-cars-2.jpeg',
d : 'cars'
 },
{
n : '10 More Bullets',
sn : '10moreBullets',
m : '10.png',
 },
{
n : 'Burrito Bison',
sn : 'BurritoBison',
m : 'burrito.png',
 },
{
n : 'Moto-X3M 1 & 4',
sn : 'motox3mhome',
m : 'moto-x3m.png',
 },
{
n : 'Tunnel Rush',
sn : 'Tunnel-Rush',
m : 'tunnelrush.png',
 },
{
n : 'Google Baseball',
sn : 'Google-Baseball',
m : 'google-baseball.png',
 },
{
n : 'Drift Hunters',
sn : 'Drift-Hunters',
m : 'drift-hunters.png',
 },
{
n : 'Fireboy And Watergirl',
sn : 'Fire-Boy-Water-Girl',
h : '/',
m : 'firewater.png',
 },
{
n : 'Big Tower Tiny Square',
sn : 'BigTowerTinySquare',
m : 'TinySquare.png',
 },
{
n : 'Basketball Stars',
sn : 'Basket-Ball-Stars',
m : 'basketballstars.png',
 },
{
n : 'Deepest Sword',
 },
 {
n : 'Stickman Climb 1&2',
sn : 'stickmanclimbmain',
m : 'stickmanclimb.png',
 },
 {
n : 'Just Flip',
 },
  {
n : 'Idle Miner',
 },
  {
n : 'Launchball',
 },
  {
n : 'Paper.io 2',
sn : 'paperio2',
 },
   {
n : 'Air Hockey',
 },
{
n : 'Wordle',
 },
 {
n : 'Pacman',
 },
  {
n : 'The Oregon Trail',
sn : 'theoregontrial',
 },
  {
n : 'Mountain Maze',
 },
  {
n : 'Stack',
 },
  {
n : 'Rolling Forests',
sn : 'forests',
 },
  {
n : 'Run 3',
 },
  {
n : 'Snowball Fight',
 },
  {
n : 'Raft Wars 1 & 2',
sn : 'raftwarshome',
m : 'raftwars.png',
 },
   {
n : 'Game Inside A Game',
 },
   {
n : 'There Is No Game',
 },
  {
n : 'Economical 1 & 2',
sn : 'economicalhome',
m : 'economical.png',
 },
   {
n : 'Cell Machine',
 },
   {
n : 'Cat Ninja',
 },
   {
   /*/Typo is on purpose /*/
n : 'Celseste',
sn : 'celeste',
 },
   {
n : 'Subway Surfers',
 },
   {
n : 'Edge Not Found',
 },
   {
n : 'Cubefield',
 },
   {
n : 'Radius Raid',
 },
   {
n : 'Papery Planes',
 },
   {
n : 'Swerve',
 },
   {
n : 'A Dance Of Fire And Ice',
 },
   {
n : 'Grey Box Testing',
 },
   {
n : 'Tanuki Sunset',
 },
   {
n : 'Ninja VS Evilcorp',
 },
   {
n : 'Evil Glitch',
 },
   {
n : 'Basket Random',
 },
   {
n : 'Stumble Guys',
 },
   {
n : 'Johnny Upgrade',
 },
   {
n : 'Crossy Road',
 },
   {
n : 'Circle O',
 },
   {
n : 'Mario',
 },
   {
n : 'Ovo',
 },
   {
n : 'Tank Trouble',
 },
   {
n : 'Soccer Random',
 },
   {
n : 'Ping Pong Chaos',
 },
   {
n : 'Stickman Hook',
 },
   {
n : 'Volley Random',
 },
   {
n : 'Pokemon',
 },
   {
n : 'Bitlife',
 },
   {
n : 'Awesome Tanks',
 },
   {
n : 'Offline Paradise',
 },
   {
n : 'Drive Mad',
 },
   {
n : 'Elastic Man',
 },
   {
n : 'Just One Boss',
 },
   {
n : 'Its Raining Boxes',
 },
   {
n : 'Spacebar Clicker',
 },
   {
n : 'Impossible Quiz',
 },
   {
n : 'Solitaire',
 },
   {
n : 'Bloons Tower Defense',
 },
   {
n : 'Learning',
 },
   {
n : 'Stickman Life',
 },
   {
n : 'Papas Games',
 },
   {
n : 'Henry Stickmin',
 },
   {
n : 'Bloxorz',
 },
   {
n : 'Super Mario 64',
 },
   {
n : 'Trimps',
 },
   {
n : 'Use Boxmen',
 },
  {
n : 'Fruit Ninja',
 },
  {
n : 'Idle Breakout',
 },
  {
n : 'Learn to Fly',
 },
  {
n : 'Tomb Of The Mask',
 },
  {
n : 'This is the Only Level',
 },	
];
displayGames();
startSite();
hehehe();
</script>
</body>
</html>
