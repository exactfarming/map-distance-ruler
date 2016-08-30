describe('Linked Markers Set', function () {
  beforeEach(function() {
    window.map = initMap();
  });

  afterEach(function() {
    destroyMap();
  });


  it('init set', function () {
    expect(L.mapDistanceRuler).not.toBe(null);
    let dr = map.__dr;

    console.log(dr);
    console.log(dr.hash);
  });
});