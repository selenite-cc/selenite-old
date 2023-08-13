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

window.addEventListener("error", function (event) {
    if (event.target instanceof HTMLImageElement) {
      alert(
        "Error: Image failed to load." +
        "\nFull Image URL: " + event.target.src +
        '\nPlease copy this error message and click "Report a Bug" or go to https://forms.gle/j75WUn6UhdqsRZgf7'
      )
      event.target.src = "favicon.png";
    } else {
      alert (
        "Error: " + event.message +
        "\nScript: " + event.filename +
        "\nLine: " + event.lineno +
        "\nColumn: " + event.colno +
        "\nStackTrace: " + event.error +
        '\nPlease copy this error message and click "Report a Bug" or go to https://forms.gle/j75WUn6UhdqsRZgf7'
      );
    }
  }, true);
