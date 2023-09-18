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
  checkAlert();
  check();
});

function checkAlert() {
  if (!Cookies.get("supportalert")) {
    alert(
      'Welcome to Selenite!\nTransferring from another website? Add "/transfer" to the end of the URL to see how to transfer your game data!\nI\'m a single developer that works on this website, so I would appreciate your support! You can pay on Patreon by clicking the "Support" button, which will have private links for all subscribers to use!\nPlease share this website with anyone you know, so this website can expand even more!\nGo to bookmarklets and then add "Selenite Minified" to your bookmarks :) \nJoin the Discord for the latest updates and newest links!\nI don\'t want to be annoying, so you won\'t see this message for another month (at least on this website) :)'
    );
    Cookies.set("supportalert", true, { expires: 31 });
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
