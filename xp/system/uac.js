$(window).on('xpboot', () => {
  xp.controlpanel.add('User Accounts', () => {
    var win = new Window({
      width: 522,
      height: 462,
      title: 'User Accounts',
      canResize: false,
    });

    win.content(`
<style>
.userimg {
    width: 64px;
    height: 64px;
}
.userimgopt {
    border: 1px solid transparent;
    width: 48px;
    height: 48px;
    padding: 4px;
    border-radius: 5px;
}
.userimgopt.selected {
    border: 1px solid #68b3db;
    background-color: #e1f2fb;
}
.cp_option {
    color: #fff;
}
</style>
<div style="width:100%;height:100%;background-color:#6375d6;" class="outercontent">
  <div style="margin-left:32px;width:calc(100% - 64px);" class="content">
      <br/>
      <h1 style="color:#d6dff5">Pick a task...</h1>
      <p>
        <span class="cp_option pointer change_acct">Change an account</span>
      </p>
      <p>
        <span class="cp_option pointer new_acct">Create a new account</span>
      </p>
      <h1 style="color:#d6dff5">or pick an account to change</h1>
      <div style="width:100%overflow-x:auto;">
        <table style="font-size:11px;color:#fff;">
          <tr class="accounts">
          </tr>
        </table>
      </center>
  </div>
</div>`);
    
    function changeAccount(acct) {
      win.el.find('.outercontent').css('background-color', '#fff');
      var acctname = acct.name === xp.profile.name ? 'your' : acct.name + '\'s';
      var canDelete = '';
      if (acct.name !== xp.profile.name) {
        canDelete = `
      <p>
        <span style="color:#000;" class="cp_option pointer delete_account">Delete the account</span>
      </p>`;
      }
      win.el.find('.content').html(`
      <br/>
      <h1 style="color:#7294df">What do you want to change about ${acctname}<br/>account?</h1>
      <p>
        <span style="color:#000;" class="cp_option pointer change_name">Change ${acct.name === xp.profile.name ? 'my' : 'the'} name</span>
      </p>
      <p>
        <span style="color:#000;" class="cp_option pointer change_picture">Change ${acct.name === xp.profile.name ? 'my' : 'the'} picture</span>
      </p>${canDelete}
      <table style="font-size:11px;color:#000;position:absolute;left:269px;top:97px">
        <tr><td rowspan="4" style="width:64px;"><img class="userimg" style="width:48px;height:48px;" src="${acct.image}"/></td></tr>
        <tr><td><b>${acct.name}</b></td></tr>
        <tr><td>Computer administrator</td></tr>
        <tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr>
      </table>`);
      win.el.find('.change_name').on('click', () => changeName(acct));
      win.el.find('.change_picture').on('click', () => changePicture(acct));
      win.el.find('.delete_account').on('click', () => deleteAccount(acct));
    }

    function deleteAccount(acct) {
      win.el.find('.outercontent').css('background-color', '#fff');
      var acctname = acct.name + '\'s';
      win.el.find('.content').html(`
      <br/>
      <h1 style="color:#7294df">Do you want to keep ${acctname} files?</h1>
      <p>
        Before you delete ${acctname} account, Windows can automatically save the contents of ${acctname}<br/>
        My Documents to a folder called ${acct.name} on your desktop. However, Windows<br/>
        cannot save ${acctname} e-mail messages, Internet favorites, and other settings.
      </p>
      <hr/>
      <p>
        <div style="float:right">
          <button class="keep">Keep Files</button>
          <button class="delete">Delete Files</button>
          <button class="cancel">Cancel</button>
        </div>
      </p>`);
      win.el.find('.keep').on('click', () => {
        xp.filesystem.moveDir('/Documents and Settings/' + acct.name + '/My Documents', '/Documents and Settings/' + xp.profile.name + '/My Documents/' + acct.name, () => {
          xp.filesystem.deleteDir('/Documents and Settings/' + acct.name, () => {
            win.close();
          });
        });
      });
      win.el.find('.delete').on('click', () => {
        xp.filesystem.deleteDir('/Documents and Settings/' + acct.name, () => {
          win.close();
        });
      });
      win.el.find('.cancel').on('click', () => changeAccount(acct));
    }
    
    function changeName(acct) {
      win.el.find('.outercontent').css('background-color', '#fff');
      var acctname = acct.name === xp.profile.name ? 'your' : acct.name + '\'s';
      win.el.find('.content').html(`
      <br/>
      <h1 style="color:#7294df">Provide a new name for ${acctname} account</h1>
      <p>
        Type a new name for ${acct.name}:<br/>
        <input type="text" style="width:212px" class="username" value="${acct.name}"/><br/>
        This name will appear on the Welcome screen and on the Start menu.<br/>
        Note: Changing ${acctname} name will require a reboot.
      </p>
      <hr/>
      <p>
        <div style="float:right">
          <button class="change">Change Name</button>
          <button class="cancel">Cancel</button>
        </div>
      </p>`);
      win.el.find('.change').on('click', () => {
        var oldProfile = xp.profile;
        xp.profile = acct;
        var newUsername = win.el.find('.username').val();
        if (xp.profile.name !== newUsername) {
          xp.filesystem.moveDir(`/Documents and Settings/${xp.profile.name}`, `/Documents and Settings/${newUsername}`, () => {});
          xp.profile.name = newUsername;
        }
        saveConfig(() => {
          xp.profile = oldProfile;
          xp.alert('Changes have been applied.<br/>Click OK to reboot your computer.', () => {
            window.location.href = window.location.href;
          });
        });
      });
      win.el.find('.cancel').on('click', () => changeAccount(acct));
    }
    
    function changePicture(acct) {
      win.el.find('.outercontent').css('background-color', '#fff');
      var acctname = acct.name === xp.profile.name ? 'your' : acct.name + '\'s';
      win.el.find('.content').html(`
      <br/>
      <h1 style="color:#7294df">Pick a new picture for ${acctname} account</h1>
      <p>
        The picture you choose will appear on the Welcome screen.<br/>
        Note: Changing your picture will require a reboot.
      </p>
      <p style="margin-left:16px;overflow-x:scroll;width:100%;">
        <table style="font-size:11px;color:#000;">
          <tr class="images">
            <td><img class="userimgopt" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fuser.bmp?1522560745448"/></td>
            <td><img class="userimgopt" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fusertile2.bmp?1522560745448"/></td>
            <td><img class="userimgopt" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fusertile3.bmp?1522560745448"/></td>
            <td><img class="userimgopt" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fusertile4.bmp?1522560745448"/></td>
            <td><img class="userimgopt" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fusertile5.bmp?1522560745448"/></td>
            <td><img class="userimgopt" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fusertile6.bmp?1522560745448"/></td>
            <td><img class="userimgopt" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fusertile7.bmp?1522560745448"/></td>
            <td><img class="userimgopt" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fusertile8.bmp?1522560745448"/></td>
            <td><img class="userimgopt" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fusertile9.bmp?1522560745448"/></td>
            <td><img class="userimgopt" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fusertile10.bmp?1522560745448"/></td>
            <td><img class="userimgopt" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fusertile11.bmp?1522560745448"/></td>
            <td><img class="userimgopt" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fusertile12.bmp?1522560745448"/></td>
          </tr>
        </table>
      </p>
      <p>
        <button class="browse">Browse for more pictures</button>
      </p>
      <hr/>
      <p>
        <div style="float:right">
          <button class="change">Change Picture</button>
          <button class="cancel">Cancel</button>
        </div>
      </p>`);
      
      if (win.el.find(`.userimgopt[src="${acct.image}"]`).length > 0)
        win.el.find(`.userimgopt[src="${acct.image}"]`).addClass('selected');
      else
        win.el.find('.images').append(`<td><img class="userimgopt selected" src="${acct.image}"/></td>`);
      
      win.el.find('.userimgopt').on('click', function() {
        win.el.find('.userimgopt').each(function() {
          $(this).removeClass('selected');
        });
        $(this).addClass('selected');
      });
      
      win.el.find('.browse').on('click', () => {
        xp.filesystem.openFileDialog((file) => {
          xp.filesystem.toURL(file, (url) => {
            win.el.find('.userimgopt').each(function() {
              $(this).removeClass('selected');
            });
            var el = $($.parseHTML(`<td><img class="userimgopt selected" src="${url}"/></td>`));
            win.el.find('.images').append(el);
            el.find('img').on('click', function() {
              win.el.find('.userimgopt').each(function() {
                $(this).removeClass('selected');
              });
              $(this).addClass('selected');
            });
          });
        });
      });
      
      win.el.find('.change').on('click', () => {
        var oldProfile = xp.profile;
        xp.profile = acct;
        xp.profile.image = win.el.find('.userimgopt.selected').attr('src');
        saveConfig(() => {
          xp.profile = oldProfile;
          xp.alert('Changes have been applied.<br/>Click OK to reboot your computer.', () => {
            window.location.href = window.location.href;
          });
        });
      });
      win.el.find('.cancel').on('click', () => changeAccount(acct));
    }
    
    function listAccounts() {
      xp.filesystem.listDir('/Documents and Settings', (acct) => {
        acct = acct.split('/')[0];
        xp.filesystem.readFile(`/Documents and Settings/${acct}/config.json`, (file) => {
          var config = JSON.parse(file);
          var el = $.parseHTML(`<td>
    <img class="userimgopt pointer" account="${acct}" src="${config.profile.image}"/>
    <div style="text-align:center;" class="pointer">${acct}</div>
  </td>`);
          $(el).find('img').on('click', () => changeAccount(config.profile));
          win.el.find('.accounts').append(el);
        });
      });
    }
    
    listAccounts();
    
    win.el.find('.cp_option.new_acct').on('click', () => {
      newAccount();
    });
    
    win.el.find('.cp_option.change_acct').on('click', () => {
      win.el.find('.outercontent').css('background-color', '#fff');
      win.el.find('.content').html(`
      <br/>
      <h1 style="color:#7294df">Pick an account to change</h1>
      <div style="width:100%overflow-x:auto;">
        <table style="font-size:11px;color:#000;">
          <tr class="accounts">
          </tr>
        </table>
      </center>`);
      listAccounts();
    });
    
    function newAccount() {
      let win = new Window({
        width: 594,
        height: 434,
        title: 'Create New Account',
        canResize: false,
        center: true
      });

      win.content(`
<style>
.userimg {
    width: 64px;
    height: 64px;
}
.userimgopt {
    border: 1px solid transparent;
    width: 48px;
    height: 48px;
    padding: 4px;
    border-radius: 5px;
}
.userimgopt.selected {
    border: 1px solid #68b3db;
    background-color: #e1f2fb;
}
</style>
<div style="margin-left:32px;">
    <h1 style="font-weight:normal;">Create User Account</h1>
    <h2 style="font-weight:normal;">Choose a user name and picture</h2>
    <p>
        Your user name and picture represent your user account. The account you create here is a computer<br>
        administrator account. It is recommended to close all open applications before continuing.
    </p>
    <br/>
    <p style="margin-left:64px;">
        <table style="font-size:11px;color:#000;">
            <tr><td rowspan="4" style="width:72px;"><img class="userimg" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fuser.bmp?1522560745448"/></td></tr>
            <tr><td>Type a user name (for example, John)</td></tr>
            <tr><td><input type="text" class="username" style="width:180px;"/></td></tr>
            <tr><td>&nbsp;</td></tr>
        </table>
    </p>
    <br/><br/>
    <p style="margin-left:16px;">
        <table style="font-size:11px;color:#000;">
            <tr>
                <td><img class="userimgopt selected" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fuser.bmp?1522560745448"/></td>
                <td><img class="userimgopt" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fusertile2.bmp?1522560745448"/></td>
                <td><img class="userimgopt" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fusertile3.bmp?1522560745448"/></td>
                <td><img class="userimgopt" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fusertile4.bmp?1522560745448"/></td>
                <td><img class="userimgopt" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fusertile5.bmp?1522560745448"/></td>
                <td><img class="userimgopt" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fusertile6.bmp?1522560745448"/></td>
                <td><img class="userimgopt" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fusertile7.bmp?1522560745448"/></td>
                <td><img class="userimgopt" src="https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2Fusertile8.bmp?1522560745448"/></td>
           </tr>
        </table>
    </p>
    <div style="position:absolute;right:8px;bottom:8px;">
        <button disabled class="next">Next</button>
    </div>
</div>
      `);

      win.el.find('.username').on('keyup', function() {
        console.log($(this).val());
        if ($(this).val() === '') {
          win.el.find('.next').attr('disabled', 'disabled');
        } else {
          win.el.find('.next').removeAttr('disabled');
        }
      });

      win.el.find('.next').on('click', function() {
          if (win.el.find('.username').val() === '') {
              xp.alert('You need to type a username in order to continue!');
          } else {
              xp.profile.image = win.el.find('.userimgopt.selected').attr('src');
              xp.profile.name = win.el.find('.username').val();
              var oldConfigFile = configFile;
              configFile = `/Documents and Settings/${xp.profile.name}/config.json`;
              xp.wallpaper.href = 'https://cdn.glitch.com/01d2e04f-e49d-4304-aa9e-55b9849b4cce%2FBliss.jpg?1519950052202';
              win.content(`
<div style="margin-left:32px;">
    <h1 style="font-weight:normal;">Please wait while we create the user account.</h1>
</div>`);
              setTimeout(() => {
                  requiredDirectories = [
                      `/Documents and Settings`,
                      `/Documents and Settings/${xp.profile.name}`,
                      `/Documents and Settings/${xp.profile.name}/My Documents`,
                      `/Documents and Settings/${xp.profile.name}/My Documents/My Pictures`,
                      `/Documents and Settings/${xp.profile.name}/My Documents/My Videos`,
                      `/Documents and Settings/${xp.profile.name}/My Documents/My Music`
                  ];
                  var i = 0;
                  function createDirs() {
                      var dirToCreate = requiredDirectories[i];
                      if (dirToCreate !== undefined) {
                          xp.filesystem.createDir(dirToCreate, (e) => {
                              i ++;
                              createDirs();
                          });
                      } else {
                          saveConfig(() => {
                            configFile = oldConfigFile;
                            loadConfig(() => {
                              win.close();
                            });
                          });
                      }
                  }
                  createDirs();
              }, 2000);
          }
      });

      win.el.find('.userimgopt').on('click', function() {
          win.el.find('.userimgopt').each(function() {
              $(this).removeClass('selected');
          });
          $(this).addClass('selected');
          win.el.find('.userimg').attr('src', $(this).attr('src'));
      });
    }
  });
});