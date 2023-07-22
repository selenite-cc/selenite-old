window.addEventListener("load", loadJson());

function loadJson() {
    fetch('./games.json')
    .then((response) => response.json())
    .then((json) => console.log(json));
}