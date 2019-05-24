import { initMap, destroyMap } from './init.js';

describe('Map', function () {

  beforeEach(function() {
    window.map = initMap();
  });

  afterEach(function() {
    destroyMap();
  });

  it('check options', function () {
    let dr = map.__dr;
    assert.deepEqual(dr._options.center, [52, 37]);
    expect(dr.baseOptions.renderRuler).to.equal(null);
  });

  it('"remove" layer', function () {
    map.removeLayer(map.__dr);
  });
});

describe('Map: no render', function () {

  beforeEach(function() {
    window.map = initMap(false);
  });

  afterEach(function() {
    destroyMap();
  });

  it('check options', function () {
    let dr = map.__dr;
    assert.deepEqual(dr._options.center, [52, 37]);
    expect(dr.baseOptions.renderRuler).to.equal(null);
  });
});
