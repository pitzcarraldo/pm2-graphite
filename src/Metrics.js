export default class Metrics {
  constructor() {
    this.metrics = [];
  }

  push(id, metrics) {
    this.metrics.push(Object.keys(metrics).reduce((prevMetrics, metricsKey) => {
      prevMetrics[metricsKey.replace('$id', id)] = {
        value: metrics[metricsKey],
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
