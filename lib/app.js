import List from '../lib/app/linked-list';


L.MapDistanceRuler = L.Class.extend({
  baseOptions: {
    renderRuler: null
  },
  initialize(options) {
    this._options = Object.assign({}, this.baseOptions, options);
  },

  onAdd(map) {
    this._map = map;
    this._map.__dr = this;

    // create a DOM element and put it into one of the map panes
    this._el = L.DomUtil.create('div', 'ruler');

    let renderRuler = this._options.renderRuler;

    if (renderRuler) {
      renderRuler(map, this._el);
    } else {
      map.getPanes().mapPane.appendChild(this._el);
    }

    // add a viewreset event listener for updating layer's position, do the latter
    // map.on('viewreset', this._reset, this);
    // this._reset();
  },

  onRemove(map) {
    // remove layer's DOM elements and listeners
    try {
      map.getPanes().overlayPane.removeChild(this._el);
    } catch (e) {
      $(this._el).remove();
    }

    // map.off('viewreset', this._reset, this);
  },

  // _reset: function () {
  //   // update layer's position
  //   var pos = this._map.latLngToLayerPoint(this._latlng);
  //   L.DomUtil.setPosition(this._el, pos);
  // }
  hash: new List()
});

L.mapDistanceRuler = function (options) {
  return new L.MapDistanceRuler(options);
};