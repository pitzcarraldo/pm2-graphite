import pm2 from 'pm2';
import pmx from 'pmx';
import semver from 'semver';
import pkg from '../package.json';
import PM2Monyt from './PM2Monyt';

const conf = pmx.initModule({});
const { app_name: appName, graphite_host: host, graphite_post: port } = conf;

pm2.connect(function (err) {
  if (err) {
    throw new Error(err);
  }

  // PM2 version checking
  pm2.getVersion(function (err, data) {
    if (semver.gte(data, '0.15.11') == false) {
      exit();
      throw new Error('This PM2 version is not compatible with %s!!', pkg.name);
    }
  });

  pm2.launchBus(function (err, bus) {
    pm2.list(function (err, list) {
      const clusters = list.filter(each => each.name === appName);
      if (err) {
        throw new Error(err);
      }
      console.log('[%s:%s] ready', pkg.name, pkg.version);
      const monyt = new PM2Monyt({ clusters, host, port, bus });
      monyt.listen();
    });
  });
});

function exit() {
  pm2.disconnect();
  pm2.disconnectBus();
}

/**
 * When PM2 try to kill app
 */
process.on('SIGINT', function () {
  exit();
  setTimeout(function () {
    process.exit(0);
  }, 200);
});
