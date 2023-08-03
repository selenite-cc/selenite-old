$.getJSON("/themes.json", function (data) {
    loadedthemes = data;
    let currenttheme = getCookie("theme")
    if (currenttheme == "") {
        setTheme("selenite");
    } else {
        setTheme(currenttheme);
    }
})

var r = document.querySelector(':root');
function setTheme(themename) {
    if (!loadedthemes[themename]) {
        alert("woah, you loaded a non-existant theme! if you found this during normal usage of the website, please send a bug report at https://forms.gle/j75WUn6UhdqsRZgf7");
        return;
    }
    r.style.setProperty('--input-bg-color', loadedthemes[themename]["--input-bg-color"]); 
    r.style.setProperty('--main-text-color', loadedthemes[themename]["--main-text-color"]); 
    r.style.setProperty('--p-text-color', loadedthemes[themename]["--p-text-color"]); 
    r.style.setProperty('--border-color', loadedthemes[themename]["--border-color"]); 
    r.style.setProperty('--star-color', loadedthemes[themename]["--star-color"]); 
    r.style.setProperty('--game-color', loadedthemes[themename]["--game-color"]); 
    r.style.setProperty('--bg-1', loadedthemes[themename]["--bg-1"]); 
    r.style.setProperty('--bg-2', loadedthemes[themename]["--bg-2"]); 
    r.style.setProperty('--invert-logo', loadedthemes[themename]["--invert-logo"]); 
    Cookies.set("theme", themename);
}