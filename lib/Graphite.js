'use strict';

exports.__esModule = true;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

  Graphite.prototype.write = function write(metrics, callback) {
    var flatt = this.flatten(metrics);
    var lines = [];
    (0, _keys2.default)(flatt).forEach(function (key) {
      var value = flatt[key].value;
      var timestamp = Math.floor((flatt[key].timestamp || Date.now()) / 1000);
      lines.push([key, value, timestamp].join(' '));
    });
    try {
      this.socket.write(lines.join('\n'));
    } catch (err) {
      if (callback) {
        callback(err);
      } else {
        throw err;
      }
    }
  };

  return Graphite;
}(_graphiteClient2.default);

exports.default = Graphite;
//# sourceMappingURL=Graphite.js.map