module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js?(x)',
      'src/**/*.snap',
      '!src/**/*.spec.js?(x)',
    ],
    tests: [
      'src/**/*.spec.js?(x)',
    ],
    env: {
      type: 'node',
      runner: 'node',
    },
    compilers: {
      '**/*.js?(x)': wallaby.compilers.babel({
        'presets': [
          'latest',
          'react',
        ],
        'plugins': [
          'transform-object-rest-spread',
          'transform-decorators-legacy',
          'transform-class-properties',
        ],
      }),
    },
    testFramework: 'jest',
    debug: true,
  };
};
