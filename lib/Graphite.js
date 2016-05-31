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

var _graphiteClient = require('graphite-client');

var _graphiteClient2 = _interopRequireDefault(_graphiteClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Graphite = function (_GraphiteClient) {
  (0, _inherits3.default)(Graphite, _GraphiteClient);

  function Graphite() {
    (0, _classCallCheck3.default)(this, Graphite);
    return (0, _possibleConstructorReturn3.default)(this, _GraphiteClient.apply(this, arguments));
  }

  Graphite.prototype.connect = function connect() {
    var _this2 = this;

    return new _promise2.default(function (res, rej) {
      _GraphiteClient.prototype.connect.call(_this2, function (error) {
        if (error) {
          return rej(error);
        }
        return res('Connected to Graphite server');
      });
    });
  };

  Graphite.prototype.write = function write(metrics) {
    var _this3 = this;

    return new _promise2.default(function (res, rej) {
      var lines = '';
      (0, _keys2.default)(metrics).forEach(function (key) {
        var value = metrics[key].value;
        var timestamp = Math.floor((metrics[key].timestamp || Date.now()) / 1000);
        lines += [key, value, timestamp].join(' ') + '\n';
      });

      try {
        res(_this3.socket.write(lines));
      } catch (err) {
        rej(err);
      }
    });
  };

  return Graphite;
}(_graphiteClient2.default);

exports.default = Graphite;
//# sourceMappingURL=Graphite.js.map