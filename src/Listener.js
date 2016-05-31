import Graphite from './Graphite';
import Metrics from './Metrics';

const DEFAULT_INTERVAL = 10000;

export default class Listener {
  constructor(options = {}) {
    this.bus = options.bus;
    this.interval = options.interval || DEFAULT_INTERVAL;
    this.sender = new Graphite(options.host, options.port);
    this.metrics = new Metrics();
  }

  async listen() {
    const result = await this.sender.connect();
    console.log(result);

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
