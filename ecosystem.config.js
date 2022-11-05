module.exports = {
  apps: [
    {
      name: 'Nest Application',
      script: './dist/main.js',
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
      instances: 2,
      exec_mode: 'cluster',
      watch: true,
      wait_ready: true,
      listen_timeout: 120000,
      kill_timeout: 15000,
      restart_delay: 5000,
    },
  ],
};
