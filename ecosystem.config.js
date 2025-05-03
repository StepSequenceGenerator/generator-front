module.exports = {
  apps: [
    {
      name: 'sg-front',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/home/genry_bolit/sg-front/current',
      env: {
        PORT: 4500 // Дублируем для надежности
      }
    }
  ]
}