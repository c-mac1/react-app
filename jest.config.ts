
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    transform: {
      "^.+\\.(ts|tsx|js|jsx)$": "babel-jest", // Use Babel to transform JSX/TSX
    },
    transformIgnorePatterns: ["/node_modules/"],
  };