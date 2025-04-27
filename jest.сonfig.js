/* eslint-disable no-undef */
// jest.config.js
/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'jsx'],
  transformIgnorePatterns: [
    'node_modules/(?!(@babel|react|react-dom)/)'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};

export default config;