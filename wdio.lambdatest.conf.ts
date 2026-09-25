import { config as baseConfig, adBlockArgs } from './wdio.conf'

if (!process.env.LT_USERNAME || !process.env.LT_ACCESS_KEY) {
  throw new Error(
    'LT_USERNAME e LT_ACCESS_KEY não definidas. Preencha o .env com as credenciais do LambdaTest.',
  )
}

export const config: WebdriverIO.Config = {
  ...baseConfig,
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,
  hostname: 'hub.lambdatest.com',
  port: 443,
  protocol: 'https',
  path: '/wd/hub',
  maxInstances: 1,
  mochaOpts: {
    ...baseConfig.mochaOpts,
    retries: 1,
  },
  services: [['lambdatest', { tunnel: false }]],
  capabilities: [
    {
      browserName: 'chrome',
      browserVersion: 'latest',
      'goog:chromeOptions': {
        args: adBlockArgs,
      },
      'LT:Options': {
        platformName: 'Windows 11',
        resolution: '1920x1080',
        project: 'Automação Web WebdriverIO',
        build: `E2E ${new Date().toISOString().slice(0, 10)}`,
        w3c: true,
        video: true,
        console: 'info',
      },
    },
  ],
}
