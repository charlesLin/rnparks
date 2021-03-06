'use strict';
import React, { Component} from 'react';

import {View, WebView, Text}  from 'react-native';
const IFT = `
/* JsBarcode v2.5.1 | github.com/lindell/JsBarcode */
function CODE128(t) {
    function e(t, i) {
        if (t.length <= 0)
            return {
                result: "",
                checksum: 0
            };
        var o, s;
        if (t[0] >= 200)
            s = t[0] - 105, t.shift(), 99 === s ? o = n(t, i + 1) : 100 === s ? o = r(t, i + 1) : 98 === s ? (t[0] = t[0] > 95 ? t[0] - 96 : t[0], o = e(t, i + 1)) : o = e(t, i + 1);
        else {
            var u = t[0];
            s = 32 > u ? u + 64 : u - 32, t.shift(), o = e(t, i + 1)
        }
        var c = a(s), f = s * i;
        return {
            result: c + o.result,
            checksum: f + o.checksum
        }
    }
    function r(t, i) {
        if (t.length <= 0)
            return {
                result: "",
                checksum: 0
            };
        var o, s;
        t[0] >= 200 ? (s = t[0] - 105, t.shift(), 99 === s ? o = n(t, i + 1) : 101 === s ? o = e(t, i + 1) : 98 === s ? (t[0] = t[0] < 32 ? t[0] + 96 : t[0], o = r(t, i + 1)) : o = r(t, i + 1)) : (s = t[0] - 32, t.shift(), o = r(t, i + 1));
        var u = a(s), c = s * i;
        return {
            result: u + o.result,
            checksum: c + o.checksum
        }
    }
    function n(t, i) {
        if (t.length <= 0)
            return {
                result: "",
                checksum: 0
            };
        var o, s;
        t[0] >= 200 ? (s = t[0] - 105, t.shift(), o = 100 === s ? r(t, i + 1) : 101 === s ? e(t, i + 1) : n(t, i + 1)) : (s = 10 * (t[0] - 48) + t[1] - 48, t.shift(), t.shift(), o = n(t, i + 1));
        var u = a(s), c = s * i;
        return {
            result: u + o.result,
            checksum: c + o.checksum
        }
    }
    this.bytes = [];
    for (var i = 0; i < t.length; ++i)
        this.bytes.push(t.charCodeAt(i));
    this.string = t.substring(1), this.getText = function() {
        var t = this.string;
        return t.replace(/[^\\x20-\\x7E]/g, "")
    }, this.encoded = function() {
        var t, i = this.bytes, o = i.shift() - 105;
        return 103 === o ? t = e(i, 1) : 104 === o ? t = r(i, 1) : 105 === o && (t = n(i, 1)), a(o) + t.result + a((t.checksum + o)%103) + a(106)
    };
    var o = [740, 644, 638, 176, 164, 100, 224, 220, 124, 608, 604, 572, 436, 244, 230, 484, 260, 254, 650, 628, 614, 764, 652, 902, 868, 836, 830, 892, 844, 842, 752, 734, 590, 304, 112, 94, 416, 128, 122, 672, 576, 570, 464, 422, 134, 496, 478, 142, 910, 678, 582, 768, 762, 774, 880, 862, 814, 896, 890, 818, 914, 602, 930, 328, 292, 200, 158, 68, 62, 424, 412, 232, 218, 76, 74, 554, 616, 978, 556, 146, 340, 212, 182, 508, 268, 266, 956, 940, 938, 758, 782, 974, 400, 310, 118, 512, 506, 960, 954, 502, 518, 886, 966, 668, 680, 692, 5379], a = function(t) {
        return o[t] ? (o[t] + 1e3).toString(2) : ""
    };
    this.valid = function() {
        return !( - 1 === this.string.search(validCODE128))
    }
}
function autoSelectModes(t) {
    var e, r = t.match(/^[\\x00-\\x5F\\xC8-\\xCF]*/)[0].length, n = t.match(/^[\\x20-\\x7F\\xC8-\\xCF]*/)[0].length, i = t.match(/^(\\xCF*[0-9]{2}\\xCF*)*/)[0].length;
    return e = i >= 2 ? String.fromCharCode(210) + autoSelectFromC(t) : r > n ? String.fromCharCode(208) + autoSelectFromA(t) : String.fromCharCode(209) + autoSelectFromB(t), e = e.replace(/[\\xCD\\xCE]([^])[\\xCD\\xCE]/, function(t, e) {
        return String.fromCharCode(203) + e
    })
}
function autoSelectFromA(t) {
    var e = t.match(/^([\\x00-\\x5F\\xC8-\\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);
    if (e)
        return e[1] + String.fromCharCode(204) + autoSelectFromC(t.substring(e[1].length));
    var r = t.match(/^[\\x00-\\x5F\\xC8-\\xCF]+/);
    return r[0].length === t.length ? t : r[0] + String.fromCharCode(205) + autoSelectFromB(t.substring(r[0].length))
}
function autoSelectFromB(t) {
    var e = t.match(/^([\\x20-\\x7F\\xC8-\\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);
    if (e)
        return e[1] + String.fromCharCode(204) + autoSelectFromC(t.substring(e[1].length));
    var r = t.match(/^[\\x20-\\x7F\\xC8-\\xCF]+/);
    return r[0].length === t.length ? t : r[0] + String.fromCharCode(206) + autoSelectFromA(t.substring(r[0].length))
}
function autoSelectFromC(t) {
    var e = t.match(/^(\\xCF*[0-9]{2}\\xCF*)+/)[0], r = e.length;
    if (r === t.length)
        return t;
    t = t.substring(r);
    var n = t.match(/^[\\x00-\\x5F\\xC8-\\xCF]*/)[0].length, i = t.match(/^[\\x20-\\x7F\\xC8-\\xCF]*/)[0].length;
    return n >= i ? e + String.fromCharCode(206) + autoSelectFromA(t) : e + String.fromCharCode(205) + autoSelectFromB(t)
}
function CODE128AUTO(t) {
    return new CODE128( - 1 !== t.search(validCODE128) ? autoSelectModes(t) : t)
}
function CODE128A(t) {
    var e = new CODE128(String.fromCharCode(208) + t);
    return e.valid = function() {
        return - 1 !== this.string.search(/^[\\x00-\\x5F\\xC8-\\xCF]+$/)
    }, e
}
function CODE128B(t) {
    var e = new CODE128(String.fromCharCode(209) + t);
    return e.valid = function() {
        return - 1 !== this.string.search(/^[\\x20-\\x7F\\xC8-\\xCF]+$/)
    }, e
}
function CODE128C(t) {
    var e = new CODE128(String.fromCharCode(210) + t);
    return e.valid = function(t) {
        return - 1 !== this.string.search(/^(\\xCF*[0-9]{2}\\xCF*)+$/)
    }, e
}
function CODE39(t) {
    t = t.toUpperCase();
    var e = {
        0: 20957,
        1: 29783,
        2: 23639,
        3: 30485,
        4: 20951,
        5: 29813,
        6: 23669,
        7: 20855,
        8: 29789,
        9: 23645,
        A: 29975,
        B: 23831,
        C: 30533,
        D: 22295,
        E: 30149,
        F: 24005,
        G: 21623,
        H: 29981,
        I: 23837,
        J: 22301,
        K: 30023,
        L: 23879,
        M: 30545,
        N: 22343,
        O: 30161,
        P: 24017,
        Q: 21959,
        R: 30065,
        S: 23921,
        T: 22385,
        U: 29015,
        V: 18263,
        W: 29141,
        X: 17879,
        Y: 29045,
        Z: 18293,
        "-": 17783,
        ".": 29021,
        " ": 18269,
        $: 17477,
        "/": 17489,
        "+": 17681,
        "%": 20753,
        "*": 35770
    };
    this.getText = function() {
        return t
    }, this.encoded = function() {
        var r = "";
        r += e["*"].toString(2);
        for (var n = 0; n < t.length; n++)
            r += e[t[n]].toString(2) + "0";
        return r += e["*"].toString(2)
    }, this.valid = function() {
        return - 1 !== t.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/)
    }
}
function EAN(t) {
    function e(t) {
        var e = new EANencoder, r = "", n = a[t[0]], i = t.substr(1, 7), o = t.substr(7, 6);
        return r += e.startBin, r += e.encode(i, n), r += e.middleBin, r += e.encode(o, "RRRRRR"), r += e.endBin
    }
    function r(t) {
        for (var e = 0, r = 0; 12 > r; r += 2)
            e += parseInt(t[r]);
        for (var r = 1; 12 > r; r += 2)
            e += 3 * parseInt(t[r]);
        return (10 - e%10)%10
    }
    function n(t) {
        return - 1 != t.search(i) ? t[12] == r(t) : !1
    }
    var i = /^[0-9]{13}$/, o = /^[0-9]{12}$/;
    - 1 != t.search(o) && (t += r(t)), this.getText = function() {
        return t
    }, this.valid = function() {
        return n(t)
    }, this.encoded = function() {
        return e(t)
    };
    var a = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"]
}
function EAN8(t) {
    function e(t) {
        for (var e = 0, r = 0; 7 > r; r += 2)
            e += 3 * parseInt(t[r]);
        for (var r = 1; 7 > r; r += 2)
            e += parseInt(t[r]);
        return (10 - e%10)%10
    }
    function r(t) {
        var e = new EANencoder, r = "", n = t.substr(0, 4), i = t.substr(4, 4);
        return r += e.startBin, r += e.encode(n, "LLLL"), r += e.middleBin, r += e.encode(i, "RRRR"), r += e.endBin
    }
    var n = /^[0-9]{8}$/, i = /^[0-9]{7}$/;
    - 1 != t.search(i) && (t += e(t)), this.getText = function() {
        return t
    }, this.valid = function() {
        return - 1 !== t.search(n) && t[7] == e(t)
    }, this.encoded = function() {
        return r(t)
    }
}
function EAN5(t) {
    function e(t) {
        for (var e = 0, r = 0; 5 > r; r += 2)
            e += 3 * parseInt(t[r]);
        for (var r = 1; 5 > r; r += 2)
            e += 9 * parseInt(t[r]);
        return e%10
    }
    function r(t) {
        var r = new EANencoder, n = "1011";
        return n += r.encode(t, i[e(t)], "01")
    }
    var n = /^[0-9]{5}$/;
    this.getText = function() {
        return t
    }, this.valid = function() {
        return - 1 !== t.search(n)
    }, this.encoded = function() {
        return r(t)
    };
    var i = ["GGLLL", "GLGLL", "GLLGL", "GLLLG", "LGGLL", "LLGGL", "LLLGG", "LGLGL", "LGLLG", "LLGLG"]
}
function EAN2(t) {
    function e(t) {
        var e = new EANencoder, r = "1011";
        return r += e.encode(t, n[parseInt(t)%4], "01")
    }
    var r = /^[0-9]{2}$/;
    this.getText = function() {
        return t
    }, this.valid = function() {
        return - 1 !== t.search(r)
    }, this.encoded = function() {
        return e(t)
    };
    var n = ["LL", "LG", "GL", "GG"]
}
function UPC(t) {
    var e = new EAN("0" + t);
    this.getText = function() {
        return e.getText().substring(1)
    }, this.valid = function() {
        return e.valid()
    }, this.encoded = function() {
        return e.encoded()
    }
}
function EANencoder() {
    this.startBin = "101", this.endBin = "101", this.middleBin = "01010";
    var t = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"], e = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"], r = ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"];
    this.encode = function(n, i, o) {
        for (var a = "", o = "undefined" == typeof o ? "" : o, s = 0; s < n.length; s++)
            "L" == i[s] ? a += t[n[s]] : "G" == i[s] ? a += e[n[s]] : "R" == i[s] && (a += r[n[s]]), s < n.length - 1 && (a += o);
        return a
    }
}
function ITF(t) {
    function e(t) {
        for (var e = "", r = n[t[0]], i = n[t[1]], o = 0; 5 > o; o++)
            e += "1" == r[o] ? "111" : "1", e += "1" == i[o] ? "000" : "0";
        return e
    }
    function r(t) {
        return - 1 !== t.search(a)
    }
    this.getText = function() {
        return t
    }, this.valid = function() {
        return r(t)
    }, this.encoded = function() {
        var r = "";
        r += i;
        for (var n = 0; n < t.length; n += 2)
            r += e(t.substr(n, 2));
        return r += o
    };
    var n = {
        0: "00110",
        1: "10001",
        2: "01001",
        3: "11000",
        4: "00101",
        5: "10100",
        6: "01100",
        7: "00011",
        8: "10010",
        9: "01010"
    }, i = "1010", o = "11101", a = /^([0-9][0-9])+$/
}
function ITF14(t) {
    function e(t) {
        for (var e = "", r = n[t[0]], i = n[t[1]], o = 0; 5 > o; o++)
            e += "1" == r[o] ? "111" : "1", e += "1" == i[o] ? "000" : "0";
        return e
    }
    function r(t) {
        for (var e = 0, r = 0; 13 > r; r++)
            e += parseInt(t[r]) * (3 - r%2 * 2);
        return 10 - e%10
    }
    this.getText = function() {
        return t
    }, this.valid = function() {
        return - 1 !== t.search(/^[0-9]{13,14}$/) && (13 === t.length || t[13] == r(t))
    }, this.encoded = function() {
        var n = "";
        13 === t.length && (t += r(t)), n += i;
        for (var a = 0; 14 > a; a += 2)
            n += e(t.substr(a, 2));
        return n += o
    };
    var n = {
        0: "00110",
        1: "10001",
        2: "01001",
        3: "11000",
        4: "00101",
        5: "10100",
        6: "01100",
        7: "00011",
        8: "10010",
        9: "01010"
    }, i = "1010", o = "11101"
}
function MSI(t) {
    this.string = "" + t
}
function MSI10(t) {
    this.string = "" + t, this.string += mod10(this.string)
}
function MSI11(t) {
    this.string = "" + t, this.string += mod11(this.string)
}
function MSI1010(t) {
    this.string = "" + t, this.string += mod10(this.string), this.string += mod10(this.string)
}
function MSI1110(t) {
    this.string = "" + t, this.string += mod11(this.string), this.string += mod10(this.string)
}
function mod10(t) {
    for (var e = 0, r = 0; r < t.length; r++) {
        var n = parseInt(t[r]);
        e += (r + t.length)%2 == 0 ? n : 2 * n%10 + Math.floor(2 * n / 10)
    }
    return (10 - e%10)%10
}
function mod11(t) {
    for (var e = 0, r = [2, 3, 4, 5, 6, 7], n = 0; n < t.length; n++) {
        var i = parseInt(t[t.length - 1 - n]);
        e += r[n%r.length] * i
    }
    return (11 - e%11)%11
}
function addZeroes(t, e) {
    for (var r = 0; e > r; r++)
        t = "0" + t;
    return t
}
function pharmacode(t) {
    function e(t, n) {
        if (0 == t.length)
            return "";
        var i, o=!1, a = r(t);
        return 0 == a ? (i = n ? "001" : "00111", o = n) : (i = "001".repeat(a - (n ? 1 : 0)), i += "00111"), e(t.substr(0, t.length - a - 1), o) + i
    }
    this.number = parseInt(t), this.getText = function() {
        return this.number + ""
    }, this.encoded = function() {
        return e(this.number.toString(2), !0).substr(2)
    }, this.valid = function() {
        return this.number >= 3 && this.number <= 131070
    };
    var r = function(t) {
        for (var e = t.length - 1, r = 0; "0" == t[e] || 0 > e;)
            r++, e--;
        return r
    };
    String.prototype.repeat = function(t) {
        return new Array(t + 1).join(this)
    }
}
!function() {
    var t = function(r, n, i) {
        if ("string" == typeof r)
            r = document.querySelector(r), t(r, n, i);
        else if ("undefined" != typeof HTMLCanvasElement && r instanceof HTMLImageElement)
            canvas = document.createElement("canvas"), e(canvas, n, i), r.setAttribute("src", canvas.toDataURL());
        else {
            if (!r.getContext)
                throw new Error("Not supported type to draw on.");
            e(r, n, i)
        }
    }, e = function(e, r, n) {
        if (r += "", n = s(t.defaults, n), n.marginTop = "undefined" == typeof n.marginTop ? n.margin : n.marginTop, n.marginBottom = "undefined" == typeof n.marginBottom ? n.margin : n.marginBottom, n.marginRight = "undefined" == typeof n.marginRight ? n.margin : n.marginRight, n.marginLeft = "undefined" == typeof n.marginLeft ? n.margin : n.marginLeft, !e.getContext)
            throw new Error("The browser does not support canvas.");
        if ("auto" == n.format)
            var i = new (t.autoSelectEncoder(r))(r);
        else
            var i = new (t.getModule(n.format))(r);
        if (i.valid()) {
            var o = t.getCache(n.format, r);
            if (o)
                var a = o;
            else {
                var a = i.encoded();
                t.cache(n.format, r, a)
            }
            var u = e.getContext("2d"), c = n.fontOptions + " " + n.fontSize + "px " + n.font;
            u.font = c;
            var f = a.length * n.width, h = u.measureText(i.getText()).width;
            if (n.displayValue && h > f) {
                if ("center" == n.textAlign)
                    var g = Math.floor((h - f) / 2);
                else if ("left" == n.textAlign)
                    var g = 0;
                else if ("right" == n.textAlign)
                    var g = Math.floor(h - f);
                f = h
            }
            var g = g || 0;
            e.width = f + n.marginLeft + n.marginRight, e.height = n.height + (n.displayValue ? n.fontSize : 0) + n.textMargin + n.marginTop + n.marginBottom, u.clearRect(0, 0, e.width, e.height), n.background && (u.fillStyle = n.background, u.fillRect(0, 0, e.width, e.height));
            var d, l;
            d = "top" == n.textPosition ? n.marginTop + n.fontSize + n.textMargin : n.marginTop, l = n.height, u.fillStyle = n.lineColor;
            for (var m = 0; m < a.length; m++) {
                var v = m * n.width + n.marginLeft + g;
                "1" == a[m] && u.fillRect(v, d, n.width, n.height)
            }
            if (n.displayValue) {
                var v, x;
                "top" == n.textPosition ? (x = n.marginTop + n.fontSize, u.textBaseline = "bottom") : (x = n.height + n.textMargin + n.marginTop, u.textBaseline = "top"), u.font = c, "left" == n.textAlign || g > 0 ? (v = n.marginLeft, u.textAlign = "left") : "right" == n.textAlign ? (v = e.width - n.marginRight, u.textAlign = "right") : (v = e.width / 2, u.textAlign = "center"), u.fillText(i.getText(), v, x)
            }
            n.valid(!0)
        } else if (n.valid(!1), n.valid == t.defaults.valid)
            throw new Error("The data is not valid for the type of barcode.")
    };
    if (t._modules = [], t.register = function(e, r, n) {
        var i = 0;
        if ("undefined" == typeof n)
            i = t._modules.length - 1;
        else
            for (var o = 0; o < t._modules.length && (i = o, n < t._modules[o].priority); o++);
        t._modules.splice(i, 0, {
            regex: r,
            module: e,
            priority: n
        })
    }, t.getModule = function(e) {
        for (var r in t._modules)
            if ( - 1 !== e.search(t._modules[r].regex))
                return t._modules[r].module;
        throw new Error("Module " + e + " does not exist or is not loaded.")
    }, t.autoSelectEncoder = function(e) {
        for (var r in t._modules) {
            var n = new t._modules[r].module(e);
            if (n.valid(e))
                return t._modules[r].module
        }
        throw new Error("Can't automatically find a barcode format matching the string '" + e + "'")
    }, t._cache = {}, t.cache = function(e, r, n) {
        t._cache[e] || (t._cache[e] = {}), t._cache[e][r] = n
    }, t.getCache = function(e, r) {
        return t._cache[e] && t._cache[e][r] ? t._cache[e][r] : ""
    }, t._isNode=!1, "undefined" != typeof module && module.exports) {
        module.exports = t, t._isNode=!0;
        var r = require("path"), n = r.join(__dirname, "barcodes"), i = require("fs").readdirSync(n);
        for (var o in i) {
            var a = require(r.join(n, i[o]));
            a.register(t)
        }
    }
    "undefined" != typeof window && (window.JsBarcode = t), "undefined" != typeof jQuery && (jQuery.fn.JsBarcode = function(e, r, n) {
        return t(this.get(0), e, r, n), this
    }), t.defaults = {
        width: 2,
        height: 100,
        format: "auto",
        displayValue: !0,
        fontOptions: "",
        font: "monospace",
        textAlign: "center",
        textPosition: "bottom",
        textMargin: 2,
        fontSize: 20,
        background: "#ffffff",
        lineColor: "#000000",
        margin: 10,
        marginTop: void 0,
        marginBottom: void 0,
        marginLeft: void 0,
        marginRight: void 0,
        valid: function(t) {}
    };
    var s = function(t, e) {
        var r = {};
        for (var n in t)
            r[n] = t[n];
        for (var n in e)
            "undefined" != typeof e[n] && (r[n] = e[n]);
        return r
    }
}();
var validCODE128 = /^[\\x00-\\x7F\\xC8-\\xD3]+$/, register = function(t) {
    t.register(CODE128AUTO, /^CODE128(.?AUTO)?$/, 10), t.register(CODE128A, /^CODE128.?A$/i, 2), t.register(CODE128B, /^CODE128.?B$/i, 3), t.register(CODE128C, /^CODE128.?C$/i, 2)
};
try {
    register(JsBarcode)
} catch (e) {}
try {
    module.exports.register = register
} catch (e) {}
var register = function(t) {
    t.register(CODE39, /^CODE.?39$/i, 3)
};
try {
    register(JsBarcode)
} catch (e) {}
try {
    module.exports.register = register
} catch (e) {}
var register = function(t) {
    t.register(EAN, /^EAN(.?13)?$/i, 8), t.register(EAN8, /^EAN.?8$/i, 8), t.register(EAN5, /^EAN.?5$/i, 5), t.register(EAN2, /^EAN.?2$/i, 5), t.register(UPC, /^UPC(.?A)?$/i, 8)
};
try {
    register(JsBarcode)
} catch (e) {}
try {
    module.exports.register = register
} catch (e) {}
var register = function(t) {
    t.register(ITF, /^ITF$/i, 4)
};
try {
    register(JsBarcode)
} catch (e) {}
try {
    module.exports.register = register
} catch (e) {}
var register = function(t) {
    t.register(ITF14, /^ITF.?14$/i, 5)
};
try {
    register(JsBarcode)
} catch (e) {}
try {
    module.exports.register = register
} catch (e) {}
var prototype = {};
prototype.getText = function() {
    return this.string
}, prototype.encoded = function() {
    for (var t = "110", e = 0; e < this.string.length; e++) {
        var r = parseInt(this.string[e]), n = r.toString(2);
        n = addZeroes(n, 4 - n.length);
        for (var i = 0; i < n.length; i++)
            t += 0 == n[i] ? "100" : "110"
    }
    return t += "1001"
}, prototype.valid = function() {
    return - 1 != this.string.search(/^[0-9]+$/)
}, MSI.prototype = Object.create(prototype), MSI10.prototype = Object.create(prototype), MSI11.prototype = Object.create(prototype), MSI1010.prototype = Object.create(prototype), MSI1110.prototype = Object.create(prototype);
var register = function(t) {
    t.register(MSI, /^MSI$/i, 4), t.register(MSI10, /^MSI.?10$/i), t.register(MSI11, /^MSI.?11$/i), t.register(MSI1010, /^MSI.?1010$/i), t.register(MSI1110, /^MSI.?1110$/i)
};
try {
    register(JsBarcode)
} catch (e) {}
try {
    module.exports.register = register
} catch (e) {}
var register = function(t) {
    t.register(pharmacode, /^pharmacode$/i, 2)
};
try {
    register(JsBarcode)
} catch (e) {}
try {
    module.exports.register = register
} catch (e) {}

`;

class BarCode extends Component {

  render() {
    const html = this._getHtml();
    return (
      <WebView style={{ width: this.props.width, height: this.props.height, marginTop:20 }}
        source={{ html: this._getHtml() }}/>
    )
  }
  // render() {
  //   return (
  //     <View><Text>aaaaa</Text></View>
  //   );
  // }

  //source={{ html: this._getHtml() }}/>

  _getHtml() {
    let html = `<!doctype html>
                    <html>
                    <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    </head>
                   <body style="height: 100%;width: 100%;margin: 0;padding: 0;overflow: hidden">
                    <canvas height="${this.props.height}" width="${this.props.width}"></canvas><script>

                    ${IFT}



             var PIXEL_RATIO = (function () {
                var ctx = document.createElement("canvas").getContext("2d"),
                dpr = window.devicePixelRatio || 1,
                bsr = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;

                return dpr / bsr;
            })();
             var canvas = document.querySelector('canvas');
             var oldWidth=canvas.width;
             var oldHeight=canvas.height;
             canvas.width=oldWidth*PIXEL_RATIO;
             canvas.height=oldHeight*PIXEL_RATIO;
             canvas.style.width=oldWidth+'px';
             canvas.style.height=oldHeight+'px';
             canvas.ontouchstart=function(e){
                e.preventDefault();
                e.stopImmediatePropagation();
             }
            JsBarcode(canvas, "${this.props.value}",{  width:2, format: "CODE39",
             displayValue: true,  fontSize: 28, backgroundColor:'${this.props.bgColor}'});
             </script>
             </body>
             </html>`;

    return html;
  }
}

export default BarCode;