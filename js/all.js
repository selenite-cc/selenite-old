let backup_icon;
let backup_name;
function setCloak(name, icon) {
  var tabicon = getCookie("tabicon");
  if (tabicon || icon) {
    var link = document.querySelector("link[rel~='icon']");
    if (link) {
      if(link.href != icon)backup_icon = link;
      while(document.querySelector("link[rel~='icon']")) {
        document.querySelector("link[rel~='icon']").remove()
      }
    }
    var link = document.querySelector("link[rel~='shortcut icon']");
    if (link) {
      if(link.href != icon)backup_icon = link;
      while(document.querySelector("link[rel~='shortcut icon']")) {
        document.querySelector("link[rel~='shortcut icon']").remove()
      }
    }
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
    link.href = tabicon;
    if(name){link.href = icon}
  }

  var tabname = getCookie("tabname");
  backup_name = document.title;
  if (tabname) {
    document.title = tabname;
  }
  if (name) {
    document.title = name;
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
    const gscript = document.createElement("script");
    gscript.setAttribute("async", "");
    gscript.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-XVTVBR1D5V");
    const ingscript = document.createElement("script");
    ingscript.innerHTML = `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-98DP5VKS42');`;
    document.head.append(gscript, ingscript);
  },
  false
);
if (location.pathname.substring(1).includes("/") && localStorage.getItem("selenite.blockClose") == "true") {
  window.addEventListener("beforeunload", (e) => {e.preventDefault();e.returnValue = '';});
}
addEventListener("visibilitychange", (e) => {
  if(localStorage.getItem("selenite.tabDisguise") == "true") {
    if (document.visibilityState === 'hidden') {
      setCloak("Google", "https://www.google.com/favicon.ico");
    } else {
      if(!backup_icon) {
        icon = document.createElement("link");
        icon.rel = "icon";

        var link = document.querySelector("link[rel~='icon']");
        if (link) {
          backup_icon = link;
          while(document.querySelector("link[rel~='icon']")) {
            document.querySelector("link[rel~='icon']").remove()
          }
        }
        var link = document.querySelector("link[rel~='shortcut icon']");
        if (link) {
          backup_icon = link;
          while(document.querySelector("link[rel~='shortcut icon']")) {
            document.querySelector("link[rel~='shortcut icon']").remove()
          }
        }

        document.head.appendChild(icon);
        icon.href = location.origin + "/favicon.ico";
      } else {
        document.head.appendChild(backup_icon);
      }
      document.title = backup_name;
    }
  }

});
if(location.pathname != "/vercel.html" && location.hostname.includes(".vercel.app") && (location.hostname.includes("selenite-beta") || location.hostname.includes("space-lovers") || location.hostname.includes("school-education"))) {
  location.pathname = "/vercel.html"
}