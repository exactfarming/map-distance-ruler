describe('Map', function () {

  beforeEach(function() {
    window.map = initMap();
  });

  afterEach(function() {
    destroyMap();
  });

  it('check options', function () {
    let dr = map.__dr;
    expect(dr._options.center).toEqual([52, 37]);
    expect(dr.baseOptions.renderRuler).toEqual(null);
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
    expect(dr._options.center).toEqual([52, 37]);
    expect(dr.baseOptions.renderRuler).toEqual(null);
  });
});