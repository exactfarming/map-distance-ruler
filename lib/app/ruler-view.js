import List from './linked-list';
import DivIcon from './div-icon';

let Line = L.Polyline.extend({
  options: {
    color: '#4a4a4a',
    weight: 2,
    clickable: true
  }
});

let cursorOffset = 0.5; // смещение положения курсора относительно линии, при котором появляется метка маркера

export default L.Class.extend({
  initialize(map) {
    this._map = map;

    if (this._map.__dr._options._updateTooltipDistance) {
      this._updateTooltipDistance = this._map.__dr._options._updateTooltipDistance;
    }

    if (this._map.__dr._options._createTooltip) {
      this._createTooltip = this._map.__dr._options._createTooltip;
    }

    if (this._map.__dr._options.cursorOffset) {
      cursorOffset = this._map.__dr._options.cursorOffset;
    }

    this.rulerOptions = this._map.__dr._options;
  },
  _layerPaintPath: null,
  _layerPaintTemp: null,
  markers: [],
  _points: [],
  _tooltip: [],
  _hoverMarker: null,

  // interface
  
  createMarker(latlng) {
    let marker = L.marker(latlng, {
      icon: new DivIcon(this.rulerOptions.iconOptions),
      draggable: true,
      isDragging: false
    }).addTo(this._layerPaint);

    marker.on('dragstart', this._onDragStartMarker);
    marker.on('drag', this._onDragMarker);
    marker.on('dragend', this._onDragEndMarker);
    marker.on('click', this._onClickMarker);
    
    return marker;
  },

  addMarker(latlng) {
    let marker = this.createMarker(latlng);

    marker.node = this.hash.add(marker);

    this.markers.push(marker);
    this._points.push(latlng);
    this.resetMarkersPositions();

    return marker;
  },

  removeMarker(marker) {
    let pos = marker.options.position;
    this._layerPaintPath.spliceLatLngs(pos, 1);

    this.hash.remove(pos);
    this.hash.resetPositions();

    this._layerPaint.removeLayer(marker);
    if (pos === 0 ) {
      this._layerPaint.removeLayer(this._tooltip[0]);
      this._tooltip.splice(0, 1);
    } else {
      this._layerPaint.removeLayer(this._tooltip[pos - 1]);
      this._tooltip.splice(pos - 1, 1);
    }

    this.markers.splice(pos, 1);
    this._points.splice(pos, 1);

    this.resetMarkersPositions();
    this._resetTooltipPositions(pos);
  },

  resetMarkersPositions() {
    let pos = 0;
    this.markers.forEach((node) => {
      node.options.position = pos++;
    });
  },

  addHoverMarker(e, prevMarkerIndex) {
    e.target._map = e.target.__dr._map;
    e.target._map.__dr.view._hoverMarker = L.marker(e.latlng, {
      icon: new DivIcon(e.target._map.__dr.view.rulerOptions.iconOptions),
      draggable: true,
      position: e.target._map.__dr.view.hash._length
    }).addTo(e.target._map.__dr.view._layerPaint);

    e.target._map.__dr.view._hoverMarker.isDragging = false;
    e.target._map.__dr.view._hoverMarker.prevMarkerIndex = prevMarkerIndex;
    e.target._map.__dr.view._hoverMarker.on('dragstart', this._onDragStartHoverMarker);
    e.target._map.__dr.view._hoverMarker.on('drag', this._onDragHoverMarker);
    e.target._map.__dr.view._hoverMarker.on('dragend', this._onDragEndHoverMarker);
    e.target._map.__dr.view._hoverMarker.node = this.hash.insertAfter(e.target._map.__dr.view._hoverMarker, prevMarkerIndex);
  },

  removeHoverMarker(e) {
    if (e.target._map.__dr.view._hoverMarker.prevMarkerIndex !== null) {
      this.hash.remove(e.target.__dr._map.__dr.view._hoverMarker.prevMarkerIndex + 1);
    }
    e.target._map.__dr.view._layerPaint.removeLayer(e.target._map.__dr.view._hoverMarker);
    e.target._map.__dr.view._hoverMarker = null;
  },

  redrawHoverMarker(e, prevMarkerIndex) {
    this._hoverMarker.setLatLng(e.latlng);
    if (prevMarkerIndex !== e.target._map.__dr.view._hoverMarker.prevMarkerIndex && !e.target._map.__dr.view._hoverMarker.isDragging) {
      e.target._map.__dr.view._hoverMarker.node = this.hash.insertAfter(e.target._map.__dr.view._hoverMarker, prevMarkerIndex);
      e.target._map.__dr.view._hoverMarker.prevMarkerIndex = prevMarkerIndex;
    }
  },

  insertAfter(pos, data) {
    let marker = this.createMarker(data._latlng);
    
    this._layerPaintPath.spliceLatLngs(pos, 0, data._latlng);
    this.hash.insertAfter(marker, pos);
    marker.node = this.hash;

    this.markers.splice(pos, 0, marker);
    this._points.splice(pos, 0, data._latlng);

    this.resetMarkersPositions();
  },

  get() {
  },
  getLast() {
  },
  getFirst() {
  },
  clear() {
  },

  _onDragStartMarker(e) {
    e.target.options.isDragging = true;
    e.target._map.__dr.view._points.splice(e.target.options.position, 1, e.target._latlng);
    e.target._map.__dr.view._resetTooltipPositions();
  },

  _onDragMarker(e) {
    e.target._map.__dr.view._layerPaintPath.spliceLatLngs(e.target.options.position, 1, e.target._latlng);
  },

  _onDragEndMarker(e) {
    e.target.options.isDragging = false;
    e.target._map.__dr.view._points.splice(e.target.options.position, 1, e.target._latlng);
    e.target._map.__dr.view._resetTooltipPositions();
  },

  _onDragStartHoverMarker(e) {
    e.target._map.__dr.view._hoverMarker.isDragging = true;
    if (!this._layerPaintTemp) {
      this._layerPaintTemp = L.polyline([e.target._map.__dr.view.markers[e.target._map.__dr.view._hoverMarker.prevMarkerIndex]._latlng, e.target._latlng, e.target._map.__dr.view.markers[e.target._map.__dr.view._hoverMarker.prevMarkerIndex + 1]._latlng], Object.assign({
        color: 'black',
        weight: 1.5,
        clickable: false,
        dashArray: '6,3'
      }, e.target._map.__dr.view.rulerOptions.paintLineOptions)).addTo(e.target._map.__dr.view._layerPaint);
    }
  },

  _onDragHoverMarker(e) {
    this._layerPaintTemp.spliceLatLngs(0, 2, e.target._map.__dr.view.markers[e.target._map.__dr.view._hoverMarker.prevMarkerIndex]._latlng, e.target._latlng, e.target._map.__dr.view.markers[e.target._map.__dr.view._hoverMarker.prevMarkerIndex + 1]._latlng);
  },

  _onDragEndHoverMarker(e) {
    e.target._map.__dr.view._hoverMarker.isDragging = false;
    e.target._map.__dr.view.insertAfter(e.target._map.__dr.view._hoverMarker.prevMarkerIndex + 1, e.target);
    e.target._map = e.target._map.removeLayer(e.target._map.__dr.view._hoverMarker);
    e.target._map.removeLayer(e.target._layerPaintTemp);
    e.target._layerPaintTemp = null;
    e.target._hoverMarker = null;

    e.target._map.__dr.view._resetTooltipPositions();
  },

  _onClickMarker(e) {
    let marker = e.target;
    marker._map.__dr.view.removeMarker(marker);
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

    let new_latlng, prevMarkerIndex, markerHovered;
    let distLine = cursorOffset;
    let distMarker = cursorOffset;
    this.markers.forEach((item, i) => {
      let distanceToCursor = this._calcDistanceBetweenPoints(e.latlng.lat, e.latlng.lng, this.markers[i]._latlng.lat, this.markers[i]._latlng.lng);
      if (distanceToCursor && distanceToCursor < distMarker) {
        markerHovered = this.markers[i];
        distMarker = distanceToCursor;
      } else {
        if (i !== this.markers.length - 1) {
          distanceToCursor = this._calcHoverMarkerCoordinates(e.latlng, this.markers[i], this.markers[i + 1]);
          if (distanceToCursor && distanceToCursor.distance < distLine) {
            new_latlng = distanceToCursor.latlng;
            distLine = distanceToCursor.distance;
            prevMarkerIndex = i;
          }
        }
      }
    });

    if (!Em.isEmpty(markerHovered)) {
      if (!Em.isEmpty(e.target.__dr._map.__dr.view._hoverMarker)) {
        this.removeHoverMarker(e);
      }
    } else {
      if (!Em.isEmpty(new_latlng) && Em.isEmpty(this.markers.findBy('options.isDragging'))) {
        let e_new = e;
        e_new.latlng = new_latlng;
        if (Em.isEmpty(e.target.__dr._map.__dr.view._hoverMarker)){
          this.addHoverMarker(e_new, prevMarkerIndex);
        } else {
          this.redrawHoverMarker(e_new, prevMarkerIndex);
        }
      } else {
        if (!Em.isEmpty(e.target.__dr._map.__dr.view._hoverMarker) && !e.target.__dr._map.__dr.view._hoverMarker.isDragging) {
          this.removeHoverMarker(e);
        }
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

    if (this._tooltip.length) {
      if (!this._distance) {
        this._distance = 0;
      }
      let tooltip_latlng = new_latlng ? L.latLng(new_latlng) : e.latlng;
      this._updateTooltipPosition(this._tooltip[this._tooltip.length - 1], tooltip_latlng);
      if (!this._lastPoint.equals(tooltip_latlng)) {
        var distance = tooltip_latlng.distanceTo(this._lastPoint);
        this._updateTooltipDistance(this._tooltip[this._tooltip.length - 1], this._distance + distance, distance);
      }
    }
  },

  _mouseClick(e) {
    // Skip if no coordinates
    if (!e.latlng) {
      return;
    }

    if (Em.isEmpty(e.target.__dr._map.__dr.view._hoverMarker)) {
      // If we have a tooltip, update the distance and create a new tooltip, leaving the old one exactly where it is (i.e. where the user has clicked)
      if (this._lastPoint && this._tooltip.length) {
        if (!this._distance) {
          this._distance = 0;
        }
        this._updateTooltipPosition(this._tooltip[this._tooltip.length - 1], e.latlng);

        var distance = e.latlng.distanceTo(this._lastPoint);
        this._updateTooltipDistance(this._tooltip[this._tooltip.length - 1], this._distance + distance, distance);

        this._distance += distance;
      }

      this.addMarker(e.latlng);

      this._createTooltip.call(this, e.latlng);

      // If this is already the second click, add the location to the fix path (create one first if we don't have one)
      if (this._lastPoint && !this._layerPaintPath) {
        this._layerPaintPath = new Line([this._lastPoint], this.rulerOptions.lineOptions).addTo(this._layerPaint);
      }

      if (this._layerPaintPath) {
        this._layerPaintPath.addLatLng(e.latlng);
      }
// 
//       // Upate the end marker to the current location
//       if (this._lastCircle) {
//         this._layerPaint.removeLayer(this._lastCircle);
//       }
//   
//       this._lastCircle = L.marker(e.latlng, Object.assign({
//         icon: new DivIcon(this.rulerOptions.iconOptions),
//         draggable: true
//       }, this.rulerOptions.lastNodeOptions)).addTo(this._layerPaint);
//   
//       this._lastCircle.on('click', function () {
//       this._finishPath();
//       }, this);

      // Save current location as last location
      this._lastPoint = e.latlng;
    }
  },

  _finishPath() {
    debugger;
    // Remove the last end marker as well as the last (moving tooltip)
    if (this._lastCircle) {
      this._layerPaint.removeLayer(this._lastCircle);
    }
    if (this._tooltip.length) {
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
    this._tooltip = [];
    this._lastCircle = undefined;
    this._lastPoint = undefined;
    this._layerPaintPath = undefined;
    this._layerPaintPathTemp = undefined;
    this.hash.clear();
    this.markers = [];
    this._points = [];
  },

  _createTooltip(position) {
    var icon = L.divIcon({
      className: 'ruler-tooltip',
      iconAnchor: [-5, -5]
    });
    var tooltip = L.marker(position, {
      icon: icon,
      clickable: false
    });
    
    this._tooltip.push(tooltip);
    
    tooltip.addTo(this._layerPaint);
    
    return tooltip;
  },

  _updateTooltipPosition(tooltip, latlng) {
    tooltip.setLatLng(latlng);
    tooltip.update();
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
  
  _resetTooltipPositions() {
    var total_distance = 0;
    if (this._points.length && this._tooltip.length) {
      for (var i = 0; i < this._points.length - 1; i++) {
        this._updateTooltipPosition(this._tooltip[i], this._points[i + 1]);
        var distance = this._points[i].distanceTo(this._points[i + 1]);
        this._updateTooltipDistance(this._tooltip[i], total_distance + distance, distance);
        this._createTooltip.call(this, this._points[i + 1]);
        total_distance += distance;
      }
    }
  },

  _onKeyDown(e) {
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
  _calcHoverMarkerCoordinates(point, linePoint1, linePoint2) {
    let x0 = point.lat;
    let y0 = point.lng;
    let x1 = linePoint1._latlng.lat;
    let y1 = linePoint1._latlng.lng;
    let x2 = linePoint2._latlng.lat;
    let y2 = linePoint2._latlng.lng;
    let lineLength = this._calcDistanceBetweenPoints(x1, y1, x2, y2);
    let pointToLinePoint1 = this._calcDistanceBetweenPoints(x0, y0, x1, y1);
    let pointToLinePoint2 = this._calcDistanceBetweenPoints(x0, y0, x2, y2);

    let a = y2 - y1;
    let b = x1 - x2;
    let c = -x1*y2 + x2*y1;
    let t = this._calcDistanceBetweenPoints(a, b, 0, 0);

    let distance = Math.abs((a * x0 + b * y0 + c)/t);

    if ((pointToLinePoint1 >= this._calcDistanceBetweenPoints(pointToLinePoint2, lineLength, 0, 0)) || 
        (pointToLinePoint2 >= this._calcDistanceBetweenPoints(pointToLinePoint1, lineLength, 0, 0))) {
      return { latlng: null, distance };
    } else {
      if (distance < cursorOffset) {
        let k = ((x0-x1)*(x2-x1) + (y0-y1)*(y2-y1)) / (Math.pow(x2-x1,2) + Math.pow(y2-y1, 2));
        let x3 = x1 - b*k;
        let y3 = y1 + a*k;

        return { latlng: { lat: x3, lng: y3 }, distance };
      }
    }
  }
});