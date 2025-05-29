module.exports = {
  preset: "jest-preset-angular",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  moduleFileExtensions: ["ts", "js", "html"],
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
  collectCoverage: true,
  coverageReporters: ["html", "text-summary"],
  testMatch: ["**/+(*.)+(spec).+(ts)"],
};
