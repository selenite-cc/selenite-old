$.getJSON("/quotes.json", function(data){
    $("p#randomquote").text(data[Math.floor(Math.random() * data.length - 1)])
})