var aud=new Audio();
var songs=["PkIeYKbzyZY","lv5A5EDvi-g","EyicJOlYOm4","1weATSoaRbA","qSdiecyj6-M","Ugb7GUtiyZ0","1ZFMy48q63w","10RNhMuWR2g","QkVvPD7Xk5U","RUEWIG8zoa0","V6N_rL4fh6I","n02zTn2d3rY","iBZS6ad3Tlk","Mnb2RhXL-nM","lidx_2d4YOA","ETQJZHYlc3g","kRpRoTaNni0","ACy5tHoNUoA","yLFX_7SH2tY","io-vPXE9JXY","oP6wOte3wZU","6LwLyIv3yvA","MrD05HVGVIQ","HBYS5mBHie4","5HxGK3DTUBQ","_9qUu8IeabE","r76yldhXSrw","OqJi_n3AcV4","WFFF-jMyFaQ","D8CwzhM7O6I","FD56t_0B9ig","5OcsWd949w4","jrnNzNT11aU","VLbMXG8lvjI","4aNDoqt9kEQ","_ZMfQ0Aj7h8","ZCJo8CDyqlQ","A1-fM0s1Yt0","zsLT3JqfTn0","zsGM_sGEako","YZlclPLX1Hw","uT1evbCloAw","HYOth1zARhg","loeGmoYr3s4","0qhoqXTUQlY","FtdPlfZNqVY","uIk_jGypR24","mdAb2xALVm0","5hpBvX0sUuo","RiVZCDq--m4","2k5dqgNT37g","j4Jyev7iTlE","9Ty-qFZZPZk","6EDS01Ipaow","720HcvEvEC8","YbdcrJZBtu8","nZ15jw3NOO8","Ub7y69hg4do","hFal0LKZwnM","g-QdgLe_D5M","CAmHrCvZ8tA","Mr-wV17WFZU","EdFyQOngYJs","3RyqONKuRzk","jBPqr_IsWvY","LcyCREQL7w8","dAalyaoVGfE","RM9O1HO4FLE","tUx4SfdoyUI","qFjaDnnPbA4","NrlhbIzjO04","eDBAdAzCqr4","UqVW7-q7fTA","3I-WJ6UgmOA","m8wcDiahBjg","NmzrLZajTLU","EPT3dIWBbDA","tf4dBTlz25g","FuMtDXkuxVw","PkmKM_OXNZM","KbC46oJmLh4","mRJSIYmHuNI","GmLsIivtcIM","rDBbaGCCIhk","Ig5v4jhLLWI","XZcG2esvW7I","_qpgIOzaI0E","TTJBevUIp0s","V4oiuY02dTo","agIayif-oi0","plm3DVsX7Jg","HA0Mk5BXX44","2RLq_paK3-g","h2EgfSvOuPc","HbtwR1REaFk","-tUJJXWXdXk","h-b8Xs7sNI0","xt2DGLoEmW0","eyp-YuzhTN4","xrawoRF4lN0","6xVHpgJbuc8","qsy-14oAXGc","fYSUV33ZPfw","qnSHJlRJ2cM","Ytt1_ErIV34","05TnpE0x4wI","-jcOtAuGZC4","XbuqB3uB6DI","x-42Zkcw4Cs","kXjA7eRZchc","_zceCigOTwo","Qg83cniiYEY","F7gwcgmoREg","aZFe4K1HmPE","e1Ve4Xa9ftQ","p-dVxnR-vLw","PD1a3mfmY8M","-cJFVNZC4h8","Jfs7Lo8CC0Q","zz3F5j8qWNw","CQLvggJFxuM","wf93JAZR3gU","XLQbs59Pn7E","phrpiLpaiLs","Md2xOKFTvSU","_Ci0Kgdpgsw","iBjZshhpipg","j15tAxxc38Y","LwKbsK6E-DI","9J8cD8-LHy4","7ZQlWCsHG7k","UBIsi3xWa64","GWYkh1IX4PE","YYjDFXJ6Wdo","5YDiUcc3emA","s0G4qOrDOgM","9zibDnOOj3w","rQMd3b1BF50","xeM40-FkRLI","wVOFnTrSOOA","CbziO8vuBR8","msUarvc4Sx8","GB9kBLre96M","UMwmB0ZK3yE","SLFMiEAjSoA","K5F-RLzLH6Q","ziAK1OLeeEE","--I54YPKsLU","33zGN7vENog","pTv51QwN57E","zD8TxUBkjGA","A09BhpgfGKQ","cvBQq1yJH-A","YZrIQardsz8","CUHYQ-FN3P8","GLGjqtgCKY8","bLagC2wX3Ak","fW128GHFJIE","e15qP676Zhg","B5L0AMO2HA8","oFFFzMkGNrk","1RQQLwnaw80","byUipqLQ_Hc","WtF6Z13HD_w","pkkIqT9LpDY","gMGEyl5TRa4","oxoqm05c7yA","yTP8tK2OzFQ"];
var insturl="https://invidious.zapashcanon.fr";
var loading=false;
var usealt=0;

function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    let j = Math.floor(Math.random() * (array.length-i)) + i;
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function fixfard(url){
  if(!url)return insturl;
  return url.endsWith("/")?url.slice(0,url.length-1):url;
}

var updinsturl=async ()=>{
  try{
  var json=await (await fetch("https://api.invidious.io/instances.json?sort_by=health")).json();
  var out=shuffle(json).map(entry => {
    const healthKnown = !!entry[1].monitor
    return {
      name: entry[0],
      details: entry[1],
      health: +(healthKnown ? entry[1].monitor.dailyRatios[0].ratio : 95),
      healthKnown
    }
  }).filter(entry => {
    return entry.details.type === "https" && entry.health > 0
  }).sort((a, b) => {
    return b.health - a.health
  });
  insturl=fixfard(out.find(e=>e.details.cors).details.uri);
  }catch(e){aud.onerror();}
};
var updint=setInterval(updinsturl,3600000);
updinsturl();

aud.onended=function(e){
	loading=true;
	window.startmusic();
};

aud.oncanplay=function(e){
	aud.play();
};

aud.onplay=function(e){
	aud.playing=true;
	loading=false;
};

aud.onerror=function(e){
	if(usealt==2){
		aud=null;
		return;
	}

	if(usealt==0){
		usealt=1;
	}else if(usealt==1){
		loading=true;
		usealt=2;
	}
	window.stopmusic();
	//todo: make attempt 2 more times with diff urls and if those fail then stop trying
	clearInterval(updint);
};

window.startmusic=function(v){
	if(v!=null&&v==0)return;
	loading=true;
	var url="";
	if(usealt==0){
		songs=shuffle(songs);
		url=insturl+"/latest_version?id="+songs[0]+"&itag=251";
	}else if(usealt==1){
		url="https://nightride.fm/stream/chillsynth.m4a";
	}else if(usealt==2){
		return;
	}
	if(v!=null)aud.volume=v;
	aud.src=url;
	aud.currentTime=0;
};

window.stopmusic=function(){
	if(usealt==2)return;
	aud.pause();
	loading=false;
};

window.volmusic=function(v){
	if(usealt==2)return;
	if(v==0){
		window.startmusic();
	}else{
		if(aud.playing){
			aud.volume=v;
		}else{
			window.startmusic(v);
		}
	}
};

window.playingmusic=function(){
	return usealt==2||aud.playing||loading;
};

navigator.mediaSession.setActionHandler('play', function() {});
navigator.mediaSession.setActionHandler('pause', function() {});
navigator.mediaSession.setActionHandler('seekbackward', function() {});
navigator.mediaSession.setActionHandler('seekforward', function() {});
navigator.mediaSession.setActionHandler('previoustrack', function() {});
navigator.mediaSession.setActionHandler('nexttrack', function() {});
