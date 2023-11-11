/* eslint-disable no-undef */
/** @returns {Promise<import('jest').Config>} */
module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest'
  },

  rootDir: '.',

  // The test environment that will be used for testing
  testEnvironment: 'jsdom', //
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$'
}
