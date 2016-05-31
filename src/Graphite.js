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
      const flatt = this.flatten(metrics);
      const lines = [];
      Object.keys(flatt).forEach(key => {
        const value = flatt[key].value;
        const timestamp = Math.floor((flatt[key].timestamp || Date.now()) / 1000);
        lines.push([ key, value, timestamp ].join(' '));
      });
      try {
        res(this.socket.write(lines.join('\n')));
      } catch (err) {
        rej(err);
      }
    });
  }
}
