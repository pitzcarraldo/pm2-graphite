# pm2-monyt-graphite

[![Build Status](https://travis-ci.org/Pitzcarraldo/pm2-monyt-graphite.svg)](https://travis-ci.org/Pitzcarraldo/pm2-monyt-graphite)
[![Coverage Status](https://coveralls.io/repos/github/Pitzcarraldo/pm2-monyt-graphite/badge.svg?branch=master)](https://coveralls.io/github/Pitzcarraldo/pm2-monyt-graphite?branch=master)
[![npm version](https://img.shields.io/npm/v/pm2-monyt-graphite.svg?style=flat-square)](https://www.npmjs.com/package/pm2-monyt-graphite)
[![npm downloads](https://img.shields.io/npm/dm/pm2-monyt-graphite.svg?style=flat-square)](https://www.npmjs.com/package/pm2-monyt-graphite)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/Pitzcarraldo/pm2-monyt-graphite)

PM2 graphite sender module for send aggregated metricses from [Monyt](http://github.com/Pitzcaraldo/monyt).

If you send messages from cluster of PM2, pm2-monyt-graphite will aggregate and send them to graphite server.

## Usage

### Installation

```bash
$ pm2 install pm2-monyt-graphite
$ pm2 set pm2-monyt-graphite:app your-app-name
$ pm2 set pm2-monyt-graphite:host my.graphite.host.com #target graphite host
$ pm2 set pm2-monyt-graphite:port 2003 #target graphite port
```

### PM2 Application Configuration (`app.json`)

```json
{
  "apps": [
    {
      "name": "your-app-name",
      "...": "~~~"
      "exec_mode": "cluster",
      }
    }
  ]
}
```

### `Monyt` Configuration of your app.

```js
import Monyt, {
  ProcessSender,
  RequestCountMetrics,
  ErrorCountMetrics
} from 'monyt';
import os from 'os';

const interval = 10000;
const prefix = `app_name.${os.hostname()}.$id.`; //String `$id` will replaced to app id of PM2. (Only first thing)
const senders = [new ProcessSender({host: 'my.graphite.host.com', port: 2003})]; //Add ProcessSender instance to your senders. If set host and port to here, configuration of `pm2-monyt-graphite` would be overriden.

const metricses = [
  new RequestCountMetrics(),
  new ErrorCountMetrics()
];

export default new Monyt({
  interval,
  senders,
  metricses,
  prefix,
  replaceConsole: true
});
```

### Metrics that would send to graphite

```json
{
    "app_name.some-hostname.1.requestCounts" : 100,
    "app_name.some-hostname.1.errorCounts" : 10,
    "app_name.some-hostname.2.requestCounts" : 100,
    "app_name.some-hostname.2.errorCounts" : 10,
    "app_name.some-hostname.3.requestCounts" : 100,
    "app_name.some-hostname.3.errorCounts" : 10,
    "app_name.some-hostname.4.requestCounts" : 100,
    "app_name.some-hostname.4.errorCounts" : 10
}
```
