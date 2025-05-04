module.exports = {
  apps: [
    {
      name: 'sg-front',
      script: './.next/standalone/server.js',
      args: 'start',
      cwd: '/home/genry_bolit/sg-front/current',
      env: {
        NODE_ENV: 'production',
        PORT: 4500 // Дублируем для надежности
      }
    }
  ]
}