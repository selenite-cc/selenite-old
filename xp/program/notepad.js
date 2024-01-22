$(window).on('xpboot', () => {
  xp.applications.add('notepad', (args) => {
    var guid = generate_guid();
    var el = $.parseHTML(`<window title="Notepad" width="480" height="360">
  <textarea style="width: 100%; height: calc(100% - 19px); resize: none" id="notepad_` + guid + `" filename=""></textarea>
</window>`);
    document.body.appendChild(el[0]);
    $(el).updateWindow();
    $(el).addMenu("File", [
      ["New", function() {
        $("#notepad_" + guid).val("");
        $("#notepad_" + guid).attr('filename', '');
      }],
      ["Open", function() {
        xp.filesystem.openFileDialog((filename) => {
          xp.filesystem.readFile(filename, function(e) {
            //e = e.split("\0")[0];
            $("#notepad_" + guid).val(e);
            $("#notepad_" + guid).attr("filename", filename);
          });
        });
      }],
      ["Save", function() {
        var filename = $("#notepad_" + guid).attr("filename");
        if (filename === "") {
          xp.filesystem.saveFileDialog((filename) => {
            xp.filesystem.writeFile(filename, new Blob([$("#notepad_" + guid).val()], {type: 'text/plain'}), (e) => {
              if (e) xp.dialog('Error', e);
            });
          });
        } else {
          xp.filesystem.writeFile(filename, new Blob([$("#notepad_" + guid).val()], {type: 'text/plain'}), (e) => {
            if (e) xp.dialog('Error', e);
          });
        }
      }],
      ["Save As", function() {
        xp.filesystem.saveFileDialog((filename) => {
          xp.filesystem.writeFile(filename, new Blob([$("#notepad_" + guid).val()], {type: 'text/plain'}), (e) => {
            if (e) xp.dialog('Error', e);
          });
        });
      }]
    ]);
    
    if (args !== undefined && args[1] !== undefined) {
      var filename = xp.filesystem.addPaths(args[0], args[1]);
      xp.filesystem.readFile(filename, function(e) {
        //e = e.split("\0")[0];
        $("#notepad_" + guid).val(e);
        $("#notepad_" + guid).attr("filename", filename);
      });
    }
  });
  xp.startmenu.add('notepad', 'Notepad', '//cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fnotepad.png?1521328884236');
});