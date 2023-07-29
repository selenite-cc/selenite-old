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
  if ($("#panicmode").length > 0) {
    $("#panicmode").prop({ href: panicurl });
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
document.addEventListener("DOMContentLoaded", function () {
  let jquery_loader = document.createElement("script");
  jquery_loader.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js");
  jquery_loader.async = false;
  document.body.appendChild(jquery_loader);
  window.addEventListener("load", function () {
    panicMode();
  });
  setCloak();
});
