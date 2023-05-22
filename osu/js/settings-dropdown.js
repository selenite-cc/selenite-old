function setOptionPanel() {
	function loadFromLocal() {
		let str = window.localStorage.getItem("osugamesettings");
		if (str) {
			let s = JSON.parse(str);
			if (s) Object.assign(gamesettings, s);
		}
	}

	function saveToLocal() {
		window.localStorage.setItem("osugamesettings", JSON.stringify(window.gamesettings));
	}
	// Give inputs initial value; set their callback on change
	// Give range inputs a visual feedback (a hovering indicator that shows on drag)
	let defaultsettings = {
		easy: false,
		daycore: false,
		hardrock: false,
		nightcore: false,
		hidden: false,
		autoplay: false,
	};
	window.gamesettings = {};
	Object.assign(gamesettings, defaultsettings);
	gamesettings.refresh = loadFromLocal;
	loadFromLocal();

	window.gamesettings.loadToGame = function () {
		if (window.game) {
			window.game.easy = this.easy;
			window.game.daycore = this.daycore;
			window.game.hardrock = this.hardrock;
			window.game.nightcore = this.nightcore;
			window.game.hidden = this.hidden;
			window.game.autoplay = this.autoplay;
		}
	}
	gamesettings.loadToGame();
	// this will also be called on game side. The latter call makes effect
	if (!document.getElementById("settings-panel")) return;

	// functions that get called when settings are restored to default
	// used for refreshing widgets on the page
	gamesettings.restoreCallbacks = [];

	function checkdefault(element, item) {
		if (gamesettings[item] == defaultsettings[item])
			element.parentElement.parentElement.parentElement.classList.remove("non-default");
		else
			element.parentElement.parentElement.parentElement.classList.add("non-default");
	}
	// FIXME: checkdefault: 1 to 1 bind
	function bindcheck(id, item) {
		let c = document.getElementById(id);
		c.checked = gamesettings[item];
		gamesettings.restoreCallbacks.push(function () {
			c.checked = gamesettings[item];
			checkdefault(c, item);
		});
		checkdefault(c, item);
		c.onclick = function () {
			gamesettings[item] = c.checked;
			checkdefault(c, item);
			gamesettings.loadToGame();
			saveToLocal();
		}
	}

	function bindExclusiveCheck(id1, item1, id2, item2) {
		let c1 = document.getElementById(id1);
		let c2 = document.getElementById(id2);
		c1.checked = gamesettings[item1];
		c2.checked = gamesettings[item2];
		gamesettings.restoreCallbacks.push(function () {
			c1.checked = gamesettings[item1];
			c2.checked = gamesettings[item2];
			checkdefault(c1, item1);
			checkdefault(c2, item2);
		});
		checkdefault(c1, item1);
		checkdefault(c2, item2);
		c1.onclick = function () {
			gamesettings[item1] = c1.checked;
			gamesettings[item2] = false;
			c2.checked = false;
			gamesettings.loadToGame();
			saveToLocal();
			checkdefault(c1, item1);
			checkdefault(c2, item2);
		}
		c2.onclick = function () {
			gamesettings[item2] = c2.checked;
			gamesettings[item1] = false;
			c1.checked = false;
			gamesettings.loadToGame();
			saveToLocal();
			checkdefault(c1, item1);
			checkdefault(c2, item2);
		}
	}



	function arrayBufferToBase64(buffer) {
		var binary = '';
		var bytes = new Uint8Array(buffer);
		var len = bytes.byteLength;
		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return window.btoa(binary);
	}


	function soundCheck(id) {
		let s = document.getElementById(id);
		let sampleFiles = [
			'normal-hitnormal.ogg',
			'normal-hitwhistle.ogg',
			'normal-hitfinish.ogg',
			'normal-hitclap.ogg',
			'normal-slidertick.ogg',
			'soft-hitnormal.ogg',
			'soft-hitwhistle.ogg',
			'soft-hitfinish.ogg',
			'soft-hitclap.ogg',
			'soft-slidertick.ogg',
			'drum-hitnormal.ogg',
			'drum-hitwhistle.ogg',
			'drum-hitfinish.ogg',
			'drum-hitclap.ogg',
			'drum-slidertick.ogg',
			'combobreak.ogg',
		]
		gamesettings.restoreCallbacks.push(function () {
			undefined
		});
		s.onchange = async function () {
			let soundFiles = s.files;
			let newFiles = {};
			for (file in soundFiles) {
				if (sampleFiles.includes(soundFiles[file].name)) {
					let a = await soundFiles[file].arrayBuffer()
					newFiles[soundFiles[file].name] = arrayBufferToBase64(a)
				}
			}
			if (Object.keys(newFiles).length == sampleFiles.length) {
				gamesettings["soundNames"] = newFiles;
			}
			gamesettings.loadToGame();
			saveToLocal();
			//console.log(gamesettings)
		}
	}

	// mods
	bindExclusiveCheck("easy-check", "easy", "hardrock-check", "hardrock");
	bindExclusiveCheck("daycore-check", "daycore", "nightcore-check", "nightcore");
	bindcheck("hidden-check", "hidden");
	bindcheck("autoplay-check", "autoplay");

	document.getElementById("restoredefault-btn").onclick = function () {
		Object.assign(gamesettings, defaultsettings);
		for (let i = 0; i < gamesettings.restoreCallbacks.length; ++i)
			gamesettings.restoreCallbacks[i]();
		gamesettings.loadToGame();
		saveToLocal();
	}
}

window.addEventListener('DOMContentLoaded', setOptionPanel);


// press any key to search
/*window.onkeydown = function(e) {
	if (e.ctrlKey || e.altKey || e.metaKey)
		return;
	if (e.key.length == 1 && e.key != " ") {
		let textinput = document.getElementsByTagName("input")[0];
		textinput.focus();
	}
}
*/