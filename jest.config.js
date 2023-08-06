const {
  compilerOptions
} = require('./tsconfig');

const {
  resolve
} = require('path');

module.exports = {
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  moduleDirectories: [
    __dirname,
    "src",
    "node_modules"
  ],
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/assets/**",
    "!**/build/**"
  ],
  moduleNameMapper: {
    '^@app/(.*)$': resolve(__dirname, './src/app/$1'),
    '^@tests/(.*)$': resolve(__dirname, './src/tests/$1'),
    ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    "\\.[jt]sx?$": [
      "ts-jest", {
        "tsconfig": "<rootDir>/tsconfig.json"
      }
    ]
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/']
};