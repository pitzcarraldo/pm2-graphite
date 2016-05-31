# pm2-graphite

[![Build Status](https://travis-ci.org/Pitzcarraldo/pm2-graphite.svg)](https://travis-ci.org/Pitzcarraldo/pm2-graphite)
[![Coverage Status](https://coveralls.io/repos/github/Pitzcarraldo/pm2-graphite/badge.svg?branch=master)](https://coveralls.io/github/Pitzcarraldo/pm2-graphite?branch=master)
[![npm version](https://img.shields.io/npm/v/pm2-graphite.svg?style=flat-square)](https://www.npmjs.com/package/pm2-graphite)
[![npm downloads](https://img.shields.io/npm/dm/pm2-graphite.svg?style=flat-square)](https://www.npmjs.com/package/pm2-graphite)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/Pitzcarraldo/pm2-graphite)

PM2 graphite sender module to send aggregated metrics.
If you send messages from cluster of PM2, pm2-graphite will aggregate and send them to graphite server.

## Usage

### Installation

```bash
$ pm2 install pm2-graphite
$ pm2 set pm2-graphite:interval 30000 # Default: 10000(ms)
# with configurtaion file
$ pm2 set pm2-graphite:path /absolute/path/of/the/configuration/file
# with pm2 configurtaion
$ pm2 set pm2-graphite:host my.graphite.host.com #target graphite host
$ pm2 set pm2-graphite:port 2003 #target graphite port
```

### Configuration File Format

```json
{
  "host": "my.graphite.host.com",
  "port": 2003
}
```

### PM2 Application Configuration (`app.json`)

```json
{
  "apps": [
    {
      "name": "app_name",
      "...": "~~~"
      "exec_mode": "cluster", // Only work with cluster mode, for now
      }
    }
  ]
}
```

### Send message from cluster to pm2-graphite

```js

const metrics = {
  'app_name.$id.metricsName': metricsValue // String `$id` will replaced to app id of PM2. (Only first appeared string)
  'app_name.$id.requestCount': 10000 // Example
};
process.send && process.send({ metrics });

```

### Metrics which would be sent to graphite

```json
{
    "app_name.1.requestCounts" : 100,
    "app_name.1.errorCounts" : 10,
    "app_name.2.requestCounts" : 100,
    "app_name.2.errorCounts" : 10,
    "app_name.3.requestCounts" : 100,
    "app_name.3.errorCounts" : 10,
    "app_name.4.requestCounts" : 100,
    "app_name.4.errorCounts" : 10
}
```
