import CarbonClient from 'graphite/lib/CarbonClient';

export default class Graphite extends CarbonClient {
  constructor(host, port) {
    super({ dsn: `plaintext://${host}:${port}/` });
  }

  write(metrics) {
    this._lazyConnect();

    return new Promise((res, rej) => {

      const lines = Object.keys(metrics).reduce((prevLines, key) => {
        const value = metrics[key].value;
        const timestamp = Math.floor((metrics[key].timestamp || Date.now()) / 1000);
        prevLines.push(`${[ key, value, timestamp ].join(' ')}\n`);
        return prevLines;
      }, []).join('');

      res(this._socket.write(lines, 'UTF-8', error => {
        rej(error);
      }));
    });
  }
}
