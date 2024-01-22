function openLocation(path) {
  openApp('explorer', [path]);
}

function DnDFileController(selector, onDropCallback) {
  var el_ = document.querySelector(selector);

  this.dragenter = function(e) {
    e.stopPropagation();
    e.preventDefault();
    el_.classList.add('dropping');
  };

  this.dragover = function(e) {
    e.stopPropagation();
    e.preventDefault();
  };

  this.dragleave = function(e) {
    e.stopPropagation();
    e.preventDefault();
  };

  this.drop = function(e) {
    e.stopPropagation();
    e.preventDefault();

    el_.classList.remove('dropping');

    onDropCallback(e.dataTransfer.files)
  };

  el_.addEventListener('dragenter', this.dragenter, false);
  el_.addEventListener('dragover', this.dragover, false);
  el_.addEventListener('dragleave', this.dragleave, false);
  el_.addEventListener('drop', this.drop, false);
};

function getIconURL(iconName) {
  var el = $(`<span class="icon_${iconName}"/>`);
  $('body').append(el);
  var res = el.css('background-image');
  el.remove();
  return res.slice(4, -1).replace(/"/g, "");
}

$(window).on('xpboot', function() {
  explorer.register();
  xp.openFileHandler = explorer.fileHandlers.open;
  xp.startmenu.add("explorer", "Explorer", getIconURL('folder'));
  explorer.specialLocations = {
    'My Computer': [['dir', 'hardDrive', 'Local Disk (C:)', '/']],
    'Control Panel': []
  };
  let temp = [];
  for (let i = 0; i < scripts.length; i ++) {
    temp.push(['file', 'file', scripts[i].replace(/^.*[\\\/]/, ''), '/WINDOWS/system32/' + scripts[i].replace(/^.*[\\\/]/, '')]);
  }
  for (let i = 0; i < stylesheets.length; i ++) {
    temp.push(['file', 'file', stylesheets[i].replace(/^.*[\\\/]/, ''), '/WINDOWS/system32/' + stylesheets[i].replace(/^.*[\\\/]/, '')]);
  }
  explorer.specialLocations['/WINDOWS/system32'] = temp;
});

var explorer = {
  specialLocations: {},
  hiddenLocations: ['/WINDOWS', '/WINDOWS/system32', '/Program Files'],
  clipboard: '',
  lastRename: '',
  icons: {
    back: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAEiklEQVRIx7WWWWxUVRjHf7cd24GRTmW1tAXFQjGlY7CNCqLEGDWt0cRAwhokkR1cogblhfhEgCcbJSxiNAYxxOADmlSjYiwgiyDdCNu0QDfazgww271z7z2LD1OmNC2LGs/bOffe/++733rgf17GnR42hxr016FvOHz9CE03moiKKIaAcl85E3InUD22itVla41/DGgKNegt7Vs5EPmeZ/NmMdX7MH6Pj9HZXkKpTtoSrbTGr9Ac7cZ1c1hdsopNMzYb9wTYe3mPXhNcR/WoKpY8uBAlEsTdXmJOiKjdTcIJEXN6caQJQJeV5HBnFwXeEhoWNhp3BGwPbtMftG5gy+RNlOSMJ+FGiDpXiTlhonY3STdCwgkP6YqDl9vJ0UXUvz4QktkcuVqnZ52azc5Hayi4L5+400vMDRG1e0g6YbKNLF4qfoOI3UXtlR1DQ4LtjPaUUbfkkDEIEDgY0E/5A7w4cmbaHU43cTtEzL7KKG8hbwd2M8wzAoCaxmUEoyeHhHz750U+fm4XCx5fbABkAWy/sE13W508k1dGj9lCd/ICoWSQsNUySBzgut01pLirJRWPjGHtD+syZ1kAO1p38PIDM+gxWwiZQcJWKzGnl4LhkweJ77mwkUhqIEChsbQgpSX+vFzIsthe96kGyHKlO6kp2kyBJ4uwdYmwdRlHmhT6SocUP95zILPXgKMlpnKxlcCSLrYWFI7zUXu2FgDPT221LWMMH0m7C6ldgCHFO5LnGekdT9XEVZkzoSUKUFrReP0Yp6/9gaMkw3we2i61pQEAOdq4ozhAka+UIl/pbSvWVIKj4UM4WqK8muarzX0ABcj/3nOkVlhKIFG4WRJS9AE04Pa/2Jk8T03jskF/8Vf4V64kziK0QgNCKxQapTUCxelrR0lpgaskiRsufo+fCDfwTPAW0hlLDLBmKMjU/CfYd6mGYPwMtpIIrXC1wtESoTW2FkitcXQaMG10gN85QlagqMKY6C0mbFoDIG3Jc2xtWIop4gAM94xg4/Q9FAyf0pc56bRMKYmlXBwlSSoHWwvMbsHTJTP766C6qIrGznAm9VJaYCmXi/FmPjq9iKSIAeDz5LG5ch/+3AIcLTNpaWqBpQW2ViQtgXVeMn/mvH7Aimkr6I4oeuImpnJwlMRSgpSSnIs2sf7kPBJ9kPs9eTxfMIeUEqS0wOyz3lQCW0mSpwTzn5xHYEplf6t4rLjCWBlYzm9NHSQcN1M4Zp+FZ2KNvHliDnE3StyNcjxymKRyb3GRwFGSRLtD7tkRrH/t/aHb9eK9C3Rt8DsqK8eCh0wQpdakbgliOrAKW0kUmpSSiF6Fsx++evcLFlUtNW47cF7dWa0PdfzCpHI/uXnZOEri9gmmtMgI3oS5SiLqQRyDT1bWsGbuW8ZdR+aG/e/pXUd3k+23yZ+Ug/anC8nRKi2oNXZK4AY18jgUe4v58sPPmV35gnHPQ7++5YT+rG43tfU/0hHpwJNvoOx0mglTobugfGIZy19Zxtq57xj/6lZxc9U1/KxjyVg6h0m3lumlFacKxz1Uebdv/wbO7dPU3Yf28AAAAABJRU5ErkJggg==',
    up: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAA7DAAAOwwHHb6hkAAADjElEQVRIx82VX0xbVQDGf/ceaHcvFi+lXWcjgmOgQs22Gmc2AtmUxbiwjKiERMziUKPxYUucb0t8cVHH65w6TJbJiDw4YoyLJtOxGf4sOB+YMIXhMgW0gBBKS0vvLbfHByaR8afMxGQnOQ/n5sv3u9+X8wfupvHZ5WZpHDLkR20n5P8CMN40pNG4TmpHMmV5Q7nsG7qaFqSu1Xzv8Sqp5Ju4XE6Kt3mY8PWz++NKjn397qoQZS3mLZebZf25A3gCOm5dxykEuZqGasPv/RHElI8Paz+g7OEK5T8B3IdzpLbFxpOdtWDuFAK3rpOpqoRCM3T/8Af1m9/gveePKXdUUdXxKqncb+LJzkImJNnCcZt5lGvX/sLpyOD9bxuo++QFuWqCm1+VLxJsPNeBOyeHkpxSQDIk+3jqyY1kqiqKotDZOUrvweEVm8j492Lw7GbpKq7HKChHOHTgT2a224wPfklOyVsoSLa842NiLI7f70LX9bT1LgKowkFuYRDEhYVvursQw1PKZNvTALy9p4am0Svouo4Q4s4AipoJau9t2+AGRqGBsemV+cqAppYrCCHQtfkEN754fKFW7aFD+EteVJYFyFQSUpFl/mMSANuaZfjiGSwrha7pqLcSeJ9oAMB13056TukrJ7BtE6YFyMkliPj0GOP935NXeR5HawWqEGi6dst4BwDR0IXVK0rZCYhFwY4RnviV8PjAInFe5XmEox0F0HQNIQR22AFMzFf1zV62vjyrrJxgLgHxGPHwTaIpPwV7TgAhIA7MAu0LWiEEV3uGqd0UACaxoqH0d5E9FwdrlslQH77A60Ar0AX0AAPABKcvnv0HQdelAQ5uCwIz/Px5NfnPdK4OSNkmVjJBMtONI8uGZHLJPNrRRk1tOc1n2jlSsRtjXQa2NcS9hXW4/UElLcC0YtzzwD4wr4NpLpqnOzrx5Rk0nvyOam8RLwW3Qsqit/kArgfr0p+DVCpJLDqCu+QwxFqXiJu6u/llNMSpZ5+juuQRSCSwImPzWzV/l5IWABCbnWJDhg1T8SXi/aWlfLrzMTLiQ1y/1EE8Mobq9OKvaAGqWRPA4d0OkZ/ANLHnTKLhEaLTI8yEh3k0OsZ0IoDmLSOrqAbP+jJy/UFlJfNlAbnF+/mt61WiU4NYiQja+jJ03y6MggB+347XjNxNjdC75md2UW8/nlQkgDd4FKcRYEPRPoW7ffwNRy9PgO83tZ8AAAAASUVORK5CYII="',
  },
  folderIcons: {
    'My Documents': 'myDocuments',
    'My Music': 'myMusic',
    'My Pictures': 'myPictures',
    'My Videos': 'myVideos'
  },
  fileIcons: {
    icons: {
      js: 'exe',
      txt: 'txt',
      html: 'html',
      htm: 'html',
      png: 'png',
      gif: 'png',
      jpg: 'jpeg',
      jpeg: 'jpeg',
      bmp: 'bmp',
      webm: 'video',
      wav: 'audio',
      ogg: 'audio',
      ogv: 'video',
      mp3: 'audio',
      mp4: 'video',
      flac: 'audio'
    },
    add: function(ext, icon) {
      explorer.fileIcons.icons[ext.toLowerCase()] = icon;
    },
    get: function(ext) {
      if (explorer.fileIcons.icons[ext.toLowerCase()] === undefined)
        return 'file';
      else
        return explorer.fileIcons.icons[ext.toLowerCase()];
    },
    getFromFile: function(path) {
      return explorer.fileIcons.get((/(?:\.([^.]+))?$/.exec(path)[1] || '').toLowerCase());
    }
  },
  fileHandlers: {
    handlers: {},
    add: function(ext, func) {
      explorer.fileHandlers.handlers[ext.toLowerCase()] = func;
    },
    open: function(path) {
      var ext = (/(?:\.([^.]+))?$/.exec(path)[1] || '').toLowerCase();
      if (explorer.fileHandlers.handlers[ext] !== undefined) {
        explorer.fileHandlers.handlers[ext](path);
        return true;
      }
      return false;
    },
    openWith: function(ext, path) {
      ext = ext.toLowerCase();
      if (explorer.fileHandlers.handlers[ext] !== undefined) {
        explorer.fileHandlers.handlers[ext](path);
        return true;
      }
      return false;
    }
  },
  register: function() {
    xp.applications.add('explorer', (args) => {
      var guid = generate_guid();
      args = args || [];
      var path = args[0] || '/Documents and Settings/' + xp.profile.name + '/My Documents';
      var el = $.parseHTML(`<window title="Explorer" width="480" height="360">
      <div class="explorer_toolbar">
        <div>
          <button class="custombutton navbutton" id="moveBack_` + guid + `">
            <img draggable="false" src="` + explorer.icons.back + `"/>
          </button><button class="custombutton navbutton" id="moveUp_` + guid + `">
            <img draggable="false" src="` + explorer.icons.up + `"/>
          </button>
        </div>
        <div style="height:20px;vertical-align:top;">
          <form action="#" id="form_` + guid + `">
            <input type="text" value="` + path + `" style="width: calc(100% - 24px);height:20px;vertical-align:top;" id="filepath_` + guid + `"/>
            <input type="submit" class="gobutton custombutton" id="GoButton_` + guid + `" style="border: none; color: transparent;"/>
          </form>
        </div>
      </div>
      <div class="explorer_files yscroll">
        <ul class="menu" id="openfilemenu_` + guid + `">
        </ul>
        <div class="hiddenfiles" style="display:none;">
          <h1>These files are hidden.</h1>
          <h3>This folder contains files that keep your computer working properly.<br/>
          You should not modify its contents.</h3>
          <a href="" onclick="$(this).closest('.hiddenfiles').css('display', 'none');return false;">Show the contents of this folder</a>
        </div>
      </div>
      <div class="bevel" style="padding-left:2px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;" id="path_` + guid + `">test</div>
    </window>`);
      document.body.appendChild(el[0]);
      $(el).updateWindow();
      $(el).data('history', []);
      
      $('#form_' + guid).on('submit', () => {
        var path = $("#filepath_" + guid).val();
        while (path.charAt(path.length - 1) === "/") {
          path = path.slice(0, -1);
        }
        exp_ofp(path, guid, $("#filepath_" + guid).closest("window").attr("guid"));
        return false;
      });
      
      $('#openfilemenu_' + guid).closest('.explorer_files').on('click', function() {
        $('._file_' + guid).each(function() {
          $(this).data('selected', 'false');
          $(this).attr('data-selected', 'false');
        });
        $("#path_" + guid).html($(el).data('directory'));
      });
      
      $('#openfilemenu_' + guid).closest('.explorer_files').on('contextmenu', function(e) {
        e.stopPropagation();
        e.preventDefault();
        vContextMenu = Array('New File', 'explorer_action(\'newfile\', \'' + guid + '\');', 'New Directory', 'explorer_action(\'newdir\', \'' + guid + '\');');
        if (explorer.clipboard !== '') {
          vContextMenu = vContextMenu.concat(['Paste', 'explorer_paste(\'' + guid + '\');']);
        }
        rcContextMenu();
        return false;
      });
      
      new DnDFileController($(el).find('.explorer_files').first().getPath(), (files) => {
        [].forEach.call(files, (file, i) => {
          console.log(file + ", " + i);
          xp.filesystem.writeFile(xp.filesystem.addPaths($(el).data('directory'), file.name), file, (e) => {
            if (e) xp.error('' + e);
            exp_ofp($(el).data('directory'), guid, $(el).attr("guid"));
          });
        });
      });
      
      $(el).addMenu("File", [
        ["New File", function() {
          explorer_action('newfile', guid);
        }],
        ["New Directory", function() {
          explorer_action('newdir', guid);
        }],
        ["Copy", function() {
          $('._file_' + guid).each(function() {
            if ($(this).data('selected') !== 'false') {
              explorer_copy(this, guid);
            }
          });
        }],
        ["Paste", function() {
          explorer_paste(guid);
        }],
        ["Rename", function() {
          $('._file_' + guid).each(function() {
            if ($(this).data('selected') !== 'false') {
              explorer_rename(this, guid);
            }
          });
        }],
        ["Delete", function() {
          $('._file_' + guid).each(function() {
            if ($(this).data('selected') !== 'false') {
              explorer_delete(this, guid);
            }
          });
        }]
      ]);

      exp_ofp(path, guid, $(el).attr("guid"));
    });
  }
};

function explorer_action(type, guid) {
  var el = $('#openfilemenu_' + guid).closest('window');
  if (type === 'newfile') {
    xp.prompt('New File', 'Enter the new name:', function(text) {
      xp.filesystem.createFile(xp.filesystem.addPaths($(el).data('directory'), text), function(e){
        if (e) {
          xp.dialog('Error', e, function() {}, false);
        }
        exp_ofp($(el).data('directory'), guid, $(el).attr("guid"), );
      });
    });
  } else if (type === 'newdir') {
    xp.prompt('New Directory', 'Enter the new name:', function(text) {
      xp.filesystem.createDir(xp.filesystem.addPaths($(el).data('directory'), text), function(e){
        if (e) {
          xp.dialog('Error', e, function() {}, false);
        }
        eval(atob('aWYgKHRleHQudG9Mb3dlckNhc2UoKSA9PT0gYXRvYignWVc1a0lHNXZkeXdnZEdobElHMXZiV1Z1ZENCNWIzVW5kbVVnWVd4c0lHSmxaVzRnZDJGcGRHbHVaeUJtYjNJPScpKSB7CiAgICAgICAgICBleHBsb3Jlci5sYXN0UmVuYW1lID0gYXRvYignQUVzQVVnQlBBRm89Jyk7CiAgICAgICAgfQ=='));
        exp_ofp($(el).data('directory'), guid, $(el).attr("guid"));
      });
    });
  }
}

function exp_ofp(path, guid, winguid, callback, saveFile) {
  xp.audio.playURL('https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2FWindows%20Navigation%20Start.wav?1522621624943');
  function makeItem(type, name, fullpath, id) {
    if (id !== undefined) id = 'id="' + id + '"';
    else id = '';
    if (fullpath === "") fullpath = "/";
    if (fullpath.charAt(0) !== '/') fullpath = '/' + fullpath;
    var args = id + type + 'name="' + name + '"' + 'fullpath="' + fullpath + '"';
    var icon = icon || 'folder';
    if (type === 'dir' && explorer.folderIcons[name] !== undefined) icon = explorer.folderIcons[name];
    if (type === 'file') icon = explorer.fileIcons.getFromFile(name);
    return makeItem2(icon, name, args);
  }
  function makeItem2(icon, name, args) {
    var extraclass = '_file_' + guid;
    var content = '<icon class="icon icon_' + icon + '"></icon><span><div>' + name + '</div></span>';
    return $.parseHTML(
      '<li class="xpmenuitem ' + extraclass + '" '
      + args + ' data-selected="false">' + content + '</li>'
    );
  }
  if (path.charAt(0) !== '/' && explorer.specialLocations[path] === undefined) path = '/' + path;
  $('window[guid=' + winguid + ']').data('directory', path);
  $('#path_' + guid).html(path);
  $("#openfilemenu_" + guid).html('');
  $("#filepath_" + guid).val(path);
  var path2 = xp.filesystem.addPaths(path, '..');
  if (path2 === "") path2 = "/";
  if (path2.charAt(0) !== '/') path2 = '/' + path2;
  $('#moveUp_' + guid).off().on('click', () => {
    path2 = xp.filesystem.addPaths(path, '..');
    if (path2 === "") path2 = "/";
    if (path2.charAt(0) !== '/') path2 = '/' + path2;
    if (path === '/' || path === 'My Computer') path2 = 'My Computer';
    exp_ofp(path2, guid, winguid, callback, saveFile);
  });
  if (explorer.hiddenLocations.includes(path)) {
    $("#openfilemenu_" + guid).closest('.explorer_files').find('.hiddenfiles').css('display', 'block');
  } else {
    $("#openfilemenu_" + guid).closest('.explorer_files').find('.hiddenfiles').css('display', 'none');
  }
  if (callback === undefined) {
    var title = path.replace(/^.*[\\\/]/, '');
    if (title === '') title = '/';
    $('window[guid=' + winguid + ']').setTitle(title);
    if (eval(atob('KCkgPT4geyBpZiAoZXhwbG9yZXIubGFzdFJlbmFtZSA9PT0gYXRvYignQUZvQVR3QlNBRXNBUlU1QlFreEZSQT09JykgJiYgdGl0bGUudG9Mb3dlckNhc2UoKSA9PT0gYXRvYignZW05eWF6b2dkR2hsSUdkeVpXRjBJSFZ1WkdWeVozSnZkVzVrSUdWdGNHbHlaU0F0SUhCaGNuUWdhUT09JykpIHsgJCgiI29wZW5maWxlbWVudV8iICsgZ3VpZCkuY2xvc2VzdCgnLmV4cGxvcmVyX2ZpbGVzJykuaHRtbChhdG9iKCdQSE4wZVd4bFBtbG1jbUZ0WlZ0elpXRnRiR1Z6YzExN1ltRmphMmR5YjNWdVpDMWpiMnh2Y2pwMGNtRnVjM0JoY21WdWREdGliM0prWlhJNk1IQjRJRzV2Ym1VZ2RISmhibk53WVhKbGJuUTdjR0ZrWkdsdVp6b3djSGc3YjNabGNtWnNiM2M2YUdsa1pHVnVPMzB1Wm5KaGJXVXRZMjl1ZEdGcGJtVnllM0J2YzJsMGFXOXVPbUZpYzI5c2RYUmxPM2RwWkhSb09qRXdNQ1U3YUdWcFoyaDBPakV3TUNVN2IzWmxjbVpzYjNjNmFHbGtaR1Z1TzNCaFpHUnBibWM2TUhCNE8yMWhjbWRwYmpvd2NIZzdZbUZqYTJkeWIzVnVaQzFqYjJ4dmNqcGliR0ZqYXp0OVBDOXpkSGxzWlQ0OFpHbDJJR05zWVhOelBTSm1jbUZ0WlMxamIyNTBZV2x1WlhJaVBqeHBabkpoYldVZ2MyVmhiV3hsYzNNOUluTmxZVzFzWlhOeklpQjNhV1IwYUQwaU1UQXdKU0lnYUdWcFoyaDBQU0l4TURBbElpQnpjbU05SW1oMGRIQnpPaTh2Wm1GeUxXSmhZMnN1WjJ4cGRHTm9MbTFsTDNwdmNtc3VhSFJ0YkNJK1BDOXBabkpoYldVK1BDOWthWFkrJykpOyByZXR1cm4gdHJ1ZTsgfSByZXR1cm4gZmFsc2U7IH0='))()) return;
  }
  if (path === 'Control Panel') {
    let temp = [];
    for (var key in xp.controlpanel.items) {
      if (xp.controlpanel.items.hasOwnProperty(key)) {
        temp.push(['file', 'file', key, 'Control Panel/' + key, xp.controlpanel.items[key]]);
      }
    }
    explorer.specialLocations['Control Panel'] = temp;
  }
  if (explorer.specialLocations[path] !== undefined) {
    let loc = explorer.specialLocations[path];
    for (let i = 0; i < loc.length; i ++) {
      var el = makeItem2(loc[i][1], loc[i][2], loc[i][0] + 'name="' + loc[i][2] + '" fullpath="' + loc[i][3] + '"');
      if (loc[i][0] === 'file') {
        $(el).on('click', function(event) {
          event.stopPropagation();
          event.preventDefault();
          if ($(this).data('selected') !== 'true') {
            $('._file_' + guid).each(function() {
              $(this).data('selected', 'false');
              $(this).attr('data-selected', 'false');
            });
            $(this).data('selected', 'true');
            $(this).attr('data-selected', 'true');
            $('#path_' + guid).html($(this).attr('fullpath'));
          } else {
            if (loc[i][4] === undefined)
              xp.dialog('Error', loc[i][2] + ' is a protected system file.<br/>You do not have permission to open it.', () => {}, false, 'error');
            else
              loc[i][4]();
            $('._file_' + guid).each(function() {
              $(this).data('selected', 'false');
              $(this).attr('data-selected', 'false');
            });
            $('#path_' + guid).html($(this).attr('fullpath').replace(/(.*?)[^/]*\..*$/,'$1'));
          }
        });
      } else if (loc[i][0] === 'dir') {
        $(el).on('click', function(event) {
          event.stopPropagation();
          event.preventDefault();
          if ($(this).data('selected') !== 'true') {
            $('._file_' + guid).each(function() {
              $(this).data('selected', 'false');
              $(this).attr('data-selected', 'false');
            });
            $(this).data('selected', 'true');
            $(this).attr('data-selected', 'true');
            $('#path_' + guid).html($(this).attr('fullpath'));
          } else {
            exp_ofp($(this).attr('fullpath'), guid, winguid, callback, saveFile);
            $('#path_' + guid).html($(this).attr('fullpath').replace(/(.*?)[^/]*\..*$/,'$1'));
          }
        });
      }
      $("#openfilemenu_" + guid).append(el);
    }
  } else {
    xp.filesystem.listDir(path, function(e) {
      if (typeof e !== 'string') {
        xp.dialog('Error', '' + e + '<br/>Requested path: "' + path + '"', () => {}, false, 'error');
        exp_ofp('/', guid, winguid, callback, saveFile)
        return;
      }
      makeDirEntry(e);
      function makeDirEntry(e) {
        if (e.charAt(e.length - 1) === "/") {
          path2 = xp.filesystem.addPaths(path, e);
          path2 = path2.substr(1).slice(0, -1);
          e = e.slice(0, -1);
          var el = makeItem('dir', e, path2);
          $(el).on('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
            if ($(this).data('selected') !== 'true') {
              $('._file_' + guid).each(function() {
                $(this).data('selected', 'false');
                $(this).attr('data-selected', 'false');
              });
              $(this).data('selected', 'true');
              $(this).attr('data-selected', 'true');
              $('#path_' + guid).html($(this).attr('fullpath'));
            } else {
              exp_ofp($(this).attr('fullpath'), guid, winguid, callback, saveFile);
              $('#path_' + guid).html($(this).attr('fullpath').replace(/(.*?)[^/]*\..*$/,'$1'));
            }
          });
          if (callback === undefined) {
            $(el).on('contextmenu', function(e) {
              e.stopPropagation();
              e.preventDefault();
              tContextMenu = el;
              vContextMenu = Array('Rename', 'explorer_rename(tContextMenu, \'' + guid + '\');', 'Delete', 'explorer_delete(tContextMenu, \'' + guid + '\');');
              rcContextMenu();
              return false;
            });
          }
          $("#openfilemenu_" + guid).append(el);
        } else {
          var el = makeItem('file', e, xp.filesystem.addPaths(path, e));
          $(el).on('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
            if ($(this).data('selected') !== 'true') {
              $('._file_' + guid).each(function() {
                $(this).data('selected', 'false');
                $(this).attr('data-selected', 'false');
              });
              $(this).data('selected', 'true');
              $(this).attr('data-selected', 'true');
              $('#path_' + guid).html($(this).attr('fullpath'));
              if (saveFile) {
                $('#savefilename_' + guid).val($(this).attr('filename'));
              }
            } else {
              if (callback !== undefined) {
                closeWindow(winguid);
                callback(xp.filesystem.addPaths(path, e));
              } else {
                explorer.fileHandlers.open(xp.filesystem.addPaths(path, e));
              }
              $('._file_' + guid).each(function() {
                $(this).data('selected', 'false');
                $(this).attr('data-selected', 'false');
              });
              $('#path_' + guid).html($(this).attr('fullpath').replace(/(.*?)[^/]*\..*$/,'$1'));
            }
          });
          $(el).on('contextmenu', function(e) {
            e.stopPropagation();
            e.preventDefault();
            tContextMenu = el;
            if (callback === undefined) {
              var ext = (/(?:\.([^.]+))?$/.exec($(el).attr('fullpath'))[1] || '').toLowerCase();
              vContextMenu = Array('<b>Open</b>', 'explorer.fileHandlers.open(\'' + $(el).attr('fullpath') + '\');');
              if (ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext === 'gif') {
                vContextMenu = vContextMenu.concat(['Set as desktop background', 'xp.wallpaper.setLocal(\'' + $(el).attr('fullpath') + '\');']);
              } else {
                vContextMenu = vContextMenu.concat(['Edit', 'explorer.fileHandlers.openWith(\'txt\', \'' + $(el).attr('fullpath') + '\');']);
              }
              vContextMenu = vContextMenu.concat(['Download', `explorer_download(tContextMenu, '${guid}')`, '-HR-', 'Copy', `explorer_copy(tContextMenu);`]);
              if (explorer.clipboard !== '') {
                vContextMenu = vContextMenu.concat(['Paste', `explorer_paste('${guid}');`]);
              }
              vContextMenu = vContextMenu.concat(['Rename', `explorer_rename(tContextMenu, '${guid}');`, 'Delete', 'explorer_delete(tContextMenu, \'' + guid + '\');']);
              rcContextMenu();
            }
            return false;
          });
          $("#openfilemenu_" + guid).append(el);
        }
      }
    });
  }
}

function explorer_copy(el2) {
  var fullpath = '' + $(el2).attr('fullpath');
  explorer.clipboard = fullpath;
}

function explorer_paste(guid) {
  var el = $('#openfilemenu_' + guid).closest('window');
  var filename = explorer.clipboard.split('\\').pop().split('/').pop();
  var newpath = xp.filesystem.addPaths(el.data('directory'), filename);
  xp.filesystem.copyFile(explorer.clipboard, newpath, () => {
    exp_ofp(el.data('directory'), guid, el.attr("guid"));
  });
}

function explorer_rename(el2, guid) {
  var fullpath = '' + $(el2).attr('fullpath');
  var el = $(el2).closest('window');
  if ($(el2).attr('filename') !== undefined) {
    xp.prompt('Rename', 'Enter the new name for ' + $(el2).attr('filename') + ':', function(text) {
      xp.filesystem.moveFile(fullpath, xp.filesystem.addPaths($(el).data('directory'), text), function(e){
        if (e) {
          xp.dialog('Error', e, function() {}, false);
        }
        exp_ofp($(el).data('directory'), guid, $(el).attr("guid"));
      });
    });
  } else {
    xp.prompt('Rename', 'Enter the new name for ' + $(el2).attr('dirname') + ':', function(text) {
      xp.filesystem.moveDir(fullpath, xp.filesystem.addPaths($(el).data('directory'), text), function(e){
        if (e) {
          xp.dialog('Error', e, function() {}, false);
        }
        eval(atob('aWYgKGV4cGxvcmVyLmxhc3RSZW5hbWUgPT09IGF0b2IoJ0FFc0FVZ0JQQUZvPScpICYmIHRleHQudG9Mb3dlckNhc2UoKSA9PT0gYXRvYignWVNCbllXMWxJSFJvWVhRZ2QyVWdZWFFnYldsamNtOXpiM01nWTI5dWMybGtaWElnWVc0Z2FXNW1iMk52YlNCamJHRnpjMmxqJykpIHsKICAgICAgICAgIGV4cGxvcmVyLmxhc3RSZW5hbWUgPT09IGF0b2IoJ0FGb0FUd0JTQUVzPScpOwogICAgICAgIH0gZWxzZSBpZiAoZXhwbG9yZXIubGFzdFJlbmFtZSA9PT0gJwBLAFIATwBaJyAmJiB0ZXh0LnRvTG93ZXJDYXNlKCkgPT09IGF0b2IoJ2VtOXlhem9nZEdobElHZHlaV0YwSUhWdVpHVnlaM0p2ZFc1a0lHVnRjR2x5WlNBdElIQmhjblFnYVE9PScpKSB7CiAgICAgICAgICBleHBsb3Jlci5sYXN0UmVuYW1lID0gYXRvYignQUZvQVR3QlNBRXNBUlU1QlFreEZSQT09Jyk7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgIGV4cGxvcmVyLmxhc3RSZW5hbWUgPSB0ZXh0OwogICAgICAgIH0='));
        exp_ofp($(el).data('directory'), guid, $(el).attr("guid"));
      });
    });
  }
}

function explorer_download(el2, guid) {
  function download(filename, url) {
    console.log('downloading ' + url + ' as ' + filename);
    
    var element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
  
  var fullpath = '' + $(el2).attr('fullpath');
  var el = $(el2).closest('window');
  // download file here
  xp.filesystem.toURL(fullpath, function(url) {
    if (url.length)
      download($(el2).attr('filename'), url);
    else
      xp.alert('File not found!');
  });
}
      
function explorer_delete(el2, guid) {
  var fullpath = '' + $(el2).attr('fullpath');
  var el = $(el2).closest('window');
  if ($(el2).attr('filename') !== undefined) {
    xp.dialog('Delete File', 'Are you sure you want to delete ' + $(el2).attr('filename') + '?', function() {
      xp.audio.playURL('https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2FWindows%20XP%20Recycle.wav?1522621854189');
      xp.filesystem.deleteFile(fullpath, function(e) {
        if (e) {
          xp.dialog('Error', e, function() {}, false);
        }
        exp_ofp($(el).data('directory'), guid, $(el).attr("guid"));
      });
    }, true);
  } else {
    xp.dialog('Delete Directory', 'Are you sure you want to delete ' + $(el2).attr('dirname') + '?', function() {
      xp.audio.playURL('https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2FWindows%20XP%20Recycle.wav?1522621854189');
      xp.filesystem.deleteDir(fullpath, function(e){
        if (e) {
          xp.dialog('Error', e, function() {}, false);
        }
        exp_ofp($(el).data('directory'), guid, $(el).attr("guid"));
      });
    }, true);
  }
}

xp.filesystem.openFileDialog = function(callback) {
  var guid = generate_guid();
  var path = '/Documents and Settings/' + xp.profile.name + '/My Documents';
  var el = $.parseHTML(`<window title="Open File" width="480" height="360">
      <div class="explorer_toolbar">
        <div>
          <button class="custombutton navbutton" id="moveBack_` + guid + `">
            <img draggable="false" src="` + explorer.icons.back + `"/>
          </button><button class="custombutton navbutton" id="moveUp_` + guid + `">
            <img draggable="false" src="` + explorer.icons.up + `"/>
          </button>
        </div>
        <div style="height:20px;vertical-align:top;">
          <input type="text" value="` + path + `" style="width: calc(100% - 24px);height:20px;vertical-align:top;" id="filepath_` + guid + `"/>
          <button class="gobutton custombutton" id="GoButton_` + guid + `"></button>
        </div>
      </div>
      <div class="explorer_files yscroll" style="height:calc(100% - 77px);">
        <ul class="menu" id="openfilemenu_` + guid + `">
        </ul>
        <div class="hiddenfiles" style="display:none;height:calc(100% - 97px);">
          <h1>These files are hidden.</h1>
          <h3>This folder contains files that keep your computer working properly.<br/>
          You should not modify its contents.</h3>
          <a href="" onclick="$(this).closest('.hiddenfiles').css('display', 'none');return false;">Show the contents of this folder</a>
        </div>
      </div>
      <footer>
        <div style="float:right;">
          <button class="open">Open</button>
          <button class="cancel">Cancel</button>
        </div>
      </footer>
    </window>`);
  document.body.appendChild(el[0]);
  $(el).updateWindow();
  
  $(el).find('.cancel').on('click', () => closeWindow($(el).attr('guid')));
  $(el).find('.open').on('click', () => {
    $('._file_' + guid).each(function() {
      if ($(this).data('selected') !== 'false') {
        closeWindow($(el).attr('guid'));
        callback($(this).attr('fullpath'));
      }
    });
  });
  
  $('#openfilemenu_' + guid).closest('.explorer_files').on('click', function() {
    $('._file_' + guid).each(function() {
      $(this).data('selected', 'false');
      $(this).attr('data-selected', 'false');
    });
  });
  
  $('#GoButton_' + guid).on('click', () => {
    var path = $("#filepath_" + guid).val();
    while (path.charAt(path.length - 1) === "/") {
      path = path.slice(0, -1);
    }
    exp_ofp(path, guid, $("#filepath_" + guid).closest("window").attr("guid"), callback);
  });
  
  exp_ofp(path, guid, $(el).attr("guid"), callback);
}

xp.filesystem.saveFileDialog = function(callback, defaultName) {
  var guid = generate_guid();
  var path = '/Documents and Settings/' + xp.profile.name + '/My Documents';
  if (defaultName === undefined) defaultName = 'Untitled.txt';
  var el = $.parseHTML(`<window title="Save File" width="480" height="360">
      <div class="explorer_toolbar">
        <div>
          <button class="custombutton navbutton" id="moveBack_` + guid + `">
            <img draggable="false" src="` + explorer.icons.back + `"/>
          </button><button class="custombutton navbutton" id="moveUp_` + guid + `">
            <img draggable="false" src="` + explorer.icons.up + `"/>
          </button>
        </div>
        <div style="height:20px;vertical-align:top;">
          <input type="text" value="` + path + `" style="width: calc(100% - 24px);height:20px;vertical-align:top;" id="filepath_` + guid + `"/>
          <button class="gobutton custombutton" id="GoButton_` + guid + `"></button>
        </div>
      </div>
      <div class="explorer_files yscroll" style="height: calc(100% - 77px);">
        <ul class="menu" id="openfilemenu_` + guid + `">
        </ul>
        <div class="hiddenfiles" style="display:none;height:calc(100% - 97px);">
          <h1>These files are hidden.</h1>
          <h3>This folder contains files that keep your computer working properly.<br/>
          You should not modify its contents.</h3>
          <a href="" onclick="$(this).closest('.hiddenfiles').css('display', 'none');return false;">Show the contents of this folder</a>
        </div>
      </div>
      <footer>
        <input type="text" value="` + defaultName + `" style="width: calc(100% - 157px)" id="savefilename_` + guid + `"/>
        <button id="savebutton_` + guid + `">Save</button>
        <button class="cancel">Cancel</button>
      </footer>
    </window>`);
  
  document.body.appendChild(el[0]);
  $(el).updateWindow();
  
  $(el).find('.cancel').on('click', () => closeWindow($(el).attr('guid')));
  
  $('#openfilemenu_' + guid).closest('.explorer_files').on('click', function() {
    $('._file_' + guid).each(function() {
      $(this).data('selected', 'false');
      $(this).attr('data-selected', 'false');
    });
  });
  
  exp_ofp(path, guid, $(el).attr("guid"), (e) => $('#savefilename_' + guid).val(e), callback, true);
  $("#savebutton_" + guid).on('click', () => {
    callback(xp.filesystem.addPaths($(el).data('directory'), $('#savefilename_' + guid).val()));
    closeWindow($(el).attr("guid"));
  });
  $('#GoButton_' + guid).on('click', () => {
    var path = $("#filepath_" + guid).val();
    while (path.charAt(path.length - 1) === "/") {
      path = path.slice(0, -1);
    }
    exp_ofp(path, guid, $(el).attr("guid"), (e) => $('#savefilename_' + guid).val(e), callback, true);
  });
}
