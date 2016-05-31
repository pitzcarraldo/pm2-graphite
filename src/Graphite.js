import GraphiteClient from 'graphite-client';

export default class Graphite extends GraphiteClient {

  write(metrics, callback) {
    const flatt = this.flatten(metrics);
    const lines = [];
    Object.keys(flatt).forEach(key => {
      const value = flatt[key].value;
      const timestamp = Math.floor((flatt[key].timestamp || Date.now()) / 1000);
      lines.push([ key, value, timestamp ].join(' '));
    });
    try {
      this.socket.write(lines.join('\n'));
    } catch (err) {
      if (callback) {
        callback(err);
      } else {
        throw err;
      }
    }
  }
}
