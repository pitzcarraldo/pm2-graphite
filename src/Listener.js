import Graphite from './Graphite';
import Metrics from './Metrics';

const DEFAULT_INTERVAL = 10000;
const DEFAULT_TIMEOUT = 5000;

export default class Listener {
  constructor(options = {}) {
    this.bus = options.bus;
    this.interval = options.interval || DEFAULT_INTERVAL;
    this.sender = new Graphite(options.host, options.port, 'UTF-8', DEFAULT_TIMEOUT, () => {
      console.log('Graphite server connection timeout');
    });
    this.metrics = new Metrics();
  }

  listen() {
    this.bus.on('process:msg', ({ raw : { metrics }, process }) => {
      if (metrics) {
        this.metrics.push(process.pm_id, metrics);
      }
    });

    setInterval(() => {
      this.sender.write(this.metrics.flatten(), error => {
        if (error) {
          console.error(error.stack);
          return;
        }
        this.metrics.empty();
      });
    }, this.interval);

    return this;
  }
}
