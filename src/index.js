import pm2 from 'pm2';
import pmx from 'pmx';
import semver from 'semver';
import $p from 'babel-promisify';
import pkg from '../package.json';
import PM2Monyt from './PM2Monyt';

const conf = pmx.initModule({});
const { app, host, port } = conf;
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
    const list = await $p(pm2.list)();
    const bus = await $p(pm2.launchBus).call(pm2);
    const clusters = list.filter(each => each.name === app);
    const monyt = new PM2Monyt({ clusters, host, port, bus });
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
