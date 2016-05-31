import pm2 from 'pm2';
import pmx from 'pmx';
import semver from 'semver';
import $p from 'babel-promisify';
import flatten from 'flat';
import pkg from '../package.json';
import Listener from './Listener';

const loadConfig = (path) => {
  try {
    const rawConfig = flatten(require(path));
    return Object.keys(rawConfig).reduce((config, key) => {
      if (key.toLowerCase().includes('graphite.host')) {
        config.host = rawConfig[key];
      }
      if (key.toLowerCase().includes('graphite.port')) {
        config.port = rawConfig[key];
      }
      return config;
    }, {});
  } catch (error) {
    return null;
  }
};

const getClient = () => {
  const { path, host, port, interval = 10000 } = pmx.initModule({});
  const config = (path && loadConfig(path)) || {};
  return { host, port, interval, ...config };
};


const exit = () => {
  pm2.disconnect();
  pm2.disconnectBus();
};

(async() => {
  try {
    await $p(pm2.connect)();
    if (semver.lt(await $p(pm2.getVersion)(), '0.15.11')) {
      exit();
      throw new Error('This PM2 version is not compatible with %s!!', pkg.name);
    }
    const bus = await $p(pm2.launchBus).call(pm2);
    const monyt = new Listener({ ...getClient(), bus });
    monyt.listen();
    console.log('[%s:%s] ready', pkg.name, pkg.version);
  } catch (error) {
    console.error(error.stack);
    exit();
  }
})();

/**
 * When PM2 try to kill app
 */
process.on('SIGINT', () => {
  exit();
  setTimeout(() => {
    process.exit(0);
  }, 200);
});
