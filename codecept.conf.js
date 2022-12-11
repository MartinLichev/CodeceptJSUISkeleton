const { setHeadlessWhen } = require('@codeceptjs/configure');
const sh = require('child_process');
const { argv } = require('process');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  cliArg: process.argv,
  tests: './tests/*/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://www.saucedemo.com/',
      show: (process.platform === 'linux') ? false : true,
      browser: 'firefox',
      restart: false,
      keepCookies: true,
    },
    AssertWrapper: {
      "require": "codeceptjs-assert"
    }
  },
  multiple: {
    parallel: {
      // Splits tests into chunks by passing an anonymous function,
      chunks: (files) => {
        return [
          ['./tests/campaign/01_test.js'], // chunk 1
        ];
      },
      // TODO: run all tests in chrome and firefox
      // browsers: ["chromium", "firefox"]
    }
  },  
  include: {
    I: './steps_file.js',
    loginPage: "./pom/auth/login.js",
    products: "./pom/campaign/products.js",
    productItem: "./pom/campaign/product_item.js",
    generalHelpers: "./lib/general_helpers.js"
  },
  bootstrap: null,
  mocha: {},
  name: 'e2e-automation',
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    },
    allure: {
      enabled: true,
      outputDir: "./allure-results"
    }
  },
  login: {
    testUser1: {
      username: 'standard_user',
      password: 'secret_sauce',
    }
  },
  waitPeriod: {
    xSmall: 1,
    small: 3,
    medium: 5,
    large: 10,
    xLarge: 25,
    delayedCamp: 90
  },
  // Before all
  async bootstrapAll() {
    if (process.platform === 'linux') {
      await sh.execSync('rm -rf output && rm -rf allure-results');
    }

    // // this will fail if there are no output or allure-results directories
    // if (process.platform === 'win32') {
    //   await sh.execSync('rmdir /s/q output & rmdir /s/q allure-results');
    // }
  },
  // After all
  async teardownAll() {
    if (process.platform === 'linux') {
      // TODO:
    }

    // generate allure report
    await sh.execSync('allure serve allure-results -p 9191');
  }
}
