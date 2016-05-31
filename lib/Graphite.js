'use strict';

exports.__esModule = true;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _graphite = require('graphite');

var _graphite2 = _interopRequireDefault(_graphite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Graphite = function () {
  function Graphite(host, port) {
    (0, _classCallCheck3.default)(this, Graphite);

    this.client = _graphite2.default.createClient('plaintext://' + host + ':' + port + '/');
    this.carbon = this.client._carbon;
    this.socket = this.carbon._socket;
  }

  Graphite.prototype.write = function write(metrics) {
    var _this = this;

    return new _promise2.default(function (res, rej) {
      _this.carbon._lazyConnect();

      var lines = '';
      (0, _keys2.default)(metrics).forEach(function (key) {
        var value = metrics[key].value;
        var timestamp = Math.floor((metrics[key].timestamp || Date.now()) / 1000);
        lines += [key, value, timestamp].join(' ') + '\n';
      });

      console.log(lines);
      res(_this.socket.write(lines, 'UTF-8', function (error) {
        rej(error);
      }));
    });
  };

  return Graphite;
}();

exports.default = Graphite;
//# sourceMappingURL=Graphite.js.map