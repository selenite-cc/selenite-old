var scripts = [
  'system/core.js',
  'system/window-api.js',
  'system/contextmenus.js',
  'system/filesystem.js',
  'system/xp.js',
  'system/jquery.terminal-2.0.0.min.js',
  'system/unix_formatting.js',
  'program/terminal.js',
  'system/script.js',
  'system/explorer.js',
  'system/help.js',
  'program/browser.js',
  'program/notepad.js',
  'program/imageviewer.js',
  'program/mediaplayer.js',
  'system/config.js',
  'system/controlpanel.js',
  'system/uac.js',
  'system/uac_app.js',
  'system/audio.js',
  'system/lambda.js',
  'program/minesweeper.js',
  'program/paint.js',
  '//xpstore.glitch.me/appstore.js',
  'boot/boot.js'
];
var stylesheets = [
  'system/fonts.css',
  'system/xp.css',
  'system/icons.css',
  'system/widgets.css',
  'system/window.css',
  'system/contextmenus.css',
  'system/cursors.css',
  'system/desktop.css',
  'system/startmenu.css',
  'system/explorer.css',
  'system/jquery.terminal-2.0.0.min.css'
];
var requiredDirectories = [];

$(function() {
  $('windows').html(`
<div class="_ui_boot">
  <div class="_ui_boot_copyright"></div>
  <div class="_ui_boot_companylogo"></div>
  <center class="_ui_boot_logo">
    <div class="_ui_boot_winlogo"></div>
    <div class="_ui_boot_progress"></div>
    <!--<div style="bottom:0;position:absolute;width:100%;" id="loadingstatus"></div>-->
  </center>
</div>`);
  console.log('Loading scripts and stylesheets...');
  $('<link/>', {rel: 'stylesheet', href: 'boot/boot.css'}).appendTo('head');
  var scriptsindex = 0;
  var stylesindex = 0;
  
  function loadStylesheets() {
    $.ajax({
      url: stylesheets[stylesindex],
      dataType: "script",
      success: function(data){
        $("head").append("<style>" + data + "</style>");
        stylesindex ++;
        if (stylesindex < stylesheets.length) {
          loadStylesheets();
        } else {
          loadScripts();
        }
      }
    });
  }
  
  function loadScripts() {
    $.ajax({
      url: scripts[scriptsindex],
      dataType: "script",
      success: function(data){
        scriptsindex ++;
        if (scriptsindex < scripts.length) {
          loadScripts();
        } else {
          console.log('Finished loading');
          console.log('Checking for necessary directories');
          
          function checkDir(path, callback) {
            var times = 0;
            xp.filesystem.listDir(path, (e) => {
              if (times === 0)
                callback(typeof e === 'string');
              times ++;
            });
          }
          
          var i = 0;
          function checkNextDir(t) {
            var dirToCreate = requiredDirectories[i];
            if (dirToCreate !== undefined) {
              xp.filesystem.createDir(dirToCreate, (e) => {
                i ++;
                checkNextDir();
              });
            } else {
              xp.audio.init();
              var event = new Event('xpboot');
              window.dispatchEvent(event);
              console.log('Dispatched boot event');
              $('windows').html('<div class="_ui_wallpaper fullscreen"><img class="_ui_wallpaper_image" src="boot/assets/welcome.png"/></div>');
              $.getScript('system/login.js');
              xp.audio.playURL('boot/assets/startup.wav');
            }
          }
          
          xp.filesystem.create(512*1024*1024, () => {
            xp.filesystem.fs.root.getDirectory('/', {create: false}, function(dirEntry) {
              var dirReader = dirEntry.createReader();
              var entries = [];

              function readEntries() {
                dirReader.readEntries (function(results) {
                  if (results.length === 0) {
                    $('._ui_boot').remove();
                    $('windows').html('<div class="_ui_wallpaper fullscreen"><img class="_ui_wallpaper_image" src="boot/assets/welcome.png"/></div>');
                    $.getScript('setup/setup.js');
                  } else {
                    xp.filesystem.createDir('/WINDOWS', (e) => {
                      requiredDirectories = [
                        '/WINDOWS',
                        '/WINDOWS/system32',
                        '/WINDOWS/startup',
                        '/Program Files',
                        '/Documents and Settings'
                      ];
                      checkNextDir();
                    });
                  }
                }, console.error);
              };

              readEntries();
            }, console.error);
          });
        }
      }
    });
  }
  
  loadStylesheets();
});
