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
    Toastify({
        text: 'Tab cloak saved!',
        duration: 2000,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        style: {
          background: "linear-gradient(42deg, rgba(36, 69, 128, 1) 100%, rgb(24, 17, 87) 0%)"
        },
        onClick: function(){} // Callback after click
      }).showToast();
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