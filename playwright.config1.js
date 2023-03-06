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
  retries: 1, // if a test case failed it goint to try 1 more time so it passed (in case it failed becuase inatability in
  // connection... etc...)
  workers: 3, //browsers/threads provided for test cases to be executed in parallel at the same time by defaul they are 5

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects:
  [
    {
      name: "safari",
      use:
      {
        browserName: 'webkit',
        headless : true, //if true then does not open the browser otherwisi false open the browser
        screenshot: 'only-on-failure', //off//on//only-on-failure
        trace: 'retain-on-failure',  //off//on//retain-on-failure
        ...devices['iPhone 12 Pro Max']
      }
    },

    {
      name: "chrome",
      use:
      {
        browserName: 'chromium',
        headless : false, //if true then does not open the browser otherwisi false open the browser
        screenshot: 'only-on-failure', //off//on//only-on-failure
        trace: 'retain-on-failure',  //off//on//retain-on-failure
        ...devices['Galaxy S9+'],
        ignoreHTTPSErrors: true, // ignores issue relates to not secure page ssl certifications
        permissions: ['geolocation'], // manage the browser pop up asking to share location and acept it
        video: 'retain-on-failure'
      }
    },

    {
      name: "firefox",
      use:
      {
        browserName: 'firefox',
        headless : true, //if true then does not open the browser otherwisi false open the browser
        screenshot: 'only-on-failure', //off//on//only-on-failure
        trace: 'retain-on-failure',  //off//on//retain-on-failure
        viewport: {width:720, height:720}
      }
    }
    
  ]

};

module.exports = config;