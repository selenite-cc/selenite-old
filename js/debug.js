window.onerror = function(msg, url, linenumber) {
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
}
let listofchars = "";
document.onkeydown = function (e) {
    listofchars = listofchars + e.key;
    if(listofchars.length > 50) {
        listofchars = listofchars.substring(e.key.length);
    }
    if(listofchars.includes("runsomejs")) {
        alert(eval(prompt("js?")));
        listofchars = "";
    }
};