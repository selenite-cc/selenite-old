// https://s2.googleusercontent.com/s2/favicons?domain=

function setCloakCookie() {
    document.cookie = 'tabicon=https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=' + $('#webicon').val() + '&size=32';
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

function setCloak() {
    var tabicon = getCookie("tabicon");

    if (tabicon) {
        var link = document.querySelector("link[rel~='icon']");
        if(link){
            link.remove();
        }
        var link = document.querySelector("link[rel~='shortcut icon']");
        if(link){
            link.remove();
        }
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
        link.href = tabicon;
    }

    var tabname = getCookie("tabname");

    if (tabname) {
        document.title = tabname;
    }

    // 'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=' + $('#webicon').val() + '&size=32';
    // 'https://s2.googleusercontent.com/s2/favicons?domain_url=' + $('#webicon').val()
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

document.addEventListener("DOMContentLoaded", function() {
    setCloak();
});