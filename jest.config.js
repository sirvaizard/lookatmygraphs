module.exports = {
    bail: true,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/utils/algorithms/**'],
    coverageDirectory: '__tests__/coverage',
    testMatch: ['**/__tests__/**/*spec.ts?(x)'],
    testEnvironment: 'node',
    preset: 'ts-jest',
}
