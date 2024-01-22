var vContextMenu = Array();
var isContextMenu = false;
var CurX;
var CurY;
var tContextMenu;

function fMouseDown(event) {
  try {
	  if(window.event) event = window.event;
	  CurX = event.clientX;
	  CurY = event.clientY;
    if (document.getElementById('lContextMenu').style.visibility === 'hidden')
      tContextMenu = event.target;
  } catch(e) {}
}

function rcContextMenu() {
  try {
    if (vContextMenu.length != 0) {

    drawContextMenu();

    var targX = CurX; //0; //event.clientX;
    var targY = CurY; //0; //event.clientY;

    //alert

    var testW = document.getElementById('lContextMenu').offsetWidth;
    var testH = document.getElementById('lContextMenu').offsetHeight;

    var testX = targX + document.getElementById('lContextMenu').offsetWidth;
    var testY = targY + document.getElementById('lContextMenu').offsetHeight;

    var sW = document.body.clientWidth;//document.body.clientWidth;
    var sH = document.body.clientHeight;//document.body.clientHeight;

    if (testX >= sW) { targX = targX - testW; }
    if (testY >= sH) { targY = targY - testH; }

    document.getElementById('lContextMenu').style.left = targX;
    document.getElementById('lContextMenu').style.top = targY;
    document.getElementById('lContextMenu').style.visibility = 'visible';

    }
  } catch (e) {}
}

function rcCloseContext() {
  try {
    document.getElementById('lContextMenu').style.left = 0;
    document.getElementById('lContextMenu').style.top = 0;
    document.getElementById('lContextMenu').style.visibility = 'hidden';
  } catch (e) {}
}

function drawContextMenu() {
  try {
    var outMsg = '<table cellpadding="0" cellspacing="0" style="border: 1px solid #979797;"><tr><td><table cellpadding="0" cellspacing="0" style="border: 2px solid #f5f5f5;"><tr><td><table cellpadding="4" cellspacing="0" border="0" width="200" bgcolor="#f1f1f1" style="font-size: 10;"><tr><td rowspan="100" width="15" style="border-right: 1px solid #979797;" nowrap><img width="15" height="1"></td>';

    var len = vContextMenu.length - 1;

    var inMsg = vContextMenu[0];
    var inCmd = vContextMenu[1];
    if (typeof inCmd !== 'string') {
      outMsg = outMsg + '<td class="contextMenuItem" onClick="rcCloseContext();" commandindex="1" nowrap>' + inMsg + '</td></tr>';
    } else {
      outMsg = outMsg + '<td class="contextMenuItem" onClick="rcCloseContext();' + inCmd + ';" nowrap>' + inMsg + '</td></tr>';
    }

    for (var i = 2; i <= len; i ++) {
      inMsg = vContextMenu[i];
      inCmd = vContextMenu[i+1];

      if (inMsg != '-HR-') { 
        if (typeof inCmd !== 'string') {
          var outMsg = outMsg + '<td class="contextMenuItem" commandindex="' + (i + 1) + '" nowrap>' + inMsg + '</td></tr>';
        } else {
          var outMsg = outMsg + '<td class="contextMenuItem" onClick="rcCloseContext();' + inCmd + ';" nowrap>' + inMsg + '</td></tr>';
        }
        i ++;
      } else {
        i ++;
        inMsg = vContextMenu[i];
        inCmd = vContextMenu[i+1];
        if (typeof inCmd !== 'string') {
          outMsg = outMsg + '<td class="contextMenuItem hr" commandindex="' + (i + 1) + '" nowrap>' + inMsg + '</td></tr>';
        } else {
          outMsg = outMsg + '<td class="contextMenuItem hr" onClick="rcCloseContext();' + inCmd + ';" nowrap>' + inMsg + '</td></tr>';
        }
        i ++;
      }
    }

    outMsg = outMsg + '</table></td></tr></table></td></tr></table>';

    document.getElementById('lContextMenu').innerHTML = outMsg;
    
    // JQuery magic
    $('#lContextMenu').find('td[commandindex]').each(function() {
      $(this).on('click', function() {
        rcCloseContext();
        vContextMenu[parseInt($(this).attr('commandindex'))]();
      });
    });
  } catch(e) {}
}

function desktopContextMenu(e) {
  var el = $(e.target);
  if (el.closest('windowbutton').length > 0) {
    var guid = el.closest('windowbutton').attr('guid');
    vContextMenu = Array();
    if ($('window[guid=' + guid + ']').attr('maximized') === 'true') {
      vContextMenu.push('Restore');
      vContextMenu.push('maximizeWindow(\'' + guid + '\')');
    } else if ($('window[guid=' + guid + ']').find('.maximize').length > 0 || $('window[guid=' + guid + ']').find('.restore').length > 0) {
      vContextMenu.push('Maximize');
      vContextMenu.push('maximizeWindow(\'' + guid + '\')');
    }
    if ($('window[guid=' + guid + ']').attr('minimized') === 'true') {
      vContextMenu.push('Restore');
      vContextMenu.push('moveWindowToTop(\'' + guid + '\')');
    } else if ($('window[guid=' + guid + ']').find('.minimize').length > 0) {
      vContextMenu.push('Minimize');
      vContextMenu.push('minimizeWindow(\'' + guid + '\')');
    }
    if ($('window[guid=' + guid + ']').find('.close').length > 0) {
      vContextMenu.push('Close');
      vContextMenu.push('closeWindow(\'' + guid + '\')');
    }
	  rcContextMenu();
  } else if (el.closest('.ui_icon').length > 0) {
    el = el.closest('.ui_icon');
    vContextMenu = Array('<b>Open</b>', () => eval(el.data('exe')), 'Explore', () => openLocation(el.data('target')), '-HR-', 'Create Shortcut', '', 'Delete',() => el.remove(), 'Rename', () => xp.prompt('Rename', 'Enter the new name:', (t) => {el.find('span').html(t)}), '-HR-');
    rcContextMenu();
  }
}

function getSelectionText() {
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
      (activeElTagName == "textarea") || (activeElTagName == "input" &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
      (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}

function windowContextMenu(e, guid) {
  var el = $('window[guid=' + guid + ']');
  var t = e.target.nodeName;
  console.log(t);
  vContextMenu = Array();
  var type = ($(e.target).attr('type') || '').toLowerCase();
  if (t === 'TEXTAREA' || (t === 'INPUT' && (type === 'text' || type === 'number'))) {
    vContextMenu.push('Copy');
    vContextMenu.push('document.execCommand(\'copy\')');
    vContextMenu.push('Paste');
    vContextMenu.push('document.execCommand(\'paste\')');
    vContextMenu.push('-HR-');
  }
  if (el.attr('maximized') === 'true') {
    vContextMenu.push('Restore');
    vContextMenu.push('maximizeWindow(\'' + guid + '\')');
  } else if (el.find('.maximize').length > 0) {
    vContextMenu.push('Maximize');
    vContextMenu.push('maximizeWindow(\'' + guid + '\')');
  }
  if (el.attr('minimized') === 'true') {
    vContextMenu.push('Restore');
    vContextMenu.push('moveWindowToTop(\'' + guid + '\')');
  } else if (el.find('.minimize').length > 0) {
    vContextMenu.push('Minimize');
    vContextMenu.push('minimizeWindow(\'' + guid + '\')');
  }
  if (el.find('.close').length > 0) {
    vContextMenu.push('Close');
    vContextMenu.push('closeWindow(\'' + guid + '\')');
  }
	rcContextMenu();
}

function startContextMenu(e) {
  var el = $(e.target);
  if (!(el.is('li.startmenuitem') || el.is('li.startmenuitem>img') || el.is('li.startmenuitem>div') || el.is('li.startmenuitem>div>div') || el.is('li.startmenuitem>div>div>b'))) return;
  if (!el.is('li.startmenuitem'))
    el = el.closest('li');
  vContextMenu = Array('<b>Open</b>', el.attr('onclick'), 'Explore', el.attr('onclick'), '-HR-', 'Create Shortcut', '', 'Delete',() => el.remove(), 'Rename', () => xp.prompt('Rename', 'Enter the new name:', (t) => {el.find('div>div>b').html(t)}), '-HR-');
  rcContextMenu();
}