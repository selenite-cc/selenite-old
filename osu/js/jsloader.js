// delayed js loader

function loadScript(url, callback, aux) {
	let script = document.createElement("script");
	document.head.appendChild(script);
	if (callback)
		script.onload = callback;
	if (aux) {
		for (let key in aux) {
			script.setAttribute(key, aux[key]);
		}
	}
	script.src = url;
}



window.beatmaplistLoadedCallback = function () {
	window.setTimeout(function () {
		loadScript("js/lib/zip.js", function () {
			window.zip.workerScriptsPath = 'js/lib/';
			loadScript("js/lib/zip-fs.js", checkdep);
		});
		loadScript("js/lib/pixi.min.js", checkdep);
		loadScript("js/lib/mp3parse.min.js", checkdep);
		loadScript("js/lib/localforage.min.js", checkdep);

		function checkdep() {
			if (!window.aaaaa) window.aaaaa = 0;
			window.aaaaa += 1;
			if (window.aaaaa == 4) {
				// load scripts of game
				loadScript("js/lib/require.js", function () {
					require.config({
						paths: {
							underscore: 'lib/underscore',
							sound: 'lib/sound'
						},
						shim: {
							"underscore": {
								exports: "_"
							}
						},
						// urlArgs: "bust=" +  (new Date()).getTime()
					});
				}, {
					"data-main": "js/initgame"
				});
				// load Liked list
				if (window.localforage) {
					localforage.getItem("likedsidset", function (err, item) {
						if (!err) {
							if (item && item.size)
								window.liked_sid_set = item;
							else
								window.liked_sid_set = new Set();
							for (let i = 0; i < window.liked_sid_set_callbacks.length; ++i)
								window.liked_sid_set_callbacks[i]();
							window.liked_sid_set_callbacks = [];
						} else {
							console.error("Favorites list failed to load");
						}
					});
				}
			}
		}

	}, 0);
}