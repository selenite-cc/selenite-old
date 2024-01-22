$(window).on('xpboot', () => {
  xp.applications.add('image-viewer', (args) => {
    var image = args.length > 1 ? xp.filesystem.addPaths(args[0], args[1]) : '';
    var imagename = xp.filesystem.basename(image);
    var win = new Window({
      width: 640,
      height: 480,
      title: image === '' ? 'Image Viewer' : (imagename + ' - Image Viewer')
    });
    xp.filesystem.toURL(image, (url) => {
      win.content('<div style="width:100%;height:100%;background-size:100%;background-repeat:no-repeat;background-position:center;background-image:url(' + url + ')"></div>');
    });
  });
  explorer.fileHandlers.add('png', (f) => openApp('image-viewer', ['', f]));
  explorer.fileHandlers.add('jpg', (f) => openApp('image-viewer', ['', f]));
  explorer.fileHandlers.add('jpeg', (f) => openApp('image-viewer', ['', f]));
  explorer.fileHandlers.add('gif', (f) => openApp('image-viewer', ['', f]));
});