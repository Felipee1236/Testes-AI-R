import 'dotenv/config'
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import os from 'node:os'

if (!process.env.BASE_URL) {
  throw new Error('BASE_URL não definida. Copie o .env.example para .env antes de rodar os testes.')
}

export const adBlockArgs = [
  '--host-resolver-rules=MAP *.googlesyndication.com 127.0.0.1, MAP *.doubleclick.net 127.0.0.1, MAP *.googleadservices.com 127.0.0.1, MAP *.adtrafficquality.google 127.0.0.1, MAP *.fundingchoicesmessages.google.com 127.0.0.1',
]

async function screenshotOnFailure(
  _test: unknown,
  _context: unknown,
  { error }: { error?: unknown },
) {
  if (error) {
    await browser.takeScreenshot()
  }
}

export const config: WebdriverIO.Config = {
  runner: 'local',
  tsConfigPath: './tsconfig.json',

  specs: ['./test/specs/**/*.ts'],
  exclude: [],

  maxInstances: process.env.CI ? 2 : 10,

  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          ...adBlockArgs,
          ...(process.env.CI
            ? [
                '--headless=new',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--window-size=1920,1080',
              ]
            : []),
        ],
      },
    },
  ],

  logLevel: process.env.CI ? 'warn' : 'info',
  bail: 0,
  baseUrl: process.env.BASE_URL,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },

  reporters: ['spec', ['allure', { outputDir: 'allure-results' }]],

  onPrepare: function () {
    rmSync('allure-results', { recursive: true, force: true })
  },

  before: function () {
    const caps = browser.capabilities as WebdriverIO.Capabilities
    mkdirSync('allure-results', { recursive: true })
    writeFileSync(
      'allure-results/environment.properties',
      [
        `Browser=${caps.browserName}`,
        `Browser.Version=${caps.browserVersion}`,
        `Platform=${caps.platformName}`,
        `OS=${os.type()} ${os.release()}`,
        `Node=${process.version}`,
        `Base.URL=${process.env.BASE_URL}`,
      ].join('\n'),
    )
  },

  afterTest: screenshotOnFailure,
  afterHook: screenshotOnFailure,
}
