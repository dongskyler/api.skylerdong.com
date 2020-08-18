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
      env: {
        PORT: 5036,
        NODE_ENV: 'development',
      },
    },
  ],
};
