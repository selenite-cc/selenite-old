'use strict';
xp.startmenu = {
  icons: {
    programs: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAADLklEQVRYw+2XTYscVRSGn3PqVvVH7Nag8QPGaERBIQguxJXgT3BA3LjLH3CjS/+AK1F0I2QnrkQUwYULs3GhuHETQwgYBiWBOOhMJd1dXXXPcVHV3WWnZ3Q+erLJoYvqrnvrvO897znn3ob7do9NePfqhVM6/fSRQVfHpfvEHDcwBwdUIRqIQ0gE6g9BweF2dCijIwJmEN2ZFhGATidQTCtAodsDTVXcMt+58QkfvfwekAcm+QdPbQz1/NnT3BglYg5BYGJCFZ0HOsLfkwgOvVRxwNwQFGAwLp0iQlAhxsg0Qj9L6AbYmUQe7KVomqDjnOdHV7jGGX6qhm+Xw8evsHvzs0CxM7i8ZVz+fVwvO4F67QIOGgSROlzqThmb2Lk1dwWtp4PBFF578VGeefgUF7/fYvOVJ8mlz/SXb7gYPuT97uv8EDc5+1D26tYu3wbyO5DfgmkBMdbOGnwMbCEW0ZvvKjXZ5jnSEtWcS9czLvUz2M758vqvtb8icLrzFrv6GAxvMR6Pe0AaNp49x9cXuvw1MqoZwmzJvuQcwL1+5i1mi0FcwConmhFCgpnXUzVlJBlP9Eve+WrE1e9qumHY6/PS0+dONPPPb9zkx7wCIEyLojVUrhE2qasB8OkCR6mWQdPm8v9w6M2Vskicu6t8oWPVXE2yNhbUbcnpdIW27OGcfebLfMX16g0I9S9fkA1isQV+uF62d4TiSmnFbY4XknkEpMW2TciPpeG2/WhcRF3/LYE0rL1V4HJsXX8WEWlhBolxKWwztvY/c+EgZkBSE7AZAY8H1PaoUZhFwJoyvFeWDVNAVM1O/gxQR12Aju4twToJzCUQDR5XlJ2vl4C1k9Cq1pC2km99RJJWGarMm4K3upefgAR3dUJvbSrrItAqwwYiZOqtFuz79AI/NgKdxBERHAiiuk/zKRtJwnwnO3onVAqUkHWTcoyGa79t88Ibn1NVRnRb4uv1Eewoe4IsDrCqQhoSigrw0oEQkjL/eCe/82asysxa2qw8cK5GODAznfxxuxr9uQ2UAgyATeA5IDug2ClwprkfxEbAz8AXM/aDBvwwlh7yvRGQ3/9z+g/E/lvy1FW2PwAAAABJRU5ErkJggg==',
    documents: 'data:image/png;base64,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',
    recentdocuments: 'data:image/png;base64,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',
    controlpanel: 'data:image/png;base64,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',
    search: 'data:image/png;base64,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',
    help: 'data:image/png;base64,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',
    run: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAD9klEQVRYw+2WTUwcZRjH/8+7M7uuiwtZ2OWrpRQUESQQY9JLQ4mJxgPG9qa1VHrwYg+W2Ium9uQBQyKeTIwxTTSaGiWaqAdjrZDYVhoq0C7hUz6EaWFnYReW/Zhh5n08NBQKLB+Fm/wvk0xm8jzv7/2/z/sH9rWv/7toW19VNxUS8j8BqASwFTARIB+pIJOam5vtCYR0/Svnwu8Xle39dqCNDzx5pOSZg1AUB/x+765WfW18Ec6b1xpETLYpAzPJSHwxBisZg5WIwUgtwIzHMDnw94m3mj5oR3VrDdyZR/B0OUYlABMY0sxtFfrsZBkuXA7iw9eexYXLQYSWziCgXgIAmG4vHmeuVDqv/JA1PDQAljZYSjDbkNJGwOOsA9BOMtnkq3oOOdUFO17px32L8FUVP3iW4w/4AOiXfsJjE9+NELFHefONk5v6IDuQ3/DrWS9KCrQ9MV04aqLy0wUoS1pICjUiNjdf63FmppIC9565/turIXDkdoKIQkRSUwZmUpHFaARGLAwjEYEVnw/39fz5YtN7H40Tp84cf+kwAMAwTXR2dT9S0dLiIhQW5AMAvvhZg2qM6gzSAJpW/vrt+8zhoUFiaUHaFkzDyDroy8gCgGx/3itvv3wIANDZ1Y3rN3beQMPrr6Kyug5RfRDhqAlNT8Jpz2lSqOMkEVIaT50SO8Hf3NyKlpYWNDY2AgD8fn/a4n297aisrkNyMbSCP9obZ6YZYp6ULKNpPXAfvw8AEE8kHry3LAvBYBAA4PWmnwdSrgwqM7Wwgj81FiZBdyFoxulwxZWeyTjHZ6eQmLuHPF/GSFXN80+txX+r5w6u3+hGc3Mrvvz6G9TX12+6cgCY1SdXph/bG+HX59kwlCttn2MuHIK0l5Drzyncyv1up4ra2tot9z40PYbi0pqH3b8GP6ZcS8r5c+doY/z33S+ZUFpchNLiIvT1tqOizI/wdD/C0/1bNuHJyEJUH1qHnwXNOOGKJ9EhN7wLVuP3BcrgC5Tt4uRzWvwAWLk9pnNooh93+26eOH32/I9r8Uf1wb0ZPhvgB8Aiog1ysLcLnpy8i8v43z1duKd3/gp+oS27H+iQAKAcO3r0oaPIwvXCIZ8HAxPxPSm+kLCh6Umo1uy/TMo4VuEHgHUeINvobXj/6mGC6QWzCjDtrgViJTU8DeEYIeH4RzLNYVJZStuAO/HLO2ThGKRdzgTvtlNTeg9aEDQnHY6gIIwm3CK2jH9tA4SKCpWSzilms4MUcQe2cO6agJCSQAlyOHWHod5DkZHCqjxH6zJiRYUKO8uVmRSKtFxi16FTxJkcLjlvPmGiLGaio8Nexp8ulNKOAutONmNV4X3ta1n/AZedFNtvtQ31AAAAAElFTkSuQmCC',
    shutdown: 'data:image/png;base64,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',
    pictures: 'data:image/png;base64,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',
    music: 'data:image/png;base64,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',
    computer: 'data:image/png;base64,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'
  },
  appIcons: {},
  menuItems: {},
  add: function(appName, menuItemTxt, appIcon) {
    xp.startmenu.menuItems[appName] = menuItemTxt;
    xp.startmenu.appIcons[appName] = appIcon || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAjElEQVRYw+2XMQ7EIAwEh4iHcS/DTzMv4woUiShKESkxKXYbLAo8trcwsFjJzPqq5GZGBiilhCd3d4ABMCB6cPXj3N6pLuGegN9lvGtbbcL8xqOzp67iE8BozWNDuG/C/SJCcycOI6i1hgC01r5jQgEIQAACEIAABCCAPK9J86YSChC5D57+hkBHWqg/W2onU5GesFMAAAAASUVORK5CYII=';
    xp.startmenu.update();
  },
  remove: function(appName) {
    delete xp.startmenu.menuItems[appName];
    xp.startmenu.update();
  },
  update: function() {
    $("#_ui_programsmenu").find('ul').html('');
    for (var key in xp.startmenu.menuItems) {
      $("#_ui_programsmenu").find('ul').append('<li class="menuitem" onclick="openApp(\'' + key + '\')"><img class="menuicon" src="' + xp.startmenu.appIcons[key] + '"/><span class="menuitemtext">' + xp.startmenu.menuItems[key] + '</span></li>');
    }
  }
};

xp.controlpanel = {
  items: {},
  add: function(name, func) {
    xp.controlpanel.items[name] = func;
  },
  remove: function(name) {
    delete xp.controlpanel.items[name];
  }
}

xp.profile = {
  image: 'https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fusericon.png?1520129931353',
  name: 'User'
};

jQuery.fn.extend({
    getPath: function () {
        var path, node = this;
        while (node.length) {
            var realNode = node[0], name = realNode.localName;
            if (!name) break;
            name = name.toLowerCase();

            var parent = node.parent();

            var sameTagSiblings = parent.children(name);
            if (sameTagSiblings.length > 1) { 
                var allSiblings = parent.children();
                var index = allSiblings.index(realNode) + 1;
                if (index > 1) {
                    name += ':nth-child(' + index + ')';
                }
            }

            path = name + (path ? '>' + path : '');
            node = parent;
        }

        return path;
    }
});

document.onclick = function (e) {
  e = e ||  window.event;
  var element = e.target || e.srcElement;

  if (element.tagName == 'A') {
    if ($(element).attr('download') !== undefined) return true; // allow browser to download file
    if ($(element).attr('href') !== '' && element.href !== undefined) {
      var temp = document.createElement('div');
      temp.innerHTML = `<window title="` + element.href + `" width="640" height="480">
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
            <iframe seamless="seamless" width="100%" height="100%" id="frame" src="` + element.href + `"></iframe>
          </div>
        </window>`;
      var el = temp.firstChild;
      document.body.appendChild(el);
      $(el).updateWindow();
    }
    return false; // prevent default action and stop event propagation
  }
};

$(function() {
  xp.applications.add('winver', function() {
    var guid = generate_guid();
    var temp = document.createElement('div');
    temp.innerHTML = `<window title="About RebornXP" width="418" height="400">
    <center>
    <img src="boot/assets/logo.png" width="100" height="100">
    <br>
      <h2>Reborn XP</h2>
      <p> Version ` + xp.version + `</p>
      
      <p> Registered to: ` + xp.profile.name + `</p>

      <p>Powered by <a href="https://jquery.com/" target="_blank">JQuery</a></p>
      
      <p> © 2023 - Shoaib Khan<br>
      RebornXP is <a href="https://github.com/shoaib-jamal/rebornxp" target="_blank">Open Source</a> under the GPL v3.0 License</p>
      <br>
      <a href="https://www.buymeacoffee.com/shoaibify" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 50px !important;width: 200px !important;" ></a>
      <br><br>
      <a href="https://opensource.org/license/gpl-3-0/"><img src="https://img.shields.io/badge/License-GPL-yellow.svg"></a>
      <a href="https://github.com/shoaib-jamal/rebornxp/stargazers"><img src="https://img.shields.io/github/stars/shoaib-jamal/rebornxp?label=GitHub%20Stars&style=social"></a>
      <a href="https://github.com/shoaib-jamal/rebornxp/network/members"><img src="https://img.shields.io/github/forks/shoaib-jamal/rebornxp?style=social"></a>
<br>      
      </center>
    <center style="position:absolute;bottom:4.5px;right:4.5px;">
      <button id="OKButton_` + guid + `">OK</button>
    </center>
  </window>`;
    var el = temp.firstChild;
    document.body.appendChild(el);
    $(el).updateWindow();
    $("#OKButton_" + guid).attr("onclick", "closeWindow('" + $(el).attr("guid") + "')");
  });
});

window.onerror = function (msg, url, lineNo, columnNo, error) {
  xp.dialog('Error', `An error has occurred!<br/>
&nbsp;&nbsp` + msg + `<br/>
&nbsp;&nbsp;&nbsp;&nbsp;in ` + url + ` line ` + lineNo + ` column ` + columnNo, () => {}, false, 'error');
};

function openApp(name, args) {
  closeStartMenu();
  if (xp.applications.apps[name] !== undefined) {
    xp.applications.apps[name](args);
    return true;
  } else {
    return false;
  }
}

// Start menu control
function openStartMenu() {
  $("taskbar div.startmenu").css("display", "inline");
  $("taskbar button.start").attr("isopen", "true");
  xp.audio.playURL('https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2FWindows%20XP%20Start.wav?1522621401979');
}

function closeStartMenu() {
  $("taskbar div.startmenu").css("display", "none");
  $("taskbar button.start").attr("isopen", "false");
  $('#_ui_programsmenu').css('display', 'none');
  $('#_ui_programsmenu').data('isopen', false);
}

function toggleStartMenu() {
  var el = $("taskbar button.start");
  if (el.attr("isopen") === "true")
    closeStartMenu();
  else
    openStartMenu();
}

function handleTaskbarButton(guid) {
  var el = $('window[guid=' + guid + ']');
  if (el.attr("inactive") === "false")
    minimizeWindow(guid);
  else
    moveWindowToTop(guid);
}

function updateTaskbar() {
  var el = $("taskbar");
}

var width = 0;
var windowsEl;

function getClockTime() {
  var date = new Date().getTime();
  var d = new Date(date);
  var hh = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  var dd = "AM";
  var h = hh;
  if (h >= 12) {
    h = hh - 12;
    dd = "PM";
  }
  if (h == 0) {
    h = 12;
  }
  m = m < 10 ? "0" + m : m;

  s = s < 10 ? "0" + s : s;
  
  var result = h + ":" + m + " " + dd;
  
  document.getElementById('_ui_clock').innerHTML = result;
}

function updateClock() {
    var interval = (60 - (new Date()).getSeconds()) * 1000 + 5;
    getClockTime();
    setTimeout(updateClock, interval);
}

$.fn.initWindows = function() {
  windowsEl = this;
  windowsEl.append(`
    <div class="ui_desktop" id="_ui_desktop">
      <div tabindex="0" data-exe="openLocation('My Computer')" data-target="My Computer" class="ui_icon" style="position:absolute;left:0px;top:0px;">
        <div class="icon icon_computer"></div>
        <span>My Computer</span>
      </div>
    </div>
    <taskbar id="_ui_taskbar" class="shadow" onmousedown="return false;" oncontextmenu="return false;">
      <button class="start" onmousedown="toggleStartMenu()" isopen="false">Start</button>
      <div class="startmenu shadow" style="display: none">
        <div class="startmenu_top">
          <img class="startmenu_usericon" src="` + xp.profile.image + `"/>
          <div class="startmenu_username">` + xp.profile.name + `</div>
        </div>
        <div class="startmenu_middle">
          <ul class="menu startmenu_programs">
            <li class="startmenuitem large" onclick="openApp('browser')">
              <img src="https://www.freeiconspng.com/uploads/internet-explorer-logo-icon-10.png"/>
              <div><div>
                <b>Internet</b><br/>
                Web Browser
              </div></div>
            </li>

            <li class="startmenuitem large" onclick="openApp('terminal')">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACOUlEQVRYhe2Xv2sTYRjHP8/lvSRN27QipUr9UQLFLhVLRVrN4CQ5cKjg6uIgpQgObi6d+0/o0NHBpZCAVQqigw4VC9GAixAbpNGmMUnT/LjXoV4IJk3AXFLBfuG45w6e5/u55+6euxf+U4kTGEdiPzOjWFoyDkiu3ptDzAfjI9MWWqRdbif6sv3uhbGXe+zPbL0NFgM/U6nVgvLJ5dfjE2MycWmym94EzX1Ob47M5zOF+cTGk4WMKqwCBTU+OSYJdYrEx0zHJgN+xcObE6zH08STWRZvhFiPpwl+WuOResYd7vLhcxa/Lfd1pRIHvqpE31kYGurYHACfB0wvDA7Aibp4eBhKXuYC22z09yO71WBVjGnglbp2DsJX+twBAIr8YDYEsyGzFhMKs0KYQeDk5hp5W5uGiBdAhdUWy9cvugbQThdurZAXEWxtwFG9hnU6BmgAiEQiaK1rWyQSaUjSWncPIBqNYlkWIoJlWUSj0aaJzcBcAQCIxWK1vdRNZ+fKW4G5AnCYHBgH0I0uNAVwCjvPQzO51QXVrrBlWbVYa93QBef8YZI2H9gGgD/ve6tiznE7k1b69+bAMcAxQK+l0rtlpqamemaYK9u/B4doAPXyfarI+UVTS6+6UcDQdr7iMfYBVCr+dEFKxduCDoJuGExdUEWQHY/HnwRQYujnVY+8Mcu2F1s8Xbc3dLXis4umLmYB1F5VfT9Tyu2UywUDRrvuD98wdcBOju5X4GCR2NXlWBu592v1t/oFx8vJxHIFQMwAAAAASUVORK5CYII="/>
              <div><div>
                <b>Shell</b><br/>
                JQuery Terminal
              </div></div>
            </li>
            
            <li class="startmenuitem large" onclick="window.open('https://www.buymeacoffee.com/shoaibify', '_blank');">
              <img src="https://media.giphy.com/media/TDQOtnWgsBx99cNoyH/giphy.gif"/>
              <div><div>
                <b>Support</b><br/>
                Buy me a coffee
              </div></div>
            </li>


          </ul>
          <ul class="menu startmenu_allprograms">
            <li class="startmenuitem">
              <div><div style="padding-left:32px;line-height:24px;">
                <b>All Programs</b>
                <span class="allprograms_arrow"></span>
              </div></div>
            </li>
            <div id="_ui_programsmenu" class="programsmenu" style="display:none;" data-isopen="false">
              <ul class="menu">
                <li class="menuitem">Test</li>
              </ul>
            </div>
          </ul>
          <ul class="menu startmenu_shortcuts">
            <li class="startmenuitem" onclick="openLocation('/Documents and Settings/' + xp.profile.name + '/My Documents')">
              <img src="` + xp.startmenu.icons.documents + `"/>
              <div><div>
                <b>My Documents</b>
              </div></div>
            </li>
            <li class="startmenuitem"  onclick="openLocation('/Documents and Settings/' + xp.profile.name + '/My Documents')">
              <img src="` + xp.startmenu.icons.recentdocuments + `"/>
              <div><div>
                <b>My Recent Documents</b>
              </div></div>
            </li>
            <li class="startmenuitem" onclick="openLocation('/Documents and Settings/' + xp.profile.name + '/My Documents/My Pictures')">
              <img src="` + xp.startmenu.icons.pictures + `"/>
              <div><div>
                <b>My Pictures</b>
              </div></div>
            </li>
            <li class="startmenuitem" onclick="openLocation('/Documents and Settings/' + xp.profile.name + '/My Documents/My Music')">
              <img src="` + xp.startmenu.icons.music + `"/>
              <div><div>
                <b>My Music</b>
              </div></div>
            </li>
            <li class="startmenuitem" onclick="openLocation('My Computer')">
              <img src="` + xp.startmenu.icons.computer + `"/>
              <div><div>
                <b>My Computer</b>
              </div></div>
            </li>
            <li class="startmenuseparator"></li>
            <li class="startmenuitem" onclick="openLocation('Control Panel')">
              <img src="` + xp.startmenu.icons.controlpanel + `"/>
              <div><div>
                <b>Control Panel</b>
              </div></div>
            </li>
            <li class="startmenuitem" onclick="openApp('uac_app')">
              <img src="` + xp.startmenu.icons.controlpanel + `"/>
              <div><div>
                <b>User Accounts and Control</b>
              </div></div>
            </li>
            <li class="startmenuitem" onclick="openApp('themes')">
              <img src="` + xp.startmenu.icons.controlpanel + `"/>
              <div><div>
                <b>Personalize RebornXP</b>
              </div></div>
            </li>
            <li class="startmenuseparator"></li>
            <li class="startmenuitem" onclick="openApp('winhelp')">
              <img src="` + xp.startmenu.icons.help + `"/>
              <div><div>
                <b>Help & Support</b>
              </div></div>
            </li>


            <!--Search is under Development-->
            <li class="startmenuitem" onclick="">
              <img src="` + xp.startmenu.icons.search + `"/>
              <div><div>
                <b>Search</b>
              </div></div>
            </li>
            <!--Feel free to contribute to this Section-->

            
            <li class="startmenuitem" onclick="runAppDialog()">
              <img src="` + xp.startmenu.icons.run + `"/>
              <div><div>
                <b>Run...</b>
              </div></div>
            </li>
          </ul>
        </div>
        <div class="startmenu_bottom">
        </div>
      </div>
      <div class="clock" id="_ui_clock">0:00</div>
    </taskbar>
    <div id="lContextMenu" class="ContextMenu" onselectstart="return false;" oncontextmenu="return false;" style="left: 0px; top: 0px; visibility: hidden;">
      Uh oh! Something went wrong!<br>You should <b>not</b> be seeing this!
    </div>
`);
  $("#_ui_taskbar").css("display", "none");
  $("#_ui_boot").css("display", "none");
  
  //$('#_ui_programsmenu').closest('ul').find('li.startmenuitem').on('click', function() {
  //  $('#_ui_programsmenu').css('display', 'inline');
  //  $('#_ui_programsmenu').data('isopen', true);
  //});
  
  /*$("#_ui_programsmenu").closest("li.startmenuitem").on("mouseleave", function() {
    $('#_ui_programsmenu').css('display', 'none');
  });*/
  
  $('#_ui_desktop').on('click', function(e) {
    var el = $(e.target).closest('.ui_icon');
    if (el.hasClass('ui_selected')) {
      el.removeClass('ui_selected');
      eval(el.data('exe'));
    } else {
      $('#_ui_desktop .ui_icon').each(function() {
        $(this).removeClass('ui_selected');
      });
      el.addClass('ui_selected');
    }
  });
  
  $("#_ui_taskbar").css("display", "inline");
  $("#_ui_boot").remove();
  updateAllWindows();
  updateIndexes();
  updateAllWindows();
  updateTaskbar();
  windowsEl.on("mousedown", function(e) {
    //var canClose = !(el.is("button.start") || el.is("li.menuitem") || el.is("li.startmenuitem") || el.is("li.startmenuitem img") || el.is("li.startmenuitem div") || el.is("li.startmenuitem div div") || el.is("li.startmenuitem div div b"));
    var canClose = !$.contains($('#_ui_taskbar').find('.startmenu')[0], e.target);
    if (canClose && !$(e.target).is('button.start')) {
      closeStartMenu();
    } else {
      if ($('#_ui_programsmenu').is(e.target) || $('#_ui_programsmenu').has(e.target).length) return;
      if ($('#_ui_programsmenu').closest('ul').find('li.startmenuitem').is(e.target) || $('#_ui_programsmenu').closest('ul').find('li.startmenuitem').has(e.target).length) {
        $('#_ui_programsmenu').css('display', $('#_ui_programsmenu').data('isopen') ? 'none ' : 'inline');
        $('#_ui_programsmenu').data('isopen', !$('#_ui_programsmenu').data('isopen'));
      } else {
        $('#_ui_programsmenu').css('display', 'none');
        $('#_ui_programsmenu').data('isopen', false);
      }
    }
  });
  windowsEl.on('mousedown', function() {
    fMouseDown(this);
    return false;
  });
  windowsEl.on('contextmenu', function(e) {
    desktopContextMenu(e);
    return false;
  });
  windowsEl.on('click', function() {
    rcCloseContext();
  });
  $('#_ui_taskbar').find('div.startmenu').on('contextmenu', startContextMenu);
  
  updateClock();
};

function runAppDialog() {
  closeStartMenu();
  var win = new Window({
    width: 340,
    height: 154,
    title: 'Run',
    canResize: false,
    canMinimize: false
  });
  win.content(`<form action="#">
    <span class="icon icon_run" draggable="false" style="position: absolute; left: 11px; top: 17px;"></span>
    <p style="position: absolute; left: 54px; top: 8px;">
      Type the name of a program, document, or<br>
      Internet resource, and RebornXP will open it for you.
    </p>
    <p style="position: absolute; top: 54px; left: 12px; line-height: 16px;">Open:</p>
    <input type="text" class="prompttext" style="width: 275px; position: absolute; top: 70px; left: 54px;">
    <center style="position: absolute; bottom: 17px; right: 16.7px;">
      <button class="ok">OK</button>
      <button class="cancel">Cancel</button>
      <button class="browse">Browse</button>
    </center>
  </form>`);
  win.el.find('.cancel').on('click', function() {
    win.close();
  });
  win.el.find('.ok').on('click', function() {
    win.close();
    var result = win.el.find('.prompttext').val();
    if (!openApp(result)) {
      xp.openFileHandler(result);
    }
  });
  win.el.find('.browse').on('click', function() {
    xp.filesystem.openFileDialog((file) => {
      win.el.find('.prompttext').val(file);
    });
  });
  win.el.find('input[type=text]').focus();
  win.el.find('form').on('submit', function() {
    return false;
  });
}
