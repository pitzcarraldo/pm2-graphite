'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _Graphite = require('./Graphite');

var _Graphite2 = _interopRequireDefault(_Graphite);

var _Metrics = require('./Metrics');

var _Metrics2 = _interopRequireDefault(_Metrics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_INTERVAL = 10000;

var Listener = function () {
  function Listener() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Listener);

    this.bus = options.bus;
    this.interval = options.interval || DEFAULT_INTERVAL;
    this.sender = new _Graphite2.default(options.host, options.port);
    this.metrics = new _Metrics2.default();
  }

  Listener.prototype.listen = function listen() {
    var _this = this;

    this.bus.on('process:msg', function (_ref) {
      var metrics = _ref.raw.metrics;
      var process = _ref.process;

      if (metrics) {
        _this.metrics.push(process.pm_id, metrics);
      }
    });

    setInterval(function () {
      _this.sender.write(_this.metrics.flatten()).then(function () {
        return _this.metrics.empty();
      }).catch(function (error) {
        return console.error(error.stack);
      });
    }, this.interval);

    return this;
  };

  return Listener;
}();

exports.default = Listener;
//# sourceMappingURL=Listener.js.map