'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _monyt = require('monyt');

var _PM2Metrics = require('./PM2Metrics');

var _PM2Metrics2 = _interopRequireDefault(_PM2Metrics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PM2Monyt = function () {
  function PM2Monyt() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, PM2Monyt);

    this.clusters = options.clusters || [];
    this.sender = new _monyt.GraphiteSender((0, _extends3.default)({}, options));
    this.bus = options.bus;
    this.metrics = new _PM2Metrics2.default({ size: this.clusters.length });
  }

  PM2Monyt.prototype.listen = function listen() {
    var _this = this;

    this.bus.on('process:msg', function (_ref) {
      var _ref$raw = _ref.raw;
      var client = _ref$raw.client;
      var metrics = _ref$raw.metrics;
      var process = _ref.process;

      if (client) {
        _this.sender = new _monyt.GraphiteSender((0, _extends3.default)({}, client));
      }
      if (metrics) {
        _this.metrics.push(process.pm_id, metrics);
        if (_this.metrics.isFull()) {
          _this.sender.send(_this.metrics.flatten()).then(function () {
            return _this.metrics.empty();
          }).catch(function (error) {
            return console.error(error.stack);
          });
        }
      }
    });
    return this;
  };

  return PM2Monyt;
}();

exports.default = PM2Monyt;
//# sourceMappingURL=PM2Monyt.js.map