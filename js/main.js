var interval;
function check() {
  if (themeloaded == 1) {
    clearInterval(interval);
    const body = document.querySelector("body");
    body.style.removeProperty("display");
    const html = document.querySelector("body");
    html.style.removeProperty("background-color");
    const bar = document.querySelector("progress");
    bar.remove();
  }
}

window.onload = function () {
  interval = setInterval(check, 50);
};
