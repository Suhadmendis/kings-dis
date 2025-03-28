/* 1.0.0-1409 - Tue Jun 20 13:38:59 BST 2017 */
var SagePayConfig = {
    'restHost': 'https://pi-test.sagepay.com',
    'restBaseURL': 'https://pi-test.sagepay.com/api/v1',
    'hostedPagesSubPath': '/hosted/docs',
    'pages': {
        'standardCardDetails': 'card-details-form.html',
        'reusableCardIdentifier': 'reusable-card-identifier-form.html'
    }
};
! function(e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    var n = [],
        r = e.document,
        i = n.slice,
        o = n.concat,
        a = n.push,
        s = n.indexOf,
        u = {},
        l = u.toString,
        c = u.hasOwnProperty,
        d = {},
        f = "2.2.4",
        p = function(e, t) {
            return new p.fn.init(e, t)
        },
        h = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        v = /^-ms-/,
        m = /-([\da-z])/gi,
        g = function(e, t) {
            return t.toUpperCase()
        };
    p.fn = p.prototype = {
        jquery: f,
        constructor: p,
        selector: "",
        length: 0,
        toArray: function() {
            return i.call(this)
        },
        get: function(e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : i.call(this)
        },
        pushStack: function(e) {
            var t = p.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function(e) {
            return p.each(this, e)
        },
        map: function(e) {
            return this.pushStack(p.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(i.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: a,
        sort: n.sort,
        splice: n.splice
    }, p.extend = p.fn.extend = function() {
        var e, t, n, r, i, o, a = arguments[0] || {},
            s = 1,
            u = arguments.length,
            l = !1;
        for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || p.isFunction(a) || (a = {}), s === u && (a = this, s--); u > s; s++)
            if (null != (e = arguments[s]))
                for (t in e) n = a[t], r = e[t], a !== r && (l && r && (p.isPlainObject(r) || (i = p.isArray(r))) ? (i ? (i = !1, o = n && p.isArray(n) ? n : []) : o = n && p.isPlainObject(n) ? n : {}, a[t] = p.extend(l, o, r)) : void 0 !== r && (a[t] = r));
        return a
    }, p.extend({
        expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === p.type(e)
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return null != e && e === e.window
        },
        isNumeric: function(e) {
            var t = e && e.toString();
            return !p.isArray(e) && t - parseFloat(t) + 1 >= 0
        },
        isPlainObject: function(e) {
            var t;
            if ("object" !== p.type(e) || e.nodeType || p.isWindow(e)) return !1;
            if (e.constructor && !c.call(e, "constructor") && !c.call(e.constructor.prototype || {}, "isPrototypeOf")) return !1;
            for (t in e);
            return void 0 === t || c.call(e, t)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? u[l.call(e)] || "object" : typeof e
        },
        globalEval: function(e) {
            var t, n = eval;
            e = p.trim(e), e && (1 === e.indexOf("use strict") ? (t = r.createElement("script"), t.text = e, r.head.appendChild(t).parentNode.removeChild(t)) : n(e))
        },
        camelCase: function(e) {
            return e.replace(v, "ms-").replace(m, g)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t) {
            var n, r = 0;
            if (y(e)) {
                for (n = e.length; n > r; r++)
                    if (t.call(e[r], r, e[r]) === !1) break
            } else
                for (r in e)
                    if (t.call(e[r], r, e[r]) === !1) break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(h, "")
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (y(Object(e)) ? p.merge(n, "string" == typeof e ? [e] : e) : a.call(n, e)), n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : s.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; n > r; r++) e[i++] = t[r];
            return e.length = i, e
        },
        grep: function(e, t, n) {
            for (var r, i = [], o = 0, a = e.length, s = !n; a > o; o++) r = !t(e[o], o), r !== s && i.push(e[o]);
            return i
        },
        map: function(e, t, n) {
            var r, i, a = 0,
                s = [];
            if (y(e))
                for (r = e.length; r > a; a++) i = t(e[a], a, n), null != i && s.push(i);
            else
                for (a in e) i = t(e[a], a, n), null != i && s.push(i);
            return o.apply([], s)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, r, o;
            return "string" == typeof t && (n = e[t], t = e, e = n), p.isFunction(e) ? (r = i.call(arguments, 2), o = function() {
                return e.apply(t || this, r.concat(i.call(arguments)))
            }, o.guid = e.guid = e.guid || p.guid++, o) : void 0
        },
        now: Date.now,
        support: d
    }), "function" == typeof Symbol && (p.fn[Symbol.iterator] = n[Symbol.iterator]), p.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        u["[object " + t + "]"] = t.toLowerCase()
    });

    function y(e) {
        var t = !!e && "length" in e && e.length,
            n = p.type(e);
        return "function" === n || p.isWindow(e) ? !1 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }
    var b = function(e) {
        var t, n, r, i, o, a, s, u, l, c, d, f, p, h, v, m, g, y, b, x = "sizzle" + 1 * new Date,
            w = e.document,
            C = 0,
            T = 0,
            E = ae(),
            k = ae(),
            S = ae(),
            j = function(e, t) {
                return e === t && (d = !0), 0
            },
            N = 1 << 31,
            D = {}.hasOwnProperty,
            A = [],
            M = A.pop,
            P = A.push,
            L = A.push,
            q = A.slice,
            H = function(e, t) {
                for (var n = 0, r = e.length; r > n; n++)
                    if (e[n] === t) return n;
                return -1
            },
            O = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            F = "[\\x20\\t\\r\\n\\f]",
            I = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            R = "\\[" + F + "*(" + I + ")(?:" + F + "*([*^$|!~]?=)" + F + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + F + "*\\]",
            _ = ":(" + I + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + R + ")*)|.*)\\)|)",
            W = new RegExp(F + "+", "g"),
            B = new RegExp("^" + F + "+|((?:^|[^\\\\])(?:\\\\.)*)" + F + "+$", "g"),
            V = new RegExp("^" + F + "*," + F + "*"),
            $ = new RegExp("^" + F + "*([>+~]|" + F + ")" + F + "*"),
            K = new RegExp("=" + F + "*([^\\]'\"]*?)" + F + "*\\]", "g"),
            z = new RegExp(_),
            U = new RegExp("^" + I + "$"),
            X = {
                ID: new RegExp("^#(" + I + ")"),
                CLASS: new RegExp("^\\.(" + I + ")"),
                TAG: new RegExp("^(" + I + "|[*])"),
                ATTR: new RegExp("^" + R),
                PSEUDO: new RegExp("^" + _),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + F + "*(even|odd|(([+-]|)(\\d*)n|)" + F + "*(?:([+-]|)" + F + "*(\\d+)|))" + F + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + O + ")$", "i"),
                needsContext: new RegExp("^" + F + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + F + "*((?:-\\d)?\\d*)" + F + "*\\)|)(?=[^-]|$)", "i")
            },
            Y = /^(?:input|select|textarea|button)$/i,
            G = /^h\d$/i,
            J = /^[^{]+\{\s*\[native \w/,
            Q = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            Z = /[+~]/,
            ee = /'|\\/g,
            te = new RegExp("\\\\([\\da-f]{1,6}" + F + "?|(" + F + ")|.)", "ig"),
            ne = function(e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            },
            re = function() {
                f()
            };
        try {
            L.apply(A = q.call(w.childNodes), w.childNodes), A[w.childNodes.length].nodeType
        } catch (ie) {
            L = {
                apply: A.length ? function(e, t) {
                    P.apply(e, q.call(t))
                } : function(e, t) {
                    var n = e.length,
                        r = 0;
                    while (e[n++] = t[r++]);
                    e.length = n - 1
                }
            }
        }

        function oe(e, t, r, i) {
            var o, s, l, c, d, h, g, y, C = t && t.ownerDocument,
                T = t ? t.nodeType : 9;
            if (r = r || [], "string" != typeof e || !e || 1 !== T && 9 !== T && 11 !== T) return r;
            if (!i && ((t ? t.ownerDocument || t : w) !== p && f(t), t = t || p, v)) {
                if (11 !== T && (h = Q.exec(e)))
                    if (o = h[1]) {
                        if (9 === T) {
                            if (!(l = t.getElementById(o))) return r;
                            if (l.id === o) return r.push(l), r
                        } else if (C && (l = C.getElementById(o)) && b(t, l) && l.id === o) return r.push(l), r
                    } else {
                        if (h[2]) return L.apply(r, t.getElementsByTagName(e)), r;
                        if ((o = h[3]) && n.getElementsByClassName && t.getElementsByClassName) return L.apply(r, t.getElementsByClassName(o)), r
                    }
                if (n.qsa && !S[e + " "] && (!m || !m.test(e))) {
                    if (1 !== T) C = t, y = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        (c = t.getAttribute("id")) ? c = c.replace(ee, "\\$&"): t.setAttribute("id", c = x), g = a(e), s = g.length, d = U.test(c) ? "#" + c : "[id='" + c + "']";
                        while (s--) g[s] = d + " " + me(g[s]);
                        y = g.join(","), C = Z.test(e) && he(t.parentNode) || t
                    }
                    if (y) try {
                        return L.apply(r, C.querySelectorAll(y)), r
                    } catch (E) {} finally {
                        c === x && t.removeAttribute("id")
                    }
                }
            }
            return u(e.replace(B, "$1"), t, r, i)
        }

        function ae() {
            var e = [];

            function t(n, i) {
                return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
            }
            return t
        }

        function se(e) {
            return e[x] = !0, e
        }

        function ue(e) {
            var t = p.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function le(e, t) {
            var n = e.split("|"),
                i = n.length;
            while (i--) r.attrHandle[n[i]] = t
        }

        function ce(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || N) - (~e.sourceIndex || N);
            if (r) return r;
            if (n)
                while (n = n.nextSibling)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function de(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function fe(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function pe(e) {
            return se(function(t) {
                return t = +t, se(function(n, r) {
                    var i, o = e([], n.length, t),
                        a = o.length;
                    while (a--) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function he(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }
        n = oe.support = {}, o = oe.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, f = oe.setDocument = function(e) {
            var t, i, a = e ? e.ownerDocument || e : w;
            return a !== p && 9 === a.nodeType && a.documentElement ? (p = a, h = p.documentElement, v = !o(p), (i = p.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", re, !1) : i.attachEvent && i.attachEvent("onunload", re)), n.attributes = ue(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), n.getElementsByTagName = ue(function(e) {
                return e.appendChild(p.createComment("")), !e.getElementsByTagName("*").length
            }), n.getElementsByClassName = J.test(p.getElementsByClassName), n.getById = ue(function(e) {
                return h.appendChild(e).id = x, !p.getElementsByName || !p.getElementsByName(x).length
            }), n.getById ? (r.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && v) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }, r.filter.ID = function(e) {
                var t = e.replace(te, ne);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete r.find.ID, r.filter.ID = function(e) {
                var t = e.replace(te, ne);
                return function(e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), r.find.TAG = n.getElementsByTagName ? function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
            } : function(e, t) {
                var n, r = [],
                    i = 0,
                    o = t.getElementsByTagName(e);
                if ("*" === e) {
                    while (n = o[i++]) 1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            }, r.find.CLASS = n.getElementsByClassName && function(e, t) {
                return "undefined" != typeof t.getElementsByClassName && v ? t.getElementsByClassName(e) : void 0
            }, g = [], m = [], (n.qsa = J.test(p.querySelectorAll)) && (ue(function(e) {
                h.appendChild(e).innerHTML = "<a id='" + x + "'></a><select id='" + x + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + F + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[" + F + "*(?:value|" + O + ")"), e.querySelectorAll("[id~=" + x + "-]").length || m.push("~="), e.querySelectorAll(":checked").length || m.push(":checked"), e.querySelectorAll("a#" + x + "+*").length || m.push(".#.+[+~]")
            }), ue(function(e) {
                var t = p.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name" + F + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:")
            })), (n.matchesSelector = J.test(y = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && ue(function(e) {
                n.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), g.push("!=", _)
            }), m = m.length && new RegExp(m.join("|")), g = g.length && new RegExp(g.join("|")), t = J.test(h.compareDocumentPosition), b = t || J.test(h.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function(e, t) {
                if (t)
                    while (t = t.parentNode)
                        if (t === e) return !0;
                return !1
            }, j = t ? function(e, t) {
                if (e === t) return d = !0, 0;
                var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & r || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === p || e.ownerDocument === w && b(w, e) ? -1 : t === p || t.ownerDocument === w && b(w, t) ? 1 : c ? H(c, e) - H(c, t) : 0 : 4 & r ? -1 : 1)
            } : function(e, t) {
                if (e === t) return d = !0, 0;
                var n, r = 0,
                    i = e.parentNode,
                    o = t.parentNode,
                    a = [e],
                    s = [t];
                if (!i || !o) return e === p ? -1 : t === p ? 1 : i ? -1 : o ? 1 : c ? H(c, e) - H(c, t) : 0;
                if (i === o) return ce(e, t);
                n = e;
                while (n = n.parentNode) a.unshift(n);
                n = t;
                while (n = n.parentNode) s.unshift(n);
                while (a[r] === s[r]) r++;
                return r ? ce(a[r], s[r]) : a[r] === w ? -1 : s[r] === w ? 1 : 0
            }, p) : p
        }, oe.matches = function(e, t) {
            return oe(e, null, null, t)
        }, oe.matchesSelector = function(e, t) {
            if ((e.ownerDocument || e) !== p && f(e), t = t.replace(K, "='$1']"), n.matchesSelector && v && !S[t + " "] && (!g || !g.test(t)) && (!m || !m.test(t))) try {
                var r = y.call(e, t);
                if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
            } catch (i) {}
            return oe(t, p, null, [e]).length > 0
        }, oe.contains = function(e, t) {
            return (e.ownerDocument || e) !== p && f(e), b(e, t)
        }, oe.attr = function(e, t) {
            (e.ownerDocument || e) !== p && f(e);
            var i = r.attrHandle[t.toLowerCase()],
                o = i && D.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !v) : void 0;
            return void 0 !== o ? o : n.attributes || !v ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null
        }, oe.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, oe.uniqueSort = function(e) {
            var t, r = [],
                i = 0,
                o = 0;
            if (d = !n.detectDuplicates, c = !n.sortStable && e.slice(0), e.sort(j), d) {
                while (t = e[o++]) t === e[o] && (i = r.push(o));
                while (i--) e.splice(r[i], 1)
            }
            return c = null, e
        }, i = oe.getText = function(e) {
            var t, n = "",
                r = 0,
                o = e.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += i(e)
                } else if (3 === o || 4 === o) return e.nodeValue
            } else
                while (t = e[r++]) n += i(t);
            return n
        }, r = oe.selectors = {
            cacheLength: 50,
            createPseudo: se,
            match: X,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || oe.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && oe.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return X.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && z.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(te, ne).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = E[e + " "];
                    return t || (t = new RegExp("(^|" + F + ")" + e + "(" + F + "|$)")) && E(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, t, n) {
                    return function(r) {
                        var i = oe.attr(r, e);
                        return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i.replace(W, " ") + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3),
                        a = "last" !== e.slice(-4),
                        s = "of-type" === t;
                    return 1 === r && 0 === i ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, u) {
                        var l, c, d, f, p, h, v = o !== a ? "nextSibling" : "previousSibling",
                            m = t.parentNode,
                            g = s && t.nodeName.toLowerCase(),
                            y = !u && !s,
                            b = !1;
                        if (m) {
                            if (o) {
                                while (v) {
                                    f = t;
                                    while (f = f[v])
                                        if (s ? f.nodeName.toLowerCase() === g : 1 === f.nodeType) return !1;
                                    h = v = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [a ? m.firstChild : m.lastChild], a && y) {
                                f = m, d = f[x] || (f[x] = {}), c = d[f.uniqueID] || (d[f.uniqueID] = {}), l = c[e] || [], p = l[0] === C && l[1], b = p && l[2], f = p && m.childNodes[p];
                                while (f = ++p && f && f[v] || (b = p = 0) || h.pop())
                                    if (1 === f.nodeType && ++b && f === t) {
                                        c[e] = [C, p, b];
                                        break
                                    }
                            } else if (y && (f = t, d = f[x] || (f[x] = {}), c = d[f.uniqueID] || (d[f.uniqueID] = {}), l = c[e] || [], p = l[0] === C && l[1], b = p), b === !1)
                                while (f = ++p && f && f[v] || (b = p = 0) || h.pop())
                                    if ((s ? f.nodeName.toLowerCase() === g : 1 === f.nodeType) && ++b && (y && (d = f[x] || (f[x] = {}), c = d[f.uniqueID] || (d[f.uniqueID] = {}), c[e] = [C, b]), f === t)) break;
                            return b -= i, b === r || b % r === 0 && b / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, t) {
                    var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || oe.error("unsupported pseudo: " + e);
                    return i[x] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? se(function(e, n) {
                        var r, o = i(e, t),
                            a = o.length;
                        while (a--) r = H(e, o[a]), e[r] = !(n[r] = o[a])
                    }) : function(e) {
                        return i(e, 0, n)
                    }) : i
                }
            },
            pseudos: {
                not: se(function(e) {
                    var t = [],
                        n = [],
                        r = s(e.replace(B, "$1"));
                    return r[x] ? se(function(e, t, n, i) {
                        var o, a = r(e, null, i, []),
                            s = e.length;
                        while (s--)(o = a[s]) && (e[s] = !(t[s] = o))
                    }) : function(e, i, o) {
                        return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop()
                    }
                }),
                has: se(function(e) {
                    return function(t) {
                        return oe(e, t).length > 0
                    }
                }),
                contains: se(function(e) {
                    return e = e.replace(te, ne),
                        function(t) {
                            return (t.textContent || t.innerText || i(t)).indexOf(e) > -1
                        }
                }),
                lang: se(function(e) {
                    return U.test(e || "") || oe.error("unsupported lang: " + e), e = e.replace(te, ne).toLowerCase(),
                        function(t) {
                            var n;
                            do
                                if (n = v ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === h
                },
                focus: function(e) {
                    return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !r.pseudos.empty(e)
                },
                header: function(e) {
                    return G.test(e.nodeName)
                },
                input: function(e) {
                    return Y.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: pe(function() {
                    return [0]
                }),
                last: pe(function(e, t) {
                    return [t - 1]
                }),
                eq: pe(function(e, t, n) {
                    return [0 > n ? n + t : n]
                }),
                even: pe(function(e, t) {
                    for (var n = 0; t > n; n += 2) e.push(n);
                    return e
                }),
                odd: pe(function(e, t) {
                    for (var n = 1; t > n; n += 2) e.push(n);
                    return e
                }),
                lt: pe(function(e, t, n) {
                    for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
                    return e
                }),
                gt: pe(function(e, t, n) {
                    for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r);
                    return e
                })
            }
        }, r.pseudos.nth = r.pseudos.eq;
        for (t in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) r.pseudos[t] = de(t);
        for (t in {
                submit: !0,
                reset: !0
            }) r.pseudos[t] = fe(t);

        function ve() {}
        ve.prototype = r.filters = r.pseudos, r.setFilters = new ve, a = oe.tokenize = function(e, t) {
            var n, i, o, a, s, u, l, c = k[e + " "];
            if (c) return t ? 0 : c.slice(0);
            s = e, u = [], l = r.preFilter;
            while (s) {
                n && !(i = V.exec(s)) || (i && (s = s.slice(i[0].length) || s), u.push(o = [])), n = !1, (i = $.exec(s)) && (n = i.shift(), o.push({
                    value: n,
                    type: i[0].replace(B, " ")
                }), s = s.slice(n.length));
                for (a in r.filter) !(i = X[a].exec(s)) || l[a] && !(i = l[a](i)) || (n = i.shift(), o.push({
                    value: n,
                    type: a,
                    matches: i
                }), s = s.slice(n.length));
                if (!n) break
            }
            return t ? s.length : s ? oe.error(e) : k(e, u).slice(0)
        };

        function me(e) {
            for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
            return r
        }

        function ge(e, t, n) {
            var r = t.dir,
                i = n && "parentNode" === r,
                o = T++;
            return t.first ? function(t, n, o) {
                while (t = t[r])
                    if (1 === t.nodeType || i) return e(t, n, o)
            } : function(t, n, a) {
                var s, u, l, c = [C, o];
                if (a) {
                    while (t = t[r])
                        if ((1 === t.nodeType || i) && e(t, n, a)) return !0
                } else
                    while (t = t[r])
                        if (1 === t.nodeType || i) {
                            if (l = t[x] || (t[x] = {}), u = l[t.uniqueID] || (l[t.uniqueID] = {}), (s = u[r]) && s[0] === C && s[1] === o) return c[2] = s[2];
                            if (u[r] = c, c[2] = e(t, n, a)) return !0
                        }
            }
        }

        function ye(e) {
            return e.length > 1 ? function(t, n, r) {
                var i = e.length;
                while (i--)
                    if (!e[i](t, n, r)) return !1;
                return !0
            } : e[0]
        }

        function be(e, t, n) {
            for (var r = 0, i = t.length; i > r; r++) oe(e, t[r], n);
            return n
        }

        function xe(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = null != t; u > s; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
            return a
        }

        function we(e, t, n, r, i, o) {
            return r && !r[x] && (r = we(r)), i && !i[x] && (i = we(i, o)), se(function(o, a, s, u) {
                var l, c, d, f = [],
                    p = [],
                    h = a.length,
                    v = o || be(t || "*", s.nodeType ? [s] : s, []),
                    m = !e || !o && t ? v : xe(v, f, e, s, u),
                    g = n ? i || (o ? e : h || r) ? [] : a : m;
                if (n && n(m, g, s, u), r) {
                    l = xe(g, p), r(l, [], s, u), c = l.length;
                    while (c--)(d = l[c]) && (g[p[c]] = !(m[p[c]] = d))
                }
                if (o) {
                    if (i || e) {
                        if (i) {
                            l = [], c = g.length;
                            while (c--)(d = g[c]) && l.push(m[c] = d);
                            i(null, g = [], l, u)
                        }
                        c = g.length;
                        while (c--)(d = g[c]) && (l = i ? H(o, d) : f[c]) > -1 && (o[l] = !(a[l] = d))
                    }
                } else g = xe(g === a ? g.splice(h, g.length) : g), i ? i(null, a, g, u) : L.apply(a, g)
            })
        }

        function Ce(e) {
            for (var t, n, i, o = e.length, a = r.relative[e[0].type], s = a || r.relative[" "], u = a ? 1 : 0, c = ge(function(e) {
                    return e === t
                }, s, !0), d = ge(function(e) {
                    return H(t, e) > -1
                }, s, !0), f = [function(e, n, r) {
                    var i = !a && (r || n !== l) || ((t = n).nodeType ? c(e, n, r) : d(e, n, r));
                    return t = null, i
                }]; o > u; u++)
                if (n = r.relative[e[u].type]) f = [ge(ye(f), n)];
                else {
                    if (n = r.filter[e[u].type].apply(null, e[u].matches), n[x]) {
                        for (i = ++u; o > i; i++)
                            if (r.relative[e[i].type]) break;
                        return we(u > 1 && ye(f), u > 1 && me(e.slice(0, u - 1).concat({
                            value: " " === e[u - 2].type ? "*" : ""
                        })).replace(B, "$1"), n, i > u && Ce(e.slice(u, i)), o > i && Ce(e = e.slice(i)), o > i && me(e))
                    }
                    f.push(n)
                }
            return ye(f)
        }

        function Te(e, t) {
            var n = t.length > 0,
                i = e.length > 0,
                o = function(o, a, s, u, c) {
                    var d, h, m, g = 0,
                        y = "0",
                        b = o && [],
                        x = [],
                        w = l,
                        T = o || i && r.find.TAG("*", c),
                        E = C += null == w ? 1 : Math.random() || .1,
                        k = T.length;
                    for (c && (l = a === p || a || c); y !== k && null != (d = T[y]); y++) {
                        if (i && d) {
                            h = 0, a || d.ownerDocument === p || (f(d), s = !v);
                            while (m = e[h++])
                                if (m(d, a || p, s)) {
                                    u.push(d);
                                    break
                                }
                            c && (C = E)
                        }
                        n && ((d = !m && d) && g--, o && b.push(d))
                    }
                    if (g += y, n && y !== g) {
                        h = 0;
                        while (m = t[h++]) m(b, x, a, s);
                        if (o) {
                            if (g > 0)
                                while (y--) b[y] || x[y] || (x[y] = M.call(u));
                            x = xe(x)
                        }
                        L.apply(u, x), c && !o && x.length > 0 && g + t.length > 1 && oe.uniqueSort(u)
                    }
                    return c && (C = E, l = w), b
                };
            return n ? se(o) : o
        }
        return s = oe.compile = function(e, t) {
            var n, r = [],
                i = [],
                o = S[e + " "];
            if (!o) {
                t || (t = a(e)), n = t.length;
                while (n--) o = Ce(t[n]), o[x] ? r.push(o) : i.push(o);
                o = S(e, Te(i, r)), o.selector = e
            }
            return o
        }, u = oe.select = function(e, t, i, o) {
            var u, l, c, d, f, p = "function" == typeof e && e,
                h = !o && a(e = p.selector || e);
            if (i = i || [], 1 === h.length) {
                if (l = h[0] = h[0].slice(0), l.length > 2 && "ID" === (c = l[0]).type && n.getById && 9 === t.nodeType && v && r.relative[l[1].type]) {
                    if (t = (r.find.ID(c.matches[0].replace(te, ne), t) || [])[0], !t) return i;
                    p && (t = t.parentNode), e = e.slice(l.shift().value.length)
                }
                u = X.needsContext.test(e) ? 0 : l.length;
                while (u--) {
                    if (c = l[u], r.relative[d = c.type]) break;
                    if ((f = r.find[d]) && (o = f(c.matches[0].replace(te, ne), Z.test(l[0].type) && he(t.parentNode) || t))) {
                        if (l.splice(u, 1), e = o.length && me(l), !e) return L.apply(i, o), i;
                        break
                    }
                }
            }
            return (p || s(e, h))(o, t, !v, i, !t || Z.test(e) && he(t.parentNode) || t), i
        }, n.sortStable = x.split("").sort(j).join("") === x, n.detectDuplicates = !!d, f(), n.sortDetached = ue(function(e) {
            return 1 & e.compareDocumentPosition(p.createElement("div"))
        }), ue(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || le("type|href|height|width", function(e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), n.attributes && ue(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || le("value", function(e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), ue(function(e) {
            return null == e.getAttribute("disabled")
        }) || le(O, function(e, t, n) {
            var r;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), oe
    }(e);
    p.find = b, p.expr = b.selectors, p.expr[":"] = p.expr.pseudos, p.uniqueSort = p.unique = b.uniqueSort, p.text = b.getText, p.isXMLDoc = b.isXML, p.contains = b.contains;
    var x = function(e, t, n) {
            var r = [],
                i = void 0 !== n;
            while ((e = e[t]) && 9 !== e.nodeType)
                if (1 === e.nodeType) {
                    if (i && p(e).is(n)) break;
                    r.push(e)
                }
            return r
        },
        w = function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        },
        C = p.expr.match.needsContext,
        T = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
        E = /^.[^:#\[\.,]*$/;

    function k(e, t, n) {
        if (p.isFunction(t)) return p.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType) return p.grep(e, function(e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (E.test(t)) return p.filter(t, e, n);
            t = p.filter(t, e)
        }
        return p.grep(e, function(e) {
            return s.call(t, e) > -1 !== n
        })
    }
    p.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? p.find.matchesSelector(r, e) ? [r] : [] : p.find.matches(e, p.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, p.fn.extend({
        find: function(e) {
            var t, n = this.length,
                r = [],
                i = this;
            if ("string" != typeof e) return this.pushStack(p(e).filter(function() {
                for (t = 0; n > t; t++)
                    if (p.contains(i[t], this)) return !0
            }));
            for (t = 0; n > t; t++) p.find(e, i[t], r);
            return r = this.pushStack(n > 1 ? p.unique(r) : r), r.selector = this.selector ? this.selector + " " + e : e, r
        },
        filter: function(e) {
            return this.pushStack(k(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(k(this, e || [], !0))
        },
        is: function(e) {
            return !!k(this, "string" == typeof e && C.test(e) ? p(e) : e || [], !1).length
        }
    });
    var S, j = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        N = p.fn.init = function(e, t, n) {
            var i, o;
            if (!e) return this;
            if (n = n || S, "string" == typeof e) {
                if (i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : j.exec(e), !i || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (i[1]) {
                    if (t = t instanceof p ? t[0] : t, p.merge(this, p.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : r, !0)), T.test(i[1]) && p.isPlainObject(t))
                        for (i in t) p.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                    return this
                }
                return o = r.getElementById(i[2]), o && o.parentNode && (this.length = 1, this[0] = o), this.context = r, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : p.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(p) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), p.makeArray(e, this))
        };
    N.prototype = p.fn, S = p(r);
    var D = /^(?:parents|prev(?:Until|All))/,
        A = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    p.fn.extend({
        has: function(e) {
            var t = p(e, this),
                n = t.length;
            return this.filter(function() {
                for (var e = 0; n > e; e++)
                    if (p.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            for (var n, r = 0, i = this.length, o = [], a = C.test(e) || "string" != typeof e ? p(e, t || this.context) : 0; i > r; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && p.find.matchesSelector(n, e))) {
                        o.push(n);
                        break
                    }
            return this.pushStack(o.length > 1 ? p.uniqueSort(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? s.call(p(e), this[0]) : s.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(p.uniqueSort(p.merge(this.get(), p(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    });

    function M(e, t) {
        while ((e = e[t]) && 1 !== e.nodeType);
        return e
    }
    p.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return x(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return x(e, "parentNode", n)
        },
        next: function(e) {
            return M(e, "nextSibling")
        },
        prev: function(e) {
            return M(e, "previousSibling")
        },
        nextAll: function(e) {
            return x(e, "nextSibling")
        },
        prevAll: function(e) {
            return x(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return x(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return x(e, "previousSibling", n)
        },
        siblings: function(e) {
            return w((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return w(e.firstChild)
        },
        contents: function(e) {
            return e.contentDocument || p.merge([], e.childNodes)
        }
    }, function(e, t) {
        p.fn[e] = function(n, r) {
            var i = p.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = p.filter(r, i)), this.length > 1 && (A[e] || p.uniqueSort(i), D.test(e) && i.reverse()), this.pushStack(i)
        }
    });
    var P = /\S+/g;

    function L(e) {
        var t = {};
        return p.each(e.match(P) || [], function(e, n) {
            t[n] = !0
        }), t
    }
    p.Callbacks = function(e) {
        e = "string" == typeof e ? L(e) : p.extend({}, e);
        var t, n, r, i, o = [],
            a = [],
            s = -1,
            u = function() {
                for (i = e.once, r = t = !0; a.length; s = -1) {
                    n = a.shift();
                    while (++s < o.length) o[s].apply(n[0], n[1]) === !1 && e.stopOnFalse && (s = o.length, n = !1)
                }
                e.memory || (n = !1), t = !1, i && (o = n ? [] : "")
            },
            l = {
                add: function() {
                    return o && (n && !t && (s = o.length - 1, a.push(n)), function r(t) {
                        p.each(t, function(t, n) {
                            p.isFunction(n) ? e.unique && l.has(n) || o.push(n) : n && n.length && "string" !== p.type(n) && r(n)
                        })
                    }(arguments), n && !t && u()), this
                },
                remove: function() {
                    return p.each(arguments, function(e, t) {
                        var n;
                        while ((n = p.inArray(t, o, n)) > -1) o.splice(n, 1), s >= n && s--
                    }), this
                },
                has: function(e) {
                    return e ? p.inArray(e, o) > -1 : o.length > 0
                },
                empty: function() {
                    return o && (o = []), this
                },
                disable: function() {
                    return i = a = [], o = n = "", this
                },
                disabled: function() {
                    return !o
                },
                lock: function() {
                    return i = a = [], n || (o = n = ""), this
                },
                locked: function() {
                    return !!i
                },
                fireWith: function(e, n) {
                    return i || (n = n || [], n = [e, n.slice ? n.slice() : n], a.push(n), t || u()), this
                },
                fire: function() {
                    return l.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!r
                }
            };
        return l
    }, p.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", p.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", p.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", p.Callbacks("memory")]
                ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return p.Deferred(function(n) {
                            p.each(t, function(t, o) {
                                var a = p.isFunction(e[t]) && e[t];
                                i[o[1]](function() {
                                    var e = a && a.apply(this, arguments);
                                    e && p.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? p.extend(e, r) : r
                    }
                },
                i = {};
            return r.pipe = r.then, p.each(t, function(e, o) {
                var a = o[2],
                    s = o[3];
                r[o[1]] = a.add, s && a.add(function() {
                    n = s
                }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function() {
                    return i[o[0] + "With"](this === i ? r : this, arguments), this
                }, i[o[0] + "With"] = a.fireWith
            }), r.promise(i), e && e.call(i, i), i
        },
        when: function(e) {
            var t = 0,
                n = i.call(arguments),
                r = n.length,
                o = 1 !== r || e && p.isFunction(e.promise) ? r : 0,
                a = 1 === o ? e : p.Deferred(),
                s = function(e, t, n) {
                    return function(r) {
                        t[e] = this, n[e] = arguments.length > 1 ? i.call(arguments) : r, n === u ? a.notifyWith(t, n) : --o || a.resolveWith(t, n)
                    }
                },
                u, l, c;
            if (r > 1)
                for (u = new Array(r), l = new Array(r), c = new Array(r); r > t; t++) n[t] && p.isFunction(n[t].promise) ? n[t].promise().progress(s(t, l, u)).done(s(t, c, n)).fail(a.reject) : --o;
            return o || a.resolveWith(c, n), a.promise()
        }
    });
    var q;
    p.fn.ready = function(e) {
        return p.ready.promise().done(e), this
    }, p.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? p.readyWait++ : p.ready(!0)
        },
        ready: function(e) {
            (e === !0 ? --p.readyWait : p.isReady) || (p.isReady = !0, e !== !0 && --p.readyWait > 0 || (q.resolveWith(r, [p]), p.fn.triggerHandler && (p(r).triggerHandler("ready"), p(r).off("ready"))))
        }
    });

    function H() {
        r.removeEventListener("DOMContentLoaded", H), e.removeEventListener("load", H), p.ready()
    }
    p.ready.promise = function(t) {
        return q || (q = p.Deferred(), "complete" === r.readyState || "loading" !== r.readyState && !r.documentElement.doScroll ? e.setTimeout(p.ready) : (r.addEventListener("DOMContentLoaded", H), e.addEventListener("load", H))), q.promise(t)
    }, p.ready.promise();
    var O = function(e, t, n, r, i, o, a) {
            var s = 0,
                u = e.length,
                l = null == n;
            if ("object" === p.type(n)) {
                i = !0;
                for (s in n) O(e, t, s, n[s], !0, o, a)
            } else if (void 0 !== r && (i = !0, p.isFunction(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function(e, t, n) {
                    return l.call(p(e), n)
                })), t))
                for (; u > s; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
        },
        F = function(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };

    function I() {
        this.expando = p.expando + I.uid++
    }
    I.uid = 1, I.prototype = {
        register: function(e, t) {
            var n = t || {};
            return e.nodeType ? e[this.expando] = n : Object.defineProperty(e, this.expando, {
                value: n,
                writable: !0,
                configurable: !0
            }), e[this.expando]
        },
        cache: function(e) {
            if (!F(e)) return {};
            var t = e[this.expando];
            return t || (t = {}, F(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function(e, t, n) {
            var r, i = this.cache(e);
            if ("string" == typeof t) i[t] = n;
            else
                for (r in t) i[r] = t[r];
            return i
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][t]
        },
        access: function(e, t, n) {
            var r;
            return void 0 === t || t && "string" == typeof t && void 0 === n ? (r = this.get(e, t), void 0 !== r ? r : this.get(e, p.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, r, i, o = e[this.expando];
            if (void 0 !== o) {
                if (void 0 === t) this.register(e);
                else {
                    p.isArray(t) ? r = t.concat(t.map(p.camelCase)) : (i = p.camelCase(t), t in o ? r = [t, i] : (r = i, r = r in o ? [r] : r.match(P) || [])), n = r.length;
                    while (n--) delete o[r[n]]
                }(void 0 === t || p.isEmptyObject(o)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !p.isEmptyObject(t)
        }
    };
    var R = new I,
        _ = new I,
        W = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        B = /[A-Z]/g;

    function V(e, t, n) {
        var r;
        if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace(B, "-$&").toLowerCase(), n = e.getAttribute(r), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : W.test(n) ? p.parseJSON(n) : n;
                } catch (i) {}
                _.set(e, t, n)
            } else n = void 0;
        return n
    }
    p.extend({
        hasData: function(e) {
            return _.hasData(e) || R.hasData(e)
        },
        data: function(e, t, n) {
            return _.access(e, t, n)
        },
        removeData: function(e, t) {
            _.remove(e, t)
        },
        _data: function(e, t, n) {
            return R.access(e, t, n)
        },
        _removeData: function(e, t) {
            R.remove(e, t)
        }
    }), p.fn.extend({
        data: function(e, t) {
            var n, r, i, o = this[0],
                a = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (i = _.get(o), 1 === o.nodeType && !R.get(o, "hasDataAttrs"))) {
                    n = a.length;
                    while (n--) a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = p.camelCase(r.slice(5)), V(o, r, i[r])));
                    R.set(o, "hasDataAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function() {
                _.set(this, e)
            }) : O(this, function(t) {
                var n, r;
                if (o && void 0 === t) {
                    if (n = _.get(o, e) || _.get(o, e.replace(B, "-$&").toLowerCase()), void 0 !== n) return n;
                    if (r = p.camelCase(e), n = _.get(o, r), void 0 !== n) return n;
                    if (n = V(o, r, void 0), void 0 !== n) return n
                } else r = p.camelCase(e), this.each(function() {
                    var n = _.get(this, r);
                    _.set(this, r, t), e.indexOf("-") > -1 && void 0 !== n && _.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                _.remove(this, e)
            })
        }
    }), p.extend({
        queue: function(e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = R.get(e, t), n && (!r || p.isArray(n) ? r = R.access(e, t, p.makeArray(n)) : r.push(n)), r || []) : void 0
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = p.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = p._queueHooks(e, t),
                a = function() {
                    p.dequeue(e, t)
                };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return R.get(e, n) || R.access(e, n, {
                empty: p.Callbacks("once memory").add(function() {
                    R.remove(e, [t + "queue", n])
                })
            })
        }
    }), p.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? p.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = p.queue(this, e, t);
                p._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && p.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                p.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
                i = p.Deferred(),
                o = this,
                a = this.length,
                s = function() {
                    --r || i.resolveWith(o, [o])
                };
            "string" != typeof e && (t = e, e = void 0), e = e || "fx";
            while (a--) n = R.get(o[a], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
            return s(), i.promise(t)
        }
    });
    var $ = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        K = new RegExp("^(?:([+-])=|)(" + $ + ")([a-z%]*)$", "i"),
        z = ["Top", "Right", "Bottom", "Left"],
        U = function(e, t) {
            return e = t || e, "none" === p.css(e, "display") || !p.contains(e.ownerDocument, e)
        };

    function X(e, t, n, r) {
        var i, o = 1,
            a = 20,
            s = r ? function() {
                return r.cur()
            } : function() {
                return p.css(e, t, "")
            },
            u = s(),
            l = n && n[3] || (p.cssNumber[t] ? "" : "px"),
            c = (p.cssNumber[t] || "px" !== l && +u) && K.exec(p.css(e, t));
        if (c && c[3] !== l) {
            l = l || c[3], n = n || [], c = +u || 1;
            do o = o || ".5", c /= o, p.style(e, t, c + l); while (o !== (o = s() / u) && 1 !== o && --a)
        }
        return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i
    }
    var Y = /^(?:checkbox|radio)$/i,
        G = /<([\w:-]+)/,
        J = /^$|\/(?:java|ecma)script/i,
        Q = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    Q.optgroup = Q.option, Q.tbody = Q.tfoot = Q.colgroup = Q.caption = Q.thead, Q.th = Q.td;

    function Z(e, t) {
        var n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && p.nodeName(e, t) ? p.merge([e], n) : n
    }

    function ee(e, t) {
        for (var n = 0, r = e.length; r > n; n++) R.set(e[n], "globalEval", !t || R.get(t[n], "globalEval"))
    }
    var te = /<|&#?\w+;/;

    function ne(e, t, n, r, i) {
        for (var o, a, s, u, l, c, d = t.createDocumentFragment(), f = [], h = 0, v = e.length; v > h; h++)
            if (o = e[h], o || 0 === o)
                if ("object" === p.type(o)) p.merge(f, o.nodeType ? [o] : o);
                else if (te.test(o)) {
            a = a || d.appendChild(t.createElement("div")), s = (G.exec(o) || ["", ""])[1].toLowerCase(), u = Q[s] || Q._default, a.innerHTML = u[1] + p.htmlPrefilter(o) + u[2], c = u[0];
            while (c--) a = a.lastChild;
            p.merge(f, a.childNodes), a = d.firstChild, a.textContent = ""
        } else f.push(t.createTextNode(o));
        d.textContent = "", h = 0;
        while (o = f[h++])
            if (r && p.inArray(o, r) > -1) i && i.push(o);
            else if (l = p.contains(o.ownerDocument, o), a = Z(d.appendChild(o), "script"), l && ee(a), n) {
            c = 0;
            while (o = a[c++]) J.test(o.type || "") && n.push(o)
        }
        return d
    }! function() {
        var e = r.createDocumentFragment(),
            t = e.appendChild(r.createElement("div")),
            n = r.createElement("input");
        n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), d.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", d.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
    }();
    var re = /^key/,
        ie = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        oe = /^([^.]*)(?:\.(.+)|)/;

    function ae() {
        return !0
    }

    function se() {
        return !1
    }

    function ue() {
        try {
            return r.activeElement
        } catch (e) {}
    }

    function le(e, t, n, r, i, o) {
        var a, s;
        if ("object" == typeof t) {
            "string" != typeof n && (r = r || n, n = void 0);
            for (s in t) le(e, s, n, r, t[s], o);
            return e
        }
        if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), i === !1) i = se;
        else if (!i) return e;
        return 1 === o && (a = i, i = function(e) {
            return p().off(e), a.apply(this, arguments)
        }, i.guid = a.guid || (a.guid = p.guid++)), e.each(function() {
            p.event.add(this, t, i, r, n)
        })
    }
    p.event = {
        global: {},
        add: function(e, t, n, r, i) {
            var o, a, s, u, l, c, d, f, h, v, m, g = R.get(e);
            if (g) {
                n.handler && (o = n, n = o.handler, i = o.selector), n.guid || (n.guid = p.guid++), (u = g.events) || (u = g.events = {}), (a = g.handle) || (a = g.handle = function(t) {
                    return "undefined" != typeof p && p.event.triggered !== t.type ? p.event.dispatch.apply(e, arguments) : void 0
                }), t = (t || "").match(P) || [""], l = t.length;
                while (l--) s = oe.exec(t[l]) || [], h = m = s[1], v = (s[2] || "").split(".").sort(), h && (d = p.event.special[h] || {}, h = (i ? d.delegateType : d.bindType) || h, d = p.event.special[h] || {}, c = p.extend({
                    type: h,
                    origType: m,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && p.expr.match.needsContext.test(i),
                    namespace: v.join(".")
                }, o), (f = u[h]) || (f = u[h] = [], f.delegateCount = 0, d.setup && d.setup.call(e, r, v, a) !== !1 || e.addEventListener && e.addEventListener(h, a)), d.add && (d.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? f.splice(f.delegateCount++, 0, c) : f.push(c), p.event.global[h] = !0)
            }
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, u, l, c, d, f, h, v, m, g = R.hasData(e) && R.get(e);
            if (g && (u = g.events)) {
                t = (t || "").match(P) || [""], l = t.length;
                while (l--)
                    if (s = oe.exec(t[l]) || [], h = m = s[1], v = (s[2] || "").split(".").sort(), h) {
                        d = p.event.special[h] || {}, h = (r ? d.delegateType : d.bindType) || h, f = u[h] || [], s = s[2] && new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = f.length;
                        while (o--) c = f[o], !i && m !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (f.splice(o, 1), c.selector && f.delegateCount--, d.remove && d.remove.call(e, c));
                        a && !f.length && (d.teardown && d.teardown.call(e, v, g.handle) !== !1 || p.removeEvent(e, h, g.handle), delete u[h])
                    } else
                        for (h in u) p.event.remove(e, h + t[l], n, r, !0);
                p.isEmptyObject(u) && R.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            e = p.event.fix(e);
            var t, n, r, o, a, s = [],
                u = i.call(arguments),
                l = (R.get(this, "events") || {})[e.type] || [],
                c = p.event.special[e.type] || {};
            if (u[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                s = p.event.handlers.call(this, e, l), t = 0;
                while ((o = s[t++]) && !e.isPropagationStopped()) {
                    e.currentTarget = o.elem, n = 0;
                    while ((a = o.handlers[n++]) && !e.isImmediatePropagationStopped()) e.rnamespace && !e.rnamespace.test(a.namespace) || (e.handleObj = a, e.data = a.data, r = ((p.event.special[a.origType] || {}).handle || a.handler).apply(o.elem, u), void 0 !== r && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()))
                }
                return c.postDispatch && c.postDispatch.call(this, e), e.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, a = [],
                s = t.delegateCount,
                u = e.target;
            if (s && u.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                for (; u !== this; u = u.parentNode || this)
                    if (1 === u.nodeType && (u.disabled !== !0 || "click" !== e.type)) {
                        for (r = [], n = 0; s > n; n++) o = t[n], i = o.selector + " ", void 0 === r[i] && (r[i] = o.needsContext ? p(i, this).index(u) > -1 : p.find(i, this, null, [u]).length), r[i] && r.push(o);
                        r.length && a.push({
                            elem: u,
                            handlers: r
                        })
                    }
            return s < t.length && a.push({
                elem: this,
                handlers: t.slice(s)
            }), a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, i, o, a = t.button;
                return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || r, i = n.documentElement, o = n.body, e.pageX = t.clientX + (i && i.scrollLeft || o && o.scrollLeft || 0) - (i && i.clientLeft || o && o.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || o && o.scrollTop || 0) - (i && i.clientTop || o && o.clientTop || 0)), e.which || void 0 === a || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
            }
        },
        fix: function(e) {
            if (e[p.expando]) return e;
            var t, n, i, o = e.type,
                a = e,
                s = this.fixHooks[o];
            s || (this.fixHooks[o] = s = ie.test(o) ? this.mouseHooks : re.test(o) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, e = new p.Event(a), t = i.length;
            while (t--) n = i[t], e[n] = a[n];
            return e.target || (e.target = r), 3 === e.target.nodeType && (e.target = e.target.parentNode), s.filter ? s.filter(e, a) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== ue() && this.focus ? (this.focus(), !1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === ue() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && p.nodeName(this, "input") ? (this.click(), !1) : void 0
                },
                _default: function(e) {
                    return p.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, p.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, p.Event = function(e, t) {
        return this instanceof p.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? ae : se) : this.type = e, t && p.extend(this, t), this.timeStamp = e && e.timeStamp || p.now(), void(this[p.expando] = !0)) : new p.Event(e, t)
    }, p.Event.prototype = {
        constructor: p.Event,
        isDefaultPrevented: se,
        isPropagationStopped: se,
        isImmediatePropagationStopped: se,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = ae, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = ae, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = ae, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, p.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        p.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    i = e.relatedTarget,
                    o = e.handleObj;
                return i && (i === r || p.contains(r, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), p.fn.extend({
        on: function(e, t, n, r) {
            return le(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return le(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, p(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            return t !== !1 && "function" != typeof t || (n = t, t = void 0), n === !1 && (n = se), this.each(function() {
                p.event.remove(this, e, n, t)
            })
        }
    });
    var ce = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        de = /<script|<style|<link/i,
        fe = /checked\s*(?:[^=]|=\s*.checked.)/i,
        pe = /^true\/(.*)/,
        he = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function ve(e, t) {
        return p.nodeName(e, "table") && p.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function me(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function ge(e) {
        var t = pe.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function ye(e, t) {
        var n, r, i, o, a, s, u, l;
        if (1 === t.nodeType) {
            if (R.hasData(e) && (o = R.access(e), a = R.set(t, o), l = o.events)) {
                delete a.handle, a.events = {};
                for (i in l)
                    for (n = 0, r = l[i].length; r > n; n++) p.event.add(t, i, l[i][n])
            }
            _.hasData(e) && (s = _.access(e), u = p.extend({}, s), _.set(t, u))
        }
    }

    function be(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && Y.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
    }

    function xe(e, t, n, r) {
        t = o.apply([], t);
        var i, a, s, u, l, c, f = 0,
            h = e.length,
            v = h - 1,
            m = t[0],
            g = p.isFunction(m);
        if (g || h > 1 && "string" == typeof m && !d.checkClone && fe.test(m)) return e.each(function(i) {
            var o = e.eq(i);
            g && (t[0] = m.call(this, i, o.html())), xe(o, t, n, r)
        });
        if (h && (i = ne(t, e[0].ownerDocument, !1, e, r), a = i.firstChild, 1 === i.childNodes.length && (i = a), a || r)) {
            for (s = p.map(Z(i, "script"), me), u = s.length; h > f; f++) l = i, f !== v && (l = p.clone(l, !0, !0), u && p.merge(s, Z(l, "script"))), n.call(e[f], l, f);
            if (u)
                for (c = s[s.length - 1].ownerDocument, p.map(s, ge), f = 0; u > f; f++) l = s[f], J.test(l.type || "") && !R.access(l, "globalEval") && p.contains(c, l) && (l.src ? p._evalUrl && p._evalUrl(l.src) : p.globalEval(l.textContent.replace(he, "")))
        }
        return e
    }

    function we(e, t, n) {
        for (var r, i = t ? p.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || p.cleanData(Z(r)), r.parentNode && (n && p.contains(r.ownerDocument, r) && ee(Z(r, "script")), r.parentNode.removeChild(r));
        return e
    }
    p.extend({
        htmlPrefilter: function(e) {
            return e.replace(ce, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var r, i, o, a, s = e.cloneNode(!0),
                u = p.contains(e.ownerDocument, e);
            if (!(d.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || p.isXMLDoc(e)))
                for (a = Z(s), o = Z(e), r = 0, i = o.length; i > r; r++) be(o[r], a[r]);
            if (t)
                if (n)
                    for (o = o || Z(e), a = a || Z(s), r = 0, i = o.length; i > r; r++) ye(o[r], a[r]);
                else ye(e, s);
            return a = Z(s, "script"), a.length > 0 && ee(a, !u && Z(e, "script")), s
        },
        cleanData: function(e) {
            for (var t, n, r, i = p.event.special, o = 0; void 0 !== (n = e[o]); o++)
                if (F(n)) {
                    if (t = n[R.expando]) {
                        if (t.events)
                            for (r in t.events) i[r] ? p.event.remove(n, r) : p.removeEvent(n, r, t.handle);
                        n[R.expando] = void 0
                    }
                    n[_.expando] && (n[_.expando] = void 0)
                }
        }
    }), p.fn.extend({
        domManip: xe,
        detach: function(e) {
            return we(this, e, !0)
        },
        remove: function(e) {
            return we(this, e)
        },
        text: function(e) {
            return O(this, function(e) {
                return void 0 === e ? p.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return xe(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = ve(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return xe(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = ve(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return xe(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return xe(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (p.cleanData(Z(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                return p.clone(this, e, t)
            })
        },
        html: function(e) {
            return O(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !de.test(e) && !Q[(G.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = p.htmlPrefilter(e);
                    try {
                        for (; r > n; n++) t = this[n] || {}, 1 === t.nodeType && (p.cleanData(Z(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return xe(this, arguments, function(t) {
                var n = this.parentNode;
                p.inArray(this, e) < 0 && (p.cleanData(Z(this)), n && n.replaceChild(t, this))
            }, e)
        }
    }), p.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        p.fn[e] = function(e) {
            for (var n, r = [], i = p(e), o = i.length - 1, s = 0; o >= s; s++) n = s === o ? this : this.clone(!0), p(i[s])[t](n), a.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var Ce, Te = {
        HTML: "block",
        BODY: "block"
    };

    function Ee(e, t) {
        var n = p(t.createElement(e)).appendTo(t.body),
            r = p.css(n[0], "display");
        return n.detach(), r
    }

    function ke(e) {
        var t = r,
            n = Te[e];
        return n || (n = Ee(e, t), "none" !== n && n || (Ce = (Ce || p("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = Ce[0].contentDocument, t.write(), t.close(), n = Ee(e, t), Ce.detach()), Te[e] = n), n
    }
    var Se = /^margin/,
        je = new RegExp("^(" + $ + ")(?!px)[a-z%]+$", "i"),
        Ne = function(t) {
            var n = t.ownerDocument.defaultView;
            return n && n.opener || (n = e), n.getComputedStyle(t)
        },
        De = function(e, t, n, r) {
            var i, o, a = {};
            for (o in t) a[o] = e.style[o], e.style[o] = t[o];
            i = n.apply(e, r || []);
            for (o in t) e.style[o] = a[o];
            return i
        },
        Ae = r.documentElement;
    ! function() {
        var t, n, i, o, a = r.createElement("div"),
            s = r.createElement("div");
        if (s.style) {
            s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", d.clearCloneStyle = "content-box" === s.style.backgroundClip, a.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", a.appendChild(s);

            function u() {
                s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", s.innerHTML = "", Ae.appendChild(a);
                var r = e.getComputedStyle(s);
                t = "1%" !== r.top, o = "2px" === r.marginLeft, n = "4px" === r.width, s.style.marginRight = "50%", i = "4px" === r.marginRight, Ae.removeChild(a)
            }
            p.extend(d, {
                pixelPosition: function() {
                    return u(), t
                },
                boxSizingReliable: function() {
                    return null == n && u(), n
                },
                pixelMarginRight: function() {
                    return null == n && u(), i
                },
                reliableMarginLeft: function() {
                    return null == n && u(), o
                },
                reliableMarginRight: function() {
                    var t, n = s.appendChild(r.createElement("div"));
                    return n.style.cssText = s.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", s.style.width = "1px", Ae.appendChild(a), t = !parseFloat(e.getComputedStyle(n).marginRight), Ae.removeChild(a), s.removeChild(n), t
                }
            })
        }
    }();

    function Me(e, t, n) {
        var r, i, o, a, s = e.style;
        return n = n || Ne(e), a = n ? n.getPropertyValue(t) || n[t] : void 0, "" !== a && void 0 !== a || p.contains(e.ownerDocument, e) || (a = p.style(e, t)), n && !d.pixelMarginRight() && je.test(a) && Se.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o), void 0 !== a ? a + "" : a
    }

    function Pe(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }
    var Le = /^(none|table(?!-c[ea]).+)/,
        qe = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        He = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        Oe = ["Webkit", "O", "Moz", "ms"],
        Fe = r.createElement("div").style;

    function Ie(e) {
        if (e in Fe) return e;
        var t = e[0].toUpperCase() + e.slice(1),
            n = Oe.length;
        while (n--)
            if (e = Oe[n] + t, e in Fe) return e
    }

    function Re(e, t, n) {
        var r = K.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }

    function _e(e, t, n, r, i) {
        for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === n && (a += p.css(e, n + z[o], !0, i)), r ? ("content" === n && (a -= p.css(e, "padding" + z[o], !0, i)), "margin" !== n && (a -= p.css(e, "border" + z[o] + "Width", !0, i))) : (a += p.css(e, "padding" + z[o], !0, i), "padding" !== n && (a += p.css(e, "border" + z[o] + "Width", !0, i)));
        return a
    }

    function We(e, t, n) {
        var r = !0,
            i = "width" === t ? e.offsetWidth : e.offsetHeight,
            o = Ne(e),
            a = "border-box" === p.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = Me(e, t, o), (0 > i || null == i) && (i = e.style[t]), je.test(i)) return i;
            r = a && (d.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + _e(e, t, n || (a ? "border" : "content"), r, o) + "px"
    }

    function Be(e, t) {
        for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++) r = e[a], r.style && (o[a] = R.get(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && U(r) && (o[a] = R.access(r, "olddisplay", ke(r.nodeName)))) : (i = U(r), "none" === n && i || R.set(r, "olddisplay", i ? n : p.css(r, "display"))));
        for (a = 0; s > a; a++) r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
        return e
    }
    p.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Me(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = p.camelCase(t),
                    u = e.style;
                return t = p.cssProps[s] || (p.cssProps[s] = Ie(s) || s), a = p.cssHooks[t] || p.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : u[t] : (o = typeof n, "string" === o && (i = K.exec(n)) && i[1] && (n = X(e, t, i), o = "number"), null != n && n === n && ("number" === o && (n += i && i[3] || (p.cssNumber[s] ? "" : "px")), d.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u[t] = n)), void 0)
            }
        },
        css: function(e, t, n, r) {
            var i, o, a, s = p.camelCase(t);
            return t = p.cssProps[s] || (p.cssProps[s] = Ie(s) || s), a = p.cssHooks[t] || p.cssHooks[s], a && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = Me(e, t, r)), "normal" === i && t in He && (i = He[t]), "" === n || n ? (o = parseFloat(i), n === !0 || isFinite(o) ? o || 0 : i) : i
        }
    }), p.each(["height", "width"], function(e, t) {
        p.cssHooks[t] = {
            get: function(e, n, r) {
                return n ? Le.test(p.css(e, "display")) && 0 === e.offsetWidth ? De(e, qe, function() {
                    return We(e, t, r)
                }) : We(e, t, r) : void 0
            },
            set: function(e, n, r) {
                var i, o = r && Ne(e),
                    a = r && _e(e, t, r, "border-box" === p.css(e, "boxSizing", !1, o), o);
                return a && (i = K.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = p.css(e, t)), Re(e, n, a)
            }
        }
    }), p.cssHooks.marginLeft = Pe(d.reliableMarginLeft, function(e, t) {
        return t ? (parseFloat(Me(e, "marginLeft")) || e.getBoundingClientRect().left - De(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        })) + "px" : void 0
    }), p.cssHooks.marginRight = Pe(d.reliableMarginRight, function(e, t) {
        return t ? De(e, {
            display: "inline-block"
        }, Me, [e, "marginRight"]) : void 0
    }), p.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        p.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + z[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        }, Se.test(e) || (p.cssHooks[e + t].set = Re)
    }), p.fn.extend({
        css: function(e, t) {
            return O(this, function(e, t, n) {
                var r, i, o = {},
                    a = 0;
                if (p.isArray(t)) {
                    for (r = Ne(e), i = t.length; i > a; a++) o[t[a]] = p.css(e, t[a], !1, r);
                    return o
                }
                return void 0 !== n ? p.style(e, t, n) : p.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return Be(this, !0)
        },
        hide: function() {
            return Be(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                U(this) ? p(this).show() : p(this).hide()
            })
        }
    });

    function Ve(e, t, n, r, i) {
        return new Ve.prototype.init(e, t, n, r, i)
    }
    p.Tween = Ve, Ve.prototype = {
        constructor: Ve,
        init: function(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || p.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (p.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = Ve.propHooks[this.prop];
            return e && e.get ? e.get(this) : Ve.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = Ve.propHooks[this.prop];
            return this.options.duration ? this.pos = t = p.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Ve.propHooks._default.set(this), this
        }
    }, Ve.prototype.init.prototype = Ve.prototype, Ve.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = p.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
            },
            set: function(e) {
                p.fx.step[e.prop] ? p.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[p.cssProps[e.prop]] && !p.cssHooks[e.prop] ? e.elem[e.prop] = e.now : p.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }, Ve.propHooks.scrollTop = Ve.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, p.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, p.fx = Ve.prototype.init, p.fx.step = {};
    var $e, Ke, ze = /^(?:toggle|show|hide)$/,
        Ue = /queueHooks$/;

    function Xe() {
        return e.setTimeout(function() {
            $e = void 0
        }), $e = p.now()
    }

    function Ye(e, t) {
        var n, r = 0,
            i = {
                height: e
            };
        for (t = t ? 1 : 0; 4 > r; r += 2 - t) n = z[r], i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function Ge(e, t, n) {
        for (var r, i = (Ze.tweeners[t] || []).concat(Ze.tweeners["*"]), o = 0, a = i.length; a > o; o++)
            if (r = i[o].call(n, t, e)) return r
    }

    function Je(e, t, n) {
        var r, i, o, a, s, u, l, c, d = this,
            f = {},
            h = e.style,
            v = e.nodeType && U(e),
            m = R.get(e, "fxshow");
        n.queue || (s = p._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function() {
            s.unqueued || u()
        }), s.unqueued++, d.always(function() {
            d.always(function() {
                s.unqueued--, p.queue(e, "fx").length || s.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [h.overflow, h.overflowX, h.overflowY], l = p.css(e, "display"), c = "none" === l ? R.get(e, "olddisplay") || ke(e.nodeName) : l, "inline" === c && "none" === p.css(e, "float") && (h.display = "inline-block")), n.overflow && (h.overflow = "hidden", d.always(function() {
            h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
        }));
        for (r in t)
            if (i = t[r], ze.exec(i)) {
                if (delete t[r], o = o || "toggle" === i, i === (v ? "hide" : "show")) {
                    if ("show" !== i || !m || void 0 === m[r]) continue;
                    v = !0
                }
                f[r] = m && m[r] || p.style(e, r)
            } else l = void 0;
        if (p.isEmptyObject(f)) "inline" === ("none" === l ? ke(e.nodeName) : l) && (h.display = l);
        else {
            m ? "hidden" in m && (v = m.hidden) : m = R.access(e, "fxshow", {}), o && (m.hidden = !v), v ? p(e).show() : d.done(function() {
                p(e).hide()
            }), d.done(function() {
                var t;
                R.remove(e, "fxshow");
                for (t in f) p.style(e, t, f[t])
            });
            for (r in f) a = Ge(v ? m[r] : 0, r, d), r in m || (m[r] = a.start, v && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
        }
    }

    function Qe(e, t) {
        var n, r, i, o, a;
        for (n in e)
            if (r = p.camelCase(n), i = t[r], o = e[n], p.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = p.cssHooks[r], a && "expand" in a) {
                o = a.expand(o), delete e[r];
                for (n in o) n in e || (e[n] = o[n], t[n] = i)
            } else t[r] = i
    }

    function Ze(e, t, n) {
        var r, i, o = 0,
            a = Ze.prefilters.length,
            s = p.Deferred().always(function() {
                delete u.elem
            }),
            u = function() {
                if (i) return !1;
                for (var t = $e || Xe(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length; u > a; a++) l.tweens[a].run(o);
                return s.notifyWith(e, [l, o, n]), 1 > o && u ? n : (s.resolveWith(e, [l]), !1)
            },
            l = s.promise({
                elem: e,
                props: p.extend({}, t),
                opts: p.extend(!0, {
                    specialEasing: {},
                    easing: p.easing._default
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: $e || Xe(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = p.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                    return l.tweens.push(r), r
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? l.tweens.length : 0;
                    if (i) return this;
                    for (i = !0; r > n; n++) l.tweens[n].run(1);
                    return t ? (s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]), this
                }
            }),
            c = l.props;
        for (Qe(c, l.opts.specialEasing); a > o; o++)
            if (r = Ze.prefilters[o].call(l, e, c, l.opts)) return p.isFunction(r.stop) && (p._queueHooks(l.elem, l.opts.queue).stop = p.proxy(r.stop, r)), r;
        return p.map(c, Ge, l), p.isFunction(l.opts.start) && l.opts.start.call(e, l), p.fx.timer(p.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }
    p.Animation = p.extend(Ze, {
            tweeners: {
                "*": [function(e, t) {
                    var n = this.createTween(e, t);
                    return X(n.elem, e, K.exec(t), n), n
                }]
            },
            tweener: function(e, t) {
                p.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(P);
                for (var n, r = 0, i = e.length; i > r; r++) n = e[r], Ze.tweeners[n] = Ze.tweeners[n] || [], Ze.tweeners[n].unshift(t)
            },
            prefilters: [Je],
            prefilter: function(e, t) {
                t ? Ze.prefilters.unshift(e) : Ze.prefilters.push(e)
            }
        }), p.speed = function(e, t, n) {
            var r = e && "object" == typeof e ? p.extend({}, e) : {
                complete: n || !n && t || p.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !p.isFunction(t) && t
            };
            return r.duration = p.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in p.fx.speeds ? p.fx.speeds[r.duration] : p.fx.speeds._default, null != r.queue && r.queue !== !0 || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
                p.isFunction(r.old) && r.old.call(this), r.queue && p.dequeue(this, r.queue)
            }, r
        }, p.fn.extend({
            fadeTo: function(e, t, n, r) {
                return this.filter(U).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, r)
            },
            animate: function(e, t, n, r) {
                var i = p.isEmptyObject(e),
                    o = p.speed(t, n, r),
                    a = function() {
                        var t = Ze(this, p.extend({}, e), o);
                        (i || R.get(this, "finish")) && t.stop(!0)
                    };
                return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
            },
            stop: function(e, t, n) {
                var r = function(e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        i = null != e && e + "queueHooks",
                        o = p.timers,
                        a = R.get(this);
                    if (i) a[i] && a[i].stop && r(a[i]);
                    else
                        for (i in a) a[i] && a[i].stop && Ue.test(i) && r(a[i]);
                    for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                    !t && n || p.dequeue(this, e)
                })
            },
            finish: function(e) {
                return e !== !1 && (e = e || "fx"), this.each(function() {
                    var t, n = R.get(this),
                        r = n[e + "queue"],
                        i = n[e + "queueHooks"],
                        o = p.timers,
                        a = r ? r.length : 0;
                    for (n.finish = !0, p.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                    for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish
                })
            }
        }), p.each(["toggle", "show", "hide"], function(e, t) {
            var n = p.fn[t];
            p.fn[t] = function(e, r, i) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(Ye(t, !0), e, r, i)
            }
        }), p.each({
            slideDown: Ye("show"),
            slideUp: Ye("hide"),
            slideToggle: Ye("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            p.fn[e] = function(e, n, r) {
                return this.animate(t, e, n, r)
            }
        }), p.timers = [], p.fx.tick = function() {
            var e, t = 0,
                n = p.timers;
            for ($e = p.now(); t < n.length; t++) e = n[t], e() || n[t] !== e || n.splice(t--, 1);
            n.length || p.fx.stop(), $e = void 0
        }, p.fx.timer = function(e) {
            p.timers.push(e), e() ? p.fx.start() : p.timers.pop()
        }, p.fx.interval = 13, p.fx.start = function() {
            Ke || (Ke = e.setInterval(p.fx.tick, p.fx.interval))
        }, p.fx.stop = function() {
            e.clearInterval(Ke), Ke = null
        }, p.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, p.fn.delay = function(t, n) {
            return t = p.fx ? p.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function(n, r) {
                var i = e.setTimeout(n, t);
                r.stop = function() {
                    e.clearTimeout(i)
                }
            })
        },
        function() {
            var e = r.createElement("input"),
                t = r.createElement("select"),
                n = t.appendChild(r.createElement("option"));
            e.type = "checkbox", d.checkOn = "" !== e.value, d.optSelected = n.selected, t.disabled = !0, d.optDisabled = !n.disabled, e = r.createElement("input"), e.value = "t", e.type = "radio", d.radioValue = "t" === e.value
        }();
    var et, tt = p.expr.attrHandle;
    p.fn.extend({
        attr: function(e, t) {
            return O(this, p.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                p.removeAttr(this, e)
            })
        }
    }), p.extend({
        attr: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? p.prop(e, t, n) : (1 === o && p.isXMLDoc(e) || (t = t.toLowerCase(), i = p.attrHooks[t] || (p.expr.match.bool.test(t) ? et : void 0)), void 0 !== n ? null === n ? void p.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : (r = p.find.attr(e, t), null == r ? void 0 : r))
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!d.radioValue && "radio" === t && p.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, r, i = 0,
                o = t && t.match(P);
            if (o && 1 === e.nodeType)
                while (n = o[i++]) r = p.propFix[n] || n, p.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
        }
    }), et = {
        set: function(e, t, n) {
            return t === !1 ? p.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, p.each(p.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = tt[t] || p.find.attr;
        tt[t] = function(e, t, r) {
            var i, o;
            return r || (o = tt[t], tt[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, tt[t] = o), i
        }
    });
    var nt = /^(?:input|select|textarea|button)$/i,
        rt = /^(?:a|area)$/i;
    p.fn.extend({
        prop: function(e, t) {
            return O(this, p.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[p.propFix[e] || e]
            })
        }
    }), p.extend({
        prop: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return 1 === o && p.isXMLDoc(e) || (t = p.propFix[t] || t, i = p.propHooks[t]),
                void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = p.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : nt.test(e.nodeName) || rt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), d.optSelected || (p.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), p.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        p.propFix[this.toLowerCase()] = this
    });
    var it = /[\t\r\n\f]/g;

    function ot(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }
    p.fn.extend({
        addClass: function(e) {
            var t, n, r, i, o, a, s, u = 0;
            if (p.isFunction(e)) return this.each(function(t) {
                p(this).addClass(e.call(this, t, ot(this)))
            });
            if ("string" == typeof e && e) {
                t = e.match(P) || [];
                while (n = this[u++])
                    if (i = ot(n), r = 1 === n.nodeType && (" " + i + " ").replace(it, " ")) {
                        a = 0;
                        while (o = t[a++]) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                        s = p.trim(r), i !== s && n.setAttribute("class", s)
                    }
            }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, o, a, s, u = 0;
            if (p.isFunction(e)) return this.each(function(t) {
                p(this).removeClass(e.call(this, t, ot(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof e && e) {
                t = e.match(P) || [];
                while (n = this[u++])
                    if (i = ot(n), r = 1 === n.nodeType && (" " + i + " ").replace(it, " ")) {
                        a = 0;
                        while (o = t[a++])
                            while (r.indexOf(" " + o + " ") > -1) r = r.replace(" " + o + " ", " ");
                        s = p.trim(r), i !== s && n.setAttribute("class", s)
                    }
            }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : p.isFunction(e) ? this.each(function(n) {
                p(this).toggleClass(e.call(this, n, ot(this), t), t)
            }) : this.each(function() {
                var t, r, i, o;
                if ("string" === n) {
                    r = 0, i = p(this), o = e.match(P) || [];
                    while (t = o[r++]) i.hasClass(t) ? i.removeClass(t) : i.addClass(t)
                } else void 0 !== e && "boolean" !== n || (t = ot(this), t && R.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || e === !1 ? "" : R.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, r = 0;
            t = " " + e + " ";
            while (n = this[r++])
                if (1 === n.nodeType && (" " + ot(n) + " ").replace(it, " ").indexOf(t) > -1) return !0;
            return !1
        }
    });
    var at = /\r/g,
        st = /[\x20\t\r\n\f]+/g;
    p.fn.extend({
        val: function(e) {
            var t, n, r, i = this[0]; {
                if (arguments.length) return r = p.isFunction(e), this.each(function(n) {
                    var i;
                    1 === this.nodeType && (i = r ? e.call(this, n, p(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : p.isArray(i) && (i = p.map(i, function(e) {
                        return null == e ? "" : e + ""
                    })), t = p.valHooks[this.type] || p.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                });
                if (i) return t = p.valHooks[i.type] || p.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(at, "") : null == n ? "" : n)
            }
        }
    }), p.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = p.find.attr(e, "value");
                    return null != t ? t : p.trim(p.text(e)).replace(st, " ")
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, u = 0 > i ? s : o ? i : 0; s > u; u++)
                        if (n = r[u], (n.selected || u === i) && (d.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !p.nodeName(n.parentNode, "optgroup"))) {
                            if (t = p(n).val(), o) return t;
                            a.push(t)
                        }
                    return a
                },
                set: function(e, t) {
                    var n, r, i = e.options,
                        o = p.makeArray(t),
                        a = i.length;
                    while (a--) r = i[a], (r.selected = p.inArray(p.valHooks.option.get(r), o) > -1) && (n = !0);
                    return n || (e.selectedIndex = -1), o
                }
            }
        }
    }), p.each(["radio", "checkbox"], function() {
        p.valHooks[this] = {
            set: function(e, t) {
                return p.isArray(t) ? e.checked = p.inArray(p(e).val(), t) > -1 : void 0
            }
        }, d.checkOn || (p.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var ut = /^(?:focusinfocus|focusoutblur)$/;
    p.extend(p.event, {
        trigger: function(t, n, i, o) {
            var a, s, u, l, d, f, h, v = [i || r],
                m = c.call(t, "type") ? t.type : t,
                g = c.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = u = i = i || r, 3 !== i.nodeType && 8 !== i.nodeType && !ut.test(m + p.event.triggered) && (m.indexOf(".") > -1 && (g = m.split("."), m = g.shift(), g.sort()), d = m.indexOf(":") < 0 && "on" + m, t = t[p.expando] ? t : new p.Event(m, "object" == typeof t && t), t.isTrigger = o ? 2 : 3, t.namespace = g.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : p.makeArray(n, [t]), h = p.event.special[m] || {}, o || !h.trigger || h.trigger.apply(i, n) !== !1)) {
                if (!o && !h.noBubble && !p.isWindow(i)) {
                    for (l = h.delegateType || m, ut.test(l + m) || (s = s.parentNode); s; s = s.parentNode) v.push(s), u = s;
                    u === (i.ownerDocument || r) && v.push(u.defaultView || u.parentWindow || e)
                }
                a = 0;
                while ((s = v[a++]) && !t.isPropagationStopped()) t.type = a > 1 ? l : h.bindType || m, f = (R.get(s, "events") || {})[t.type] && R.get(s, "handle"), f && f.apply(s, n), f = d && s[d], f && f.apply && F(s) && (t.result = f.apply(s, n), t.result === !1 && t.preventDefault());
                return t.type = m, o || t.isDefaultPrevented() || h._default && h._default.apply(v.pop(), n) !== !1 || !F(i) || d && p.isFunction(i[m]) && !p.isWindow(i) && (u = i[d], u && (i[d] = null), p.event.triggered = m, i[m](), p.event.triggered = void 0, u && (i[d] = u)), t.result
            }
        },
        simulate: function(e, t, n) {
            var r = p.extend(new p.Event, n, {
                type: e,
                isSimulated: !0
            });
            p.event.trigger(r, null, t)
        }
    }), p.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                p.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? p.event.trigger(e, t, n, !0) : void 0
        }
    }), p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        p.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), p.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), d.focusin = "onfocusin" in e, d.focusin || p.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            p.event.simulate(t, e.target, p.event.fix(e))
        };
        p.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this,
                    i = R.access(r, t);
                i || r.addEventListener(e, n, !0), R.access(r, t, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this,
                    i = R.access(r, t) - 1;
                i ? R.access(r, t, i) : (r.removeEventListener(e, n, !0), R.remove(r, t))
            }
        }
    });
    var lt = e.location,
        ct = p.now(),
        dt = /\?/;
    p.parseJSON = function(e) {
        return JSON.parse(e + "")
    }, p.parseXML = function(t) {
        var n;
        if (!t || "string" != typeof t) return null;
        try {
            n = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (r) {
            n = void 0
        }
        return n && !n.getElementsByTagName("parsererror").length || p.error("Invalid XML: " + t), n
    };
    var ft = /#.*$/,
        pt = /([?&])_=[^&]*/,
        ht = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        vt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        mt = /^(?:GET|HEAD)$/,
        gt = /^\/\//,
        yt = {},
        bt = {},
        xt = "*/".concat("*"),
        wt = r.createElement("a");
    wt.href = lt.href;

    function Ct(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0,
                o = t.toLowerCase().match(P) || [];
            if (p.isFunction(n))
                while (r = o[i++]) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function Tt(e, t, n, r) {
        var i = {},
            o = e === bt;

        function a(s) {
            var u;
            return i[s] = !0, p.each(e[s] || [], function(e, s) {
                var l = s(t, n, r);
                return "string" != typeof l || o || i[l] ? o ? !(u = l) : void 0 : (t.dataTypes.unshift(l), a(l), !1)
            }), u
        }
        return a(t.dataTypes[0]) || !i["*"] && a("*")
    }

    function Et(e, t) {
        var n, r, i = p.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && p.extend(!0, e, r), e
    }

    function kt(e, t, n) {
        var r, i, o, a, s = e.contents,
            u = e.dataTypes;
        while ("*" === u[0]) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)
            for (i in s)
                if (s[i] && s[i].test(r)) {
                    u.unshift(i);
                    break
                }
        if (u[0] in n) o = u[0];
        else {
            for (i in n) {
                if (!u[0] || e.converters[i + " " + u[0]]) {
                    o = i;
                    break
                }
                a || (a = i)
            }
            o = o || a
        }
        return o ? (o !== u[0] && u.unshift(o), n[o]) : void 0
    }

    function St(e, t, n, r) {
        var i, o, a, s, u, l = {},
            c = e.dataTypes.slice();
        if (c[1])
            for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
        o = c.shift();
        while (o)
            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
                if ("*" === o) o = u;
                else if ("*" !== u && u !== o) {
            if (a = l[u + " " + o] || l["* " + o], !a)
                for (i in l)
                    if (s = i.split(" "), s[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                        a === !0 ? a = l[i] : l[i] !== !0 && (o = s[0], c.unshift(s[1]));
                        break
                    }
            if (a !== !0)
                if (a && e["throws"]) t = a(t);
                else try {
                    t = a(t)
                } catch (d) {
                    return {
                        state: "parsererror",
                        error: a ? d : "No conversion from " + u + " to " + o
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }
    p.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: lt.href,
            type: "GET",
            isLocal: vt.test(lt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": xt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": p.parseJSON,
                "text xml": p.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? Et(Et(e, p.ajaxSettings), t) : Et(p.ajaxSettings, e)
        },
        ajaxPrefilter: Ct(yt),
        ajaxTransport: Ct(bt),
        ajax: function(t, n) {
            "object" == typeof t && (n = t, t = void 0), n = n || {};
            var i, o, a, s, u, l, c, d, f = p.ajaxSetup({}, n),
                h = f.context || f,
                v = f.context && (h.nodeType || h.jquery) ? p(h) : p.event,
                m = p.Deferred(),
                g = p.Callbacks("once memory"),
                y = f.statusCode || {},
                b = {},
                x = {},
                w = 0,
                C = "canceled",
                T = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === w) {
                            if (!s) {
                                s = {};
                                while (t = ht.exec(a)) s[t[1].toLowerCase()] = t[2]
                            }
                            t = s[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === w ? a : null
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        return w || (e = x[n] = x[n] || e, b[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return w || (f.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (2 > w)
                                for (t in e) y[t] = [y[t], e[t]];
                            else T.always(e[T.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || C;
                        return i && i.abort(t), k(0, t), this
                    }
                };
            if (m.promise(T).complete = g.add, T.success = T.done, T.error = T.fail, f.url = ((t || f.url || lt.href) + "").replace(ft, "").replace(gt, lt.protocol + "//"), f.type = n.method || n.type || f.method || f.type, f.dataTypes = p.trim(f.dataType || "*").toLowerCase().match(P) || [""], null == f.crossDomain) {
                l = r.createElement("a");
                try {
                    l.href = f.url, l.href = l.href, f.crossDomain = wt.protocol + "//" + wt.host != l.protocol + "//" + l.host
                } catch (E) {
                    f.crossDomain = !0
                }
            }
            if (f.data && f.processData && "string" != typeof f.data && (f.data = p.param(f.data, f.traditional)), Tt(yt, f, n, T), 2 === w) return T;
            c = p.event && f.global, c && 0 === p.active++ && p.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !mt.test(f.type), o = f.url, f.hasContent || (f.data && (o = f.url += (dt.test(o) ? "&" : "?") + f.data, delete f.data), f.cache === !1 && (f.url = pt.test(o) ? o.replace(pt, "$1_=" + ct++) : o + (dt.test(o) ? "&" : "?") + "_=" + ct++)), f.ifModified && (p.lastModified[o] && T.setRequestHeader("If-Modified-Since", p.lastModified[o]), p.etag[o] && T.setRequestHeader("If-None-Match", p.etag[o])), (f.data && f.hasContent && f.contentType !== !1 || n.contentType) && T.setRequestHeader("Content-Type", f.contentType), T.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + xt + "; q=0.01" : "") : f.accepts["*"]);
            for (d in f.headers) T.setRequestHeader(d, f.headers[d]);
            if (f.beforeSend && (f.beforeSend.call(h, T, f) === !1 || 2 === w)) return T.abort();
            C = "abort";
            for (d in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) T[d](f[d]);
            if (i = Tt(bt, f, n, T)) {
                if (T.readyState = 1, c && v.trigger("ajaxSend", [T, f]), 2 === w) return T;
                f.async && f.timeout > 0 && (u = e.setTimeout(function() {
                    T.abort("timeout")
                }, f.timeout));
                try {
                    w = 1, i.send(b, k)
                } catch (E) {
                    if (!(2 > w)) throw E;
                    k(-1, E)
                }
            } else k(-1, "No Transport");

            function k(t, n, r, s) {
                var l, d, b, x, C, E = n;
                2 !== w && (w = 2, u && e.clearTimeout(u), i = void 0, a = s || "", T.readyState = t > 0 ? 4 : 0, l = t >= 200 && 300 > t || 304 === t, r && (x = kt(f, T, r)), x = St(f, x, T, l), l ? (f.ifModified && (C = T.getResponseHeader("Last-Modified"), C && (p.lastModified[o] = C), C = T.getResponseHeader("etag"), C && (p.etag[o] = C)), 204 === t || "HEAD" === f.type ? E = "nocontent" : 304 === t ? E = "notmodified" : (E = x.state, d = x.data, b = x.error, l = !b)) : (b = E, !t && E || (E = "error", 0 > t && (t = 0))), T.status = t, T.statusText = (n || E) + "", l ? m.resolveWith(h, [d, E, T]) : m.rejectWith(h, [T, E, b]), T.statusCode(y), y = void 0, c && v.trigger(l ? "ajaxSuccess" : "ajaxError", [T, f, l ? d : b]), g.fireWith(h, [T, E]), c && (v.trigger("ajaxComplete", [T, f]), --p.active || p.event.trigger("ajaxStop")))
            }
            return T
        },
        getJSON: function(e, t, n) {
            return p.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return p.get(e, void 0, t, "script")
        }
    }), p.each(["get", "post"], function(e, t) {
        p[t] = function(e, n, r, i) {
            return p.isFunction(n) && (i = i || r, r = n, n = void 0), p.ajax(p.extend({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            }, p.isPlainObject(e) && e))
        }
    }), p._evalUrl = function(e) {
        return p.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, p.fn.extend({
        wrapAll: function(e) {
            var t;
            return p.isFunction(e) ? this.each(function(t) {
                p(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = p(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                var e = this;
                while (e.firstElementChild) e = e.firstElementChild;
                return e
            }).append(this)), this)
        },
        wrapInner: function(e) {
            return p.isFunction(e) ? this.each(function(t) {
                p(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = p(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = p.isFunction(e);
            return this.each(function(n) {
                p(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                p.nodeName(this, "body") || p(this).replaceWith(this.childNodes)
            }).end()
        }
    }), p.expr.filters.hidden = function(e) {
        return !p.expr.filters.visible(e)
    }, p.expr.filters.visible = function(e) {
        return e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0
    };
    var jt = /%20/g,
        Nt = /\[\]$/,
        Dt = /\r?\n/g,
        At = /^(?:submit|button|image|reset|file)$/i,
        Mt = /^(?:input|select|textarea|keygen)/i;

    function Pt(e, t, n, r) {
        var i;
        if (p.isArray(t)) p.each(t, function(t, i) {
            n || Nt.test(e) ? r(e, i) : Pt(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
        });
        else if (n || "object" !== p.type(t)) r(e, t);
        else
            for (i in t) Pt(e + "[" + i + "]", t[i], n, r)
    }
    p.param = function(e, t) {
        var n, r = [],
            i = function(e, t) {
                t = p.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (void 0 === t && (t = p.ajaxSettings && p.ajaxSettings.traditional), p.isArray(e) || e.jquery && !p.isPlainObject(e)) p.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (n in e) Pt(n, e[n], t, i);
        return r.join("&").replace(jt, "+")
    }, p.fn.extend({
        serialize: function() {
            return p.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = p.prop(this, "elements");
                return e ? p.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !p(this).is(":disabled") && Mt.test(this.nodeName) && !At.test(e) && (this.checked || !Y.test(e))
            }).map(function(e, t) {
                var n = p(this).val();
                return null == n ? null : p.isArray(n) ? p.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Dt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(Dt, "\r\n")
                }
            }).get()
        }
    }), p.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    };
    var Lt = {
            0: 200,
            1223: 204
        },
        qt = p.ajaxSettings.xhr();
    d.cors = !!qt && "withCredentials" in qt, d.ajax = qt = !!qt, p.ajaxTransport(function(t) {
        var n, r;
        return d.cors || qt && !t.crossDomain ? {
            send: function(i, o) {
                var a, s = t.xhr();
                if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                    for (a in t.xhrFields) s[a] = t.xhrFields[a];
                t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                for (a in i) s.setRequestHeader(a, i[a]);
                n = function(e) {
                    return function() {
                        n && (n = r = s.onload = s.onerror = s.onabort = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Lt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                            binary: s.response
                        } : {
                            text: s.responseText
                        }, s.getAllResponseHeaders()))
                    }
                }, s.onload = n(), r = s.onerror = n("error"), void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function() {
                    4 === s.readyState && e.setTimeout(function() {
                        n && r()
                    })
                }, n = n("abort");
                try {
                    s.send(t.hasContent && t.data || null)
                } catch (u) {
                    if (n) throw u
                }
            },
            abort: function() {
                n && n()
            }
        } : void 0
    }), p.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return p.globalEval(e), e
            }
        }
    }), p.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), p.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(i, o) {
                    t = p("<script>").prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(), n = null, e && o("error" === e.type ? 404 : 200, e.type)
                    }), r.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var Ht = [],
        Ot = /(=)\?(?=&|$)|\?\?/;
    p.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Ht.pop() || p.expando + "_" + ct++;
            return this[e] = !0, e
        }
    }), p.ajaxPrefilter("json jsonp", function(t, n, r) {
        var i, o, a, s = t.jsonp !== !1 && (Ot.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Ot.test(t.data) && "data");
        return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = p.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Ot, "$1" + i) : t.jsonp !== !1 && (t.url += (dt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
            return a || p.error(i + " was not called"), a[0]
        }, t.dataTypes[0] = "json", o = e[i], e[i] = function() {
            a = arguments
        }, r.always(function() {
            void 0 === o ? p(e).removeProp(i) : e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, Ht.push(i)), a && p.isFunction(o) && o(a[0]), a = o = void 0
        }), "script") : void 0
    }), p.parseHTML = function(e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || r;
        var i = T.exec(e),
            o = !n && [];
        return i ? [t.createElement(i[1])] : (i = ne([e], t, o), o && o.length && p(o).remove(), p.merge([], i.childNodes))
    };
    var Ft = p.fn.load;
    p.fn.load = function(e, t, n) {
        if ("string" != typeof e && Ft) return Ft.apply(this, arguments);
        var r, i, o, a = this,
            s = e.indexOf(" ");
        return s > -1 && (r = p.trim(e.slice(s)), e = e.slice(0, s)), p.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), a.length > 0 && p.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments, a.html(r ? p("<div>").append(p.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, o || [e.responseText, t, e])
            })
        }), this
    }, p.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        p.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), p.expr.filters.animated = function(e) {
        return p.grep(p.timers, function(t) {
            return e === t.elem
        }).length
    };

    function It(e) {
        return p.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }
    p.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, a, s, u, l, c = p.css(e, "position"),
                d = p(e),
                f = {};
            "static" === c && (e.style.position = "relative"), s = d.offset(), o = p.css(e, "top"), u = p.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1, l ? (r = d.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), p.isFunction(t) && (t = t.call(e, n, p.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : d.css(f)
        }
    }, p.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                p.offset.setOffset(this, e, t)
            });
            var t, n, r = this[0],
                i = {
                    top: 0,
                    left: 0
                },
                o = r && r.ownerDocument;
            if (o) return t = o.documentElement, p.contains(t, r) ? (i = r.getBoundingClientRect(), n = It(o), {
                top: i.top + n.pageYOffset - t.clientTop,
                left: i.left + n.pageXOffset - t.clientLeft
            }) : i
        },
        position: function() {
            if (this[0]) {
                var e, t, n = this[0],
                    r = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === p.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), p.nodeName(e[0], "html") || (r = e.offset()), r.top += p.css(e[0], "borderTopWidth", !0), r.left += p.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - r.top - p.css(n, "marginTop", !0),
                    left: t.left - r.left - p.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent;
                while (e && "static" === p.css(e, "position")) e = e.offsetParent;
                return e || Ae
            })
        }
    }), p.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = "pageYOffset" === t;
        p.fn[e] = function(r) {
            return O(this, function(e, r, i) {
                var o = It(e);
                return void 0 === i ? o ? o[t] : e[r] : void(o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i)
            }, e, r, arguments.length)
        }
    }), p.each(["top", "left"], function(e, t) {
        p.cssHooks[t] = Pe(d.pixelPosition, function(e, n) {
            return n ? (n = Me(e, t), je.test(n) ? p(e).position()[t] + "px" : n) : void 0
        })
    }), p.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        p.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            p.fn[r] = function(r, i) {
                var o = arguments.length && (n || "boolean" != typeof r),
                    a = n || (r === !0 || i === !0 ? "margin" : "border");
                return O(this, function(t, n, r) {
                    var i;
                    return p.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? p.css(t, n, a) : p.style(t, n, r, a)
                }, t, o ? r : void 0, o, null)
            }
        })
    }), p.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        },
        size: function() {
            return this.length
        }
    }), p.fn.andSelf = p.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return p
    });
    var Rt = e.jQuery,
        _t = e.$;
    return p.noConflict = function(t) {
        return e.$ === p && (e.$ = _t), t && e.jQuery === p && (e.jQuery = Rt), p
    }, t || (e.jQuery = e.$ = p), p
});
(function e(t, n, r) {
    function i(a, s) {
        if (!n[a]) {
            if (!t[a]) {
                var u = typeof require == "function" && require;
                if (!s && u) return u(a, !0);
                if (o) return o(a, !0);
                var l = new Error("Cannot find module '" + a + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var c = n[a] = {
                exports: {}
            };
            t[a][0].call(c.exports, function(e) {
                var n = t[a][1][e];
                return i(n ? n : e)
            }, c, c.exports, e, t, n, r)
        }
        return n[a].exports
    }
    var o = typeof require == "function" && require;
    for (var a = 0; a < r.length; a++) i(r[a]);
    return i
})({
    1: [function(e, t, n) {
        "use strict";
        var r = e("./legacy-sagepay.js");
        window.Sagepay = r.Sagepay
    }, {
        "./legacy-sagepay.js": 4
    }],
    2: [function(e, t, n) {
        "use strict";
        var r = e("./modules/page-objects/hosted-page.js");
        var i = e("./sagepay-dropin.js");
        var o = e("./sagepay-own-form.js");
        window.HostedPage = r.HostedPage;
        window.sagepayCheckout = i.sagepayCheckout;
        window.sagepayDropin = i.sagepayCheckout;
        window.sagepayOwnForm = o.sagepayOwnForm
    }, {
        "./modules/page-objects/hosted-page.js": 11,
        "./sagepay-dropin.js": 23,
        "./sagepay-own-form.js": 24
    }],
    3: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });
        var r = n.Constants = {
            iFrameId: "payment-iframe",
            initialContainerHeight: "164px",
            helpDialogElementSelector: "#cvc-help-content",
            apiRoot: "/api/v1",
            cardIdentifierEndpoint: "/card-identifiers",
            events: {
                hostedPageLoaded: "hosted-page-loaded",
                hostedPageUpdated: "hosted-page-loaded",
                tokenisationRequested: "tokenisation-requested",
                tokenisationCompleted: "tokenisation-completed"
            }
        }
    }, {}],
    4: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });
        n.Sagepay = undefined;
        var r = e("./constants.js");
        var i = jQuery.noConflict();
        var o = n.Sagepay = {
            tokeniseCardDetails: function a(e, t) {
                console.log("enter tokeniseCardDetails");
                var n = i('input[data-sagepay="merchantSessionKey"]', e).val();
                var o = i('input[data-sagepay="cardholderName"]', e).val();
                var a = i('input[data-sagepay="cardNumber"]', e).val();
                var s = i('input[data-sagepay="expiryDate"]', e).val();
                var u = i('input[data-sagepay="securityCode"]', e).val();
                var l = {
                    cardDetails: {
                        cardholderName: o,
                        cardNumber: a,
                        expiryDate: s,
                        securityCode: u
                    }
                };
                var c = (SagePayConfig && SagePayConfig.restHost ? SagePayConfig.restHost : "") + r.Constants.apiRoot + r.Constants.cardIdentifierEndpoint;
                i.ajax({
                    type: "POST",
                    url: c,
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(l),
                    headers: {
                        Authorization: "Bearer " + n
                    },
                    async: true
                }).done(function(e, n, r) {
                    t(r.status, e)
                }).fail(function(e) {
                    t(e.status, e)
                }).always(function() {})
            },
            generatePaymentForm: function s(e, t) {
                var n = i("<form/>", {
                    id: "payment",
                    action: "/payment",
                    method: "POST",
                    "class": "form-horizontal"
                }).submit(function(e) {
                    e.preventDefault();
                    var t = i(this);
                    t.find(".submit").prop("disabled", true);
                    o.tokeniseCardDetails(t, o.sagepayResponseHandler)
                });
                n.append(i("<span/>", {
                    "class": "text-danger errors"
                }));
                n.append(i("<input>", {
                    type: "hidden",
                    value: t
                }).attr("data-sagepay", "merchantSessionKey"));
                var r = ["cardholderName", "cardNumber", "expiryDate", "securityCode", "amount", "currency"];
                for (var a = 0; a < r.length; a++) {
                    var s = i("<div/>", {
                        name: "cardDetails." + r[a],
                        "class": "form-group"
                    });
                    s.append(i("<label>", {
                        "class": "col-sm-3 control-label"
                    }).text(r[a]));
                    var u = i("<div/>", {
                        "class": "col-sm-5"
                    });
                    u.append(i("<input/>", {
                        type: "text",
                        "class": "form-control"
                    }).attr("data-sagepay", r[a]));
                    u.append(i("<span></span>", {
                        "class": "error text-danger"
                    }));
                    s.append(u);
                    n.append(s)
                }
                var l = i("<div/>", {
                    name: "submit",
                    "class": "form-group"
                });
                l.append(i("<div>", {
                    "class": "col-sm-offset-3 col-sm-3"
                }).append(i("<button/>", {
                    "class": "btn btn-default",
                    type: "submit"
                }).text("Submit Payment")));
                n.append(l);
                i(e).html(n)
            },
            sagepayResponseHandler: function u(e, t) {
                console.log(e, t);
                var n = i("#payment");
                i("div.form-group", n).removeClass("has-error");
                i("span.error", n).html("");
                n.find(".submit").prop("disabled", false);
                if (e === 201) {
                    var r = t["cardIdentifier"];
                    i("<form>").attr("action", n.attr("action")).attr("method", n.attr("method")).append(i('<input type="hidden" name="amount" >').val(i('input[data-sagepay="amount"]', n).val())).append(i('<input type="hidden" name="currency" >').val(i('input[data-sagepay="currency"]', n).val())).append(i('<input type="hidden" name="merchantSessionKey" >').val(i('input[data-sagepay="merchantSessionKey"]', n).val())).append(i('<input type="hidden" name="cardIdentifier" >').val(r)).appendTo(i(document.body)).submit()
                } else {
                    var o = t.responseJSON;
                    if (o.errors === undefined) {
                        n.find(".errors").html(o.description)
                    } else {
                        var a = o.errors;
                        for (var s = 0; s < a.length; ++s) {
                            var u = i("div[name='" + a[s].property + "']", n);
                            u.addClass("has-error");
                            i("span.error", u).html(a[s].description)
                        }
                    }
                }
            }
        }
    }, {
        "./constants.js": 3
    }],
    5: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });
        var r = n.Formatting = {
            fieldFormatter: function i(e, t) {
                function n(e) {
                    var n = e.fieldElement;
                    n.removeAttribute("title");
                    n.classList.remove("invalid");
                    var r = n.parentElement;
                    r.classList.remove("invalid");
                    var i = r.querySelector(".error-message");
                    if (i) {
                        r.removeChild(i)
                    }
                    t()
                }

                function r(r) {
                    var i = r.fieldElement,
                        o = r.message,
                        a = r.context;
                    n({
                        fieldElement: i
                    });
                    i.setAttribute("title", o);
                    switch (a) {
                        case "blur":
                            {
                                i.classList.add("invalid");
                                break
                            }
                        case "submit":
                            {
                                i.classList.add("invalid");
                                var s = i.parentElement;s.classList.add("invalid");
                                var u = e.ownerDocument.createElement("div");u.className = "error-message";u.innerHTML = i.getAttribute("title");s.appendChild(u);
                                break
                            }
                        default:
                            break
                    }
                    t()
                }
                return {
                    clearValidationFormatting: n,
                    formatFieldAsInvalid: r
                }
            }
        }
    }, {}],
    6: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });
        n.HelpDialog = undefined;
        var r = e("../utils/utils.js");
        var i = 1e4;
        var o = 10;
        var a = 60;
        var s = -3;
        var u = "help-dialog-id";
        var l = "help-dialog";
        var c = "help-dialog-left-callout";
        var d = "help-dialog-content";
        var f = "hidden";

        function p(e) {
            return e.classList.contains(f)
        }

        function h(e) {
            return !p(e)
        }

        function v(e) {
            e.classList.add(f);
            var t = e.querySelectorAll("*");
            for (var n = 0; n < t.length; n++) {
                t[n].classList.add(f)
            }
        }

        function m(e) {
            e.classList.remove(f);
            var t = e.querySelectorAll("*");
            for (var n = 0; n < t.length; n++) {
                t[n].classList.remove(f)
            }
        }

        function g(e) {
            e.classList.add(l);
            var t = document.createElement("div");
            t.classList.add(c);
            e.appendChild(t);
            var n = document.createElement("div");
            n.classList.add(d);
            e.appendChild(n);
            v(e)
        }

        function y(e, t, n) {
            var r = e.querySelector("." + c);
            r.style.left = t + "px";
            r.style.top = n + "px";
            var i = e.querySelector("." + d);
            i.style.left = t + o + "px";
            i.style.top = n - a + "px"
        }

        function b(e) {
            if (h(e)) {
                v(e)
            }
            if (e.hideTimeout) {
                clearTimeout(e.hideTimeout)
            }
        }
        var x = n.HelpDialog = {
            create: function w(e, t, n) {
                var o = t.contentSource;
                if (!e) {
                    throw new Error("Help dialog target not specified")
                }
                var a = e.getAttribute("data-" + u);
                var l = void 0;
                if (!a || a && !n.getElementById(a)) {
                    a = (0, r.uuid)();
                    l = n.createElement("div");
                    l.id = a;
                    g(l);
                    n.body.appendChild(l);
                    e.setAttribute("data-" + u, a);
                    e.addEventListener("click", function(e) {
                        if (p(l)) {
                            m(l);
                            var t = e.target.getBoundingClientRect();
                            y(l, t.right, t.top + s);
                            l.hideTimeout = setTimeout(function() {
                                b(l)
                            }, i)
                        } else {
                            b(l)
                        }
                        e.stopPropagation()
                    }, false);
                    n.body.addEventListener("click", function() {
                        b(l)
                    }, false)
                } else {
                    l = n.getElementById(a)
                }
                if (o) {
                    var c = n.querySelector(o);
                    l.querySelector("." + d).innerHTML = c.innerHTML
                }
            },
            update: function C(e, t, n) {
                var r = t.action;
                if (e) {
                    var i = e.getAttribute("data-" + u);
                    var o = n.getElementById(i);
                    if (r === "hide") {
                        b(o)
                    }
                }
            }
        }
    }, {
        "../utils/utils.js": 16
    }],
    7: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });
        var r = n.IFrameGenerator = {
            appendFrame: function i(e) {
                var t = e.container,
                    n = e.iFrameId,
                    r = e.iFrameSource;
                var i = t.ownerDocument.createElement("iframe");
                i.setAttribute("id", n);
                if (r) {
                    i.setAttribute("src", r)
                }
                i.setAttribute("scrolling", "no");
                i.setAttribute("style", "border:0;width:100%");
                return t.appendChild(i)
            }
        }
    }, {}],
    8: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });

        function r(e) {
            var t = null;
            ["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"].some(function(n) {
                if (typeof e[n] === "function") {
                    t = n;
                    return true
                }
                return false
            });
            return t
        }

        function i(e, t) {
            var n = null;
            var i = e;
            while (i !== null) {
                n = i.parentElement;
                if (n !== null && n[r(n)](t)) {
                    break
                }
                i = n
            }
            return n
        }
        var o = n.Polyfill = {
            closest: function a(e, t) {
                if (e.closest) {
                    return e.closest(t)
                }
                return i(e, t)
            }
        }
    }, {}],
    9: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });
        var r = n.Styler = {
            setCss: function i() {
                var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                    t = e.target,
                    n = e.style;
                if (t === undefined || t === null) {
                    throw new Error('"target" is a required parameter of Styler')
                }
                var r = t instanceof Array ? t : [t];
                r.forEach(function(e) {
                    for (var t in n) {
                        if (n.hasOwnProperty(t)) {
                            e.style[t] = n[t]
                        }
                    }
                })
            }
        }
    }, {}],
    10: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });
        var r = n.Messaging = {
            frameMessenger: function i() {
                var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                    t = e.source,
                    n = e.targetDomain;
                if (!t) {
                    throw new Error("frameMessenger source must not be null")
                }
                var r = {};

                function i(e) {
                    var t = e.message,
                        r = e.target;
                    r.postMessage(t, n)
                }

                function o(e) {
                    if (n !== "*" && e.origin !== n) {
                        throw new Error("Message is not from trusted origin")
                    }
                    var t = e.data,
                        i = t.type,
                        o = t.payload;
                    if (r.hasOwnProperty(i)) {
                        r[i].forEach(function(e) {
                            return e(o)
                        })
                    }
                }

                function a(e) {
                    var t = e.type,
                        n = e.handler;
                    if (!r[t]) {
                        r[t] = []
                    }
                    r[t].push(n);
                    return this
                }

                function s() {
                    t.removeEventListener("message", o, false)
                }

                function u() {
                    t.addEventListener("message", o, false)
                }
                return {
                    sendMessage: i,
                    addMessageHandler: a,
                    enableMessageEventListener: u,
                    disableMessageEventListener: s
                }
            }
        }
    }, {}],
    11: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });
        n.HostedPage = n.HostedPageEventHandlers = undefined;
        var r = e("../../constants.js");
        var i = e("../validation/form-validator.js");
        var o = e("../dom-helpers/field-formatter.js");
        var a = e("../messaging/frame-messenger.js");
        var s = e("../dom-helpers/help-dialog.js");
        var u = e("../tokenisation/card-tokeniser.js");
        var l = e("../validation/validator.js");
        var c = r.Constants.events;
        var d = "#card-details-form";
        var f = "#cvc-help";
        var p = "cardholder-name";
        var h = "card-number";
        var v = "expiry-date";
        var m = "security-code";
        var g = new u.CardTokeniser({
            config: SagePayConfig
        });
        var y = {
            cardholderName: {
                fieldName: p,
                fullName: "cardholder name",
                validationType: "full-name"
            },
            cardNumber: {
                fieldName: h,
                fullName: "card number",
                validationType: "card-number"
            },
            expiryDate: {
                fieldName: v,
                fullName: "expiry date",
                validationType: "card-date"
            },
            securityCode: {
                fieldName: m,
                fullName: "security code",
                validationType: "card-security-code"
            }
        };

        function b(e) {
            return e.document.querySelector(d)
        }

        function x(e, t) {
            return e.querySelector("[name='" + t + "']")
        }

        function w() {
            return Object.keys(y).map(function(e) {
                return y[e]
            })
        }

        function C(e) {
            return e.document.querySelector(f)
        }

        function T(e) {
            var t = {};
            Object.keys(y).forEach(function(n) {
                var r = x(e, y[n].fieldName);
                if (r !== null) {
                    t[n] = r.value
                }
            });
            return t
        }

        function E(e) {
            var t = e.document.documentElement.getBoundingClientRect().height;
            return {
                height: t + "px",
                windowId: e.uniqueId
            }
        }

        function k(e, t, n, r, i) {
            t.enableMessageEventListener();
            t.addMessageHandler({
                type: c.tokenisationRequested,
                handler: function o(a) {
                    var s = a.merchantSessionKey,
                        u = a.reusableCardIdentifier;
                    i({
                        merchantSessionKey: s,
                        reusableCardIdentifier: u,
                        frmValidator: n,
                        fieldFormatter: r,
                        messenger: t,
                        window: e
                    })
                }
            })
        }
        var S = n.HostedPageEventHandlers = {
            setup: function N(e) {
                var t = e.messenger,
                    n = e.pageWindow,
                    r = e.tokeniser;

                function i(e) {
                    t.sendMessage({
                        target: n.parent,
                        message: {
                            type: e,
                            payload: E(n)
                        }
                    })
                }
                return {
                    pageReadyEventHandler: function o() {
                        i(c.hostedPageLoaded)
                    },
                    validationCompletedEventHandler: function a() {
                        i(c.hostedPageUpdated);
                        s.HelpDialog.update(C(n), {
                            action: "hide"
                        }, n.document)
                    },
                    tokenisationRequestedEventHandler: function u(e) {
                        var o = e.merchantSessionKey,
                            a = e.reusableCardIdentifier,
                            s = e.frmValidator,
                            u = e.fieldFormatter;
                        if (!l.Validator.validateUuid(o).valid) {
                            throw new Error("Merchant session key provided for tokenisation is invalid")
                        }
                        if (a !== undefined && !l.Validator.validateUuid(a).valid) {
                            throw new Error("Reusable card identifier provided for tokenisation is invalid")
                        }
                        var d = b(n);
                        var f = s.triggerFormValidation();
                        var p = n.parent;
                        if (f) {
                            r.tokenise({
                                merchantSessionKey: o,
                                reusableCardIdentifier: a,
                                cardDetails: T(d),
                                success: function h(e) {
                                    var n = e.cardIdentifier;
                                    return t.sendMessage({
                                        target: p,
                                        message: {
                                            type: c.tokenisationCompleted,
                                            payload: {
                                                success: true,
                                                cardIdentifier: n
                                            }
                                        }
                                    })
                                },
                                clientError: function v(e) {
                                    return e.forEach(function(e) {
                                        u.formatFieldAsInvalid({
                                            fieldElement: x(d, e.field),
                                            message: e.message,
                                            context: "submit"
                                        })
                                    })
                                },
                                serverError: function m(e) {
                                    var n = e.httpErrorCode,
                                        r = e.code,
                                        i = e.description;
                                    t.sendMessage({
                                        target: p,
                                        message: {
                                            type: c.tokenisationCompleted,
                                            payload: {
                                                success: false,
                                                error: {
                                                    httpCode: n,
                                                    errorCode: r,
                                                    errorMessage: i
                                                }
                                            }
                                        }
                                    })
                                },
                                timeoutError: function g() {
                                    t.sendMessage({
                                        target: p,
                                        message: {
                                            type: c.tokenisationCompleted,
                                            payload: {
                                                success: false,
                                                error: {
                                                    httpCode: 0,
                                                    errorCode: "C001",
                                                    errorMessage: "Client request timeout"
                                                }
                                            }
                                        }
                                    })
                                },
                                networkError: function y() {
                                    t.sendMessage({
                                        target: p,
                                        message: {
                                            type: c.tokenisationCompleted,
                                            payload: {
                                                success: false,
                                                error: {
                                                    httpCode: 0,
                                                    errorCode: "C002",
                                                    errorMessage: "Network error"
                                                }
                                            }
                                        }
                                    })
                                }
                            })
                        }
                        i(c.hostedPageUpdated)
                    }
                }
            }
        };
        var j = n.HostedPage = function() {
            function e() {
                var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                    t = e.targetDomain,
                    n = e.pageWindow,
                    u = n === undefined ? window : n,
                    l = e.delayedLoad,
                    c = l === undefined ? false : l;
                var d = a.Messaging.frameMessenger({
                    source: u,
                    targetDomain: t
                });
                var f = S.setup({
                    messenger: d,
                    pageWindow: u,
                    tokeniser: g
                });
                var p = new RegExp(SagePayConfig.pages.reusableCardIdentifier + "$").test(u.location.href);
                var h = i.FormValidation.createValidator({
                    form: b(u),
                    fieldsInfo: w(),
                    onValidate: f.validationCompletedEventHandler,
                    forReusableTokens: p
                });
                var v = o.Formatting.fieldFormatter(b(u), f.validationCompletedEventHandler);
                k(u, d, h, v, f.tokenisationRequestedEventHandler);
                var m = u.document.querySelector(r.Constants.helpDialogElementSelector);
                if (m) {
                    s.HelpDialog.create(C(u), {
                        contentSource: r.Constants.helpDialogElementSelector
                    }, u.document)
                }
                if (c) {
                    f.pageReadyEventHandler()
                } else {
                    window.addEventListener("load", f.pageReadyEventHandler, false)
                }
            }
            return {
                setup: e
            }
        }()
    }, {
        "../../constants.js": 3,
        "../dom-helpers/field-formatter.js": 5,
        "../dom-helpers/help-dialog.js": 6,
        "../messaging/frame-messenger.js": 10,
        "../tokenisation/card-tokeniser.js": 13,
        "../validation/form-validator.js": 20,
        "../validation/validator.js": 22
    }],
    12: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });
        n.ParentPage = undefined;
        var r = e("../../constants.js");
        var i = e("../dom-helpers/styler.js");
        var o = e("../dom-helpers/iframe-generator.js");
        var a = e("../dom-helpers/polyfill.js");
        var s = e("../messaging/frame-messenger.js");
        var u = e("../tokenisation/tokenisation-result-injector.js");
        var l = r.Constants.events;

        function c(e) {
            var t = e.target,
                n = e.height,
                o = n === undefined ? r.Constants.initialContainerHeight : n;
            i.Styler.setCss({
                target: t,
                style: {
                    height: o
                }
            })
        }

        function d(e) {
            var t = e.messenger,
                n = e.iFrame,
                r = e.container;

            function i(e) {
                var t = e.height;
                c({
                    target: [n, r],
                    height: t
                })
            }
            t.enableMessageEventListener();
            t.addMessageHandler({
                type: l.hostedPageUpdated,
                handler: i
            });
            t.addMessageHandler({
                type: l.hostedPageLoaded,
                handler: i
            })
        }

        function f(e) {
            var t = e.messenger,
                n = e.onTokenise;
            t.addMessageHandler({
                type: l.tokenisationCompleted,
                handler: n
            })
        }

        function p(e, t, n) {
            function r() {
                var e = n ? SagePayConfig.pages.reusableCardIdentifier : SagePayConfig.pages.standardCardDetails;
                return "" + SagePayConfig.restBaseURL + SagePayConfig.hostedPagesSubPath + "/" + e
            }
            var i = SagePayConfig.restBaseURL && SagePayConfig.hostedPagesSubPath ? r() : null;
            return o.IFrameGenerator.appendFrame({
                container: e,
                iFrameId: t,
                iFrameSource: i
            })
        }

        function h(e) {
            var t = e.messenger,
                n = e.frameWindow,
                r = e.merchantSessionKey,
                i = e.reusableCardIdentifier;
            t.sendMessage({
                target: n,
                message: {
                    type: l.tokenisationRequested,
                    payload: {
                        merchantSessionKey: r,
                        reusableCardIdentifier: i
                    }
                }
            })
        }

        function v(e) {
            return typeof e === "string" ? document.querySelector(e) : e()
        }
        var m = n.ParentPage = function() {
            var e = r.Constants.iFrameId;
            var t = void 0;
            var n = void 0;
            var i = void 0;
            var o = void 0;
            var l = void 0;
            var m = void 0;
            var g = void 0;

            function y(r) {
                var y = r.containerSelector,
                    b = r.onTokenise,
                    x = r.merchantSessionKey,
                    w = r.reusableCardIdentifier,
                    C = r.pageWindow,
                    T = C === undefined ? window : C;
                i = null;
                o = null;
                l = null;
                m = null;
                g = null;
                t = T;
                n = t.document;
                i = n.getElementById(e);
                o = typeof y === "string" ? n.querySelector(y) : y();
                l = o.style.height;
                m = s.Messaging.frameMessenger({
                    source: t,
                    targetDomain: SagePayConfig.restHost
                });
                if (i !== null) {
                    throw new Error("Parent page already initialised. Please call destroy method before initialising")
                }
                i = p(o, e, w);
                c({
                    target: [i, o]
                });
                d({
                    messenger: m,
                    iFrame: i,
                    container: o
                });
                if (b) {
                    g = b;
                    f({
                        messenger: m,
                        onTokenise: g
                    })
                }

                function E() {
                    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                        t = e.key,
                        n = t === undefined ? x : t;
                    h({
                        messenger: m,
                        frameWindow: i.contentWindow,
                        merchantSessionKey: n,
                        reusableCardIdentifier: w
                    })
                }

                function k(e) {
                    var t = e ? v(e) : a.Polyfill.closest(o, "form");
                    if (!g) {
                        g = function n(e) {
                            u.TokenisationResultInjector.injectCardTokenisationResult(t, e);
                            t.submit()
                        };
                        f({
                            messenger: m,
                            onTokenise: g
                        })
                    }
                    t.addEventListener("submit", function(e) {
                        e.preventDefault();
                        E()
                    })
                }

                function S() {
                    m.disableMessageEventListener();
                    i.parentNode.removeChild(i);
                    o.style.height = l
                }

                function j() {
                    return o
                }
                return {
                    destroy: S,
                    bindForm: k,
                    tokenise: E,
                    getContainer: j
                }
            }
            return {
                setup: y
            }
        }()
    }, {
        "../../constants.js": 3,
        "../dom-helpers/iframe-generator.js": 7,
        "../dom-helpers/polyfill.js": 8,
        "../dom-helpers/styler.js": 9,
        "../messaging/frame-messenger.js": 10,
        "../tokenisation/tokenisation-result-injector.js": 15
    }],
    13: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });
        n.CardTokeniser = undefined;
        var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || false;
                    r.configurable = true;
                    if ("value" in r) r.writable = true;
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                if (n) e(t.prototype, n);
                if (r) e(t, r);
                return t
            }
        }();
        var i = e("../../constants.js");
        var o = e("./poster.js");
        var a = e("../utils/utils.js");

        function s(e, t) {
            if (!(e instanceof t)) {
                throw new TypeError("Cannot call a class as a function")
            }
        }
        var u = 0;

        function l(e, t, n) {
            var r = e.indexOf(".") >= 0 ? e.split(".")[1] : e;
            var i = (0, a.kebabise)(r);
            return {
                field: i,
                message: t,
                code: n
            }
        }
        var c = n.CardTokeniser = function() {
            function e(t) {
                var n = t.config,
                    r = t.poster,
                    i = r === undefined ? o.Poster : r;
                s(this, e);
                this.config = n;
                this.poster = i
            }
            r(e, [{
                key: "tokenise",
                value: function t(e) {
                    var t = e.merchantSessionKey,
                        n = e.reusableCardIdentifier,
                        r = e.cardDetails,
                        o = r.cardholderName,
                        a = r.cardNumber,
                        s = r.expiryDate,
                        c = r.securityCode,
                        d = e.success,
                        f = e.clientError,
                        p = e.serverError,
                        h = e.timeoutError,
                        v = e.networkError;
                    var m = (this.config && this.config.restHost ? this.config.restHost : "") + i.Constants.apiRoot + i.Constants.cardIdentifierEndpoint;
                    var g = n ? m + "/" + n + "/security-code" : m;
                    return this.poster.post({
                        uri: g,
                        authorisationHeader: "Bearer " + t,
                        data: n ? {
                            securityCode: c
                        } : {
                            cardDetails: {
                                cardholderName: o,
                                cardNumber: a,
                                expiryDate: s,
                                securityCode: c
                            }
                        },
                        success: function y(e) {
                            var t = e.responseData;
                            d(n ? {} : {
                                cardIdentifier: t.cardIdentifier,
                                expiry: t.expiry,
                                cardType: t.cardType
                            })
                        },
                        failure: function b(e) {
                            var t = e.timedOut,
                                n = e.networkFailed,
                                r = e.responseData,
                                i = e.httpErrorCode;
                            if (t === true) {
                                h()
                            } else if (n === true) {
                                v()
                            } else if (i === 422) {
                                var o = r.errors.map(function(e) {
                                    return l(e.property, e.clientMessage, e.code)
                                });
                                f(o, i)
                            } else if (i !== u) {
                                if (r) {
                                    p({
                                        httpErrorCode: i,
                                        code: r.code,
                                        description: r.description
                                    })
                                } else {
                                    p({
                                        httpErrorCode: i
                                    })
                                }
                            }
                        }
                    })
                }
            }]);
            return e
        }()
    }, {
        "../../constants.js": 3,
        "../utils/utils.js": 16,
        "./poster.js": 14
    }],
    14: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });
        var r = 4;
        var i = 30;

        function o(e) {
            try {
                return JSON.parse(e)
            } catch (t) {
                return null
            }
        }
        var a = n.Poster = {
            post: function s(e) {
                var t = e.uri,
                    n = e.data,
                    a = e.authorisationHeader,
                    s = e.success,
                    u = e.failure;
                var l = new XMLHttpRequest;
                l.open("post", t, true);
                l.timeout = i * 1e3;
                l.setRequestHeader("Content-Type", "application/json");
                if (a) {
                    l.setRequestHeader("Authorization", a)
                }
                l.addEventListener("readystatechange", function() {
                    if (l.readyState === r) {
                        var e = l.status === 204 ? {} : o(l.responseText);
                        if (l.status >= 200 && l.status < 300 && e !== null) {
                            s({
                                responseData: e
                            })
                        } else {
                            u({
                                responseData: e,
                                responseText: l.responseText,
                                httpErrorCode: l.status
                            })
                        }
                    }
                }, false);
                l.ontimeout = function() {
                    u({
                        timedOut: true
                    })
                };
                l.onerror = function() {
                    if (l.status === 0) {
                        u({
                            networkFailed: true
                        })
                    }
                };
                l.send(JSON.stringify(n))
            }
        }
    }, {}],
    15: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });

        function r(e, t, n) {
            var r = document.createElement("input");
            r.setAttribute("id", t);
            r.setAttribute("name", t);
            r.setAttribute("type", "hidden");
            r.setAttribute("value", n);
            e.appendChild(r)
        }

        function i(e, t) {
            r(e, "card-identifier", t)
        }

        function o(e) {
            var t = e.form,
                n = e.error;
            var i = n.httpCode,
                o = n.errorCode,
                a = n.errorMessage;
            if (i) {
                r(t, "card-identifier-http-code", i)
            }
            if (o) {
                r(t, "card-identifier-error-code", o)
            }
            if (a) {
                r(t, "card-identifier-error-message", a)
            }
        }
        var a = n.TokenisationResultInjector = {
            injectCardTokenisationResult: function s(e, t) {
                if (t.success) {
                    if (t.cardIdentifier) {
                        i(e, t.cardIdentifier)
                    }
                } else {
                    var n = t.error;
                    o({
                        form: e,
                        error: n
                    })
                }
            }
        }
    }, {}],
    16: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });
        n.uuid = r;
        n.kebabise = i;

        function r() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                var t = Math.random() * 16 | 0;
                var n = e === "x" ? t : t & 3 | 8;
                return n.toString(16)
            })
        }

        function i(e) {
            var t = e.match(/[A-Za-z][a-z]*/g);
            return t.map(function(e) {
                return e.charAt(0).toLowerCase() + e.substring(1)
            }).join("-")
        }
    }, {}],
    17: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });
        n.ApiValidator = undefined;
        var r = e("./validator.js");
        var i = n.ApiValidator = function() {
            function e(e, t) {
                var n = r.Validator.validateUuid(e);
                if (!n.valid) {
                    t.push(n.messageFor("Merchant session key"))
                }
            }

            function t(t, n) {
                if (t) {
                    e(t, n)
                }
            }

            function n(e) {
                var t = e.selector,
                    n = e.argumentName,
                    i = e.validationMessages;
                var o = r.Validator.validateBaseType(t, "string", "function");
                if (!o.valid) {
                    i.push(o.messageFor(n + " selector"))
                } else {
                    if (typeof t === "string") {
                        var a = r.Validator.validateCssSelector(t);
                        if (!a.valid) {
                            i.push(a.messageFor(n + " CSS selector"))
                        }
                    } else {
                        var s = r.Validator.validateInstanceType(t(), HTMLElement);
                        if (!s.valid) {
                            i.push(s.messageFor(n + " function selector result"))
                        }
                    }
                }
            }

            function i(e, t) {
                n({
                    selector: e,
                    argumentName: "Container",
                    validationMessages: t
                })
            }

            function o(e, t) {
                n({
                    selector: e,
                    argumentName: "Form",
                    validationMessages: t
                })
            }

            function a(e, t) {
                var n = r.Validator.validateBaseType(e, "function");
                if (!n.valid) {
                    t.push(n.messageFor("onTokenise"))
                }
            }

            function s(e, t) {
                var n = r.Validator.validateUuid(e);
                if (!n.valid) {
                    t.push(n.messageFor("Reusable card identifier"))
                }
            }

            function u() {
                var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                    n = t.merchantSessionKey,
                    r = t.containerSelector,
                    o = t.onTokenise,
                    u = t.reusableCardIdentifier;
                var l = [];
                e(n, l);
                i(r, l);
                if (o) {
                    a(o, l)
                }
                if (u) {
                    s(u, l)
                }
                if (l.length > 0) {
                    throw new Error("API parameters invalid\n - " + l.join("\n - "))
                }
            }

            function l() {
                var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                    n = t.merchantSessionKey,
                    r = t.onTokenise,
                    i = t.reusableCardIdentifier;
                var o = [];
                e(n, o);
                if (r) {
                    a(r, o)
                }
                if (i) {
                    s(i, o)
                }
                if (o.length > 0) {
                    throw new Error("API parameters invalid\n - " + o.join("\n - "))
                }
            }

            function c(e) {
                var t = e.formSelector;
                var n = [];
                o(t, n);
                if (n.length > 0) {
                    throw new Error("API parameters invalid\n - " + n.join("\n - "))
                }
            }

            function d(e) {
                var n = e.newMerchantSessionKey;
                var r = [];
                t(n, r);
                if (r.length > 0) {
                    throw new Error("API parameters invalid\n - " + r.join("\n - "))
                }
            }
            return {
                validateDropinSetupParameters: u,
                validateOwnFormSetupParameters: l,
                validateFormParameters: c,
                validateTokeniseParameters: d
            }
        }()
    }, {
        "./validator.js": 22
    }],
    18: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });

        function r(e, t) {
            if (!(e instanceof t)) {
                throw new TypeError("Cannot call a class as a function")
            }
        }
        var i = n.ErrorType = function o(e, t) {
            r(this, o);
            this.name = e;
            this.message = t
        }
    }, {}],
    19: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });
        n.ErrorTypes = undefined;
        var r = e("./error-type.js");
        var i = n.ErrorTypes = {
            invalidFormat: new r.ErrorType("invalid-format", function(e) {
                return e + " does not have a valid format"
            }),
            nullValue: new r.ErrorType("null-value", function(e) {
                return e + " cannot be null"
            }),
            undefinedValue: new r.ErrorType("undefined-value", function(e) {
                return e + " cannot be undefined"
            }),
            doesNotMatchAnyElement: new r.ErrorType("does-not-match-any-element", function(e) {
                return e + " does not match any element"
            }),
            matchesMoreThanOneElement: new r.ErrorType("matches-more-than-one-element", function(e) {
                return e + " matches more than one element"
            }),
            invalidType: new r.ErrorType("invalid-type", function(e) {
                return e + " does not belong to one of the expected types"
            }),
            expiryDateInThePast: new r.ErrorType("expiry-date-in-the-past", "This is not a valid expiry date"),
            cardNumberInvalid: new r.ErrorType("card-number-invalid", "This is not a valid card number")
        }
    }, {
        "./error-type.js": 18
    }],
    20: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });
        n.FormValidation = undefined;
        var r = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) {
                    if (Object.prototype.hasOwnProperty.call(n, r)) {
                        e[r] = n[r]
                    }
                }
            }
            return e
        };
        var i = e("./validator.js");
        var o = e("./input-limiter.js");
        var a = e("./../dom-helpers/field-formatter.js");
        var s = "This field is required";
        var u = {
            "full-name": {
                attributes: {
                    pattern: "^[a-zA-Z0-9Ã Ã¡Ã¢Ã¤Ã£Ã¥Ä…ÄÄ‡Ä™Ã¨Ã©ÃªÃ«Ä—Ä¯Ã¬Ã­Ã®Ã¯Å‚Å„Ã²Ã³Ã´Ã¶ÃµÃ¸Ã¹ÃºÃ»Ã¼Å³Å«Ã¿Ã½Å¼ÅºÃ±Ã§ÄÅ¡Å¾Ã€ÃÃ‚Ã„ÃƒÃ…Ä„Ä†ÄŒÄ–Ä˜ÃˆÃ‰ÃŠÃ‹ÃŒÃÃŽÃÄ®ÅÅƒÃ’Ã“Ã”Ã–Ã•Ã˜Ã™ÃšÃ›ÃœÅ²ÅªÅ¸ÃÅ»Å¹Ã‘ÃŸÃ‡Å’Ã†ÄŒÅ Å½âˆ‚Ã° /\\\\&-.']{1,50}$",
                    required: ""
                },
                errorMessages: {
                    valueMissing: function f() {
                        return s
                    },
                    patternMismatch: function p(e) {
                        return "The " + e + " is invalid"
                    }
                }
            },
            "card-number": {
                attributes: {
                    pattern: "^\\d{12,20}$",
                    required: ""
                },
                constraintType: "numeric",
                errorMessages: {
                    valueMissing: function h() {
                        return s
                    },
                    patternMismatch: function v(e) {
                        return "The " + e + " is invalid"
                    },
                    customError: function m(e) {
                        return "The " + e + " is invalid"
                    }
                },
                specialValidation: i.Validator.validateCardNumberWithLuhnCheck
            },
            "card-date": {
                attributes: {
                    pattern: "^(0[1-9]|1[012])\\d{2}$",
                    required: ""
                },
                constraintType: "numeric",
                errorMessages: {
                    valueMissing: function g() {
                        return s
                    },
                    patternMismatch: function y(e) {
                        return "The " + e + " needs to be in MMYY format"
                    },
                    customError: function b(e) {
                        return "The " + e + " needs to be a future date"
                    }
                },
                specialValidation: i.Validator.validateCardExpiryDate
            },
            "card-security-code": {
                attributes: {
                    pattern: "^\\d{3,4}$"
                },
                constraintType: "numeric",
                errorMessages: {
                    patternMismatch: function x(e) {
                        return "The " + e + " needs to be 3 or 4 digits long"
                    }
                }
            }
        };
        var l = {
            attributes: r({}, u["card-security-code"].attributes, {
                required: true
            }),
            constraintType: u["card-security-code"].constraintType,
            errorMessages: r({}, u["card-security-code"].errorMessages, {
                valueMissing: function w() {
                    return s
                }
            })
        };

        function c(e) {
            return r({}, u, e)
        }
        var d = n.FormValidation = {
            createValidator: function C(e) {
                var t = e.form,
                    n = e.fieldsInfo,
                    r = e.onValidate,
                    i = r === undefined ? function() {} : r,
                    s = e.forReusableTokens,
                    u = s === undefined ? false : s;
                var d = c(u ? {
                    "card-security-code": l
                } : null);
                var f = a.Formatting.fieldFormatter(t, i);

                function p(e) {
                    return n.filter(function(t) {
                        return t.fieldName === e
                    })[0]
                }

                function h(e) {
                    return t.querySelector("[name='" + e + "']")
                }

                function v(e, t, n) {
                    var r = t.errorMessages;
                    if (n.valueMissing) {
                        return r.valueMissing(e)
                    }
                    if (n.patternMismatch) {
                        return r.patternMismatch(e)
                    }
                    if (n.customError) {
                        return r.customError(e)
                    }
                    return "Validation error"
                }

                function m(e) {
                    var t = e.fieldName,
                        n = e.context;
                    var r = h(t);
                    if (r) {
                        var i = p(t);
                        var o = i.validationType;
                        if (!r.checkValidity()) {
                            var a = v(i.fullName, d[o], r.validity);
                            f.formatFieldAsInvalid({
                                fieldElement: r,
                                message: a,
                                context: n
                            })
                        } else {
                            f.clearValidationFormatting({
                                fieldElement: r
                            })
                        }
                    }
                }

                function g(e) {
                    var t = p(e);
                    var n = h(e);
                    if (n) {
                        var r = d[t.validationType].attributes;
                        if (r) {
                            Object.keys(r).forEach(function(e) {
                                if (r[e] !== null) {
                                    n.setAttribute(e, r[e])
                                }
                            })
                        }
                    }
                }

                function y(e) {
                    var t = h(e);
                    if (t) {
                        t.addEventListener("blur", function() {
                            return m({
                                fieldName: e,
                                context: "blur"
                            })
                        })
                    }
                }

                function b(e) {
                    var t = h(e);
                    if (t) {
                        var n = d[p(e).validationType];
                        var r = n.constraintType;
                        if (r) {
                            if (r === "numeric") {
                                t.addEventListener("keydown", o.InputLimiter.constrainInputToDigitsOnly, false)
                            }
                        }
                    }
                }

                function x(e) {
                    var t = h(e);
                    if (t) {
                        var n = d[p(e).validationType];
                        var r = n.specialValidation;
                        if (r) {
                            t.addEventListener("change", function i() {
                                var e = r(this.value);
                                if (e.valid) {
                                    this.setCustomValidity("")
                                } else {
                                    this.setCustomValidity(e.errorType.message)
                                }
                            })
                        }
                    }
                }

                function w() {
                    var e = t.checkValidity();
                    if (!e) {
                        n.forEach(function(e) {
                            m({
                                fieldName: e.fieldName,
                                context: "submit"
                            })
                        })
                    }
                    return e
                }

                function C(e) {
                    var t = p(e);
                    if (t.validationType) {
                        if (!d.hasOwnProperty(t.validationType)) {
                            throw new Error('Validation type "' + t.validationType + '" specified for field "' + e + '" does not exist')
                        }
                        g(e);
                        y(e);
                        x(e);
                        b(e)
                    }
                }
                n.forEach(function(e) {
                    C(e.fieldName)
                });
                return {
                    triggerFormValidation: w
                }
            }
        }
    }, {
        "./../dom-helpers/field-formatter.js": 5,
        "./input-limiter.js": 21,
        "./validator.js": 22
    }],
    21: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });

        function r(e) {
            var t = !e.shiftKey && (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 46 || e.keyCode === 8 || e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 36 || e.keyCode === 35 || e.keyCode === 9 || e.keyCode === 13 || e.ctrlKey === true && e.keyCode === 86;
            if (!t) {
                e.stopPropagation();
                e.preventDefault()
            }
            return t
        }
        var i = n.InputLimiter = {
            constrainInputToDigitsOnly: r
        }
    }, {}],
    22: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });
        n.Validator = n.ValidationResult = undefined;
        var r = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || false;
                    r.configurable = true;
                    if ("value" in r) r.writable = true;
                    Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                if (n) e(t.prototype, n);
                if (r) e(t, r);
                return t
            }
        }();
        var o = e("./errors/error-types.js");

        function a(e, t) {
            if (!(e instanceof t)) {
                throw new TypeError("Cannot call a class as a function")
            }
        }
        var s = n.ValidationResult = function() {
            function e(t) {
                var n = t.valid,
                    r = t.errorType;
                a(this, e);
                this.valid = n;
                this.errorType = r
            }
            i(e, [{
                key: "messageFor",
                value: function t(e) {
                    return this.errorType.message(e)
                }
            }]);
            return e
        }();
        var u = n.Validator = function() {
            function e(e) {
                if (e === undefined) {
                    return new s({
                        valid: false,
                        errorType: o.ErrorTypes.undefinedValue
                    })
                }
                if (e === null) {
                    return new s({
                        valid: false,
                        errorType: o.ErrorTypes.nullValue
                    })
                }
                return new s({
                    valid: true
                })
            }

            function t(t) {
                var n = e(t);
                if (!n.valid) {
                    return n
                }
                if (!/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i.test(t)) {
                    return new s({
                        valid: false,
                        errorType: o.ErrorTypes.invalidFormat
                    })
                }
                return new s({
                    valid: true
                })
            }

            function n(t, n) {
                var r = e(t);
                if (!r.valid) {
                    return r
                }
                var i = n || document;
                try {
                    var a = i.querySelectorAll(t);
                    if (a.length > 1) {
                        return new s({
                            valid: false,
                            errorType: o.ErrorTypes.matchesMoreThanOneElement
                        })
                    } else if (a.length === 0) {
                        return new s({
                            valid: false,
                            errorType: o.ErrorTypes.doesNotMatchAnyElement
                        })
                    }
                    return new s({
                        valid: true
                    })
                } catch (u) {
                    return new s({
                        valid: false,
                        errorType: o.ErrorTypes.invalidFormat
                    })
                }
            }

            function i(t) {
                var n = e(t);
                if (!n.valid) {
                    return n
                }
                for (var i = arguments.length, a = Array(i > 1 ? i - 1 : 0), u = 1; u < i; u++) {
                    a[u - 1] = arguments[u]
                }
                if (!a.some(function(e) {
                        return e === (typeof t === "undefined" ? "undefined" : r(t))
                    })) {
                    return new s({
                        valid: false,
                        errorType: o.ErrorTypes.invalidType
                    })
                }
                return new s({
                    valid: true
                })
            }

            function a(t) {
                var n = e(t);
                if (!n.valid) {
                    return n
                }
                for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) {
                    i[a - 1] = arguments[a]
                }
                if (!i.some(function(e) {
                        return t instanceof e
                    })) {
                    return new s({
                        valid: false,
                        errorType: o.ErrorTypes.invalidType
                    })
                }
                return new s({
                    valid: true
                })
            }

            function u(e) {
                var t = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
                var n = e.length;
                var r = 1;
                var i = 0;
                var o = void 0;
                while (n) {
                    o = parseInt(e.charAt(--n), 10);
                    i += (r ^= 1) ? t[o] : o
                }
                return i && i % 10 === 0
            }

            function l(e) {
                if (!u(e)) {
                    return new s({
                        valid: false,
                        errorType: o.ErrorTypes.cardNumberInvalid
                    })
                }
                return new s({
                    valid: true
                })
            }

            function c(e) {
                var t = new Date;
                t.setHours(0, 0, 0, 0);
                t.setDate(1);
                var n = parseInt(e.substring(0, 2), 10);
                t.setMonth((n - 1 + 1) % 12);
                var r = parseInt("20" + e.substring(2, 4), 10);
                var i = n === 12 ? r + 1 : r;
                t.setFullYear(i);
                t = new Date(t.getTime() - 1e3);
                var o = new Date;
                return t < o
            }

            function d(e) {
                if (c(e)) {
                    return new s({
                        valid: false,
                        errorType: o.ErrorTypes.expiryDateInThePast
                    })
                }
                return new s({
                    valid: true
                })
            }
            return {
                validateNotNullOrUndefined: e,
                validateBaseType: i,
                validateInstanceType: a,
                validateUuid: t,
                validateCssSelector: n,
                validateCardNumberWithLuhnCheck: l,
                validateCardExpiryDate: d
            }
        }()
    }, {
        "./errors/error-types.js": 19
    }],
    23: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });
        n.sagepayCheckout = a;
        var r = e("./modules/validation/api-validator.js");
        var i = e("./modules/page-objects/parent-page.js");
        var o = e("./modules/dom-helpers/polyfill.js");

        function a() {
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var t = e.merchantSessionKey,
                n = e.onTokenise,
                a = e.reusableCardIdentifier,
                s = e.containerSelector,
                u = s === undefined ? "#sp-container" : s;
            r.ApiValidator.validateDropinSetupParameters({
                merchantSessionKey: t,
                onTokenise: n,
                containerSelector: u,
                reusableCardIdentifier: a
            });
            var l = i.ParentPage.setup({
                merchantSessionKey: t,
                onTokenise: n,
                containerSelector: u,
                reusableCardIdentifier: a
            });
            return {
                form: function c() {
                    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                        t = e.formSelector,
                        n = t === undefined ? function() {
                            return o.Polyfill.closest(l.getContainer(), "form")
                        } : t;
                    r.ApiValidator.validateFormParameters({
                        formSelector: n
                    });
                    l.bindForm(n)
                },
                tokenise: function d() {
                    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                        t = e.newMerchantSessionKey;
                    r.ApiValidator.validateTokeniseParameters({
                        newMerchantSessionKey: t
                    });
                    l.tokenise({
                        key: t
                    })
                },
                destroy: function f() {
                    l.destroy()
                }
            }
        }
    }, {
        "./modules/dom-helpers/polyfill.js": 8,
        "./modules/page-objects/parent-page.js": 12,
        "./modules/validation/api-validator.js": 17
    }],
    24: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: true
        });
        var r = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) {
                    if (Object.prototype.hasOwnProperty.call(n, r)) {
                        e[r] = n[r]
                    }
                }
            }
            return e
        };
        n.sagepayOwnForm = a;
        var i = e("./modules/validation/api-validator.js");
        var o = e("./modules/tokenisation/card-tokeniser.js");

        function a() {
            var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var t = e.merchantSessionKey;
            i.ApiValidator.validateOwnFormSetupParameters({
                merchantSessionKey: t
            });
            var n = new o.CardTokeniser({
                config: SagePayConfig
            });

            function a(e) {
                var i = e.cardDetails,
                    o = e.onTokenised,
                    a = e.reusableCardIdentifier,
                    s = e.newMerchantSessionKey,
                    u = s === undefined ? t : s;
                n.tokenise({
                    merchantSessionKey: u,
                    reusableCardIdentifier: a,
                    cardDetails: i,
                    success: function l(e) {
                        var t = e.cardIdentifier;
                        return o(r({
                            success: true
                        }, t ? {
                            cardIdentifier: t
                        } : {}))
                    },
                    clientError: function c(e, t) {
                        return o({
                            success: false,
                            httpErrorCode: t,
                            errors: e.map(function(e) {
                                return {
                                    code: e.code,
                                    message: e.message
                                }
                            })
                        })
                    },
                    serverError: function d(e) {
                        var t = e.httpErrorCode,
                            n = e.code,
                            r = e.description;
                        return o({
                            success: false,
                            httpErrorCode: t,
                            errors: [{
                                code: n,
                                message: r
                            }]
                        })
                    },
                    timeoutError: function f() {
                        return o({
                            success: false,
                            httpErrorCode: 0,
                            errors: [{
                                code: "C001",
                                message: "Client request timeout"
                            }]
                        })
                    },
                    networkError: function p() {
                        return o({
                            success: false,
                            httpErrorCode: 0,
                            errors: [{
                                code: "C002",
                                message: "Network error"
                            }]
                        })
                    }
                })
            }
            return {
                tokeniseCardDetails: function s() {
                    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                        n = e.cardDetails,
                        r = e.onTokenised,
                        i = e.newMerchantSessionKey,
                        o = i === undefined ? t : i;
                    a({
                        cardDetails: n,
                        onTokenised: r,
                        newMerchantSessionKey: o
                    })
                },
                activateReusableCardIdentifier: function u() {
                    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                        n = e.reusableCardIdentifier,
                        r = e.securityCode,
                        i = e.onActivated,
                        o = e.newMerchantSessionKey,
                        s = o === undefined ? t : o;
                    a({
                        reusableCardIdentifier: n,
                        cardDetails: {
                            securityCode: r
                        },
                        onTokenised: i,
                        newMerchantSessionKey: s
                    })
                }
            }
        }
    }, {
        "./modules/tokenisation/card-tokeniser.js": 13,
        "./modules/validation/api-validator.js": 17
    }]
}, {}, [1, 2]);