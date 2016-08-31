var wallabify = require('wallabify');
var wallabyPostprocessor = wallabify({
    // browserify options, such as
    // insertGlobals: false
    entryPatterns: [
      'lib/**/*.js',
      'tests/**/*.js'
    ]
  }
  // you may also pass an initializer function to chain other
  // browserify options, such as transformers
  // , b => b.exclude('mkdirp').transform(require('babelify'))
);

module.exports = function (wallaby) {

  return {
    files: [
      // { pattern: 'jspm_packages/system.js', instrument: false },
      // { pattern: 'config.js', instrument: false },
      { pattern: 'jspm_packages/github/components/jquery@3.1.0/jquery.min.js', instrument: false },
      { pattern: 'jspm_packages/github/Leaflet/Leaflet@0.7.7/dist/leaflet-src.js', instrument: false },
      { pattern: 'lib/**/*.js', load: false },
      'tests/init.js'
    ],
    tests: [
      { pattern: 'tests/*Spec.js', load: false }
    ],

    preprocessors: {
      '**/*.js': file => require('babel-core').transform(
        file.content,
        { sourceMap: true, presets: ['es2015'] })
    },

    postprocessor: wallabyPostprocessor,

    env: {
      kind: 'electron'
    },

    setup: function () {
      window.__moduleBundler.loadTests();
    },

    debug: true
  };
};
