# map-distance-ruler

Helps to define distance beetween dots on map

Demo coming soon - https://exactfarming.github.io/map-distance-ruler/

#### Options (example):

```
{
  center: [52, 37],
  renderRuler(map, _el) {
    $('#distance').append(_el);
  },
  _updateTooltipDistance(tooltip, total, difference) {
    var totalRound = total, differenceRound = difference;

    var text = '<div class="ruler-tooltip-total">' + totalRound.toFixed(2) + ' m</div>';
    if (differenceRound > 0 && totalRound != differenceRound) {
      text += '<div class="ruler-tooltip-difference">(+' + differenceRound.toFixed(2) + ' m)</div>';
    }

    tooltip._icon.innerHTML = text;
  },
  _createTooltip(position) {
    this._tooltip = L.marker(position, {
      icon: L.divIcon({
        className: 'ruler-tooltip',
        iconAnchor: [-5, -5]
      }),
      clickable: false,
    }).addTo(this._layerPaint);

    return this._tooltip;
  }
}
```
For more details see example

##### Thanks to this guy https://github.com/jtreml for this example http://jtreml.github.io/leaflet.measure/example.html
