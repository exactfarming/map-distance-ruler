describe('Person', function () {

  beforeEach(function() {
    window.map = initMap();
  });

  afterEach(function() {
    destroyMap();
  });

  it('should report name', function () {
    let dr = map.__dr;
    expect(dr._options.center).toEqual([52, 37]);
    expect(dr.baseOptions.renderRuler).toEqual(null);
  });
});