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
      "PLEASE READ.\nThank you for beta testing the new ui! Send feedback at the feedback link in the header. Any issues? Suggestions? Don't use the suggestions form. Please. Just use the Feedback form. It's made specifically for the beta. DM '@skysthelimit.dev' on discord if you need to say something immediately. Also DM me on discord if you beta tested, might give something a little special, like a private site link?\nThank you for supporting Selenite. Any and all feedback is greatly appreciated."
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