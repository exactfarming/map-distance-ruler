System.registerDynamic("lib/app.js", [], false, function ($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);

  (function ($__global) {
    alert(123);
  })(this);

  return _retrieveGlobal();
});
//# sourceMappingURL=build.js.map