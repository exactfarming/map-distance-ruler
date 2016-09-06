var view;

describe('ruler-view', function () {
  beforeEach(function () {
    window.map = initMap();

    view = map.__dr.view;
  });

  afterEach(function () {
    destroyMap();
  });


  it('init view', function () {
    expect(view).not.toBe(null);
  });
  it('view: _toggleMeasure', function () {

    expect(view.__enabled).toBe(false);

    view._toggleMeasure();

    expect(view.__enabled).toBe(true);
  });
});