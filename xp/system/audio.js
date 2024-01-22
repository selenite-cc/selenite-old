xp.audio = {
  context: null,
  cache: {},
  init: function() {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      xp.audio.context = new AudioContext();
    }
    catch(e) {
      console.error('Web Audio API is not supported in this browser');
    }
  },
  playURL: function(url) {
    if (xp.audio.cache[url] !== undefined) {
      var source = xp.audio.context.createBufferSource();
      source.buffer = xp.audio.cache[url];
      source.connect(xp.audio.context.destination);
      source.start(0);
    } else {
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';
      request.onload = function() {
        if (xp.audio.context === null) {
          xp.audio.init();
        }
        xp.audio.context.decodeAudioData(request.response, function(buffer) {
          var source = xp.audio.context.createBufferSource();
          source.buffer = buffer;
          xp.audio.cache[url] = buffer;
          source.connect(xp.audio.context.destination);
          source.start(0);
        }, console.error);
      }
      request.send();
    }
  }
};