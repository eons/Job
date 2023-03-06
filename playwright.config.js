// @ts-check
const { devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();


/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests', //it's going to run all the test cases into that folder...
  /* Maximum time one test can run for. */
  timeout: 50 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
   browserName: 'chromium',
   // browserName: 'firefox'
   // browserName: 'webkit' // safari
   // browserName: 'edge'
   headless : false, //if true then does not open the browser otherwisi false open the browser
   screenshot: 'only-on-failure', //off//on//only-on-failure
   trace: 'retain-on-failure'  //off//on//retain-on-failure
  },

};

module.exports = config;