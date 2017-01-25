"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Histogram = function () {
  function Histogram(size) {
    _classCallCheck(this, Histogram);

    this.histogram = new Array(size).fill(0);
  }

  _createClass(Histogram, [{
    key: "inc",
    value: function inc(index) {
      this.histogram[index] += 1;
    }
  }, {
    key: "get",
    value: function get() {
      return this.histogram;
    }
  }]);

  return Histogram;
}();

exports.default = Histogram;