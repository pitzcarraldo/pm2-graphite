import { GraphiteSender } from 'monyt';

export default class PM2Monyt {
  constructor(options = {}) {
    this.clusters = options.clusters || [];
    this.sender = new GraphiteSender({ ...options });
    this.bus = options.bus;
    this.metricses = {};
  }

  template(id, key, value) {
    const templated = {};
    templated[key.replace('$id', id)] = value;
    return templated;
  }

  listen() {
    this.bus.on('process:msg', ({ raw, process }) => {
      const { pm_id: pmId } = process;
      this.metricses[pmId] = raw.monyt || {};

      const ids = Object.keys(this.metricses);
      if (ids.length >= this.clusters.length) {
        const toSend = ids.reduce(
          (prev, id) =>
            Object.keys(
              this.metricses[id]).reduce(
              (curr, key) => ({ ...curr, ...this.template(id, key, this.metricses[id][key]) })
              , prev), {});
        this.sender.send(toSend)
          .then(() => {
            this.metricses = {};
          })
          .catch(error => console.error(error));
      }
    });
    return this;
  }
}
