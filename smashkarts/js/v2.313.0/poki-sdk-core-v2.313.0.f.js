(()=>{
    var e, t, n, i, r = {
        5: (e,t,n)=>{
            var i, r, o;
            !function(n, a) {
                if (n) {
                    var s = {}
                      , d = n.TraceKit
                      , c = [].slice
                      , l = "?"
                      , A = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
                    s.noConflict = function() {
                        return n.TraceKit = d,
                        s
                    }
                    ,
                    s.wrap = function(e) {
                        return function() {
                            try {
                                return e.apply(this, arguments)
                            } catch (e) {
                                throw s.report(e),
                                e
                            }
                        }
                    }
                    ,
                    s.report = function() {
                        var e, t, i, r, o = [], a = null, d = null;
                        function c(e, t, n) {
                            var i = null;
                            if (!t || s.collectWindowErrors) {
                                for (var r in o)
                                    if (u(o, r))
                                        try {
                                            o[r](e, t, n)
                                        } catch (e) {
                                            i = e
                                        }
                                if (i)
                                    throw i
                            }
                        }
                        function l(t, n, i, r, o) {
                            if (d)
                                s.computeStackTrace.augmentStackTraceWithInitialElement(d, n, i, t),
                                h();
                            else if (o)
                                c(s.computeStackTrace(o), !0, o);
                            else {
                                var a, l = {
                                    url: n,
                                    line: i,
                                    column: r
                                }, u = t;
                                if ("[object String]" === {}.toString.call(t)) {
                                    var p = t.match(A);
                                    p && (a = p[1],
                                    u = p[2])
                                }
                                l.func = s.computeStackTrace.guessFunctionName(l.url, l.line),
                                l.context = s.computeStackTrace.gatherContext(l.url, l.line),
                                c({
                                    name: a,
                                    message: u,
                                    mode: "onerror",
                                    stack: [l]
                                }, !0, null)
                            }
                            return !!e && e.apply(this, arguments)
                        }
                        function p(e) {
                            c(s.computeStackTrace(e.reason), !0, e.reason)
                        }
                        function h() {
                            var e = d
                              , t = a;
                            d = null,
                            a = null,
                            c(e, !1, t)
                        }
                        function m(e) {
                            if (d) {
                                if (a === e)
                                    return;
                                h()
                            }
                            var t = s.computeStackTrace(e);
                            throw d = t,
                            a = e,
                            setTimeout((function() {
                                a === e && h()
                            }
                            ), t.incomplete ? 2e3 : 0),
                            e
                        }
                        return m.subscribe = function(a) {
                            !function() {
                                if (!0 === t)
                                    return;
                                e = n.onerror,
                                n.onerror = l,
                                t = !0
                            }(),
                            function() {
                                if (!0 === r)
                                    return;
                                i = n.onunhandledrejection,
                                n.onunhandledrejection = p,
                                r = !0
                            }(),
                            o.push(a)
                        }
                        ,
                        m.unsubscribe = function(a) {
                            for (var s = o.length - 1; s >= 0; --s)
                                o[s] === a && o.splice(s, 1);
                            0 === o.length && (t && (n.onerror = e,
                            t = !1),
                            r && (n.onunhandledrejection = i,
                            r = !1))
                        }
                        ,
                        m
                    }(),
                    s.computeStackTrace = function() {
                        var e = !1
                          , t = {};
                        function i(e) {
                            if ("string" != typeof e)
                                return [];
                            if (!u(t, e)) {
                                var i = ""
                                  , r = "";
                                try {
                                    r = n.document.domain
                                } catch (e) {}
                                var o = /(.*)\:\/\/([^:\/]+)([:\d]*)\/{0,1}([\s\S]*)/.exec(e);
                                o && o[2] === r && (i = function(e) {
                                    if (!s.remoteFetching)
                                        return "";
                                    try {
                                        var t = function() {
                                            try {
                                                return new n.XMLHttpRequest
                                            } catch (e) {
                                                return new n.ActiveXObject("Microsoft.XMLHTTP")
                                            }
                                        }();
                                        return t.open("GET", e, !1),
                                        t.send(""),
                                        t.responseText
                                    } catch (e) {
                                        return ""
                                    }
                                }(e)),
                                t[e] = i ? i.split("\n") : []
                            }
                            return t[e]
                        }
                        function r(e, t) {
                            var n, r = /function ([^(]*)\(([^)]*)\)/, o = /['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/, a = "", s = i(e);
                            if (!s.length)
                                return l;
                            for (var d = 0; d < 10; ++d)
                                if (!p(a = s[t - d] + a)) {
                                    if (n = o.exec(a))
                                        return n[1];
                                    if (n = r.exec(a))
                                        return n[1]
                                }
                            return l
                        }
                        function o(e, t) {
                            var n = i(e);
                            if (!n.length)
                                return null;
                            var r = []
                              , o = Math.floor(s.linesOfContext / 2)
                              , a = o + s.linesOfContext % 2
                              , d = Math.max(0, t - o - 1)
                              , c = Math.min(n.length, t + a - 1);
                            t -= 1;
                            for (var l = d; l < c; ++l)
                                p(n[l]) || r.push(n[l]);
                            return r.length > 0 ? r : null
                        }
                        function a(e) {
                            return e.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g, "\\$&")
                        }
                        function d(e) {
                            return a(e).replace("<", "(?:<|&lt;)").replace(">", "(?:>|&gt;)").replace("&", "(?:&|&amp;)").replace('"', '(?:"|&quot;)').replace(/\s+/g, "\\s+")
                        }
                        function c(e, t) {
                            for (var n, r, o = 0, a = t.length; o < a; ++o)
                                if ((n = i(t[o])).length && (n = n.join("\n"),
                                r = e.exec(n)))
                                    return {
                                        url: t[o],
                                        line: n.substring(0, r.index).split("\n").length,
                                        column: r.index - n.lastIndexOf("\n", r.index) - 1
                                    };
                            return null
                        }
                        function A(e, t, n) {
                            var r, o = i(t), s = new RegExp("\\b" + a(e) + "\\b");
                            return n -= 1,
                            o && o.length > n && (r = s.exec(o[n])) ? r.index : null
                        }
                        function h(e) {
                            if (!p(n && n.document)) {
                                for (var t, i, r, o, s = [n.location.href], l = n.document.getElementsByTagName("script"), A = "" + e, u = 0; u < l.length; ++u) {
                                    var h = l[u];
                                    h.src && s.push(h.src)
                                }
                                if (r = /^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/.exec(A)) {
                                    var m = r[1] ? "\\s+" + r[1] : ""
                                      , g = r[2].split(",").join("\\s*,\\s*");
                                    t = a(r[3]).replace(/;$/, ";?"),
                                    i = new RegExp("function" + m + "\\s*\\(\\s*" + g + "\\s*\\)\\s*{\\s*" + t + "\\s*}")
                                } else
                                    i = new RegExp(a(A).replace(/\s+/g, "\\s+"));
                                if (o = c(i, s))
                                    return o;
                                if (r = /^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/.exec(A)) {
                                    var f = r[1];
                                    if (t = d(r[2]),
                                    o = c(i = new RegExp("on" + f + "=[\\'\"]\\s*" + t + "\\s*[\\'\"]","i"), s[0]))
                                        return o;
                                    if (o = c(i = new RegExp(t), s))
                                        return o
                                }
                                return null
                            }
                        }
                        function m(e) {
                            if (!e.stack)
                                return null;
                            for (var t, n, i, a = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, s = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, d = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, c = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, u = /\((\S*)(?::(\d+))(?::(\d+))\)/, h = e.stack.split("\n"), m = [], g = /^(.*) is undefined$/.exec(e.message), f = 0, v = h.length; f < v; ++f) {
                                if (n = a.exec(h[f])) {
                                    var b = n[2] && 0 === n[2].indexOf("native");
                                    n[2] && 0 === n[2].indexOf("eval") && (t = u.exec(n[2])) && (n[2] = t[1],
                                    n[3] = t[2],
                                    n[4] = t[3]),
                                    i = {
                                        url: b ? null : n[2],
                                        func: n[1] || l,
                                        args: b ? [n[2]] : [],
                                        line: n[3] ? +n[3] : null,
                                        column: n[4] ? +n[4] : null
                                    }
                                } else if (n = d.exec(h[f]))
                                    i = {
                                        url: n[2],
                                        func: n[1] || l,
                                        args: [],
                                        line: +n[3],
                                        column: n[4] ? +n[4] : null
                                    };
                                else {
                                    if (!(n = s.exec(h[f])))
                                        continue;
                                    n[3] && n[3].indexOf(" > eval") > -1 && (t = c.exec(n[3])) ? (n[3] = t[1],
                                    n[4] = t[2],
                                    n[5] = null) : 0 !== f || n[5] || p(e.columnNumber) || (m[0].column = e.columnNumber + 1),
                                    i = {
                                        url: n[3],
                                        func: n[1] || l,
                                        args: n[2] ? n[2].split(",") : [],
                                        line: n[4] ? +n[4] : null,
                                        column: n[5] ? +n[5] : null
                                    }
                                }
                                !i.func && i.line && (i.func = r(i.url, i.line)),
                                i.context = i.line ? o(i.url, i.line) : null,
                                m.push(i)
                            }
                            return m.length ? (m[0] && m[0].line && !m[0].column && g && (m[0].column = A(g[1], m[0].url, m[0].line)),
                            {
                                mode: "stack",
                                name: e.name,
                                message: e.message,
                                stack: m
                            }) : null
                        }
                        function g(e, t, n, i) {
                            var a = {
                                url: t,
                                line: n
                            };
                            if (a.url && a.line) {
                                e.incomplete = !1,
                                a.func || (a.func = r(a.url, a.line)),
                                a.context || (a.context = o(a.url, a.line));
                                var s = / '([^']+)' /.exec(i);
                                if (s && (a.column = A(s[1], a.url, a.line)),
                                e.stack.length > 0 && e.stack[0].url === a.url) {
                                    if (e.stack[0].line === a.line)
                                        return !1;
                                    if (!e.stack[0].line && e.stack[0].func === a.func)
                                        return e.stack[0].line = a.line,
                                        e.stack[0].context = a.context,
                                        !1
                                }
                                return e.stack.unshift(a),
                                e.partial = !0,
                                !0
                            }
                            return e.incomplete = !0,
                            !1
                        }
                        function f(e, t) {
                            for (var n, i, o, a = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, d = [], c = {}, u = !1, p = f.caller; p && !u; p = p.caller)
                                if (p !== v && p !== s.report) {
                                    if (i = {
                                        url: null,
                                        func: l,
                                        args: [],
                                        line: null,
                                        column: null
                                    },
                                    p.name ? i.func = p.name : (n = a.exec(p.toString())) && (i.func = n[1]),
                                    void 0 === i.func)
                                        try {
                                            i.func = n.input.substring(0, n.input.indexOf("{"))
                                        } catch (e) {}
                                    if (o = h(p)) {
                                        i.url = o.url,
                                        i.line = o.line,
                                        i.func === l && (i.func = r(i.url, i.line));
                                        var m = / '([^']+)' /.exec(e.message || e.description);
                                        m && (i.column = A(m[1], o.url, o.line))
                                    }
                                    c["" + p] ? u = !0 : c["" + p] = !0,
                                    d.push(i)
                                }
                            t && d.splice(0, t);
                            var b = {
                                mode: "callers",
                                name: e.name,
                                message: e.message,
                                stack: d
                            };
                            return g(b, e.sourceURL || e.fileName, e.line || e.lineNumber, e.message || e.description),
                            b
                        }
                        function v(t, a) {
                            var s = null;
                            a = null == a ? 0 : +a;
                            try {
                                if (s = function(e) {
                                    var t = e.stacktrace;
                                    if (t) {
                                        for (var n, i = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, a = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i, s = t.split("\n"), d = [], c = 0; c < s.length; c += 2) {
                                            var l = null;
                                            if ((n = i.exec(s[c])) ? l = {
                                                url: n[2],
                                                line: +n[1],
                                                column: null,
                                                func: n[3],
                                                args: []
                                            } : (n = a.exec(s[c])) && (l = {
                                                url: n[6],
                                                line: +n[1],
                                                column: +n[2],
                                                func: n[3] || n[4],
                                                args: n[5] ? n[5].split(",") : []
                                            }),
                                            l) {
                                                if (!l.func && l.line && (l.func = r(l.url, l.line)),
                                                l.line)
                                                    try {
                                                        l.context = o(l.url, l.line)
                                                    } catch (e) {}
                                                l.context || (l.context = [s[c + 1]]),
                                                d.push(l)
                                            }
                                        }
                                        return d.length ? {
                                            mode: "stacktrace",
                                            name: e.name,
                                            message: e.message,
                                            stack: d
                                        } : null
                                    }
                                }(t),
                                s)
                                    return s
                            } catch (t) {
                                e
                            }
                            try {
                                if (s = m(t))
                                    return s
                            } catch (t) {
                                e
                            }
                            try {
                                if (s = function(e) {
                                    var t = e.message.split("\n");
                                    if (t.length < 4)
                                        return null;
                                    var a, s = /^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i, l = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i, A = /^\s*Line (\d+) of function script\s*$/i, p = [], h = n && n.document && n.document.getElementsByTagName("script"), m = [];
                                    for (var g in h)
                                        u(h, g) && !h[g].src && m.push(h[g]);
                                    for (var f = 2; f < t.length; f += 2) {
                                        var v = null;
                                        if (a = s.exec(t[f]))
                                            v = {
                                                url: a[2],
                                                func: a[3],
                                                args: [],
                                                line: +a[1],
                                                column: null
                                            };
                                        else if (a = l.exec(t[f])) {
                                            v = {
                                                url: a[3],
                                                func: a[4],
                                                args: [],
                                                line: +a[1],
                                                column: null
                                            };
                                            var b = +a[1]
                                              , y = m[a[2] - 1];
                                            if (y) {
                                                var k = i(v.url);
                                                if (k) {
                                                    var w = (k = k.join("\n")).indexOf(y.innerText);
                                                    w >= 0 && (v.line = b + k.substring(0, w).split("\n").length)
                                                }
                                            }
                                        } else if (a = A.exec(t[f])) {
                                            var x = n.location.href.replace(/#.*$/, "")
                                              , E = c(new RegExp(d(t[f + 1])), [x]);
                                            v = {
                                                url: x,
                                                func: "",
                                                args: [],
                                                line: E ? E.line : a[1],
                                                column: null
                                            }
                                        }
                                        if (v) {
                                            v.func || (v.func = r(v.url, v.line));
                                            var I = o(v.url, v.line)
                                              , S = I ? I[Math.floor(I.length / 2)] : null;
                                            I && S.replace(/^\s*/, "") === t[f + 1].replace(/^\s*/, "") ? v.context = I : v.context = [t[f + 1]],
                                            p.push(v)
                                        }
                                    }
                                    return p.length ? {
                                        mode: "multiline",
                                        name: e.name,
                                        message: t[0],
                                        stack: p
                                    } : null
                                }(t),
                                s)
                                    return s
                            } catch (t) {
                                e
                            }
                            try {
                                if (s = f(t, a + 1))
                                    return s
                            } catch (t) {
                                e
                            }
                            return {
                                name: t.name,
                                message: t.message,
                                mode: "failed"
                            }
                        }
                        return v.augmentStackTraceWithInitialElement = g,
                        v.computeStackTraceFromStackProp = m,
                        v.guessFunctionName = r,
                        v.gatherContext = o,
                        v.ofCaller = function(e) {
                            e = 1 + (null == e ? 0 : +e);
                            try {
                                throw new Error
                            } catch (t) {
                                return v(t, e + 1)
                            }
                        }
                        ,
                        v.getSource = i,
                        v
                    }(),
                    s.extendToAsynchronousCallbacks = function() {
                        var e = function(e) {
                            var t = n[e];
                            n[e] = function() {
                                var e = c.call(arguments)
                                  , n = e[0];
                                return "function" == typeof n && (e[0] = s.wrap(n)),
                                t.apply ? t.apply(this, e) : t(e[0], e[1])
                            }
                        };
                        e("setTimeout"),
                        e("setInterval")
                    }
                    ,
                    s.remoteFetching || (s.remoteFetching = !0),
                    s.collectWindowErrors || (s.collectWindowErrors = !0),
                    (!s.linesOfContext || s.linesOfContext < 1) && (s.linesOfContext = 11),
                    r = [],
                    void 0 === (o = "function" == typeof (i = s) ? i.apply(t, r) : i) || (e.exports = o)
                }
                function u(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                }
                function p(e) {
                    return void 0 === e
                }
            }("undefined" != typeof window ? window : n.g)
        }
        ,
        583: (e,t,n)=>{
            "use strict";
            n.d(t, {
                Z: ()=>i
            });
            const i = {
                ready: "pokiAppReady",
                adblocked: "pokiAppAdblocked",
                ads: {
                    completed: "pokiAdsCompleted",
                    error: "pokiAdsError",
                    impression: "pokiAdsImpression",
                    durationChange: "pokiAdsDurationChange",
                    limit: "pokiAdsLimit",
                    ready: "pokiAdsReady",
                    requested: "pokiAdsRequested",
                    prebidRequested: "pokiAdsPrebidRequested",
                    skipped: "pokiAdsSkipped",
                    started: "pokiAdsStarted",
                    stopped: "pokiAdsStopped",
                    busy: "pokiAdsBusy",
                    position: {
                        preroll: "PP",
                        midroll: "PM",
                        rewarded: "PR",
                        display: "DP"
                    },
                    video: {
                        clicked: "pokiVideoAdsClicked",
                        firstQuartile: "pokiVideoAdsFirstQuartile",
                        midPoint: "pokiVideoAdsMidPoint",
                        thirdQuartile: "pokiVideoAdsThirdQuartile",
                        error: "pokiVideoAdsError",
                        loaderError: "pokiVideoAdsLoaderError",
                        paused: "pokiVideoAdsPauseTriggered",
                        resumed: "pokiVideoAdsResumedTriggered",
                        progress: "pokiVideoAdsProgress",
                        buffering: "pokiVideoAdsBuffering"
                    }
                },
                info: {
                    messages: {
                        timeLimit: "The ad-request was not processed, because of a time constraint",
                        prerollLimit: "The ad-request was cancelled, because we're not allowed to show a preroll",
                        disabled: "The ad-request was cancelled, because we've disabled this format for this specific configuration"
                    }
                },
                message: {
                    event: "pokiMessageEvent",
                    sdkDetails: "pokiMessageSdkDetails",
                    setPokiURLParams: "pokiMessageSetPokiURLParams",
                    sendGameScreenshot: "pokiMessageSendScreenshot",
                    sendCommand: "pokiMessageSendCommand"
                },
                tracking: {
                    custom: "pokiTrackingCustom",
                    debugTrueInProduction: "pokiMessageDebugTrueProduction",
                    screen: {
                        gameplayStart: "pokiTrackingScreenGameplayStart",
                        gameplayStop: "pokiTrackingScreenGameplayStop",
                        gameLoadingFinished: "pokiTrackingScreenGameLoadingFinished",
                        commercialBreak: "pokiTrackingScreenCommercialBreak",
                        rewardedBreak: "pokiTrackingScreenRewardedBreak",
                        firstRound: "pokiTrackingScreenFirstRound",
                        roundStart: "pokiTrackingScreenRoundStart",
                        roundEnd: "pokiTrackingScreenRoundEnd",
                        displayAd: "pokiTrackingScreenDisplayAdRequest",
                        destroyAd: "pokiTrackingScreenDisplayAdDestroy",
                        playerActive: "pokiTrackingScreenPlayerActive"
                    },
                    playtest: {
                        showModal: "pokiTrackingPlaytestShowModal",
                        accepted: "pokiTrackingPlaytestAccepted",
                        rejected: "pokiTrackingPlaytestRejected",
                        noCanvas: "pokiTrackingPlaytestNoCanvas",
                        starting: "pokiTrackingPlaytestStarting",
                        connected: "pokiTrackingPlaytestConnected"
                    },
                    sdk: {
                        status: {
                            initialized: "pokiTrackingSdkStatusInitialized",
                            failed: "pokiTrackingSdkStatusFailed"
                        }
                    },
                    ads: {
                        status: {
                            busy: "pokiTrackingAdsStatusBusy",
                            completed: "pokiTrackingAdsStatusCompleted",
                            error: "pokiTrackingAdsStatusError",
                            displayError: "pokiTrackingAdsStatusDisplayError",
                            impression: "pokiTrackingAdsStatusImpression",
                            limit: "pokiTrackingAdsStatusLimit",
                            ready: "pokiTrackingAdsStatusReady",
                            requested: "pokiTrackingAdsStatusRequested",
                            prebidRequested: "pokiTrackingAdsStatusPrebidRequested",
                            skipped: "pokiTrackingAdsStatusSkipped",
                            started: "pokiTrackingAdsStatusStarted",
                            buffering: "pokiTrackingAdsStatusBuffering"
                        },
                        video: {
                            clicked: "pokiTrackingAdsVideoClicked",
                            error: "pokiTrackingAdsVideoError",
                            loaderError: "pokiTrackingAdsVideoLoaderError",
                            progress: "pokiTrackingAdsVideoProgress",
                            paused: "pokiTrackingAdsVideoPaused",
                            resumed: "pokiTrackingAdsVideoResumed"
                        },
                        display: {
                            requested: "pokiTrackingScreenDisplayAdRequested",
                            impression: "pokiTrackingScreenDisplayAdImpression"
                        }
                    }
                }
            }
        }
        ,
        84: (e,t,n)=>{
            "use strict";
            n.d(t, {
                Z: ()=>a
            });
            var i = n(583)
              , r = n(992)
              , o = n(855);
            const a = function() {
                function e() {}
                return e.sendMessage = function(e, t) {
                    var n = window.parent;
                    if (!(0,
                    r.Z)(e, i.Z.message)) {
                        var a = Object.keys(i.Z.message).map((function(e) {
                            return "poki.message." + e
                        }
                        ));
                        throw new TypeError("Argument 'type' must be one of " + a.join(", "))
                    }
                    var s = t || {};
                    o.Z.gameID && o.Z.versionID && (s.pokifordevs = {
                        game_id: o.Z.gameID,
                        game_version_id: o.Z.versionID
                    }),
                    n.postMessage({
                        type: e,
                        content: s
                    }, "*")
                }
                ,
                e
            }()
        }
        ,
        662: (e,t,n)=>{
            "use strict";
            n.d(t, {
                D: ()=>r,
                M: ()=>o
            });
            var i = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "GB", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO"]
              , r = "ZZ";
            function o(e) {
                return i.includes(e)
            }
        }
        ,
        906: (e,t,n)=>{
            "use strict";
            n.d(t, {
                Z: ()=>i
            });
            const i = function(e, t) {
                var n;
                if ("undefined" == typeof window && !t)
                    return "";
                e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var i = new RegExp("(?:[\\?&]|^)" + e + "=([^&#]*)").exec(t || (null === (n = null === window || void 0 === window ? void 0 : window.location) || void 0 === n ? void 0 : n.search) || "");
                return null === i ? "" : decodeURIComponent(i[1].replace(/\+/g, " "))
            }
        }
        ,
        893: (e,t,n)=>{
            "use strict";
            n.d(t, {
                Z: ()=>i
            });
            const i = function() {
                return "undefined" != typeof navigator && /(?:phone|windows\s+phone|ipod|blackberry|(?:android|bb\d+|meego|silk|googlebot) .+? mobile|palm|windows\s+ce|opera\smini|avantgo|mobilesafari|docomo)/i.test(navigator.userAgent)
            }
        }
        ,
        573: (e,t,n)=>{
            "use strict";
            n.d(t, {
                Z: ()=>i
            });
            const i = function() {
                return "undefined" != typeof navigator && /(?:ipad|playbook|(?:android|bb\d+|meego|silk)(?! .+? mobile))/i.test(navigator.userAgent)
            }
        }
        ,
        855: (e,t,n)=>{
            "use strict";
            n.d(t, {
                w: ()=>c,
                Z: ()=>l
            });
            var i = n(662)
              , r = n(906)
              , o = n(893)
              , a = n(573)
              , s = "desktop";
            (0,
            o.Z)() ? s = "mobile" : (0,
            a.Z)() && (s = "tablet");
            var d = {
                bot: "1" === (0,
                r.Z)("bot"),
                categories: (0,
                r.Z)("categories") || "",
                device: s,
                experiment: (0,
                r.Z)("experiment") || "",
                forceAd: (0,
                r.Z)("force_ad") || !1,
                isPokiIframe: (parseInt((0,
                r.Z)("site_id"), 10) || 0) > 0,
                referrer: (0,
                r.Z)("url_referrer") || "",
                siteID: parseInt((0,
                r.Z)("site_id"), 10) || 0,
                tag: (0,
                r.Z)("tag") || "",
                versionID: (0,
                r.Z)("game_version_id"),
                debugMode: "true" === (0,
                r.Z)("pokiDebug"),
                logMode: "" !== (0,
                r.Z)("pokiLogging"),
                playtest: (0,
                r.Z)("playtest"),
                ccpaApplies: (0,
                r.Z)("ccpaApplies"),
                childDirected: !1,
                country: ((0,
                r.Z)("country") || "").toUpperCase(),
                gameID: (0,
                r.Z)("game_id"),
                gdprApplies: (0,
                i.M)(((0,
                r.Z)("country") || "").toUpperCase()),
                nonPersonalized: !1,
                contentGameID: void 0
            }
              , c = function(e, t) {
                d[e] = t
            };
            const l = d
        }
        ,
        992: (e,t,n)=>{
            "use strict";
            n.d(t, {
                Z: ()=>i
            });
            const i = function(e, t) {
                var n = !1;
                return Object.keys(t).forEach((function(i) {
                    t[i] === e && (n = !0)
                }
                )),
                n
            }
        }
    }, o = {};
    function a(e) {
        if (o[e])
            return o[e].exports;
        var t = o[e] = {
            exports: {}
        };
        return r[e].call(t.exports, t, t.exports, a),
        t.exports
    }
    a.m = r,
    a.n = e=>{
        var t = e && e.__esModule ? ()=>e.default : ()=>e;
        return a.d(t, {
            a: t
        }),
        t
    }
    ,
    t = Object.getPrototypeOf ? e=>Object.getPrototypeOf(e) : e=>e.__proto__,
    a.t = function(n, i) {
        if (1 & i && (n = this(n)),
        8 & i)
            return n;
        if ("object" == typeof n && n) {
            if (4 & i && n.__esModule)
                return n;
            if (16 & i && "function" == typeof n.then)
                return n
        }
        var r = Object.create(null);
        a.r(r);
        var o = {};
        e = e || [null, t({}), t([]), t(t)];
        for (var s = 2 & i && n; "object" == typeof s && !~e.indexOf(s); s = t(s))
            Object.getOwnPropertyNames(s).forEach((e=>o[e] = ()=>n[e]));
        return o.default = ()=>n,
        a.d(r, o),
        r
    }
    ,
    a.d = (e,t)=>{
        for (var n in t)
            a.o(t, n) && !a.o(e, n) && Object.defineProperty(e, n, {
                enumerable: !0,
                get: t[n]
            })
    }
    ,
    a.f = {},
    a.e = e=>Promise.all(Object.keys(a.f).reduce(((t,n)=>(a.f[n](e, t),
    t)), [])),
    a.u = e=>e + "-v2.313.0.js",
    a.g = function() {
        if ("object" == typeof globalThis)
            return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window)
                return window
        }
    }(),
    a.o = (e,t)=>Object.prototype.hasOwnProperty.call(e, t),
    n = {},
    i = "@poki/poki-sdk:",
    a.l = (e,t,r,o)=>{
        if (n[e])
            n[e].push(t);
        else {
            var s, d;
            if (void 0 !== r)
                for (var c = document.getElementsByTagName("script"), l = 0; l < c.length; l++) {
                    var A = c[l];
                    if (A.getAttribute("src") == e || A.getAttribute("data-webpack") == i + r) {
                        s = A;
                        break
                    }
                }
            s || (d = !0,
            (s = document.createElement("script")).charset = "utf-8",
            s.timeout = 120,
            a.nc && s.setAttribute("nonce", a.nc),
            s.setAttribute("data-webpack", i + r),
            s.src = e),
            n[e] = [t];
            var u = (t,i)=>{
                s.onerror = s.onload = null,
                clearTimeout(p);
                var r = n[e];
                if (delete n[e],
                s.parentNode && s.parentNode.removeChild(s),
                r && r.forEach((e=>e(i))),
                t)
                    return t(i)
            }
              , p = setTimeout(u.bind(null, void 0, {
                type: "timeout",
                target: s
            }), 12e4);
            s.onerror = u.bind(null, s.onerror),
            s.onload = u.bind(null, s.onload),
            d && document.head.appendChild(s)
        }
    }
    ,
    a.r = e=>{
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    (()=>{
        var e;
        a.g.importScripts && (e = a.g.location + "");
        var t = a.g.document;
        if (!e && t && (t.currentScript && (e = t.currentScript.src),
        !e)) {
            var n = t.getElementsByTagName("script");
            n.length && (e = n[n.length - 1].src)
        }
        if (!e)
            throw new Error("Automatic publicPath is not supported in this browser");
        e = e.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/"),
        a.p = e
    }
    )(),
    (()=>{
        var e = {
            702: 0
        };
        a.f.j = (t,n)=>{
            var i = a.o(e, t) ? e[t] : void 0;
            if (0 !== i)
                if (i)
                    n.push(i[2]);
                else {
                    var r = new Promise(((n,r)=>{
                        i = e[t] = [n, r]
                    }
                    ));
                    n.push(i[2] = r);
                    var o = a.p + a.u(t)
                      , s = new Error;
                    a.l(o, (n=>{
                        if (a.o(e, t) && (0 !== (i = e[t]) && (e[t] = void 0),
                        i)) {
                            var r = n && ("load" === n.type ? "missing" : n.type)
                              , o = n && n.target && n.target.src;
                            s.message = "Loading chunk " + t + " failed.\n(" + r + ": " + o + ")",
                            s.name = "ChunkLoadError",
                            s.type = r,
                            s.request = o,
                            i[1](s)
                        }
                    }
                    ), "chunk-" + t, t)
                }
        }
        ;
        var t = (t,n)=>{
            for (var i, r, [o,s,d] = n, c = 0, l = []; c < o.length; c++)
                r = o[c],
                a.o(e, r) && e[r] && l.push(e[r][0]),
                e[r] = 0;
            for (i in s)
                a.o(s, i) && (a.m[i] = s[i]);
            for (d && d(a),
            t && t(n); l.length; )
                l.shift()()
        }
          , n = self.webpackChunk_poki_poki_sdk = self.webpackChunk_poki_poki_sdk || [];
        n.forEach(t.bind(null, 0)),
        n.push = t.bind(null, n.push.bind(n))
    }
    )(),
    (()=>{
        "use strict";
        var e = a(5)
          , t = a.n(e)
          , n = a(583);
        function i(e) {
            var t = new RegExp("".concat(e, "=([^;]+)(?:;|$)")).exec(document.cookie);
            return t ? t[1] : ""
        }
        function r(e, t, n) {
            document.cookie = "".concat(e, "=").concat(t, "; path=/; samesite=lax; max-age=").concat(Math.min(n || 15552e3, 15552e3))
        }
        function o() {
            for (var e = Math.floor(Date.now() / 1e3), t = "", n = 0; n < 4; n++)
                t = String.fromCharCode(255 & e) + t,
                e >>= 8;
            if (window.crypto && crypto.getRandomValues && Uint32Array) {
                var i = new Uint32Array(12);
                crypto.getRandomValues(i);
                for (var r = 0; r < 12; r++)
                    t += String.fromCharCode(255 & i[r])
            } else
                for (var o = 0; o < 12; o++)
                    t += String.fromCharCode(Math.floor(256 * Math.random()));
            return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
        }
        function s(e, t) {
            var n;
            console.error(e),
            n = e.name && e.message ? "".concat(e.name, ": ").concat(e.message) : JSON.stringify(e),
            function(e, t) {
                if (!navigator.sendBeacon || !navigator.sendBeacon(e, t))
                    try {
                        var n = "XMLHttpRequest"in window ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
                        n.open("POST", e, !0),
                        n.setRequestHeader("Content-Type", "text/plain"),
                        n.send(t)
                    } catch (e) {}
            }("https://t.poki.io/l", JSON.stringify({
                c: "observer-error",
                ve: 7,
                d: [{
                    k: "where",
                    v: t
                }, {
                    k: "error",
                    v: n
                }]
            }))
        }
        window._pokiUserGlobalName = window._pokiUserGlobalName || "user";
        var d = "poki_session";
        function c(e) {
            return !(!e || !(e && e.page && e.landing_page && e.previous_page) || !e.tab_id || !e.expire || Date.now() > e.expire || e.expire > Date.now() + 18e5)
        }
        function l() {
            var e = null;
            c(window[window._pokiSessionGlobalName]) && (e = window[window._pokiSessionGlobalName]);
            try {
                var t = JSON.parse(sessionStorage.getItem(d));
                c(t) && (!e || t.depth > e.depth) && (e = t)
            } catch (e) {
                s(e, "getTabSession")
            }
            return e
        }
        function A() {
            var e = l();
            return e ? e.tab_id : o()
        }
        function u() {
            var e = 0
              , t = l();
            t && (e = t.depth);
            try {
                var n = JSON.parse(i(d) || null);
                c(n) && (e = Math.max(e, n.depth))
            } catch (e) {
                s(e, "getSessionDepth")
            }
            return e
        }
        window._pokiSessionGlobalName = window._pokiSessionGlobalName || "session";
        var p = a(84)
          , h = a(855);
        const m = function() {
            function e() {}
            return e.debug = !1,
            e.log = !1,
            e.init = function(t, n) {
                var i, r, o = window.location.hostname;
                void 0 === t && ("test" === (null === (r = null === (i = null === window || void 0 === window ? void 0 : window.process) || void 0 === i ? void 0 : i.env) || void 0 === r ? void 0 : r.NODE_ENV) ? (t = !1,
                void 0 === n && (n = !1)) : "localhost" === o || "127.0.0.1" === o || "[::1]" === o ? (t = !0,
                void 0 === n && (n = !1)) : (t = !1,
                void 0 === n && (n = !1))),
                o.endsWith(".poki-gdn.com") ? (t = !1,
                n = !1) : "qa-files.poki.com" === o && (t = !0,
                n = !0),
                h.Z.debugMode && (t = !0),
                h.Z.logMode && (n = !0),
                void 0 === n && (n = t),
                e.debug = t,
                e.log = n
            }
            ,
            e
        }();
        var g = function(e) {
            var t = new Array;
            return Object.keys(e).forEach((function(n) {
                "object" == typeof e[n] ? t = t.concat(g(e[n])) : t.push(e[n])
            }
            )),
            t
        };
        const f = g;
        var v = function() {
            return v = Object.assign || function(e) {
                for (var t, n = 1, i = arguments.length; n < i; n++)
                    for (var r in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e
            }
            ,
            v.apply(this, arguments)
        }
          , b = function() {
            function e() {}
            return e.clearEventListeners = function() {
                this.listeners = {}
            }
            ,
            e.removeEventListener = function(e, t) {
                if (Object.prototype.hasOwnProperty.call(this.listeners, e)) {
                    var n = this.listeners[e].indexOf(t);
                    -1 !== n && this.listeners[e].splice(n, 1)
                }
            }
            ,
            e.addEventListener = function(e, t, n) {
                var i = this;
                if (void 0 === n && (n = !1),
                n = !!n,
                Object.prototype.hasOwnProperty.call(this.listeners, e) || (this.listeners[e] = []),
                n) {
                    var r = function(n) {
                        i.removeEventListener.bind(i)(e, r),
                        t(n)
                    };
                    this.listeners[e].push(r)
                } else
                    this.listeners[e].push(t)
            }
            ,
            e.dispatchEvent = function(e, t) {
                void 0 === t && (t = {}),
                !m.debug || window.process && window.process.env && "test" === window.process.env.NODE_ENV || console.info(e, t);
                for (var n = Object.keys(this.listeners), i = 0; i < n.length; i++) {
                    var r = n[i];
                    if (e === r)
                        for (var o = this.listeners[r], a = 0; a < o.length; a++)
                            o[a](v(v({}, this.dataAnnotations), t))
                }
            }
            ,
            e.setDataAnnotations = function(e) {
                this.dataAnnotations = v(v({}, this.dataAnnotations), e)
            }
            ,
            e.getDataAnnotations = function() {
                return this.dataAnnotations
            }
            ,
            e.clearAnnotations = function() {
                this.dataAnnotations = {}
            }
            ,
            e.listeners = {},
            e.dataAnnotations = {},
            e
        }();
        const y = b;
        var k = function() {
            return k = Object.assign || function(e) {
                for (var t, n = 1, i = arguments.length; n < i; n++)
                    for (var r in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e
            }
            ,
            k.apply(this, arguments)
        };
        const w = function(e) {
            var t;
            if ("undefined" != typeof window && "undefined" != typeof fetch) {
                var n = y.getDataAnnotations()
                  , i = e.size;
                (null === (t = e.event) || void 0 === t ? void 0 : t.startsWith("video-")) && (i = "640x360v");
                var r = k(k({}, e), {
                    size: i,
                    opportunity_id: e.opportunityId || n.opportunityId,
                    ad_unit_path: e.adUnitPath || n.adUnitPath,
                    p4d_game_id: h.Z.gameID,
                    p4d_version_id: h.Z.versionID,
                    bidder: e.bidder || n.bidder,
                    bid: e.bid || n.bid || 0,
                    error_code: e.errorCode,
                    creative_id: e.creativeId || n.creativeId
                });
                m.debug ? console.log("PokiAdServer Tracking: ", r) : fetch("https://t.poki.io/adserver", {
                    method: "POST",
                    mode: "no-cors",
                    body: JSON.stringify(r)
                })
            }
        };
        var x = a(893)
          , E = a(573);
        var I = "MacIntel" === window.navigator.platform && void 0 !== window.navigator.standalone && navigator.maxTouchPoints > 1
          , S = function(e, t, n, i) {
            return new (n || (n = Promise))((function(r, o) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? r(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , Z = function(e, t) {
            var n, i, r, o, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }
            ),
            o;
            function s(o) {
                return function(s) {
                    return function(o) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                i && (r = 2 & o[0] ? i.return : o[0] ? i.throw || ((r = i.return) && r.call(i),
                                0) : i.next) && !(r = r.call(i, o[1])).done)
                                    return r;
                                switch (i = 0,
                                r && (o = [2 & o[0], r.value]),
                                o[0]) {
                                case 0:
                                case 1:
                                    r = o;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    i = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = a.trys,
                                    (r = r.length > 0 && r[r.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < r[1]) {
                                        a.label = r[1],
                                        r = o;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2],
                                        a.ops.push(o);
                                        break
                                    }
                                    r[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                o = t.call(e, a)
                            } catch (e) {
                                o = [6, e],
                                i = 0
                            } finally {
                                n = r = 0
                            }
                        if (5 & o[0])
                            throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        }
          , C = function(e, t, n) {
            if (n || 2 === arguments.length)
                for (var i, r = 0, o = t.length; r < o; r++)
                    !i && r in t || (i || (i = Array.prototype.slice.call(t, 0, r)),
                    i[r] = t[r]);
            return e.concat(i || Array.prototype.slice.call(t))
        }
          , _ = null
          , T = function(e) {};
        var P = C(C([], Object.values(n.Z.tracking.screen), !0), ["pokiTrackingAdsStatusCompleted", "pokiTrackingAdsStatusError", "pokiTrackingAdsStatusLimit", "pokiTrackingAdsVideoProgress"], !1);
        function B(e, t, i) {
            if (i) {
                a.e(591).then(a.t.bind(a, 591, 23)).then((function(r) {
                    var o, a = new r.Network(e), s = function() {};
                    a.on("ready", (function() {
                        m.log && console.info("%cPOKI_PLAYTEST:%c network ready", "font-weight: bold", ""),
                        a.join(t)
                    }
                    )),
                    a.on("signalingerror", (function(e) {
                        m.log && console.error("%cPOKI_PLAYTEST:%c signalingerror: " + e, "font-weight: bold", "")
                    }
                    )),
                    a.on("rtcerror", (function(e) {
                        m.log && console.error("%cPOKI_PLAYTEST:%c rtcerror: " + e, "font-weight: bold", "")
                    }
                    )),
                    a.on("connecting", (function(e) {
                        m.log && console.info("%cPOKI_PLAYTEST:%c peer connecting " + e.id, "font-weight: bold", "")
                    }
                    )),
                    a.on("disconnected", (function(e) {
                        o === e.id && (s(),
                        s = function() {}
                        ,
                        a.close("developer disconnected"))
                    }
                    )),
                    a.on("connected", (function(e) {
                        m.log && console.info("%cPOKI_PLAYTEST:%c peer connected " + e.id, "font-weight: bold", ""),
                        L.track(n.Z.tracking.playtest.connected, {
                            peer: e.id
                        }),
                        setTimeout((function() {
                            o || (s(),
                            s = function() {}
                            ,
                            a.close("timed out"))
                        }
                        ), 5e3)
                    }
                    )),
                    a.on("message", (function(e, t, n) {
                        switch (JSON.parse(n).type) {
                        case "start":
                            o = e.id,
                            function(e) {
                                if (i) {
                                    var t = e.conn;
                                    t.getSenders().forEach((function(e) {
                                        var t = e.getParameters();
                                        t.encodings[0].maxBitrate = 10485760,
                                        e.setParameters(t)
                                    }
                                    ));
                                    var n = i.captureStream(24);
                                    n.getTracks().forEach((function(e) {
                                        t.addTrack(e, n)
                                    }
                                    ))
                                }
                            }(e),
                            s = function(e, t) {
                                if (!i)
                                    return function() {}
                                    ;
                                var n = [-1, -1]
                                  , r = [-1, -1]
                                  , o = setInterval((function() {
                                    if (i && (n[0] !== r[0] || n[1] !== r[1])) {
                                        var o = {
                                            type: "mousemove",
                                            x: n[0] / i.clientWidth,
                                            y: n[1] / i.clientHeight
                                        };
                                        e.send("unreliable", t.id, JSON.stringify(o)),
                                        r[0] = n[0],
                                        r[1] = n[1]
                                    }
                                }
                                ), 50)
                                  , a = function(e) {
                                    var t = e.clientX
                                      , i = e.clientY;
                                    n[0] = t,
                                    n[1] = i
                                }
                                  , s = function(e) {
                                    var t = e.clientX
                                      , r = e.clientY;
                                    n[0] = t - i.offsetLeft,
                                    n[1] = r - i.offsetTop
                                }
                                  , d = function() {
                                    var n = {
                                        type: "visibilitychange",
                                        hidden: document.hidden
                                    };
                                    e.send("reliable", t.id, JSON.stringify(n))
                                }
                                  , c = function(n) {
                                    i && e.send("reliable", t.id, JSON.stringify({
                                        type: "mousedown",
                                        button: n.button
                                    }))
                                }
                                  , l = function(n) {
                                    i && e.send("reliable", t.id, JSON.stringify({
                                        type: "mouseup",
                                        button: n.button
                                    }))
                                };
                                i.addEventListener("pointermove", a),
                                window.addEventListener("pointermove", s),
                                window.addEventListener("mousedown", c),
                                window.addEventListener("mouseup", l),
                                document.addEventListener("visibilitychange", d);
                                var A = function() {
                                    if (i) {
                                        var n = {
                                            type: "resize",
                                            width: i.width,
                                            height: i.height
                                        };
                                        e.send("reliable", t.id, JSON.stringify(n))
                                    }
                                };
                                A(),
                                window.addEventListener("resize", A);
                                var u = {}
                                  , p = !1
                                  , h = function(e) {
                                    u[e.code] = !0,
                                    p = !0
                                }
                                  , m = function(e) {
                                    delete u[e.code],
                                    p = !0
                                };
                                document.addEventListener("keydown", h),
                                document.addEventListener("keyup", m);
                                var g = setInterval((function() {
                                    var n = Object.keys(u);
                                    if (p && n.length > 0) {
                                        var i = {
                                            type: "keydown",
                                            keys: Object.keys(u)
                                        };
                                        e.send("reliable", t.id, JSON.stringify(i))
                                    }
                                    p = !1
                                }
                                ), 50);
                                return T = function(n) {
                                    var i = {
                                        type: "sdk-event",
                                        offset: performance.now(),
                                        event: n
                                    };
                                    e.send("reliable", t.id, JSON.stringify(i))
                                }
                                ,
                                function() {
                                    T = function() {}
                                    ,
                                    i && i.removeEventListener("pointermove", a),
                                    window.removeEventListener("pointermove", s),
                                    window.removeEventListener("mousedown", c),
                                    window.removeEventListener("mouseup", l),
                                    document.removeEventListener("keydown", h),
                                    document.removeEventListener("keyup", m),
                                    window.removeEventListener("resize", A),
                                    document.removeEventListener("visibilitychange", d),
                                    clearInterval(g),
                                    clearInterval(o)
                                }
                            }(a, e);
                            break;
                        case "stop":
                            s(),
                            s = function() {}
                            ,
                            a.close("stop")
                        }
                    }
                    ))
                }
                ))
            }
        }
        function D(e) {
            var t, i, r = h.Z.playtest, o = !1;
            r ? o = !0 : (r = null == e ? void 0 : e.playtestLobbyID) && (o = "4g" === (null === (t = navigator.connection) || void 0 === t ? void 0 : t.effectiveType) && !(0,
            x.Z)() && !(0,
            E.Z)() && h.Z.isPokiIframe && !I,
            L.track(n.Z.tracking.playtest.showModal, {
                show: o
            })),
            o && (i = (null == e ? void 0 : e.gameTitle) || "the game",
            new Promise((function(e, t) {
                return S(void 0, void 0, void 0, (function() {
                    var n, r, o, a, s, d, c, l, A, u, p, h, m, g, f, v;
                    return Z(this, (function(b) {
                        switch (b.label) {
                        case 0:
                            return (n = document.createElement("div")).classList.add("poki-stream-bg"),
                            (r = document.createElement("div")).classList.add("poki-stream-consent"),
                            (o = document.createElement("div")).classList.add("consent-content"),
                            a = new FontFace("ProximaNova","url(fonts/proxima-nova-regular-latin.woff2)").load(),
                            s = new FontFace("ProximaNovaBold","url(fonts/proxima-nova-bold-latin.woff2)").load(),
                            d = new FontFace("Torus","url(fonts/torus-bold-latin.woff2)").load(),
                            [4, Promise.all([a, s, d])];
                        case 1:
                            return c = b.sent(),
                            l = c[0],
                            A = c[1],
                            u = c[2],
                            document.fonts.add(l),
                            document.fonts.add(A),
                            document.fonts.add(u),
                            o.innerHTML = "\n<h1>You have been randomly selected for a Play Test</h1>\n<p>\tWe offer this feature to our developers to enable them to <b>analyze</b> and <b>improve their game</b>. If you consent to the Play Test, the\ndeveloper can <b>see your activity in " + i + " while you play</b>. This will enable the developer to determine\nwhere tweaks and improvements can be made.<p>\n<p>The information is only shared real time with the\ndeveloper of " + i + ' during this session. The information with regard to your gameplay activity is not\nrecorded or stored. For more information, please download our <a href="https://a.poki.com/playtest/Poki+Play+Test+Privacy+Statement.pdf" download="Poki Play Test Privacy Statement.pdf">Play Test Privacy Statement</a>.</p>\n<h2>Do you consent to the Play Test to help improve this game?</h2>\nPlease note that you will be able to play the game normally if you refuse the Play Test.',
                            r.appendChild(o),
                            (p = document.createElement("style")).textContent = "\n.poki-stream-consent h2, .poki-stream-consent h1, .poki-stream-consent b, .poki-stream-consent a, .poki-stream-consent button, .poki-stream-consent svg  {\n\tall: revert;\n}\n\n.poki-stream-consent {\n\tall: revert;\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\ttransform: translate(-50%, -50%);\n\tbackground-color: #fff;\n\tborder-radius: 12px;\n\tpadding: 16px;\n\tcolor: #5d6b84;\n\tfont: 700 14px/20px ProximaNova, sans-serif;\n\tbox-shadow: rgb(9 30 66 / 7%) 0px 16px 16px, rgb(9 30 66 / 7%) 0px 0px 8px, rgb(9 30 66 / 7%) 0px 16px 32px;\n\twidth: 600px;\n\tborder-radius: 8px;\n\toverflow: hidden;\n\tbox-sizing: border-box;\n\tz-index: 99999;\n}\n.poki-stream-bg{\n\tall: revert;\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tbackground: #002B50AF;\n\twidth: 100%;\n\theight: 100%;\n\tz-index: 99998;\n}\n.poki-stream-consent .consent-content{\n\tmargin-bottom: 10px;\n}\n.poki-stream-consent h1 {\n\tfont: 700 21px/24px Torus, sans-serif;\n\tcolor: #002B50;\n\tmargin-top: 0;\n}\n.poki-stream-consent h2 {\n\tfont: 700 16px/24px ProximaNovaBold, sans-serif;\n\tcolor: #002B50;\n\tmargin-bottom: 0;\n}\n.poki-stream-consent b{\n\tfont: 700 14px/20px ProximaNovaBold, sans-serif;\n}\n.poki-stream-consent a{\n\tcolor: #009CFF;\n}\n.poki-stream-consent .poki-stream-close{\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\twidth: 32px;\n\theight: 32px;\n\tpadding: 4px;\n\tcursor: pointer;\n\tfill: #009cff;\n\tborder-radius: 50%;\n\tbox-sizing: border-box;\n\tmargin: 8px;\n}\n\n@media only screen and (max-width: 835px) {\n\t.poki-stream-consent {\n\t\ttransform: translate(-50%, -50%) scale(0.9);\n\t}\n}\n\n.poki-stream-consent .poki-stream-close:hover{\n\tbackground-color: #ffc9dd;\n\tfill: #ff7690;\n}\n.poki-stream-consent button {\n\tfont: 700 16px / 24px Torus, sans-serif;\n\tcolor: rgb(255, 255, 255);\n\tpadding: 6px 24px;\n\tborder-radius: 30px;\n\tbackground-color: #009cff;\n\tborder: none;\n\tmargin: 16px 16px 0 0;\n\tcursor: pointer;\n}\n.poki-stream-consent .poki-stream-star{\n\tposition:absolute;\n\tbottom:0;\n\tright:0;\n\twidth: 121.3px;\n\theight: 90.9px;\n}\n",
                            document.head.appendChild(p),
                            h = function() {
                                n.remove(),
                                r.remove()
                            }
                            ,
                            (m = document.createElement("button")).innerText = "I refuse",
                            m.addEventListener("click", (function() {
                                h(),
                                t()
                            }
                            )),
                            r.appendChild(m),
                            (g = document.createElement("button")).innerText = "I consent",
                            g.addEventListener("click", (function() {
                                h(),
                                e()
                            }
                            )),
                            r.appendChild(g),
                            (f = document.createElementNS("http://www.w3.org/2000/svg", "svg")).classList.add("poki-stream-close"),
                            f.innerHTML = '<rect x="8" y="24.971" width="24" height="4" rx="2" transform="rotate(-45 8 24.97)"></rect><rect x="10.828" y="8" width="24" height="4" rx="2" transform="rotate(45 10.828 8)"></rect>',
                            f.setAttribute("viewBox", "0 0 36 36"),
                            f.addEventListener("click", (function() {
                                h(),
                                t()
                            }
                            )),
                            r.appendChild(f),
                            (v = document.createElementNS("http://www.w3.org/2000/svg", "svg")).innerHTML = '<style>.st5{fill:#ffdb00}</style><path style="fill:#fece00" d="M121.3 0 90.7 33.5 72.4 21.3l-1.1 28.3L0 29l25.6 50.6L8.2 90.9h113.1z"/><path d="m81.9 43.1-9.5-21.8-1.2 28.3 3.7 1.2 7-7.7z" style="fill:#ffaf00"/><path d="M71.2 49.6 0 29l63.5 50.1L104 61 74.9 50.7l-3.7-1.1z" style="fill:#ffdc00"/><path d="m72.4 21.3 9.5 21.8 8.7-9.6-18.2-12.2z" style="fill:#ffc500"/><path style="fill:#ffab00" d="M8.3 90.9h23l-5.6-11.2z"/><path class="st5" d="M63.5 79.1 36.3 90.9H61z"/><path style="fill:#ffc200" d="M61 90.9h16.3L63.5 79.1z"/><path style="fill:#ffeb72" d="m104 61 17.3-55.4V0L74.9 50.7z"/><path class="st5" d="m104 61 17.3 29.9V0z"/></svg>',
                            v.setAttribute("viewBox", "0 0 121.3 90.9"),
                            v.classList.add("poki-stream-star"),
                            r.appendChild(v),
                            document.body.appendChild(n),
                            document.body.appendChild(r),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ))).then((function() {
                L.track(n.Z.tracking.playtest.accepted);
                var e = 240
                  , t = setInterval((function() {
                    var i = function() {
                        if (_)
                            return _;
                        var e = null
                          , t = 0;
                        return Array.from(document.querySelectorAll("canvas")).forEach((function(n) {
                            var i = getComputedStyle(n)
                              , r = i.width
                              , o = i.height
                              , a = i.display
                              , s = i.visibility
                              , d = parseInt(r, 10) * parseInt(o, 10);
                            "none" !== a && "visible" === s && d > t && (t = d,
                            e = n)
                        }
                        )),
                        e
                    }();
                    if (i) {
                        clearInterval(t),
                        L.track(n.Z.tracking.playtest.starting);
                        try {
                            B("31883e18-b86f-45c1-b551-c60590728d39", r, i)
                        } catch (e) {}
                    }
                    0 == --e && (L.track(n.Z.tracking.playtest.noCanvas),
                    clearInterval(t))
                }
                ), 500)
            }
            )).catch((function(e) {
                L.track(n.Z.tracking.playtest.rejected)
            }
            ))
        }
        const z = function(e) {
            return new Promise((function(t, n) {
                var i = document.createElement("script");
                i.type = "text/javascript",
                i.async = !0,
                i.src = e;
                var r = function() {
                    i.readyState && "loaded" !== i.readyState && "complete" !== i.readyState || (t(),
                    i.onload = null,
                    i.onreadystatechange = null)
                };
                i.onload = r,
                i.onreadystatechange = r,
                i.onerror = n,
                document.head.appendChild(i)
            }
            ))
        };
        var j = f(n.Z.tracking)
          , O = window
          , M = function() {
            function e() {}
            return e.track = function(t, i) {
                if (void 0 === i && (i = {}),
                -1 === j.indexOf(t))
                    throw new TypeError("Invalid 'event', must be one of " + j.join(", "));
                if ("object" != typeof i)
                    throw new TypeError("Invalid data, must be an object");
                var r = y.getDataAnnotations();
                if (null == r ? void 0 : r.pokiAdServer)
                    switch (t) {
                    case n.Z.tracking.ads.status.impression:
                        w({
                            event: "video-impression",
                            creativeId: null == i ? void 0 : i.creativeId
                        });
                        break;
                    case n.Z.tracking.ads.video.error:
                        w({
                            event: "video-error",
                            errorCode: null == i ? void 0 : i.errorCode
                        });
                        break;
                    case n.Z.tracking.ads.video.loaderError:
                        w({
                            event: "video-adsloader-error",
                            errorCode: null == i ? void 0 : i.errorCode
                        });
                        break;
                    case n.Z.tracking.ads.status.completed:
                        w({
                            event: "video-complete"
                        })
                    }
                if (m.log) {
                    if (window.process && window.process.env && "test" === window.process.env.NODE_ENV)
                        return;
                    Object.keys(i).length ? console.info("%cPOKI_TRACKER:%c Tracked event '" + t + "' with data:", "font-weight: bold", "", i) : console.info("%cPOKI_TRACKER:%c Tracked event '" + t + "'", "font-weight: bold", "")
                }
                !function(e) {
                    P.includes(e.event) && T(e)
                }({
                    event: t,
                    data: i
                }),
                e.logToObserver ? e.pushEvent("sdk", "message", {
                    content: {
                        event: t,
                        data: i,
                        pokifordevs: {
                            game_id: h.Z.gameID,
                            game_version_id: void 0
                        }
                    },
                    type: n.Z.message.event,
                    origin: "game"
                }) : p.Z.sendMessage(n.Z.message.event, {
                    event: t,
                    data: i
                })
            }
            ,
            e.setupDefaultEvents = function() {
                var t, i = ((t = {})[n.Z.ready] = n.Z.tracking.sdk.status.initialized,
                t[n.Z.adblocked] = n.Z.tracking.sdk.status.failed,
                t[n.Z.ads.busy] = n.Z.tracking.ads.status.busy,
                t[n.Z.ads.completed] = n.Z.tracking.ads.status.completed,
                t[n.Z.ads.error] = n.Z.tracking.ads.status.error,
                t[n.Z.ads.displayError] = n.Z.tracking.ads.status.displayError,
                t[n.Z.ads.impression] = n.Z.tracking.ads.status.impression,
                t[n.Z.ads.limit] = n.Z.tracking.ads.status.limit,
                t[n.Z.ads.ready] = n.Z.tracking.ads.status.ready,
                t[n.Z.ads.requested] = n.Z.tracking.ads.status.requested,
                t[n.Z.ads.prebidRequested] = n.Z.tracking.ads.status.prebidRequested,
                t[n.Z.ads.skipped] = n.Z.tracking.ads.status.skipped,
                t[n.Z.ads.started] = n.Z.tracking.ads.status.started,
                t[n.Z.ads.video.clicked] = n.Z.tracking.ads.video.clicked,
                t[n.Z.ads.video.error] = n.Z.tracking.ads.video.error,
                t[n.Z.ads.video.loaderError] = n.Z.tracking.ads.video.loaderError,
                t[n.Z.ads.video.buffering] = n.Z.tracking.ads.status.buffering,
                t[n.Z.ads.video.progress] = n.Z.tracking.ads.video.progress,
                t[n.Z.ads.video.paused] = n.Z.tracking.ads.video.paused,
                t[n.Z.ads.video.resumed] = n.Z.tracking.ads.video.resumed,
                t[n.Z.tracking.screen.gameplayStart] = n.Z.tracking.screen.gameplayStart,
                t[n.Z.tracking.screen.gameplayStop] = n.Z.tracking.screen.gameplayStop,
                t[n.Z.tracking.screen.commercialBreak] = n.Z.tracking.screen.commercialBreak,
                t[n.Z.tracking.screen.rewardedBreak] = n.Z.tracking.screen.rewardedBreak,
                t);
                Object.keys(i).forEach((function(t) {
                    y.addEventListener(t, (function(n) {
                        e.track(i[t], n)
                    }
                    ))
                }
                ))
            }
            ,
            e.pushEvent = function(e, t, n) {
                O.pokiGTM.push({
                    event: e + "-" + t,
                    eventNoun: e,
                    eventVerb: t,
                    eventData: n || {}
                })
            }
            ,
            e.setRequireConsent = function(t) {
                e.cmpRequired = t,
                e.setupObserverIfCMP()
            }
            ,
            e.setupObserverWithCMP = function(t) {
                e.cmpIndex = t,
                e.setupObserverIfCMP()
            }
            ,
            e.setupObserverIfCMP = function() {
                if (void 0 !== e.cmpRequired && void 0 !== e.cmpIndex)
                    if (e.cmpRequired) {
                        if (!window.__tcfapi)
                            return void console.error("POKI-SDK: enableEventTracking: a CMP is required but no CMP is present.");
                        window.__tcfapi("addEventListener", 2, (function(t, n) {
                            !n || "tcloaded" !== t.eventStatus && "useractioncomplete" !== t.eventStatus || (window.__tcfapi("getNonIABVendorConsents", 2, (function(t) {
                                t && t.nonIabVendorConsents && t.nonIabVendorConsents[e.cmpIndex || 0] && e.setupObserver()
                            }
                            )),
                            window.__tcfapi("removeEventListener", 2, (function() {}
                            ), t.listenerId))
                        }
                        ))
                    } else
                        e.setupObserver()
            }
            ,
            e.setupObserver = function() {
                O._pokiSessionGlobalName = "pokiSession",
                O._pokiUserGlobalName = "pokiUser",
                O._pokiContextGlobalName = "pokiContext",
                O._pokiTrackerGlobalName = "pokiTracker",
                function(e, t, n) {
                    var a = l();
                    c(a) ? (a.previous_page.path = a.page.path,
                    a.previous_page.type = a.page.type,
                    a.previous_page.id = a.page.id,
                    a.previous_page.start = a.page.start,
                    a.page.path = e,
                    a.page.type = t,
                    a.page.id = n,
                    a.page.start = Date.now(),
                    a.depth = u() + 1,
                    a.expire = Date.now() + 18e5) : a = function(e, t, n) {
                        try {
                            var a = JSON.parse(i(d) || null);
                            if (c(a))
                                return a.previous_page.path = a.page.path,
                                a.previous_page.type = a.page.type,
                                a.previous_page.id = a.page.id,
                                a.previous_page.start = a.page.start,
                                a.page.path = e,
                                a.page.type = t,
                                a.page.id = n,
                                a.page.start = Date.now(),
                                a.depth = u() + 1,
                                a.expire = Date.now() + 18e5,
                                a.previous_tab_id = a.tab_id,
                                a.tab_id = A(),
                                r(d, JSON.stringify(a)),
                                a
                        } catch (e) {
                            s(e, "newSession")
                        }
                        return {
                            id: o(),
                            expire: Date.now() + 18e5,
                            tab_id: A(),
                            depth: 1,
                            count: (l = i("ses_cnt"),
                            (l && parseInt(l, 10) || 0) + 1),
                            page: {
                                path: e,
                                type: t,
                                id: n,
                                start: Date.now()
                            },
                            previous_page: {},
                            landing_page: {
                                path: e,
                                type: t,
                                id: n,
                                start: Date.now()
                            }
                        };
                        var l
                    }(e, t, n),
                    r("ses_cnt", a.count),
                    a.count > 1 && function() {
                        r("uid_new", "0");
                        try {
                            sessionStorage.setItem("uid_new", "0")
                        } catch (e) {}
                        window[window._pokiUserGlobalName] && (window[window._pokiUserGlobalName].is_new = !1)
                    }();
                    var p = JSON.stringify(a);
                    try {
                        sessionStorage.setItem(d, p)
                    } catch (e) {
                        s(e, "updateSession")
                    }
                    window[window._pokiSessionGlobalName] = a,
                    r(d, p)
                }(window.location.pathname, "external", h.Z.contentGameID),
                function() {
                    var e, t, n = null === (e = window[window._pokiUserGlobalName]) || void 0 === e ? void 0 : e.id, a = (null === (t = window[window._pokiUserGlobalName]) || void 0 === t ? void 0 : t.is_new) || !1;
                    if (!n)
                        try {
                            n = sessionStorage.getItem("uid"),
                            a = "1" === sessionStorage.getItem("uid_new")
                        } catch (e) {}
                    n || (n = i("uid"),
                    a = "1" === i("uid_new")),
                    n || (n = o(),
                    a = !0),
                    r("uid", n),
                    r("uid_new", a ? "1" : "0");
                    try {
                        sessionStorage.setItem("uid", n),
                        sessionStorage.setItem("uid_new", a ? "1" : "0")
                    } catch (e) {}
                    window[window._pokiUserGlobalName] = {
                        id: n,
                        is_new: a
                    }
                }(),
                O[O._pokiContextGlobalName] = {
                    tag: null,
                    site: {
                        id: null,
                        domain: window.location.hostname,
                        prefix: ""
                    },
                    page: {
                        id: h.Z.contentGameID,
                        type: "external",
                        path: window.location.pathname
                    },
                    user: O[O._pokiUserGlobalName],
                    session: O[O._pokiSessionGlobalName]
                },
                O.pokiGTM = O.pokiGTM || [],
                z("https://a.poki.com/observer/t2.js"),
                e.logToObserver = !0
            }
            ,
            e.logToObserver = !1,
            e.cmpRequired = void 0,
            e.cmpIndex = void 0,
            e
        }();
        const L = M;
        var R = window.location.hostname;
        function N(e) {
            var t = new RegExp(e + "=([^;]+)(?:;|$)").exec(document.cookie);
            return t ? t[1] : ""
        }
        function G(e, t) {
            document.cookie = e + "=" + t + "; path=/; samesite=none; secure; max-age=15552000; domain=" + R
        }
        R.endsWith("poki-gdn.com") && (R = "poki-gdn.com");
        var q = function(e, t, n, i) {
            return new (n || (n = Promise))((function(r, o) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? r(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , U = function(e, t) {
            var n, i, r, o, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }
            ),
            o;
            function s(o) {
                return function(s) {
                    return function(o) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                i && (r = 2 & o[0] ? i.return : o[0] ? i.throw || ((r = i.return) && r.call(i),
                                0) : i.next) && !(r = r.call(i, o[1])).done)
                                    return r;
                                switch (i = 0,
                                r && (o = [2 & o[0], r.value]),
                                o[0]) {
                                case 0:
                                case 1:
                                    r = o;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    i = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = a.trys,
                                    (r = r.length > 0 && r[r.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < r[1]) {
                                        a.label = r[1],
                                        r = o;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2],
                                        a.ops.push(o);
                                        break
                                    }
                                    r[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                o = t.call(e, a)
                            } catch (e) {
                                o = [6, e],
                                i = 0
                            } finally {
                                n = r = 0
                            }
                        if (5 & o[0])
                            throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        }
          , Q = function(e, t, n) {
            if (n || 2 === arguments.length)
                for (var i, r = 0, o = t.length; r < o; r++)
                    !i && r in t || (i || (i = Array.prototype.slice.call(t, 0, r)),
                    i[r] = t[r]);
            return e.concat(i || Array.prototype.slice.call(t))
        }
          , F = "poki_gcuid"
          , X = N(F)
          , H = function() {
            function e() {}
            return e.collectAndLog = function() {
                return q(this, void 0, void 0, (function() {
                    var e, t, n, i, r;
                    return U(this, (function(o) {
                        switch (o.label) {
                        case 0:
                            return o.trys.push([0, 5, , 6]),
                            [4, window.cookieStore.getAll()];
                        case 1:
                            return e = o.sent(),
                            window.indexedDB.databases ? [4, window.indexedDB.databases()] : [3, 3];
                        case 2:
                            return n = o.sent(),
                            [3, 4];
                        case 3:
                            n = [],
                            o.label = 4;
                        case 4:
                            return t = n,
                            i = Q(Q(Q([], e.map((function(e) {
                                return {
                                    name: e.name,
                                    expire_seconds: Math.round((e.expires - Date.now()) / 1e3),
                                    type: "cookie",
                                    domain: e.domain
                                }
                            }
                            )), !0), Object.keys(window.localStorage).map((function(e) {
                                return {
                                    name: e,
                                    expire_seconds: 15552e3,
                                    type: "localStorage"
                                }
                            }
                            )), !0), t.map((function(e) {
                                return {
                                    name: e.name,
                                    expire_seconds: 0,
                                    type: "idb"
                                }
                            }
                            )), !0),
                            r = {
                                cookies: i,
                                p4d_game_id: h.Z.gameID,
                                user_id: X
                            },
                            window.fetch("https://t.poki.io/game-cookies", {
                                method: "post",
                                body: JSON.stringify(r)
                            }).catch(),
                            [3, 6];
                        case 5:
                            return o.sent(),
                            [3, 6];
                        case 6:
                            return [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e.trackSavegames = function() {
                window.cookieStore && window.cookieStore.getAll && h.Z.gameID && (Math.random() > .01 || navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") <= -1 || (X || (X = Math.random().toString(36).substr(2, 9),
                G(F, X)),
                e.collectAndLog(),
                setInterval(e.collectAndLog, 12e4)))
            }
            ,
            e
        }();
        const V = H;
        function K() {
            if (document.body && document.body.appendChild) {
                var e = document.createElement("iframe");
                e.style.display = "none",
                document.body.appendChild(e),
                e.contentWindow && (window.pokiKeysChanged = new Map,
                e.contentWindow.document.open(),
                e.contentWindow.document.write("<script>\nconst lsKey = 'poki_lsexpire';\nconst lifetime = 1000*60*60*24*30*6;\n\nwindow.addEventListener('storage', function(event) {\n\ttry {\n\t\tconst key = event.key;\n\n\t\t// key is null when localStorage.clear() is called.\n\t\tif (key === null) {\n\t\t\tlocalStorage.removeItem(lsKey);\n\t\t\treturn;\n\t\t}\n\n\t\tif (key === lsKey) return;\n\n\t\tconst updates = JSON.parse(localStorage.getItem(lsKey)) || {};\n\n\t\t// newValue is null when localStorage.removeItem() is called.\n\t\tif (event.newValue === null) {\n\t\t\tdelete updates[key];\n\n\t\t\t// window.parent is the game itself. This code is executed in\n\t\t\t// an iframe without src which makes it the same context as it's parent\n\t\t\t// which makes it save to access the parent's properties.\n\t\t\twindow.parent.pokiKeysChanged.set(key, 'remove');\n\t\t} else {\n\t\t\tupdates[key] = Date.now();\n\t\t\twindow.parent.pokiKeysChanged.set(key, 'set');\n\t\t}\n\t\tlocalStorage.setItem(lsKey, JSON.stringify(updates));\n\t} catch (e) {}\n});\n\nfunction expire() {\n\tconst updates = JSON.parse(localStorage.getItem(lsKey)) || {};\n\tconst expireBefore = Date.now() - lifetime;\n\tvar removed = false;\n\n\tObject.keys(updates).map(function(key) {\n\t\tif (updates[key] < expireBefore) {\n\t\t\tlocalStorage.removeItem(key);\n\t\t\tdelete updates[key];\n\t\t\tremoved = true;\n\t\t}\n\t});\n\n\tif (removed) {\n\t\tlocalStorage.setItem(lsKey, JSON.stringify(updates));\n\t}\n}\n\ntry {\n\texpire();\n} catch (e) {}\n<\/script>"),
                e.contentWindow.document.close())
            } else
                document.addEventListener("DOMContentLoaded", K)
        }
        var J = function() {
            h.Z.gdprApplies && (L.setRequireConsent(!0),
            function() {
                if (!window.__tcfapi) {
                    var e = window.top
                      , t = {};
                    window.__tcfapi = function(n, i, r, o) {
                        var a = "" + Math.random()
                          , s = {
                            __tcfapiCall: {
                                command: n,
                                parameter: o,
                                version: i,
                                callId: a
                            }
                        };
                        t[a] = r,
                        e.postMessage(s, "*")
                    }
                    ,
                    window.addEventListener("message", (function(e) {
                        var n = {};
                        try {
                            n = "string" == typeof e.data ? JSON.parse(e.data) : e.data
                        } catch (e) {}
                        var i = n.__tcfapiReturn;
                        i && "function" == typeof t[i.callId] && (t[i.callId](i.returnValue, i.success),
                        t[i.callId] = null)
                    }
                    ), !1)
                }
            }()),
            h.Z.ccpaApplies && function() {
                if (!window.__uspapi) {
                    var e = window.top
                      , t = {};
                    window.__uspapi = function(n, i, r) {
                        var o = "" + Math.random()
                          , a = {
                            __uspapiCall: {
                                command: n,
                                version: i,
                                callId: o
                            }
                        };
                        t[o] = r,
                        e.postMessage(a, "*")
                    }
                    ,
                    window.addEventListener("message", (function(e) {
                        var n = e && e.data && e.data.__uspapiReturn;
                        n && n.callId && "function" == typeof t[n.callId] && (t[n.callId](n.returnValue, n.success),
                        t[n.callId] = null)
                    }
                    ), !1)
                }
            }(),
            ie()
        }
          , W = !1
          , Y = !1
          , $ = function() {
            window.__tcfapi && window.__tcfapi("ping", 2, (function() {
                console.debug("GDPR - __tcfapi callback received"),
                W = !0,
                clearInterval(ee)
            }
            ))
        }
          , ee = setInterval($, 2e3)
          , te = function() {
            window.__uspapi && window.__uspapi("uspPing", 1, (function() {
                console.debug("USPrivacy - __uspapi callback received"),
                Y = !0,
                clearInterval(ne)
            }
            ))
        }
          , ne = setInterval(te, 2e3)
          , ie = function() {
            h.Z.gdprApplies && (clearInterval(ne),
            $(),
            setTimeout((function() {
                W || console.error("GDPR - No __tcfapi callback after 2s, verify implementation!")
            }
            ), 2e3)),
            h.Z.ccpaApplies && (clearInterval(ee),
            te(),
            setTimeout((function() {
                Y || console.error("USPrivacy - No __uspapi callback after 2s, verify implementation!")
            }
            ), 2e3)),
            (!h.Z.gdprApplies && !h.Z.ccpaApplies || m.debug) && (clearInterval(ee),
            clearInterval(ne))
        }
          , re = function() {
            return h.Z.gdprApplies && !W && !m.debug
        }
          , oe = function() {
            return h.Z.ccpaApplies && !Y && !m.debug
        }
          , ae = a(992);
        const se = function() {
            for (var e = Math.floor(Date.now() / 1e3), t = "", n = 0; n < 4; n++)
                t = String.fromCharCode(255 & e) + t,
                e >>= 8;
            if (window.crypto && crypto.getRandomValues && Uint32Array) {
                var i = new Uint32Array(12);
                crypto.getRandomValues(i);
                for (n = 0; n < 12; n++)
                    t += String.fromCharCode(255 & i[n])
            } else
                for (n = 0; n < 12; n++)
                    t += String.fromCharCode(Math.floor(256 * Math.random()));
            return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
        };
        const de = function(e) {
            return e instanceof Array ? e : [e]
        };
        const ce = {
            adTagUrl: "//pubads.g.doubleclick.net/gampad/ads?sz=640x360|640x480&iu=/1053551/Pub-Poki-Generic&ciu_szs&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url={url}&description_url={descriptionUrl}&correlator={timestamp}",
            adTiming: {
                preroll: !1,
                timeBetweenAds: 12e4,
                timePerTry: 7e3,
                startAdsAfter: 12e4
            },
            waterfallRetries: 2
        };
        const le = function() {
            function e(e) {
                void 0 === e && (e = {}),
                this.setTimings(e),
                this.timingIdx = {
                    timePerTry: 0
                },
                this.timers = {
                    timePerTry: void 0,
                    timeBetweenAds: void 0,
                    startAdsAfter: void 0
                },
                y.addEventListener(n.Z.ads.requested, this.startTimeBetweenAdsTimer.bind(this)),
                y.addEventListener(n.Z.ads.completed, this.startTimeBetweenAdsTimer.bind(this)),
                y.addEventListener(n.Z.ads.stopped, this.startTimeBetweenAdsTimer.bind(this))
            }
            return e.prototype.setTimings = function(e) {
                var t = ce.adTiming
                  , n = e.preroll
                  , i = void 0 === n ? t.preroll : n
                  , r = e.timePerTry
                  , o = void 0 === r ? t.timePerTry : r
                  , a = e.timeBetweenAds
                  , s = void 0 === a ? t.timeBetweenAds : a
                  , d = e.startAdsAfter
                  , c = void 0 === d ? t.startAdsAfter : d;
                this.timings = {
                    preroll: !1 !== i,
                    timePerTry: de(o),
                    timeBetweenAds: s,
                    startAdsAfter: c
                }
            }
            ,
            e.prototype.startTimeBetweenAdsTimer = function() {
                this.startTimer("timeBetweenAds")
            }
            ,
            e.prototype.startStartAdsAfterTimer = function() {
                this.startTimer("startAdsAfter")
            }
            ,
            e.prototype.requestPossible = function() {
                return !this.timers.timeBetweenAds && !this.timers.startAdsAfter
            }
            ,
            e.prototype.startWaterfallTimer = function(e) {
                this.startTimer("timePerTry", e)
            }
            ,
            e.prototype.stopWaterfallTimer = function() {
                this.stopTimer("timePerTry")
            }
            ,
            e.prototype.nextWaterfallTimer = function() {
                this.nextTiming("timePerTry")
            }
            ,
            e.prototype.resetWaterfallTimerIdx = function() {
                this.resetTimingIdx("timePerTry")
            }
            ,
            e.prototype.stopTimer = function(e) {
                this.timers[e] && (clearTimeout(this.timers[e]),
                this.timers[e] = void 0)
            }
            ,
            e.prototype.startTimer = function(e, t) {
                var n = this;
                void 0 === t && (t = function() {}
                ),
                this.getTiming(e) <= 0 ? t() : (this.timers[e] && clearTimeout(this.timers[e]),
                this.timers[e] = window.setTimeout((function() {
                    n.stopTimer(e),
                    t()
                }
                ), this.getTiming(e)))
            }
            ,
            e.prototype.getTiming = function(e) {
                var t = this.timings[e];
                return t instanceof Array ? t[this.timingIdx[e]] : t
            }
            ,
            e.prototype.nextTiming = function(e) {
                if (void 0 === this.timingIdx[e])
                    throw new Error("AdTimings Error: " + e + " does not have multiple timers");
                this.timingIdx[e] = (this.timingIdx[e] + 1) % this.timings[e].length
            }
            ,
            e.prototype.resetTimingIdx = function(e) {
                if (void 0 === this.timingIdx[e])
                    throw new Error("AdTimings Error: " + e + " does not have multiple timers");
                this.timingIdx[e] = 0
            }
            ,
            e.prototype.prerollPossible = function() {
                return this.timings.preroll
            }
            ,
            e
        }();
        var Ae = a(906);
        const ue = function() {
            return window.location.href
        }
          , pe = function() {
            return "undefined" != typeof navigator && /MSIE \\d|Trident.*rv:/i.test(navigator.userAgent)
        };
        var he = {
            1: "eNjDw1AVTr",
            3: "AfRKClvdYk",
            5: "UprdYKe74r",
            6: "tBCJC9E6Y4",
            7: "AfRKClvdYk",
            8: "tJ44vpLpuM",
            10: "rKV8rMwiwk",
            11: "SvK8BH5qS5",
            12: "SpfIMxnWTS",
            13: "ysxIcmt3tW",
            14: "gLmtGS4aUq",
            15: "RU6ebIFLw9",
            16: "r9G4tVMYw7",
            17: "SgcDa5B8s1",
            18: "AfRKClvdYk",
            19: "DNZX8XdJXV",
            20: "39o4YUyZTX",
            21: "5sb2HFpz5a",
            22: "pgXzCJZipE",
            23: "Oani8EAGI9",
            24: "IzCeh7d7vW",
            30: "9ALgxEyGXU",
            31: "lBzSdVGY8F",
            37: "mis9Mt4np4",
            38: "AfRKClvdYk",
            43: "AfRKClvdYk",
            46: "AfRKClvdYk",
            47: "21OybbiIdc",
            48: "AfRKClvdYk",
            49: "CMVoMvvEmu",
            50: "IoQrhRb3wU",
            52: "AfRKClvdYk",
            53: "AfRKClvdYk"
        };
        var me = ["AU", "CA", "IE", "NZ", "US", "GB"]
          , ge = ["AT", "BE", "DK", "FI", "FR", "DE", "JA", "NO", "NL", "SA", "ES", "SE", "CH", "AE", "IT"]
          , fe = ["BR", "CL", "CZ", "HU", "PL", "PT", "RU", "SK", "TH"]
          , ve = ["AR", "BG", "CO", "EC", "GR", "IN", "MX", "PE", "PH", "RO", "TR", "UY"];
        function be() {
            var e = h.Z.country;
            return "US" === e ? 1.5 : me.includes(e) ? .5 : ge.includes(e) ? .15 : fe.includes(e) ? .08 : ve.includes(e) ? .03 : .02
        }
        function ye() {
            var e = new URL("https://api.poki.com/ads/houseads/video/vast")
              , t = (0,
            Ae.Z)("site_id");
            return e.searchParams.append("game_id", h.Z.gameID),
            e.searchParams.append("site", t),
            e.href
        }
        var ke = {
            v_k0treo: 2.5,
            v_qr1wxs: 7.5,
            v_9diccg: 19,
            v_13q0xkw: .25,
            v_dn33ls: 1,
            v_z07u2o: 1.5,
            v_1400iyo: 2.25,
            v_9w8kxs: 3,
            v_ufej9c: 3.5,
            v_10960ao: 4.25,
            v_1ksbym8: 4.75,
            v_1ag9340: 5.25,
            v_1tbhh4w: 5.75,
            v_jjcgzk: 6.5,
            v_brnu9s: 7,
            v_1wscef4: 7.75,
            v_q22xhc: 8.5,
            v_f8irk0: 9,
            v_1rik45c: 9.75,
            v_lxhyww: 10.5,
            v_a9z0u8: 11,
            v_1yhiww0: 11.75,
            v_10mwg74: 12.25,
            v_1ji4u80: 12.75,
            v_wm2c5c: 13.5,
            v_2na6tc: 14,
            v_1myzri8: 14.75,
            v_3pzm68: 6,
            v_16kerr4: 6.25,
            v_1mdrmkg: 6.75,
            v_1ga0k5c: 7.25,
            v_5iwz5s: 8,
            v_12tk934: 8.25,
            v_1hsybr4: 8.75,
            v_1cj61hc: 9.25,
            v_y3r5kw: 9.5,
            v_94ow0: 10,
            v_15woqgw: 10.25,
            v_1orx4hs: 10.75,
            v_1d4e6f4: 11.25,
            v_t57ev4: 11.5,
            v_783hmo: 12,
            v_m7hkao: 12.5,
            v_hmo9hc: 13,
            v_19djnr4: 13.25,
            v_1twpm2o: 13.75,
            v_17zlou8: 14.25,
            v_ign1mo: 14.5,
            v_ccvz7k: 15,
            v_1f7b4sg: 15.25,
            v_snq4g0: 15.5,
            v_5wnf28: 16,
            v_137aozk: 16.25,
            v_1j0njsw: 16.75,
            v_1b8yx34: 17.25,
            v_yhhlhc: 17.5,
            v_25swe8: 18,
            v_15081z4: 18.25,
            v_1pje0ao: 18.75,
            v_1eptudc: 19.25,
            v_1xl28e8: 19.75,
            v_gfliio: 21,
            v_3y3sao: 22,
            v_ixhuyo: 22.5,
            v_ro52io: 23.5,
            v_qa73ls: 24.5,
            v_emo5j4: 25,
            v_yq5fk: 26,
            v_aobxts: 27,
            v_6shmgw: 28,
            v_natgqo: 28.5,
            v_x0f94w: 29.5,
            v_d2hfr4: 31,
            v_dch14w: 33,
            v_1jyadc: 34,
            v_8p5tz4: 36,
            v_fwv9xc: 37,
            v_c60r9c: 39,
            v_58awow: 40,
            v_bbcow: 42,
            v_a0x534: 43,
            v_hdmdq8: 45,
            v_2e8b28: 46,
            v_5nljb4: 48,
            v_1wr0n4: 50,
            v_pam1og: .5,
            v_1ipf08w: .75,
            v_1axqdj4: 1.25,
            v_1qr38cg: 1.75,
            v_15ldds: 2,
            v_1q248w0: 2.75,
            v_1eelatc: 3.25,
            v_1x9tou8: 3.75,
            v_8iam0w: 4,
            v_nhooow: 4.5,
            v_fq01z4: 5,
            v_w0u77k: 5.5,
            v_1vi5a0w: 15.75,
            v_orvt34: 16.5,
            v_dybn5s: 17,
            v_1q8czr4: 17.75,
            v_l11af4: 18.5,
            v_uqn2tc: 19.5,
            v_7zkdfk: 20,
            v_o7a58g: 20.5,
            v_vezl6o: 21.5,
            v_b5t88w: 23,
            v_4x2d4w: 24,
            v_xhwjk0: 25.5,
            v_lhw3r4: 26.5,
            v_tjkbuo: 27.5,
            v_h72ebk: 29,
            v_31n3sw: 30,
            v_64rl6o: 32,
            v_9lmigw: 35,
            v_3fdjpc: 38,
            v_fapfcw: 41,
            v_7o0lc0: 44,
            v_clbdvk: 47,
            v_ee8qv4: 49
        }
          , we = {
            "11s3rwg": 2.49,
            "1uhxr0g": 2.87,
            qr1wxs: 7.5,
            "15xxon4": .01,
            o6no5c: .02,
            fb0nwg: .04,
            "1etkow0": .05,
            x2aoe8: .06,
            "1wkupds": .07,
            "11i46io": .09,
            jqu60w: .1,
            "1j9e70g": .11,
            "1adr6rk": .13,
            smh69s: .14,
            "1s5179c": .15,
            "8naeps": .16,
            qekf7k: .18,
            "1px4g74": .19,
            hixeyo: .2,
            za7fgg: .22,
            "1ysrgg0": .23,
            lyqx34: .26,
            "16hwveo": 1.13,
            "1fdjvnk": 1.17,
            "2jjcao": 1.2,
            "1jtdds0": 1.23,
            t6gd1c: 1.26,
            "65e29s": 1.28,
            "1nf83r4": 1.31,
            wsb30g: 1.34,
            jgukn4: 1.38,
            al7ke8: 1.4,
            "1a3rlds": 1.41,
            "8datc0": 1.44,
            "1pn4utc": 1.47,
            z07u2o: 1.5,
            "13g1c74": 1.53,
            ct4bgg: 1.56,
            ukeby8: 1.58,
            mspp8g: 1.62,
            "1dfmpz4": 1.65,
            lm6m8: 1.68,
            icw740: 1.7,
            "18zt7uo": 1.73,
            "79cfsw": 1.76,
            "1oj6ha8": 1.79,
            "1xethj4": 1.83,
            "12c2yo0": 1.85,
            bp5xxc: 1.88,
            "1syzzeo": 1.91,
            ncow00: 1.94,
            "1dzlwqo": 1.97,
            "15ldds": 2,
            "10o5edc": 2.009999,
            a18dmo: 2.04,
            "1rb2f40": 2.069999,
            pkln28: 2.1,
            "1g7insw": 2.13,
            "12w25fk": 2.17,
            c954ow: 2.2,
            "1brp5og": 2.21,
            "1400iyo": 2.25,
            v4dips: 2.3,
            hsx0cg: 2.34,
            "18fu134": 2.37,
            "167xa0w": 2.41,
            "1f3ka9s": 2.45,
            "1d5n4lc": 1.01,
            "1uwx534": 1.03,
            bml8g: 1.04,
            i2wlq8: 1.06,
            "979lhc": 1.08,
            "18ptmgw": 1.09,
            "1qh3myo": 1.11,
            "6zcuf4": 1.12,
            oqmuww: 1.14,
            fuzuo0: 1.16,
            xm9v5s: 1.18,
            "1x4tw5c": 1.19,
            "1223da8": 1.21,
            katcsg: 1.22,
            bf6cjk: 1.24,
            "1axqdj4": 1.25,
            "1sp0e0w": 1.27,
            "15ny39c": 1.29,
            nwo2rk: 1.3,
            f112io: 1.32,
            "1ejl3i8": 1.33,
            "1pkk5c": 1.36,
            "1184l4w": 1.37,
            "1izelmo": 1.39,
            schkw0: 1.42,
            "1rv1lvk": 1.43,
            "17vuubk": 1.45,
            q4ktts: 1.46,
            h8xtkw: 1.48,
            "1yirv28": 1.51,
            "3xhb7k": 1.52,
            lorbpc: 1.54,
            "1l7bcow": 1.55,
            "1cbocg0": 1.57,
            "1u2ycxs": 1.59,
            "51foqo": 1.6,
            "14jzpq8": 1.61,
            "1mb9q80": 1.63,
            dx2ozk: 1.64,
            vocphc: 1.66,
            "1v6wqgw": 1.67,
            "10467ls": 1.69,
            "1hvg83k": 1.71,
            "9h96v4": 1.72,
            r8j7cw: 1.74,
            "1qr38cg": 1.75,
            "16rwgsg": 1.77,
            p0mgao: 1.78,
            g4zg1s: 1.8,
            "1fnjh1c": 1.81,
            xw9gjk: 1.82,
            "2tixog": 1.84,
            kksy68: 1.86,
            "1k3cz5s": 1.87,
            "1b7pyww": 1.89,
            tgfyf4: 1.9,
            "5levi8": 1.92,
            "153ywhs": 1.93,
            "1mv8wzk": 1.95,
            eh1vr4: 1.96,
            w8bw8w: 1.98,
            iwvdvk: 2.02,
            "1iffev4": 2.029999,
            "19jsem8": 2.049999,
            rsie4g: 2.06,
            "7tbmkg": 2.08,
            "17bvnk0": 2.089999,
            "1p35o1s": 2.11,
            goymtc: 2.12,
            "1xysoao": 2.15,
            "3di4g0": 2.16,
            l4s4xs: 2.18,
            "1knc5xc": 2.19,
            u0f56o: 2.22,
            "1tiz668": 2.23,
            "4hghz4": 2.24,
            m8qigw: 2.26,
            dd3i80: 2.28,
            "1cvnj7k": 2.29,
            "1umxjpc": 2.31,
            "1mzuo": 2.32,
            zk70u8: 2.33,
            "1hbh1c0": 2.35,
            "8xa03k": 2.36,
            qok0lc: 2.38,
            "1q741kw": 2.39,
            "6pd91c": 2.4,
            ogn9j4: 2.42,
            "1wuuark": 2.47,
            k0treo: 2.5,
            "1jjdse8": 2.51,
            swgrnk: 2.54,
            "162xhc0": 2.57,
            fg0glc: 2.6,
            l11af4: 18.5,
            "9diccg": 19,
            "7zkdfk": 20,
            gfliio: 21,
            b5t88w: 23,
            "4x2d4w": 24,
            emo5j4: 25,
            aobxts: 27,
            "6shmgw": 28,
            "31n3sw": 30,
            "64rl6o": 32,
            dch14w: 33,
            "9lmigw": 35,
            "1yv9csg": 5.35,
            o42yo: 6.8,
            q22xhc: 8.5,
            d2hfr4: 31,
            "1np7p4w": .03,
            "1zk5j4": .08,
            av75s0: .12,
            "185ufpc": .17,
            "1h1hfy8": .21,
            "47gwlc": .24,
            d33wu8: .28,
            uudxc0: .3,
            "14tzb40": .33,
            e72adc: .36,
            "1vgwbuo": .39,
            "10e5szk": .41,
            "1i5fthc": .43,
            "1r12tq8": .47,
            pam1og: .5,
            gez1fk: .52,
            "1xot2ww": .55,
            kusjk0: .58,
            bz5jb4: .6,
            tqfjsw: .62,
            "5vegw0": .64,
            "1n58idc": .67,
            wibhmo: .7,
            "1fkyrk": .72,
            "1ipf08w": .75,
            s2hzi8: .78,
            pul8g0: .82,
            "1ghi96o": .85,
            "3nhpts": .88,
            lerqbk: .9,
            uaeqkg: .94,
            "14a04cg": .97,
            dn33ls: 1,
            ved43k: 1.02,
            zu6m80: 1.05,
            "1hlgmps": 1.07,
            qyjlz4: 1.1,
            "1lhay2o": .27,
            "1clnxts": .29,
            "1ucxybk": .31,
            "5bfa4g": .32,
            n2pam8: .34,
            "1ml9bls": .35,
            "1dpmbcw": .37,
            vycav4: .38,
            vls00: .4,
            imvshs: .42,
            "9r8s8w": .44,
            "199st8g": .45,
            "7jc16o": .48,
            "171w268": .49,
            "1ot62o0": .51,
            "1fxj2f4": .53,
            y691xc: .54,
            "33ij28": .56,
            "12m2k1s": .57,
            "1kdckjk": .59,
            "1t8zksg": .63,
            "15dyhvk": .65,
            nmohds: .66,
            er1h4w: .68,
            "1e9li4g": .69,
            "1w0vim8": .71,
            "10y4zr4": .73,
            j6uz9c: .74,
            ab7z0g: .76,
            "19ts000": .77,
            "1rl20hs": .79,
            "83b7y8": .8,
            "17lv8xs": .81,
            "1pd59fk": .83,
            gyy874: .84,
            yq88ow: .86,
            "1y8s9og": .87,
            "1361qtc": .89,
            "1kxbrb4": .91,
            "1c1or28": .93,
            "1tsyrk0": .95,
            "4rg3cw": .96,
            miq3uo: .98,
            "1m1a4u8": .99,
            "11x3klc": 5.05,
            "1nrplhc": 5.15,
            "1ag9340": 5.25,
            qh2bk0: 5.3,
            "14wh7gg": 5.45,
            w0u77k: 5.5,
            "7ltxj4": 5.6,
            kxafwg: 5.7,
            "1tbhh4w": 5.75,
            "110mw3k": 5.85,
            "1pfn5s0": 5.95,
            "3pzm68": 6,
            ml8074: 6.1,
            "1uzf1fk": 6.15,
            "16kerr4": 6.25,
            "1jvva4g": 6.35,
            "67vym8": 6.4,
            jjcgzk: 6.5,
            hbfpxc: 6.6,
            "13ij8jk": 6.65,
            "1mdrmkg": 6.75,
            p34cn4: 6.9,
            "1xhbdvk": 6.95,
            "1ihxb7k": 7.15,
            "1ga0k5c": 7.25,
            dflekg: 7.4,
            "1o1p6v4": 7.55,
            "2c1n9c": 7.6,
            "1wscef4": 7.75,
            zhp4hs: 7.9,
            "5iwz5s": 8,
            f8irk0: 9,
            y3r5kw: 9.5,
            lxhyww: 10.5,
            a9z0u8: 11,
            "783hmo": 12,
            m7hkao: 12.5,
            wm2c5c: 13.5,
            "2na6tc": 14,
            ign1mo: 14.5,
            snq4g0: 15.5,
            "5wnf28": 16,
            dybn5s: 17,
            yhhlhc: 17.5,
            testbid: 0,
            "1nz7aio": 2.43,
            xca9s0: 2.46,
            b56r5s: 2.52,
            obngu8: 2.58,
            "24jy80": 2.64,
            "1jedzpc": 2.67,
            "18au8e8": 2.73,
            hnx7nk: 2.76,
            "13v0q9s": 2.81,
            "10lkow": 2.96,
            "156gsu8": 7.05,
            "1tlh2io": 7.35,
            "1aq8ohs": 7.65,
            "1losn40": 7.95,
            "1sf0sn4": 2.55,
            "1eykhkw": 2.61,
            srgyyo: 2.7,
            "1yxr94w": 2.79,
            d83pj4: 2.84,
            n7p3b4: 2.9,
            "1dum41s": 2.93,
            "1iafm68": 2.99,
            "7vtiww": 7.2,
            b2outc: 7.8,
            "13q0xkw": .25,
            riisqo: .46,
            "1bhpkao": .61,
            cj4q2o: .92,
            "1o96vwg": 1.15,
            "1wav400": 1.35,
            "1grhukg": 1.49,
            "1vqvx8g": 1.99,
            yg8nb4: 2.14,
            "1lrajgg": 2.27,
            fl09a8: 2.44,
            "1h6h8n4": 2.77,
            "1m69xj4": 3.55,
            rdj01s: 4.3,
            "29jqww": 2.48,
            "1anqs5c": 2.53,
            "6kdgcg": 2.56,
            "1nu7hts": 2.59,
            "1wpui2o": 2.63,
            jvtyps: 2.66,
            "1sa0zy8": 2.71,
            "1q248w0": 2.75,
            "4cgpa8": 2.8,
            "1cqnqio": 2.85,
            "5gf2tc": 2.88,
            ec2328: 2.92,
            "1vlw4jk": 2.95,
            "9w8kxs": 3,
            "176vuv4": 3.05,
            "1kicd8g": 3.15,
            jbury8: 3.3,
            h3y0w0: 3.4,
            gmdxc: 3.6,
            ovmnls: 3.7,
            "15sxvy8": 3.85,
            "1j4eebk": 3.95,
            "1gwhn9c": 4.05,
            e22hog: 4.2,
            "1oo69z4": 4.35,
            nhooow: 4.5,
            "17gvg8w": 4.65,
            "1ksbym8": 4.75,
            hxwt1c: 4.9,
            t1gkcg: 5.1,
            "2221vk": 5.2,
            d5lt6o: 5.4,
            "1i7xpts": 5.55,
            "1g00yrk": 5.65,
            etjdhc: 5.8,
            s4zvuo: 5.9,
            "1c46neo": 6.05,
            "99rhts": 6.2,
            xorri8: 6.3,
            "1em2zuo": 6.45,
            "1rxji80": 6.55,
            umw8ao: 6.7,
            "192b474": 6.85,
            brnu9s: 7,
            x7ah34: 2.62,
            "11n3z7k": 2.65,
            b06ygw: 2.68,
            "1aiqzgg": 2.69,
            "8sa7eo": 2.72,
            qjk7wg: 2.74,
            zf785c: 2.78,
            m3qps0: 2.82,
            "1lmaqrk": 2.83,
            uzdq0w: 2.86,
            "14yz3sw": 2.89,
            "1mq94ao": 2.91,
            w3c3k0: 2.94,
            "10j5log": 2.97,
            irvl6o: 2.98,
            yb8um8: 3.1,
            "60e9kw": 3.2,
            "1eelatc": 3.25,
            "1rq1t6o": 3.35,
            "13b1ji8": 3.45,
            ufej9c: 3.5,
            "18utf5s": 3.65,
            "1x9tou8": 3.75,
            bk658g: 3.8,
            wxavpc: 3.9,
            "8iam0w": 4,
            ltr4e8: 4.099999,
            "1u7y5mo": 4.15,
            "10960ao": 4.25,
            "2yiqdc": 4.4,
            "1bcprls": 4.45,
            "1vvvpxc": 4.55,
            a686bk: 4.6,
            yl8g00: 4.7,
            "4mgao0": 4.8,
            "1d0nbwg": 4.85,
            "1qc3u9s": 4.95,
            fq01z4: 5,
            watslc: 7.1,
            l7a1a8: 7.3,
            zmox6o: 7.45,
            oe5d6o: 7.7,
            "18dc4qo": 7.85,
            "94ow0": 10,
            t57ev4: 11.5,
            hmo9hc: 13,
            ccvz7k: 15,
            orvt34: 16.5,
            "25swe8": 18,
            uqn2tc: 19.5,
            "3y3sao": 22,
            yq5fk: 26,
            h72ebk: 29,
            "1jyadc": 34,
            testBid: 50
        }
          , xe = {
            hgfim8: "Amazon - DistrictM",
            qc2iv4: "Amazon - Magnite",
            "183cjcw": "Amazon - AppNexus",
            "8ksidc": "Amazon - OpenX",
            "1s2jaww": "Amazon - PubMatic",
            "1pumjuo": "Amazon - EMX",
            "12jknpc": "Amazon - Conversant UAM",
            "1kauo74": "Amazon - Amobee DSP",
            "15bglj4": "Amazon - PubMatic UAM APAC",
            "5swkjk": "Amazon - PubMatic UAM EU",
            "1d32f4": "Amazon - Simpli.fi",
            ksan7k: "Amazon - Index Exchange",
            urw0zk: "Amazon - Smaato",
            "1dn4f0g": "Amazon - AdGeneration",
            vvueio: "Amazon - DMX",
            "1veefi8": "Amazon - Yieldmo",
            "1i2xx4w": "Amazon - Yahoo Japan",
            rg0we8: "Amazon - UnrulyX_SSP_APS",
            y3r5kw: "Amazon - Verizon Media Group",
            "1xmb6kg": "Amazon - GumGum UAM",
            "1t6hog0": "Amazon - Acuity",
            "1n2qm0w": "Amazon - Sharethrough",
            j4d2ww: "Amazon - EMX UAM",
            "1imx3wg": "Amazon - LoopMe_UAM",
            z7pj40: "Amazon - Pulsepoint",
            p845c0: "Amazon - SmartRTB+"
        };
        var Ee = {
            skyscraper: {
                1: "eexq7SUa6daeQrPF6q1CaKZ0",
                10: "SSZzGHt3d4BrOdVUug1ypxji",
                11: "OXc0ZJDJIcRgGcIta8mTUQSZ",
                12: "ulACVGPjP002tSfhDGRApuub",
                13: "c7FldnCsd9Mtcr7PgBFGKWEQ",
                14: "KJouWQMjZwvE8fxw4mAvGopZ",
                15: "ilNkOqBMO6EGbQwrZtCMHzeJ",
                16: "Kg24ec1AyTvzJ6I3Cji8lqzx",
                17: "iqvpcyepSMCVCsJfKu4JQGwr",
                18: "es9ztDrPZDW883VHbK2gUfkQ",
                19: "pvXQE41GXKGsW5Li0OSQavwT",
                20: "MCy638sYvzVbsrvcPau6lABN",
                21: "NkJeV6CuMlt41iJWcgnmMSDN",
                22: "fjKznUvVWlp6TBxuSsEkQF8H",
                23: "5tJM2ZFmNf7gii6KVS6msGc4",
                24: "xZUYMFw1zGuRzFd6DRl88Pwk",
                3: "xNmhWWy88VtzOGfderrtgDBb",
                30: "KO0gUA5iJIsleK9a941H0pW1",
                31: "wo0KU1WR11jNFxoy121ciQj8",
                37: "areVtONg11YNRQin7R2sveKy",
                47: "uzLaOEe8yqB9eWZuxdnwyawr",
                49: "ZYaqiQw00NSTBGJ4HacifENM",
                5: "qe5Tc3N2MO3daALoTdIaTmSA",
                50: "NZv1ui2F1tlQ6PQQi7umnFht",
                6: "xbx8OLCAgjm0igkmFIBw8n6E",
                8: "4vYDfNOQagnuwg9REGNWGv83"
            },
            rectangle: {
                1: "Ka3KvQx9svu71CJoRtZlwFY9",
                10: "9o5dMBQZX9bi2OsvTpc5j0pO",
                11: "gwL6nB1Twy25gpWQyEP2cVMJ",
                12: "yYUjIY5L6w2ukD5FxCIVydgG",
                13: "PoqRXAEYHKTdqNY22lIFTXRp",
                14: "eAudypoJLJEtFZz3zzvKYoAu",
                15: "4b416MUjJEdZm5nDKwvn2ELO",
                16: "H6jadzxgw0uRVRHHadZ19Zvp",
                17: "5zG8Ioh6paBscdCgUQTQE0eu",
                18: "OgMX0PlDPabF3BHOgxDbeH2n",
                19: "uzK7eCjSVYDp4KvJEg6mC59r",
                20: "yapIY909O3cgcD8QDAEehtkb",
                21: "8KT1bEUCcvASfq0LXWN2nVe0",
                22: "3LKyDpL1Xt7YactKFGxFpJO7",
                23: "GMaOiZl6YeMzYckusbO4Cdh1",
                24: "5iZnMqviynz6ndlaikqhMy73",
                3: "lcpgaTLqkd6gRi8AVtVr0gLe",
                30: "xWGhFW6bvMf9LuGYqQOhoD2h",
                31: "GqMz69ka237zrG4H8bpMuYTy",
                37: "lYrk2xnelCQrhwmO43AtjErF",
                47: "PDA12fEHtYIVr6A12fZ86JQH",
                49: "RYn9wxADCbBgKeo8Lyxx1ZHE",
                5: "N3wOmgPMiK6RaGNYjeqOzuHU",
                50: "KwEXqYIZG8fOlJyePKTBiJFs",
                6: "fJMv7XtKbfsRbzkO42fkS3Dr",
                8: "915o8cwxF5rzfQsA1Op6hhQV"
            },
            leaderboard: {
                16: "ZPwouCq7eD5kRnZjX5ct8ZIT",
                1: "sysnuL1RKPIEL98w2l6lPc1w",
                31: "FgHUFCWMZCCJaHKMF0LyIgSI",
                23: "eyGVQGQkrHwJRcLoBzepUHW2",
                14: "PeRnr3pCNPpCgJAOF3yuQCGg",
                37: "5DXFSCYcaAxAXBuZVpTHAx59",
                30: "MpHDUxZ178U65yD3l878z5m1",
                47: "oYQGytr0CbDDQqIooggCsNTO",
                18: "na3uJK58s0vgb7NyaPR6R5P8",
                50: "m3hskIBrmloAWHD7i27q2ZPN",
                3: "PIsUL8EJvXXA1thcFkCPWdhi",
                19: "cluKVL1thRZlb3bsK7oVadOZ",
                20: "8PPLwmi2mra9HNTdhftQOcC4",
                8: "cCQE4L5S1j9BmKeywuonM6hM",
                11: "uvkuS4QYv01YvuGoJvqa9xnz",
                12: "GyG0XHcaahKmsXbcjDlgtjCQ",
                17: "0ut5aHlZRj5dNfTKo9bM8nXj",
                10: "TzMO5iGdP4vt7BIOAQ2e3kpU",
                49: "f1vArQjoEfX9QdjK2TvBjnDv",
                22: "92kdBH3AxvPr1pqZ1h1TYkjN",
                13: "Y6Tl87JTAn9T1B8rq523UDeH",
                15: "B3HlKKIdq8mGyoMGkjT4m9RD",
                24: "nfS0DrtZtJ6eZVNqsWqyVVFS",
                5: "gr33qXeArxdqi0Sk4i50TmE3",
                6: "ACn0XyU2KP2l94N0HMf1vhlu",
                21: "o2PQGGTxXO92in2mASt624tn"
            },
            mobile_leaderboard: {
                16: "5X98AYdO2OAIb2m6ThLjCGR5",
                1: "nVDrFwfkiRg5Tb426duBnat4",
                31: "H8tpygATsgJwk7qJzh612B0I",
                23: "07iMij2dOIgPHzM7JFv5fYBN",
                14: "XCQLWETuRkKmiN9jCOu01NOp",
                37: "419OVNbGzLJn7wlh5jAiUFLA",
                30: "ErE9N4WozhjbawA6HFN2hC0V",
                47: "4aBsJtSPEivB07hrlV6nTgj7",
                18: "waksL4h4X7gn2TU88OgeZHHl",
                50: "Wi3BRMWcCUdKZO7leMhtCfdp",
                3: "KQ3P2qVndkjlesGkzM5Rknma",
                19: "OCsZIZrTXKyprJ8AKiI7e0Jl",
                20: "h2aMA8KeZ3tHtfRgwT2xCHUJ",
                8: "igvEPDF1ft8FBFQ2aVhCS0BG",
                11: "I1ZnJzEjRg75BZikcGMWxMTF",
                12: "ZrnW76G2qvB5pZx8VvOanqQQ",
                17: "B4f8YQfcg3WWl5k9pAnqVCfm",
                10: "cfNKknbTZxcxhNZCV2fWr4Ne",
                49: "ziBY1mSHWj9UTGcq9Tbzo5J4",
                22: "ImlLSALVeaqvi7y2e6qdBDkw",
                13: "NUx9OmJMlzbkv39hUX5FOnXv",
                15: "RxDq1opgeO5VXEQRPtdESHaX",
                24: "aswJxUjNpHyiEunaOUBGbajK",
                5: "1M1EIJhXdwEoJ8utYTDjj0DD",
                6: "gExvCBm9TEaw4jV6kRzEuDxq",
                21: "wNOOjIhadhe2s1jgq3LppWm0"
            },
            billboard: {
                16: "dr2IuY7Yb8POz9tbezoJUFey",
                1: "WhhFn8GL9nBEK2z9psbtD1SV",
                31: "JNfSIPKKAkfNgzkg3hrGlGEV",
                23: "xvsrS9J4xrRGjlus3pKkIatI",
                14: "4BL4a74RRMoiRu9D8jKAfdij",
                37: "f8B8j7tjb1YA6lAcnHSRBlfI",
                30: "vW1ODUqFt2jDk5laYsVh9PIF",
                47: "R7GldiHZEWYFwdJq936YnbZW",
                18: "83noJ3tAhRyFWDlS1iXKuRGa",
                50: "WNu1woAb2OHf3KncItSAnYnm",
                3: "Ydwhf5DPoJBinldgPdkD9okm",
                19: "3X7dNFFm484Xx6aD6nBF0k43",
                20: "qzLmNwSljh25A7s9HXQYVYtr",
                8: "tXWpZaKO291ytd8kfiy3NWlz",
                11: "0ePnxLUMZ8tKBxImFp2i1J4g",
                12: "Y1HuzbhxRv1UmUhd8dUtONQI",
                17: "lqSabVDWqYWy8jpJH57BK1vS",
                10: "zVEWUpJuNfEipDrTPGwniMP3",
                49: "B2srINo0hBkijyowlq4FQk7c",
                22: "Ljcylng1YDm5yAqEpiomGazZ",
                13: "hYTGyFgCiCUVtNOx56TkKexo",
                15: "5xkx65Y9eEhPen8gqIuOFQRZ",
                24: "ZH3Odxmz8QF49ZoZ16mPs08T",
                5: "Ax2noHPv7iRdW6DM26NxmtFT",
                6: "mZEu6Z0wDTq4UAHQoyUosm5y",
                21: "7bAgpwCip0dSf6bJXgBO6nY1"
            }
        }
          , Ie = [];
        function Se(e, t) {
            var n, i, r;
            return (null === (i = null === (n = null == t ? void 0 : t.meta) || void 0 === n ? void 0 : n.advertiserDomains) || void 0 === i ? void 0 : i.length) > 0 && (null === (r = null == t ? void 0 : t.meta) || void 0 === r ? void 0 : r.advertiserDomains.find((function(e) {
                return function(e) {
                    return Ie.includes(e) || Ie.includes("www." + e) || e.includes("game")
                }(e)
            }
            ))) ? (console.warn("Blocked ad: ", t),
            0) : e
        }
        var Ze = function() {
            var e;
            return (null === (e = Object.keys(window.pbjs)) || void 0 === e ? void 0 : e.length) > 1
        }
          , Ce = function() {
            return Ce = Object.assign || function(e) {
                for (var t, n = 1, i = arguments.length; n < i; n++)
                    for (var r in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e
            }
            ,
            Ce.apply(this, arguments)
        }
          , _e = function(e, t, n) {
            if (n || 2 === arguments.length)
                for (var i, r = 0, o = t.length; r < o; r++)
                    !i && r in t || (i || (i = Array.prototype.slice.call(t, 0, r)),
                    i[r] = t[r]);
            return e.concat(i || Array.prototype.slice.call(t))
        }
          , Te = "rewarded"
          , Pe = "video"
          , Be = {
            "728x90": "/21682198607/" + h.Z.device + "_ingame_728x90/" + h.Z.siteID + "_" + h.Z.device + "_ingame_728x90",
            "300x250": "/21682198607/" + h.Z.device + "_ingame_300x250/" + h.Z.siteID + "_" + h.Z.device + "_ingame_300x250",
            "970x250": "/21682198607/" + h.Z.device + "_ingame_970x250/" + h.Z.siteID + "_" + h.Z.device + "_ingame_970x250",
            "160x600": "/21682198607/" + h.Z.device + "_ingame_160x600/" + h.Z.siteID + "_" + h.Z.device + "_ingame_160x600",
            "320x50": "/21682198607/" + h.Z.device + "_ingame_320x50/" + h.Z.siteID + "_" + h.Z.device + "_ingame_320x50",
            "728x90_external": "/21682198607/external_" + h.Z.device + "_display_ingame/external_" + h.Z.device + "_ingame_728x90",
            "300x250_external": "/21682198607/external_" + h.Z.device + "_display_ingame/external_" + h.Z.device + "_ingame_300x250",
            "970x250_external": "/21682198607/external_" + h.Z.device + "_display_ingame/external_" + h.Z.device + "_ingame_970x250",
            "160x600_external": "/21682198607/external_" + h.Z.device + "_display_ingame/external_" + h.Z.device + "_ingame_160x600",
            "320x50_external": "/21682198607/external_" + h.Z.device + "_display_ingame/external_" + h.Z.device + "_ingame_320x50"
        }
          , De = !1
          , ze = function(e, t) {
            if (Ze()) {
                De = !0;
                var n = ["US", "CA", "AU"]
                  , i = function(e) {
                    var t = pe() || (0,
                    x.Z)() || (0,
                    E.Z)() ? ["video/mp4", "application/javascript"] : ["video/mp4", "video/webm", "video/ogg", "application/javascript"]
                      , i = Ce(Ce({
                        mimes: t,
                        minduration: 0,
                        maxduration: 15,
                        protocols: [2, 3, 5, 6, 7, 8, 11, 12, 13, 14],
                        w: 640,
                        h: 480,
                        placement: 1,
                        linearity: 1
                    }, e ? {} : {
                        skip: 1,
                        skipafter: 5
                    }), {
                        boxingallowed: 1,
                        pos: 1,
                        api: [2, 7, 8]
                    })
                      , r = "";
                    e && "desktop" === h.Z.device ? r = "4725015@640x360" : e && "desktop" !== h.Z.device ? r = "4725013@640x360" : e || "desktop" !== h.Z.device ? e || "desktop" === h.Z.device || (r = "4725011@640x360") : r = "4725008@640x360";
                    var o;
                    return {
                        bids: _e(_e([{
                            bidder: "appnexus",
                            params: {
                                placementId: e ? 13184309 : 13184250,
                                supplyType: "web"
                            }
                        }, {
                            bidder: "openx",
                            params: {
                                delDomain: "poki-d.openx.net",
                                unit: "540105196"
                            }
                        }, {
                            bidder: "spotx",
                            params: {
                                channel_id: "265590",
                                ad_unit: "instream",
                                secure: !0,
                                hide_skin: !0
                            }
                        }, {
                            bidder: "ix",
                            params: {
                                siteId: "436284",
                                video: {}
                            }
                        }, {
                            bidder: "richaudience",
                            params: {
                                pid: (o = h.Z.siteID,
                                he[o] || "MP_gIE1VDieUi"),
                                supplyType: "site"
                            }
                        }, {
                            bidder: "onetag",
                            params: {
                                pubId: "6da09f566a9dc06"
                            }
                        }, {
                            bidder: "rubicon",
                            params: {
                                accountId: "18608",
                                siteId: "266914",
                                zoneId: "1322034",
                                position: "atf",
                                video: {
                                    size_id: 204
                                }
                            }
                        }, {
                            bidder: "pubmatic",
                            params: {
                                publisherId: "156838",
                                adSlot: r
                            }
                        }], n.includes(h.Z.country) ? [{
                            bidder: "33across",
                            params: {
                                siteId: "aRJKVCig8r7ikZaKj0P0Le",
                                productId: "instream"
                            }
                        }] : [], !0), [{
                            bidder: "sharethrough",
                            params: {
                                pkey: "vRjLnZDA86biUVrjIKVGxq3x"
                            }
                        }, {
                            bidder: "triplelift",
                            params: {
                                inventoryCode: "Poki_Instream_Prebid",
                                video: Ce({}, i)
                            }
                        }], !1),
                        mediaTypes: {
                            video: Ce({
                                context: "instream",
                                playerSize: [640, 480]
                            }, i)
                        }
                    }
                }
                  , r = i(!0)
                  , o = i(!1)
                  , a = [{
                    code: Pe,
                    mediaTypes: o.mediaTypes,
                    bids: _e([], o.bids, !0)
                }, {
                    code: Te,
                    mediaTypes: r.mediaTypes,
                    bids: _e([], r.bids, !0)
                }, {
                    code: Be["728x90"],
                    mediaTypes: {
                        banner: {
                            sizes: [[728, 90]]
                        }
                    },
                    bids: _e(_e([{
                        bidder: "appnexus",
                        params: {
                            placementId: "12940427"
                        }
                    }, {
                        bidder: "openx",
                        params: {
                            unit: "539859872",
                            delDomain: "poki-d.openx.net"
                        }
                    }, {
                        bidder: "ix",
                        params: {
                            siteId: "268177",
                            size: [728, 90]
                        }
                    }, {
                        bidder: "pubmatic",
                        params: {
                            publisherId: "156838",
                            adSlot: "1374895@728x90"
                        }
                    }, {
                        bidder: "rubicon",
                        params: {
                            accountId: "18608",
                            siteId: "204596",
                            zoneId: "1008080"
                        }
                    }, {
                        bidder: "onetag",
                        params: {
                            pubId: "6da09f566a9dc06"
                        }
                    }, {
                        bidder: "richaudience",
                        params: {
                            pid: "1V6a2fgLvX",
                            supplyType: "site"
                        }
                    }], n.includes(h.Z.country) ? [{
                        bidder: "33across",
                        params: {
                            siteId: "aRJKVCig8r7ikZaKj0P0Le",
                            productId: "siab"
                        }
                    }] : [], !0), [{
                        bidder: "sharethrough",
                        params: {
                            pkey: Ee.leaderboard[h.Z.siteID] || Ee.leaderboard[3]
                        }
                    }, {
                        bidder: "triplelift",
                        params: {
                            inventoryCode: "Poki_728x90_Prebid"
                        }
                    }], !1)
                }, {
                    code: Be["300x250"],
                    mediaTypes: {
                        banner: {
                            sizes: [[300, 250]]
                        }
                    },
                    bids: _e(_e([{
                        bidder: "appnexus",
                        params: {
                            placementId: "12935252"
                        }
                    }, {
                        bidder: "openx",
                        params: {
                            unit: "539859873",
                            delDomain: "poki-d.openx.net"
                        }
                    }, {
                        bidder: "ix",
                        params: {
                            siteId: "268178",
                            size: [300, 250]
                        }
                    }, {
                        bidder: "pubmatic",
                        params: {
                            publisherId: "156838",
                            adSlot: "1374896@300x250"
                        }
                    }, {
                        bidder: "rubicon",
                        params: {
                            accountId: "18608",
                            siteId: "204596",
                            zoneId: "1008080"
                        }
                    }, {
                        bidder: "onetag",
                        params: {
                            pubId: "6da09f566a9dc06"
                        }
                    }, {
                        bidder: "richaudience",
                        params: {
                            pid: "pKqNt5LyvF",
                            supplyType: "site"
                        }
                    }], n.includes(h.Z.country) ? [{
                        bidder: "33across",
                        params: {
                            siteId: "aRJKVCig8r7ikZaKj0P0Le",
                            productId: "siab"
                        }
                    }] : [], !0), [{
                        bidder: "sharethrough",
                        params: {
                            pkey: Ee.skyscraper[h.Z.siteID] || Ee.skyscraper[3]
                        }
                    }, {
                        bidder: "triplelift",
                        params: {
                            inventoryCode: "Poki_300x250_Prebid"
                        }
                    }], !1)
                }, {
                    code: Be["970x250"],
                    mediaTypes: {
                        banner: {
                            sizes: [[970, 250]]
                        }
                    },
                    bids: _e(_e([{
                        bidder: "appnexus",
                        params: {
                            placementId: "20595278"
                        }
                    }, {
                        bidder: "openx",
                        params: {
                            unit: "543540497",
                            delDomain: "poki-d.openx.net"
                        }
                    }, {
                        bidder: "ix",
                        params: {
                            siteId: "597527",
                            size: [970, 250]
                        }
                    }, {
                        bidder: "pubmatic",
                        params: {
                            publisherId: "156838",
                            adSlot: "3344351@970x250"
                        }
                    }, {
                        bidder: "onetag",
                        params: {
                            pubId: "6da09f566a9dc06"
                        }
                    }, {
                        bidder: "richaudience",
                        params: {
                            pid: "yYyae7vnIh",
                            supplyType: "site"
                        }
                    }], n.includes(h.Z.country) ? [{
                        bidder: "33across",
                        params: {
                            siteId: "aRJKVCig8r7ikZaKj0P0Le",
                            productId: "siab"
                        }
                    }] : [], !0), [{
                        bidder: "sharethrough",
                        params: {
                            pkey: Ee.rectangle[h.Z.siteID] || Ee.rectangle[3]
                        }
                    }, {
                        bidder: "triplelift",
                        params: {
                            inventoryCode: "Poki_970x250_Prebid"
                        }
                    }], !1)
                }, {
                    code: Be["160x600"],
                    mediaTypes: {
                        banner: {
                            sizes: [[160, 600]]
                        }
                    },
                    bids: _e(_e([{
                        bidder: "appnexus",
                        params: {
                            placementId: "12940425"
                        }
                    }, {
                        bidder: "openx",
                        params: {
                            unit: "539859871",
                            delDomain: "poki-d.openx.net"
                        }
                    }, {
                        bidder: "ix",
                        params: {
                            siteId: "268175",
                            size: [160, 600]
                        }
                    }, {
                        bidder: "pubmatic",
                        params: {
                            publisherId: "156838",
                            adSlot: "1374893@160x600"
                        }
                    }, {
                        bidder: "rubicon",
                        params: {
                            accountId: "18608",
                            siteId: "204596",
                            zoneId: "1008080"
                        }
                    }, {
                        bidder: "onetag",
                        params: {
                            pubId: "6da09f566a9dc06"
                        }
                    }, {
                        bidder: "richaudience",
                        params: {
                            pid: "rAEnPimPzC",
                            supplyType: "site"
                        }
                    }], n.includes(h.Z.country) ? [{
                        bidder: "33across",
                        params: {
                            siteId: "aRJKVCig8r7ikZaKj0P0Le",
                            productId: "siab"
                        }
                    }] : [], !0), [{
                        bidder: "sharethrough",
                        params: {
                            pkey: Ee.billboard[h.Z.siteID] || Ee.billboard[3]
                        }
                    }, {
                        bidder: "triplelift",
                        params: {
                            inventoryCode: "Poki_160x600_Prebid"
                        }
                    }], !1)
                }, {
                    code: Be["320x50"],
                    mediaTypes: {
                        banner: {
                            sizes: [[320, 50]]
                        }
                    },
                    bids: _e(_e([{
                        bidder: "appnexus",
                        params: {
                            placementId: "20595224"
                        }
                    }, {
                        bidder: "openx",
                        params: {
                            unit: "543540495",
                            delDomain: "poki-d.openx.net"
                        }
                    }, {
                        bidder: "ix",
                        params: {
                            siteId: "597529",
                            size: [320, 50]
                        }
                    }, {
                        bidder: "pubmatic",
                        params: {
                            publisherId: "156838",
                            adSlot: "3344350@320x50"
                        }
                    }, {
                        bidder: "rubicon",
                        params: {
                            accountId: "18608",
                            siteId: "204596",
                            zoneId: "1008080"
                        }
                    }, {
                        bidder: "onetag",
                        params: {
                            pubId: "6da09f566a9dc06"
                        }
                    }, {
                        bidder: "richaudience",
                        params: {
                            pid: "1DP5EtcOip",
                            supplyType: "site"
                        }
                    }], n.includes(h.Z.country) ? [{
                        bidder: "33across",
                        params: {
                            siteId: "aRJKVCig8r7ikZaKj0P0Le",
                            productId: "siab"
                        }
                    }] : [], !0), [{
                        bidder: "sharethrough",
                        params: {
                            pkey: Ee.skyscraper[h.Z.siteID] || Ee.skyscraper[3]
                        }
                    }, {
                        bidder: "triplelift",
                        params: {
                            inventoryCode: "Poki_320x50_Prebid"
                        }
                    }], !1)
                }, {
                    code: Be["728x90_external"],
                    mediaTypes: {
                        banner: {
                            sizes: [[728, 90]]
                        }
                    },
                    bids: _e(_e([{
                        bidder: "appnexus",
                        params: {
                            placementId: "20973406"
                        }
                    }, {
                        bidder: "openx",
                        params: {
                            unit: "543885656",
                            delDomain: "poki-d.openx.net"
                        }
                    }, {
                        bidder: "ix",
                        params: {
                            siteId: "268177",
                            placementId: "625562",
                            size: [728, 90]
                        }
                    }, {
                        bidder: "pubmatic",
                        params: {
                            publisherId: "156838",
                            adSlot: "3457872"
                        }
                    }, {
                        bidder: "rubicon",
                        params: {
                            accountId: "18608",
                            siteId: "362566",
                            zoneId: "1962680-2"
                        }
                    }, {
                        bidder: "onetag",
                        params: {
                            pubId: "6da09f566a9dc06"
                        }
                    }, {
                        bidder: "richaudience",
                        params: {
                            pid: "MP_gIE1VDieUi",
                            supplyType: "site"
                        }
                    }], n.includes(h.Z.country) ? [{
                        bidder: "33across",
                        params: {
                            siteId: "aRJKVCig8r7ikZaKj0P0Le",
                            productId: "siab"
                        }
                    }] : [], !0), [{
                        bidder: "sharethrough",
                        params: {
                            pkey: Ee.billboard[h.Z.siteID] || Ee.billboard[3]
                        }
                    }, {
                        bidder: "triplelift",
                        params: {
                            inventoryCode: "Poki_728x90_Prebid"
                        }
                    }], !1)
                }, {
                    code: Be["300x250_external"],
                    mediaTypes: {
                        banner: {
                            sizes: [[300, 250]]
                        }
                    },
                    bids: _e(_e([{
                        bidder: "appnexus",
                        params: {
                            placementId: "20973408"
                        }
                    }, {
                        bidder: "openx",
                        params: {
                            unit: "543885657",
                            delDomain: "poki-d.openx.net"
                        }
                    }, {
                        bidder: "ix",
                        params: {
                            siteId: "625564",
                            size: [300, 250]
                        }
                    }, {
                        bidder: "pubmatic",
                        params: {
                            publisherId: "156838",
                            adSlot: "3457874"
                        }
                    }, {
                        bidder: "rubicon",
                        params: {
                            accountId: "18608",
                            siteId: "362566",
                            zoneId: "1962680-15"
                        }
                    }, {
                        bidder: "onetag",
                        params: {
                            pubId: "6da09f566a9dc06"
                        }
                    }, {
                        bidder: "richaudience",
                        params: {
                            pid: "MP_gIE1VDieUi",
                            supplyType: "site"
                        }
                    }], n.includes(h.Z.country) ? [{
                        bidder: "33across",
                        params: {
                            siteId: "aRJKVCig8r7ikZaKj0P0Le",
                            productId: "siab"
                        }
                    }] : [], !0), [{
                        bidder: "sharethrough",
                        params: {
                            pkey: Ee.mobile_leaderboard[h.Z.siteID] || Ee.mobile_leaderboard[3]
                        }
                    }, {
                        bidder: "triplelift",
                        params: {
                            inventoryCode: "Poki_300x250_Prebid"
                        }
                    }], !1)
                }, {
                    code: Be["970x250_external"],
                    mediaTypes: {
                        banner: {
                            sizes: [[970, 250]]
                        }
                    },
                    bids: _e(_e([{
                        bidder: "appnexus",
                        params: {
                            placementId: "20973415"
                        }
                    }, {
                        bidder: "openx",
                        params: {
                            unit: "543885650",
                            delDomain: "poki-d.openx.net"
                        }
                    }, {
                        bidder: "ix",
                        params: {
                            siteId: "625560",
                            size: [970, 250]
                        }
                    }, {
                        bidder: "pubmatic",
                        params: {
                            publisherId: "156838",
                            adSlot: "3457879"
                        }
                    }, {
                        bidder: "rubicon",
                        params: {
                            accountId: "18608",
                            siteId: "362566",
                            zoneId: "1962680-57"
                        }
                    }, {
                        bidder: "onetag",
                        params: {
                            pubId: "6da09f566a9dc06"
                        }
                    }, {
                        bidder: "richaudience",
                        params: {
                            pid: "MP_gIE1VDieUi",
                            supplyType: "site"
                        }
                    }], n.includes(h.Z.country) ? [{
                        bidder: "33across",
                        params: {
                            siteId: "aRJKVCig8r7ikZaKj0P0Le",
                            productId: "siab"
                        }
                    }] : [], !0), [{
                        bidder: "sharethrough",
                        params: {
                            pkey: Ee.leaderboard[h.Z.siteID] || Ee.leaderboard[3]
                        }
                    }, {
                        bidder: "triplelift",
                        params: {
                            inventoryCode: "Poki_970x250_Prebid"
                        }
                    }], !1)
                }, {
                    code: Be["160x600_external"],
                    mediaTypes: {
                        banner: {
                            sizes: [[160, 600]]
                        }
                    },
                    bids: _e(_e([{
                        bidder: "appnexus",
                        params: {
                            placementId: "20973407"
                        }
                    }, {
                        bidder: "openx",
                        params: {
                            unit: "543885653",
                            delDomain: "poki-d.openx.net"
                        }
                    }, {
                        bidder: "ix",
                        params: {
                            siteId: "625563",
                            size: [160, 600]
                        }
                    }, {
                        bidder: "pubmatic",
                        params: {
                            publisherId: "156838",
                            adSlot: "3457877"
                        }
                    }, {
                        bidder: "rubicon",
                        params: {
                            accountId: "18608",
                            siteId: "362566",
                            zoneId: "1962680-9"
                        }
                    }, {
                        bidder: "onetag",
                        params: {
                            pubId: "6da09f566a9dc06"
                        }
                    }, {
                        bidder: "richaudience",
                        params: {
                            pid: "MP_gIE1VDieUi",
                            supplyType: "site"
                        }
                    }], n.includes(h.Z.country) ? [{
                        bidder: "33across",
                        params: {
                            siteId: "aRJKVCig8r7ikZaKj0P0Le",
                            productId: "siab"
                        }
                    }] : [], !0), [{
                        bidder: "sharethrough",
                        params: {
                            pkey: Ee.rectangle[h.Z.siteID] || Ee.rectangle[3]
                        }
                    }, {
                        bidder: "triplelift",
                        params: {
                            inventoryCode: "Poki_160x600_Prebid"
                        }
                    }], !1)
                }, {
                    code: Be["320x50_external"],
                    mediaTypes: {
                        banner: {
                            sizes: [[320, 50]]
                        }
                    },
                    bids: _e(_e([{
                        bidder: "appnexus",
                        params: {
                            placementId: "20973413"
                        }
                    }, {
                        bidder: "openx",
                        params: {
                            unit: "543885649",
                            delDomain: "poki-d.openx.net"
                        }
                    }, {
                        bidder: "ix",
                        params: {
                            siteId: "625559",
                            size: [320, 50]
                        }
                    }, {
                        bidder: "pubmatic",
                        params: {
                            publisherId: "156838",
                            adSlot: "3457875"
                        }
                    }, {
                        bidder: "rubicon",
                        params: {
                            accountId: "18608",
                            siteId: "362566",
                            zoneId: "1962680-43"
                        }
                    }, {
                        bidder: "onetag",
                        params: {
                            pubId: "6da09f566a9dc06"
                        }
                    }, {
                        bidder: "richaudience",
                        params: {
                            pid: "MP_gIE1VDieUi",
                            supplyType: "site"
                        }
                    }], n.includes(h.Z.country) ? [{
                        bidder: "33across",
                        params: {
                            siteId: "aRJKVCig8r7ikZaKj0P0Le",
                            productId: "siab"
                        }
                    }] : [], !0), [{
                        bidder: "sharethrough",
                        params: {
                            pkey: Ee.mobile_leaderboard[h.Z.siteID] || Ee.mobile_leaderboard[3]
                        }
                    }, {
                        bidder: "triplelift",
                        params: {
                            inventoryCode: "Poki_320x50_Prebid"
                        }
                    }], !1)
                }]
                  , s = Ce(Ce({
                    debug: !1,
                    enableSendAllBids: !0,
                    usePrebidCache: !0,
                    bidderTimeout: 1500,
                    priceGranularity: {
                        buckets: [{
                            precision: 2,
                            min: .01,
                            max: 3,
                            increment: .01
                        }, {
                            precision: 2,
                            min: 3,
                            max: 8,
                            increment: .05
                        }, {
                            precision: 2,
                            min: 8,
                            max: 20,
                            increment: .5
                        }, {
                            precision: 2,
                            min: 20,
                            max: 45,
                            increment: 1
                        }]
                    },
                    currency: {
                        adServerCurrency: "EUR",
                        defaultRates: {
                            EUR: {
                                EUR: 1,
                                GBP: .84,
                                USD: 1.02
                            },
                            GBP: {
                                EUR: 1.2,
                                GBP: 1,
                                USD: 1.22
                            },
                            USD: {
                                EUR: .98,
                                GBP: .82,
                                USD: 1
                            }
                        }
                    },
                    cache: {
                        url: "https://prebid.adnxs.com/pbc/v1/cache"
                    },
                    targetingControls: {
                        allowTargetingKeys: ["BIDDER", "AD_ID", "PRICE_BUCKET", "SIZE", "DEAL", "SOURCE", "FORMAT", "UUID", "CACHE_ID", "CACHE_HOST", "ADOMAIN"],
                        allowSendAllBidsTargetingKeys: ["BIDDER", "AD_ID", "PRICE_BUCKET", "SIZE", "DEAL", "SOURCE", "FORMAT", "UUID", "CACHE_ID", "CACHE_HOST", "ADOMAIN"]
                    },
                    userSync: {
                        filterSettings: {
                            all: {
                                bidders: "*",
                                filter: "include"
                            }
                        },
                        syncsPerBidder: 1e3,
                        syncDelay: 100,
                        userIds: [{
                            name: "pubCommonId",
                            storage: {
                                type: "cookie",
                                name: "poki_pubcid",
                                expires: 180
                            }
                        }]
                    }
                }, h.Z.gdprApplies ? {
                    consentManagement: {
                        gdpr: {
                            cmpApi: "iab",
                            timeout: 8e3,
                            defaultGdprScope: !0
                        }
                    }
                } : {}), h.Z.ccpaApplies ? {
                    consentManagement: {
                        usp: {
                            cmpApi: "iab",
                            timeout: 8e3
                        }
                    }
                } : {});
                window.pbjs.que.push((function() {
                    var n, i, r = Ce(Ce({
                        floors: {
                            data: {
                                currency: "EUR",
                                schema: {
                                    fields: ["mediaType"]
                                },
                                values: {
                                    banner: (i = h.Z.country,
                                    me.includes(i) ? .13 : ge.includes(i) ? .07 : fe.includes(i) ? .04 : .02),
                                    video: be()
                                }
                            }
                        }
                    }, s), e.config);
                    0 === (null === (n = Object.keys(r.floors)) || void 0 === n ? void 0 : n.length) && (console.log("disabled floor module"),
                    null == r || delete r.floors),
                    window.pbjs.addAdUnits(function(e, t) {
                        var n, i, r = h.Z.country, o = null == t ? void 0 : t[r];
                        if (!o)
                            return e;
                        for (var a = 0; a <= e.length; a++)
                            for (var s = e[a], d = o[(null === (n = null == s ? void 0 : s.mediaTypes) || void 0 === n ? void 0 : n.video) ? "video" : "display"] || {}, c = (null === (i = null == s ? void 0 : s.bids) || void 0 === i ? void 0 : i.length) - 1; c >= 0; c--) {
                                var l = s.bids[c]
                                  , A = Math.random();
                                d[l.bidder] && A > d[l.bidder] && e[a].bids.splice(c, 1)
                            }
                        return e
                    }(e.adUnits || a, t)),
                    window.pbjs.setConfig(r);
                    var o = function(e, t) {
                        return 640 !== t.width && (e *= .95),
                        Se(e, t)
                    };
                    window.pbjs.bidderSettings = {
                        standard: {
                            storageAllowed: !0
                        },
                        appnexus: {
                            bidCpmAdjustment: Se
                        },
                        openx: {
                            bidCpmAdjustment: Se
                        },
                        spotx: {
                            bidCpmAdjustment: Se
                        },
                        ix: {
                            bidCpmAdjustment: o
                        },
                        richaudience: {
                            bidCpmAdjustment: o
                        },
                        onetag: {
                            bidCpmAdjustment: Se
                        },
                        rubicon: {
                            bidCpmAdjustment: Se
                        },
                        pubmatic: {
                            bidCpmAdjustment: Se
                        },
                        "33across": {
                            bidCpmAdjustment: Se
                        },
                        sharethrough: {
                            bidCpmAdjustment: o
                        },
                        triplelift: {
                            bidCpmAdjustment: Se
                        }
                    }
                }
                ))
            }
        }
          , je = !1
          , Oe = function(e, t) {
            if (window.apstag)
                try {
                    window.apstag.init(e.settings || Ce({
                        pubID: "e32f1423-28bc-43ed-8ab0-5ae6b4449cf8",
                        adServer: "googletag",
                        videoAdServer: "GAM"
                    }, h.Z.gdprApplies ? {
                        gdpr: {
                            cmpTimeout: 1e4
                        }
                    } : {}), (function() {
                        var n, i, r, o, a;
                        n = t,
                        o = h.Z.country,
                        a = null === (r = null === (i = null == n ? void 0 : n[o]) || void 0 === i ? void 0 : i.video) || void 0 === r ? void 0 : r.amazon,
                        je = !(a && Math.random() > a),
                        e.callback && e.callback()
                    }
                    ))
                } catch (e) {
                    window.apstag = void 0
                }
        };
        function Me(e, t, i, r, o, a, s) {
            var d = a ? "nope" : t;
            if (window.pbjs && window.pbjs.que && window.pbjs.getConfig) {
                var c, l = ue().split("?"), A = encodeURIComponent(l[0]), u = r ? Te : Pe, p = 0, m = function() {
                    var r, o, l, m;
                    if (!(--p > 0))
                        try {
                            y.dispatchEvent(n.Z.ads.prebidRequested);
                            var g = window.pbjs.adUnits.filter((function(e) {
                                return e.code === u
                            }
                            ))[0];
                            if ("undefined" === g)
                                return console.error("Video-ad-unit not found, did you give it the adunit.code='video' value?"),
                                void e.requestAd(d);
                            var f = window.pbjs.adServers.dfp.buildVideoUrl({
                                adUnit: g,
                                params: {
                                    iu: (0,
                                    Ae.Z)("iu", t),
                                    sz: "640x360|640x480",
                                    output: "vast",
                                    cust_params: i,
                                    description_url: A
                                }
                            })
                              , v = window.pbjs.getHighestCpmBids(u)
                              , b = void 0;
                            if (v.length > 0 && (b = v[0]),
                            window.pbjs.markWinningBidAsUsed({
                                adUnitCode: u
                            }),
                            c && (f = f.replace("cust_params=", "cust_params=" + c + "%26")),
                            b && (null === (o = null === (r = null == b ? void 0 : b.meta) || void 0 === r ? void 0 : r.advertiserDomains) || void 0 === o ? void 0 : o.length) > 0 && y.setDataAnnotations({
                                adDomain: b.meta.advertiserDomains.join(",")
                            }),
                            a) {
                                if (c) {
                                    var k = function(e) {
                                        var t = decodeURIComponent(e)
                                          , n = (0,
                                        Ae.Z)("amznbid", t);
                                        if (!n)
                                            return null;
                                        var i = ke[n];
                                        return i ? {
                                            bid: i,
                                            vast: "https://aax.amazon-adsystem.com/e/dtb/vast?b=" + (0,
                                            Ae.Z)("amzniid", t) + "&rnd=" + Math.round(1e10 * Math.random()) + "&pp=" + n
                                        } : null
                                    }(c);
                                    k && (!b || !b.videoCacheKey || b.cpm < k.bid) && (b = {
                                        cpm: k.bid,
                                        vast: k.vast,
                                        bidder: "amazon",
                                        videoCacheKey: "amazon"
                                    })
                                }
                                if (1 !== s && (!b || !b.videoCacheKey || b.cpm < be())) {
                                    var x = 5;
                                    "ninja.io" !== (null === (l = null === window || void 0 === window ? void 0 : window.location) || void 0 === l ? void 0 : l.hostname) && "makeitmeme.com" !== (null === (m = null === window || void 0 === window ? void 0 : window.location) || void 0 === m ? void 0 : m.hostname) || (x = function() {
                                        var e = h.Z.country;
                                        return "US" === e ? 6.1 : me.includes(e) ? .5 : ge.includes(e) ? .15 : fe.includes(e) ? .08 : ve.includes(e) ? .03 : .02
                                    }()),
                                    b = {
                                        cpm: x,
                                        vast: ye(),
                                        bidder: "poki",
                                        videoCacheKey: "poki"
                                    }
                                }
                                if (!b || !b.videoCacheKey)
                                    return void y.dispatchEvent(1 === s ? n.Z.ads.video.error : n.Z.ads.completed, {
                                        rewardAllowed: !1
                                    });
                                switch (b.bidder) {
                                case "onetag":
                                    f = "https://onetag-sys.com/invocation/?key=" + b.videoCacheKey;
                                    break;
                                case "rubicon":
                                    f = "https://prebid-server.rubiconproject.com/cache?uuid=" + b.videoCacheKey;
                                    break;
                                case "spotx":
                                    f = "https://search.spotxchange.com/ad/vast.html?key=" + b.videoCacheKey;
                                    break;
                                case "amazon":
                                case "poki":
                                    f = b.vast;
                                    break;
                                default:
                                    f = "https://prebid.adnxs.com/pbc/v1/cache?uuid=" + b.videoCacheKey
                                }
                                w({
                                    event: "video-ready",
                                    bidder: null == b ? void 0 : b.bidder,
                                    bid: null == b ? void 0 : b.cpm
                                }),
                                y.setDataAnnotations({
                                    p4d_game_id: h.Z.gameID,
                                    p4d_version_id: h.Z.versionID,
                                    bidder: null == b ? void 0 : b.bidder,
                                    bid: null == b ? void 0 : b.cpm
                                })
                            }
                            y.setDataAnnotations({
                                pokiAdServer: a,
                                adTagUrl: f
                            }),
                            b ? y.setDataAnnotations({
                                prebidBidder: null == b ? void 0 : b.bidder,
                                prebidBid: null == b ? void 0 : b.cpm
                            }) : y.setDataAnnotations({
                                prebidBidder: void 0,
                                prebidBid: void 0
                            }),
                            e.requestAd(f)
                        } catch (t) {
                            e.requestAd(d)
                        }
                };
                if (je && p++,
                De && p++,
                je)
                    try {
                        window.apstag.fetchBids({
                            slots: [{
                                slotID: r ? "Rewarded" : "Midroll",
                                mediaType: "video"
                            }],
                            timeout: 1500
                        }, (function(e) {
                            e.length > 0 && (c = e[0].encodedQsParams),
                            m()
                        }
                        ))
                    } catch (e) {
                        m()
                    }
                a && w({
                    event: "video-request"
                }),
                De && window.pbjs.que.push((function() {
                    window.pbjs.requestBids({
                        adUnitCodes: [u],
                        bidsBackHandler: function() {
                            m()
                        }
                    })
                }
                ))
            } else
                e.requestAd(d)
        }
        function Le() {
            var e, t = (null === (e = null === window || void 0 === window ? void 0 : window.location) || void 0 === e ? void 0 : e.hostname) || "";
            return "yes" === (0,
            Ae.Z)("poki-ad-server") ? (console.log("DEBUG: Only running Poki-ad-server"),
            !0) : "localhost" !== t && "game-cdn.poki.com" !== t && !t.endsWith(".poki-gdn.com") && ("ninja.io" === t ? Math.random() <= .5 : "venge.io" === t && Math.random() <= .05)
        }
        var Re = function() {
            function e(e, t) {
                void 0 === t && (t = {}),
                this.retries = 0,
                this.running = !1,
                this.ima = e,
                this.siteID = h.Z.siteID || 3,
                this.country = h.Z.country || "ZZ",
                this.usePokiAdserver = Le(),
                this.totalRetries = t.totalRetries || ce.waterfallRetries || 1,
                this.timing = t.timing || new le(ce.adTiming),
                y.addEventListener(n.Z.ads.video.error, this.moveThroughWaterfall.bind(this)),
                y.addEventListener(n.Z.ads.video.loaderError, this.moveThroughWaterfall.bind(this)),
                y.addEventListener(n.Z.ads.ready, this.timing.stopWaterfallTimer.bind(this.timing)),
                y.addEventListener(n.Z.ads.started, this.stopWaterfall.bind(this))
            }
            return e.prototype.moveThroughWaterfall = function() {
                if (this.runningBackfill)
                    return this.runningBackfill = !1,
                    void y.dispatchEvent(n.Z.ads.error, {
                        message: "Backfilling failed",
                        rewardAllowed: !1
                    });
                if (!1 !== this.running) {
                    var e = this.totalRetries;
                    if (this.timing.stopWaterfallTimer(),
                    this.retries < e)
                        return this.timing.nextWaterfallTimer(),
                        void this.requestAd();
                    if (this.running = !1,
                    this.timing.resetWaterfallTimerIdx(),
                    this.rewarded) {
                        var t = ye();
                        y.setDataAnnotations({
                            pokiAdServer: !0,
                            adTagUrl: t,
                            bidder: "poki",
                            bid: 0
                        }),
                        w({
                            event: "video-request"
                        }),
                        this.ima.requestAd(t),
                        this.runningBackfill = !0
                    } else
                        y.dispatchEvent(n.Z.ads.error, {
                            message: "No ads"
                        })
                }
            }
            ,
            e.prototype.cutOffWaterfall = function() {
                this.ima.tearDown(),
                this.moveThroughWaterfall()
            }
            ,
            e.prototype.buildAdUnitPaths = function(e) {
                if ((0,
                Ae.Z)("noFill"))
                    return ["junk", "junk"];
                if (m.debug) {
                    var t = "/21682198607/debug-video/";
                    return e === n.Z.ads.position.rewarded ? [t + "debug-video-rewarded"] : e === n.Z.ads.position.preroll ? [t + "debug-video-preroll"] : [t + "debug-video-midroll"]
                }
                var i = "desktop"
                  , r = "midroll";
                (0,
                x.Z)() ? i = "mobile" : (0,
                E.Z)() && (i = "tablet"),
                e === n.Z.ads.position.rewarded && (r = "rewarded");
                var o = "/21682198607/";
                return h.Z.isPokiIframe ? ["" + o + i + "_ingame_" + r + "_1/" + this.siteID + "_" + i + "_ingame_" + r + "_1", "" + o + i + "_ingame_" + r + "_2/" + this.siteID + "_" + i + "_ingame_" + r + "_2"] : [o + "external_" + i + "_video_1/external_" + i + "_ingame_" + r + "_1", o + "external_" + i + "_video_2/external_" + i + "_ingame_" + r + "_2"]
            }
            ,
            e.prototype.start = function(e, t) {
                void 0 === e && (e = {}),
                this.running = !0,
                this.retries = 0,
                this.criteria = e,
                this.timing.resetWaterfallTimerIdx(),
                this.rewarded = t === n.Z.ads.position.rewarded,
                this.adUnitPaths = this.buildAdUnitPaths(t),
                this.requestAd()
            }
            ,
            e.prototype.requestAd = function() {
                this.timing.startWaterfallTimer(this.cutOffWaterfall.bind(this)),
                this.retries++,
                this.criteria.waterfall = this.retries,
                this.runningBackfill = !1;
                var e = (this.retries - 1) % this.adUnitPaths.length
                  , t = this.adUnitPaths[e]
                  , i = "https://securepubads.g.doubleclick.net/gampad/ads?sz=640x360|640x480&iu=" + t + "&ciu_szs&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url={url}&description_url={descriptionUrl}&correlator={timestamp}"
                  , r = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) > 970;
                this.criteria.billboards_fit = r ? "yes" : "no";
                var o, a, s = function(e) {
                    var t = ue().split("?")
                      , n = encodeURIComponent(t[0]);
                    return (e = e.split("{descriptionUrl}").join(n)).split("{timestamp}").join((new Date).getTime().toString())
                }(i) + (o = this.criteria,
                a = "",
                Object.keys(o).forEach((function(e) {
                    if (Object.prototype.hasOwnProperty.call(o, e)) {
                        var t = o[e];
                        Array.isArray(t) && (t = t.join()),
                        a += e + "=" + t + "&"
                    }
                }
                )),
                "&cust_params=" + (a = encodeURIComponent(a)) + "&");
                h.Z.childDirected && (s += "&tfcd=1"),
                h.Z.nonPersonalized && (s += "&npa=1"),
                y.setDataAnnotations({
                    adUnitPath: t,
                    adTagUrl: s,
                    waterfall: this.retries,
                    size: "640x360v"
                }),
                y.dispatchEvent(n.Z.ads.requested),
                this.usePokiAdserver ? (console.debug("adRequest started with Prebid Video enabled (" + this.retries + "/" + this.totalRetries + ")"),
                Me(this.ima, s, this.criteria, this.rewarded, this.country, !0, this.retries)) : 1 === this.retries ? (console.debug("adRequest started with Prebid Video enabled (" + this.retries + "/" + this.totalRetries + ")"),
                Me(this.ima, s, this.criteria, this.rewarded, this.country, !1, this.retries)) : (console.debug("adRequest started in plain mode (" + this.retries + "/" + this.totalRetries + ")"),
                this.ima.requestAd(s))
            }
            ,
            e.prototype.isRunning = function() {
                return this.running
            }
            ,
            e.prototype.stopWaterfall = function() {
                this.running = !1,
                this.timing.stopWaterfallTimer(),
                this.timing.resetWaterfallTimerIdx()
            }
            ,
            e
        }();
        const Ne = Re;
        var Ge = "pokiSdkContainer"
          , qe = "pokiSdkFixed"
          , Ue = "pokiSdkOverlay"
          , Qe = "pokiSdkHidden"
          , Fe = "pokiSdkInsideContainer"
          , Xe = "pokiSdkPauseButton"
          , He = "pokiSdkPauseButtonBG"
          , Ve = "pokiSdkStartAdButton"
          , Ke = "pokiSdkProgressBar"
          , Je = "pokiSdkProgressContainer"
          , We = "pokiSdkSpinnerContainer"
          , Ye = "pokiSdkVideoContainer"
          , $e = "pokiSdkVisible"
          , et = "pokiSDKAdContainer"
          , tt = function(e, t, n) {
            if (n || 2 === arguments.length)
                for (var i, r = 0, o = t.length; r < o; r++)
                    !i && r in t || (i || (i = Array.prototype.slice.call(t, 0, r)),
                    i[r] = t[r]);
            return e.concat(i || Array.prototype.slice.call(t))
        }
          , nt = function() {
            function e(e) {
                var t = this;
                if (this.hideElement = function(e) {
                    e.classList.add(Qe),
                    e.classList.remove($e)
                }
                ,
                this.showElement = function(e) {
                    e.classList.add($e),
                    e.classList.remove(Qe)
                }
                ,
                this.progressFaker = new rt((function(e) {
                    return t.updateProgressBar(e)
                }
                )),
                this.progressFaker.queueFakeProgress(10, 1e3, n.Z.ads.prebidRequested),
                this.progressFaker.queueFakeProgress(20, 2e3, n.Z.ads.started),
                this.createElements(e.wrapper),
                "undefined" != typeof window && document) {
                    var i = document.createElement("style");
                    i.innerHTML = "\n.pokiSdkContainer {\n\toverflow: hidden;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\twidth: 100%;\n\theight: 100%;\n\tz-index: 1000;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n.pokiSdkContainer.pokiSdkFixed {\n\tposition: fixed;\n}\n\n.pokiSdkContainer.pokiSdkVisible {\n\tdisplay: block;\n}\n\n.pokiSdkContainer.pokiSdkHidden,\n.pokiSdkSpinnerContainer.pokiSdkHidden {\n\tdisplay: none;\n}\n\n.pokiSdkContainer.pokiSdkHidden,\n.pokiSdkSpinnerContainer {\n\tpointer-events: none;\n}\n\n.pokiSdkSpinnerContainer {\n\tz-index: 10;\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbackground: url('https://a.poki.com/images/thumb_anim_2x.gif') 50% 50% no-repeat;\n\tuser-select: none;\n}\n\n.pokiSdkInsideContainer {\n\tbackground: #000;\n\tposition: relative;\n\tz-index: 1;\n\twidth: 100%;\n\theight: 100%;\n\tdisplay: flex;\n\tflex-direction: column;\n\n\topacity: 0;\n\t-webkit-transition: opacity 0.5s ease-in-out;\n\t-moz-transition: opacity 0.5s ease-in-out;\n\t-ms-transition: opacity 0.5s ease-in-out;\n\t-o-transition: opacity 0.5s ease-in-out;\n\ttransition: opacity 0.5s ease-in-out;\n}\n\n.pokiSdkContainer.pokiSdkVisible .pokiSdkInsideContainer {\n\topacity: 1;\n}\n\n.pokiSDKAdContainer, .pokiSdkVideoContainer {\n\tposition: absolute;\n\twidth: 100%;\n\theight: 100%;\n}\n\n.pokiSdkStartAdButton {\n\tposition: absolute;\n\tz-index: 9999;\n\ttop: 0;\n\n\tpadding-top: 10%;\n\twidth: 100%;\n\theight: 100%;\n\ttext-align: center;\n\tcolor: #FFF;\n\n\tfont: 700 15pt 'Arial', sans-serif;\n\tfont-weight: bold;\n\tletter-spacing: 1px;\n\ttransition: 0.1s ease-in-out;\n\tline-height: 1em;\n}\n\n.pokiSdkPauseButton {\n\tcursor:pointer;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    z-index: 1;\n}\n\n.pokiSdkPauseButton:before {\n\tcontent: '';\n\tposition: absolute;\n\twidth: 100px;\n\theight: 100px;\n\tdisplay: block;\n\tborder: 2px solid #fff;\n\tborder-radius: 50%;\n\tuser-select: none;\n\tbackground-color: rgba(0, 0, 0, 0.6);\n\ttransition: background-color 0.5s ease;\n\tanimation: 1s linear infinite pokiPulse;\n}\n\n.pokiSdkPauseButton:after {\n\tcontent: '';\n\tposition: absolute;\n\tdisplay: block;\n\tbox-sizing: border-box;\n\tborder-color: transparent transparent transparent #fff;\n\tborder-style: solid;\n\tborder-width: 26px 0 26px 40px;\n\tpointer-events: none;\n\tanimation: 1s linear infinite pokiPulse;\n\tleft: 6px;\n}\n.pokiSdkPauseButtonBG {\n    position: fixed;\n    top: 0;\n    left: 0;\n    display: block;\n    content: '';\n    background: rgba(0, 43, 80, 0.5);\n    width: 100%;\n    height: 100%;\n}\n\n.pokiSdkPauseButtonBG:hover{\n\tbackground: rgba(0, 43, 80, 0.7);\n}\n\n@keyframes pokiPulse {\n\t0% {\n\t\ttransform: translate(-50%, -50%) scale(0.95);\n\t}\n\t70% {\n\t\ttransform: translate(-50%, -50%) scale(1.1);\n\t}\n\t100% {\n\t\ttransform: translate(-50%, -50%) scale(0.95);\n\t}\n}\n\n.pokiSdkProgressContainer {\n\tbackground: #B8C7DD;\n\twidth: 100%;\n\theight: 5px;\n\tposition: absolute;\n\tbottom: 0;\n\tz-index: 9999;\n}\n\n.pokiSdkProgressBar {\n\tposition:relative;\n\tbottom:0px;\n\tbackground: #FFDC00;\n\theight: 100%;\n\twidth: 0%;\n\ttransition: width 0.5s;\n\ttransition-timing-function: linear;\n}\n\n.pokiSdkProgressBar.pokiSdkVisible, .pokiSdkPauseButton.pokiSdkVisible, .pokiSdkStartAdButton.pokiSdkVisible {\n\tdisplay: block;\n\tpointer-events: auto;\n}\n\n.pokiSdkProgressBar.pokiSdkHidden, .pokiSdkPauseButton.pokiSdkHidden, .pokiSdkStartAdButton.pokiSdkHidden {\n\tdisplay: none;\n\tpointer-events: none;\n}\n",
                    document.head.appendChild(i)
                }
            }
            return e.prototype.updateProgressBar = function(e) {
                this.progressBar.style.width = e + "%"
            }
            ,
            e.prototype.setupEvents = function(e) {
                this.monetization = e
            }
            ,
            e.prototype.hide = function() {
                this.hideElement(this.containerDiv),
                this.hideElement(this.progressContainer),
                this.hidePauseButton(),
                this.hideElement(this.startAdButton),
                this.containerDiv.classList.remove(Ue),
                this.progressBar.style.width = "0%",
                this.progressFaker.reset()
            }
            ,
            e.prototype.hideSpinner = function() {
                this.hideElement(this.spinnerContainer)
            }
            ,
            e.prototype.show = function() {
                this.containerDiv.classList.add(Ue),
                this.showElement(this.containerDiv),
                this.showElement(this.spinnerContainer),
                this.showElement(this.progressContainer),
                this.progressFaker.start()
            }
            ,
            e.prototype.getVideoBounds = function() {
                return this.adContainer.getBoundingClientRect()
            }
            ,
            e.prototype.getAdContainer = function() {
                return this.adContainer
            }
            ,
            e.prototype.getVideoContainer = function() {
                return this.videoContainer
            }
            ,
            e.prototype.showPauseButton = function() {
                this.showElement(this.pauseButton),
                this.monetization && this.pauseButton.addEventListener("click", this.monetization.resumeAd.bind(this.monetization))
            }
            ,
            e.prototype.hidePauseButton = function() {
                this.hideElement(this.pauseButton),
                this.monetization && this.pauseButton.removeEventListener("click", this.monetization.resumeAd.bind(this.monetization))
            }
            ,
            e.prototype.showStartAdButton = function() {
                this.showElement(this.startAdButton),
                this.monetization && this.startAdButton.addEventListener("click", this.monetization.startAdClicked.bind(this.monetization))
            }
            ,
            e.prototype.hideStartAdButton = function() {
                this.hideElement(this.startAdButton),
                this.monetization && this.startAdButton.removeEventListener("click", this.monetization.startAdClicked.bind(this.monetization))
            }
            ,
            e.prototype.createElements = function(e) {
                var t = this;
                this.containerDiv = document.createElement("div"),
                this.insideContainer = document.createElement("div"),
                this.pauseButton = document.createElement("div"),
                this.pauseButtonBG = document.createElement("div"),
                this.startAdButton = document.createElement("div"),
                this.progressBar = document.createElement("div"),
                this.progressContainer = document.createElement("div"),
                this.spinnerContainer = document.createElement("div"),
                this.adContainer = document.createElement("div"),
                this.videoContainer = document.createElement("video"),
                this.adContainer.id = "pokiSDKAdContainer",
                this.videoContainer.id = "pokiSDKVideoContainer",
                this.containerDiv.className = Ge,
                this.insideContainer.className = Fe,
                this.pauseButton.className = Xe,
                this.pauseButtonBG.className = He,
                this.pauseButton.appendChild(this.pauseButtonBG),
                this.startAdButton.className = Ve,
                this.startAdButton.innerHTML = "Tap anywhere to play ad",
                this.progressBar.className = Ke,
                this.progressContainer.className = Je,
                this.spinnerContainer.className = We,
                this.adContainer.className = et,
                this.videoContainer.className = Ye,
                this.hide(),
                this.videoContainer.setAttribute("playsinline", "playsinline"),
                this.videoContainer.setAttribute("muted", "muted"),
                this.containerDiv.appendChild(this.insideContainer),
                this.containerDiv.appendChild(this.spinnerContainer),
                this.insideContainer.appendChild(this.progressContainer),
                this.insideContainer.appendChild(this.videoContainer),
                this.insideContainer.appendChild(this.adContainer),
                this.containerDiv.appendChild(this.pauseButton),
                this.containerDiv.appendChild(this.startAdButton),
                this.progressContainer.appendChild(this.progressBar);
                var n = e || null
                  , i = function() {
                    if (n || (n = document.body),
                    n)
                        if (n.appendChild(t.containerDiv),
                        n === document.body)
                            t.containerDiv.classList.add(qe);
                        else {
                            var e = window.getComputedStyle(n).position;
                            e && -1 !== ["absolute", "fixed", "relative"].indexOf(e) || (n.style.position = "relative")
                        }
                    else
                        window.requestAnimationFrame(i)
                };
                !n || n instanceof HTMLElement || (n = null,
                console.error("POKI-SDK: wrapper is not a HTMLElement, falling back to document.body")),
                i()
            }
            ,
            e
        }();
        const it = nt;
        var rt = function() {
            function e(e) {
                var t = this;
                this.storedQueue = [],
                this.progressCallback = e,
                this.reset(),
                y.addEventListener(n.Z.ads.video.progress, (function(e) {
                    var n = 100 - t.currentProgress
                      , i = e.currentTime / e.duration * n;
                    i < n && t.progressCallback(t.currentProgress + i)
                }
                )),
                this.initializeNoProgressFix()
            }
            return e.prototype.queueFakeProgress = function(e, t, n) {
                var i = this;
                this.storedQueue.push({
                    progressToFake: e,
                    duration: t,
                    stopEvent: n
                }),
                y.addEventListener(n, (function() {
                    i.eventWatcher[n] = !0,
                    i.currentProgress = i.startProgress + e,
                    i.startProgress = i.currentProgress,
                    i.progressCallback(i.currentProgress),
                    i.activeQueue.shift(),
                    i.activeQueue.length > 0 ? i.continue() : i.pause()
                }
                ))
            }
            ,
            e.prototype.fakeProgress = function(e, t, n) {
                this.activeQueue.push({
                    progressToFake: e,
                    duration: t,
                    stopEvent: n
                }),
                this.fakeProgressEvents = !0,
                this.continue()
            }
            ,
            e.prototype.start = function() {
                this.activeQueue.length > 0 || (this.activeQueue = tt([], this.storedQueue, !0),
                this.active = !0,
                this.continue())
            }
            ,
            e.prototype.continue = function() {
                if (this.activeQueue.length > 0 && !this.tickInterval) {
                    this.startTime = Date.now();
                    this.tickInterval = window.setInterval(this.tick.bind(this), 50),
                    this.active = !0
                }
            }
            ,
            e.prototype.pause = function() {
                this.clearInterval()
            }
            ,
            e.prototype.tick = function() {
                var e = this.activeQueue[0]
                  , t = Date.now() - this.startTime
                  , i = Math.min(t / e.duration, 1);
                this.currentProgress = this.startProgress + e.progressToFake * i,
                this.fakeProgressEvents && y.dispatchEvent(n.Z.ads.video.progress, {
                    duration: e.duration / 1e3,
                    currentTime: t / 1e3
                }),
                this.progressCallback(this.currentProgress),
                (this.eventWatcher[e.stopEvent] || 1 === i) && this.pause()
            }
            ,
            e.prototype.clearInterval = function() {
                this.tickInterval && (clearInterval(this.tickInterval),
                this.tickInterval = 0)
            }
            ,
            e.prototype.initializeNoProgressFix = function() {
                var e = this;
                y.addEventListener(n.Z.ads.started, (function(t) {
                    e.progressWatcherTimeout = window.setTimeout((function() {
                        if (e.active) {
                            var i = 100 - e.currentProgress
                              , r = 1e3 * t.duration - 1e3;
                            e.fakeProgress(i, r, n.Z.ads.completed)
                        }
                    }
                    ), 1e3)
                }
                )),
                y.addEventListener(n.Z.ads.video.progress, (function() {
                    e.progressWatcherTimeout && (clearTimeout(e.progressWatcherTimeout),
                    e.progressWatcherTimeout = 0)
                }
                ))
            }
            ,
            e.prototype.reset = function() {
                this.eventWatcher = {},
                this.startProgress = 0,
                this.startTime = 0,
                this.currentProgress = 0,
                this.activeQueue = [],
                this.active = !1,
                this.fakeProgressEvents = !1,
                this.clearInterval()
            }
            ,
            e
        }()
          , ot = a(662)
          , at = function(e, t, n, i) {
            return new (n || (n = Promise))((function(r, o) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? r(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , st = function(e, t) {
            var n, i, r, o, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }
            ),
            o;
            function s(o) {
                return function(s) {
                    return function(o) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                i && (r = 2 & o[0] ? i.return : o[0] ? i.throw || ((r = i.return) && r.call(i),
                                0) : i.next) && !(r = r.call(i, o[1])).done)
                                    return r;
                                switch (i = 0,
                                r && (o = [2 & o[0], r.value]),
                                o[0]) {
                                case 0:
                                case 1:
                                    r = o;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    i = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = a.trys,
                                    (r = r.length > 0 && r[r.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < r[1]) {
                                        a.label = r[1],
                                        r = o;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2],
                                        a.ops.push(o);
                                        break
                                    }
                                    r[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                o = t.call(e, a)
                            } catch (e) {
                                o = [6, e],
                                i = 0
                            } finally {
                                n = r = 0
                            }
                        if (5 & o[0])
                            throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        };
        const dt = function() {
            function e(e) {
                var t = this;
                this.bannerTimeout = null,
                this.allowedToPlayAd = !1,
                this.runningAd = !1,
                this.completeOnce = !1,
                this.videoStarted = !1,
                this.currentWidth = 640,
                this.currentHeight = 480,
                this.currentRequestIsMuted = !1,
                this.volume = 1,
                this.canWeAutoPlayWithSound = function() {
                    return at(t, void 0, void 0, (function() {
                        return st(this, (function(e) {
                            switch (e.label) {
                            case 0:
                                if (!this.blankVideo)
                                    return [2, !1];
                                e.label = 1;
                            case 1:
                                return e.trys.push([1, 3, , 4]),
                                [4, this.blankVideo.play()];
                            case 2:
                                return e.sent(),
                                [2, !0];
                            case 3:
                                return e.sent(),
                                [2, !1];
                            case 4:
                                return [2]
                            }
                        }
                        ))
                    }
                    ))
                }
                ,
                this.videoElement = document.getElementById("pokiSDKVideoContainer"),
                this.adsManager = null,
                this.volume = e,
                this.initAdDisplayContainer(),
                this.initBlankVideo(),
                this.initAdsLoader()
            }
            return e.prototype.initAdDisplayContainer = function() {
                this.adDisplayContainer || window.google && (this.adDisplayContainer = new google.ima.AdDisplayContainer(document.getElementById("pokiSDKAdContainer"),this.videoElement))
            }
            ,
            e.prototype.initBlankVideo = function() {
                this.blankVideo = document.createElement("video"),
                this.blankVideo.setAttribute("playsinline", "playsinline");
                var e = document.createElement("source");
                e.src = "data:video/mp4;base64, AAAAHGZ0eXBNNFYgAAACAGlzb21pc28yYXZjMQAAAAhmcmVlAAAGF21kYXTeBAAAbGliZmFhYyAxLjI4AABCAJMgBDIARwAAArEGBf//rdxF6b3m2Ui3lizYINkj7u94MjY0IC0gY29yZSAxNDIgcjIgOTU2YzhkOCAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTQgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0wIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDE6MHgxMTEgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTAgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz02IGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MCB3ZWlnaHRwPTAga2V5aW50PTI1MCBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCB2YnZfbWF4cmF0ZT03NjggdmJ2X2J1ZnNpemU9MzAwMCBjcmZfbWF4PTAuMCBuYWxfaHJkPW5vbmUgZmlsbGVyPTAgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAAFZliIQL8mKAAKvMnJycnJycnJycnXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXiEASZACGQAjgCEASZACGQAjgAAAAAdBmjgX4GSAIQBJkAIZACOAAAAAB0GaVAX4GSAhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZpgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGagC/AySEASZACGQAjgAAAAAZBmqAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZrAL8DJIQBJkAIZACOAAAAABkGa4C/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmwAvwMkhAEmQAhkAI4AAAAAGQZsgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGbQC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBm2AvwMkhAEmQAhkAI4AAAAAGQZuAL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGboC/AySEASZACGQAjgAAAAAZBm8AvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZvgL8DJIQBJkAIZACOAAAAABkGaAC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmiAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZpAL8DJIQBJkAIZACOAAAAABkGaYC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmoAvwMkhAEmQAhkAI4AAAAAGQZqgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGawC/AySEASZACGQAjgAAAAAZBmuAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZsAL8DJIQBJkAIZACOAAAAABkGbIC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBm0AvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZtgL8DJIQBJkAIZACOAAAAABkGbgCvAySEASZACGQAjgCEASZACGQAjgAAAAAZBm6AnwMkhAEmQAhkAI4AhAEmQAhkAI4AhAEmQAhkAI4AhAEmQAhkAI4AAAAhubW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAABDcAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAzB0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAA+kAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAALAAAACQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAPpAAAAAAABAAAAAAKobWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAB1MAAAdU5VxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAACU21pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAhNzdGJsAAAAr3N0c2QAAAAAAAAAAQAAAJ9hdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAALAAkABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAALWF2Y0MBQsAN/+EAFWdCwA3ZAsTsBEAAAPpAADqYA8UKkgEABWjLg8sgAAAAHHV1aWRraEDyXyRPxbo5pRvPAyPzAAAAAAAAABhzdHRzAAAAAAAAAAEAAAAeAAAD6QAAABRzdHNzAAAAAAAAAAEAAAABAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAAIxzdHN6AAAAAAAAAAAAAAAeAAADDwAAAAsAAAALAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAAiHN0Y28AAAAAAAAAHgAAAEYAAANnAAADewAAA5gAAAO0AAADxwAAA+MAAAP2AAAEEgAABCUAAARBAAAEXQAABHAAAASMAAAEnwAABLsAAATOAAAE6gAABQYAAAUZAAAFNQAABUgAAAVkAAAFdwAABZMAAAWmAAAFwgAABd4AAAXxAAAGDQAABGh0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAACAAAAAAAABDcAAAAAAAAAAAAAAAEBAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAQkAAADcAABAAAAAAPgbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAC7gAAAykBVxAAAAAAALWhkbHIAAAAAAAAAAHNvdW4AAAAAAAAAAAAAAABTb3VuZEhhbmRsZXIAAAADi21pbmYAAAAQc21oZAAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAADT3N0YmwAAABnc3RzZAAAAAAAAAABAAAAV21wNGEAAAAAAAAAAQAAAAAAAAAAAAIAEAAAAAC7gAAAAAAAM2VzZHMAAAAAA4CAgCIAAgAEgICAFEAVBbjYAAu4AAAADcoFgICAAhGQBoCAgAECAAAAIHN0dHMAAAAAAAAAAgAAADIAAAQAAAAAAQAAAkAAAAFUc3RzYwAAAAAAAAAbAAAAAQAAAAEAAAABAAAAAgAAAAIAAAABAAAAAwAAAAEAAAABAAAABAAAAAIAAAABAAAABgAAAAEAAAABAAAABwAAAAIAAAABAAAACAAAAAEAAAABAAAACQAAAAIAAAABAAAACgAAAAEAAAABAAAACwAAAAIAAAABAAAADQAAAAEAAAABAAAADgAAAAIAAAABAAAADwAAAAEAAAABAAAAEAAAAAIAAAABAAAAEQAAAAEAAAABAAAAEgAAAAIAAAABAAAAFAAAAAEAAAABAAAAFQAAAAIAAAABAAAAFgAAAAEAAAABAAAAFwAAAAIAAAABAAAAGAAAAAEAAAABAAAAGQAAAAIAAAABAAAAGgAAAAEAAAABAAAAGwAAAAIAAAABAAAAHQAAAAEAAAABAAAAHgAAAAIAAAABAAAAHwAAAAQAAAABAAAA4HN0c3oAAAAAAAAAAAAAADMAAAAaAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAACMc3RjbwAAAAAAAAAfAAAALAAAA1UAAANyAAADhgAAA6IAAAO+AAAD0QAAA+0AAAQAAAAEHAAABC8AAARLAAAEZwAABHoAAASWAAAEqQAABMUAAATYAAAE9AAABRAAAAUjAAAFPwAABVIAAAVuAAAFgQAABZ0AAAWwAAAFzAAABegAAAX7AAAGFwAAAGJ1ZHRhAAAAWm1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALWlsc3QAAAAlqXRvbwAAAB1kYXRhAAAAAQAAAABMYXZmNTUuMzMuMTAw",
                this.blankVideo.appendChild(e)
            }
            ,
            e.prototype.initAdsLoader = function() {
                var e = this;
                this.adsLoader || window.google && (this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer),
                this.adsLoader.getSettings().setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.INSECURE),
                this.adsLoader.getSettings().setDisableCustomPlaybackForIOS10Plus(!0),
                this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdsManagerLoaded, !1, this),
                this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdLoaderError, !1, this),
                this.videoElement.addEventListener("onended", (function() {
                    return e.adsLoader.contentComplete()
                }
                )))
            }
            ,
            e.prototype.requestAd = function(e) {
                return at(this, void 0, void 0, (function() {
                    var t;
                    return st(this, (function(n) {
                        switch (n.label) {
                        case 0:
                            return this.runningAd ? [2] : (this.runningAd = !0,
                            this.completeOnce = !0,
                            this.videoStarted = !1,
                            this.adDisplayContainer.initialize(),
                            this.videoElement.src = "",
                            (t = new google.ima.AdsRequest).adTagUrl = e,
                            t.linearAdSlotWidth = this.currentWidth,
                            t.linearAdSlotHeight = this.currentHeight,
                            t.nonLinearAdSlotWidth = this.currentWidth,
                            t.nonLinearAdSlotHeight = this.currentHeight,
                            t.forceNonLinearFullSlot = !0,
                            [4, this.canWeAutoPlayWithSound()]);
                        case 1:
                            return n.sent() ? (t.setAdWillPlayMuted(!1),
                            this.currentRequestIsMuted = !1) : (t.setAdWillPlayMuted(!0),
                            this.currentRequestIsMuted = !0),
                            this.allowedToPlayAd = !0,
                            this.adsLoader.requestAds(t),
                            [2]
                        }
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.resize = function(e, t, n) {
            		return true;
                void 0 === n && (n = google.ima.ViewMode.NORMAL),
                this.currentWidth = e,
                this.currentHeight = t,
                this.adsManager && this.adsManager.resize(e, t, n)
            }
            ,
            e.prototype.onAdsManagerLoaded = function(e) {
                var t = new google.ima.AdsRenderingSettings;
                t.enablePreloading = !0,
                t.restoreCustomPlaybackStateOnAdBreakComplete = !0,
                t.mimeTypes = pe() || (0,
                x.Z)() || (0,
                E.Z)() ? ["video/mp4"] : ["video/mp4", "video/webm", "video/ogg"],
                t.loadVideoTimeout = 8e3,
                this.adsManager = e.getAdsManager(this.videoElement, t),
                this.adsManager.setVolume(Math.max(0, Math.min(1, this.volume))),
                this.currentRequestIsMuted && this.adsManager.setVolume(0),
                this.allowedToPlayAd ? (this.attachAdEvents(),
                y.dispatchEvent(n.Z.ads.ready)) : this.tearDown()
            }
            ,
            e.prototype.setVolume = function(e) {
                this.volume = e,
                this.adsManager && this.adsManager.setVolume(Math.max(0, Math.min(1, this.volume)))
            }
            ,
            e.prototype.startPlayback = function() {
                try {
                    this.adsManager.init(this.currentWidth, this.currentHeight, google.ima.ViewMode.NORMAL),
                    this.adsManager.start()
                } catch (e) {
                    this.videoElement.play()
                }
            }
            ,
            e.prototype.startIOSPlayback = function() {
                this.adsManager.start()
            }
            ,
            e.prototype.stopPlayback = function() {
                y.dispatchEvent(n.Z.ads.stopped),
                this.tearDown()
            }
            ,
            e.prototype.resumeAd = function() {
                y.dispatchEvent(n.Z.ads.video.resumed),
                this.adsManager && this.adsManager.resume()
            }
            ,
            e.prototype.tearDown = function() {
                this.adsManager && (this.adsManager.stop(),
                this.adsManager.destroy(),
                this.adsManager = null),
                null !== this.bannerTimeout && (clearTimeout(this.bannerTimeout),
                this.bannerTimeout = null),
                this.adsLoader && (this.adsLoader.contentComplete(),
                this.adsLoader.destroy(),
                this.adsLoader = null,
                this.initAdsLoader()),
                this.completeOnce = !1,
                this.runningAd = !1
            }
            ,
            e.prototype.attachAdEvents = function() {
                var e = this
                  , t = google.ima.AdEvent.Type;
                this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError, !1, this),
                [t.AD_PROGRESS, t.ALL_ADS_COMPLETED, t.CLICK, t.COMPLETE, t.IMPRESSION, t.PAUSED, t.SKIPPED, t.STARTED, t.USER_CLOSE, t.AD_BUFFERING].forEach((function(t) {
                    e.adsManager.addEventListener(t, e.onAdEvent, !1, e)
                }
                ))
            }
            ,
            e.prototype.onAdEvent = function(e) {
                var t = this
                  , i = e.getAd();
                switch (e.type) {
                case google.ima.AdEvent.Type.AD_PROGRESS:
                    y.dispatchEvent(n.Z.ads.video.progress, e.getAdData());
                    break;
                case google.ima.AdEvent.Type.STARTED:
                    e.remainingTime = this.adsManager.getRemainingTime(),
                    e.remainingTime <= 0 && (e.remainingTime = 15),
                    this.videoStarted = !0,
                    i.isLinear() || (this.bannerTimeout = window.setTimeout((function() {
                        t.completeOnce && (t.completeOnce = !1,
                        y.dispatchEvent(n.Z.ads.completed, {
                            rewardAllowed: t.videoStarted && e.rewardAllowed
                        })),
                        t.tearDown()
                    }
                    ), 1e3 * (e.remainingTime + 1))),
                    y.setDataAnnotations({
                        creativeId: i.getCreativeId()
                    }),
                    y.dispatchEvent(n.Z.ads.started, {
                        duration: i.getDuration()
                    });
                    break;
                case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                case google.ima.AdEvent.Type.COMPLETE:
                    this.completeOnce && (this.completeOnce = !1,
                    y.dispatchEvent(n.Z.ads.completed, {
                        rewardAllowed: this.videoStarted
                    })),
                    this.tearDown();
                    break;
                case google.ima.AdEvent.Type.USER_CLOSE:
                    this.completeOnce && (this.completeOnce = !1,
                    y.dispatchEvent(n.Z.ads.completed, {
                        rewardAllowed: !1
                    })),
                    this.tearDown();
                    break;
                case google.ima.AdEvent.Type.PAUSED:
                    this.adsManager.pause(),
                    y.dispatchEvent(n.Z.ads.video.paused);
                    break;
                case google.ima.AdEvent.Type.AD_BUFFERING:
                    y.dispatchEvent(n.Z.ads.video.buffering);
                    break;
                case google.ima.AdEvent.Type.CLICK:
                    y.dispatchEvent(n.Z.ads.video.clicked);
                    break;
                case google.ima.AdEvent.Type.SKIPPED:
                    y.dispatchEvent(n.Z.ads.skipped),
                    this.completeOnce && (this.completeOnce = !1,
                    y.dispatchEvent(n.Z.ads.completed, {
                        rewardAllowed: this.videoStarted
                    })),
                    document.activeElement && document.activeElement.blur();
                    break;
                case google.ima.AdEvent.Type.IMPRESSION:
                    y.dispatchEvent(n.Z.ads.impression, {
                        creativeId: i.getCreativeId()
                    })
                }
            }
            ,
            e.prototype.onAdLoaderError = function(e) {
                this.tearDown();
                var t = null == e ? void 0 : e.getError()
                  , i = (null == t ? void 0 : t.toString()) || "Unknown"
                  , r = (null == t ? void 0 : t.getErrorCode()) || 0;
                y.dispatchEvent(n.Z.ads.video.loaderError, {
                    message: i,
                    errorCode: r
                })
            }
            ,
            e.prototype.onAdError = function(e) {
                this.tearDown();
                var t = null == e ? void 0 : e.getError()
                  , i = (null == t ? void 0 : t.toString()) || "Unknown"
                  , r = (null == t ? void 0 : t.getErrorCode()) || 0;
                y.dispatchEvent(n.Z.ads.video.error, {
                    message: i,
                    errorCode: r
                })
            }
            ,
            e.prototype.muteAd = function() {
                void 0 !== this.adsManager && null != this.adsManager && this.adsManager.setVolume(0)
            }
            ,
            e.prototype.isAdRunning = function() {
                return this.runningAd
            }
            ,
            e
        }();
        var ct = function(e, t, n, i) {
            return new (n || (n = Promise))((function(r, o) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? r(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , lt = function(e, t) {
            var n, i, r, o, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }
            ),
            o;
            function s(o) {
                return function(s) {
                    return function(o) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                i && (r = 2 & o[0] ? i.return : o[0] ? i.throw || ((r = i.return) && r.call(i),
                                0) : i.next) && !(r = r.call(i, o[1])).done)
                                    return r;
                                switch (i = 0,
                                r && (o = [2 & o[0], r.value]),
                                o[0]) {
                                case 0:
                                case 1:
                                    r = o;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    i = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = a.trys,
                                    (r = r.length > 0 && r[r.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < r[1]) {
                                        a.label = r[1],
                                        r = o;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2],
                                        a.ops.push(o);
                                        break
                                    }
                                    r[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                o = t.call(e, a)
                            } catch (e) {
                                o = [6, e],
                                i = 0
                            } finally {
                                n = r = 0
                            }
                        if (5 & o[0])
                            throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        };
        const At = function() {
            var e = window.location.pathname;
            "/" !== e[0] && (e = "/" + e);
            var t = encodeURIComponent(window.location.protocol + "//" + window.location.host + e + window.location.search)
              , n = encodeURIComponent(document.referrer);
            return fetch("json/null.json?https://devs-api.poki.com/gameinfo/@sdk?href=" + t + "&referrer=" + n, {
                method: "GET",
                headers: {
                    "Content-Type": "text/plain"
                }
            }).then((function(e) {
                return ct(void 0, void 0, void 0, (function() {
                    var t;
                    return lt(this, (function(n) {
                        switch (n.label) {
                        case 0:
                            return e.status >= 200 && e.status < 400 ? [4, e.json()] : [3, 2];
                        case 1:
                            return (t = n.sent()).game_id ? [2, {
                                gameID: t.game_id,
                                gameTitle: t.game_name,
                                playtestLobbyID: t.playtest_lobby_id,
                                cachedContentGameID: t.cached_content_game_id,
                                adTiming: {
                                    preroll: t.ad_settings.preroll,
                                    timePerTry: t.ad_settings.time_per_try,
                                    timeBetweenAds: t.ad_settings.time_between_ads,
                                    startAdsAfter: t.ad_settings.start_ads_after
                                }
                            }] : [2, void 0];
                        case 2:
                            throw e
                        }
                    }
                    ))
                }
                ))
            }
            )).catch((function(e) {
                return function(e) {
                    return ct(this, void 0, void 0, (function() {
                        var t, n, i, r, o, a, s, d, c, l, A, u;
                        return lt(this, (function(p) {
                            switch (p.label) {
                            case 0:
                                return p.trys.push([0, 3, , 4]),
                                "/" !== (t = window.location.pathname)[0] && (t = "/" + t),
                                r = (i = JSON).stringify,
                                l = {
                                    c: "sdk-p4d-error",
                                    ve: 7
                                },
                                A = {
                                    k: "error"
                                },
                                a = (o = JSON).stringify,
                                u = {
                                    status: e.status
                                },
                                (s = e.json) ? [4, e.json()] : [3, 2];
                            case 1:
                                s = p.sent(),
                                p.label = 2;
                            case 2:
                                if (n = r.apply(i, [(l.d = [(A.v = a.apply(o, [(u.json = s,
                                u.body = JSON.stringify({
                                    href: window.location.protocol + "//" + window.location.host + t + window.location.search
                                }),
                                u.name = e.name,
                                u.message = e.message,
                                u)]),
                                A)],
                                l)]),
                                d = "json/null.json?https://t.poki.io/l",
                                navigator.sendBeacon)
                                    navigator.sendBeacon(d, n);
                                else
                                    try {
                                        (c = new XMLHttpRequest).open("POST", d, !0),
                                        c.send(n)
                                    } catch (e) {}
                                return [3, 4];
                            case 3:
                                return p.sent(),
                                [3, 4];
                            case 4:
                                return [2]
                            }
                        }
                        ))
                    }
                    ))
                }(e)
            }
            ))
        };
        var ut = function(e, t, n, i) {
            return new (n || (n = Promise))((function(r, o) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? r(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , pt = function(e, t) {
            var n, i, r, o, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }
            ),
            o;
            function s(o) {
                return function(s) {
                    return function(o) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                i && (r = 2 & o[0] ? i.return : o[0] ? i.throw || ((r = i.return) && r.call(i),
                                0) : i.next) && !(r = r.call(i, o[1])).done)
                                    return r;
                                switch (i = 0,
                                r && (o = [2 & o[0], r.value]),
                                o[0]) {
                                case 0:
                                case 1:
                                    r = o;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    i = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = a.trys,
                                    (r = r.length > 0 && r[r.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < r[1]) {
                                        a.label = r[1],
                                        r = o;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2],
                                        a.ops.push(o);
                                        break
                                    }
                                    r[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                o = t.call(e, a)
                            } catch (e) {
                                o = [6, e],
                                i = 0
                            } finally {
                                n = r = 0
                            }
                        if (5 & o[0])
                            throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        };
        function ht() {
            return ut(this, void 0, void 0, (function() {
                var e, t, n, i;
                return pt(this, (function(r) {
                    switch (r.label) {
                    case 0:
                        return r.trys.push([0, 3, , 4]),
                        [4, fetch("json/geo.json?https://geo.poki.io/", {
                            method: "GET",
                            headers: {
                                "Content-Type": "text/plain"
                            }
                        })];
                    case 1:
                        return [4, r.sent().json()];
                    case 2:
                        return e = r.sent(),
                        t = e.ISO,
                        n = e.ccpaApplies,
                        [2, {
                            ISO: t,
                            ccpaApplies: n
                        }];
                    case 3:
                        return i = r.sent(),
                        console.error(i),
                        [2, {
                            ISO: ot.D,
                            ccpaApplies: !1
                        }];
                    case 4:
                        return [2]
                    }
                }
                ))
            }
            ))
        }
        var mt = function(e, t, n, i) {
            return new (n || (n = Promise))((function(r, o) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? r(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , gt = function(e, t) {
            var n, i, r, o, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }
            ),
            o;
            function s(o) {
                return function(s) {
                    return function(o) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                i && (r = 2 & o[0] ? i.return : o[0] ? i.throw || ((r = i.return) && r.call(i),
                                0) : i.next) && !(r = r.call(i, o[1])).done)
                                    return r;
                                switch (i = 0,
                                r && (o = [2 & o[0], r.value]),
                                o[0]) {
                                case 0:
                                case 1:
                                    r = o;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    i = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = a.trys,
                                    (r = r.length > 0 && r[r.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < r[1]) {
                                        a.label = r[1],
                                        r = o;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2],
                                        a.ops.push(o);
                                        break
                                    }
                                    r[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                o = t.call(e, a)
                            } catch (e) {
                                o = [6, e],
                                i = 0
                            } finally {
                                n = r = 0
                            }
                        if (5 & o[0])
                            throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        };
        function ft() {
            var e, t;
            return mt(this, void 0, void 0, (function() {
                var n, i, r, o, a;
                return gt(this, (function(s) {
                    switch (s.label) {
                    case 0:
                        if ("undefined" == typeof window || "test" === (null === (t = null === (e = null === window || void 0 === window ? void 0 : window.process) || void 0 === e ? void 0 : e.env) || void 0 === t ? void 0 : t.NODE_ENV))
                            return [2, {
                                blocklist: [],
                                countryExclusion: [],
                                bidderLimitation: {}
                            }];
                        s.label = 1;
                    case 1:
                        return s.trys.push([1, 4, , 5]),
                        [4, fetch("json/null.json?https://api.poki.com/ads/settings", {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })];
                    case 2:
                        return [4, s.sent().json()];
                    case 3:
                        return n = s.sent(),
                        i = n.blocklist,
                        r = n.country_exclusion,
                        o = n.bidder_limitation,
                        [2, {
                            blocklist: (null == i ? void 0 : i.split(/[\r\n]+/)) || [],
                            countryExclusion: (r.split(",") || []).map((function(e) {
                                return e.toUpperCase()
                            }
                            )),
                            bidderLimitation: JSON.parse(o || "{}")
                        }];
                    case 4:
                        return a = s.sent(),
                        console.error(a),
                        [2, {
                            blocklist: [],
                            countryExclusion: [],
                            bidderLimitation: {}
                        }];
                    case 5:
                        return [2]
                    }
                }
                ))
            }
            ))
        }
        var vt = function() {
            return vt = Object.assign || function(e) {
                for (var t, n = 1, i = arguments.length; n < i; n++)
                    for (var r in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e
            }
            ,
            vt.apply(this, arguments)
        };
        var bt = function() {
            function e() {
                this.slotMap = new Map,
                this.enforceChildSafety = function() {
                    window.googletag.cmd.push((function() {
                        window.googletag.pubads().setPrivacySettings({
                            underAgeOfConsent: !0,
                            childDirectedTreatment: !0,
                            restrictDataProcessing: !0
                        })
                    }
                    ))
                }
                ,
                this.enforceNonPersonalized = function() {
                    window.googletag.cmd.push((function() {
                        window.googletag.pubads().setPrivacySettings({
                            nonPersonalizedAds: !0
                        })
                    }
                    ))
                }
                ,
                this.requestAd = function(e) {
                    var t, i;
                    L.track(n.Z.tracking.ads.display.requested, {
                        size: e.size,
                        opportunityId: e.opportunityId,
                        adUnitPath: e.adUnitPath,
                        duringGameplay: null === (t = e.duringGameplay) || void 0 === t ? void 0 : t.call(e),
                        refresh: e.refreshNumber > 0,
                        refreshNumber: e.refreshNumber,
                        refreshType: (null === (i = e.criteria) || void 0 === i ? void 0 : i.refreshType) || "",
                        platformAd: e.platformAd
                    });
                    var r = 0
                      , o = Ze()
                      , a = function() {
                        if (!(--r > 0)) {
                            if (window.apstag)
                                try {
                                    window.apstag.setDisplayBids()
                                } catch (e) {}
                            if (o)
                                try {
                                    window.pbjs.setTargetingForGPTAsync([e.adUnitPath]),
                                    e.pbjsTargetting = window.pbjs.getAdserverTargetingForAdUnitCode([e.adUnitPath])
                                } catch (e) {}
                            e.refreshNumber > 0 ? window.googletag.pubads().refresh([e.gptSlot]) : window.googletag.display(e.id)
                        }
                    };
                    if (window.apstag && r++,
                    o && r++,
                    window.apstag)
                        try {
                            window.apstag.fetchBids({
                                slots: [{
                                    slotName: e.adUnitPath,
                                    slotID: e.id,
                                    sizes: [[e.width, e.height]]
                                }],
                                timeout: 1500
                            }, (function() {
                                a()
                            }
                            ))
                        } catch (e) {
                            a()
                        }
                    if (o)
                        try {
                            window.pbjs.requestBids({
                                adUnitCodes: [e.adUnitPath],
                                bidsBackHandler: function() {
                                    a()
                                }
                            })
                        } catch (e) {
                            a()
                        }
                    window.apstag || o || a()
                }
                ,
                this.requestHouseAd = function(e, t) {
                    var i = vt(vt({}, t), {
                        dfpIsBackfill: void 0,
                        dfpLineItemId: void 0,
                        dfpCampaignId: void 0,
                        size: e.width + "x" + e.height,
                        bidder: "poki",
                        bid: 0
                    });
                    w(vt(vt({}, i), {
                        event: "request"
                    })),
                    fetch("https://api.poki.com/ads/houseads/display/" + e.width + "x" + e.height + "?game_id=" + h.Z.gameID + "&site=" + h.Z.siteID).then((function(e) {
                        return e.json()
                    }
                    )).then((function(r) {
                        e.innerAdContainer.innerHTML = '<a href="' + r.click_through_url + '" target="_blank"><img src="' + r.asset + '" alt="house ad" /></a>',
                        t.houseAdId = r.id,
                        L.track(n.Z.tracking.ads.display.impression, t),
                        w(vt(vt({}, i), {
                            event: "impression"
                        })),
                        setTimeout((function() {
                            w(vt(vt({}, i), {
                                event: "viewable"
                            }))
                        }
                        ), 1e3)
                    }
                    ))
                }
            }
            return e.prototype.callOnCanDestroy = function(e) {
                var t = this.slotMap.get(e);
                t && !t.onCanDestroyCalled && t.onCanDestroy && (t.onCanDestroyCalled = !0,
                t.onCanDestroy())
            }
            ,
            e.prototype.setupSlotRenderEndedListener = function() {
                var e = this;
                window.googletag.cmd.push((function() {
                    window.googletag.pubads().addEventListener("slotRenderEnded", (function(t) {
                        var i, r, o, a, s, d = t.slot.getSlotElementId(), c = e.slotMap.get(d);
                        if (c && c.gptSlot) {
                            var l = t.slot || {}
                              , A = (null === (i = l.getResponseInformation) || void 0 === i ? void 0 : i.call(l)) || {}
                              , u = A.isBackfill
                              , p = A.lineItemId
                              , h = A.campaignId
                              , m = function(e) {
                                if (!e || "function" != typeof e.indexOf)
                                    return null;
                                if (-1 !== e.indexOf("amazon-adsystem.com/aax2/apstag"))
                                    return null;
                                var t = new RegExp('(?:(?:pbjs\\.renderAd\\(document,|adId:*|hb_adid":\\[)|(?:pbadid=)|(?:adId=))[\'"](.*?)["\']',"gi")
                                  , n = e.replace(/ /g, "")
                                  , i = t.exec(n);
                                return i && i[1] || null
                            }(null === (o = (r = l).getHtml) || void 0 === o ? void 0 : o.call(r))
                              , g = !!m
                              , f = c.pbjsTargetting || {}
                              , v = f.hb_bidder
                              , b = f.hb_adomain
                              , y = function(e) {
                                var t, n = {
                                    cpm: 0
                                };
                                if (void 0 === window.pbjs || !Ze())
                                    return n;
                                var i = window.pbjs.getAllWinningBids() || [];
                                return ((null === (t = window.pbjs.getBidResponsesForAdUnitCode(e)) || void 0 === t ? void 0 : t.bids) || []).forEach((function(e) {
                                    !i.find((function(t) {
                                        return t.adId === e.adId
                                    }
                                    )) && e.cpm > n.cpm && (n = e)
                                }
                                )),
                                n
                            }(c.adUnitPath)
                              , k = t.isEmpty
                              , w = parseFloat(f.hb_pb);
                            isNaN(w) && (w = void 0);
                            var x = {
                                size: c.size,
                                opportunityId: c.opportunityId,
                                refresh: c.refreshNumber > 0,
                                refreshNumber: c.refreshNumber,
                                refreshType: (null === (a = c.criteria) || void 0 === a ? void 0 : a.refreshType) || "",
                                duringGameplay: null === (s = c.duringGameplay) || void 0 === s ? void 0 : s.call(c),
                                adUnitPath: c.adUnitPath,
                                prebidBid: w,
                                prebidBidder: v,
                                prebidWon: g,
                                prebidSecondBid: y.cpm > 0 ? y.cpm : void 0,
                                prebidSecondBidder: y.bidder,
                                dfpIsBackfill: u,
                                dfpLineItemId: p,
                                dfpCampaignId: h,
                                isEmpty: k,
                                adDomain: b,
                                platformAd: c.platformAd
                            };
                            c.onDisplayRendered && c.onDisplayRendered(k),
                            k && e.callOnCanDestroy(c.id),
                            k && c.backfillHouseads ? e.requestHouseAd(c, x) : L.track(n.Z.tracking.ads.display.impression, x)
                        }
                    }
                    )),
                    window.googletag.pubads().addEventListener("impressionViewable", (function(t) {
                        var n = t.slot.getSlotElementId();
                        setTimeout((function() {
                            e.callOnCanDestroy(n)
                        }
                        ), 1e3 * Math.random())
                    }
                    ))
                }
                ))
            }
            ,
            e.prototype.validateDisplaySettings = function(e) {
                return (0,
                x.Z)() || (0,
                E.Z)() ? ["320x50"].includes(e) : ["970x250", "300x250", "728x90", "160x600", "320x50"].includes(e)
            }
            ,
            e.prototype.getDisplaySlotConfig = function(e, t, n) {
                var i = t.split("x").map((function(e) {
                    return parseInt(e, 10)
                }
                ))
                  , r = this.getDisplaySlotID(e);
                if (r) {
                    var o = this.slotMap.get(r);
                    if (o && o.width === i[0] && o.height === i[1])
                        return o.refreshNumber++,
                        o;
                    this.clearAd(e)
                }
                var a = "/21682198607/debug-display/debug-display-" + t
                  , s = "desktop";
                (0,
                x.Z)() ? s = "mobile" : (0,
                E.Z)() && (s = "tablet"),
                m.debug || (a = h.Z.isPokiIframe ? "/21682198607/" + s + "_ingame_" + t + "/" + h.Z.siteID + "_" + s + "_ingame_" + t : n || "/21682198607/external_" + s + "_display_ingame/external_" + s + "_ingame_" + t);
                var d = "poki-" + se()
                  , c = document.createElement("div");
                return c.id = d,
                c.className = "poki-ad-slot",
                c.style.width = i[0] + "px",
                c.style.height = i[1] + "px",
                c.style.overflow = "hidden",
                c.style.position = "relative",
                c.setAttribute("data-poki-ad-size", t),
                {
                    id: d,
                    adUnitPath: a,
                    size: t,
                    width: i[0],
                    height: i[1],
                    refreshNumber: 0,
                    onCanDestroyCalled: !1,
                    backfillHouseads: !1,
                    innerAdContainer: c,
                    criteria: {},
                    platformAd: !1
                }
            }
            ,
            e.prototype.renderAd = function(e) {
                var t, n = this, i = e.container, r = e.size, o = e.opportunityId, a = e.criteria, s = void 0 === a ? {} : a, d = e.adUnitPath, c = void 0 === d ? "" : d, l = e.duringGameplay, A = void 0 === l ? function() {
                    return !1
                }
                : l, u = e.onCanDestroy, p = void 0 === u ? function() {}
                : u, h = e.onDisplayRendered, m = void 0 === h ? function() {}
                : h, g = e.backfillHouseads, f = void 0 !== g && g, v = e.platformAd, b = void 0 !== v && v, y = this.getDisplaySlotConfig(i, r, c);
                y.backfillHouseads = f,
                y.criteria = s,
                y.platformAd = b,
                this.slotMap.set(y.id, y),
                y.opportunityId = o,
                y.duringGameplay = A,
                y.onDisplayRendered = m,
                y.onCanDestroy = p;
                var k = null;
                y.refreshNumber > 0 && (k = y.innerAdContainer),
                k || (i.appendChild(y.innerAdContainer),
                i.setAttribute("data-poki-ad-id", y.id)),
                y.intersectionObserver = new window.IntersectionObserver((function(e) {
                    var t;
                    e[0].isIntersecting && (null === (t = y.intersectionObserver) || void 0 === t || t.disconnect(),
                    setTimeout((function() {
                        n.callOnCanDestroy(y.id)
                    }
                    ), 6e3),
                    window.googletag.cmd.push((function() {
                        var e = n.slotMap.get(y.id);
                        e && e.opportunityId === o && (n.setupGPT(y, s),
                        n.requestAd(y))
                    }
                    )))
                }
                ),{
                    threshold: .5
                }),
                null === (t = y.intersectionObserver) || void 0 === t || t.disconnect(),
                y.intersectionObserver.observe(y.innerAdContainer)
            }
            ,
            e.prototype.setupGPT = function(e, t) {
                var n;
                e.gptSlot || (160 === e.width && 600 === e.height ? e.gptSlot = window.googletag.defineSlot(e.adUnitPath, [[e.width, e.height], "fluid"], e.id).addService(window.googletag.pubads()) : e.gptSlot = window.googletag.defineSlot(e.adUnitPath, [e.width, e.height], e.id).addService(window.googletag.pubads())),
                window.googletag.enableServices(),
                null === (n = e.gptSlot) || void 0 === n || n.clearTargeting(),
                Object.keys(t).forEach((function(n) {
                    var i, r = t[n];
                    "" !== r && (null === (i = e.gptSlot) || void 0 === i || i.setTargeting(n, r))
                }
                ))
            }
            ,
            e.prototype.clearAd = function(e) {
                var t, i = this.getDisplaySlotID(e);
                if (i) {
                    var r = this.slotMap.get(i) || null;
                    if (r) {
                        for (r.onCanDestroy && !r.onCanDestroyCalled && console.warn("destroyAd called without waiting for onCanDestroy"),
                        L.track(n.Z.tracking.screen.destroyAd, {
                            opportunityId: r.opportunityId,
                            okToDestroy: r.onCanDestroyCalled,
                            platformAd: r.platformAd
                        }),
                        null === (t = r.intersectionObserver) || void 0 === t || t.disconnect(),
                        r.gptSlot && googletag.destroySlots([r.gptSlot]); e.lastChild; )
                            e.removeChild(e.lastChild);
                        e.removeAttribute("data-poki-ad-id"),
                        this.slotMap.delete(r.id)
                    }
                } else
                    console.error("destroyAd called on a container without ad")
            }
            ,
            e.prototype.getDisplaySlotID = function(e) {
                if (!e)
                    return null;
                var t = e.getAttribute("data-poki-ad-id");
                return t || null
            }
            ,
            e
        }();
        const yt = bt;
        var kt, wt = (kt = function(e, t) {
            return kt = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            ,
            kt(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            kt(e, t),
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
            new n)
        }
        ), xt = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.waitUntilReady = function(e) {
                    window.pbjs.que.push((function() {
                        e()
                    }
                    ))
                }
                ,
                t.requestAd = function(e) {
                    w({
                        event: "request",
                        size: e.size,
                        opportunityId: e.opportunityId,
                        adUnitPath: e.adUnitPath
                    });
                    var n = 1
                      , i = function() {
                        --n > 0 || t.allBidsBack(e.id)
                    };
                    if (window.apstag) {
                        n++;
                        try {
                            window.apstag.fetchBids({
                                slots: [{
                                    slotName: e.adUnitPath,
                                    slotID: e.id,
                                    sizes: [[e.width, e.height]]
                                }],
                                timeout: 1500
                            }, (function(t) {
                                t && t.length > 0 && (e.amznTargetting = t[0]),
                                i()
                            }
                            ))
                        } catch (e) {
                            i()
                        }
                    }
                    window.pbjs.requestBids({
                        adUnitCodes: [e.adUnitPath],
                        bidsBackHandler: function() {
                            e.pbjsTargetting = window.pbjs.getAdserverTargetingForAdUnitCode([e.adUnitPath]),
                            i()
                        }
                    })
                }
                ,
                t.setupGPT = function(e, t) {}
                ,
                t.setupSlotRenderEndedListener = function() {}
                ,
                t
            }
            return wt(t, e),
            t.prototype.allBidsBack = function(e) {
                var t, i, r, o, a = this, s = this.slotMap.get(e);
                if (s) {
                    var d = document.createElement("iframe");
                    d.setAttribute("frameborder", "0"),
                    d.setAttribute("scrolling", "no"),
                    d.setAttribute("marginheight", "0"),
                    d.setAttribute("marginwidth", "0"),
                    d.setAttribute("topmargin", "0"),
                    d.setAttribute("leftmargin", "0"),
                    d.setAttribute("allowtransparency", "true"),
                    d.setAttribute("width", "" + s.width),
                    d.setAttribute("height", "" + s.height);
                    var c = document.getElementById(s.id);
                    if (c) {
                        c.appendChild(d);
                        var l = null === (t = null == d ? void 0 : d.contentWindow) || void 0 === t ? void 0 : t.document;
                        if (!l)
                            return console.error("Display error - iframe injection for ad failed", e),
                            void this.clearAd(c.parentNode);
                        var A = !0
                          , u = s.pbjsTargetting.hb_bidder
                          , p = parseFloat(s.pbjsTargetting.hb_pb);
                        isNaN(p) && (p = 0);
                        var h, m, g = (h = null === (i = null == s ? void 0 : s.amznTargetting) || void 0 === i ? void 0 : i.amznbid,
                        we[h] || 0);
                        g > p ? (m = null === (r = null == s ? void 0 : s.amznTargetting) || void 0 === r ? void 0 : r.amnzp,
                        u = xe[m] || "Amazon",
                        p = g,
                        A = !1,
                        this.renderAMZNAd(s.id, c, l)) : this.renderPrebidAd(s.id, c, l);
                        var f = !u;
                        L.track(n.Z.tracking.ads.display.impression, {
                            size: s.size,
                            opportunityId: s.opportunityId,
                            duringGameplay: null === (o = s.duringGameplay) || void 0 === o ? void 0 : o.call(s),
                            adUnitPath: s.adUnitPath,
                            prebidBid: p,
                            prebidBidder: u,
                            preBidWon: A,
                            dfpIsBackfill: !1,
                            dfpLineItemId: void 0,
                            dfpCampaignId: void 0,
                            adDomain: s.pbjsTargetting.hb_adomain,
                            isEmpty: f
                        }),
                        w({
                            event: "impression",
                            size: s.size,
                            opportunityId: s.opportunityId,
                            adUnitPath: s.adUnitPath,
                            bidder: u,
                            bid: p
                        }),
                        s.onDisplayRendered && s.onDisplayRendered(f),
                        f ? this.callOnCanDestroy(s.id) : (s.intersectionObserver = new IntersectionObserver((function(e) {
                            e.forEach((function(e) {
                                e.isIntersecting ? s.intersectingTimer || (s.intersectingTimer = setTimeout((function() {
                                    var t;
                                    null === (t = s.intersectionObserver) || void 0 === t || t.unobserve(e.target),
                                    w({
                                        event: "viewable",
                                        size: s.size,
                                        opportunityId: s.opportunityId,
                                        adUnitPath: s.adUnitPath,
                                        bidder: u,
                                        bid: p
                                    }),
                                    a.callOnCanDestroy(s.id)
                                }
                                ), 1e3)) : s.intersectingTimer && (clearTimeout(s.intersectingTimer),
                                s.intersectingTimer = void 0)
                            }
                            ))
                        }
                        ),{
                            threshold: .5
                        }),
                        s.intersectionObserver.observe(c))
                    } else
                        console.error("Display error - container not found", e)
                }
            }
            ,
            t.prototype.renderPrebidAd = function(e, t, n) {
                var i = this.slotMap.get(e);
                if (i)
                    return i.pbjsTargetting.hb_adid ? void window.pbjs.renderAd(n, i.pbjsTargetting.hb_adid) : (console.error("Display info - prebid nothing to render", e, i.pbjsTargetting),
                    void this.clearAd(t.parentNode))
            }
            ,
            t.prototype.renderAMZNAd = function(e, t, n) {
                var i, r, o = this.slotMap.get(e);
                if (o)
                    return (null === (i = null == o ? void 0 : o.amznTargetting) || void 0 === i ? void 0 : i.amzniid) ? void window.apstag.renderImp(n, null === (r = null == o ? void 0 : o.amznTargetting) || void 0 === r ? void 0 : r.amzniid) : (console.error("Display info - amazon nothing to render", e, o.pbjsTargetting),
                    void this.clearAd(t.parentNode))
            }
            ,
            t
        }(yt);
        const Et = xt;
        var It = function() {
            return It = Object.assign || function(e) {
                for (var t, n = 1, i = arguments.length; n < i; n++)
                    for (var r in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e
            }
            ,
            It.apply(this, arguments)
        }
          , St = function(e, t, n) {
            if (n || 2 === arguments.length)
                for (var i, r = 0, o = t.length; r < o; r++)
                    !i && r in t || (i || (i = Array.prototype.slice.call(t, 0, r)),
                    i[r] = t[r]);
            return e.concat(i || Array.prototype.slice.call(t))
        }
          , Zt = function() {
            function e() {
                this.autoStartOnReady = !1,
                this.criteria = {},
                this.handlers = {},
                this.initializingPromise = null,
                this.isInitialized = !1,
                this.sdkBooted = !1,
                this.startAdEnabled = !1,
                this.startStartAdsAfterTimerOnInit = !1,
                this.initOptions = {},
                this.adSettings = {
                    blocklist: [],
                    countryExclusion: [],
                    bidderLimitation: {}
                },
                this.adReady = !1,
                this.sdkImaError = !1,
                this.displayOnly = !1,
                this.sdkNotBootedButCalled = function() {
                    console.error("The Poki SDK has not yet been initialized")
                }
                ,
                this.genericCriteria = function() {
                    var e = {};
                    return e.tag = h.Z.tag,
                    e.tag_site = h.Z.tag + "|" + h.Z.siteID,
                    e.site_id = encodeURIComponent(h.Z.siteID),
                    e.experiment = encodeURIComponent(h.Z.experiment),
                    e.categories = encodeURIComponent(h.Z.categories),
                    e.p4d_game_id = h.Z.gameID,
                    e
                }
                ,
                this.display = Le() ? new Et : new yt
            }
            return e.prototype.init = function(e) {
                if (void 0 === e && (e = {}),
                "undefined" != typeof window) {
                    var t = e.onReady
                      , n = void 0 === t ? null : t
                      , i = e.onAdblocked
                      , r = void 0 === i ? null : i;
                    return this.initOptions = e,
                    n && this.registerHandler("onReady", n),
                    r && this.registerHandler("onAdblocked", r),
                    this.isInitialized ? console.error("Poki SDK has already been initialized") : (this.initializingPromise || (this.initializingPromise = this.loadMonetizationCore()),
                    this.initializingPromise)
                }
            }
            ,
            e.prototype.loadMonetizationCore = function() {
                var e = this
                  , t = this.initOptions
                  , i = t.prebid
                  , r = void 0 === i ? {} : i
                  , o = t.a9
                  , a = void 0 === o ? {} : o
                  , s = t.volume
                  , d = void 0 === s ? 1 : s
                  , c = t.waterfallRetries
                  , l = t.wrapper
                  , A = t.debug
                  , u = void 0 === A ? void 0 : A
                  , p = t.logging
                  , g = void 0 === p ? void 0 : p
                  , f = t.displayOnly
                  , v = void 0 !== f && f
                  , b = t.nonPersonalized
                  , k = void 0 !== b && b;
                this.displayOnly = v,
                window.googletag = window.googletag || {
                    cmd: []
                },
                window.pbjs = window.pbjs || {
                    que: []
                },
                m.init(u, g),
                this.setupDefaultEvents(),
                L.setupDefaultEvents(),
                h.Z.isPokiIframe && (K(),
                setTimeout(V.trackSavegames, 1e4)),
                window.addEventListener("resize", this.resize.bind(this), !1);
                var w = It({}, ce)
                  , x = At;
                m.debug && (x = function() {
                    return Promise.resolve()
                }
                );
                var E = h.Z.ccpaApplies
                  , I = void 0 !== this.initOptions.isCCPA ? this.initOptions.isCCPA : "" !== E ? "1" === E : void 0
                  , S = ht
                  , Z = (this.initOptions.country || h.Z.country).toUpperCase();
                Z && void 0 !== I && (S = function() {
                    return Promise.resolve({
                        ISO: Z,
                        ccpaApplies: I
                    })
                }
                );
                var C = [x(), S()]
                  , _ = St(St([], C, !0), [ft()], !1)
                  , T = h.Z.referrer.includes("kiloo.com");
                return _.push(z("js/null.js?https://securepubads.g.doubleclick.net/tag/js/gpt.js")),
                v || _.push(z("js/null.js?https://imasdk.googleapis.com/js/sdkloader/ima3.js")),
                T || k ? (T && ((0,
                h.w)("childDirected", "true"),
                this.display.enforceChildSafety()),
                (0,
                h.w)("nonPersonalized", "true"),
                this.display.enforceNonPersonalized()) : _.push(z("js/null.js?https://a.poki.com/prebid/prebid7.8.0.js"), z("js/null.js?https://c.amazon-adsystem.com/aax2/apstag.js")),
                this.display.setupSlotRenderEndedListener(),
                Promise.allSettled = Promise.allSettled || function(e) {
                    return Promise.all(e.map((function(e) {
                        return e.then((function(e) {
                            return {
                                status: "fulfilled",
                                value: e
                            }
                        }
                        )).catch((function(e) {
                            return {
                                status: "rejected",
                                reason: e
                            }
                        }
                        ))
                    }
                    )))
                }
                ,
                Promise.allSettled(_).then((function(t) {
                    try {
                        var i = t[0]
                          , o = t[1]
                          , s = t[2]
                          , A = t[3]
                          , u = t[4];
                        if ("fulfilled" === i.status) {
                            var p = i.value;
                            p && (h.Z.gameID || (0,
                            h.w)("gameID", p.gameID),
                            p.cachedContentGameID && (0,
                            h.w)("contentGameID", p.cachedContentGameID),
                            w.adTiming = p.adTiming,
                            w.customCriteria = It(It({}, w.customCriteria), {
                                p4d_game_id: h.Z.gameID
                            }),
                            D(p))
                        }
                        var g = {
                            ISO: "ZZ",
                            ccpaApplies: !1
                        };
                        if ("fulfilled" === o.status && (g = o.value),
                        (0,
                        h.w)("country", (Z || (null == g ? void 0 : g.ISO) || "ZZ").toUpperCase()),
                        (0,
                        h.w)("gdprApplies", (0,
                        ot.M)(h.Z.country)),
                        (0,
                        h.w)("ccpaApplies", void 0 === I ? (null == g ? void 0 : g.ccpaApplies) || !1 : I),
                        J(),
                        "fulfilled" === s.status) {
                            var f = s.value;
                            f && (e.adSettings = f)
                        }
                        if (k = e.adSettings.blocklist,
                        Ie = k || [],
                        "rejected" === A.status)
                            return void y.dispatchEvent(n.Z.adblocked);
                        if (ze(r, e.adSettings.bidderLimitation),
                        Oe(a, e.adSettings.bidderLimitation),
                        !v && "rejected" === u.status)
                            return void y.dispatchEvent(n.Z.adblocked);
                        m.debug && (w.adTiming.startAdsAfter = 0);
                        var b = h.Z.forceAd;
                        b && (w.adTiming = {
                            preroll: !0,
                            timeBetweenAds: 12e4,
                            timePerTry: 7e3,
                            startAdsAfter: 0
                        },
                        w.customCriteria = It(It({}, w.customCriteria), {
                            force_ad: b
                        })),
                        e.enableSettings(w),
                        e.playerSkin = new it({
                            wrapper: l
                        }),
                        e.ima = new dt(d),
                        e.playerSkin.setupEvents(e),
                        e.startStartAdsAfterTimerOnInit && e.adTimings.startStartAdsAfterTimer(),
                        e.waterfall = new Ne(e.ima,{
                            timing: e.adTimings,
                            totalRetries: c
                        }),
                        e.isInitialized = !0,
                        y.dispatchEvent(n.Z.ready)
                    } catch (e) {
                        y.dispatchEvent(n.Z.adblocked)
                    }
                    var k
                }
                )).catch((function() {
                    y.dispatchEvent(n.Z.adblocked)
                }
                ))
            }
            ,
            e.prototype.requestAd = function(e) {
                void 0 === e && (e = {});
                var t = e.autoStart
                  , i = void 0 === t || t
                  , r = e.onFinish
                  , o = void 0 === r ? null : r
                  , a = e.onStart
                  , s = void 0 === a ? null : a
                  , d = e.position
                  , c = void 0 === d ? null : d
                  , l = se();
                if (y.clearAnnotations(),
                y.setDataAnnotations({
                    opportunityId: l,
                    position: c
                }),
                c === n.Z.ads.position.rewarded ? L.track(n.Z.tracking.screen.rewardedBreak, {
                    opportunityId: l
                }) : L.track(n.Z.tracking.screen.commercialBreak, {
                    opportunityId: l
                }),
                this.autoStartOnReady = !1 !== i,
                o && this.registerHandler("onFinish", o),
                s && this.registerHandler("onStart", s),
                this.displayOnly)
                    y.dispatchEvent(n.Z.ads.error, {
                        message: "Video disabled"
                    });
                else if (this.ima && !this.sdkImaError) {
                    if (!this.sdkBooted)
                        return y.dispatchEvent(n.Z.ads.error, {
                            message: "Requesting ad on unbooted SDK"
                        }),
                        void this.sdkNotBootedButCalled();
                    if (!(0,
                    x.Z)() && !(0,
                    E.Z)() || c === n.Z.ads.position.rewarded)
                        if (null !== c && (0,
                        ae.Z)(c, n.Z.ads.position))
                            if (re())
                                y.dispatchEvent(n.Z.ads.error, {
                                    message: "No TCFv2 CMP detected, please contact developersupport@poki.com for more information"
                                });
                            else if (oe())
                                y.dispatchEvent(n.Z.ads.error, {
                                    message: "No USP detected, please contact developersupport@poki.com for more information"
                                });
                            else if (this.ima.isAdRunning() || this.waterfall.isRunning())
                                y.dispatchEvent(n.Z.ads.busy);
                            else if (this.adReady)
                                y.dispatchEvent(n.Z.ads.ready);
                            else if (c !== n.Z.ads.position.preroll || this.adTimings.prerollPossible())
                                if (c === n.Z.ads.position.rewarded || this.adTimings.requestPossible())
                                    if (c !== n.Z.ads.position.rewarded && this.adSettings.countryExclusion.includes(h.Z.country))
                                        y.dispatchEvent(n.Z.ads.limit, {
                                            reason: n.Z.info.messages.disabled
                                        });
                                    else {
                                        var A = It(It(It({}, this.genericCriteria()), this.criteria), {
                                            position: c,
                                            ab: Math.round(Math.random()).toString()
                                        });
                                        this.playerSkin.show(),
                                        this.resize(),
                                        this.waterfall.start(A, c)
                                    }
                                else
                                    y.dispatchEvent(n.Z.ads.limit, {
                                        reason: n.Z.info.messages.timeLimit
                                    });
                            else
                                y.dispatchEvent(n.Z.ads.limit, {
                                    reason: n.Z.info.messages.prerollLimit
                                });
                        else
                            console.error("POKI-SDK: Invalid position");
                    else
                        y.dispatchEvent(n.Z.ads.error, {
                            reason: "Interstitials are disabled on mobile"
                        })
                } else
                    y.dispatchEvent(n.Z.ads.error, {
                        message: "Bot, IMA or Adblocker error"
                    })
            }
            ,
            e.prototype.displayAd = function(e) {
                var t = e.container
                  , i = e.size
                  , r = n.Z.ads.position.display;
                if (re())
                    y.dispatchEvent(n.Z.ads.error, {
                        message: "No TCFv2 CMP detected, please contact developersupport@poki.com for more information",
                        position: r
                    });
                else if (oe())
                    y.dispatchEvent(n.Z.ads.error, {
                        message: "No USP detected, please contact developersupport@poki.com for more information",
                        position: r
                    });
                else if (i) {
                    if (!this.sdkBooted)
                        return y.dispatchEvent(n.Z.ads.error, {
                            message: "Requesting ad on unbooted SDK",
                            position: r
                        }),
                        void this.sdkNotBootedButCalled();
                    if (t)
                        if (void 0 !== window.googletag)
                            if (this.adSettings.countryExclusion.includes(h.Z.country))
                                y.dispatchEvent(n.Z.ads.limit, {
                                    reason: n.Z.info.messages.disabled,
                                    position: r
                                });
                            else {
                                if (!this.display.validateDisplaySettings(i))
                                    return y.dispatchEvent(n.Z.ads.error, {
                                        reason: "Display size " + i + " is not supported on this device",
                                        position: r
                                    });
                                e.criteria = It(It(It({}, this.genericCriteria()), this.criteria), e.criteria || {}),
                                this.display.renderAd(e)
                            }
                        else
                            y.dispatchEvent(n.Z.ads.error, {
                                message: "Adblocker has been detected",
                                position: r
                            });
                    else
                        y.dispatchEvent(n.Z.ads.error, {
                            message: "Provided container does not exist",
                            position: r
                        })
                } else
                    y.dispatchEvent(n.Z.ads.error, {
                        message: "No ad size given, usage: displayAd(<container>, <size>)",
                        position: r
                    })
            }
            ,
            e.prototype.destroyAd = function(e) {
                if (!this.sdkBooted)
                    return y.dispatchEvent(n.Z.ads.displayError, {
                        message: "Attempting destroyAd on unbooted SDK"
                    }),
                    void this.sdkNotBootedButCalled();
                void 0 !== window.googletag ? this.adSettings.countryExclusion.includes(h.Z.country) || (e = e || document.body,
                this.display.clearAd(e)) : y.dispatchEvent(n.Z.ads.displayError, {
                    message: "Adblocker has been detected"
                })
            }
            ,
            e.prototype.startStartAdsAfterTimer = function() {
                this.sdkBooted && !this.sdkImaError ? this.adTimings.startStartAdsAfterTimer() : this.startStartAdsAfterTimerOnInit = !0
            }
            ,
            e.prototype.muteAd = function() {
                if (!this.sdkBooted)
                    return this.sdkNotBootedButCalled();
                this.sdkImaError || this.displayOnly || this.ima.muteAd()
            }
            ,
            e.prototype.isAdBlocked = function() {
                return this.sdkImaError
            }
            ,
            e.prototype.setVolume = function(e) {
                if (!this.sdkBooted)
                    return this.sdkNotBootedButCalled();
                this.sdkImaError || this.displayOnly || this.ima.setVolume(e)
            }
            ,
            e.prototype.forcePreroll = function() {
                var e = this.adTimings.prerollPossible;
                this.adTimings.prerollPossible = function() {
                    return !0
                }
                ,
                this.requestAd({
                    position: n.Z.ads.position.preroll
                }),
                this.adTimings.prerollPossible = e
            }
            ,
            e.prototype.resumeAd = function() {
                if (!this.sdkBooted)
                    return this.sdkNotBootedButCalled();
                this.sdkImaError || this.displayOnly || (this.playerSkin.hidePauseButton(),
                this.ima.resumeAd())
            }
            ,
            e.prototype.startAdClicked = function() {
                if (!this.sdkBooted)
                    return this.sdkNotBootedButCalled();
                this.sdkImaError || this.displayOnly || "undefined" != typeof navigator && /(iPad|iPhone|iPod)/gi.test(navigator.userAgent) && this.startAdEnabled && (this.startAdEnabled = !1,
                this.playerSkin.hideStartAdButton(),
                this.ima.startIOSPlayback())
            }
            ,
            e.prototype.enableSettings = function(e) {
                this.criteria = It({}, e.customCriteria),
                this.adTimings = new le(e.adTiming)
            }
            ,
            e.prototype.resize = function() {
                var e = this;
                if (!this.sdkBooted)
                    return this.sdkNotBootedButCalled();
                if (!this.sdkImaError && !this.displayOnly) {
                    var t = this.playerSkin.getVideoBounds();
                    0 !== t.width && 0 !== t.height ? this.ima.resize(t.width, t.height) : setTimeout((function() {
                        e.resize()
                    }
                    ), 100)
                }
            }
            ,
            e.prototype.startAd = function() {
                if (!this.sdkBooted)
                    return this.sdkNotBootedButCalled();
                this.sdkImaError || this.displayOnly || (this.adReady ? (this.resize(),
                this.ima.startPlayback()) : y.dispatchEvent(n.Z.ads.error, {
                    message: "No ads ready to start"
                }))
            }
            ,
            e.prototype.stopAd = function() {
                if (!this.sdkBooted)
                    return this.sdkNotBootedButCalled();
                this.sdkImaError || this.displayOnly || (this.waterfall.stopWaterfall(),
                this.ima.stopPlayback(),
                this.playerSkin.hide())
            }
            ,
            e.prototype.registerHandler = function(e, t) {
                this.handlers[e] = t
            }
            ,
            e.prototype.callHandler = function(e) {
                for (var t = [], n = 1; n < arguments.length; n++)
                    t[n - 1] = arguments[n];
                "function" == typeof this.handlers[e] && this.handlers[e](t)
            }
            ,
            e.prototype.setupDefaultEvents = function() {
                var e = this;
                y.addEventListener(n.Z.ready, (function() {
                    e.sdkBooted = !0,
                    e.callHandler("onReady")
                }
                )),
                y.addEventListener(n.Z.adblocked, (function() {
                    e.sdkBooted = !0,
                    e.sdkImaError = !0,
                    e.callHandler("onAdblocked")
                }
                )),
                y.addEventListener(n.Z.ads.ready, (function() {
                    e.adReady = !0,
                    e.autoStartOnReady && e.startAd()
                }
                )),
                y.addEventListener(n.Z.ads.started, (function() {
                    e.playerSkin.hideSpinner(),
                    e.callHandler("onStart", {
                        type: n.Z.ads.limit
                    })
                }
                )),
                y.addEventListener(n.Z.ads.video.paused, (function() {
                    e.playerSkin.showPauseButton()
                }
                )),
                y.addEventListener(n.Z.ads.limit, (function() {
                    e.callHandler("onFinish", {
                        type: n.Z.ads.limit,
                        rewardAllowed: !1
                    })
                }
                )),
                y.addEventListener(n.Z.ads.stopped, (function() {
                    e.callHandler("onFinish", {
                        type: n.Z.ads.stopped,
                        rewardAllowed: !1
                    })
                }
                )),
                y.addEventListener(n.Z.ads.error, (function(t) {
                    e.callHandler("onFinish", {
                        type: n.Z.ads.error,
                        rewardAllowed: !!t.rewardAllowed
                    })
                }
                )),
                y.addEventListener(n.Z.ads.busy, (function() {
                    e.callHandler("onFinish", {
                        type: n.Z.ads.busy,
                        rewardAllowed: !1
                    })
                }
                )),
                y.addEventListener(n.Z.ads.completed, (function(t) {
                    e.callHandler("onFinish", {
                        type: n.Z.ads.completed,
                        rewardAllowed: !!t.rewardAllowed
                    })
                }
                )),
                [n.Z.ads.limit, n.Z.ads.stopped, n.Z.ads.error, n.Z.ads.completed].forEach((function(t) {
                    y.addEventListener(t, (function() {
                        e.playerSkin && e.playerSkin.hide(),
                        e.adReady = !1
                    }
                    ))
                }
                ))
            }
            ,
            e
        }();
        const Ct = Zt;
        function _t(e) {
            switch (Object.prototype.toString.call(e)) {
            case "[object Error]":
            case "[object Exception]":
            case "[object DOMException]":
                return !0;
            default:
                return e instanceof Error
            }
        }
        var Tt = "poki_erruid"
          , Pt = Date.now()
          , Bt = N(Tt);
        function Dt() {
            return Bt || (Bt = Math.random().toString(36).substr(2, 9),
            G(Tt, Bt)),
            Bt
        }
        function zt(e) {
            if (h.Z.gameID) {
                if (!(Date.now() < Pt))
                    try {
                        var t = JSON.stringify({
                            gid: h.Z.gameID,
                            vid: h.Z.versionID,
                            ve: 7,
                            n: e.name,
                            m: e.message,
                            s: JSON.stringify(e.stack),
                            ui: Dt()
                        })
                          , n = "https://t.poki.io/ge";
                        if (navigator.sendBeacon)
                            navigator.sendBeacon(n, t);
                        else {
                            var i = new XMLHttpRequest;
                            i.open("POST", n, !0),
                            i.send(t)
                        }
                        Pt = Date.now() + 100
                    } catch (e) {
                        console.error(e)
                    }
            } else
                console.log(e)
        }
        "undefined" != typeof window && (t().remoteFetching = !1,
        t().report.subscribe((function(e) {
            if ("Script error." === e.message && window.pokiLastCatch) {
                var n = window.pokiLastCatch;
                window.pokiLastCatch = null;
                try {
                    t().report(n)
                } catch (e) {}
            } else
                zt(e)
        }
        )),
        window.addEventListener("unhandledrejection", (function(e) {
            if (_t(e.reason))
                try {
                    t().report(e.reason)
                } catch (e) {}
            else
                zt({
                    name: "unhandledrejection",
                    message: JSON.stringify(e.reason)
                })
        }
        )));
        var jt = function() {
            return jt = Object.assign || function(e) {
                for (var t, n = 1, i = arguments.length; n < i; n++)
                    for (var r in t = arguments[n])
                        Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e
            }
            ,
            jt.apply(this, arguments)
        }
          , Ot = function(e, t, n, i) {
            return new (n || (n = Promise))((function(r, o) {
                function a(e) {
                    try {
                        d(i.next(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function s(e) {
                    try {
                        d(i.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }
                function d(e) {
                    var t;
                    e.done ? r(e.value) : (t = e.value,
                    t instanceof n ? t : new n((function(e) {
                        e(t)
                    }
                    ))).then(a, s)
                }
                d((i = i.apply(e, t || [])).next())
            }
            ))
        }
          , Mt = function(e, t) {
            var n, i, r, o, a = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: s(0),
                throw: s(1),
                return: s(2)
            },
            "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }
            ),
            o;
            function s(o) {
                return function(s) {
                    return function(o) {
                        if (n)
                            throw new TypeError("Generator is already executing.");
                        for (; a; )
                            try {
                                if (n = 1,
                                i && (r = 2 & o[0] ? i.return : o[0] ? i.throw || ((r = i.return) && r.call(i),
                                0) : i.next) && !(r = r.call(i, o[1])).done)
                                    return r;
                                switch (i = 0,
                                r && (o = [2 & o[0], r.value]),
                                o[0]) {
                                case 0:
                                case 1:
                                    r = o;
                                    break;
                                case 4:
                                    return a.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++,
                                    i = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(),
                                    a.trys.pop();
                                    continue;
                                default:
                                    if (!(r = a.trys,
                                    (r = r.length > 0 && r[r.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < r[1]) {
                                        a.label = r[1],
                                        r = o;
                                        break
                                    }
                                    if (r && a.label < r[2]) {
                                        a.label = r[2],
                                        a.ops.push(o);
                                        break
                                    }
                                    r[2] && a.ops.pop(),
                                    a.trys.pop();
                                    continue
                                }
                                o = t.call(e, a)
                            } catch (e) {
                                o = [6, e],
                                i = 0
                            } finally {
                                n = r = 0
                            }
                        if (5 & o[0])
                            throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, s])
                }
            }
        }
          , Lt = function() {
            function t() {
                var t = this;
                this.gameStarted = !1,
                this.duringGameplay = !1,
                this.asyncScreenshotLoader = function() {
                    window.addEventListener("message", (function(e) {
                        return Ot(t, void 0, void 0, (function() {
                            return Mt(this, (function(t) {
                                switch (t.label) {
                                case 0:
                                    return "pokiGenerateScreenshot" !== e.data.type ? [3, 2] : [4, a.e(206).then(a.bind(a, 206))];
                                case 1:
                                    (0,
                                    t.sent().takeScreenshotWithFrameData)(e.data),
                                    t.label = 2;
                                case 2:
                                    return [2]
                                }
                            }
                            ))
                        }
                        ))
                    }
                    ), !1)
                }
                ,
                this.initWithVideoHB = function() {
                    return t.init()
                }
                ,
                this.setDebug = function(e) {
                    void 0 === e && (e = !0);
                    var t = window.location.hostname;
                    t.endsWith("poki-gdn.com") || "qa-files.poki.com" === t ? e && L.track(n.Z.tracking.debugTrueInProduction) : (m.debug = e,
                    m.log = null != e ? e : m.log)
                }
                ,
                this.setLogging = function(e) {
                    m.log = e
                }
                ,
                this.gameLoadingFinished = function() {
                    var e, t, i, r, o;
                    try {
                        i = performance.getEntriesByType("resource").map((function(e) {
                            return e.transferSize
                        }
                        )).reduce((function(e, t) {
                            return e + t
                        }
                        )),
                        i += performance.getEntriesByType("navigation")[0].transferSize
                    } catch (e) {}
                    L.track(n.Z.tracking.screen.gameLoadingFinished, {
                        transferSize: i,
                        trackers: (r = window,
                        o = [],
                        "function" != typeof r.ga && "function" != typeof r.gtag || o.push("ga"),
                        r.mixpanel && "function" == typeof r.mixpanel.track && o.push("mixpanel"),
                        "function" == typeof r.GameAnalytics && o.push("gameanalytics"),
                        (r.kongregateAPI || r.kongregate) && o.push("kongregate"),
                        r.FlurryAgent && o.push("flurry"),
                        r.Countly && o.push("countly"),
                        r.amplitude && o.push("amplitude"),
                        o).join(","),
                        error_user_id: Dt(),
                        now: Math.round(null === (t = null === (e = window.performance) || void 0 === e ? void 0 : e.now) || void 0 === t ? void 0 : t.call(e)) || void 0
                    })
                }
                ,
                this.gameplayStart = function(e) {
                    t.duringGameplay = !0,
                    t.gameStarted || (t.gameStarted = !0,
                    L.track(n.Z.tracking.screen.firstRound),
                    t.monetization.startStartAdsAfterTimer()),
                    L.track(n.Z.tracking.screen.gameplayStart, jt({}, e)),
                    clearTimeout(t.playerActiveTimeout),
                    t.playerActiveTimeout = setTimeout((function() {
                        window.addEventListener("pointermove", t.playerIsActiveEvent),
                        document.addEventListener("keydown", t.playerIsActiveEvent)
                    }
                    ), 6e5)
                }
                ,
                this.gameplayStop = function(e) {
                    t.duringGameplay = !1,
                    L.track(n.Z.tracking.screen.gameplayStop, jt({}, e)),
                    clearTimeout(t.playerActiveTimeout),
                    window.removeEventListener("pointermove", t.playerIsActiveEvent),
                    document.removeEventListener("keydown", t.playerIsActiveEvent)
                }
                ,
                this.roundStart = function(e) {
                    void 0 === e && (e = ""),
                    e = String(e),
                    L.track(n.Z.tracking.screen.roundStart, {
                        identifier: e
                    })
                }
                ,
                this.roundEnd = function(e) {
                    void 0 === e && (e = ""),
                    e = String(e),
                    L.track(n.Z.tracking.screen.roundEnd, {
                        identifier: e
                    })
                }
                ,
                this.customEvent = function(e, i, r) {
                    void 0 === r && (r = {}),
                    e && i ? (e = String(e),
                    i = String(i),
                    r = jt({}, r),
                    L.track(n.Z.tracking.custom, {
                        eventNoun: e,
                        eventVerb: i,
                        eventData: r
                    })) : t.error("customEvent", "customEvent needs at least a noun and a verb")
                }
                ,
                this.commercialBreak = function(e) {
                    return new Promise((function(i) {
                        var r = t.gameStarted ? n.Z.ads.position.midroll : n.Z.ads.position.preroll;
                        t.monetization.requestAd({
                            position: r,
                            onFinish: i,
                            onStart: e
                        })
                    }
                    ))
                }
                ,
                this.rewardedBreak = function(e) {
                    return new Promise((function(i) {
                        return i(!1);
                        var r = n.Z.ads.position.rewarded;
                        t.monetization.requestAd({
                            position: r,
                            onFinish: function(e) {
                                e.length > 0 ? i(!!e[0].rewardAllowed) : i(!1)
                            },
                            onStart: e
                        })
                    }
                    ))
                }
                ,
                this.displayAd = function(e, i, r, o) {
                    y.clearAnnotations();
                    var a = se();
                    L.track(n.Z.tracking.screen.displayAd, {
                        size: i,
                        opportunityId: a,
                        duringGameplay: t.duringGameplay
                    });
                    var s = {
                        container: e,
                        opportunityId: a,
                        size: i,
                        duringGameplay: function() {
                            return t.duringGameplay
                        },
                        onCanDestroy: r,
                        onDisplayRendered: o
                    };
                    t.monetization.displayAd(s)
                }
                ,
                this.isAdBlocked = function() {
                    return t.monetization.isAdBlocked()
                }
                ,
                this.muteAd = function() {
                    t.monetization.muteAd()
                }
                ,
                this.logError = function(e) {
                    t.captureError(e)
                }
                ,
                this.setPlaytestCanvas = function(e) {
                    !function(e) {
                        _ = e
                    }(e)
                }
                ,
                this.getIsoLanguage = function() {
                    return (0,
                    Ae.Z)("iso_lang")
                }
                ,
                this.shareableURL = function(e) {
                    return void 0 === e && (e = {}),
                    new Promise((function(t, i) {
                        var r = new URLSearchParams
                          , o = Object.keys(e);
                        if (h.Z.isPokiIframe) {
                            var a = (0,
                            Ae.Z)("poki_url");
                            o.forEach((function(t) {
                                r.set("gd" + t, e[t])
                            }
                            )),
                            t(a + "?" + r.toString()),
                            p.Z.sendMessage(n.Z.message.setPokiURLParams, {
                                params: e
                            })
                        } else
                            window.self === window.top ? (o.forEach((function(t) {
                                r.set("" + t, e[t])
                            }
                            )),
                            t("" + window.location.origin + window.location.pathname + "?" + r.toString())) : i(new Error("shareableURL only works on Poki or a top level frame"))
                    }
                    ))
                }
                ,
                this.getURLParam = function(e) {
                    return (0,
                    Ae.Z)("gd" + e) || (0,
                    Ae.Z)(e)
                }
                ,
                this.captureError = function(t) {
                    try {
                        _t(t) ? e.report(t) : e.report(new Error(t))
                    } catch (e) {}
                }
                ,
                this.getLanguage = function() {
                    return navigator.language.toLowerCase().split("-")[0]
                }
                ,
                this.generateScreenshot = function(e) {
                    return Ot(t, void 0, void 0, (function() {
                        return Mt(this, (function(t) {
                            switch (t.label) {
                            case 0:
                                return [4, a.e(206).then(a.bind(a, 206))];
                            case 1:
                                return [2, (0,
                                t.sent().takeScreenshot)(e)]
                            }
                        }
                        ))
                    }
                    ))
                }
                ,
                this.enableEventTracking = function(e) {
                    window.top === window && L.setupObserverWithCMP(e || 0)
                }
                ,
                this.error = function(e, t) {
                    console.error("PokiSDK." + e + ": " + t)
                }
                ,
                this.playerIsActiveEvent = function() {
                    window.removeEventListener("pointermove", t.playerIsActiveEvent),
                    document.removeEventListener("keydown", t.playerIsActiveEvent),
                    L.track(n.Z.tracking.screen.playerActive),
                    t.playerActiveTimeout = setTimeout((function() {
                        window.addEventListener("pointermove", t.playerIsActiveEvent),
                        document.addEventListener("keydown", t.playerIsActiveEvent)
                    }
                    ), 6e5)
                }
                ,
                this.setDebugTouchOverlayController = function() {}
                ,
                this.gameInteractive = function() {}
                ,
                this.gameLoadingProgress = function() {}
                ,
                this.gameLoadingStart = function() {}
                ,
                this.getLeaderboard = function() {
                    return Promise.resolve([])
                }
                ,
                this.happyTime = function() {}
                ,
                this.sendHighscore = function() {}
                ,
                this.setPlayerAge = function() {}
                ,
                this.__pokiInternal__playgroundPlatformAd = function(e, i, r, o) {
                    y.clearAnnotations();
                    var a = se();
                    L.track(n.Z.tracking.screen.displayAd, {
                        size: r,
                        opportunityId: a,
                        platformAd: !0
                    });
                    var s = {
                        container: e,
                        opportunityId: a,
                        size: r,
                        adUnitPath: i,
                        criteria: o,
                        backfillHouseads: !0,
                        platformAd: !0,
                        duringGameplay: function() {
                            return !1
                        }
                    };
                    t.monetization.displayAd(s)
                }
                ,
                this.__pokiInternal__setRuntimeInformation = function(e) {
                    void 0 === e && (e = {}),
                    Object.keys(e).forEach((function(t) {
                        (0,
                        h.w)(t, e[t])
                    }
                    ))
                }
                ,
                this.monetization = new Ct,
                this.SDK = this.monetization
            }
            return t.prototype.init = function(e) {
                var t = this;
                return void 0 === e && (e = {}),
                e.startupParams && this.__pokiInternal__setRuntimeInformation(e.startupParams),
                new Promise((function(i, r) {
                    t.monetization.init(jt({
                        onReady: function() {
                            (0,
                            Ae.Z)("preroll") && t.monetization.forcePreroll(),
                            i()
                        },
                        onAdblocked: r
                    }, e)),
                    t.asyncScreenshotLoader(),
                    p.Z.sendMessage(n.Z.message.sdkDetails, {
                        version: "2.313.0"
                    })
                }
                ))
            }
            ,
            t.prototype.destroyAd = function(e) {
                this.monetization.destroyAd(e)
            }
            ,
            t.prototype.setVolume = function(e) {
                this.monetization.setVolume(e)
            }
            ,
            t
        }();
        var Rt = new Lt;
        for (var Nt in Rt)
            window.PokiSDK[Nt] = Rt[Nt]
    }
    )()
}
)();
