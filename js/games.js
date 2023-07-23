$.getJSON("/games.json", function (data) {
    for (let i = 0; i < data.length; i++) {
        $('#games').append(
            $('<div>').prop({
                id: 'game',
                style: 'cursor: pointer;',
                dir: data[i].directory
            }).append(
                $('<img>').prop({
                    src: data[i].directory + "/" + data[i].image
                })
            ).append(
                $('<h1>').text(data[i].name)
            )
        );
    }
});

$(document).ready(function() {
    $(document).on("click", "#game", function(event) {
        redirectGame($(this).attr("dir"));
    });    
});

function redirectGame(dir) {
     window.location.href = window.location.origin + "/" + dir + "/index.html";
}
