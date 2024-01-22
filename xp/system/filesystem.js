'use strict';

xp.filesystem = {};
xp.filesystem.icons = {};

xp.filesystem.icons.smallFolder = '<img src="data:image/gif;base64,R0lGODlhEAAQAMIHAAAAAJmZAMzMZv/MmfHx8f//mf//zP///yH5BAEKAAcALAAAAAAQABAAAANFeLrcGxAC94gxpYTpgvigEEVKcJ3oVQiTmb1wMbCHG8s4bd+DrGOwnnDVAgZxs+JrKEzWDEzkwOkJWUEcgHbL5VK+YHACADs="/>';
xp.filesystem.icons.smallFile = '<img src="data:image/gif;base64,R0lGODlhEAAQAMIAAAAAAICAgMDAwP///wAAAAAAAAAAAAAAACH5BAEKAAQALAAAAAAQABAAAAM2SBTcrnCNSacIUVYqBobBRgEkAIqVYCohaq2aq57uMLO1Dbfynt8xFJAn9NWGgqRyCSw5n6YEADs="/>';

xp.filesystem.type = 'html5';

xp.filesystem.listDir = function(path, callback) {
  xp.filesystem.fs.root.getDirectory(path, {create: false}, function(dirEntry) {
    var dirReader = dirEntry.createReader();
    var entries = [];
    var i = 0;

    function readEntries() {
      dirReader.readEntries (function(results) {
        if (!results.length) {
          entries.forEach(function(entry, i) {
            var name = entry.name + (entry.isDirectory ? "/" : "");
            callback(name);
          });
        } else {
          entries = entries.concat(Array.from(results));
          readEntries();
        }
      }, function(e) {callback(e)});
    };

    readEntries();
  }, function(e) {callback(e)});
};

xp.filesystem.createFile = function(name, callback) {
  xp.filesystem.fs.root.getFile(name, {create: true}, function(fileEntry) {
    callback();
  }, function(e) {callback(e)});
}

xp.filesystem.deleteFile = function(name, callback) {
  xp.filesystem.fs.root.getFile(name, {create: false}, function(fileEntry) {
    fileEntry.remove(function() {
      callback();
    }, function(e) {callback(e)});
  }, function(e) {callback(e)});
}

xp.filesystem.createDir = function(name, callback) {
  xp.filesystem.fs.root.getDirectory(name, {create: true}, function(dirEntry) {
    callback();
  }, function(e) {callback(e)});
}

xp.filesystem.deleteDir = function(name, callback) {
  xp.filesystem.fs.root.getDirectory(name, {create: false}, function(dirEntry) {
    dirEntry.removeRecursively(function() {
      callback();
    }, function(e) {callback(e)});
  }, function(e) {callback(e)});
}

xp.filesystem.readFile = function(name, callback) {
  xp.filesystem.fs.root.getFile(name, {create: false}, function(fileEntry) {
    fileEntry.file(function(file) {
       var reader = new FileReader();

       reader.onloadend = function(e) {
         callback(this.result);
       };

       reader.readAsText(file);
    }, function(e) {callback("")});
  }, function(e) {callback("")});
}

xp.filesystem.readBinaryFile = function(name, callback) {
  xp.filesystem.fs.root.getFile(name, {create: false}, function(fileEntry) {
    fileEntry.file(function(file) {
       var reader = new FileReader();

       reader.onloadend = function(e) {
         callback(this.result);
       };

       reader.readAsArrayBuffer(file);
    }, function(e) {callback("")});
  }, function(e) {callback("")});
}

xp.filesystem.writeFile = function(name, blob, callback) {
  xp.filesystem.deleteFile(name, (e) => {
    xp.filesystem.fs.root.getFile(name, {create: true}, function(fileEntry) {
      fileEntry.createWriter(function(fileWriter) {
        fileWriter.onwriteend = function(e) {
          callback();
        };
        fileWriter.onerror = function(e) {callback(e)};
        fileWriter.write(blob);
      }, function(e) {callback(e)});
    }, function(e) {callback(e)});
  });
}

xp.filesystem.moveFile = function(name, newname, callback) {
  xp.filesystem.fs.root.getFile(name, {create: false}, function(fileEntry) {
    xp.filesystem.fs.root.getDirectory(newname.substr(0, newname.lastIndexOf("/")), {}, function(dirEntry) {
      fileEntry.moveTo(dirEntry, newname.substr(newname.lastIndexOf("/") + 1, newname.length));
      setTimeout(() => callback(), 100);
    }, function(e) {callback(e)});
  }, function(e) {callback(e)});
}

xp.filesystem.moveDir = function(name, newname, callback) {
  xp.filesystem.fs.root.getDirectory(name, {create: false}, function(fileEntry) {
    xp.filesystem.fs.root.getDirectory(newname.substr(0, newname.lastIndexOf("/")), {}, function(dirEntry) {
      fileEntry.moveTo(dirEntry, newname.substr(newname.lastIndexOf("/") + 1, newname.length));
      setTimeout(() => callback(), 100);
    }, function(e) {callback(e)});
  }, function(e) {callback(e)});
}

xp.filesystem.copyFile = function(name, newname, callback) {
  xp.filesystem.fs.root.getFile(name, {create: false}, function(fileEntry) {
    xp.filesystem.fs.root.getDirectory(newname.substr(0, newname.lastIndexOf("/")), {}, function(dirEntry) {
      fileEntry.copyTo(dirEntry, newname.substr(newname.lastIndexOf("/") + 1, newname.length));
      setTimeout(() => callback(), 100);
    }, function(e) {callback(e)});
  }, function(e) {callback(e)});
}

xp.filesystem.copyDir = function(name, newname, callback) {
  xp.filesystem.fs.root.getDirectory(name, {create: false}, function(fileEntry) {
    xp.filesystem.fs.root.getDirectory(newname.substr(0, newname.lastIndexOf("/")), {}, function(dirEntry) {
      fileEntry.copyTo(dirEntry, newname.substr(newname.lastIndexOf("/") + 1, newname.length));
      setTimeout(() => callback(), 100);
    }, function(e) {callback(e)});
  }, function(e) {callback(e)});
}

xp.filesystem.toURL = function(name, callback) {
  xp.filesystem.fs.root.getFile(name, {create: false}, function(fileEntry) {
    callback(fileEntry.toURL());
  }, function(e) {callback("")});
}

xp.filesystem.getDir = function(_dir) {
  if (_dir === undefined)
    _dir = [""];
  var dir = _dir.join("/");
  if (dir === "") dir = "/";
  return dir;
}

xp.filesystem.addPaths = function(p1, p2) {
  var foo = p2.split("/");
  var bar = p1.split("/");
  foo.forEach(function(val, i) {
    if (val === "..") {
      bar.splice(-1,1)
    } else {
      bar = bar.concat(val);
    }
  });
  return xp.filesystem.getDir(bar).replace(/\/\/+/g, '/');
}

xp.filesystem.basename = function(str) {
  var base = new String(str).substring(str.lastIndexOf('/') + 1); 
  if(base.lastIndexOf(".") != -1)       
    base = base.substring(0, base.lastIndexOf("."));
  return base;
}

xp.filesystem.create = function(size, callback, ignoreerrors) {
  console.log('Loading idb.filesystem.min.js');
  xp.filesystem.type = 'system/idb.filesystem.js';
  $.getScript(
    'system/idb.filesystem.min.js',
    () => {
      window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
      window.directoryEntry = window.directoryEntry || window.webkitDirectoryEntry;
      function requestFs(grantedBytes) {
        console.log('Requesting persistent file system with size of ' + grantedBytes + ' bytes');
        window.requestFileSystem(PERSISTENT, grantedBytes, function(fs) {
          xp.filesystem.fs = fs;
          console.log('Request successful');
          callback();
        }, callback);
      }
      if (window.webkitStorageInfo === undefined) {
        requestFs(size);
      } else {
        window.webkitStorageInfo.requestQuota(PERSISTENT, size, requestFs, callback);
      }
    }
  );
  /*try {
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    window.directoryEntry = window.directoryEntry || window.webkitDirectoryEntry;
    function requestFs(grantedBytes) {
      console.log('Requesting persistent file system with size of ' + grantedBytes + ' bytes');
      window.requestFileSystem(PERSISTENT, grantedBytes, function(fs) {
        xp.filesystem.fs = fs;
        console.log('Request successful');
        callback();
      }, callback);
    }
    if (window.webkitStorageInfo === undefined) {
      requestFs(size);
    } else {
      window.webkitStorageInfo.requestQuota(PERSISTENT, size, requestFs, callback);
    }
  } catch(e) {
    if (ignoreerrors !== true) {
      console.log('Caught ' + e + ', reverting to idb.filesystem.js for storage');
      console.log('Loading ' + window.location.protocol + '//rawgit.com/ebidel/idb.filesystem.js/master/dist/idb.filesystem.min.js');
      xp.filesystem.type = 'idb.filesystem.js';
      $.getScript(
        window.location.protocol + '//rawgit.com/ebidel/idb.filesystem.js/master/dist/idb.filesystem.min.js',
        () => xp.filesystem.create(size, callback, true)
      );
    } else {
      console.log(e);
    }
  }*/
}