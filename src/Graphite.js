import CarbonClient from 'graphite/lib/CarbonClient';

export default class Graphite extends CarbonClient {
  constructor(host, port) {
    super({ dsn: `plaintext://${host}:${port}/` });
  }

  write(metrics) {
    this._lazyConnect();

    return new Promise((res, rej) => {
      let lines = '';
      Object.keys(metrics).forEach(key => {
        const value = metrics[key].value;
        const timestamp = Math.floor((metrics[key].timestamp || Date.now()) / 1000);
        lines += [ key, value, timestamp ].join(' ') + '\n';
      });

      res(this._socket.write(lines + '\n', 'UTF-8', error => {
        rej(error);
      }));
    });
  }
}
