/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/babel-loader/lib/index.js?!./node_modules/scratch-vm/src/extension-support/tw-iframe-extension-worker-entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/scratch-vm/src/extension-support/tw-iframe-extension-worker-entry.js":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4!./node_modules/scratch-vm/src/extension-support/tw-iframe-extension-worker-entry.js ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {const context = __webpack_require__(/*! ./tw-extension-worker-context */ "./node_modules/scratch-vm/src/extension-support/tw-extension-worker-context.js");

const jQuery = __webpack_require__(/*! ./tw-jquery-shim */ "./node_modules/scratch-vm/src/extension-support/tw-jquery-shim.js");

global.$ = jQuery;
global.jQuery = jQuery;
const id = window.__WRAPPED_IFRAME_ID__;
context.isWorker = false;
context.centralDispatchService = {
  postMessage(message, transfer) {
    const data = {
      vmIframeId: id,
      message
    };

    if (transfer) {
      window.parent.postMessage(data, '*', transfer);
    } else {
      window.parent.postMessage(data, '*');
    }
  }

};

__webpack_require__(/*! ./extension-worker */ "./node_modules/scratch-vm/src/extension-support/extension-worker.js");

window.parent.postMessage({
  vmIframeId: id,
  ready: true
}, '*');
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/microee/index.js":
/*!***************************************!*\
  !*** ./node_modules/microee/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function M() { this._events = {}; }
M.prototype = {
  on: function(ev, cb) {
    this._events || (this._events = {});
    var e = this._events;
    (e[ev] || (e[ev] = [])).push(cb);
    return this;
  },
  removeListener: function(ev, cb) {
    var e = this._events[ev] || [], i;
    for(i = e.length-1; i >= 0 && e[i]; i--){
      if(e[i] === cb || e[i].cb === cb) { e.splice(i, 1); }
    }
  },
  removeAllListeners: function(ev) {
    if(!ev) { this._events = {}; }
    else { this._events[ev] && (this._events[ev] = []); }
  },
  listeners: function(ev) {
    return (this._events ? this._events[ev] || [] : []);
  },
  emit: function(ev) {
    this._events || (this._events = {});
    var args = Array.prototype.slice.call(arguments, 1), i, e = this._events[ev] || [];
    for(i = e.length-1; i >= 0 && e[i]; i--){
      e[i].apply(this, args);
    }
    return this;
  },
  when: function(ev, cb) {
    return this.once(ev, cb, true);
  },
  once: function(ev, cb, when) {
    if(!cb) return this;
    function c() {
      if(!when) this.removeListener(ev, c);
      if(cb.apply(this, arguments) && when) this.removeListener(ev, c);
    }
    c.cb = cb;
    this.on(ev, c);
    return this;
  }
};
M.mixin = function(dest) {
  var o = M.prototype, k;
  for (k in o) {
    o.hasOwnProperty(k) && (dest.prototype[k] = o[k]);
  }
};
module.exports = M;


/***/ }),

/***/ "./node_modules/minilog/lib/common/filter.js":
/*!***************************************************!*\
  !*** ./node_modules/minilog/lib/common/filter.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// default filter
var Transform = __webpack_require__(/*! ./transform.js */ "./node_modules/minilog/lib/common/transform.js");

var levelMap = { debug: 1, info: 2, warn: 3, error: 4 };

function Filter() {
  this.enabled = true;
  this.defaultResult = true;
  this.clear();
}

Transform.mixin(Filter);

// allow all matching, with level >= given level
Filter.prototype.allow = function(name, level) {
  this._white.push({ n: name, l: levelMap[level] });
  return this;
};

// deny all matching, with level <= given level
Filter.prototype.deny = function(name, level) {
  this._black.push({ n: name, l: levelMap[level] });
  return this;
};

Filter.prototype.clear = function() {
  this._white = [];
  this._black = [];
  return this;
};

function test(rule, name) {
  // use .test for RegExps
  return (rule.n.test ? rule.n.test(name) : rule.n == name);
};

Filter.prototype.test = function(name, level) {
  var i, len = Math.max(this._white.length, this._black.length);
  for(i = 0; i < len; i++) {
    if(this._white[i] && test(this._white[i], name) && levelMap[level] >= this._white[i].l) {
      return true;
    }
    if(this._black[i] && test(this._black[i], name) && levelMap[level] <= this._black[i].l) {
      return false;
    }
  }
  return this.defaultResult;
};

Filter.prototype.write = function(name, level, args) {
  if(!this.enabled || this.test(name, level)) {
    return this.emit('item', name, level, args);
  }
};

module.exports = Filter;


/***/ }),

/***/ "./node_modules/minilog/lib/common/minilog.js":
/*!****************************************************!*\
  !*** ./node_modules/minilog/lib/common/minilog.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Transform = __webpack_require__(/*! ./transform.js */ "./node_modules/minilog/lib/common/transform.js"),
    Filter = __webpack_require__(/*! ./filter.js */ "./node_modules/minilog/lib/common/filter.js");

var log = new Transform(),
    slice = Array.prototype.slice;

exports = module.exports = function create(name) {
  var o   = function() { log.write(name, undefined, slice.call(arguments)); return o; };
  o.debug = function() { log.write(name, 'debug', slice.call(arguments)); return o; };
  o.info  = function() { log.write(name, 'info',  slice.call(arguments)); return o; };
  o.warn  = function() { log.write(name, 'warn',  slice.call(arguments)); return o; };
  o.error = function() { log.write(name, 'error', slice.call(arguments)); return o; };
  o.log   = o.debug; // for interface compliance with Node and browser consoles
  o.suggest = exports.suggest;
  o.format = log.format;
  return o;
};

// filled in separately
exports.defaultBackend = exports.defaultFormatter = null;

exports.pipe = function(dest) {
  return log.pipe(dest);
};

exports.end = exports.unpipe = exports.disable = function(from) {
  return log.unpipe(from);
};

exports.Transform = Transform;
exports.Filter = Filter;
// this is the default filter that's applied when .enable() is called normally
// you can bypass it completely and set up your own pipes
exports.suggest = new Filter();

exports.enable = function() {
  if(exports.defaultFormatter) {
    return log.pipe(exports.suggest) // filter
              .pipe(exports.defaultFormatter) // formatter
              .pipe(exports.defaultBackend); // backend
  }
  return log.pipe(exports.suggest) // filter
            .pipe(exports.defaultBackend); // formatter
};



/***/ }),

/***/ "./node_modules/minilog/lib/common/transform.js":
/*!******************************************************!*\
  !*** ./node_modules/minilog/lib/common/transform.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var microee = __webpack_require__(/*! microee */ "./node_modules/microee/index.js");

// Implements a subset of Node's stream.Transform - in a cross-platform manner.
function Transform() {}

microee.mixin(Transform);

// The write() signature is different from Node's
// --> makes it much easier to work with objects in logs.
// One of the lessons from v1 was that it's better to target
// a good browser rather than the lowest common denominator
// internally.
// If you want to use external streams, pipe() to ./stringify.js first.
Transform.prototype.write = function(name, level, args) {
  this.emit('item', name, level, args);
};

Transform.prototype.end = function() {
  this.emit('end');
  this.removeAllListeners();
};

Transform.prototype.pipe = function(dest) {
  var s = this;
  // prevent double piping
  s.emit('unpipe', dest);
  // tell the dest that it's being piped to
  dest.emit('pipe', s);

  function onItem() {
    dest.write.apply(dest, Array.prototype.slice.call(arguments));
  }
  function onEnd() { !dest._isStdio && dest.end(); }

  s.on('item', onItem);
  s.on('end', onEnd);

  s.when('unpipe', function(from) {
    var match = (from === dest) || typeof from == 'undefined';
    if(match) {
      s.removeListener('item', onItem);
      s.removeListener('end', onEnd);
      dest.emit('unpipe');
    }
    return match;
  });

  return dest;
};

Transform.prototype.unpipe = function(from) {
  this.emit('unpipe', from);
  return this;
};

Transform.prototype.format = function(dest) {
  throw new Error([
    'Warning: .format() is deprecated in Minilog v2! Use .pipe() instead. For example:',
    'var Minilog = require(\'minilog\');',
    'Minilog',
    '  .pipe(Minilog.backends.console.formatClean)',
    '  .pipe(Minilog.backends.console);'].join('\n'));
};

Transform.mixin = function(dest) {
  var o = Transform.prototype, k;
  for (k in o) {
    o.hasOwnProperty(k) && (dest.prototype[k] = o[k]);
  }
};

module.exports = Transform;


/***/ }),

/***/ "./node_modules/minilog/lib/web/array.js":
/*!***********************************************!*\
  !*** ./node_modules/minilog/lib/web/array.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Transform = __webpack_require__(/*! ../common/transform.js */ "./node_modules/minilog/lib/common/transform.js"),
    cache = [ ];

var logger = new Transform();

logger.write = function(name, level, args) {
  cache.push([ name, level, args ]);
};

// utility functions
logger.get = function() { return cache; };
logger.empty = function() { cache = []; };

module.exports = logger;


/***/ }),

/***/ "./node_modules/minilog/lib/web/console.js":
/*!*************************************************!*\
  !*** ./node_modules/minilog/lib/web/console.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Transform = __webpack_require__(/*! ../common/transform.js */ "./node_modules/minilog/lib/common/transform.js");

var newlines = /\n+$/,
    logger = new Transform();

logger.write = function(name, level, args) {
  var i = args.length-1;
  if (typeof console === 'undefined' || !console.log) {
    return;
  }
  if(console.log.apply) {
    return console.log.apply(console, [name, level].concat(args));
  } else if(JSON && JSON.stringify) {
    // console.log.apply is undefined in IE8 and IE9
    // for IE8/9: make console.log at least a bit less awful
    if(args[i] && typeof args[i] == 'string') {
      args[i] = args[i].replace(newlines, '');
    }
    try {
      for(i = 0; i < args.length; i++) {
        args[i] = JSON.stringify(args[i]);
      }
    } catch(e) {}
    console.log(args.join(' '));
  }
};

logger.formatters = ['color', 'minilog'];
logger.color = __webpack_require__(/*! ./formatters/color.js */ "./node_modules/minilog/lib/web/formatters/color.js");
logger.minilog = __webpack_require__(/*! ./formatters/minilog.js */ "./node_modules/minilog/lib/web/formatters/minilog.js");

module.exports = logger;


/***/ }),

/***/ "./node_modules/minilog/lib/web/formatters/color.js":
/*!**********************************************************!*\
  !*** ./node_modules/minilog/lib/web/formatters/color.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Transform = __webpack_require__(/*! ../../common/transform.js */ "./node_modules/minilog/lib/common/transform.js"),
    color = __webpack_require__(/*! ./util.js */ "./node_modules/minilog/lib/web/formatters/util.js");

var colors = { debug: ['cyan'], info: ['purple' ], warn: [ 'yellow', true ], error: [ 'red', true ] },
    logger = new Transform();

logger.write = function(name, level, args) {
  var fn = console.log;
  if(console[level] && console[level].apply) {
    fn = console[level];
    fn.apply(console, [ '%c'+name+' %c'+level, color('gray'), color.apply(color, colors[level])].concat(args));
  }
};

// NOP, because piping the formatted logs can only cause trouble.
logger.pipe = function() { };

module.exports = logger;


/***/ }),

/***/ "./node_modules/minilog/lib/web/formatters/minilog.js":
/*!************************************************************!*\
  !*** ./node_modules/minilog/lib/web/formatters/minilog.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Transform = __webpack_require__(/*! ../../common/transform.js */ "./node_modules/minilog/lib/common/transform.js"),
    color = __webpack_require__(/*! ./util.js */ "./node_modules/minilog/lib/web/formatters/util.js"),
    colors = { debug: ['gray'], info: ['purple' ], warn: [ 'yellow', true ], error: [ 'red', true ] },
    logger = new Transform();

logger.write = function(name, level, args) {
  var fn = console.log;
  if(level != 'debug' && console[level]) {
    fn = console[level];
  }

  var subset = [], i = 0;
  if(level != 'info') {
    for(; i < args.length; i++) {
      if(typeof args[i] != 'string') break;
    }
    fn.apply(console, [ '%c'+name +' '+ args.slice(0, i).join(' '), color.apply(color, colors[level]) ].concat(args.slice(i)));
  } else {
    fn.apply(console, [ '%c'+name, color.apply(color, colors[level]) ].concat(args));
  }
};

// NOP, because piping the formatted logs can only cause trouble.
logger.pipe = function() { };

module.exports = logger;


/***/ }),

/***/ "./node_modules/minilog/lib/web/formatters/util.js":
/*!*********************************************************!*\
  !*** ./node_modules/minilog/lib/web/formatters/util.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hex = {
  black: '#000',
  red: '#c23621',
  green: '#25bc26',
  yellow: '#bbbb00',
  blue:  '#492ee1',
  magenta: '#d338d3',
  cyan: '#33bbc8',
  gray: '#808080',
  purple: '#708'
};
function color(fg, isInverse) {
  if(isInverse) {
    return 'color: #fff; background: '+hex[fg]+';';
  } else {
    return 'color: '+hex[fg]+';';
  }
}

module.exports = color;


/***/ }),

/***/ "./node_modules/minilog/lib/web/index.js":
/*!***********************************************!*\
  !*** ./node_modules/minilog/lib/web/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Minilog = __webpack_require__(/*! ../common/minilog.js */ "./node_modules/minilog/lib/common/minilog.js");

var oldEnable = Minilog.enable,
    oldDisable = Minilog.disable,
    isChrome = (typeof navigator != 'undefined' && /chrome/i.test(navigator.userAgent)),
    console = __webpack_require__(/*! ./console.js */ "./node_modules/minilog/lib/web/console.js");

// Use a more capable logging backend if on Chrome
Minilog.defaultBackend = (isChrome ? console.minilog : console);

// apply enable inputs from localStorage and from the URL
if(typeof window != 'undefined') {
  try {
    Minilog.enable(JSON.parse(window.localStorage['minilogSettings']));
  } catch(e) {}
  if(window.location && window.location.search) {
    var match = RegExp('[?&]minilog=([^&]*)').exec(window.location.search);
    match && Minilog.enable(decodeURIComponent(match[1]));
  }
}

// Make enable also add to localStorage
Minilog.enable = function() {
  oldEnable.call(Minilog, true);
  try { window.localStorage['minilogSettings'] = JSON.stringify(true); } catch(e) {}
  return this;
};

Minilog.disable = function() {
  oldDisable.call(Minilog);
  try { delete window.localStorage.minilogSettings; } catch(e) {}
  return this;
};

exports = module.exports = Minilog;

exports.backends = {
  array: __webpack_require__(/*! ./array.js */ "./node_modules/minilog/lib/web/array.js"),
  browser: Minilog.defaultBackend,
  localStorage: __webpack_require__(/*! ./localstorage.js */ "./node_modules/minilog/lib/web/localstorage.js"),
  jQuery: __webpack_require__(/*! ./jquery_simple.js */ "./node_modules/minilog/lib/web/jquery_simple.js")
};


/***/ }),

/***/ "./node_modules/minilog/lib/web/jquery_simple.js":
/*!*******************************************************!*\
  !*** ./node_modules/minilog/lib/web/jquery_simple.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Transform = __webpack_require__(/*! ../common/transform.js */ "./node_modules/minilog/lib/common/transform.js");

var cid = new Date().valueOf().toString(36);

function AjaxLogger(options) {
  this.url = options.url || '';
  this.cache = [];
  this.timer = null;
  this.interval = options.interval || 30*1000;
  this.enabled = true;
  this.jQuery = window.jQuery;
  this.extras = {};
}

Transform.mixin(AjaxLogger);

AjaxLogger.prototype.write = function(name, level, args) {
  if(!this.timer) { this.init(); }
  this.cache.push([name, level].concat(args));
};

AjaxLogger.prototype.init = function() {
  if(!this.enabled || !this.jQuery) return;
  var self = this;
  this.timer = setTimeout(function() {
    var i, logs = [], ajaxData, url = self.url;
    if(self.cache.length == 0) return self.init();
    // Test each log line and only log the ones that are valid (e.g. don't have circular references).
    // Slight performance hit but benefit is we log all valid lines.
    for(i = 0; i < self.cache.length; i++) {
      try {
        JSON.stringify(self.cache[i]);
        logs.push(self.cache[i]);
      } catch(e) { }
    }
    if(self.jQuery.isEmptyObject(self.extras)) {
        ajaxData = JSON.stringify({ logs: logs });
        url = self.url + '?client_id=' + cid;
    } else {
        ajaxData = JSON.stringify(self.jQuery.extend({logs: logs}, self.extras));
    }

    self.jQuery.ajax(url, {
      type: 'POST',
      cache: false,
      processData: false,
      data: ajaxData,
      contentType: 'application/json',
      timeout: 10000
    }).success(function(data, status, jqxhr) {
      if(data.interval) {
        self.interval = Math.max(1000, data.interval);
      }
    }).error(function() {
      self.interval = 30000;
    }).always(function() {
      self.init();
    });
    self.cache = [];
  }, this.interval);
};

AjaxLogger.prototype.end = function() {};

// wait until jQuery is defined. Useful if you don't control the load order.
AjaxLogger.jQueryWait = function(onDone) {
  if(typeof window !== 'undefined' && (window.jQuery || window.$)) {
    return onDone(window.jQuery || window.$);
  } else if (typeof window !== 'undefined') {
    setTimeout(function() { AjaxLogger.jQueryWait(onDone); }, 200);
  }
};

module.exports = AjaxLogger;


/***/ }),

/***/ "./node_modules/minilog/lib/web/localstorage.js":
/*!******************************************************!*\
  !*** ./node_modules/minilog/lib/web/localstorage.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Transform = __webpack_require__(/*! ../common/transform.js */ "./node_modules/minilog/lib/common/transform.js"),
    cache = false;

var logger = new Transform();

logger.write = function(name, level, args) {
  if(typeof window == 'undefined' || typeof JSON == 'undefined' || !JSON.stringify || !JSON.parse) return;
  try {
    if(!cache) { cache = (window.localStorage.minilog ? JSON.parse(window.localStorage.minilog) : []); }
    cache.push([ new Date().toString(), name, level, args ]);
    window.localStorage.minilog = JSON.stringify(cache);
  } catch(e) {}
};

module.exports = logger;

/***/ }),

/***/ "./node_modules/scratch-vm/src/dispatch/shared-dispatch.js":
/*!*****************************************************************!*\
  !*** ./node_modules/scratch-vm/src/dispatch/shared-dispatch.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const log = __webpack_require__(/*! ../util/log */ "./node_modules/scratch-vm/src/util/log.js");
/**
 * @typedef {object} DispatchCallMessage - a message to the dispatch system representing a service method call
 * @property {*} responseId - send a response message with this response ID. See {@link DispatchResponseMessage}
 * @property {string} service - the name of the service to be called
 * @property {string} method - the name of the method to be called
 * @property {Array|undefined} args - the arguments to be passed to the method
 */

/**
 * @typedef {object} DispatchResponseMessage - a message to the dispatch system representing the results of a call
 * @property {*} responseId - a copy of the response ID from the call which generated this response
 * @property {*|undefined} error - if this is truthy, then it contains results from a failed call (such as an exception)
 * @property {*|undefined} result - if error is not truthy, then this contains the return value of the call (if any)
 */

/**
 * @typedef {DispatchCallMessage|DispatchResponseMessage} DispatchMessage
 * Any message to the dispatch system.
 */

/**
 * The SharedDispatch class is responsible for dispatch features shared by
 * {@link CentralDispatch} and {@link WorkerDispatch}.
 */


class SharedDispatch {
  constructor() {
    /**
     * List of callback registrations for promises waiting for a response from a call to a service on another
     * worker. A callback registration is an array of [resolve,reject] Promise functions.
     * Calls to local services don't enter this list.
     * @type {Array.<Function[]>}
     */
    this.callbacks = [];
    /**
     * The next response ID to be used.
     * @type {int}
     */

    this.nextResponseId = 0;
  }
  /**
   * Call a particular method on a particular service, regardless of whether that service is provided locally or on
   * a worker. If the service is provided by a worker, the `args` will be copied using the Structured Clone
   * algorithm, except for any items which are also in the `transfer` list. Ownership of those items will be
   * transferred to the worker, and they should not be used after this call.
   * @example
   *      dispatcher.call('vm', 'setData', 'cat', 42);
   *      // this finds the worker for the 'vm' service, then on that worker calls:
   *      vm.setData('cat', 42);
   * @param {string} service - the name of the service.
   * @param {string} method - the name of the method.
   * @param {*} [args] - the arguments to be copied to the method, if any.
   * @returns {Promise} - a promise for the return value of the service method.
   */


  call(service, method, ...args) {
    return this.transferCall(service, method, null, ...args);
  }
  /**
   * Call a particular method on a particular service, regardless of whether that service is provided locally or on
   * a worker. If the service is provided by a worker, the `args` will be copied using the Structured Clone
   * algorithm, except for any items which are also in the `transfer` list. Ownership of those items will be
   * transferred to the worker, and they should not be used after this call.
   * @example
   *      dispatcher.transferCall('vm', 'setData', [myArrayBuffer], 'cat', myArrayBuffer);
   *      // this finds the worker for the 'vm' service, transfers `myArrayBuffer` to it, then on that worker calls:
   *      vm.setData('cat', myArrayBuffer);
   * @param {string} service - the name of the service.
   * @param {string} method - the name of the method.
   * @param {Array} [transfer] - objects to be transferred instead of copied. Must be present in `args` to be useful.
   * @param {*} [args] - the arguments to be copied to the method, if any.
   * @returns {Promise} - a promise for the return value of the service method.
   */


  transferCall(service, method, transfer, ...args) {
    try {
      const {
        provider,
        isRemote
      } = this._getServiceProvider(service);

      if (provider) {
        if (isRemote) {
          return this._remoteTransferCall(provider, service, method, transfer, ...args);
        }

        const result = provider[method].apply(provider, args);
        return Promise.resolve(result);
      }

      return Promise.reject(new Error("Service not found: ".concat(service)));
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Check if a particular service lives on another worker.
   * @param {string} service - the service to check.
   * @returns {boolean} - true if the service is remote (calls must cross a Worker boundary), false otherwise.
   * @private
   */


  _isRemoteService(service) {
    return this._getServiceProvider(service).isRemote;
  }
  /**
   * Like {@link call}, but force the call to be posted through a particular communication channel.
   * @param {object} provider - send the call through this object's `postMessage` function.
   * @param {string} service - the name of the service.
   * @param {string} method - the name of the method.
   * @param {*} [args] - the arguments to be copied to the method, if any.
   * @returns {Promise} - a promise for the return value of the service method.
   */


  _remoteCall(provider, service, method, ...args) {
    return this._remoteTransferCall(provider, service, method, null, ...args);
  }
  /**
   * Like {@link transferCall}, but force the call to be posted through a particular communication channel.
   * @param {object} provider - send the call through this object's `postMessage` function.
   * @param {string} service - the name of the service.
   * @param {string} method - the name of the method.
   * @param {Array} [transfer] - objects to be transferred instead of copied. Must be present in `args` to be useful.
   * @param {*} [args] - the arguments to be copied to the method, if any.
   * @returns {Promise} - a promise for the return value of the service method.
   */


  _remoteTransferCall(provider, service, method, transfer, ...args) {
    return new Promise((resolve, reject) => {
      const responseId = this._storeCallbacks(resolve, reject);
      /** @TODO: remove this hack! this is just here so we don't try to send `util` to a worker */
      // tw: upstream's logic is broken
      // Args is actually a 3 length list of [args, util, real block info]
      // We only want to send args. The others will throw errors when they try to be cloned


      if (args.length > 0 && typeof args[args.length - 1].func === 'function') {
        args.pop();
        args.pop();
      }

      if (transfer) {
        provider.postMessage({
          service,
          method,
          responseId,
          args
        }, transfer);
      } else {
        provider.postMessage({
          service,
          method,
          responseId,
          args
        });
      }
    });
  }
  /**
   * Store callback functions pending a response message.
   * @param {Function} resolve - function to call if the service method returns.
   * @param {Function} reject - function to call if the service method throws.
   * @returns {*} - a unique response ID for this set of callbacks. See {@link _deliverResponse}.
   * @protected
   */


  _storeCallbacks(resolve, reject) {
    const responseId = this.nextResponseId++;
    this.callbacks[responseId] = [resolve, reject];
    return responseId;
  }
  /**
   * Deliver call response from a worker. This should only be called as the result of a message from a worker.
   * @param {int} responseId - the response ID of the callback set to call.
   * @param {DispatchResponseMessage} message - the message containing the response value(s).
   * @protected
   */


  _deliverResponse(responseId, message) {
    try {
      const [resolve, reject] = this.callbacks[responseId];
      delete this.callbacks[responseId];

      if (message.error) {
        reject(message.error);
      } else {
        resolve(message.result);
      }
    } catch (e) {
      log.error("Dispatch callback failed: ".concat(e));
    }
  }
  /**
   * Handle a message event received from a connected worker.
   * @param {Worker} worker - the worker which sent the message, or the global object if running in a worker.
   * @param {MessageEvent} event - the message event to be handled.
   * @protected
   */


  _onMessage(worker, event) {
    /** @type {DispatchMessage} */
    const message = event.data;
    message.args = message.args || [];
    let promise;

    if (message.service) {
      if (message.service === 'dispatch') {
        promise = this._onDispatchMessage(worker, message);
      } else {
        promise = this.call(message.service, message.method, ...message.args);
      }
    } else if (typeof message.responseId === 'undefined') {
      log.error("Dispatch caught malformed message from a worker: ".concat(JSON.stringify(event)));
    } else {
      this._deliverResponse(message.responseId, message);
    }

    if (promise) {
      if (typeof message.responseId === 'undefined') {
        log.error("Dispatch message missing required response ID: ".concat(JSON.stringify(event)));
      } else {
        promise.then(result => worker.postMessage({
          responseId: message.responseId,
          result
        }), error => worker.postMessage({
          responseId: message.responseId,
          error: "".concat(error)
        }));
      }
    }
  }
  /**
   * Fetch the service provider object for a particular service name.
   * @abstract
   * @param {string} service - the name of the service to look up
   * @returns {{provider:(object|Worker), isRemote:boolean}} - the means to contact the service, if found
   * @protected
   */


  _getServiceProvider(service) {
    throw new Error("Could not get provider for ".concat(service, ": _getServiceProvider not implemented"));
  }
  /**
   * Handle a call message sent to the dispatch service itself
   * @abstract
   * @param {Worker} worker - the worker which sent the message.
   * @param {DispatchCallMessage} message - the message to be handled.
   * @returns {Promise|undefined} - a promise for the results of this operation, if appropriate
   * @private
   */


  _onDispatchMessage(worker, message) {
    throw new Error("Unimplemented dispatch message handler cannot handle ".concat(message.method, " method"));
  }

}

module.exports = SharedDispatch;

/***/ }),

/***/ "./node_modules/scratch-vm/src/dispatch/worker-dispatch.js":
/*!*****************************************************************!*\
  !*** ./node_modules/scratch-vm/src/dispatch/worker-dispatch.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const SharedDispatch = __webpack_require__(/*! ./shared-dispatch */ "./node_modules/scratch-vm/src/dispatch/shared-dispatch.js");

const log = __webpack_require__(/*! ../util/log */ "./node_modules/scratch-vm/src/util/log.js");

const {
  centralDispatchService
} = __webpack_require__(/*! ../extension-support/tw-extension-worker-context */ "./node_modules/scratch-vm/src/extension-support/tw-extension-worker-context.js");
/**
 * This class provides a Worker with the means to participate in the message dispatch system managed by CentralDispatch.
 * From any context in the messaging system, the dispatcher's "call" method can call any method on any "service"
 * provided in any participating context. The dispatch system will forward function arguments and return values across
 * worker boundaries as needed.
 * @see {CentralDispatch}
 */


class WorkerDispatch extends SharedDispatch {
  constructor() {
    super();
    /**
     * This promise will be resolved when we have successfully connected to central dispatch.
     * @type {Promise}
     * @see {waitForConnection}
     * @private
     */

    this._connectionPromise = new Promise(resolve => {
      this._onConnect = resolve;
    });
    /**
     * Map of service name to local service provider.
     * If a service is not listed here, it is assumed to be provided by another context (another Worker or the main
     * thread).
     * @see {setService}
     * @type {object}
     */

    this.services = {};
    this._onMessage = this._onMessage.bind(this, centralDispatchService);

    if (typeof self !== 'undefined') {
      self.onmessage = this._onMessage;
    }
  }
  /**
   * @returns {Promise} a promise which will resolve upon connection to central dispatch. If you need to make a call
   * immediately on "startup" you can attach a 'then' to this promise.
   * @example
   *      dispatch.waitForConnection.then(() => {
   *          dispatch.call('myService', 'hello');
   *      })
   */


  get waitForConnection() {
    return this._connectionPromise;
  }
  /**
   * Set a local object as the global provider of the specified service.
   * WARNING: Any method on the provider can be called from any worker within the dispatch system.
   * @param {string} service - a globally unique string identifying this service. Examples: 'vm', 'gui', 'extension9'.
   * @param {object} provider - a local object which provides this service.
   * @returns {Promise} - a promise which will resolve once the service is registered.
   */


  setService(service, provider) {
    if (this.services.hasOwnProperty(service)) {
      log.warn("Worker dispatch replacing existing service provider for ".concat(service));
    }

    this.services[service] = provider;
    return this.waitForConnection.then(() => this._remoteCall(centralDispatchService, 'dispatch', 'setService', service));
  }
  /**
   * Fetch the service provider object for a particular service name.
   * @override
   * @param {string} service - the name of the service to look up
   * @returns {{provider:(object|Worker), isRemote:boolean}} - the means to contact the service, if found
   * @protected
   */


  _getServiceProvider(service) {
    // if we don't have a local service by this name, contact central dispatch by calling `postMessage` on self
    const provider = this.services[service];
    return {
      provider: provider || centralDispatchService,
      isRemote: !provider
    };
  }
  /**
   * Handle a call message sent to the dispatch service itself
   * @override
   * @param {Worker} worker - the worker which sent the message.
   * @param {DispatchCallMessage} message - the message to be handled.
   * @returns {Promise|undefined} - a promise for the results of this operation, if appropriate
   * @protected
   */


  _onDispatchMessage(worker, message) {
    let promise;

    switch (message.method) {
      case 'handshake':
        promise = this._onConnect();
        break;

      case 'terminate':
        // Don't close until next tick, after sending confirmation back
        setTimeout(() => self.close(), 0);
        promise = Promise.resolve();
        break;

      default:
        log.error("Worker dispatch received message for unknown method: ".concat(message.method));
    }

    return promise;
  }

}

module.exports = new WorkerDispatch();

/***/ }),

/***/ "./node_modules/scratch-vm/src/extension-support/argument-type.js":
/*!************************************************************************!*\
  !*** ./node_modules/scratch-vm/src/extension-support/argument-type.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Block argument types
 * @enum {string}
 */
const ArgumentType = {
  /**
   * Numeric value with angle picker
   */
  ANGLE: 'angle',

  /**
   * Boolean value with hexagonal placeholder
   */
  BOOLEAN: 'Boolean',

  /**
   * Numeric value with color picker
   */
  COLOR: 'color',

  /**
   * Numeric value with text field
   */
  NUMBER: 'number',

  /**
   * String value with text field
   */
  STRING: 'string',

  /**
   * String value with matrix field
   */
  MATRIX: 'matrix',

  /**
   * MIDI note number with note picker (piano) field
   */
  NOTE: 'note',

  /**
   * Inline image on block (as part of the label)
   */
  IMAGE: 'image'
};
module.exports = ArgumentType;

/***/ }),

/***/ "./node_modules/scratch-vm/src/extension-support/block-type.js":
/*!*********************************************************************!*\
  !*** ./node_modules/scratch-vm/src/extension-support/block-type.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Types of block
 * @enum {string}
 */
const BlockType = {
  /**
   * Boolean reporter with hexagonal shape
   */
  BOOLEAN: 'Boolean',

  /**
   * A button (not an actual block) for some special action, like making a variable
   */
  BUTTON: 'button',

  /**
   * Command block
   */
  COMMAND: 'command',

  /**
   * Specialized command block which may or may not run a child branch
   * The thread continues with the next block whether or not a child branch ran.
   */
  CONDITIONAL: 'conditional',

  /**
   * Specialized hat block with no implementation function
   * This stack only runs if the corresponding event is emitted by other code.
   */
  EVENT: 'event',

  /**
   * Hat block which conditionally starts a block stack
   */
  HAT: 'hat',

  /**
   * Specialized command block which may or may not run a child branch
   * If a child branch runs, the thread evaluates the loop block again.
   */
  LOOP: 'loop',

  /**
   * General reporter with numeric or string value
   */
  REPORTER: 'reporter'
};
module.exports = BlockType;

/***/ }),

/***/ "./node_modules/scratch-vm/src/extension-support/extension-worker.js":
/*!***************************************************************************!*\
  !*** ./node_modules/scratch-vm/src/extension-support/extension-worker.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/* eslint-env worker */
const ArgumentType = __webpack_require__(/*! ../extension-support/argument-type */ "./node_modules/scratch-vm/src/extension-support/argument-type.js");

const BlockType = __webpack_require__(/*! ../extension-support/block-type */ "./node_modules/scratch-vm/src/extension-support/block-type.js");

const dispatch = __webpack_require__(/*! ../dispatch/worker-dispatch */ "./node_modules/scratch-vm/src/dispatch/worker-dispatch.js");

const log = __webpack_require__(/*! ../util/log */ "./node_modules/scratch-vm/src/util/log.js");

const TargetType = __webpack_require__(/*! ../extension-support/target-type */ "./node_modules/scratch-vm/src/extension-support/target-type.js");

const {
  isWorker
} = __webpack_require__(/*! ./tw-extension-worker-context */ "./node_modules/scratch-vm/src/extension-support/tw-extension-worker-context.js");

const loadScripts = url => {
  if (isWorker) {
    importScripts(url);
  } else {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');

      script.onload = () => resolve();

      script.onerror = () => {
        reject(new Error("Error in sandboxed script: ".concat(url, ". Check the console for more information.")));
      };

      script.src = url;
      document.body.appendChild(script);
    });
  }
};

class ExtensionWorker {
  constructor() {
    this.nextExtensionId = 0;
    this.initialRegistrations = [];
    this.firstRegistrationPromise = new Promise(resolve => {
      this.firstRegistrationCallback = resolve;
    });
    dispatch.waitForConnection.then(() => {
      dispatch.call('extensions', 'allocateWorker').then(async x => {
        const [id, extension] = x;
        this.workerId = id;

        try {
          await loadScripts(extension);
          await this.firstRegistrationPromise;
          const initialRegistrations = this.initialRegistrations;
          this.initialRegistrations = null;
          Promise.all(initialRegistrations).then(() => dispatch.call('extensions', 'onWorkerInit', id));
        } catch (e) {
          log.error(e);
          dispatch.call('extensions', 'onWorkerInit', id, "".concat(e));
        }
      });
    });
    this.extensions = [];
  }

  register(extensionObject) {
    const extensionId = this.nextExtensionId++;
    this.extensions.push(extensionObject);
    const serviceName = "extension.".concat(this.workerId, ".").concat(extensionId);
    const promise = dispatch.setService(serviceName, extensionObject).then(() => dispatch.call('extensions', 'registerExtensionService', serviceName));

    if (this.initialRegistrations) {
      this.firstRegistrationCallback();
      this.initialRegistrations.push(promise);
    }

    return promise;
  }

}

global.Scratch = global.Scratch || {};
global.Scratch.ArgumentType = ArgumentType;
global.Scratch.BlockType = BlockType;
global.Scratch.TargetType = TargetType;
/**
 * Expose only specific parts of the worker to extensions.
 */

const extensionWorker = new ExtensionWorker();
global.Scratch.extensions = {
  register: extensionWorker.register.bind(extensionWorker)
};
global.ScratchExtensions = __webpack_require__(/*! ./tw-scratchx-compatibility-layer */ "./node_modules/scratch-vm/src/extension-support/tw-scratchx-compatibility-layer.js");
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/scratch-vm/src/extension-support/target-type.js":
/*!**********************************************************************!*\
  !*** ./node_modules/scratch-vm/src/extension-support/target-type.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Default types of Target supported by the VM
 * @enum {string}
 */
const TargetType = {
  /**
   * Rendered target which can move, change costumes, etc.
   */
  SPRITE: 'sprite',

  /**
   * Rendered target which cannot move but can change backdrops
   */
  STAGE: 'stage'
};
module.exports = TargetType;

/***/ }),

/***/ "./node_modules/scratch-vm/src/extension-support/tw-extension-worker-context.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/scratch-vm/src/extension-support/tw-extension-worker-context.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  isWorker: true,
  // centralDispatchService is the object to call postMessage() on to send a message to parent.
  centralDispatchService: self
};

/***/ }),

/***/ "./node_modules/scratch-vm/src/extension-support/tw-jquery-shim.js":
/*!*************************************************************************!*\
  !*** ./node_modules/scratch-vm/src/extension-support/tw-jquery-shim.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * @fileoverview
 * Many ScratchX extensions require jQuery to do things like loading scripts and making requests.
 * The real jQuery is pretty large and we'd rather not bring in everything, so this file reimplements
 * small stubs of a few jQuery methods.
 * It's just supposed to be enough to make existing ScratchX extensions work, nothing more.
 */
const log = __webpack_require__(/*! ../util/log */ "./node_modules/scratch-vm/src/util/log.js");

const jQuery = () => {
  throw new Error('Not implemented');
};

jQuery.getScript = (src, callback) => {
  const script = document.createElement('script');
  script.src = src;

  if (callback) {
    // We don't implement callback arguments.
    script.onload = () => callback();
  }

  document.body.appendChild(script);
};
/**
 * @param {Record<string, any>|undefined} obj
 * @returns {URLSearchParams}
 */


const objectToQueryString = obj => {
  const params = new URLSearchParams();

  if (obj) {
    for (const key of Object.keys(obj)) {
      params.set(key, obj[key]);
    }
  }

  return params;
};

let jsonpCallback = 0;

jQuery.ajax = async (arg1, arg2) => {
  let options = {};

  if (arg1 && arg2) {
    options = arg2;
    options.url = arg1;
  } else if (arg1) {
    options = arg1;
  }

  const urlParameters = objectToQueryString(options.data);

  const getFinalURL = () => {
    const query = urlParameters.toString();
    let url = options.url;

    if (query) {
      url += "?".concat(query);
    } // Forcibly upgrade all HTTP requests to HTTPS so that they don't error on HTTPS sites
    // All the extensions we care about work fine with this


    if (url.startsWith('http://')) {
      url = url.replace('http://', 'https://');
    }

    return url;
  };

  const successCallback = result => {
    if (options.success) {
      options.success(result);
    }
  };

  const errorCallback = error => {
    log.error(error);

    if (options.error) {
      // The error object we provide here might not match what jQuery provides but it's enough to
      // prevent extensions from throwing errors trying to access properties.
      options.error(error);
    }
  };

  try {
    if (options.dataType === 'jsonp') {
      const callbackName = "_jsonp_callback".concat(jsonpCallback++);

      global[callbackName] = data => {
        delete global[callbackName];
        successCallback(data);
      };

      const callbackParameterName = options.jsonp || 'callback';
      urlParameters.set(callbackParameterName, callbackName);
      jQuery.getScript(getFinalURL());
      return;
    }

    if (options.dataType === 'script') {
      jQuery.getScript(getFinalURL(), successCallback);
      return;
    }

    const res = await fetch(getFinalURL(), {
      headers: options.headers
    }); // dataType defaults to "Intelligent Guess (xml, json, script, or html)"
    // It happens that all the ScratchX extensions we care about either set dataType to "json" or
    // leave it blank and implicitly request JSON, so this works good enough for now.

    successCallback(await res.json());
  } catch (e) {
    errorCallback(e);
  }
};

module.exports = jQuery;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/scratch-vm/src/extension-support/tw-scratchx-compatibility-layer.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/scratch-vm/src/extension-support/tw-scratchx-compatibility-layer.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// ScratchX API Documentation: https://github.com/LLK/scratchx/wiki/
// Global Scratch API from extension-worker.js

/* globals Scratch */
const ArgumentType = __webpack_require__(/*! ./argument-type */ "./node_modules/scratch-vm/src/extension-support/argument-type.js");

const BlockType = __webpack_require__(/*! ./block-type */ "./node_modules/scratch-vm/src/extension-support/block-type.js");

const {
  argumentIndexToId,
  generateExtensionId
} = __webpack_require__(/*! ./tw-scratchx-utilities */ "./node_modules/scratch-vm/src/extension-support/tw-scratchx-utilities.js");
/**
 * @typedef ScratchXDescriptor
 * @property {unknown[][]} blocks
 * @property {Record<string, unknown[]>} [menus]
 * @property {string} [url]
 * @property {string} [displayName]
 */

/**
 * @typedef ScratchXStatus
 * @property {0|1|2} status 0 is red/error, 1 is yellow/not ready, 2 is green/ready
 * @property {string} msg
 */


const parseScratchXBlockType = type => {
  if (type === '' || type === ' ' || type === 'w') {
    return {
      type: BlockType.COMMAND,
      async: type === 'w'
    };
  }

  if (type === 'r' || type === 'R') {
    return {
      type: BlockType.REPORTER,
      async: type === 'R'
    };
  }

  if (type === 'b') {
    return {
      type: BlockType.BOOLEAN,
      // ScratchX docs don't seem to mention boolean reporters that wait
      async: false
    };
  }

  if (type === 'h') {
    return {
      type: BlockType.HAT,
      async: false
    };
  }

  throw new Error("Unknown ScratchX block type: ".concat(type));
};

const isScratchCompatibleValue = v => typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean';
/**
 * @param {string} argument ScratchX argument with leading % removed.
 * @param {unknown} defaultValue Default value, if any
 */


const parseScratchXArgument = (argument, defaultValue) => {
  const result = {};
  const hasDefaultValue = isScratchCompatibleValue(defaultValue);

  if (hasDefaultValue) {
    result.defaultValue = defaultValue;
  } // TODO: ScratchX docs don't mention support for boolean arguments?


  if (argument === 's') {
    result.type = ArgumentType.STRING;

    if (!hasDefaultValue) {
      result.defaultValue = '';
    }
  } else if (argument === 'n') {
    result.type = ArgumentType.NUMBER;

    if (!hasDefaultValue) {
      result.defaultValue = 0;
    }
  } else if (argument[0] === 'm') {
    result.type = ArgumentType.STRING;
    const split = argument.split(/\.|:/);
    const menuName = split[1];
    result.menu = menuName;
  } else {
    throw new Error("Unknown ScratchX argument type: ".concat(argument));
  }

  return result;
};

const wrapScratchXFunction = (originalFunction, argumentCount, async) => args => {
  // Convert Scratch 3's argument object to an argument list expected by ScratchX
  const argumentList = [];

  for (let i = 0; i < argumentCount; i++) {
    argumentList.push(args[argumentIndexToId(i)]);
  }

  if (async) {
    return new Promise(resolve => {
      originalFunction(...argumentList, resolve);
    });
  }

  return originalFunction(...argumentList);
};
/**
 * @param {string} name
 * @param {ScratchXDescriptor} descriptor
 * @param {Record<string, () => unknown>} functions
 */


const convert = (name, descriptor, functions) => {
  const extensionId = generateExtensionId(name);
  const info = {
    id: extensionId,
    name: descriptor.displayName || name,
    blocks: [],
    color1: '#4a4a5e',
    color2: '#31323f',
    color3: '#191a21'
  };
  const scratch3Extension = {
    getInfo: () => info,
    _getStatus: functions._getStatus
  };

  if (descriptor.url) {
    info.docsURI = descriptor.url;
  }

  for (const blockDescriptor of descriptor.blocks) {
    if (blockDescriptor.length === 1) {
      // Separator
      info.blocks.push('---');
      continue;
    }

    const scratchXBlockType = blockDescriptor[0];
    const blockText = blockDescriptor[1];
    const functionName = blockDescriptor[2];
    const defaultArgumentValues = blockDescriptor.slice(3);
    let scratchText = '';
    const argumentInfo = [];
    const blockTextParts = blockText.split(/%([\w.:]+)/g);

    for (let i = 0; i < blockTextParts.length; i++) {
      const part = blockTextParts[i];
      const isArgument = i % 2 === 1;

      if (isArgument) {
        parseScratchXArgument(part);
        const argumentIndex = Math.floor(i / 2).toString();
        const argumentDefaultValue = defaultArgumentValues[argumentIndex];
        const argumentId = argumentIndexToId(argumentIndex);
        argumentInfo[argumentId] = parseScratchXArgument(part, argumentDefaultValue);
        scratchText += "[".concat(argumentId, "]");
      } else {
        scratchText += part;
      }
    }

    const scratch3BlockType = parseScratchXBlockType(scratchXBlockType);
    const blockInfo = {
      opcode: functionName,
      blockType: scratch3BlockType.type,
      text: scratchText,
      arguments: argumentInfo
    };
    info.blocks.push(blockInfo);
    const originalFunction = functions[functionName];
    const argumentCount = argumentInfo.length;
    scratch3Extension[functionName] = wrapScratchXFunction(originalFunction, argumentCount, scratch3BlockType.async);
  }

  const menus = descriptor.menus;

  if (menus) {
    const scratch3Menus = {};

    for (const menuName of Object.keys(menus) || {}) {
      const menuItems = menus[menuName];
      const menuInfo = {
        items: menuItems
      };
      scratch3Menus[menuName] = menuInfo;
    }

    info.menus = scratch3Menus;
  }

  return scratch3Extension;
};

const extensionNameToExtension = new Map();

const register = (name, descriptor, functions) => {
  const scratch3Extension = convert(name, descriptor, functions);
  extensionNameToExtension.set(name, scratch3Extension);
  Scratch.extensions.register(scratch3Extension);
};
/**
 * @param {string} extensionName
 * @returns {ScratchXStatus}
 */


const getStatus = extensionName => {
  const extension = extensionNameToExtension.get(extensionName);

  if (extension) {
    return extension._getStatus();
  }

  return {
    status: 0,
    msg: 'does not exist'
  };
};

module.exports = {
  register,
  getStatus,
  // For tests
  convert
};

/***/ }),

/***/ "./node_modules/scratch-vm/src/extension-support/tw-scratchx-utilities.js":
/*!********************************************************************************!*\
  !*** ./node_modules/scratch-vm/src/extension-support/tw-scratchx-utilities.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @fileoverview
 * General ScratchX-related utilities used in multiple places.
 * Changing these functions may break projects.
 */

/**
 * @param {string} scratchXName
 * @returns {string}
 */
const generateExtensionId = scratchXName => {
  const sanitizedName = scratchXName.replace(/[^a-z0-9]/gi, '').toLowerCase();
  return "sbx".concat(sanitizedName);
};
/**
 * @param {number} i 0-indexed index of argument in list
 * @returns {string} Scratch 3 argument name
 */


const argumentIndexToId = i => i.toString();

module.exports = {
  generateExtensionId,
  argumentIndexToId
};

/***/ }),

/***/ "./node_modules/scratch-vm/src/util/log.js":
/*!*************************************************!*\
  !*** ./node_modules/scratch-vm/src/util/log.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const minilog = __webpack_require__(/*! minilog */ "./node_modules/minilog/lib/web/index.js");

minilog.enable();
module.exports = minilog('vm');

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

/******/ });
//# sourceMappingURL=extension worker.js.map