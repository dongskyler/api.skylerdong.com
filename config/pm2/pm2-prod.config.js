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
