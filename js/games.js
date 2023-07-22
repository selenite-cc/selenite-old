$.getJSON("/games.json", function (data) {
    for (let i = 0; i < data.length; i++) {
        $('#games').append(
            $('<div>').prop({
                id: 'game',
                style: 'cursor: pointer;'
            }).append(
                $('<img>').prop({
                    src: data[i].directory + "/" + data[i].image
                })
            ).append(
                $('<h1>').text(data[i].name)
            )
        );
    } 
})