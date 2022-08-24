const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/*.spec.ts',
    '<rootDir>/test/**/*.spec.ts',
    '<rootDir>/scripts/**/*.spec.*',
  ],
  globalSetup: '<rootDir>/test/unit/setup.ts',
  setupFilesAfterEnv: ['<rootDir>/test/unit/setup-after-env.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  collectCoverageFrom: ['src/**/*.ts', '!src/core'],
  coverageDirectory: '<rootDir>/coverage',
  reporters: ['default', 'jest-junit'],
};
