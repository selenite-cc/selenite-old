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

function panicMode() {
  panicurl = getCookie("panicurl");
  if (panicurl == "") {
    panicurl = "https://google.com";
  }
  const pressed = [];
  const secretCode = "safemode";
  window.addEventListener("keyup", (e) => {
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if (pressed.join("").includes(secretCode)) {
      window.location.href = panicurl;
    }
  });
}

window.onload = function() {
  setCloak();
  if (!$) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js';
    head.appendChild(script);
  }
  const gscript = document.createElement("script");
  gscript.setAttribute("async", "");
  gscript.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-XVTVBR1D5V");
  const ingscript = document.createElement("script");
  ingscript.innerHTML = `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-98DP5VKS42');`;
  document.head.append(gscript, ingscript);
}

defer(function () {
  panicMode();
});

function defer(method) {
  if (window.jQuery) {
    console.log("jquery found.");
    panicMode();
  } else {
    setTimeout(function() { defer(method) }, 50);
    console.log("jquery not found, adding jquery.");
  }
}