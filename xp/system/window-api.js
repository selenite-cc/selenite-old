function Window(args) {
  var htmlargs = '';
  args = args || [];
  htmlargs += 'width="' + (args.width || 480) + '"';
  htmlargs += 'height="' + (args.height || 360) + '"';
  htmlargs += 'title="' + (args.title ||'Unnamed Window') + '"';
  this.el = $($.parseHTML('<window ' + htmlargs + '></window>'));
  document.body.append(this.el[0]);
  this.el.updateWindow();
  if (args.canClose === false) {
    this.el.find('.close').remove();
  }
  if (args.canMinimize === false) {
    this.el.find('.minimize').remove();
  }
  if (args.canResize === false) {
    this.el.find('.maximize').remove();
    this.el.find('.resize').each(function() {
      $(this).remove();
    });
  }
  if (args.center) {
    this.el.css('left', window.innerWidth / 2 - this.el.width() / 2);
    this.el.css('top', window.innerHeight / 2 - this.el.height() / 2);
  }
}

Window.prototype.on = function(event, callback) {
  this.el.on(event, callback);
  console.log(this.el[0]);
  return this;
}

Window.prototype.close = function() {
  closeWindow(this.el.attr('guid'));
  return this;
}

Window.prototype.minimize = function() {
  minimizeWindow(this.el.attr('guid'));
  return this;
}

Window.prototype.maximize = function() {
  maximizeWindow(this.el.attr('guid'));
  return this;
}

Window.prototype.restore = function() {
  if (this.el.attr('maximized') === 'true')
    maximizeWindow(this.el.attr('guid'));
  if (this.el.attr('minimized') === 'true')
    minimizeWindow(this.el.attr('guid'));
  return this;
}

Window.prototype.content = function(content) {
  if (content === undefined) {
    return this.el.find('.windowBody').html();
  } else { 
    this.el.find('.windowBody').html(content);
    return this;
  }
}

Window.prototype.title = function(title) {
  if (title === undefined) {
    return this.el.attr('title');
  } else {
    this.el.setTitle(title);
    return this;
  }
}

Window.prototype.size = function(size) {
  if (size === undefined) {
    return [parseInt(this.el.attr('width')), parseInt(this.el.attr('height'))];
  } else {
    this.el.attr('width', size[0]);
    this.el.attr('height', size[1]);
    this.el.updateWindow();
    return this;
  }
}

Window.prototype.addMenu = function(name, items) {
  this.el.addMenu(name, items);
}