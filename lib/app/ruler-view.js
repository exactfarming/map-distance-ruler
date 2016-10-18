import List from './linked-list';
import DivIcon from './div-icon';

let Line = L.Polyline.extend({
  options: {
    color: '#4a4a4a',
    weight: 2,
    clickable: true
  }
});

let lineOffset = 0.5; // смещение положения курсора относительно линии, при котором появляется метка маркера

export default L.Class.extend({
  initialize(map) {
    this._map = map;

    if (this._map.__dr._options._updateTooltipDistance) {
      this._updateTooltipDistance = this._map.__dr._options._updateTooltipDistance;
    }

    if (this._map.__dr._options._createTooltip) {
      this._createTooltip = this._map.__dr._options._createTooltip;
    }

    if (this._map.__dr._options.lineOffset) {
      lineOffset = this._map.__dr._options.lineOffset;
    }

    this.rulerOptions = this._map.__dr._options;
  },
  _layerPaintPath: null,
  markers: [],
  _hoverMarker: null,
  // interface
  addMarker(latlng) {
    let marker = L.marker(latlng, {
      icon: new DivIcon(this.rulerOptions.iconOptions),
      draggable: true,
      position: this.hash._length
    }).addTo(this._layerPaint);

    marker.on('drag', this._onDragMarker);
    marker.on('click', function() {});

    marker.node = this.hash.add(marker);

    this.markers.push(marker);

    return marker;
  },
  removeMarker(marker) {
    let pos = marker.node._position;
    this._layerPaintPath.spliceLatLngs(pos, 1);

    this.hash.remove(pos);
    this.hash.resetPositions();

    this._layerPaint.removeLayer(marker);

    this.markers.splice(pos, 1);
  },
  addHoverMarker(e) {
//     console.log('addHoverMarker');
    e.target.__dr._map.__dr.view._hoverMarker = L.marker(e.latlng, {
      icon: new DivIcon(e.target.__dr._map.__dr.view.rulerOptions.iconOptions),
      draggable: false,
      position: e.target.__dr._map.__dr.view.hash._length
    }).addTo(e.target.__dr._map.__dr.view._layerPaint);

//     let map = e.target.__dr._map.__dr.view._map;

//     map.on('mousemove.line', (e) => {
//       e.target._map.__dr.view._hoverMarker.setLatLng(e.latlng);
//     });
  },
  removeHoverMarker(e) {
//     console.log('removeHoverMarker', e.target);
    e.target.__dr._map.__dr.view._layerPaint.removeLayer(e.target.__dr._map.__dr.view._hoverMarker);
    e.target.__dr._map.__dr.view._hoverMarker = null;
//     e.target.__dr._map.__dr.view._map.off('mousemove.line');
  },
  redrawHoverMarker(e) {
    this._hoverMarker.setLatLng(e.latlng);
  },
  insertAfter(marker) {
    this._layerPaintPath.spliceLatLngs(pos, 0, marker._latlng);
    this.hash.add(marker);

    this.markers.splice(pos, 0, marker);
  },
  get() {
  },
  getLast() {
  },
  getFirst() {
  },
  clear() {
  },

  _onDragMarker(e) {
    e.target._map.__dr.view._layerPaintPath.spliceLatLngs(e.target.node._position, 1, e.target._latlng);
  },
  _onClickMarker(e) {
    let marker = e.target;
    let view = marker._map.__dr.view;

    view.removeMarker(marker);
  },

  //inner functions (http://jtreml.github.com/leaflet.measure)
  __enabled: false,
  _toggleMeasure() {
    this.__enabled = !this.__enabled;

    if (this.__enabled) {
      this._startMeasuring();
    } else {
      this._stopMeasuring();
    }
  },

  _startMeasuring() {
    this._oldCursor = this._map._container.style.cursor;
    this._map._container.style.cursor = 'crosshair';

    this._doubleClickZoom = this._map.doubleClickZoom.enabled();
    this._map.doubleClickZoom.disable();

    L.DomEvent
      .on(this._map, 'mousemove', this._mouseMove, this)
      .on(this._map, 'click', this._mouseClick, this)
      .on(this._map, 'dblclick', this._finishPath, this)
      .on(document, 'keydown', this._onKeyDown, this);

    if (!this._layerPaint) {
      this._layerPaint = L.layerGroup().addTo(this._map);
    }

    if (!this._points) {
      this._points = [];
    }
  },

  _stopMeasuring() {
    this._map._container.style.cursor = this._oldCursor;

    L.DomEvent
      .off(document, 'keydown', this._onKeyDown, this)
      .off(this._map, 'mousemove', this._mouseMove, this)
      .off(this._map, 'click', this._mouseClick, this)
      .off(this._map, 'dblclick', this._mouseClick, this);

    if (this._doubleClickZoom) {
      this._map.doubleClickZoom.enable();
    }

    if (this._layerPaint) {
      this._layerPaint.clearLayers();
    }

    this._restartPath();
  },

  _mouseMove(e) {
    if (!e.latlng || !this._lastPoint) {
      return;
    }
    let latlng;
    let dist = lineOffset;
    this.markers.forEach((item, i) => {
      if (i !== this.markers.length - 1) {
        let intersection = this._calcMarkerCoordinates(e.latlng, this.markers[i], this.markers[i + 1]);
        if (intersection && intersection.distance < dist) {
          latlng = intersection.latlng;
          dist = intersection.distance;
        }
      }
    });
    
    if (!Em.isEmpty(latlng)) {
      let e1 = e;
      e1.latlng = latlng;
      if (Em.isEmpty(e.target.__dr._map.__dr.view._hoverMarker)){
        this.addHoverMarker(e1);
      } else {
        this.redrawHoverMarker(e1);
      }
    } else {
      if (!Em.isEmpty(e.target.__dr._map.__dr.view._hoverMarker)) {
        this.removeHoverMarker(e); 
      }
    }

    if (!this.rulerOptions.paintLineOptions) {
      return;
    }

    if (!this._layerPaintPathTemp) {
      this._layerPaintPathTemp = L.polyline([this._lastPoint, e.latlng], Object.assign({
        color: 'black',
        weight: 1.5,
        clickable: false,
        dashArray: '6,3'
      }, this.rulerOptions.paintLineOptions)).addTo(this._layerPaint);
    } else {
      this._layerPaintPathTemp.spliceLatLngs(0, 2, this._lastPoint, e.latlng);
    }

    if (this._tooltip) {
      if (!this._distance) {
        this._distance = 0;
      }

      this._updateTooltipPosition(e.latlng);

      var distance = e.latlng.distanceTo(this._lastPoint);

      this._updateTooltipDistance(this._tooltip, this._distance + distance, distance);
    }
  },

  _mouseClick(e) {
    // Skip if no coordinates
    if (!e.latlng) {
      return;
    }

    // If we have a tooltip, update the distance and create a new tooltip, leaving the old one exactly where it is (i.e. where the user has clicked)
    if (this._lastPoint && this._tooltip) {
      if (!this._distance) {
        this._distance = 0;
      }

      this._updateTooltipPosition(e.latlng);

      var distance = e.latlng.distanceTo(this._lastPoint);
      this._updateTooltipDistance(this._tooltip, this._distance + distance, distance);

      this._distance += distance;
    }

    this.addMarker(e.latlng, this._tooltip);

    this._createTooltip.call(this, e.latlng);

    // If this is already the second click, add the location to the fix path (create one first if we don't have one)
    if (this._lastPoint && !this._layerPaintPath) {
      this._layerPaintPath = new Line([this._lastPoint], this.rulerOptions.lineOptions).addTo(this._layerPaint);

      this._layerPaintPath.on('click', this._onClickLine(e.latlng));
      
//       this._layerPaintPath.on('mouseover', this.addHoverMarker);
//       this._layerPaintPath.on('mouseout', this.removeHoverMarker);
    }

    if (this._layerPaintPath) {
      this._layerPaintPath.addLatLng(e.latlng);
    }

    // Upate the end marker to the current location
//     if (this._lastCircle) {
//       this._layerPaint.removeLayer(this._lastCircle);
//     }
// 
//     this._lastCircle = L.marker(e.latlng, Object.assign({
//       icon: new DivIcon(this.rulerOptions.iconOptions),
//       draggable: true
//     }, this.rulerOptions.lastNodeOptions)).addTo(this._layerPaint);
// 
//     this._lastCircle.on('click', function () {
//     this._finishPath();
//     }, this);

    // Save current location as last location
    this._lastPoint = e.latlng;
  },
  _onClickLine(latlng) {
//         debugger;
    if (latlng !== this._lastPoint){
      
    }
  },
  _finishPath() {
    debugger;
    // Remove the last end marker as well as the last (moving tooltip)
    if (this._lastCircle) {
      this._layerPaint.removeLayer(this._lastCircle);
    }
    if (this._tooltip) {
      this._layerPaint.removeLayer(this._tooltip);
    }
    if (this._layerPaint && this._layerPaintPathTemp) {
      this._layerPaint.removeLayer(this._layerPaintPathTemp);
    }

    // Reset everything
    this._restartPath();
  },

  _restartPath() {
    this._distance = 0;
    this._tooltip = undefined;
    this._lastCircle = undefined;
    this._lastPoint = undefined;
    this._layerPaintPath = undefined;
    this._layerPaintPathTemp = undefined;
  },

  _createTooltip(position) {
    var icon = L.divIcon({
      className: 'ruler-tooltip',
      iconAnchor: [-5, -5]
    });
    this._tooltip = L.marker(position, {
      icon: icon,
      clickable: false
    }).addTo(this._layerPaint);
  },

  _updateTooltipPosition(position) {
    this._tooltip.setLatLng(position);
  },

  _updateTooltipDistance(tooltip, total, difference) {
    var totalRound = total,
      differenceRound = difference;

    var text = '<div class="ruler-tooltip-total">' + totalRound + ' m</div>';
    if (differenceRound > 0 && totalRound != differenceRound) {
      text += '<div class="ruler-tooltip-difference">(+' + differenceRound + ' m)</div>';
    }

    tooltip._icon.innerHTML = text;
  },

  _onKeyDown(e) {
    debugger;
    if (e.keyCode == 27) {
      // If not in path exit measuring mode, else just finish path
      if (!this._lastPoint) {
        this._toggleMeasure();
      } else {
        this._finishPath();
      }
    }
  },

  hash: new List(),
                              
  _calcDistanceBetweenPoints(x1, y1, x2, y2) {
    return Math.hypot((x2 - x1), (y2 - y1));
  },
  _calcMarkerCoordinates(point, linePoint1, linePoint2) {
    let x0 = point.lat;
    let y0 = point.lng;
    let x1 = linePoint1._latlng.lat;
    let y1 = linePoint1._latlng.lng;
    let x2 = linePoint2._latlng.lat;
    let y2 = linePoint2._latlng.lng;
    let lineLength = this._calcDistanceBetweenPoints(x1, y1, x2, y2);
    let pointToLinePoint1 = this._calcDistanceBetweenPoints(x0, y0, x1, y1);
    let pointToLinePoint2 = this._calcDistanceBetweenPoints(x0, y0, x2, y2);

    if ((pointToLinePoint1 >= this._calcDistanceBetweenPoints(pointToLinePoint2, lineLength, 0, 0)) || 
        (pointToLinePoint2 >= this._calcDistanceBetweenPoints(pointToLinePoint1, lineLength, 0, 0))) {
      return null;
    } else {
      let a = y2 - y1;
      let b = x1 - x2;
      let c = -x1*a - y1*b;
      let t = this._calcDistanceBetweenPoints(a, b, 0, 0);
      if (c > 0) { 
        a = -a;
        b = -b;
        c = -c;
      }
      let distance = Math.abs((a * x0 + b * y0 + c)/t);
      if (distance < lineOffset) {
        let x3=((x2-x1)*(y2-y1)*(y0-y1)+x1*Math.pow(y2-y1, 2)+x0*Math.pow(x2-x1, 2))/(Math.pow(y2-y1, 2)+Math.pow(x2-x1, 2));
        let y3=(y2-y1)*(x3-x1)/(x2-x1)+y1;
        return { latlng: { lat: x3, lng: y3 }, distance };
      }
    }
  }
});