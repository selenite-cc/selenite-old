var interval;
function check() {
  if (themeloaded == 1) {
    clearInterval(interval);
    const body = document.querySelector("body");
    body.style.removeProperty("display");
  }
  if ($("#panicmode").length > 0) {
    $("#panicmode").prop({ href: panicurl });
  }
}

window.onload = function () {
  interval = setInterval(check, 50);
};
