import View from './app/ruler-view';
import options from './app/ruler-options';

L.MapDistanceRuler = L.Class.extend({
  baseOptions: options,
  initialize(options) {
    this._options = Object.assign({}, this.baseOptions, options);
  },

  onAdd(map) {
    this._map = map;
    this._map.__dr = this;

    this.view = new View(this._map);
  },

  onRemove(map) {
  },

  view: null
});

L.mapDistanceRuler = function (options) {
  return new L.MapDistanceRuler(options);
};