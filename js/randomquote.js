$.getJSON("/quotes.json", function (data) {
	let index = data[Math.floor(Math.random() * data.length)];
	if (index.includes("OGNUM1") && index.includes("SQRTNUM1")) {
		let ognum = Math.floor(Math.random() * 3000);
		index = "the square root of " + ognum + " is " + Math.sqrt(ognum);
	} else if (index.includes("CURRENTURL")) {
		index = window.location.hostname;
	}
	if (document.readyState === "complete") {
		document.getElementById("randomquote").innerHTML = index;
	} else {
		document.addEventListener("DOMContentLoaded", () => {
			document.getElementById("randomquote").innerHTML = index;
		});
	}
});
