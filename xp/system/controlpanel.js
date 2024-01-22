var configFile = 'config.json';

// Load the config on startup
$(window).on('xpboot', function() {
  loadConfig();
});

function saveConfig(callback) {
  if (!loadingconfig) {
    config.wallpaper = xp.wallpaper.href;
    config.profile = xp.profile;
    config.theme = xp.theme.name;
    xp.filesystem.writeFile(configFile, new Blob([JSON.stringify(config)], {type: 'text/plain'}), (e) => {
      if (e) xp.error(e);
      else if (callback !== undefined) callback();
    });
  }
}

function loadConfig(callback) {
  loadingconfig = true;
  xp.filesystem.readFile(configFile, (text) => {
    try {
      config = JSON.parse(text);
      xp.wallpaper.set(config.wallpaper || 'https://rebornxp.js.org/system/themes/XP.jpg');
      xp.profile = config.profile;
      xp.theme.set(config.theme || 'reborn');
    } catch (e) {
      xp.wallpaper.set('https://rebornxp.js.org/system/themes/XP.jpg');
      loadingconfig = false;
      saveConfig();
    }
    loadingconfig = false;
    if (callback !== undefined) callback();
  });
}

// Add theme chooser to Control Panel
xp.controlpanel.add('Themes', () => {
  var win = new Window({
    width: 400,
    height: 200, // Increased height to accommodate the wallpaper change option
    title: 'Change Theme',
    canResize: false,
  });

  win.content(`
    <div class="content">
      <h1>Theme Chooser</h1>
      <p>Choose a new theme to apply:</p>
      <select id="themeSelect">
        ${xp.themes.map(theme => `<option value="${theme}">${theme}</option>`).join('')}
      </select>
      <br/><br/>
      <button id="applyThemeBtn">Apply Theme</button>
      <button id="changeWallpaperBtn">Change Wallpaper</button> <!-- Added button for wallpaper change -->
    </div>
  `);

  win.el.find('#applyThemeBtn').on('click', function() {
    const selectedTheme = win.el.find('#themeSelect').val();
    xp.theme.set(selectedTheme);
    saveConfig();
    win.close();
  });

  win.el.find('#changeWallpaperBtn').on('click', function() {
    const wallpaperDialog = new Window({
      width: 400,
      height: 250,
      title: 'Change Wallpaper',
      canResize: false,
    });

    wallpaperDialog.content(`
      <center><div class="content">
        <h1>Wallpaper Chooser</h1>
        <p>Select a wallpaper:</p>
        <div class="wallpaper-thumbnails">
          <!-- Thumbnails will be dynamically added here -->
        </div>
        <br/>
        <input type="text" id="wallpaperLink" placeholder="Enter wallpaper link">
        <button id="applyWallpaperBtn">Apply Wallpaper</button>
      </div></center>
    `);

    const thumbnailsContainer = wallpaperDialog.el.find('.wallpaper-thumbnails');

    // Add your wallpaper thumbnails here using the following format
    const wallpaperThumbnails = [
      'system/themes/XP.jpg',
      'system/themes/wallpapers/anniversary.png',
      'system/themes/wallpapers/3.jpg',
      'system/themes/wallpapers/4.jpg',
      'system/themes/wallpapers/5.jpg',
      'system/themes/wallpapers/6.jpg',
    ];

    wallpaperThumbnails.forEach(thumbnail => {
      const thumbnailElement = $('<img>')
        .attr('src', thumbnail)
        .addClass('wallpaper-thumbnail')
                .attr('width', "100px")
                .attr('height', "60px")


        .on('click', function() {
          const selectedWallpaper = $(this).attr('src');
          xp.wallpaper.set(selectedWallpaper);
          saveConfig();
        });
      thumbnailsContainer.append(thumbnailElement);
    });

    wallpaperDialog.el.find('#applyWallpaperBtn').on('click', function() {
      const wallpaperLink = wallpaperDialog.el.find('#wallpaperLink').val();
      if (wallpaperLink) {
        xp.wallpaper.set(wallpaperLink);
        saveConfig();
      }
      wallpaperDialog.close();
    });

   
  });

  // Calculate window position to center it on the screen
  const screenWidth = $(window).width();
  const screenHeight = $(window).height();
  const windowWidth = win.el.outerWidth();
  const windowHeight = win.el.outerHeight();
  const left = (screenWidth - windowWidth) / 2;
  const top = (screenHeight - windowHeight) / 2;

  win.el.css({
    position: 'absolute',
    left: left + 'px',
    top: top + 'px',
  });

  win.el.find('.content').css({
    padding: '20px', // Adjust the padding value as needed
  });
});

// Add theme chooser as an application
xp.applications.add('themes', () => {
  var win = new Window({
    width: 400,
    height: 200, // Increased height to accommodate the wallpaper change option
    title: 'Change Theme',
    canResize: false,
  });

  win.content(`
    <div class="content">
      <h1>Theme Chooser</h1>
      <p>Choose a new theme to apply:</p>
      <select id="themeSelect">
        ${xp.themes.map(theme => `<option value="${theme}">${theme}</option>`).join('')}
      </select>
      <br/><br/>
      <button id="applyThemeBtn">Apply Theme</button>
      <button id="changeWallpaperBtn">Change Wallpaper</button> <!-- Added button for wallpaper change -->
    </div>
  `);

  win.el.find('#applyThemeBtn').on('click', function() {
    const selectedTheme = win.el.find('#themeSelect').val();
    xp.theme.set(selectedTheme);
    saveConfig();
    win.close();
  });

  win.el.find('#changeWallpaperBtn').on('click', function() {
    const wallpaperDialog = new Window({
      width: 400,
      height: 250,
      title: 'Change Wallpaper',
      canResize: false,
    });

    wallpaperDialog.content(`
      <center><div class="content">
        <h1>Wallpaper Chooser</h1>
        <p>Select a wallpaper:</p>
        <div class="wallpaper-thumbnails">
          <!-- Thumbnails will be dynamically added here -->
        </div>
        <br/>
        <input type="text" id="wallpaperLink" placeholder="Enter wallpaper link">
        <button id="applyWallpaperBtn">Apply Wallpaper</button>
      </div></center>
    `);

    const thumbnailsContainer = wallpaperDialog.el.find('.wallpaper-thumbnails');

    // Add your wallpaper thumbnails here using the following format
    const wallpaperThumbnails = [
      'system/themes/XP.jpg',
      'system/themes/wallpapers/anniversary.png',
      'system/themes/wallpapers/3.jpg',
      'system/themes/wallpapers/4.jpg',
      'system/themes/wallpapers/5.jpg',
      'system/themes/wallpapers/6.jpg',
    ];

    wallpaperThumbnails.forEach(thumbnail => {
      const thumbnailElement = $('<img>')
        .attr('src', thumbnail)
        .addClass('wallpaper-thumbnail')
                .attr('width', "100px")
                .attr('height', "60px")


        .on('click', function() {
          const selectedWallpaper = $(this).attr('src');
          xp.wallpaper.set(selectedWallpaper);
          saveConfig();
        });
      thumbnailsContainer.append(thumbnailElement);
    });

    wallpaperDialog.el.find('#applyWallpaperBtn').on('click', function() {
      const wallpaperLink = wallpaperDialog.el.find('#wallpaperLink').val();
      if (wallpaperLink) {
        xp.wallpaper.set(wallpaperLink);
        saveConfig();
      }
      wallpaperDialog.close();
    });

   
  });

  // Calculate window position to center it on the screen
  const screenWidth = $(window).width();
  const screenHeight = $(window).height();
  const windowWidth = win.el.outerWidth();
  const windowHeight = win.el.outerHeight();
  const left = (screenWidth - windowWidth) / 2;
  const top = (screenHeight - windowHeight) / 2;

  win.el.css({
    position: 'absolute',
    left: left + 'px',
    top: top + 'px',
  });

  win.el.find('.content').css({
    padding: '20px', // Adjust the padding value as needed
  });
});
