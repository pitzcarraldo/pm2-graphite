import GraphiteClient from 'graphite-client';

export default class Graphite extends GraphiteClient {

  connect() {
    return new Promise((res, rej) => {
      super.connect(error => {
        if (error) {
          return rej(error);
        }
        return res('Connected to Graphite server');
      });
    });
  }

  write(metrics) {
    return new Promise((res, rej) => {
      const lines = [];
      Object.keys(metrics).forEach(key => {
        const value = metrics[key].value;
        const timestamp = Math.floor((metrics[key].timestamp || Date.now()) / 1000);
        lines.push(`${[ key, value, timestamp ].join(' ')}\n`);
      });
      try {
        res(this.socket.write(lines.join('')));
      } catch (err) {
        rej(err);
      }
    });
  }
}
