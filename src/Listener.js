import Graphite from './Graphite';
import Metrics from './Metrics';

export default class Listener {
  constructor(options = {}) {
    this.bus = options.bus;
    this.interval = options.interval;
    this.sender = new Graphite(options.host, options.port);
    this.metrics = new Metrics();
  }

  listen() {
    this.bus.on('process:msg', ({ raw : { metrics }, process }) => {
      if (metrics) {
        this.metrics.push(process.pm_id, metrics);
      }
    });

    setInterval(() => {
      this.sender.write(this.metrics.flatten())
        .then(() => this.metrics.empty())
        .catch(error => console.error(error.stack));
    }, this.interval);

    return this;
  }
}
