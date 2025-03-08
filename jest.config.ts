export {}; // Ensures Jest treats this as a module

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)", // Tests inside __tests__
    "**/?(*.)+(spec|test).[tj]s?(x)" // Matches *.test.tsx or *.spec.tsx
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(svg|css|less|scss|sass)$": "<rootDir>/src/__mocks__/fileMock.js"
  }
};
