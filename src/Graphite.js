import graphite from 'graphite';

export default class Graphite {
  constructor(host, port) {
    this.client = graphite.createClient(`plaintext://${host}:${port}/`);
    this.carbon = this.client._carbon;
    this.socket = this.carbon._socket;
  }

  write(metrics) {
    return new Promise((res, rej) => {
      this.carbon._lazyConnect();

      let lines = '';
      Object.keys(metrics).forEach(key => {
        const value = metrics[key].value;
        const timestamp = Math.floor((metrics[key].timestamp || Date.now()) / 1000);
        lines += [ key, value, timestamp ].join(' ') + '\n';
      });

      console.log(lines);
      res(this.socket.write(lines, 'UTF-8', error => {
        rej(error);
      }));
    });
  }
}
