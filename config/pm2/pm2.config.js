module.exports = {
  name: 'api-skylerdong',
  script: 'dist-server/bin/www.js',
  watch: true,
  ignore_watch: ['node_modules'],
  // new feature; increase restart delay each time after every crash or non reachable db per example
  exp_backoff_restart_delay: 100,
  // combine multiple err/out logs in one file for each
  combine_logs: true,
  // calls combine logs
  merge_logs: true,
  // out log file path
  out_file: '/var/log/pm2/api.skylerdong.com.access.log',
  // error log file path
  error_file: '/var/log/pm2/api.skylerdong.com.error.log', // better be /var/log
  // use time in logs
  time: true,
};
