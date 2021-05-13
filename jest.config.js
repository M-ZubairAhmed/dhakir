/** @typedef {import('ts-jest/dist/types')} */
/** @type {import('@jest/types').Config.InitialOptions} */

module.exports = {
    roots: ["<rootDir>/tests"],
    testMatch: ["**/tests/**/?(*.)+(tests).+(ts|tsx|js|jsx)"],
    moduleDirectories: ["node_modules", "src"],
    transform: {
      "^.+\\.[jt]sx?$": "babel-jest",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    preset: "ts-jest",
    globals: {
      "ts-jest": {
        tsconfig: "tsconfig.json",
      },
    },
  };
  