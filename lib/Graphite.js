'use strict';

exports.__esModule = true;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _CarbonClient2 = require('graphite/lib/CarbonClient');

var _CarbonClient3 = _interopRequireDefault(_CarbonClient2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Graphite = function (_CarbonClient) {
  (0, _inherits3.default)(Graphite, _CarbonClient);

  function Graphite(host, port) {
    (0, _classCallCheck3.default)(this, Graphite);
    return (0, _possibleConstructorReturn3.default)(this, _CarbonClient.call(this, { dsn: 'plaintext://' + host + ':' + port + '/' }));
  }

  Graphite.prototype.write = function write(metrics) {
    var _this2 = this;

    this._lazyConnect();

    return new _promise2.default(function (res, rej) {
      var lines = '';
      (0, _keys2.default)(metrics).forEach(function (key) {
        var value = metrics[key].value;
        var timestamp = Math.floor((metrics[key].timestamp || Date.now()) / 1000);
        lines += [key, value, timestamp].join(' ') + '\n';
      });

      res(_this2._socket.write(lines + '\n', 'UTF-8', function (error) {
        rej(error);
      }));
    });
  };

  return Graphite;
}(_CarbonClient3.default);

exports.default = Graphite;
//# sourceMappingURL=Graphite.js.map