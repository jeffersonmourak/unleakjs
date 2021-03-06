"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  var setIntervalOld = window.setInterval;

  var intervalPipe = [];

  var _unleakJS = function () {
    function _unleakJS() {
      _classCallCheck(this, _unleakJS);

      this.intervals = [];
      this.setIntervalOld = window.setInterval;
      this.oldClear = window.clearInterval;

      window.setInterval = this.setInterval;
      window.clearInterval = this.clearInterval;
    }

    _createClass(_unleakJS, [{
      key: "hashGen",
      value: function hashGen() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 10; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }return text;
      }
    }, {
      key: "setInterval",
      value: function setInterval(_arguments) {
        var _this = this,
            _arguments2 = arguments;

        if (!__unleakJS) {
          intervalPipe.push({ arguments: arguments });
        } else {
          var _ret = function () {
            var hash = __unleakJS.hashGen();
            var _interval = __unleakJS.setIntervalOld.apply(_this, _arguments2);
            __unleakJS.intervals.push({ hash: hash, call: _interval });
            return {
              v: {
                hash: hash,
                clear: function clear() {
                  __unleakJS.clearInterval({ hash: hash, call: _interval });
                }
              }
            };
          }();

          if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
        }
      }
    }, {
      key: "loadPipe",
      value: function loadPipe() {
        var _this2 = this;

        intervalPipe.map(function (pipe) {
          _this2.setInterval(pipe.arguments);
        });
      }
    }, {
      key: "clearIntervals",
      value: function clearIntervals(hash) {
        this.intervals.map(function (interval) {
          clearInterval(interval);
        });
      }
    }, {
      key: "clearInterval",
      value: function clearInterval(interval) {
        if (interval.clear) {
          interval.clear();
          return;
        }
        __unleakJS.oldClear.call(window, interval.call);
        __unleakJS.intervals.map(function (_interval, index) {
          if (_interval.hash === interval.hash) {
            __unleakJS.intervals = __unleakJS.intervals.splice(1, index);
            return;
          }
        });
      }
    }]);

    return _unleakJS;
  }();

  var __unleakJS = new _unleakJS();

  window.unleakJS = __unleakJS;

  window.addEventListener("load", function () {
    __unleakJS.loadPipe();
    window.setInterval = __unleakJS.setInterval;
    window.clearInterval = __unleakJS.clearInterval;
  }, false);

  window.addEventListener("beforeunload", function () {
    __unleakJS.clearIntervals();
  });
})();