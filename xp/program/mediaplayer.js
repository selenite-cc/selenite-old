$(window).on('xpboot', () => {
  xp.applications.add('media-player', (args) => {
    var video = args.length > 1 ? xp.filesystem.addPaths(args[0], args[1]) : '';
    var videoname = xp.filesystem.basename(video);
    var win = new Window({
      width: 480,
      height: 360,
      title: video === '' ? 'Media Player' : (videoname + ' - Media Player')
    });
    xp.filesystem.toURL(video, (url) => {
      win.content(`<video width="100%" height="100%" style="background-color:#000;" controls>
  <source src="` + url + `">
</video>`);
    });
  });
  explorer.fileHandlers.add('webm', (f) => openApp('media-player', ['', f]));
  explorer.fileHandlers.add('wav', (f) => openApp('media-player', ['', f]));
  explorer.fileHandlers.add('ogg', (f) => openApp('media-player', ['', f]));
  explorer.fileHandlers.add('ogv', (f) => openApp('media-player', ['', f]));
  explorer.fileHandlers.add('mp3', (f) => openApp('media-player', ['', f]));
  explorer.fileHandlers.add('mp4', (f) => openApp('media-player', ['', f]));
  explorer.fileHandlers.add('flac', (f) => openApp('media-player', ['', f]));
});