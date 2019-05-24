import { initMap, destroyMap } from './init.js';

let view;

describe('ruler-view', function () {
  beforeEach(function () {
    window.map = initMap();

    view = map.__dr.view;
  });

  afterEach(function () {
    destroyMap();
  });


  it('init view', function () {
    expect(view).not.to.eql(null);
  });
  it('view: _toggleMeasure', function () {

    expect(view.__enabled).to.eql(false);

    view._toggleMeasure();

    expect(view.__enabled).to.eql(true);
  });
});
