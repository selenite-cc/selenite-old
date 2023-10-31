function startTimer() {

  $('#game-timer').removeClass('hidden');

  var timeSec = 0, timeMin = 0;
  var timeSecStr = '', timeMinStr = '';

  clearInterval(gameTimer);

  gameTimer = setInterval(function() { 

    timeSec++;
    if (timeSec >= 0 && timeSec <= 9) {
      timeSecStr = '0' + timeSec;
    }
    if (timeSec >= 10 && timeSec <= 59) {
      timeSecStr = timeSec;
    }
    if (timeSec == 60) {
      timeSecStr = '00';
      timeSec = 0;
      timeMin++;
    }

    if (timeMin >= 0 && timeMin <= 9) {
      timeMinStr = '0' + timeMin;
    }
    if (timeMin >= 10 && timeMin <= 59) {
      timeMinStr = timeMin;
    }

    $('#game-timer').text(timeMinStr + ':' + timeSecStr);

    if (timeMin >= 5) {
      clearInterval(gameTimer);
    }

  }, 1000);
}

function stopTimer() {
  clearInterval(gameTimer);
  $('#game-timer').text('00:00');
}