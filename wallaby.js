module.exports = function (wallaby) {

  return {
    files: [
      { pattern: 'jspm_packages/system.js', instrument: false },
      { pattern: 'config.js', instrument: false },
      { pattern: 'jspm_packages/github/components/jquery@3.1.0/jquery.min.js', instrument: false },
      { pattern: 'jspm_packages/github/Leaflet/Leaflet@0.7.7/dist/leaflet.js', instrument: false },
      'lib/**/*.js',
      'tests/init.js'
    ],
    tests: [
      'tests/**/*Spec.js'
    ],

    compilers: {
      'lib/**/*.js': wallaby.compilers.babel({ presets: ['es2015'], plugins: ['add-module-exports', 'transform-es2015-modules-umd'] })
    },

    env: {
      kind: 'electron'
    },
    debug: true
  };
};
