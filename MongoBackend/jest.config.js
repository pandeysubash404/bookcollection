export default {
  collectCoverage: true, // Collect coverage information
  coverageDirectory: "coverage", // Directory to output coverage reports
  coverageReporters: ["json", "html", "text"], // Formats of coverage reports
  verbose: true,
  testTimeout: 10000, // Increase timeout globally for all tests
  testEnvironment: "node",
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        outputPath: "./reports/test-report.html",
        pageTitle: "Test Report",
      },
    ],
  ],
};
