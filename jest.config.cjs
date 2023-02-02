module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.jsx?$': "babel-jest", 
      '^.+\\.ts?$': 'ts-jest', 
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
  };