SystemJS.config({
  paths: {
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  devConfig: {
    "map": {
      "babel-runtime": "npm:babel-runtime@5.8.38",
      "core-js": "npm:core-js@1.2.7",
      "process": "npm:jspm-nodelibs-process@0.2.0",
      "fs": "npm:jspm-nodelibs-fs@0.2.0",
      "path": "npm:jspm-nodelibs-path@0.2.1",
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.17"
    },
    "packages": {
      "npm:babel-runtime@5.8.38": {
        "map": {}
      },
      "npm:core-js@1.2.7": {
        "map": {
          "systemjs-json": "github:systemjs/plugin-json@0.1.2"
        }
      }
    }
  },
  transpiler: "plugin-babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  bundles: {
    "build.js": [
      "lib/app.js",
      "lib/app/ruler-view.js",
      "lib/app/linked-list.js",
      "npm:babel-runtime@5.8.38/core-js/object/assign.js",
      "npm:core-js@1.2.7/library/fn/object/assign.js",
      "npm:core-js@1.2.7/library/modules/$.core.js",
      "npm:core-js@1.2.7/library/modules/es6.object.assign.js",
      "npm:core-js@1.2.7/library/modules/$.object-assign.js",
      "npm:core-js@1.2.7/library/modules/$.fails.js",
      "npm:core-js@1.2.7/library/modules/$.iobject.js",
      "npm:core-js@1.2.7/library/modules/$.cof.js",
      "npm:core-js@1.2.7/library/modules/$.to-object.js",
      "npm:core-js@1.2.7/library/modules/$.defined.js",
      "npm:core-js@1.2.7/library/modules/$.js",
      "npm:core-js@1.2.7/library/modules/$.export.js",
      "npm:core-js@1.2.7/library/modules/$.ctx.js",
      "npm:core-js@1.2.7/library/modules/$.a-function.js",
      "npm:core-js@1.2.7/library/modules/$.global.js"
    ]
  },
  trace: true,
  map: {
    "babel": "npm:babel-core@5.8.38"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "jquery": "github:components/jquery@3.1.0",
    "leaflet": "github:Leaflet/Leaflet@0.7.7"
  },
  packages: {
    "github:Leaflet/Leaflet@0.7.7": {
      "map": {
        "css": "github:systemjs/plugin-css@0.1.26"
      }
    }
  }
});
