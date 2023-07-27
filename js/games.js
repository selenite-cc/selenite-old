$.getJSON("/games.json", function (data) {
    $("#gamesearch").prop({placeholder: "Click here to search through our " + data.length + " games!"});
    data.sort(dynamicSort("name"));
    for (let i = 0; i < data.length; i++) {
        $('#games').append(
            $('<div>').prop({
                id: 'game',
                style: 'cursor: pointer;',
                dir: data[i].directory
            }).append(
                $('<img>').prop({
                    src: data[i].directory + "/" + data[i].image,
                    alt: data[i].name + " logo"
                })
            ).append(
                $('<h1>').text(data[i].name)
            )
        );
    }
    $("#games #message").remove();
});

$(document).ready(function() {
    $(document).on("click", "#game", function(event) {
        redirectGame($(this).attr("dir"));
    });    
});

function redirectGame(dir) {
     window.location.href = window.location.origin + "/" + dir + "/index.html";
}
function dynamicSort(property) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}