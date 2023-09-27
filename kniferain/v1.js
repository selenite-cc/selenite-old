var api;

if (typeof window !== "undefined" && !window.famobi) {
    ! function(a, b) {
        var famobi = {

                orientationChangeCallback: null,
                brandingLogo: null,
                config: null,
                reached_home: false,
                splashComplete: false,

                init: function() {

                    return new Promise(function(resolve, reject) {
                        this.log("init...");

                        this.game.init();

                        this.includeCSS("html5games/gameapi/v1/play.css");
                        this.includeCSS("https://swagapi.shockwave.com/dist/swag-api.css");

                        window.famobi_gameJS.unshift("html5games/gameapi/detection.js");
                        window.famobi_gameJS.unshift("html5games/gameapi/zepto.min.js");
                        window.famobi_gameJS.unshift("html5games/gameapi/famobi_analytics_v1.js");
                        window.famobi_gameJS.unshift("https://swagapi.shockwave.com/dist/swag-api.js");

                        // orientation change
                        window.addEventListener("orientationchange", function() {
                            if (typeof this.orientationChangeCallback == "function") {
                                this.orientationChangeCallback();
                            }
                        }.bind(this), false);

                        // famobi.json
                        if(!this.config) {
                            readTextFile("famobi.json", function(text){
                                var data = JSON.parse(text);

                                if(!data.game_i18n) {
                                    console.error("famobi.json: field name 'game_i18n' is missing. For more information please visit: https://sites.google.com/a/famobi.com/api-docs/api-implementation/localization");
                                    return;
                                }
                                this.config = data;

                                // aid
                                var aid = this.getUrlParams()["fg_aid"];
                                if(typeof aid !== "undefined") {
                                    this.config.aid = aid;
                                }

                                window.famobi_multiplayer = this.config.features.multiplayer || false;

                                window.addEventListener("famobi_tracking_screen",(e)=>{
                                  if(this.config.autoShowMenuScreens && this.config.autoShowMenuScreens.includes(e.detail.screen))
                                  {
                                    this.reached_home = true;
                                    setTimeout(()=>{                            //<< DIRTY FIX
                                    if(this.splashComplete)window.famobi.menu.show();},1000); //Menu wouldn't reopen because of some timing issue where it was immediatellzy closed after this command ran, so now the call is delayed by 1 second - performance wise not the best option
                                  }
                                })
                                if(this.config.show_splash && this.config.show_splash !== "api") this.showSplashScreen(()=>{
                                  this.splashComplete = true;
                                  if(this.reached_home)window.famobi.menu.show();
                                });

                                var getGameTitle = function() {
                                    String.prototype.replaceAll = function(search, replacement) {
                                        var target = this;
                                        return target.split(search).join(replacement);
                                    };
                                    function toTitleCase(str) {
                                        return str.replace(/\w\S*/g, function(txt){
                                            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                        });
                                    }
                                    return toTitleCase(window.famobi_gameID.replaceAll("-", " "));
                                };

                                document.title = this.config.title || getGameTitle();

                                if(this.config.swagAPIOverlay) {

                                    var swagAPIOverlayDiv = document.createElement("div");
                                    swagAPIOverlayDiv.setAttribute("id", "swagAPIOverlay");
                                    swagAPIOverlayDiv.classList.add("swag-api-wrapper");

                                    document.body.appendChild(swagAPIOverlayDiv);

                                    swagAPIOverlayDiv.addEventListener("touchstart",
                                    function(t) {
                                         t.stopPropagation();
                                    });
                                    swagAPIOverlayDiv.addEventListener("touchend",
                                    function(t) {
                                         t.stopPropagation();
                                    });
                                    swagAPIOverlayDiv.addEventListener("touchmove",
                                    function(t) {
                                         t.stopPropagation();
                                    });
                                }

                                if(!document.getElementsByClassName("swag-api-wrapper").length) {
                                    var wrapperList = [
                                        document.getElementById("canvasHolder"),
                                        document.getElementById("c2canvasdiv"),
                                        document.getElementById("canvas-wrapper"),
                                        document.getElementsByTagName("canvas")[0],
                                        document.body
                                    ];

                                    for(var i = 0; i < wrapperList.length; i++) {
                                        if(wrapperList[i]) {
                                            wrapperList[i].classList.add("swag-api-wrapper");
                                            break;
                                        }
                                    }

                                    if(["jewelish-blitz", "bubble-woods", "jungle-run"].indexOf(window.famobi_gameID) >= 0) {
                                      let theGreatObserver = new MutationObserver(function(mutations) {
                                        mutations.forEach(function(mutation) {
                                          mutation.addedNodes.forEach((node)=> {
                                            if(node.id === "swag-dialog-wrapper")
                                            {
                                              //console.log(">> Found changes for swag-dialog-wrapper");
                                              node.addEventListener("touchstart",
                                              function(t) {
                                                   t.stopPropagation();
                                              });
                                              node.addEventListener("touchend",
                                              function(t) {
                                                   t.stopPropagation();
                                              });
                                              node.addEventListener("touchmove",
                                              function(t) {
                                                   t.stopPropagation();
                                              });
                                            }
                                          });
                                        });
                                      });

                                      theGreatObserver.observe(document.querySelector('.swag-api-wrapper'),{childList:true});
                                    }
                                }

                                resolve(true);

                            }.bind(this));
                        }

                        function readTextFile(file, callback) {
                            var rawFile = new XMLHttpRequest();
                            rawFile.overrideMimeType("application/json");
                            rawFile.open("GET", file, true);
                            rawFile.onreadystatechange = function() {
                                if (rawFile.readyState === 4 && rawFile.status == "200") {
                                    callback(rawFile.responseText);
                                }
                            };
                            rawFile.send(null);
                        }
                    }.bind(this));
                },

                forceAd: function(callback) {

                    this.showAd(callback);
                },

                rewardedAd: function(callback) {

                    if (typeof callback == "function") {
                        callback();
                    }
                },

                showAd: function(callback) {

                    this.log("showing ad...");
                    this.game.pause();

                    api.showAd().then(function(){

                        this.log("ad finished");

                        if (typeof callback == "function") {
                            callback();
                        }

                        setTimeout(function() {
                            this.game.resume();
                        }.bind(this), 100);

                    }.bind(this), function(){

                        this.log("ad finished");

                        if (typeof callback == "function") {
                            callback();
                        }

                        setTimeout(function() {
                            this.game.resume();
                        }.bind(this), 100);

                    }.bind(this));
                },

                // Localization
                gametranslation: {

                    init: function() {
                        window.famobi.gametranslation.curLangString = window.famobi.gametranslation.getUserLang();

                        // Always fall back to 'en' when the user locale is not supported or translated
                        if (window.famobi.gametranslation.getSupportedLanguages().indexOf(window.famobi.gametranslation.curLangString) === -1) {
                            window.famobi.gametranslation.curLangString = "en";
                        }

                        window.famobi.gametranslation.translationData = window.famobi.gametranslation.getGameTranslations();

                        window.famobi.gametranslation.translateHtml(faZepto("body"));
                    },

                    getSupportedLanguages: function() {
                        return window.famobi.config.languages || Object.keys(window.famobi.config.game_i18n) || [];
                    },

                    getGameTranslations: function() {
                        var i18n = window.famobi.config.game_i18n,
                            lang = window.famobi.gametranslation.curLangString;

                        if (i18n.current) {
                            return i18n.current;
                        }

                        faZepto.each(i18n, function(language, translations) {
                            faZepto.each(translations, function(key, value) {
                                if (value == null) {
                                    i18n[language][key] = "";
                                } else if (typeof i18n[language][key] === "string") {
                                    i18n[language][key] = value.replace(/\{lang\}/g, language);
                                }
                            });
                        });

                        i18n.current = faZepto.extend(
                            {},
                            i18n["default"],
                            i18n[window.famobi.config.aid + ".default"],
                            i18n[lang],
                            i18n[window.famobi.config.aid + "." + lang]
                        );

                        return (window.famobi.config.game_i18n.current = i18n.current);
                    },

                    translateString: function(key) {
                        return window.famobi.gametranslation.translationData.hasOwnProperty(key)
                            ? window.famobi.gametranslation.translationData[key]
                            : null;
                    },

                    getNavigatorLocale: function() {
                        var language = "";

                        if (navigator.languages && window.famobi.sizeOf(navigator.languages)) {
                            language = navigator.languages[0];
                        } else if (navigator.language) {
                            language = navigator.language;
                        } else if (navigator.userLanguage) {
                            language = navigator.userLanguage;
                        } else if (navigator.browserLanguage) {
                            language = navigator.browserLanguage;
                        }

                        return language;
                    },

                    getNavigatorLanguage: function() {
                        return window.famobi.gametranslation.getNavigatorLocale().substr(0, 2);
                    },

                    getUserLang: function() {
                        var urlParams = window.famobi.getUrlParams(),
                            lang = window.famobi.gametranslation.getNavigatorLanguage();

                        if (urlParams.locale && urlParams.locale.length == 2) {
                            return urlParams.locale;
                        }

                        switch (lang) {
                            case "ch":
                            case "at":
                                return "de";
                            default:
                                return lang;
                        }
                    },

                    translateHtml: function($selector) {
                        $selector.find("[data-i18n]").each(function() {
                            var textkey = this.getAttribute("data-i18n");
                            this.innerHTML = window.famobi.gametranslation.translateString(textkey);
                        });
                        return $selector;
                    }
                },

                __: function(key) {

                    switch(key) {
                        case "test_preload_image":
                            return "html5games/images/testPreloadImage.png";
                        case "preload_image":
                            return "html5games/images/" + (this.config.preload_image || "preloadImage") + ".png";
                        default:
                            // do nothing
                    }

                    var lang = this.getCurrentLanguage();

                    if(this.config.game_i18n) {

                        if(this.config.game_i18n[lang]) {
                            this.config.game_i18n[lang] = Object.assign(this.config.game_i18n[lang], this.config.game_i18n[this.config.aid+"."+lang]);
                        }

                        if(this.config.game_i18n[lang] && this.config.game_i18n[lang][key]) {
                            if(typeof this.config.game_i18n[lang][key] === "string") {
                                return this.config.game_i18n[lang][key].replace("{lang}", lang);
                            }
                            return this.config.game_i18n[lang][key];
                        }

                        if(this.config.game_i18n.default) {
                            this.config.game_i18n.default = Object.assign(this.config.game_i18n.default, this.config.game_i18n[this.config.aid+".default"]);
                        }

                        if(this.config.game_i18n.default && this.config.game_i18n.default[key]) {
                            if(typeof this.config.game_i18n.default[key] === "string") {
                                return this.config.game_i18n.default[key].replace("{lang}", lang);
                            }
                            return this.config.game_i18n.default[key];
                        }
                    }

                    this.warn("No translation found for '" + key + "'");
                    return null;
                },

                getAbsolutePath: function(relativePath) {
                    var absolutePath =
                        document.location.protocol + "//" + document.location.pathname;

                    // this method is only used for compatibility with Loaders in Cordova Apps,
                    // otherwise absolute URIs with https://games.cdn.famobi.com are used
                    if (document.location.protocol !== "file:") {
                        return relativePath;
                    }

                    if (relativePath.startsWith("/")) {
                        relativePath = relativePath.substr(1);
                    }

                    return (
                        absolutePath.substr(0, absolutePath.lastIndexOf("/") + 1) + relativePath
                    );
                },

                getCurrentLanguage: function() {

                    var locale;

                    try{
                        locale = new URL(window.location.href).searchParams.get("locale") ;
                    } catch(e) {
                        console.error(e);
                    }

                    return locale || (navigator.language || navigator.userLanguage).substr(0, 2);
                },

                showSplashScreen: function(pCallback, pShowTill_EVENT, pModal) {
                  console.log("famobi splash");
                  if(!document.getElementById("famobi_splash")) {
                    //Splash Screen doesn't exist yet - Creating new Splash Screen from files in html5games/splash
                    function readSplashFile(file, callback) {
                        var rawFile = new XMLHttpRequest();
                        rawFile.overrideMimeType("application/xhtml+xml");
                        rawFile.open("GET", file, true);
                        rawFile.onreadystatechange = function() {
                            if (rawFile.readyState === 4 && rawFile.status == "200") {
                                callback(rawFile.responseText);
                            }
                        };
                        rawFile.send(null);
                    }
                    readSplashFile("html5games/splash/splash.html",(response)=>{
                      this.includeCSS("html5games/splash/splash.css");
                      let splashScreen = document.createElement("div");
                      splashScreen.classList.add("splash-screen");
                      splashScreen.style.position = "absolute";
                      splashScreen.style.top = "0";
                      splashScreen.style.left = "0";
                      splashScreen.style.width = "100%";
                      splashScreen.style.height = "100%";
                      splashScreen.innerHTML = response;
                      if(this.config.preload_image)splashScreen.querySelector(".logo").src = "html5games/images/"+this.config.preload_image+".png";
                      document.body.appendChild(splashScreen);
                      this.splashScreen = splashScreen;
                      if(pModal) return;      //Show Modal does not define a closing condition and will keep the splash visible untill hideSplash is called manually
                      if(!pShowTill_EVENT) {
                        setTimeout(()=>this.hideSplashScreen(pCallback),this.config.splash_duration);
                      } else {
                        window.addEventListener(pShowTill_EVENT,()=>this.hideSplashScreen(pCallback));
                      }
                    });
                  }
                  else {
                    //Splash Screen already exists, just need to reenable it.
                    splashScreen.style.display = "block";
                    splashScreen.style.animation = splashScreen._orgAni;
                    if(pModal) return;      //Show Modal does not define a closing condition and will keep the splash visible untill hideSplash is called manually
                    if(!pShowTill_EVENT) {
                      setTimeout(()=>this.hideSplashScreen(pCallback),this.config.splash_duration);
                    } else {
                      window.removeEventListener(pShowTill_EVENT,()=>this.hideSplashScreen(pCallback));
                      window.addEventListener(pShowTill_EVENT,()=>this.hideSplashScreen(pCallback));
                    }
                  }
                },

                hideSplashScreen: function(pCallback) {
                  this.splashScreen.style.display = "none";
                  if(!this.splashScreen._orgAni)this.splashScreen._orgAni = this.splashScreen.style.animation;  //This saves the original animation - this is required to be able to rerun the animation the next time the splash is shown
                  this.splashScreen.style.animation = "none";
                  if(pCallback)pCallback(this.splashScreen);
                },

                menu: {
                    create: function() {
                        window.famobi.menu.rootElement = document.getElementById("fg-root");
                        window.famobi.menu.bodyElement = document.getElementsByTagName("body")[0];
                        window.famobi.menu.headElement = document.getElementsByTagName("head")[0];

                        if (!window.famobi.menu.rootElement) {
                            window.famobi.menu.rootElement = document.createElement("div");
                            window.famobi.menu.rootElement.setAttribute("id", "fg-root");
                            window.famobi.menu.rootElement.classList.add("fg_root");
                            window.famobi.menu.rootElement.style = "color: #999;font-weight:normal;";

                            document.body.insertBefore(window.famobi.menu.rootElement, document.body.firstChild);
                        }

                        // overlay
                        window.famobi.menu.fgOverlay = document.createElement("div");
                        window.famobi.menu.fgOverlay.setAttribute("id","fg-overlay");

                        if (window.famobi.config.overlay_position)
                            window.famobi.menu.fgOverlay.className =
                                "overlay-" +
                                window.famobi.config.overlay_position +
                                " clip-" +
                                window.famobi.config.overlay_position;

                        if (
                            window.famobi.config.overlay_distance &&
                            window.famobi.config.overlay_distance !== ""
                        ) {
                            if (
                                window.famobi.config.overlay_position &&
                                window.famobi.config.overlay_position == "bottom"
                            )
                                window.famobi.menu.fgOverlay.style.bottom = isNaN(
                                    window.famobi.config.overlay_distance
                                )
                                    ? window.famobi.config.overlay_distance
                                    : window.famobi.config.overlay_distance + "px";
                            else
                                window.famobi.menu.fgOverlay.style.top = isNaN(
                                    window.famobi.config.overlay_distance
                                )
                                    ? window.famobi.config.overlay_distance
                                    : window.famobi.config.overlay_distance + "px";
                        }

                        window.famobi.menu.rootElement.appendChild(window.famobi.menu.fgOverlay);

                        window.famobi.menu.fgOverlay.innerHTML = '<header id="fg-header"><div class="fg-clip" id="fg-clip"><div class="fg-clip-btn"><span></span></div></div></header>';

                        window.famobi.menu.fgNavigation = document.createElement("nav");
                        window.famobi.menu.fgNavigation.style.position = "relative";
                        window.famobi.menu.fgNavigation.setAttribute("id", "fg-navigation");

                        window.famobi.menu.fgOverlay.appendChild(window.famobi.menu.fgNavigation);
                        window.famobi.menu.fgOverlay_visible = false;
                        window.famobi.menu.fgHeader = document.getElementById("fg-header");

                        faZepto("#fg-clip, #fg-logo").each(function() {
                            window.famobi.menu.handleClick(this, window.famobi.menu.toggleOverlay);
                        });

                        let currlang = window.famobi.getCurrentLanguage();
                        //console.log("currlang: "+currlang);
                        let langButtons = "";

                        if(window.famobi.config.supportedLanguages && window.famobi.config.supportedLanguages.length > 1) {

                            langButtons = '<ul class="fg-langs">';
                            let lang = "";

                            for(let i = 0; i < window.famobi.config.supportedLanguages.length; i++) {
                                lang = window.famobi.config.supportedLanguages[i];
                                langButtons +=
                                `<li class="${(lang == currlang) ? 'fg-lang fg-lang-selected' : 'fg-lang'}" data-switch-lang="${lang}" style="cursor: pointer;">
                                <a href="javascript:void(0);">
                                  <img class="fg-flag" src="html5games/images/flags/flag_${lang}.png" alt="${lang}">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 841.9 459" xml:space="preserve">
                                      <path d="M630.7,227.3"></path>
                                      <path d="M21.5,17.9c-3.9,0-7.4,2.3-8.9,6c-1.6,3.7-0.6,7.8,2.1,10.5l399.7,399.7c1.9,1.9,4.5,2.9,6.8,2.9c2.3,0,5.1-1,6.8-2.9 L827.4,34.7c2.7-2.5,3.7-6.8,2.1-10.7c-1.6-3.7-5.1-6-8.9-6H21.5z"></path>
                                    </svg>
                                  </a>
                                </li>`;
                            }
                            langButtons += '</ul>';
                        }

                        //console.log(window.famobi.config.game_i18n);

                        let menuButtons = (window.famobi.hasFeature("highscores")) ?
                        `<ul class="fa-menu-buttons">
                          <li data-famobi-href="leaderboard">
                            <a href="javascript:void(0);" class="fa-menu-button-leaderboard">
                              <img src="html5games/images/leaderboard2.svg" alt="leaderboard"></img>
                            </a>
                          </li>
                         </ul>` :
                        "";

                        var menuHtml =
                        `${menuButtons}
                        <ul class="fg-related-games">
                          <li>
                            <a href="${window.famobi.config.more_games_url}" target="_blank">
                              <img src="html5games/images/icon.svg" alt="${window.famobi.config.name}">
                            </a>
                          </li>
                        </ul>
                        ${langButtons}`;

                        window.famobi.menu.setHtml(menuHtml);
                    },
                    show: function() {

                        if (window.famobi.menu.fgOverlay_visible) {
                            return window.famobi.menu;
                        }
                        let leaderboardBtnImage = window.famobi.menu.fgNavigation.querySelector(".fa-menu-button-leaderboard img");
                        if(leaderboardBtnImage) {
                          window.famobi.menu.fgNavigation.querySelector(".fa-menu-button-leaderboard img").style.animation = "growAndShake 1s linear 1s 1 forwards";
                          setTimeout(()=>window.famobi.menu.fgNavigation.querySelector(".fa-menu-button-leaderboard img").style.animation = "none",2000);
                        }

                        var $fullscreenIcon = faZepto("#fg-overlay .fa-menu-button-fullscreen");

                        this.hideAll();

                        window.famobi.menu.eventHandler = window.famobi.menu.handleClick(faZepto("html").get(0), this.hideAll);
                        faZepto("html").get(0).style.cursor = "pointer";

                        if (
                            !document.fullscreenElement &&
                            !document.mozFullScreenElement &&
                            !document.webkitFullscreenElement &&
                            !document.msFullscreenElement
                        ) {
                            $fullscreenIcon
                                .removeClass("fa-fullscreen-enabled")
                                .addClass("fa-fullscreen-disabled");
                        } else {
                            $fullscreenIcon
                                .removeClass("fa-fullscreen-disabled")
                                .addClass("fa-fullscreen-enabled");
                        }

                        window.famobi.menu.fgOverlay_visible = true;
                        faZepto(window.famobi.menu.fgOverlay).addClass("navigation-view");

                        window.famobi.menu.fgNavigation.style.display = "";
                        false && window.famobi.game.pause(true);

                        return window.famobi.menu;
                    },
                    hide: function() {
                        return window.famobi.menu.hideAll();
                    },
                    hideAll: function() {
                        if (!window.famobi.menu.fgOverlay_visible) {
                            return window.famobi.menu;
                        }

                        if (window.famobi.menu.eventHandler) {
                            window.famobi.menu.removeClick(faZepto("html").get(0), window.famobi.menu.eventHandler);
                        }

                        var $fgOverlay = faZepto(window.famobi.menu.fgOverlay);
                        $fgOverlay.removeClass("iframe-view navigation-view fa-lang-shown");
                        window.famobi.menu.fgOverlay_visible = false;
                        false && window.famobi.game.resume(true);
                        return window.famobi.menu;
                    },
                    handleClick: function(element, callback) {
                        var eventHandler = function(e) {
                            callback.call(this, e);
                            e.cancelBubble = true;
                            e.stopPropagation();
                            return false;
                        };

                        if (typeof callback === "function") {
                            // http://stackoverflow.com/questions/13396297/windows-phone-8-touch-support
                            //
                            // Performing operations that require explicit user interaction on touchstart events is deprecated and will be removed in M54, around October 2016. See https://www.chromestatus.com/features/5649871251963904 for more details.
                            if (window.navigator.msPointerEnabled) {
                                element.addEventListener("MSPointerDown", eventHandler, false);
                            } else if (window.PointerEvent) {
                                element.addEventListener("pointerup", eventHandler, false);
                                element.addEventListener("pointermove", this.eventTrap, true);
                                element.addEventListener("pointerdown", this.eventTrap, true);
                            } else if (detection.is.touch) {
                                element.addEventListener("touchend", eventHandler, false);
                                element.addEventListener("touchmove", this.eventTrap, true);
                                element.addEventListener("touchstart", this.eventTrap, true);
                            } else {
                                element.addEventListener("click", eventHandler, false);
                            }

                            element.style.cursor = "pointer";
                        }

                        return eventHandler;
                    },
                    removeClick: function(element, eventHandler) {
                        if (typeof eventHandler === "function") {
                            if (window.navigator.msPointerEnabled) {
                                element.removeEventListener("MSPointerDown", eventHandler, false);
                            } else if (window.PointerEvent) {
                                element.removeEventListener("pointerup", eventHandler, false);
                                element.removeEventListener("pointermove", this.eventTrap, true);
                                element.removeEventListener("pointerdown", this.eventTrap, true);
                            } else if (detection.is.touch) {
                                element.removeEventListener("touchend", eventHandler, false);
                                element.removeEventListener("touchmove", this.eventTrap, true);
                                element.removeEventListener("touchstart", this.eventTrap, true);
                            } else {
                                element.removeEventListener("click", eventHandler, false);
                            }
                        }

                        return element;
                    },
                    eventTrap: function(e) {
                        e.preventDefault();
                        e.cancelBubble = true;
                        e.stopPropagation();
                    },
                    toggleOverlay: function(e) {
                        if (window.famobi.menu.fgOverlay_visible) {
                            window.famobi.menu.hideAll();
                        } else {
                            window.famobi.menu.show();
                        }
                        e.stopPropagation();
                        return false;
                    },
                    setHtml: function(html) {
                        window.famobi.menu.fgNavigation.innerHTML = html;
                        window.famobi.menu.bindEvents();

                    },

                    toggleLanguages: function() {
                        var $overlayNode = faZepto(window.famobi.menu.fgOverlay);
                        if ($overlayNode.hasClass("fa-lang-shown")) {
                            $overlayNode.removeClass("fa-lang-shown");
                        } else {
                            $overlayNode.addClass("fa-lang-shown");
                        }
                    },

                    switchLanguage: function(lang) {
                        var params = window.famobi.getUrlParams(),
                            qs = "";

                        window.famobi.menu.hideAll();
                        params.locale = lang;
                        qs = faZepto.param(params);
                        document.location.replace(
                            document.location.pathname +
                                "?" +
                                qs +
                                (document.location.hash ? document.location.hash : "")
                        );
                    },

                    bindEvents: function() {
                        faZepto("[data-switch-lang]").each(function() {
                                var $this = faZepto(this),
                                    lang = faZepto(this).attr("data-switch-lang");

                                $this.removeClass("fg-lang-selected");

                                if (lang === window.famobi.gametranslation.curLangString) {
                                    // Move selected language to first position
                                    $this.closest("ul").prepend($this);

                                    $this.addClass("fg-lang-selected");
                                }

                                window.famobi.menu.handleClick(this, function() {
                                    if ($this.hasClass("fg-lang-selected") === true) {
                                        window.famobi.menu.toggleLanguages();
                                    } else {
                                        if (lang.length) {
                                            window.famobi.menu.switchLanguage(lang);
                                        }
                                    }
                                });
                            });

                        faZepto("[data-famobi-href]")
                            .css("cursor", "pointer")
                            .each(function() {
                                var callback = function() {
                                    var link = faZepto(this).attr("data-famobi-href");

                                    window.famobi.menu.hideAll();

                                    switch (link) {
                                        case "moreGames":
                                            return window.famobi.menu.moreGamesLink();
                                        case "back":
                                            return window.famobi.menu.backLink();
                                        case "leaderboard":
                                            return window.famobi.showLeaderboard();
                                        default:
                                            if (this.href) {
                                                window.open(this.href, "");
                                                return false;
                                            }
                                    }
                                };

                                window.famobi.menu.handleClick(this, callback.bind(this));
                            });
                    }
                },

                getMoreGamesButtonImage: function() {


                },
                moreGamesLink: function() {

                },
                localStorage: {

                    setItem: function(key, value) {
                        window.localStorage.setItem(window.famobi_gameID + ":" + key, value);
                    },
                    getItem: function(key) {
                        return window.localStorage.getItem(window.famobi_gameID + ":" + key);
                    },
                    removeItem: function(key) {
                        window.localStorage.removeItem(window.famobi_gameID + ":" + key);
                    },
                    clear: function() {
                        for (var key in window.localStorage) {
                            if (key.startsWith(window.famobi_gameID + ":")) {
                                window.localStorage.removeItem(key);
                            }
                        }
                    }
                },

                log: function() {
                    if(this.config && !this.config.logging) {
                        return;
                    }
                    console.log(arguments.length === 1 ? arguments[0] : arguments);
                },

                warn: function() {
                    if(this.config && !this.config.logging) {
                        return;
                    }
                    console.warn(arguments.length === 1 ? arguments[0] : arguments);
                },

                sizeOf: function(data) {
                    var length = 0;
                    var prop;

                    if (!data) {
                        return length;
                    }

                    if (typeof data.length != "undefined") {
                        return data.length;
                    }

                    if (Object.keys) {
                        // available since ECMAScript 5 and in some browser 10x faster
                        length = Object.keys(data).length;
                    } else {
                        for (prop in data) {
                            if (data.hasOwnProperty(prop)) {
                                length++;
                            }
                        }
                    }
                    return length;
                },

                getOrientation: function() {
                    var orientationMatch = window.matchMedia('all and (orientation:landscape)');

                    if(orientationMatch && orientationMatch.matches === true) {
                        return 'landscape';
                    }
                    return 'portrait';
                },

                onOrientationChange: function(callback) {
                    this.orientationChangeCallback = callback;

                    if (typeof callback !== "function") {
                      this.error("famobi.onorientationchange: no valid callback provided.");
                    }
                    return faZepto(window).resize(callback);
                },

                // DEPRECATED FUNCTIONS
                submitHighscore: function(level, score, isTriggered) {

                    !isTriggered && this.warn("famobi.submitHighscore is deprecated, please use famobi_analytics.trackEvent('EVENT_LEVELSCORE')instead: https://sites.google.com/a/famobi.com/api-docs/api-implementation/famobi-analytics");
                },
                levelUp: function() {
                    this.warn("famobi.levelUp is deprecated, please use famobi_analytics.trackEvent('EVENT_LEVELSUCCESS') instead: https://sites.google.com/a/famobi.com/api-docs/api-implementation/famobi-analytics");
                },
                gameOver: function() {
                    this.warn("famobi.gameOver is deprecated, please use famobi_analytics.trackEvent('EVENT_LEVELFAIL') instead: https://sites.google.com/a/famobi.com/api-docs/api-implementation/famobi-analytics");
                },
                includeCSS: function(href) {
                    var head  = document.getElementsByTagName('head')[0],
                        link  = document.createElement('link');

                    link.rel  = 'stylesheet';
                    link.type = 'text/css';
                    link.href = href;

                    head.appendChild(link);
                },
                sendLiveScore: function(liveScore) {
                    // todo
                },
                hasRewardedAd: function() {
                    return this.hasFeature("rewarded");
                },
                hasFeature: function(feature) {

                    if(feature == "local") feature = "standalone";
                    return this.config.features && this.config.features[feature] ? true : false;
                },
                getAppLink: function() {
                    return "";
                },
                getUrlParams: function(a, b, c) {
                    a = /[?&]?([^=]+)=([^&]*)/g, b = document.location && document.location.search ? document.location.search.split("+").join(" ") : "";
                    for (var d = {}; c = a.exec(b);) d[decodeURIComponent(c[1])] = decodeURIComponent(c[2]);
                    return d;
                },
                showLeaderboard: function() {
                    if(!window.famobi.hasFeature("highscores")) return;
                    api.showDialog('scores', {
                        title: 'Best Scores',
                        // level_key: event === "EVENT_LEVELSCORE" ? params['levelName'] : "total",
                        //period: 'alltime',
                        //value_formatter: ''
                    });
                },
                game: {
                    waitingCounter: 0,
                    setWaiting: function(newVal) {
                        newVal
                            ? this.waitingCounter++
                            : this.waitingCounter > 0
                            ? this.waitingCounter--
                            : (this.waitingCounter = 0);
                        return this;
                    },
                    isWaiting: function() {
                        return this.waitingCounter > 0;
                    },
                    canResume: function() {
                        return this.waitingCounter === 1;
                    },
                    init: function() {
                        this.waitingCounter = 0;
                    },
                    pause: function(pForce) {

                        // console.log("Pause");
                        if(window.famobi.config.gameParams.ad_type == "off" && !pForce)
                        {
                          // console.log("No AD - pause skipped");
                          return false;
                        }

                        if (this.isWaiting()) {
                            // console.log('game is already waiting, do not pause');
                            this.setWaiting(true);
                            return false;
                        }

                        this.setWaiting(true);

                        try {
                            if (typeof window.famobi_onPauseRequested == "function") {
                              // console.log("window.famobi_onPauseRequested();");
                                window.famobi_onPauseRequested();
                                return true;
                            }
                            // Phaser
                            if (window.game && typeof window.game.paused !== "undefined") {
                              // console.log("window.game.paused = true;");
                                window.game.paused = true;
                                return true;
                            }
                            // Construct 2
                            if (typeof window.cr_setSuspended !== "undefined") {
                              // console.log("cr_setSuspended(true);");
                                cr_setSuspended(true);
                                //faZepto('<iframe id="fg-clickthrough-frame" src="about:blank" style="width: 100%; height: 100%; display: block; position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 999"></iframe>').appendTo(window.famobi.rootElement);
                                return true;
                            }
                            // CreateJS <3
                            if (typeof window.createjs !== "undefined") {
                              console.log("createJS - do nothing");
                                //window.createjs.Sound.setMute(true);
                            }
                        } catch (e) {
                            window.famobi.log("Pausing game failed: " + e);
                            console.log("FAILED TO PAUSE");
                        }
                    },
                    resume: function() {

                        // console.log("Resume");

                        if (!this.isWaiting()) {
                            //window.famobi.log('game is not waiting, do not resume');
                            return false;
                        }

                        if (!this.canResume()) {
                            //window.famobi.log('game is still waiting, do not resume');
                            this.setWaiting(false);
                            return false;
                        }

                        this.setWaiting(false);

                        try {
                            if (typeof window.famobi_onResumeRequested == "function") {
                                window.famobi_onResumeRequested();
                                return true;
                            }
                            // Phaser
                            if (window.game && typeof window.game.paused !== "undefined") {
                                window.game.paused = false;
                                return true;
                            }
                            // Construct 2
                            if (typeof window.cr_setSuspended !== "undefined") {
                                cr_setSuspended(false);
                                //faZepto('iframe#fg-clickthrough-frame').remove();
                                return true;
                            }
                            // CreateJS <3
                            if (typeof window.createjs !== "undefined") {
                                //window.createjs.Sound.setMute(false);
                            }
                        } catch (e) {
                            window.famobi.log("Resuming game failed: " + e);
                        }

                        return false;
                    }
                },
                "adapters": { // TODO
                    init: function() {
                    },
                    list: function() {
                    },
                    add: function(section, subsection, callback) {
                    },
                    has: function(section, subsection) {
                    },
                    run: function(section, subsection) {
                    }
                }
            };
            // export famobi object to global object
        b[a] = famobi;

    }('famobi', window);
    window.famobi.init().then(function() {

        setTimeout(function() {

            (function next() {
                if(typeof api === "undefined" && typeof SWAGAPI !== "undefined") {
                  function initSwagApi()
                  {
                    let apiWrapper = document.getElementsByClassName("swag-api-wrapper")[0];

                    //console.info(">> Found swag-api-container");
                    api = SWAGAPI.getInstance({
                        wrapper: document.getElementsByClassName("swag-api-wrapper")[0] || document.body,
                        api_key: window.famobi.config.api_key,
                        theme: 'shockwave',
                        debug: true
                    });
                    window.famobi.log("api initialized");
                  }
                  initSwagApi();
                  if(api)
                  {
                    if(window.famobi.config.show_splash && window.famobi.config.show_splash === "api")
                    {
                      console.log("api splash");
                      let splashScreen = document.createElement("div");
                      splashScreen.classList.add("splash-screen");
                      splashScreen.id = "splashScreen";
                      splashScreen.style.position = "absolute";
                      splashScreen.style.top = "0";
                      splashScreen.style.left = "0";
                      splashScreen.style.width = "100%";
                      splashScreen.style.height = "100%";
                      document.body.appendChild(splashScreen);
                      window.famobi.splashScreen = splashScreen;
                      SWAGAPI.showBrandingAnimation('splashScreen',()=>{
                        window.famobi.hideSplashScreen();
                      });
                    }
                    return Promise.all([
                        api.startSession(),
                        // api.getBrandingLogo(),
                    ]).then(
                        function(values){
                            window.famobi.log("The api is ready to use");
                            window.famobi.brandingLogo = values[1];
                        }).finally(next);
                  }
                }

                if (!window.famobi_gameJS.length) {

                    window.famobi.gametranslation.init();
                    window.famobi.menu.create();

                    window.setTimeout(function() {
                        var e = document.createEvent('Events');
                        e.initEvent("deviceready", true, false);
                        document.dispatchEvent(e);
                    }, 50);

                    return;
                }
                var currentScript = window.famobi_gameJS.shift();

                if (typeof currentScript === "function") {
                    if(typeof Zepto !== "undefined" && typeof window.faZepto === "undefined") {
                        window.faZepto = Zepto;

                        // see https://github.com/blai/fashionista/issues/2
                        ;(function ($) {
                            $.getScript = function(src, func, error_func) {
                                var script = document.createElement('script');
                                script.async = "async";
                                script.src = src;
                                if (func) {
                                    script.onload = func;
                                }
                                if (error_func) {
                                    script.onerror = error_func;
                                }
                                document.getElementsByTagName("head")[0].appendChild( script );
                            };
                        })(Zepto);
                    }
                    currentScript();
                    next();
                } else {
                    var scriptEl = document.createElement("script");
                    scriptEl.onload = next;
                    scriptEl.onerror = next;
                    scriptEl.src = currentScript;
                    document.body.appendChild(scriptEl);
                }
            })();
        }, window.famobi.config.nextTimeout || 0);
    });
}
