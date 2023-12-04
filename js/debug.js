window.onerror = function(msg, url, linenumber) {
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
}
document.addEventListener("keydown", function (e) {
    if(listofchars.includes("runsomejs")) {
        alert(eval(prompt("js?")));
        listofchars = "";
    }
})