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