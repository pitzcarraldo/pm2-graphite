import { GraphiteSender } from 'monyt';
import PM2Metrics from './PM2Metrics';

export default class PM2Monyt {
  constructor(options = {}) {
    this.clusters = options.clusters || [];
    this.sender = new GraphiteSender({ ...options });
    this.bus = options.bus;
    this.metrics = new PM2Metrics({ size: this.clusters.length });
  }

  listen() {
    this.bus.on('process:msg', ({ raw : { client, metrics }, process }) => {
      if (client) {
        this.sender = new GraphiteSender({ ...client });
      }
      if (metrics) {
        this.metrics.push(process.pm_id, metrics);
        if (this.metrics.isFull()) {
          this.sender.send(this.metrics.flatten())
            .then(() => this.metrics.empty())
            .catch(error => console.error(error.stack));
        }
      }
    });
    return this;
  }
}
