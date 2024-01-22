function execJsPrompt(path) {
  xp.dialog('Run Javascript File?', 'Would you like to execute the javascript file "' + path + '"?', function() {
    loadJs(['', path]);
  }, true, 'warning');
}

function w93prg(args) {
  var el = $.parseHTML(`<window title="` + args[1] + `" width="640" height="480">
        <style>
          iframe[seamless]{
            background-color: transparent;
            border: 0px none transparent;
            padding: 0px;
            overflow: hidden;
          }
          .frame-container {
            /*display: none;*/
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            padding: 0px;
            margin: 0px;
          }
        </style>
        <div class="frame-container">
          <iframe seamless="seamless" width="100%" height="100%" id="frame" src="//www.windows93.net/#!/c/programs/` + args[1] + `/"></iframe>
        </div>
      </window>`);
  document.body.appendChild(el[0]);
  $(el).updateWindow();
  $(el).find('iframe').focus();
}

function loadJs(args) {
  if (args !== undefined && args[1] !== undefined) {
    var jsFile = xp.filesystem.addPaths(args[0], args[1]);
    xp.filesystem.readFile(jsFile, function(e) {
      if (e !== "") {
        eval(e);
      }
    });
  }
}
