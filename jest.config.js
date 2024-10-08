module.exports = {
  preset: 'ts-jest', // Use ts-jest preset for TypeScript transformation
  testEnvironment: 'jest-environment-jsdom',
  reporters: ['default', ['jest-junit', { outputDirectory: './test-results/junit', outputName: 'results.xml' }]],
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest' // Transform TypeScript and JSX files with ts-jest
  },
  transformIgnorePatterns: ['/node_modules/'], // Do not transform any node_modules files
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
  // Uncomment the following line if you have setup files to be executed after the environment is set up
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};
