(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([["addon-entry-hide-flyout"],{

/***/ "./node_modules/css-loader/index.js!./src/addons/addons/hide-flyout/style.css":
/*!***************************************************************************!*\
  !*** ./node_modules/css-loader!./src/addons/addons/hide-flyout/style.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "[class*=\"gui_tabs_\"] {\n  /* overridden by other addons */\n  --sa-category-width: 60px;\n  --sa-flyout-width: 250px;\n}\n\n/* The default left-side border does not work properly when a block is being dragged, */\n/* which lets a 1 pixel column of the flyout be visible. */\n/* To fix this we use two elements that are only visible when a block is being dragged. */\n/* The first element is opaque to cover up the contents with the background color. */\n/* The other element is the transparent border color. */\n.sa-flyout-border-1,\n.sa-flyout-border-2 {\n  position: absolute;\n  /* Above flyout but below add extension button */\n  z-index: 40;\n  top: 0;\n  bottom: 8px;\n  left: -1px;\n}\n[dir=\"rtl\"] .sa-flyout-border-1,\n[dir=\"rtl\"] .sa-flyout-border-2 {\n  left: auto;\n  right: -1px;\n}\n.sa-flyout-border-1 {\n  border-left: 1px solid var(--ui-primary, hsla(215, 100%, 95%, 1));\n}\n.sa-flyout-border-2 {\n  border-left: 1px solid var(--ui-black-transparent, rgba(0, 0, 0, 0.15));\n}\n\n.blocklyFlyout,\n.blocklyFlyoutScrollbar {\n  transition-property: margin;\n}\n\n[dir=\"ltr\"] .blocklyFlyout.sa-flyoutClose,\n[dir=\"ltr\"] .blocklyFlyoutScrollbar.sa-flyoutClose {\n  margin-left: calc(0px - var(--sa-flyout-width) - 10px);\n}\n\n[dir=\"rtl\"] .blocklyFlyout.sa-flyoutClose,\n[dir=\"rtl\"] .blocklyFlyoutScrollbar.sa-flyoutClose {\n  margin-left: calc(var(--sa-flyout-width) + 10px);\n}\n\n.sa-flyout-placeHolder {\n  display: var(--hideFlyout-placeholderDisplay) !important;\n  position: absolute;\n  height: 100%;\n  width: calc(var(--sa-flyout-width) + 1px);\n  top: 0;\n}\n\n[dir=\"ltr\"] .sa-flyout-placeHolder {\n  left: calc(var(--sa-category-width) + 1px);\n}\n\n[dir=\"rtl\"] .sa-flyout-placeHolder {\n  right: calc(var(--sa-category-width) + 1px);\n}\n\n.sa-lock-object {\n  display: var(--hideFlyout-lockDisplay) !important;\n  transform: translate(calc(var(--sa-flyout-width) - 15px - 32px), 3px);\n  width: 32px;\n  height: 32px;\n}\n[dir=\"rtl\"] .sa-lock-object {\n  transform: translate(15px, 3px);\n}\n\n.sa-lock-button {\n  display: flex;\n  cursor: pointer;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--ui-primary, white);\n  border: 1px solid var(--ui-black-transparent, rgba(0, 0, 0, 0.15));\n  border-radius: 4px;\n}\n\n.sa-lock-object.locked .sa-lock-button {\n  background-color: #ff4c4c;\n  border-color: #cc4c4c;\n}\n\n.sa-lock-button img {\n  width: 20px;\n}\n\n[theme=\"dark\"] .sa-lock-button img {\n  filter: brightness(200%);\n}\n\n/* Setting these styles on gui_stage-and-target-wrapper breaks full screen */\n[class*=\"gui_body-wrapper_\" ] [class*=\"stage-wrapper_stage-wrapper_\"]:not([class*=\"stage-wrapper_full-screen\"]),\n[class*=\"gui_target-wrapper_\"] {\n  position: relative;\n  padding-inline: 0.5rem;\n  background-color: var(--ui-primary, hsl(215, 100%, 95%));\n}\n/* Both must be above hidden flyout when dragging block with editor-stage-left enabled */\n/* Both must be above category list when columns is enabled so dragged sprites appear aren't obscured */\n/* Stage wrapper must be above target pane so dragged sprites aren't obscured */\n[class*=\"gui_body-wrapper_\" ] [class*=\"stage-wrapper_stage-wrapper_\"]:not([class*=\"stage-wrapper_full-screen\"]) {\n  z-index: 50;\n}\n[class*=\"gui_target-wrapper_\"] {\n  z-index: 49;\n}\n\n[class*=\"gui_stage-and-target-wrapper_\"] {\n  padding: 0;\n}\n\n/* https://github.com/ScratchAddons/ScratchAddons/issues/4896 */\n.Popover {\n  /* Above stage wrapper and target pane */\n  /* See editor-stage-left */\n  z-index: 51;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/url-loader/dist/cjs.js!./src/addons/addons/hide-flyout/lock.svg":
/*!**************************************************************************************!*\
  !*** ./node_modules/url-loader/dist/cjs.js!./src/addons/addons/hide-flyout/lock.svg ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGFyaWEtaGlkZGVuPSJ0cnVlIiB3aWR0aD0iMWVtIiBoZWlnaHQ9IjFlbSIgc3R5bGU9Ii1tcy10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik0xMiAxM2ExIDEgMCAwIDAtMSAxdjNhMSAxIDAgMCAwIDIgMHYtM2ExIDEgMCAwIDAtMS0xem01LTRWN0E1IDUgMCAwIDAgNyA3djJhMyAzIDAgMCAwLTMgM3Y3YTMgMyAwIDAgMCAzIDNoMTBhMyAzIDAgMCAwIDMtM3YtN2EzIDMgMCAwIDAtMy0zek05IDdhMyAzIDAgMCAxIDYgMHYySDl6bTkgMTJhMSAxIDAgMCAxLTEgMUg3YTEgMSAwIDAgMS0xLTF2LTdhMSAxIDAgMCAxIDEtMWgxMGExIDEgMCAwIDEgMSAxeiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==");

/***/ }),

/***/ "./node_modules/url-loader/dist/cjs.js!./src/addons/addons/hide-flyout/unlock.svg":
/*!****************************************************************************************!*\
  !*** ./node_modules/url-loader/dist/cjs.js!./src/addons/addons/hide-flyout/unlock.svg ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGFyaWEtaGlkZGVuPSJ0cnVlIiB3aWR0aD0iMWVtIiBoZWlnaHQ9IjFlbSIgc3R5bGU9Ii1tcy10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik0xMiAxM2ExLjQ5IDEuNDkgMCAwIDAtMSAyLjYxVjE3YTEgMSAwIDAgMCAyIDB2LTEuMzlBMS40OSAxLjQ5IDAgMCAwIDEyIDEzem01LTRIOVY3YTMgMyAwIDAgMSA1LjEyLTIuMTMgMy4wOCAzLjA4IDAgMCAxIC43OCAxLjM4IDEgMSAwIDEgMCAxLjk0LS41IDUuMDkgNS4wOSAwIDAgMC0xLjMxLTIuMjlBNSA1IDAgMCAwIDcgN3YyYTMgMyAwIDAgMC0zIDN2N2EzIDMgMCAwIDAgMyAzaDEwYTMgMyAwIDAgMCAzLTN2LTdhMyAzIDAgMCAwLTMtM3ptMSAxMGExIDEgMCAwIDEtMSAxSDdhMSAxIDAgMCAxLTEtMXYtN2ExIDEgMCAwIDEgMS0xaDEwYTEgMSAwIDAgMSAxIDF6IiBmaWxsPSIjNTc1ZTc1Ii8+PC9zdmc+");

/***/ }),

/***/ "./src/addons/addons/hide-flyout/_runtime_entry.js":
/*!*********************************************************!*\
  !*** ./src/addons/addons/hide-flyout/_runtime_entry.js ***!
  \*********************************************************/
/*! exports provided: resources */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resources", function() { return resources; });
/* harmony import */ var _userscript_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./userscript.js */ "./src/addons/addons/hide-flyout/userscript.js");
/* harmony import */ var _css_loader_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! css-loader!./style.css */ "./node_modules/css-loader/index.js!./src/addons/addons/hide-flyout/style.css");
/* harmony import */ var _css_loader_style_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_style_css__WEBPACK_IMPORTED_MODULE_1__);
/* generated by pull.js */


const resources = {
  "userscript.js": _userscript_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  "style.css": _css_loader_style_css__WEBPACK_IMPORTED_MODULE_1___default.a
};

/***/ }),

/***/ "./src/addons/addons/hide-flyout/userscript.js":
/*!*****************************************************!*\
  !*** ./src/addons/addons/hide-flyout/userscript.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _url_loader_lock_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! url-loader!./lock.svg */ "./node_modules/url-loader/dist/cjs.js!./src/addons/addons/hide-flyout/lock.svg");
/* harmony import */ var _url_loader_unlock_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! url-loader!./unlock.svg */ "./node_modules/url-loader/dist/cjs.js!./src/addons/addons/hide-flyout/unlock.svg");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* inserted by pull.js */



const _twGetAsset = path => {
  if (path === "/lock.svg") return _url_loader_lock_svg__WEBPACK_IMPORTED_MODULE_0__["default"];
  if (path === "/unlock.svg") return _url_loader_unlock_svg__WEBPACK_IMPORTED_MODULE_1__["default"];
  throw new Error("Unknown asset: ".concat(path));
};

/* harmony default export */ __webpack_exports__["default"] = (async function ({
  addon,
  global,
  console,
  msg
}) {
  let placeHolderDiv = null;
  let lockObject = null;
  let lockButton = null;
  let lockIcon = null;
  let flyOut = null;
  let scrollBar = null;
  let toggle = false;
  let flyoutLock = false;
  let closeOnMouseUp = false;
  let scrollAnimation = true;
  const SVG_NS = "http://www.w3.org/2000/svg";
  const Blockly = await addon.tab.traps.getBlockly();

  const updateCSSVariables = () => {
    const mode = getToggleSetting();
    const modeToLockDisplay = {
      hover: "flex",
      cathover: "flex",
      category: "none"
    };
    document.documentElement.style.setProperty('--hideFlyout-lockDisplay', modeToLockDisplay[mode]);
    const modeToPlaceholderDisplay = {
      hover: "block",
      cathover: "none",
      category: "none"
    };
    document.documentElement.style.setProperty('--hideFlyout-placeholderDisplay', modeToPlaceholderDisplay[mode]);
  };

  addon.settings.addEventListener("change", updateCSSVariables);
  updateCSSVariables();

  function getSpeedValue() {
    let data = {
      none: "0",
      short: "0.25",
      default: "0.5",
      long: "1"
    };
    return data[addon.settings.get("speed")];
  }

  function getToggleSetting() {
    return addon.settings.get("toggle");
  }

  function setTransition(speed) {
    for (let element of [flyOut, scrollBar]) {
      element.style.transitionDuration = "".concat(speed, "s");
    }
  }

  function removeTransition() {
    for (let element of [flyOut, scrollBar]) {
      element.style.removeProperty("transition-duration");
    }
  }

  function updateLockDisplay() {
    lockObject.classList.toggle("locked", flyoutLock);
    lockButton.title = flyoutLock ? msg("unlock") : msg("lock");
    lockIcon.src = _twGetAsset("/".concat(flyoutLock ? "" : "un", "lock.svg"));
  }

  function onmouseenter(e, speed = {}) {
    // If a mouse event was passed, only open flyout if the workspace isn't being dragged
    if (!e || e.buttons === 0 || document.querySelector(".blocklyToolboxDiv").className.includes("blocklyToolboxDelete")) {
      speed = typeof speed === "object" ? getSpeedValue() : speed;
      setTransition(speed);
      flyOut.classList.remove("sa-flyoutClose");
      scrollBar.classList.remove("sa-flyoutClose");
      setTimeout(() => {
        Blockly.getMainWorkspace().recordCachedAreas();
        removeTransition();
      }, speed * 1000);
    }

    closeOnMouseUp = false; // only close if the mouseup event happens outside the flyout
  }

  function onmouseleave(e, speed = getSpeedValue()) {
    if (flyoutLock) return;

    if (e && e.buttons) {
      // dragging a block or scrollbar
      closeOnMouseUp = true;
      return;
    }

    setTransition(speed);
    flyOut.classList.add("sa-flyoutClose");
    scrollBar.classList.add("sa-flyoutClose");
    setTimeout(() => {
      Blockly.getMainWorkspace().recordCachedAreas();
      removeTransition();
    }, speed * 1000);
  }

  let didOneTimeSetup = false;

  function doOneTimeSetup() {
    if (didOneTimeSetup) {
      return;
    }

    didOneTimeSetup = true;
    addon.tab.redux.initialize();
    addon.tab.redux.addEventListener("statechanged", e => {
      switch (e.detail.action.type) {
        // Event casted when you switch between tabs
        case "scratch-gui/navigation/ACTIVATE_TAB":
          // always 0, 1, 2
          const toggleSetting = getToggleSetting();

          if (e.detail.action.activeTabIndex === 0 && !addon.self.disabled && (toggleSetting === "hover" || toggleSetting === "cathover")) {
            onmouseleave(null, 0);
            toggle = false;
          }

          break;
      }
    });
    document.body.addEventListener("mouseup", () => {
      if (closeOnMouseUp) {
        onmouseleave();
        closeOnMouseUp = false;
      }
    });

    if (addon.self.enabledLate && getToggleSetting() === "category") {
      Blockly.getMainWorkspace().getToolbox().selectedItem_.setSelected(false);
    }

    addon.self.addEventListener("disabled", () => {
      Blockly.getMainWorkspace().getToolbox().selectedItem_.setSelected(true); // update workspace dimensions

      Blockly.svgResize(Blockly.getMainWorkspace());
    });
    addon.self.addEventListener("reenabled", () => {
      if (getToggleSetting() === "category") {
        Blockly.getMainWorkspace().getToolbox().selectedItem_.setSelected(false);
        onmouseleave(null, 0);
        toggle = false;
      } // update workspace dimensions


      Blockly.svgResize(Blockly.getMainWorkspace());
    });
    addon.settings.addEventListener("change", () => {
      if (addon.self.disabled) return;

      if (getToggleSetting() === "category") {
        // switching to category click mode
        // close the flyout unless it's locked
        if (flyoutLock) {
          toggle = true;
          flyoutLock = false;
          updateLockDisplay();
        } else {
          Blockly.getMainWorkspace().getToolbox().selectedItem_.setSelected(false);
          onmouseleave(null, 0);
          toggle = false;
        }
      } else {
        onmouseleave();
        Blockly.getMainWorkspace().getToolbox().selectedItem_.setSelected(true);
      } // update workspace dimensions


      Blockly.svgResize(Blockly.getMainWorkspace());
    }); // category click mode

    const oldSetSelectedItem = Blockly.Toolbox.prototype.setSelectedItem;

    Blockly.Toolbox.prototype.setSelectedItem = function (item, shouldScroll = true) {
      const previousSelection = this.selectedItem_;
      oldSetSelectedItem.call(this, item, shouldScroll);
      if (addon.self.disabled || getToggleSetting() !== "category") return;

      if (!shouldScroll) {
        // ignore initial selection when updating the toolbox
        item.setSelected(false);
      } else if (item === previousSelection) {
        toggle = !toggle;
        if (toggle) onmouseenter();else {
          onmouseleave();
          item.setSelected(false);
        }
      } else if (!toggle) {
        scrollAnimation = false;
        toggle = true;
        onmouseenter();
      }
    };

    const oldSelectCategoryById = Blockly.Toolbox.prototype.selectCategoryById;

    Blockly.Toolbox.prototype.selectCategoryById = function (...args) {
      // called after populating the toolbox
      // ignore if the palette is closed
      if (!addon.self.disabled && getToggleSetting() === "category" && !toggle) return;
      return oldSelectCategoryById.call(this, ...args);
    };

    const oldStepScrollAnimation = Blockly.Flyout.prototype.stepScrollAnimation;

    Blockly.Flyout.prototype.stepScrollAnimation = function (...args) {
      // scrolling should not be animated when opening the flyout in category click mode
      if (!scrollAnimation) {
        this.scrollbar_.set(this.scrollTarget);
        this.scrollTarget = null;
        scrollAnimation = true;
        return;
      }

      return oldStepScrollAnimation.apply(this, args);
    }; // add flyout size to the workspace dimensions


    const oldGetMetrics = Blockly.WorkspaceSvg.getTopLevelWorkspaceMetrics_;

    Blockly.WorkspaceSvg.getTopLevelWorkspaceMetrics_ = function () {
      var _this$getToolbox, _this$getToolbox$flyo;

      const metrics = oldGetMetrics.call(this);
      if (addon.self.disabled || getToggleSetting() === "hover" || this.RTL) return metrics;

      if (((_this$getToolbox = this.getToolbox()) === null || _this$getToolbox === void 0 ? void 0 : (_this$getToolbox$flyo = _this$getToolbox.flyout_) === null || _this$getToolbox$flyo === void 0 ? void 0 : _this$getToolbox$flyo.getWidth()) === 310) {
        // columns is enabled
        return metrics;
      }

      return _objectSpread(_objectSpread({}, metrics), {}, {
        absoluteLeft: metrics.absoluteLeft - 250,
        viewWidth: metrics.viewWidth + 250
      });
    };

    if (Blockly.getMainWorkspace()) Blockly.getMainWorkspace().getMetrics = Blockly.WorkspaceSvg.getTopLevelWorkspaceMetrics_;
  }

  while (true) {
    flyOut = await addon.tab.waitForElement(".blocklyFlyout", {
      markAsSeen: true,
      reduxEvents: ["scratch-gui/mode/SET_PLAYER", "scratch-gui/locales/SELECT_LOCALE", "fontsLoaded/SET_FONTS_LOADED"],
      reduxCondition: state => !state.scratchGui.mode.isPlayerOnly
    });
    scrollBar = document.querySelector(".blocklyFlyoutScrollbar");
    const blocksWrapper = document.querySelector('[class*="gui_blocks-wrapper_"]');
    const injectionDiv = document.querySelector(".injectionDiv"); // Code editor left border

    const borderElement1 = document.createElement("div");
    borderElement1.className = "sa-flyout-border-1";
    addon.tab.displayNoneWhileDisabled(borderElement1);
    injectionDiv.appendChild(borderElement1);
    const borderElement2 = document.createElement("div");
    borderElement2.className = "sa-flyout-border-2";
    addon.tab.displayNoneWhileDisabled(borderElement2);
    injectionDiv.appendChild(borderElement2); // Placeholder Div

    if (placeHolderDiv) placeHolderDiv.remove();
    placeHolderDiv = document.createElement("div");
    blocksWrapper.appendChild(placeHolderDiv);
    placeHolderDiv.className = "sa-flyout-placeHolder";
    placeHolderDiv.style.display = "none"; // overridden by userstyle if the addon is enabled
    // Lock image

    if (lockObject) lockObject.remove();
    lockObject = document.createElementNS(SVG_NS, "foreignObject");
    lockObject.setAttribute("class", "sa-lock-object");
    lockObject.style.display = "none"; // overridden by userstyle if the addon is enabled

    lockButton = document.createElement("button");
    lockButton.className = "sa-lock-button";
    lockIcon = document.createElement("img");
    lockIcon.alt = "";
    updateLockDisplay();

    lockButton.onclick = () => {
      flyoutLock = !flyoutLock;
      updateLockDisplay();
    };

    lockButton.appendChild(lockIcon);
    lockObject.appendChild(lockButton);
    flyOut.appendChild(lockObject);
    onmouseleave(null, 0);
    toggle = false;
    const toolbox = document.querySelector(".blocklyToolboxDiv");
    const addExtensionButton = document.querySelector("[class^=gui_extension-button-container_]");

    for (let element of [toolbox, addExtensionButton, flyOut, scrollBar]) {
      element.onmouseenter = e => {
        const toggleSetting = getToggleSetting();
        if (!addon.self.disabled && (toggleSetting === "hover" || toggleSetting === "cathover")) onmouseenter(e);
      };

      element.onmouseleave = e => {
        const toggleSetting = getToggleSetting();
        if (!addon.self.disabled && (toggleSetting === "hover" || toggleSetting === "cathover")) onmouseleave(e);
      };
    }

    placeHolderDiv.onmouseenter = e => {
      if (!addon.self.disabled && getToggleSetting() === "hover") onmouseenter(e);
    };

    placeHolderDiv.onmouseleave = e => {
      if (!addon.self.disabled && getToggleSetting() === "hover") onmouseleave(e);
    };

    doOneTimeSetup();

    if (getToggleSetting() !== "hover") {
      // update workspace dimensions
      Blockly.svgResize(Blockly.getMainWorkspace());
    }
  }
});

/***/ })

}]);
//# sourceMappingURL=addon-entry-hide-flyout.js.map