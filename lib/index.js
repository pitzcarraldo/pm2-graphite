'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _pm = require('pm2');

var _pm2 = _interopRequireDefault(_pm);

var _pmx = require('pmx');

var _pmx2 = _interopRequireDefault(_pmx);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _babelPromisify = require('babel-promisify');

var _babelPromisify2 = _interopRequireDefault(_babelPromisify);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _PM2Monyt = require('./PM2Monyt');

var _PM2Monyt2 = _interopRequireDefault(_PM2Monyt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var conf = _pmx2.default.initModule({});
var app = conf.app;
var host = conf.host;
var port = conf.port;


var exit = function exit() {
  _pm2.default.disconnect();
  _pm2.default.disconnectBus();
};

(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  var bus, list, clusters, monyt;
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
          _context.next = 15;
          return (0, _babelPromisify2.default)(_pm2.default.list)();

        case 15:
          list = _context.sent;
          clusters = list.filter(function (each) {
            return each.name === app;
          });
          monyt = new _PM2Monyt2.default({ clusters: clusters, host: host, port: port, bus: bus });

          monyt.listen();
          console.log('[%s:%s] ready', _package2.default.name, _package2.default.version);
          _context.next = 26;
          break;

        case 22:
          _context.prev = 22;
          _context.t2 = _context['catch'](0);

          console.error(_context.t2.stack);
          exit();

        case 26:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined, [[0, 22]]);
}))();

/**
 * When PM2 try to kill app
 */
process.on('SIGINT', function () {
  exit();
  setTimeout(function () {
    process.exit(0);
  }, 200);
});
//# sourceMappingURL=index.js.map