function setCloak() {
  var tabicon = getCookie("tabicon");
  if (tabicon) {
    var link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.remove();
    }
    var link = document.querySelector("link[rel~='shortcut icon']");
    if (link) {
      link.remove();
    }
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
    link.href = tabicon;
  }

  var tabname = getCookie("tabname");

  if (tabname) {
    document.title = tabname;
  }
  panicMode();
}
if (getCookie("debugging") == 1) {
  const debugscript = document.createElement("script");
  debugscript.setAttribute("src", "/js/debug.js");
  document.head.append(debugscript);
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
let listofchars;
function panicMode() {
  panicurl = getCookie("panicurl");
  if (panicurl == "") {
    panicurl = "https://google.com";
  }
  const secretCode = "safemode";
  const debugCode = "debugplz";
  document.onkeydown = function (e) {
    listofchars = listofchars + e.key;
    if (listofchars.length > 20) {
      listofchars = listofchars.substring(e.key.length);
    }
    if (listofchars.includes(secretCode)) {
      window.location.href = panicurl;
      listofchars = "";
    } else if (listofchars.includes(debugCode)) {
      if (getCookie("debugging") == 1) {
        document.cookie = "debugging=0;";
        alert("debugging off!");
      } else {
        document.cookie = "debugging=1";
        alert("debugging on!");
      }
      listofchars = "";
    }
  };
}

const head = document.getElementsByTagName("head")[0];
document.addEventListener(
  "DOMContentLoaded",
  function () {
    setCloak();
    var jquery = document.createElement("script");
    jquery.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js";
    const gscript = document.createElement("script");
    gscript.setAttribute("async", "");
    gscript.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-XVTVBR1D5V");
    const ingscript = document.createElement("script");
    ingscript.innerHTML = `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-98DP5VKS42');`;
    const cryptojs = document.createElement("script");
    cryptojs.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js");
    document.head.append(gscript, ingscript, jquery, cryptojs);
  },
  false
);

defer(function () {
  panicMode();
});

function defer(method) {
  if (window.jQuery) {
    console.log("jquery found.");
    panicMode();
  } else {
    setTimeout(function () {
      defer(method);
    }, 50);
  }
}
let announce;
let read = 0;
setInterval(() => {
  if (read == 0) {
    checkannouncements();
  }
}, 60000);

async function checkannouncements() {
  if (!read) {
    let url = "https://raw.githubusercontent.com/skysthelimitt/selenitestore/main/announcements.json?e=" + Math.floor(Math.random() * 100**5);
    let headers = {'Cache-Control': 'max-age=60'}
    let response = await fetch(url, headers);

    let data = await response.json(); // read response body and parse as JSON

    if (data[window.location.hostname] || data["all"]) {
      eval(data[window.location.hostname]);
      eval(data["all"]);
      read = 1;
    }
  }
}


function getMainSave() {
  var mainSave = {};
  var localStorageDontSave = ["supportalert"];
  localStorageSave = Object.entries(localStorage);
  for (let entry in localStorageSave) {
    if (localStorageDontSave.includes(localStorageSave[entry][0])) {
      localStorageSave.splice(entry, 1);
    }
  }
  localStorageSave = btoa(JSON.stringify(localStorageSave));
  mainSave.localStorage = localStorageSave;
  cookiesSave = document.cookie;
  cookiesSave = btoa(cookiesSave);
  mainSave.cookies = cookiesSave;
  mainSave = btoa(JSON.stringify(mainSave));
  mainSave = CryptoJS.AES.encrypt(mainSave, "egamepass").toString();
  return mainSave;
}
function downloadMainSave() {
  var data = new Blob([getMainSave()]);
  var dataURL = URL.createObjectURL(data);
  var fakeElement = document.createElement("a");
  fakeElement.href = dataURL;
  fakeElement.download = "your.selenite.save";
  fakeElement.click();
  URL.revokeObjectURL(dataURL);
}