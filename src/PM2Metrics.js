export default class PM2Metrics {
  constructor(options = {}) {
    this.size = options.size || 0;
    this.metricses = [];
  }

  push(id, metrics) {
    this.metricses.push(Object.keys(metrics).reduce((prevMetrics, metricsKey) => {
      prevMetrics[metricsKey.replace('$id', id)] = metrics[metricsKey];
      return prevMetrics;
    }, {}));
    return this;
  }

  flatten() {
    return this.metricses.reduce((prev, curr) => ({ ...prev, ...curr }), {});
  }

  isFull() {
    return this.metricses.length >= this.size;
  }

  empty() {
    this.metricses = [];
    return this.metricses;
  }
}
