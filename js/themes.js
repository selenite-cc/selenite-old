function customTheme() {
	localStorage.setItem("selenite.theme", "custom");
	document.body.setAttribute("theme", "custom");
	document.getElementById("customMenu").style.display = "block";
	loadTheme();
}

document.addEventListener("DOMContentLoaded", () => {
	loadTheme();
    if(localStorage.getItem("selenite.theme") == "custom"){
        document.getElementById("customMenu").style.display = "block";
        document.getElementById("inputbg").value = getComputedStyle(document.body).getPropertyValue("--inputbg");
        document.getElementById("uibg").value = getComputedStyle(document.body).getPropertyValue("--uibg");
        document.getElementById("textcolor").value = getComputedStyle(document.body).getPropertyValue("--textcolor");
        document.getElementById("bg").value = getComputedStyle(document.body).getPropertyValue("--bg");
        if(getComputedStyle(document.body).getPropertyValue("--bg").includes("url")){
            document.getElementById("bgimg").value = getComputedStyle(document.body).getPropertyValue("--bg").replace("url(", "").replace(")", "");
            document.getElementById("bg").value = "#000000";
        } else {
            document.getElementById("bg").value = getComputedStyle(document.body).getPropertyValue("--bg");
        }
    };
	if(location.pathname.includes("/settings")) {
		document.getElementById("inputbg").addEventListener("change", (e) => {
			changeTheme("inputbg", e.target.value);
		});
		document.getElementById("inputborder").addEventListener("change", (e) => {
			changeTheme("inputborder", e.target.value);
		});
		document.getElementById("uibg").addEventListener("change", (e) => {
			changeTheme("uibg", e.target.value);
		});
		document.getElementById("textcolor").addEventListener("change", (e) => {
			changeTheme("textcolor", e.target.value);
		});
		document.getElementById("bg").addEventListener("change", (e) => {
			changeTheme("bg", e.target.value);
		});
		document.getElementById("bgimg").addEventListener("keydown", (e) => {
			if (e.key == "Enter") {
				changeTheme("bg", e.target.value);
			}
		});
	}
});
function loadTheme() {
	if (localStorage.getItem("selenite.theme") == "custom") {
		let theme = localStorage.getItem("selenite.customTheme");
		if (theme) {
			theme = JSON.parse(theme);
			for (let i = 0; i < Object.keys(theme).length; i++) {
				document.body.style.setProperty(`--${Object.keys(theme)[i]}`, eval(`theme.${Object.keys(theme)[i]}   `));
			}
		}
	}
}

function changeTheme(name, value) {
    if(isValidHttpUrl(value)){
        value = `url(${value})`;
    }
	ogStyle = localStorage.getItem("selenite.customTheme");
	if (ogStyle) {
		ogStyle = JSON.parse(ogStyle);
		ogStyle[name] = value;
		localStorage.setItem("selenite.customTheme", JSON.stringify(ogStyle));
		loadTheme();
	} else {
		ogStyle = {};
		ogStyle[name] = value;
		localStorage.setItem("selenite.customTheme", JSON.stringify(ogStyle));
		loadTheme();
	}
}

// https://stackoverflow.com/a/43467144
function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }