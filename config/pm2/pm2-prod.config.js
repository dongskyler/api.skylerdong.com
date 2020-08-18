/**
 * @summary Back-end API for my personal websites.
 * @author Skyler Dong <skyler@skylerdong.com>
 * @copyright 2020 Skyler Dong
 * @version 0.0.0
 *
 * Back-end API for my websites, built with Node, Express,
 * Apollo Server, GraphQL, MongoDB Atlas and ElasticSearch
 *
 */
const commonConfig = require('./pm2.config');

module.exports = {
  apps: [
    {
      ...commonConfig,
      instances: 2,
      exec_mode: 'cluster',
      env: {
        PORT: 7020,
        NODE_ENV: 'production',
      },
    },
  ],
};
