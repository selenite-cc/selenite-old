$(document).ready(function() {
    $('#gamesearch').on('input propertychange paste', function() {
        $('#games .game').hide();
        var txt = $('#gamesearch').val();
        $('#games .game').each(function(){
           if($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1){
               $(this).show();
           }
        });
    });   
});