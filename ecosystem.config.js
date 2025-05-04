module.exports = {
  apps: [
    {
      name: 'sg-front',
      script: './.next/standalone/server.js',
      args: 'start',
      cwd: __dirname,
      env: {
        NODE_ENV: 'production',
        PORT: 4500 // Дублируем для надежности
      },
      watch: false,
      autorestart: true,
      restart_delay: 1000,
      max_restarts: 10,
      instance_var: 'INSTANCE_ID',
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true
    }
  ]
}