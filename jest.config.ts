import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
    '!src/main.tsx',
    '!src/types/**'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/tests/__mocks__/fileMock.ts',
    '^next/image$': '<rootDir>/tests/__mocks__/next-image.tsx'
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['ts-jest', { tsconfig: './tsconfig.jest.json' }]
  },
  transformIgnorePatterns: ['node_modules/(?!next-intl)/'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/components/ui/',
    '<rootDir>/src/i18n/'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: [
    '<rootDir>/tests/**/*.{test,spec}.{ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{ts,tsx}'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  coverageReporters: ['text', 'html', 'lcov'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 50,
      functions: 50,
      lines: 50
    }
  }
};

module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  transformIgnorePatterns: ['node_modules/(?!next-intl)/']
});
