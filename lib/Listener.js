'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _Graphite = require('./Graphite');

var _Graphite2 = _interopRequireDefault(_Graphite);

var _Metrics = require('./Metrics');

var _Metrics2 = _interopRequireDefault(_Metrics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_INTERVAL = 10000;
var DEFAULT_TIMEOUT = 5000;

var Listener = function () {
  function Listener() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Listener);

    this.bus = options.bus;
    this.interval = options.interval || DEFAULT_INTERVAL;
    this.sender = new _Graphite2.default(options.host, options.port, 'UTF-8', DEFAULT_TIMEOUT, function () {
      console.log('Graphite server connection timeout');
    });
    this.metrics = new _Metrics2.default();
  }

  Listener.prototype.listen = function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var _this = this;

      var result;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.sender.connect();

            case 2:
              result = _context.sent;

              console.log(result);

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

              return _context.abrupt('return', this);

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function listen() {
      return ref.apply(this, arguments);
    }

    return listen;
  }();

  return Listener;
}();

exports.default = Listener;
//# sourceMappingURL=Listener.js.map