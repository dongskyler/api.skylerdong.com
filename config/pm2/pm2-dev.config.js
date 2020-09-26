const commonConfig = require('./pm2.config');

module.exports = {
  apps: [
    {
      ...commonConfig,
      env: {
        PORT: 7020,
        NODE_ENV: 'development',
      },
    },
  ],
};
