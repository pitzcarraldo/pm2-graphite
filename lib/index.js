'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _pm = require('pm2');

var _pm2 = _interopRequireDefault(_pm);

var _pmx = require('pmx');

var _pmx2 = _interopRequireDefault(_pmx);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _babelPromisify = require('babel-promisify');

var _babelPromisify2 = _interopRequireDefault(_babelPromisify);

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _Listener = require('./Listener');

var _Listener2 = _interopRequireDefault(_Listener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadConfig = function loadConfig(path) {
  try {
    var _ret = function () {
      var rawConfig = (0, _flat2.default)(require(path));
      return {
        v: (0, _keys2.default)(rawConfig).reduce(function (config, key) {
          if (key.toLowerCase().includes('graphite.host')) {
            config.host = rawConfig[key];
          }
          if (key.toLowerCase().includes('graphite.port')) {
            config.port = rawConfig[key];
          }
          return config;
        }, {})
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
  } catch (error) {
    return null;
  }
};

var getClient = function getClient() {
  var _pmx$initModule = _pmx2.default.initModule({});

  var path = _pmx$initModule.path;
  var host = _pmx$initModule.host;
  var port = _pmx$initModule.port;
  var interval = _pmx$initModule.interval;

  var config = path && loadConfig(path) || {};
  return (0, _extends3.default)({ host: host, port: port, interval: interval }, config);
};

var exit = function exit() {
  _pm2.default.disconnect();
  _pm2.default.disconnectBus();
};

(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  var bus, listener;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _babelPromisify2.default)(_pm2.default.connect)();

        case 3:
          _context.t0 = _semver2.default;
          _context.next = 6;
          return (0, _babelPromisify2.default)(_pm2.default.getVersion)();

        case 6:
          _context.t1 = _context.sent;

          if (!_context.t0.lt.call(_context.t0, _context.t1, '0.15.11')) {
            _context.next = 10;
            break;
          }

          exit();
          throw new Error('This PM2 version is not compatible with %s!!', _package2.default.name);

        case 10:
          _context.next = 12;
          return (0, _babelPromisify2.default)(_pm2.default.launchBus).call(_pm2.default);

        case 12:
          bus = _context.sent;
          listener = new _Listener2.default((0, _extends3.default)({}, getClient(), { bus: bus }));

          listener.listen();
          console.log('[%s:%s] ready', _package2.default.name, _package2.default.version);
          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t2 = _context['catch'](0);

          console.error(_context.t2.stack);
          exit();

        case 22:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined, [[0, 18]]);
}))();

/**
 * When PM2 tries to kill app
 */
process.on('SIGINT', function () {
  exit();
  setTimeout(function () {
    process.exit(0);
  }, 200);
});
//# sourceMappingURL=index.js.map