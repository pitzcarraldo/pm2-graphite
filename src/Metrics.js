import flatten from 'flat';

export default class Metrics {
  constructor() {
    this.metrics = [];
  }

  push(id, metrics) {
    const flat = flatten(metrics);
    this.metrics.push(Object.keys(flat).reduce((prevMetrics, metricsKey) => {
      prevMetrics[metricsKey.replace('$id', id)] = {
        value: flat[metricsKey],
        timestamp: Date.now()
      };
      return prevMetrics;
    }, {}));
    return this;
  }

  flatten() {
    return this.metrics.reduce((prev, curr) => ({ ...prev, ...curr }), {});
  }

  empty() {
    this.metrics = [];
    return this.metrics;
  }
}
