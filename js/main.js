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
  const iconSetting = document.querySelector("input#discordIcon");
  const blockClose = document.querySelector("input#blockClose");
  if(localStorage.getItem("theme")) {
    localStorage.setItem("selenite.theme", localStorage.getItem("theme"));
    localStorage.removeItem("theme");
  }
  if (localStorage.getItem("selenite.theme")) {
    document.body.setAttribute("theme", localStorage.getItem("selenite.theme"));
  } else {
    document.body.setAttribute("theme", "main");
  }
  if(document.querySelector("widgetbot-crate")) {
    if(localStorage.getItem("selenite.discordIcon") == "true") {
      const widget = document.querySelector("widgetbot-crate");
      widget.setAttribute("style", "display:none");
    }
  }
  if(document.querySelector("input#discordIcon")) {
    if(localStorage.getItem("selenite.discordIcon") == "true") {
      iconSetting.checked = true;
    }
    iconSetting.addEventListener("click", () => {
      localStorage.setItem("selenite.discordIcon", iconSetting.checked)
    });
  }
  if(document.querySelector("input#blockClose")) {
    if(localStorage.getItem("selenite.blockClose") == "true") {
      blockClose.checked = true;
    }
    blockClose.addEventListener("click", () => {
      localStorage.setItem("selenite.blockClose", blockClose.checked)
    });
  }
  if(document.querySelector("input#tabDisguise")) {
    if(localStorage.getItem("selenite.tabDisguise") == "true") {
      tabDisguise.checked = true;
    }
    tabDisguise.addEventListener("click", () => {
      localStorage.setItem("selenite.tabDisguise", tabDisguise.checked)
    });
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
      dialog.removeAttribute("display");
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
  localStorage.setItem("selenite.theme", theme);
  document.body.setAttribute("theme", theme);
}
function setPanicMode() {
  if (!$("#panic").val().startsWith("https")) {
    document.cookie = "panicurl=https://" + $("#panic").val();
    return;
  }
  document.cookie = "panicurl=" + $("#panic").val();
}
function customTheme() {
  const customMenu = document.querySelector('#customMenu');
  customMenu.removeAttribute("display");
}
  if(location.hostname.includes(".vercel.app") && (location.hostname.includes("selenite-beta") || location.hostname.includes("space-lovers") || location.hostname.includes("school-education"))) {
    alert("IMPORTANT:\nVercel links will be taken offline eventually. Please move to a new link. You can find these in the Discord at discord.gg/7jyufnwJNf, or you can try a few of the ones listed\nselenite.cc\nselenite.pages.dev\nselenite.skysthelimit.dev\nall-about-science.onrender.com")
  }