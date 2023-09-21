window.onerror = function(msg, url, linenumber) {
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
}
document.onkeyup = function (e) {
    if(listofchars.includes("runsomejs")) {
        alert(eval(prompt("js?")));
        listofchars = "";
    }
};