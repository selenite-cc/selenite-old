function browserGo(loc, guid) {
  if(!loc){
    loc = document.getElementById('url_' + guid).value;
  }
  if (loc.indexOf('http://') == -1 && loc.indexOf('https://') == -1) {
    loc = location.protocol + '//' + loc;
  }
  document.getElementById('webPage_' + guid).src = loc;
  document.getElementById('url_' + guid).value = loc;
  document.getElementById('loading_' + guid).style.display = 'block';
  document.getElementById('webPage_' + guid).style.display = 'none';
}
function iframeContentUnload(guid) {
  document.getElementById('loading_' + guid).style.display = 'block';
  document.getElementById('webPage_' + guid).style.display = 'none';
}
function iframeContentLoaded(guid) {
  document.getElementById('loading_' + guid).style.display = 'none';
  document.getElementById('webPage_' + guid).style.display = 'block';
}

$(window).on('xpboot', function() {
  xp.applications.add('browser', (args) => {
      var guid = generate_guid();
      var el = $.parseHTML(`<window title="Idiot Explorer 6" width="800" height="500">
        <style>
    .load-overlay {
      position: absolute;
      top: 24;
      left: 0;
      width: 100%;
      height: calc(100% - 24px);
      background: #d6d6ce;
      z-index: 9999;
      text-align: center;
    }

    .load-overlay-cell {
      position: absolute;
      top: calc(50% - 100px);
      left: calc(50% - 100px);
    }

    @keyframes lds-dual-ring{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes lds-dual-ring{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.lds-dual-ring{position:relative}.lds-dual-ring div{position:absolute;width:40px;height:40px;top:80px;left:80px;border-radius:50%;border:4px solid #000;border-color:#51CACC transparent;-webkit-animation:lds-dual-ring 1s linear infinite;animation:lds-dual-ring 1s linear infinite}.lds-dual-ring{width:200px!important;height:200px!important;-webkit-transform:translate(-100px,-100px) scale(1) translate(100px,100px);transform:translate(-100px,-100px) scale(1) translate(100px,100px)}
        </style>
        
                


        <div id="webBrowserContent">
          <button align="left" id="homeButton" onclick="browserGo('search.anasdew.com', '` + guid + `')" title="Home">Home</button>
                            <button align="left" onclick="browserGo('www.google.com/?igu=1', '` + guid + `')" title="Google">Google</button>
                            <button align="left" onclick="browserGo('www.wikipedia.com', '` + guid + `')" title="Wikipedia">Wikipedia</button>
          <button align="left" id="videoButton" onclick="browserGo('www.bing.com/videos', '` + guid + `')" title="Videos">Videos</button>
          <button align="left" id="imageButton" onclick="browserGo('www.bing.com/images', '` + guid + `')" title="Images">Images</button>
          <input type="text" id="url_` + guid + `" value="` + location.protocol + `//search.anasdew.com" style="width:calc(100% - 600px);"/>
          <button id="goButton" onclick="browserGo(undefined, '` + guid + `')" title="Go">Go</button><br>
          <div style="width:calc(100% - 5px);height:calc(100% - 27px);">
            <div style="display: none" id="loading_` + guid + `" title="Loading..." class="load-overlay">
              <div class="load-overlay-cell">
                <div class="lds-css ng-scope"><div style="width:100%;height:100%" class="lds-dual-ring"><div></div></div></div>
              </div>
            </div>
            <iframe style="width:calc(100% - 5px);height:calc(100% - 29px);position:absolute;top:24;left:0;" onload="iframeContentLoaded('` + guid + `')" onunload="iframeContentUnload('` + guid + `')" src="` + location.protocol + `//search.anasdew.com" id="webPage_` + guid + `"></iframe>
          </div>
        </div>
      </window>`);
      document.body.appendChild(el[0]);
      $(el).updateWindow();
      var widthOffset = 30;
      var heightOffset = 80;
      window.iFrameChanges = -1;
  });

  xp.applications.add('html', (args) => {
    var el = $.parseHTML(`<window title="` + args[1] + `" width="800" height="500">
    <style>
      iframe[seamless]{
        background-color: transparent;
        border: 0px none transparent;
        padding: 0px;
        overflow: hidden;
      }
      .frame-container {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding: 0px;
        margin: 0px;
      }
    </style>
    <div class="frame-container">
      <iframe seamless="seamless" width="100%" height="100%" id="frame" src="` + args[1] + `"></iframe>
    </div>
  </window>`);
    document.body.appendChild(el[0]);
    $(el).updateWindow();
  });
  
  xp.startmenu.add('browser', 'Idiot Explorer 6', 'program/assets/ie.webp');
});
