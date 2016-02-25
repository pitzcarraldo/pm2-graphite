'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PM2Metrics = function () {
  function PM2Metrics() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, PM2Metrics);

    this.size = options.size || 0;
    this.metricses = [];
  }

  PM2Metrics.prototype.push = function push(id, metrics) {
    this.metricses.push((0, _keys2.default)(metrics).reduce(function (prevMetrics, metricsKey) {
      prevMetrics[metricsKey.replace('$id', id)] = metrics[metricsKey];
      return prevMetrics;
    }, {}));
    return this;
  };

  PM2Metrics.prototype.flatten = function flatten() {
    return this.metricses.reduce(function (prev, curr) {
      return (0, _extends3.default)({}, prev, curr);
    }, {});
  };

  PM2Metrics.prototype.isFull = function isFull() {
    return this.metricses.length >= this.size;
  };

  PM2Metrics.prototype.empty = function empty() {
    this.metricses = [];
    return this.metricses;
  };

  return PM2Metrics;
}();

exports.default = PM2Metrics;
//# sourceMappingURL=PM2Metrics.js.map