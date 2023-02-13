/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '\\.(css|svj|png)$': 'identity-obj-proxy',
    '^core(.*)$': '<rootDir>/src/core$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^helpers(.*)$': '<rootDir>/src/helpers$1',
    '^services(.*)$': '<rootDir>/src/services$1',
    '^hocs(.*)$': '<rootDir>/src/hocs$1',
    '^store(.*)$': '<rootDir>/src/store$1',
    '^models(.*)$': '<rootDir>/src/models$1',
    '^api(.*)$': '<rootDir>/src/api$1',
    '^router(.*)$': '<rootDir>/src/router$1',
    '^nanoid(/(.*)|$)': 'nanoid$1',
  },

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ['<rootDir>/src/tests/setup-env.ts'],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [`/node_modules/(?!nanoid})`],
};
