var interval;
var themeloaded = 0;
function check() {
  if (themeloaded == 0) {
    clearInterval(interval);
    const body = document.querySelector("body");
    body.style.removeProperty("display");
  }
  if ($("#panicmode").length > 0) {
    $("#panicmode").prop({ href: panicurl });
  }
  if ($(".seleniteminified").length > 0) {
    $.get(
      "https://raw.githubusercontent.com/skysthelimitt/selenite-optimized/main/build/bookmark.txt",
      function (data) {
        $(".seleniteminified").prop({ href: data });
      }
    );
  }
}

window.onload = function () {
  if (localStorage.getItem("theme")) {
    document.body.setAttribute("theme", localStorage.getItem("theme"))
  } else {
    document.body.setAttribute("theme", "main")
  }
  checkAlert();
  interval = setInterval(check, 50);
};

window.addEventListener(
  "error",
  function (event) {
    if (event.target instanceof HTMLImageElement) {
      alert(
        "Error: Image failed to load." +
          "\nFull Image URL: " +
          event.target.src +
          '\nClick FEEDBACK. This is a beta build of Selenite.'
      );
      event.target.src = "/favicon.png";
    } else {
      alert(
        "Error: " +
          event.message +
          "\nScript: " +
          event.filename +
          "\nLine: " +
          event.lineno +
          "\nColumn: " +
          event.colno +
          "\nStackTrace: " +
          event.error +
          '\nClick FEEDBACK. This is a beta build of Selenite.'
      );
    }
  },
  true
);

function checkAlert() {
  if (!Cookies.get("betaalert")) {
    alert(
      "PLEASE READ.\nYour data from the main page will NOT transfer unless you use the Download and Upload Save feature.\nWanna add a quote? Go to the feedback form.\nThank you for beta testing the new ui! Send feedback at the feedback link in the header. Don't use the suggestions form. DM '@skysthelimit.dev' on discord if you need to say something immediately. Also DM me on discord if you beta tested, might give something a little special to y'all.\nThank you for supporting Selenite. Any and all feedback is greatly appreciated."
      );
    Cookies.set("betaalert", true, { expires: 1 });
  }
}
function setPanicMode() {
  if (!$("#panic").val().startsWith("https")) {
    document.cookie = "panicurl=https://" + $("#panic").val();
    return;
  }

  document.cookie = "panicurl=" + $("#panic").val();
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  alert("Copied text!");
}

function setTheme(theme) {
  localStorage.setItem('theme', theme);
  document.body.setAttribute("theme", theme);
}
function setPanicMode() {
  if (!$("#panic").val().startsWith("https")) {
    document.cookie = "panicurl=https://" + $("#panic").val();
    return;
  }
  document.cookie = "panicurl=" + $("#panic").val();
}
function cloakExceptions(url) {
  if (url.includes('harrisonburg.instructure.com') == true) {
      return "learn.canvas.net";
  }
  return url;
}

function setCloakCookie() {
  url = cloakExceptions($('#webicon').val())
  document.cookie = 'tabicon=https://s2.googleusercontent.com/s2/favicons?domain_url=' + url;
  document.cookie = 'tabname=' + $('#webname').val();
  setCloak();
}

function clearCloak() {
  document.cookie = "tabicon=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "tabname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  var link = document.querySelector("link[rel~='icon']");link.remove();
  document.title = "Tab Cloak | e-gamepass";
  link = document.createElement('link');
  link.rel = 'icon';
  document.head.appendChild(link);
  link.href = "/favicon.png";
}