// const config = {
//     preset: "ts-jest",
//     testEnvironment: "jsdom",
//     moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
//     setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
//   };
  
// export default config;


import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};

export default config;
  