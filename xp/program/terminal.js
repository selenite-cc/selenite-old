var terminalicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACOUlEQVRYhe2Xv2sTYRjHP8/lvSRN27QipUr9UQLFLhVLRVrN4CQ5cKjg6uIgpQgObi6d+0/o0NHBpZCAVQqigw4VC9GAixAbpNGmMUnT/LjXoV4IJk3AXFLBfuG45w6e5/u55+6euxf+U4kTGEdiPzOjWFoyDkiu3ptDzAfjI9MWWqRdbif6sv3uhbGXe+zPbL0NFgM/U6nVgvLJ5dfjE2MycWmym94EzX1Ob47M5zOF+cTGk4WMKqwCBTU+OSYJdYrEx0zHJgN+xcObE6zH08STWRZvhFiPpwl+WuOResYd7vLhcxa/Lfd1pRIHvqpE31kYGurYHACfB0wvDA7Aibp4eBhKXuYC22z09yO71WBVjGnglbp2DsJX+twBAIr8YDYEsyGzFhMKs0KYQeDk5hp5W5uGiBdAhdUWy9cvugbQThdurZAXEWxtwFG9hnU6BmgAiEQiaK1rWyQSaUjSWncPIBqNYlkWIoJlWUSj0aaJzcBcAQCIxWK1vdRNZ+fKW4G5AnCYHBgH0I0uNAVwCjvPQzO51QXVrrBlWbVYa93QBef8YZI2H9gGgD/ve6tiznE7k1b69+bAMcAxQK+l0rtlpqamemaYK9u/B4doAPXyfarI+UVTS6+6UcDQdr7iMfYBVCr+dEFKxduCDoJuGExdUEWQHY/HnwRQYujnVY+8Mcu2F1s8Xbc3dLXis4umLmYB1F5VfT9Tyu2UywUDRrvuD98wdcBOju5X4GCR2NXlWBu592v1t/oFx8vJxHIFQMwAAAAASUVORK5CYII=';

$(window).on('xpboot', () => {
  xp.applications.add("terminal", () => {
        var guid = generate_guid();
        var el = $.parseHTML(`<window title="Terminal" width="720" height="480">
        <div class="ui_terminal" id="terminal_` + guid + `"></div>
      </window>`);
        document.body.appendChild(el[0]);
        el = $(el);
        el.updateWindow();
        $("#terminal_" + guid).terminal(function(command) {
            var term = this;
            if (command !== '') {
                try {
                  var args = command.split(" ");
                  if (this.dir === undefined)
                    this.dir = [""];
                  if (args[0] === "ls") {
                    xp.filesystem.listDir(xp.filesystem.getDir(this.dir), function(e){if(e){term.echo(e)}});
                  } else if (args[0] === "cd") {
                    if (args[1] === undefined) {
                      this.error("Not enough arguments");
                    } else {
                      let input = args.slice(1).join(' ');
                      if (input !== ".") {
                        if (input.charAt(0) === "/") {
                          this.dir = input.split("/");
                        } else {
                          var foo = input.split("/");
                          var _this = this;
                          foo.forEach(function(val, i) {
                            if (val === "..") {
                              _this.dir.splice(-1,1)
                            } else {
                              _this.dir = _this.dir.concat(val);
                            }
                          });
                        }
                      }
                    }
                  } else if (args[0] === "pwd") {
                    this.echo(xp.filesystem.getDir(this.dir));
                  } else if (args[0] === "touch") {
                    xp.filesystem.createFile(xp.filesystem.addPaths(xp.filesystem.getDir(this.dir), args[1]), function(e){if(e){term.echo(e)}});
                  } else if (args[0] === "rm") {
                    xp.filesystem.deleteFile(xp.filesystem.addPaths(xp.filesystem.getDir(this.dir), args[1]), function(e){if(e){term.echo(e)}});
                  } else if (args[0] === "mkdir") {
                    xp.filesystem.createDir(xp.filesystem.addPaths(xp.filesystem.getDir(this.dir), args[1]), function(e){if(e){term.echo(e)}});
                  } else if (args[0] === "rmdir") {
                    xp.filesystem.deleteDir(xp.filesystem.addPaths(xp.filesystem.getDir(this.dir), args[1]), function(e){if(e){term.echo(e)}});
                  } else if (args[0] === "cat") {
                    xp.filesystem.readFile(xp.filesystem.addPaths(xp.filesystem.getDir(this.dir), args[1]), function(e){if(e){term.echo(e)}});
                  } else if (args[0] === "help") {
                    this.echo("DE: XPerience");
                    this.echo("Kernel: RXP vOS.2023");
                    this.echo("Shell: JQuery Terminal");
                    this.echo("GitHub: github.com/shoaib-jamal/RebornXP");
                    this.echo("\nInstalled applications:");
                    var foo = "";
                    for (var name in xp.applications.apps) {
                      foo += name + ", ";
                    }
                    foo = foo.slice(0, -2);
                    this.echo(foo);
                    this.echo("\nSystem commands:");
                    this.echo("ls, cd, pwd, touch, rm, mkdir, rmdir, cat, help");
                  } else if (xp.applications.apps[args[0]] !== undefined) {
                    xp.applications.apps[args[0]]([xp.filesystem.getDir(this.dir)].concat(args.slice(1)));
                  } else {
                    var result = window.eval(command);
                    if (result !== undefined) {
                        this.echo(new String(result));
                    }
                  }
                } catch(e) {
                    this.error(new String(e));
                }
            } else {
               this.echo('');
            }
        }, {
            greetings: `
    RebornXP [vOS.2023]
    (c) RebornXP Open-Source Project. All rights reserved.
`,
            name: 'xpjs_terminal',
            width: '100%',
            height: '100%',
            prompt: '> '
        });
  });
  xp.startmenu.add("terminal", "Terminal", terminalicon);
});
