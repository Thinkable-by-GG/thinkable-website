module.exports = {
  apps: [{
    name: 'thinkable-cms',
    script: './dist/cms/server.js',
    cwd: '/var/www/thinkable.app/backend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/var/www/thinkable.app/logs/cms-error.log',
    out_file: '/var/www/thinkable.app/logs/cms-out.log',
    log_file: '/var/www/thinkable.app/logs/cms-combined.log',
    time: true
  }]
};
