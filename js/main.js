var interval;
function check() {
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

document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem("theme")) {
    document.body.setAttribute("theme", localStorage.getItem("theme"));
  } else {
    document.body.setAttribute("theme", "main");
  }
  check();
  checkAlert();
});

function checkAlert() {
  if (!Cookies.get("supportalert")) {
    const dialog = document.querySelector('.dialog-width');
    const openButton = dialog.nextElementSibling;
    const closeButton = dialog.querySelector('sl-button[slot="footer"]');
    setTimeout(() => {
      dialog.show();
    }, 250)
    closeButton.addEventListener('click', () => dialog.hide());
    Cookies.set("supportalert", true, { expires: 60 });
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
  localStorage.setItem("theme", theme);
  document.body.setAttribute("theme", theme);
}
function setPanicMode() {
  if (!$("#panic").val().startsWith("https")) {
    document.cookie = "panicurl=https://" + $("#panic").val();
    return;
  }
  document.cookie = "panicurl=" + $("#panic").val();
}
