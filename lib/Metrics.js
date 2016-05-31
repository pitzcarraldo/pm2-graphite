'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Metrics = function () {
  function Metrics() {
    (0, _classCallCheck3.default)(this, Metrics);

    this.metrics = [];
  }

  Metrics.prototype.push = function push(id, metrics) {
    var flat = (0, _flat2.default)(metrics);
    var timestamp = Date.now();
    this.metrics.push((0, _keys2.default)(flat).reduce(function (prevMetrics, metricsKey) {
      prevMetrics[metricsKey.replace('$id', id)] = {
        value: (0, _stringify2.default)(flat[metricsKey]),
        timestamp: timestamp
      };
      return prevMetrics;
    }, {}));
    return this;
  };

  Metrics.prototype.flatten = function flatten() {
    return this.metrics.reduce(function (prev, curr) {
      return (0, _extends3.default)({}, prev, curr);
    }, {});
  };

  Metrics.prototype.empty = function empty() {
    this.metrics = [];
    return this.metrics;
  };

  return Metrics;
}();

exports.default = Metrics;
//# sourceMappingURL=Metrics.js.map