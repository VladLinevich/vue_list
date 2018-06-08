webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/
!function(factory) {
     true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(0) ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory("object" == typeof exports ? require("jquery") : jQuery);
}(function($) {
    var caretTimeoutId, ua = navigator.userAgent, iPhone = /iphone/i.test(ua), chrome = /chrome/i.test(ua), android = /android/i.test(ua);
    $.mask = {
        definitions: {
            "0": "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-zа-яА-Я0-9]",
            "~": "[А-яЁё0-9\\\\/_ -]"
        },
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: ""
    }, $.fn.extend({
        caret: function(begin, end) {
            var range;
            if (0 !== this.length && !this.is(":hidden")) return "number" == typeof begin ? (end = "number" == typeof end ? end : begin, 
            this.each(function() {
                this.setSelectionRange ? this.setSelectionRange(begin, end) : this.createTextRange && (range = this.createTextRange(), 
                range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin), 
                range.select());
            })) : (this[0].setSelectionRange ? (begin = this[0].selectionStart, end = this[0].selectionEnd) : document.selection && document.selection.createRange && (range = document.selection.createRange(), 
            begin = 0 - range.duplicate().moveStart("character", -1e5), end = begin + range.text.length), 
            {
                begin: begin,
                end: end
            });
        },
        unmask: function() {
            return this.trigger("unmask");
        },
        mask: function(mask, settings) {
            var orig = $(this[0]);
            var input, defs, tests, partialPosition, firstNonMaskPos, lastRequiredNonMaskPos, len, oldVal;
            if (!mask && this.length > 0) {
                input = $(this[0]);
                var fn = input.data($.mask.dataName);
                return fn ? fn() : void 0;
            }
            return settings = $.extend({
                autoclear: $.mask.autoclear,
                placeholder: $.mask.placeholder,
                completed: null
            }, settings), defs = $.mask.definitions, tests = [], partialPosition = len = mask.length, 
            firstNonMaskPos = null, $.each(mask.split(""), function(i, c) {
                var regex = orig.data('regex');
                var refs = regex ? regex : defs[c];
                "?" == c ? (len--, partialPosition = i) : refs ? (tests.push(new RegExp(refs)), 
                null === firstNonMaskPos && (firstNonMaskPos = tests.length - 1), partialPosition > i && (lastRequiredNonMaskPos = tests.length - 1)) : tests.push(null);
            }), this.trigger("unmask").each(function() {
                function tryFireCompleted() {
                    if (settings.completed) {
                        for (var i = firstNonMaskPos; lastRequiredNonMaskPos >= i; i++) if (tests[i] && buffer[i] === getPlaceholder(i)) return;
                        settings.completed.call(input);
                    }
                }
                function getPlaceholder(i) {
                    return settings.placeholder.charAt(i < settings.placeholder.length ? i : 0);
                }
                function seekNext(pos) {
                    for (;++pos < len && !tests[pos]; ) ;
                    return pos;
                }
                function seekPrev(pos) {
                    for (;--pos >= 0 && !tests[pos]; ) ;
                    return pos;
                }
                function shiftL(begin, end) {
                    var i, j;
                    if (!(0 > begin)) {
                        for (i = begin, j = seekNext(end); len > i; i++) if (tests[i]) {
                            if (!(len > j && tests[i].test(buffer[j]))) break;
                            buffer[i] = buffer[j], buffer[j] = getPlaceholder(j), j = seekNext(j);
                        }
                        writeBuffer(), input.caret(Math.max(firstNonMaskPos, begin));
                    }
                }
                function shiftR(pos) {
                    var i, c, j, t;
                    for (i = pos, c = getPlaceholder(pos); len > i; i++) if (tests[i]) {
                        if (j = seekNext(i), t = buffer[i], buffer[i] = c, !(len > j && tests[j].test(t))) break;
                        c = t;
                    }
                }
                function androidInputEvent() {
                    var curVal = input.val(), pos = input.caret();
                    if (oldVal && oldVal.length && oldVal.length > curVal.length) {
                        for (checkVal(!0); pos.begin > 0 && !tests[pos.begin - 1]; ) pos.begin--;
                        if (0 === pos.begin) for (;pos.begin < firstNonMaskPos && !tests[pos.begin]; ) pos.begin++;
                        input.caret(pos.begin, pos.begin);
                    } else {
                        for (checkVal(!0); pos.begin < len && !tests[pos.begin]; ) pos.begin++;
                        input.caret(pos.begin, pos.begin);
                    }
                    tryFireCompleted();
                }
                function blurEvent() {
                    checkVal(), input.val() != focusText && input.change();
                }
                function keydownEvent(e) {
                    if (!input.prop("readonly")) {
                        var pos, begin, end, k = e.which || e.keyCode;
                        oldVal = input.val(), 8 === k || 46 === k || iPhone && 127 === k ? (pos = input.caret(), 
                        begin = pos.begin, end = pos.end, end - begin === 0 && (begin = 46 !== k ? seekPrev(begin) : end = seekNext(begin - 1), 
                        end = 46 === k ? seekNext(end) : end), clearBuffer(begin, end), shiftL(begin, end - 1), 
                        e.preventDefault()) : 13 === k ? blurEvent.call(this, e) : 27 === k && (input.val(focusText), 
                        input.caret(0, checkVal()), e.preventDefault());
                    }
                }
                function keypressEvent(e) {
                    if (!input.prop("readonly")) {
                        var p, c, next, k = e.which || e.keyCode, pos = input.caret();
                        if (!(e.ctrlKey || e.altKey || e.metaKey || 32 > k) && k && 13 !== k) {
                            if (pos.end - pos.begin !== 0 && (clearBuffer(pos.begin, pos.end), shiftL(pos.begin, pos.end - 1)), 
                            p = seekNext(pos.begin - 1), len > p && (c = String.fromCharCode(k), tests[p].test(c))) {
                                if (shiftR(p), buffer[p] = c, writeBuffer(), next = seekNext(p), android) {
                                    var proxy = function() {
                                        $.proxy($.fn.caret, input, next)();
                                    };
                                    setTimeout(proxy, 0);
                                } else input.caret(next);
                                pos.begin <= lastRequiredNonMaskPos && tryFireCompleted();
                            }
                            e.preventDefault();
                        }
                    }
                }
                function clearBuffer(start, end) {
                    var i;
                    for (i = start; end > i && len > i; i++) tests[i] && (buffer[i] = getPlaceholder(i));
                }
                function writeBuffer() {
                    input.val(buffer.join(""));
                }
                function checkVal(allow) {
                    var i, c, pos, test = input.val(), lastMatch = -1;
                    for (i = 0, pos = 0; len > i; i++) if (tests[i]) {
                        for (buffer[i] = getPlaceholder(i); pos++ < test.length; ) if (c = test.charAt(pos - 1), 
                        tests[i].test(c)) {
                            buffer[i] = c, lastMatch = i;
                            break;
                        }
                        if (pos > test.length) {
                            clearBuffer(i + 1, len);
                            break;
                        }
                    } else buffer[i] === test.charAt(pos) && pos++, partialPosition > i && (lastMatch = i);

                    return allow ? writeBuffer() : partialPosition > lastMatch + 1 ? settings.autoclear || buffer.join("") === defaultBuffer ? (input.val()) : writeBuffer() : (writeBuffer(), input.val(input.val().substring(0, lastMatch + 1))), 
                    partialPosition ? i : firstNonMaskPos;
                }
                var input = $(this), buffer = $.map(mask.split(""), function(c, i) {
                    return "?" != c ? defs[c] ? getPlaceholder(i) : c : void 0;
                }), defaultBuffer = buffer.join(""), focusText = input.val();
                input.data($.mask.dataName, function() {
                    return $.map(buffer, function(c, i) {
                        return tests[i] && c != getPlaceholder(i) ? c : null;
                    }).join("");
                }), input.one("unmask", function() {
                    input.off(".mask").removeData($.mask.dataName);
                }).on("focus.mask", function() {
                    if (!input.prop("readonly")) {
                        clearTimeout(caretTimeoutId);
                        var pos;
                        focusText = input.val(), pos = checkVal(), caretTimeoutId = setTimeout(function() {
                            input.get(0) === document.activeElement && (writeBuffer(), pos == mask.replace("?", "").length ? input.caret(0, pos) : input.caret(pos));
                        }, 10);
                    }
                }).on("blur.mask", blurEvent).on("keydown.mask", keydownEvent).on("keypress.mask", keypressEvent).on("input.mask paste.mask", function() {
                    input.prop("readonly") || setTimeout(function() {
                        var pos = checkVal(!0);
                        input.caret(pos), tryFireCompleted();
                    }, 0);
                }), chrome && android && input.off("input.mask").on("input.mask", androidInputEvent), 
                checkVal();
            });
        }
    });
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_jquery_maskedinput__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_jquery_maskedinput___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__libs_jquery_maskedinput__);


$(".default-phone").mask("+7(000)000-00-00");


/***/ })
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9qcy9saWJzL2pxdWVyeS5tYXNrZWRpbnB1dC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvaGVscC9tYXNrLXBob25lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gICAgalF1ZXJ5IE1hc2tlZCBJbnB1dCBQbHVnaW5cbiAgICBDb3B5cmlnaHQgKGMpIDIwMDcgLSAyMDE1IEpvc2ggQnVzaCAoZGlnaXRhbGJ1c2guY29tKVxuICAgIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSAoaHR0cDovL2RpZ2l0YWxidXNoLmNvbS9wcm9qZWN0cy9tYXNrZWQtaW5wdXQtcGx1Z2luLyNsaWNlbnNlKVxuICAgIFZlcnNpb246IDEuNC4xXG4qL1xuIWZ1bmN0aW9uKGZhY3RvcnkpIHtcbiAgICBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIGRlZmluZSAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsgXCJqcXVlcnlcIiBdLCBmYWN0b3J5KSA6IGZhY3RvcnkoXCJvYmplY3RcIiA9PSB0eXBlb2YgZXhwb3J0cyA/IHJlcXVpcmUoXCJqcXVlcnlcIikgOiBqUXVlcnkpO1xufShmdW5jdGlvbigkKSB7XG4gICAgdmFyIGNhcmV0VGltZW91dElkLCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQsIGlQaG9uZSA9IC9pcGhvbmUvaS50ZXN0KHVhKSwgY2hyb21lID0gL2Nocm9tZS9pLnRlc3QodWEpLCBhbmRyb2lkID0gL2FuZHJvaWQvaS50ZXN0KHVhKTtcbiAgICAkLm1hc2sgPSB7XG4gICAgICAgIGRlZmluaXRpb25zOiB7XG4gICAgICAgICAgICBcIjBcIjogXCJbMC05XVwiLFxuICAgICAgICAgICAgYTogXCJbQS1aYS16XVwiLFxuICAgICAgICAgICAgXCIqXCI6IFwiW0EtWmEtetCwLdGP0JAt0K8wLTldXCIsXG4gICAgICAgICAgICBcIn5cIjogXCJb0JAt0Y/QgdGRMC05XFxcXFxcXFwvXyAtXVwiXG4gICAgICAgIH0sXG4gICAgICAgIGF1dG9jbGVhcjogITAsXG4gICAgICAgIGRhdGFOYW1lOiBcInJhd01hc2tGblwiLFxuICAgICAgICBwbGFjZWhvbGRlcjogXCJcIlxuICAgIH0sICQuZm4uZXh0ZW5kKHtcbiAgICAgICAgY2FyZXQ6IGZ1bmN0aW9uKGJlZ2luLCBlbmQpIHtcbiAgICAgICAgICAgIHZhciByYW5nZTtcbiAgICAgICAgICAgIGlmICgwICE9PSB0aGlzLmxlbmd0aCAmJiAhdGhpcy5pcyhcIjpoaWRkZW5cIikpIHJldHVybiBcIm51bWJlclwiID09IHR5cGVvZiBiZWdpbiA/IChlbmQgPSBcIm51bWJlclwiID09IHR5cGVvZiBlbmQgPyBlbmQgOiBiZWdpbiwgXG4gICAgICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3Rpb25SYW5nZSA/IHRoaXMuc2V0U2VsZWN0aW9uUmFuZ2UoYmVnaW4sIGVuZCkgOiB0aGlzLmNyZWF0ZVRleHRSYW5nZSAmJiAocmFuZ2UgPSB0aGlzLmNyZWF0ZVRleHRSYW5nZSgpLCBcbiAgICAgICAgICAgICAgICByYW5nZS5jb2xsYXBzZSghMCksIHJhbmdlLm1vdmVFbmQoXCJjaGFyYWN0ZXJcIiwgZW5kKSwgcmFuZ2UubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsIGJlZ2luKSwgXG4gICAgICAgICAgICAgICAgcmFuZ2Uuc2VsZWN0KCkpO1xuICAgICAgICAgICAgfSkpIDogKHRoaXNbMF0uc2V0U2VsZWN0aW9uUmFuZ2UgPyAoYmVnaW4gPSB0aGlzWzBdLnNlbGVjdGlvblN0YXJ0LCBlbmQgPSB0aGlzWzBdLnNlbGVjdGlvbkVuZCkgOiBkb2N1bWVudC5zZWxlY3Rpb24gJiYgZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlICYmIChyYW5nZSA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpLCBcbiAgICAgICAgICAgIGJlZ2luID0gMCAtIHJhbmdlLmR1cGxpY2F0ZSgpLm1vdmVTdGFydChcImNoYXJhY3RlclwiLCAtMWU1KSwgZW5kID0gYmVnaW4gKyByYW5nZS50ZXh0Lmxlbmd0aCksIFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJlZ2luOiBiZWdpbixcbiAgICAgICAgICAgICAgICBlbmQ6IGVuZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHVubWFzazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmlnZ2VyKFwidW5tYXNrXCIpO1xuICAgICAgICB9LFxuICAgICAgICBtYXNrOiBmdW5jdGlvbihtYXNrLCBzZXR0aW5ncykge1xuICAgICAgICAgICAgdmFyIG9yaWcgPSAkKHRoaXNbMF0pO1xuICAgICAgICAgICAgdmFyIGlucHV0LCBkZWZzLCB0ZXN0cywgcGFydGlhbFBvc2l0aW9uLCBmaXJzdE5vbk1hc2tQb3MsIGxhc3RSZXF1aXJlZE5vbk1hc2tQb3MsIGxlbiwgb2xkVmFsO1xuICAgICAgICAgICAgaWYgKCFtYXNrICYmIHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGlucHV0ID0gJCh0aGlzWzBdKTtcbiAgICAgICAgICAgICAgICB2YXIgZm4gPSBpbnB1dC5kYXRhKCQubWFzay5kYXRhTmFtZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuID8gZm4oKSA6IHZvaWQgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZXR0aW5ncyA9ICQuZXh0ZW5kKHtcbiAgICAgICAgICAgICAgICBhdXRvY2xlYXI6ICQubWFzay5hdXRvY2xlYXIsXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6ICQubWFzay5wbGFjZWhvbGRlcixcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6IG51bGxcbiAgICAgICAgICAgIH0sIHNldHRpbmdzKSwgZGVmcyA9ICQubWFzay5kZWZpbml0aW9ucywgdGVzdHMgPSBbXSwgcGFydGlhbFBvc2l0aW9uID0gbGVuID0gbWFzay5sZW5ndGgsIFxuICAgICAgICAgICAgZmlyc3ROb25NYXNrUG9zID0gbnVsbCwgJC5lYWNoKG1hc2suc3BsaXQoXCJcIiksIGZ1bmN0aW9uKGksIGMpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVnZXggPSBvcmlnLmRhdGEoJ3JlZ2V4Jyk7XG4gICAgICAgICAgICAgICAgdmFyIHJlZnMgPSByZWdleCA/IHJlZ2V4IDogZGVmc1tjXTtcbiAgICAgICAgICAgICAgICBcIj9cIiA9PSBjID8gKGxlbi0tLCBwYXJ0aWFsUG9zaXRpb24gPSBpKSA6IHJlZnMgPyAodGVzdHMucHVzaChuZXcgUmVnRXhwKHJlZnMpKSwgXG4gICAgICAgICAgICAgICAgbnVsbCA9PT0gZmlyc3ROb25NYXNrUG9zICYmIChmaXJzdE5vbk1hc2tQb3MgPSB0ZXN0cy5sZW5ndGggLSAxKSwgcGFydGlhbFBvc2l0aW9uID4gaSAmJiAobGFzdFJlcXVpcmVkTm9uTWFza1BvcyA9IHRlc3RzLmxlbmd0aCAtIDEpKSA6IHRlc3RzLnB1c2gobnVsbCk7XG4gICAgICAgICAgICB9KSwgdGhpcy50cmlnZ2VyKFwidW5tYXNrXCIpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdHJ5RmlyZUNvbXBsZXRlZCgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmNvbXBsZXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IGZpcnN0Tm9uTWFza1BvczsgbGFzdFJlcXVpcmVkTm9uTWFza1BvcyA+PSBpOyBpKyspIGlmICh0ZXN0c1tpXSAmJiBidWZmZXJbaV0gPT09IGdldFBsYWNlaG9sZGVyKGkpKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5jb21wbGV0ZWQuY2FsbChpbnB1dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UGxhY2Vob2xkZXIoaSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2V0dGluZ3MucGxhY2Vob2xkZXIuY2hhckF0KGkgPCBzZXR0aW5ncy5wbGFjZWhvbGRlci5sZW5ndGggPyBpIDogMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNlZWtOZXh0KHBvcykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKDsrK3BvcyA8IGxlbiAmJiAhdGVzdHNbcG9zXTsgKSA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwb3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNlZWtQcmV2KHBvcykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKDstLXBvcyA+PSAwICYmICF0ZXN0c1twb3NdOyApIDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBvcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc2hpZnRMKGJlZ2luLCBlbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGksIGo7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKDAgPiBiZWdpbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IGJlZ2luLCBqID0gc2Vla05leHQoZW5kKTsgbGVuID4gaTsgaSsrKSBpZiAodGVzdHNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShsZW4gPiBqICYmIHRlc3RzW2ldLnRlc3QoYnVmZmVyW2pdKSkpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlcltpXSA9IGJ1ZmZlcltqXSwgYnVmZmVyW2pdID0gZ2V0UGxhY2Vob2xkZXIoaiksIGogPSBzZWVrTmV4dChqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQnVmZmVyKCksIGlucHV0LmNhcmV0KE1hdGgubWF4KGZpcnN0Tm9uTWFza1BvcywgYmVnaW4pKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBzaGlmdFIocG9zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpLCBjLCBqLCB0O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSBwb3MsIGMgPSBnZXRQbGFjZWhvbGRlcihwb3MpOyBsZW4gPiBpOyBpKyspIGlmICh0ZXN0c1tpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogPSBzZWVrTmV4dChpKSwgdCA9IGJ1ZmZlcltpXSwgYnVmZmVyW2ldID0gYywgIShsZW4gPiBqICYmIHRlc3RzW2pdLnRlc3QodCkpKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGMgPSB0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGFuZHJvaWRJbnB1dEV2ZW50KCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3VyVmFsID0gaW5wdXQudmFsKCksIHBvcyA9IGlucHV0LmNhcmV0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvbGRWYWwgJiYgb2xkVmFsLmxlbmd0aCAmJiBvbGRWYWwubGVuZ3RoID4gY3VyVmFsLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjaGVja1ZhbCghMCk7IHBvcy5iZWdpbiA+IDAgJiYgIXRlc3RzW3Bvcy5iZWdpbiAtIDFdOyApIHBvcy5iZWdpbi0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IHBvcy5iZWdpbikgZm9yICg7cG9zLmJlZ2luIDwgZmlyc3ROb25NYXNrUG9zICYmICF0ZXN0c1twb3MuYmVnaW5dOyApIHBvcy5iZWdpbisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2FyZXQocG9zLmJlZ2luLCBwb3MuYmVnaW4pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjaGVja1ZhbCghMCk7IHBvcy5iZWdpbiA8IGxlbiAmJiAhdGVzdHNbcG9zLmJlZ2luXTsgKSBwb3MuYmVnaW4rKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmNhcmV0KHBvcy5iZWdpbiwgcG9zLmJlZ2luKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0cnlGaXJlQ29tcGxldGVkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGJsdXJFdmVudCgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tWYWwoKSwgaW5wdXQudmFsKCkgIT0gZm9jdXNUZXh0ICYmIGlucHV0LmNoYW5nZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBrZXlkb3duRXZlbnQoZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlucHV0LnByb3AoXCJyZWFkb25seVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvcywgYmVnaW4sIGVuZCwgayA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2xkVmFsID0gaW5wdXQudmFsKCksIDggPT09IGsgfHwgNDYgPT09IGsgfHwgaVBob25lICYmIDEyNyA9PT0gayA/IChwb3MgPSBpbnB1dC5jYXJldCgpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luID0gcG9zLmJlZ2luLCBlbmQgPSBwb3MuZW5kLCBlbmQgLSBiZWdpbiA9PT0gMCAmJiAoYmVnaW4gPSA0NiAhPT0gayA/IHNlZWtQcmV2KGJlZ2luKSA6IGVuZCA9IHNlZWtOZXh0KGJlZ2luIC0gMSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kID0gNDYgPT09IGsgPyBzZWVrTmV4dChlbmQpIDogZW5kKSwgY2xlYXJCdWZmZXIoYmVnaW4sIGVuZCksIHNoaWZ0TChiZWdpbiwgZW5kIC0gMSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpKSA6IDEzID09PSBrID8gYmx1ckV2ZW50LmNhbGwodGhpcywgZSkgOiAyNyA9PT0gayAmJiAoaW5wdXQudmFsKGZvY3VzVGV4dCksIFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2FyZXQoMCwgY2hlY2tWYWwoKSksIGUucHJldmVudERlZmF1bHQoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24ga2V5cHJlc3NFdmVudChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaW5wdXQucHJvcChcInJlYWRvbmx5XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcCwgYywgbmV4dCwgayA9IGUud2hpY2ggfHwgZS5rZXlDb2RlLCBwb3MgPSBpbnB1dC5jYXJldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoZS5jdHJsS2V5IHx8IGUuYWx0S2V5IHx8IGUubWV0YUtleSB8fCAzMiA+IGspICYmIGsgJiYgMTMgIT09IGspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9zLmVuZCAtIHBvcy5iZWdpbiAhPT0gMCAmJiAoY2xlYXJCdWZmZXIocG9zLmJlZ2luLCBwb3MuZW5kKSwgc2hpZnRMKHBvcy5iZWdpbiwgcG9zLmVuZCAtIDEpKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcCA9IHNlZWtOZXh0KHBvcy5iZWdpbiAtIDEpLCBsZW4gPiBwICYmIChjID0gU3RyaW5nLmZyb21DaGFyQ29kZShrKSwgdGVzdHNbcF0udGVzdChjKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNoaWZ0UihwKSwgYnVmZmVyW3BdID0gYywgd3JpdGVCdWZmZXIoKSwgbmV4dCA9IHNlZWtOZXh0KHApLCBhbmRyb2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJveHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLnByb3h5KCQuZm4uY2FyZXQsIGlucHV0LCBuZXh0KSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocHJveHksIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaW5wdXQuY2FyZXQobmV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5iZWdpbiA8PSBsYXN0UmVxdWlyZWROb25NYXNrUG9zICYmIHRyeUZpcmVDb21wbGV0ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNsZWFyQnVmZmVyKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IHN0YXJ0OyBlbmQgPiBpICYmIGxlbiA+IGk7IGkrKykgdGVzdHNbaV0gJiYgKGJ1ZmZlcltpXSA9IGdldFBsYWNlaG9sZGVyKGkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gd3JpdGVCdWZmZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbChidWZmZXIuam9pbihcIlwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrVmFsKGFsbG93KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpLCBjLCBwb3MsIHRlc3QgPSBpbnB1dC52YWwoKSwgbGFzdE1hdGNoID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIHBvcyA9IDA7IGxlbiA+IGk7IGkrKykgaWYgKHRlc3RzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGJ1ZmZlcltpXSA9IGdldFBsYWNlaG9sZGVyKGkpOyBwb3MrKyA8IHRlc3QubGVuZ3RoOyApIGlmIChjID0gdGVzdC5jaGFyQXQocG9zIC0gMSksIFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVzdHNbaV0udGVzdChjKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlcltpXSA9IGMsIGxhc3RNYXRjaCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9zID4gdGVzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckJ1ZmZlcihpICsgMSwgbGVuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGJ1ZmZlcltpXSA9PT0gdGVzdC5jaGFyQXQocG9zKSAmJiBwb3MrKywgcGFydGlhbFBvc2l0aW9uID4gaSAmJiAobGFzdE1hdGNoID0gaSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsbG93ID8gd3JpdGVCdWZmZXIoKSA6IHBhcnRpYWxQb3NpdGlvbiA+IGxhc3RNYXRjaCArIDEgPyBzZXR0aW5ncy5hdXRvY2xlYXIgfHwgYnVmZmVyLmpvaW4oXCJcIikgPT09IGRlZmF1bHRCdWZmZXIgPyAoaW5wdXQudmFsKCkpIDogd3JpdGVCdWZmZXIoKSA6ICh3cml0ZUJ1ZmZlcigpLCBpbnB1dC52YWwoaW5wdXQudmFsKCkuc3Vic3RyaW5nKDAsIGxhc3RNYXRjaCArIDEpKSksIFxuICAgICAgICAgICAgICAgICAgICBwYXJ0aWFsUG9zaXRpb24gPyBpIDogZmlyc3ROb25NYXNrUG9zO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpLCBidWZmZXIgPSAkLm1hcChtYXNrLnNwbGl0KFwiXCIpLCBmdW5jdGlvbihjLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIj9cIiAhPSBjID8gZGVmc1tjXSA/IGdldFBsYWNlaG9sZGVyKGkpIDogYyA6IHZvaWQgMDtcbiAgICAgICAgICAgICAgICB9KSwgZGVmYXVsdEJ1ZmZlciA9IGJ1ZmZlci5qb2luKFwiXCIpLCBmb2N1c1RleHQgPSBpbnB1dC52YWwoKTtcbiAgICAgICAgICAgICAgICBpbnB1dC5kYXRhKCQubWFzay5kYXRhTmFtZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkLm1hcChidWZmZXIsIGZ1bmN0aW9uKGMsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXN0c1tpXSAmJiBjICE9IGdldFBsYWNlaG9sZGVyKGkpID8gYyA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgfSksIGlucHV0Lm9uZShcInVubWFza1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQub2ZmKFwiLm1hc2tcIikucmVtb3ZlRGF0YSgkLm1hc2suZGF0YU5hbWUpO1xuICAgICAgICAgICAgICAgIH0pLm9uKFwiZm9jdXMubWFza1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpbnB1dC5wcm9wKFwicmVhZG9ubHlcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChjYXJldFRpbWVvdXRJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNUZXh0ID0gaW5wdXQudmFsKCksIHBvcyA9IGNoZWNrVmFsKCksIGNhcmV0VGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5nZXQoMCkgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgKHdyaXRlQnVmZmVyKCksIHBvcyA9PSBtYXNrLnJlcGxhY2UoXCI/XCIsIFwiXCIpLmxlbmd0aCA/IGlucHV0LmNhcmV0KDAsIHBvcykgOiBpbnB1dC5jYXJldChwb3MpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLm9uKFwiYmx1ci5tYXNrXCIsIGJsdXJFdmVudCkub24oXCJrZXlkb3duLm1hc2tcIiwga2V5ZG93bkV2ZW50KS5vbihcImtleXByZXNzLm1hc2tcIiwga2V5cHJlc3NFdmVudCkub24oXCJpbnB1dC5tYXNrIHBhc3RlLm1hc2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnByb3AoXCJyZWFkb25seVwiKSB8fCBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IGNoZWNrVmFsKCEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmNhcmV0KHBvcyksIHRyeUZpcmVDb21wbGV0ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgfSksIGNocm9tZSAmJiBhbmRyb2lkICYmIGlucHV0Lm9mZihcImlucHV0Lm1hc2tcIikub24oXCJpbnB1dC5tYXNrXCIsIGFuZHJvaWRJbnB1dEV2ZW50KSwgXG4gICAgICAgICAgICAgICAgY2hlY2tWYWwoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Fzc2V0cy9qcy9saWJzL2pxdWVyeS5tYXNrZWRpbnB1dC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCAnLi4vbGlicy9qcXVlcnkubWFza2VkaW5wdXQnXG5cbiQoXCIuZGVmYXVsdC1waG9uZVwiKS5tYXNrKFwiKzcoMDAwKTAwMC0wMC0wMFwiKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXNzZXRzL2pzL2hlbHAvbWFzay1waG9uZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDekxBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7OztBIiwic291cmNlUm9vdCI6IiJ9