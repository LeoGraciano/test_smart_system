export default {
  moduleFileExtensions: ["js", "json", "ts"],
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/path/to/your/modules/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testRegex: ".*\\..*spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testTimeout: 30000,
};
