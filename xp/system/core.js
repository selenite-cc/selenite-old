var xp = {
  post: true,
  version: "2.0-beta",
  openFileHandler: (path) => {},
  applications: {
    apps: {},
    add: function(name, func) {
      xp.applications.apps[name] = func;
    },
    remove: function(name) {
      delete xp.applications.apps[name];
    }
  },
  themes: ['reborn', 'classic', 'luna', 'silver', 'vista'],
  theme: {
    name: 'luna',
    set: function(name) {
      xp.theme.name = name;
      if (xp.theme.name !== 'default') {
        $('#theme').attr('href', 'system/themes/' + xp.theme.name + '.css');
      } else {
        $('#theme').attr('href', '');
      }
      if (saveConfig) saveConfig();
    }
  },
  wallpaper: {
    href: "",
    set: function(name) {
      if (name === undefined) {
        xp.wallpaper.set(xp.wallpaper.href);
      } else if (name === "") {
        $("._ui_wallpaper_image").attr("src", "");
        xp.wallpaper.href = "";
      } else {
        $("._ui_wallpaper_image").attr("src", name);
        xp.wallpaper.href = name;
      }
      if (saveConfig) saveConfig();
    },
    setLocal: function(path) {
      xp.filesystem.toURL(path, (url) => {
        xp.wallpaper.set(url);
      });
    }
  },
  icons: {
    error: 'data:image/png;base64,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',
    warning: 'data:image/png;base64,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',
    info: 'data:image/png;base64,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'
  },
  dialog: function(title, text, callback, isyesno, type, nocallback) {
    if (type === undefined) type = 'info';
    var icon = undefined;
    if (type === 'info') icon = xp.icons.info;
    if (type === 'warning') icon = xp.icons.warning;
    if (type === 'error') icon = xp.icons.error;
    if (type === 'info') xp.audio.playURL('https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2FWindows%20XP%20Ding.wav?1522624603096');
    if (type === 'warning') xp.audio.playURL('https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2FWindows%20XP%20Error.wav?1522624607974');
    if (type === 'error') xp.audio.playURL('https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2FWindows%20XP%20Critical%20Stop.wav?1522624592867');
    var win = new Window({
      width: 340,
      height: 154,
      title: title,
      canResize: false,
      canMinimize: false
    });
    if (isyesno) {
      win.content(`<img draggable="false" style="position: absolute;left:11px;top:17px;" src="` + icon + `"/>
      <p style="position:absolute;left:54px;top:8px;width:calc(100% - 54px);word-wrap:break-word;height:calc(100% - 68px);overflow-y:auto;">` + text + `</p>
      <center style="position:absolute;bottom:17px;right:16.7px;">
        <button class="yes">Yes</button>
        <button class="no">No</button>
      </center>`);
    } else {
      win.content(`<img draggable="false" style="position: absolute;left:11px;top:17px;" src="` + icon + `"/>
      <p style="position:absolute;left:54px;top:8px;width:calc(100% - 54px);word-wrap:break-word;height:calc(100% - 68px);overflow-y:auto;">` + text + `</p>
      <center style="position:absolute;bottom:17px;right:16.7px;">
        <button class="ok">OK</button>
      </center>`);
    }
    if (isyesno) {
      win.el.find('.no').on('click', function() {
        win.close();
        if (nocallback !== undefined) nocallback();
      });
      win.el.find('.yes').on('click', function() {
        win.close();
        if (callback !== undefined) callback();
      }).focus();
    } else {
      win.el.find('.ok').on('click', function() {
        win.close();
        if (callback !== undefined) callback();
      }).focus();
    }
  },
  alert: function(msg, callback, nocallback) {
    xp.dialog('Alert', msg, callback, false, 'info', nocallback);
  },
  error: function(msg, callback, nocallback) {
    xp.dialog('Error', msg, callback, false, 'error', nocallback);
  },
  prompt: function(title, text, callback, defaulttext, nocallback) {
    xp.audio.playURL('https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2FWindows%20XP%20Ding.wav?1522624603096');
    var guid = generate_guid();
    var temp = document.createElement('div');
    if (defaulttext === undefined) defaulttext = "";
    var win = new Window({
      width: 340,
      height: 154,
      title: title,
      canResize: false,
      canMinimize: false
    });
    win.content(`<p style="position:relative;left:8px;width:calc(100% - 8px);">` + text + `</p>
      <input type="text" class="prompttext" style="width:calc(100% - 16px);position:relative;left:8px;"/>
      <center style="position:absolute;bottom:17px;right:16.7px;">
        <button class="ok">OK</button>
        <button class="cancel">Cancel</button>
      </center>`);
    win.el.find('.prompttext').val(defaulttext);
    win.el.find('.cancel').on('click', function() {
      win.close();
      if (nocallback !== undefined) nocallback();
    });
    win.el.find('.ok').on('click', function() {
      win.close();
      callback(win.el.find('.prompttext').val());
    });
  },
  chooser: function(title, text, options, callback, nocallback) {
    xp.audio.playURL('https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2FWindows%20XP%20Ding.wav?1522624603096');
    var guid = generate_guid();
    
    var optionstext = '';
    for (var i = 0; i < options.length; i ++) {
      optionstext += '<option>' + options[i] + '</option>';
    }
    
    var win = new Window({
      width: 340,
      height: 154,
      title: title,
      canResize: false,
      canMinimize: false
    });
    win.content(`<p style="position:relative;left:8px;width:calc(100% - 8px);">` + text + `</p>
      <select class="select" style="width:calc(100% - 16px);position:relative;left:8px;">` + optionstext + `</select>
      <center style="position:absolute;bottom:17px;right:16.7px;">
        <button class="ok">OK</button>
        <button class="cancel">Cancel</button>
      </center>`);
    win.el.find('.cancel').on('click', function() {
      win.close();
      if (nocallback !== undefined) nocallback();
    });
    win.el.find('.ok').on('click', function() {
      win.close();
      callback(win.el.find('.select').val());
    });
  }
};

$.fn.closeWindow = function() {
  closeWindow($(this).attr('guid'));
}

$.fn.setTitle = function(title) {
  var guid = $(this).attr('guid');
  if (title === '') title = ' ';
  title = title.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  $('window[guid=' + guid + ']').attr('title', title);
  $('window[guid=' + guid + ']').find('.windowTitle').html(title.replace(/ /g,'&nbsp;'));
  $('windowbutton[guid=' + guid + '] div').html(title);
};

function maximizeWindow(guid, force) {
  var el = $('window[guid=' + guid + ']');
  if (el.attr('maximized') === 'true' && force !== true) {
    el.attr('maximized', 'false');
    el.attr('width', el.attr('prevwidth'));
    el.attr('height', el.attr('prevheight'));
    el.css('left', el.attr('prevleft'));
    el.css('top', el.attr('prevtop'));
  } else {
    el.attr('maximized', 'true');
    if (!force) {
      el.attr('prevwidth', el.attr('width'));
      el.attr('prevheight', el.attr('height'));
      el.attr('prevleft', el.css('left'));
      el.attr('prevtop', el.css('top'));
    }
    el.attr('width', $(window).width());
    el.attr('height', $(window).height() - (el.find('.windowTitle').closest('table').height() + $('taskbar').height()) + parseInt(el.find('.windowBody').css("border-bottom-width")));
    el.css('left', -parseInt(el.find('.windowBody').css("border-left-width")));
    el.css('top', -parseInt(el.find('.windowBody').css("border-right-width")));
  }
  el.updateWindow();
  var event = new Event('resize');
  el[0].dispatchEvent(event);
}

// Generate GUID
function generate_guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

// Window control
function closeWindow(guid) {
  var el = $('[guid=' + guid + ']');
  $('window[guid=' + guid + ']')[0].dispatchEvent(new Event('close'));
  setTimeout(function() {
    el.remove();
  }, 50);
}

function minimizeWindow(guid) {
  var el = $('[guid=' + guid + ']');
  el.attr("minimized", "true");
  el.attr("inactive", "true");
  updateAllWindows();
}

function sortProperties(obj) {
  // convert object into array
	var sortable=[];
	for(var key in obj)
		if(obj.hasOwnProperty(key))
			sortable.push([key, obj[key]]); // each item is an array in format [key, value]
	
	// sort items by value
	sortable.sort(function(a, b) {
	  return a[1]-b[1]; // compare numbers
	});
	return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}

var createdIndexes = 0;

function updateIndexes(topGuid) {
  var newIndexes = {};
  var maxIndex = 0;
  $("window").each(function(index) {
    var el = $(this);
    var index = parseInt(el.attr("index"));
    var guid = el.attr("guid");
    newIndexes[guid] = index;
    if (index > maxIndex)
      maxIndex = index;
  });
  if (topGuid === undefined) {
    topGuid = Object.keys(newIndexes).find(key => newIndexes[key] === maxIndex);
  }
  newIndexes[topGuid] = maxIndex + 1;
  newIndexes = sortProperties(newIndexes);
  var index = 0;
  for (var i = 0, len = newIndexes.length; i < len; i++) {
    var guid = newIndexes[i][0];
    var inactive = i === len - 1 ? "false" : "true"
    index ++;
    $("window[guid=" + guid + "]").attr("index", index);
    $("window[guid=" + guid + "]").attr("inactive", inactive);
  }
  createdIndexes = index;
}

$.fn.updateWindow = function() {
  updateWindow(this, true);
  updateIndexes();
  updateAllWindows();
}

function hideMenu(name, guid) {
  $("#" + name.replace(/ /g,"_") + "_menu_" + guid).css("display", "none");
  $("#" + name.replace(/ /g,"_") + "_menubutton_" + guid).removeClass('_ui_menu_item_active');
}

$.fn.addMenu = function(name, items) {
  var guid = generate_guid();
  var el = `<div class="_ui_menu">
    <span class="_ui_menu_item" id="` + name.replace(/ /g,"_") + `_menubutton_` + guid + `">
      ` + name + `
      </span><div id="` + name.replace(/ /g,"_") + `_menu_` + guid + `" style="display:none;position:absolute;z-index:32767;">
<table cellpadding="0" cellspacing="0" style="border: 1px solid #979797;"><tbody><tr><td>
<table cellpadding="0" cellspacing="0" style="border: 2px solid #f5f5f5;"><tbody><tr><td>
<table cellpadding="4" cellspacing="0" border="0" width="200" bgcolor="#f1f1f1" style="font-size: 10;"><tbody>`;
  for (var i = 0; i < items.length; i ++) {
    el += '<tr>';
    if (i === 0) {
      el += '<td rowspan="100" width="15" style="border-right: 1px solid #979797;" nowrap=""><img width="15" height="1"></td>';
    }
    el += '<td class="contextMenuItem" onclick="rcCloseContext();" nowrap id="' + items[i][0].replace(/ /g,"_") + '_' + guid + '">' + items[i][0] + '</td></tr>';
  }
  el += '</div></span></div>';
  this.find(".menuContainer").append(el);
  
  function createMenuCallback(name, guid, callback) {
    return function() {
      hideMenu(name, guid);
      callback();
    };
  }
  
  for (var i = 0; i < items.length; i ++) {
    $("#" + items[i][0].replace(/ /g,"_") + "_" + guid).on('click', createMenuCallback(name, guid, items[i][1]));
  }
  
  $("#" + name.replace(/ /g,"_") + "_menubutton_" + guid).on('click', function(e) {
    $("#" + name.replace(/ /g,"_") + "_menu_" + guid).css("display", "inline");
    $(this).addClass('_ui_menu_item_active');
  });
  
  this.find(".windowBody").on('click', function(e) {
    var el = $(e.target);
    var canClose = !(el.is("span._ui_menu_item#" + name.replace(/ /g,"_") + "_menubutton_" + guid) || el.is("li.menuitem"));
    if (canClose) {
      hideMenu(name, guid);
    }
  });
}

jQuery.fn.tagName = function() {
  return this.prop("tagName");
};

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function updateWindow(el, doUpdate) {
  if (el.attr("guid") === undefined) {
    var html = el.html();
    var guid = generate_guid();
    el.attr("guid", guid);
    var width = el.attr("width");
    var height = el.attr("height");
    var tstyle2 = "";
    if (width !== undefined) tstyle2 += "width: " + width + "; ";
    if (height !== undefined) tstyle2 += "height: " + height + "; ";
    var newHtml = "";
    var inactive = el.attr("inactive") === "true" ? "inactive" : "";
    var index = el.attr("index");
    
    var title = (el.attr("title") === '' || el.attr("title") === undefined) ? '&nbsp;' : el.attr("title");
    
    /*
    var posx = (Math.random() * ($(window).width() - (parseInt(width) - 40)) + 20).toFixed();
    var posy = (Math.random() * ($(window).height() - (parseInt(height) - 40)) + 20).toFixed();

    el.css({'left': posx + 'px', 'top': posy + 'px'});
    */
    
    if (index === undefined) {
      index = createdIndexes ++;
      el.attr("index", index);
    }
    newHtml = `
<table cellspacing="0" class="titlebar"><tbody>
  <tr>
    <td class="titleBar_left"></td>
    <td class="titleBar_middle">
      <div class="windowTitleBg ` + inactive + `">
        <table cellspacing="0" style="width: 100%; height: 100%;">
          <tr style="width: 100%; height: 100%;">
            <td style="max-width: 100%; height: 100%; padding: 0;">
              <div class="windowTitle ` + inactive + ` ">` + title + `</div>
            </td>
            <td style="height: 100%; padding: 0;">
              <button tabindex="-1" class="close" title="Close" onclick="closeWindow('` + guid + `')"></button>
              <button tabindex="-1" class="maximize" title="Maximize" onclick="maximizeWindow('` + guid + `')"></button>
              <button tabindex="-1" class="minimize" title="Minimize" onclick="minimizeWindow('` + guid + `')"></button>
            </td>
        </table>
      </div>
    </td>
    <td class="titleBar_right"></td>
  </tr>
</tbody></table>
<div style="` + tstyle2 + `" class="windowBody" title=""><div class="menuContainer"></div>` + html + `</div>
<div class="resize resize-se"></div><div class="resize resize-sw"></div>
<div class="resize resize-ne"></div><div class="resize resize-nw"></div>
<div class="resize resize-n"></div><div class="resize resize-s"></div>
<div class="resize resize-e"></div></div><div class="resize resize-w"></div>
`;
    el.html(newHtml);
    var posx = getRandomArbitrary(0, $(window).width() - parseInt(width) - parseInt(el.find('.windowBody').css('border-left-width')) - parseInt(el.find('.windowBody').css('border-right-width')));
    var posy = getRandomArbitrary(0, $(window).height() - parseInt(height) - el.find('.titlebar').height() - parseInt(el.find('.windowBody').css('border-top-width')) - parseInt(el.find('.windowBody').css('border-bottom-width')));
    el.css({'left': posx + 'px', 'top': posy + 'px'});
    console.log({'left': posx + 'px', 'top': posy + 'px'});
    el.find('table.titlebar').css('width', (el.find('.windowBody').width() + parseInt(el.find('.windowBody').css('border-left-width')) + parseInt(el.find('.windowBody').css('border-right-width'))) + 'px');
    if (el.attr('minimized') === undefined)
      el.attr('minimized', "false");
    el.css('zIndex', index);
    el.ui_draggable();
    el.children('.resize-se')[0].addEventListener('mousedown', function(e) {
      initDrag(e, el[0], 'se');
    }, false);
    el.children('.resize-sw')[0].addEventListener('mousedown', function(e) {
      initDrag(e, el[0], 'sw');
    }, false);
    el.children('.resize-ne')[0].addEventListener('mousedown', function(e) {
      initDrag(e, el[0], 'ne');
    }, false);
    el.children('.resize-nw')[0].addEventListener('mousedown', function(e) {
      initDrag(e, el[0], 'nw');
    }, false);
    el.children('.resize-n')[0].addEventListener('mousedown', function(e) {
      initDrag(e, el[0], 'n');
    }, false);
    el.children('.resize-s')[0].addEventListener('mousedown', function(e) {
      initDrag(e, el[0], 's');
    }, false);
    el.children('.resize-e')[0].addEventListener('mousedown', function(e) {
      initDrag(e, el[0], 'e');
    }, false);
    el.children('.resize-w')[0].addEventListener('mousedown', function(e) {
      initDrag(e, el[0], 'w');
    }, false);
    $("taskbar").append('<windowbutton guid="' + guid + '" inactive="' + el.attr("inactive") + '"><div>' + title + '</div></windowbutton>');
    el.on('click', function() {
      rcCloseContext();
      closeStartMenu();
    });
    el.on('mousedown', function(e) {
      var t = e.target.nodeName;
      fMouseDown(this);
      e.stopPropagation();
      return true;
    });
    el.on('contextmenu', function(e) {
      fMouseDown(this);
      windowContextMenu(e, guid);
      return false;
    });
    if (el.attr('maximized') === 'true') {
      el.find('button.maximize').attr('class', 'restore').attr('title', 'Restore');
    }
    updateIndexes(guid);
  } else {
    var isActive = el.attr("inactive") === 'false' ? true : false;
    var guid = el.attr("guid");
    var width = el.attr("width");
    var height = el.attr("height");
    var tstyle2 = "";
    if (width !== undefined) tstyle2 += "width: " + width + "; ";
    if (height !== undefined) tstyle2 += "height: " + height + "; ";
    var newHtml = "";
    var inactive = el.attr("inactive") === "true" ? "inactive" : "";
    var index = el.attr("index");
    if (index === undefined) {
      index = createdIndexes ++;
      el.attr("index", index);
    }
    
    el.find('table.titlebar').css('width', (el.find('.windowBody').width() + parseInt(el.find('.windowBody').css("border-left-width")) + parseInt(el.find('.windowBody').css("border-right-width"))) + 'px');
    
    var title = (el.attr("title") === '' || el.attr("title") === undefined) ? '&nbsp;' : el.attr("title");
    
    el.children("div.windowBody").attr("style", tstyle2);
    if (doUpdate) {
      el.children("div.windowBody").html(html);
      el.children("div.windowTitle").html(title);
    }
    el.find("div.windowTitleBg").attr("class", "windowTitleBg " + inactive);
    el.find("div.windowTitle").attr("class", "windowTitle " + inactive);
    el.css("z-index", index);
    
    $("windowbutton[guid=" + guid + "] div").html(title);
    $("windowbutton[guid=" + guid + "]").attr("inactive", el.attr("inactive"));
    $("windowbutton[guid=" + guid + "]").attr("onclick", "handleTaskbarButton('" + guid + "')");
    
    if (el.attr('maximized') === 'true') {
      el.find('button.maximize').attr('class', 'restore').attr('title', 'Restore');
    } else {
      el.find('button.restore').attr('class', 'maximize').attr('title', 'Maximize');
    }
  }
}

var startX, startY, startWidth, startHeight, resizeEl, dragType;

function initDrag(e, el, type) {
  startX = e.clientX;
  startY = e.clientY;
  resizeEl = el;
  dragType = type;
  startWidth = parseInt(document.defaultView.getComputedStyle(resizeEl).width, 10);
  startHeight = parseInt(document.defaultView.getComputedStyle(resizeEl).height, 10);
  document.documentElement.addEventListener('mousemove', doDrag, false);
  document.documentElement.addEventListener('mouseup', stopDrag, false);
}

function doDrag(e) {
  e.preventDefault();
  e.stopPropagation();
  var el = $(resizeEl);
  if (dragType === 'w' || dragType === 'sw') {
    var width = startWidth - e.clientX + startX;
    var height = startHeight + e.clientY - startY;
  } else if (dragType === 'nw') {
    var width = startWidth - e.clientX + startX;
    var height = startHeight - e.clientY + startY;
  } else if (dragType === 'n' || dragType === 'ne') {
    var width = startWidth + e.clientX - startX;
    var height = startHeight - e.clientY + startY;
  } else {
    var width = startWidth + e.clientX - startX;
    var height = startHeight + e.clientY - startY;
  }
  if (width < 125)
    width = 125;
  if (height < 125)
    height = 125;
  width -= parseInt(el.find('.windowBody').css("border-left-width")) + parseInt(el.find('.windowBody').css("border-right-width"));
  height -= 34;
  if (dragType === 'se') {
    el.attr("width", width);
    el.attr("height", height);
  } else if (dragType === 'e') {
    el.attr("width", width);
  } else if (dragType === 's') {
    el.attr("height", height);
  } else if (dragType === 'w') {
    el.css("left", parseInt(el.css("left")) + parseInt(el.attr("width")) - width);
    el.attr("width", width);
  } else if (dragType === 'sw') {
    el.css("left", parseInt(el.css("left")) + parseInt(el.attr("width")) - width);
    el.attr("width", width);
    el.attr("height", height);
  } else if (dragType === 'nw') {
    el.css("left", parseInt(el.css("left")) + parseInt(el.attr("width")) - width);
    el.attr("width", width);
    el.css("top", parseInt(el.css("top")) + parseInt(el.attr("height")) - height);
    el.attr("height", height);
  } else if (dragType === 'n') {
    el.css("top", parseInt(el.css("top")) + parseInt(el.attr("height")) - height);
    el.attr("height", height);
  } else if (dragType === 'ne') {
    el.attr("width", width);
    el.css("top", parseInt(el.css("top")) + parseInt(el.attr("height")) - height);
    el.attr("height", height);
  } else {
    el.attr("width", width);
    el.attr("height", height);
  }
  updateWindow($(el));
  el.find('table.titlebar').css('width', (el.find('.windowBody').width() + parseInt(el.find('.windowBody').css("border-left-width")) + parseInt(el.find('.windowBody').css("border-right-width"))) + 'px');
}

function stopDrag(e) {
  document.documentElement.removeEventListener('mousemove', doDrag, false);
  document.documentElement.removeEventListener('mouseup', stopDrag, false);
  resizeEl.dispatchEvent(new Event('resize'));
}

$.fn.ui_draggable = function() {
    var $this = this,
    ns = 'draggable_'+(Math.random()+'').replace('.',''),
    mm = 'mousemove.'+ns,
    mu = 'mouseup.'+ns,
    $w = $(window),
    isFixed = ($this.css('position') === 'fixed'),
    adjX = 0, adjY = 0;

    $this.mousedown(function(ev) {
        moveWindowToTop($this.attr("guid"));
        var pos = $this.offset();
        if (isFixed) {
            adjX = $w.scrollLeft(); adjY = $w.scrollTop();
        }
        var ox = (ev.pageX - pos.left), oy = (ev.pageY - pos.top);
        if (oy > $this.find('.windowTitleBg').height() || ($this.attr('maximized') || 'false').toLowerCase() !== 'false') {
          return;
        }
        $this.data(ns,{ x : ox, y: oy });
        $w.on(mm, function(ev){
            ev.preventDefault();
            ev.stopPropagation();
            if (isFixed) {
                adjX = $w.scrollLeft(); adjY = $w.scrollTop();
            }
            var offset = $this.data(ns);
            $this.css({left: ev.pageX - adjX - offset.x, top: ev.pageY - adjY - offset.y});
        });
        $w.on(mu, function(){
            $w.off(mm + ' ' + mu).removeData(ns);
        });
    });

    return this;
};

function moveWindowToTop(guid) {
  var el = $('window[guid=' + guid + ']');
  el.attr("minimized", "false");
  updateIndexes(guid);
  updateAllWindows();
}

function updateAllWindows() {
  $("window").each(function(index) {
    updateWindow($(this));
  });
}

$(function() {
  window.addEventListener('resize', (e) => {
    console.log(e);
    $('window[maximized=true]').each(function() {
      maximizeWindow($(this).attr('guid'), true);
    });
  }, true);
});
