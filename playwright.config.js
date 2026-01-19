// @ts-check
import { defineConfig, devices } from '@playwright/test';

const config = ({ // Basically configurations for everything
  testDir: './tests',
  timeout: 90000,
  expect : {
    timeout: 90000,
  },
  use: {
    browserName: 'chromium', //THIS IS IMPORTANT TO RUN CHROME
    headless: false
  },
});
module.exports = config 