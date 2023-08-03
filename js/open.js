var url = "https://egamepass.pages.dev";
var urlObj = new window.URL(window.location.href);
document.getElementById("create").onclick = function () {
  if (url.value.substring(0, 8) !== "https://" && url.value.substring(0, 7) !== "http://") {
    url.value = "https://" + url.value.split("https://").pop();
  } else if (url.value.substring(0, 7) == "http://") {
    url.value = "https://" + url.value.split("http://").pop();
  }
  win = window.open();
  win.document.body.style.margin = "0";
  win.document.body.style.height = "100vh";
  var iframe = win.document.createElement("iframe");
  iframe.style.border = "none";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.margin = "0";
  iframe.referrerpolicy = "no-referrer";
  iframe.allow = "fullscreen";
  iframe.src = url.value;
  win.document.body.appendChild(iframe);
};
