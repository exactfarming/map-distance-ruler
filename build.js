(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.lib = global.lib || {})));
}(this, (function (exports) { 'use strict';

var Node = L.Class.extend({
  data: null,
  next: null,
  prev: null,
  initialize: function initialize(data) {
    this.data = data;
  },

  index: 0
});

var List = L.Class.extend({
  _length: 0,
  _head: null,
  _tail: null,
  _hash: {},
  _count: 0,

  add: function add(data) {
    var node = new Node(data);

    //special case: no items in the list yet
    if (this._length == 0) {
      this._head = node;
      this._tail = node;
    } else {
      //attach to the tail node
      this._tail.next = node;
      node.prev = this._tail;
      this._tail = node;
    }

    //don't forget to update the count
    this._length++;

    node.index = this._count;
    this._hash[this._count] = node;
    this._count++;

    this.resetPositions();

    return node;
  },
  insertAfter: function insertAfter(data, index) {
    var rslt = this._head;

    if (this._length == 0 || index > this._length || index < 0) {
      return;
    }

    if (rslt !== null) {
      var prev = this.get(index);
      var next = this.get(index + 1);

      var node = this.add(data);

      this._tail = node.prev;
      delete this._tail.next;

      node.prev = prev;
      node.next = next;

      prev.next = node;
      next.prev = node;

      var current = node;
      while (index++ < this._length - 1) {
        current.index = index;
        current = current.next;
      }

      this.resetPositions();

      return node;
    }
  },
  get: function get(index) {
    var currentNode = this._head,
        length = this._length,
        count = 0,
        message = { failure: 'Failure: non-existent node in this list.' };

    // 1st use-case: an invalid position
    if (length === 0 || index < 0 || index > length) {
      // throw new Error(message.failure);
      return new Node();
    }

    // 2nd use-case: a valid position
    while (count < index) {
      currentNode = currentNode.next;
      count++;
    }

    return currentNode;
  },
  getLast: function getLast() {
    return this.get(this._length - 1);
  },
  getFirst: function getFirst() {
    return this.get(0);
  },
  remove: function remove(index) {
    //check for out-of-bounds values
    if (index > -1 && index < this._length) {

      var current = this._head,
          i = 0;

      //special case: removing first item
      if (index === 0) {
        this._head = current.next;

        /*
         * If there's only one item in the list and you remove it,
         * then this._head will be null. In that case, you should
         * also set this._tail to be null to effectively destroy
         * the list. Otherwise, set the previous pointer on the
         * new this._head to be null.
         */
        if (!this._head) {
          this._tail = null;
        } else {
          this._head.prev = null;
        }

        //special case: removing last item
      } else if (index === this._length - 1) {
        current = this._tail;
        this._tail = current.prev;
        this._tail.next = null;
      } else {

        //find the right location
        while (i++ < index) {
          current = current.next;
        }

        //skip over the item to remove
        current.prev.next = current.next;
        current.next.prev = current.prev;
      }

      //decrement the length
      this._length--;
      // this._count--;

      for (var ind in this._hash) {
        if (this._hash[ind] === current) {
          delete this._hash[ind];
        }
      }

      this.resetPositions();
      //return the value

      return current.data;
    } else {
      return null;
    }
  },
  isEmpty: function isEmpty() {
    return this._length === 0;
  },
  each: function each(func) {
    var node = this._head;

    while (node !== null) {
      if (node !== null) {
        func.call(this, node);
      }
      node = node.next;
    }
  },
  resetPositions: function resetPositions() {
    var pos = 0;
    this.each(function (node) {
      node._position = pos++;
    });
  },
  _beforeClear: function _beforeClear() {},
  clear: function clear() {
    this._beforeClear();

    this._length = 0;
    this._head = null;
    this._tail = null;
    this._hash = {};
    this._count = 0;
  }
});

var DivIcon = L.DivIcon.extend({
  options: {
    className: 'ruler-icon',
    iconSize: new L.Point(10, 10)
  }
});

var Line = L.Polyline.extend({
  options: {
    color: '#4a4a4a',
    weight: 2,
    clickable: true
  }
});

var _cursorOffset = void 0;
var cursorOffset = 0.3; // смещение положения курсора относительно линии, при котором появляется метка маркера

var View = L.Class.extend({
  initialize: function initialize(map) {
    this._map = map;
    this.rulerOptions = this._map.__dr._options;

    if (this.rulerOptions._updateTooltipDistance) {
      this._updateTooltipDistance = this.rulerOptions._updateTooltipDistance;
    }

    if (this.rulerOptions._createTooltip) {
      this._createTooltip = this.rulerOptions._createTooltip;
    }

    cursorOffset = this.rulerOptions.cursorOffset || cursorOffset;

    _cursorOffset = this._recalcZoom();
  },

  _layerPaintPath: null,
  _layerPaintTemp: null,
  markers: [],
  _points: [],
  _tooltip: [],
  _hoverMarker: null,
  _distance: 0,

  isEmpty: function isEmpty(value) {
    return value === '' || value === null || value === undefined || value.length === 0;
  },


  // interface

  createMarker: function createMarker(latlng) {
    var marker = L.marker(latlng, {
      icon: new DivIcon(this.rulerOptions.iconOptions),
      draggable: true,
      isDragging: false,
      riseOnHover: true
    }).addTo(this._layerPaint);

    marker.on('dragstart', this._onDragStartMarker.bind(this));
    marker.on('drag', this._onDragMarker.bind(this));
    marker.on('dragend', this._onDragEndMarker.bind(this));
    marker.on('click', this._onClickMarker.bind(this));

    return marker;
  },
  addMarker: function addMarker(latlng) {
    var marker = this.createMarker(latlng);

    marker.node = this.hash.add(marker);

    this.markers.push(marker);
    this._points.push(latlng);
    this.resetMarkersPositions();

    return marker;
  },
  removeMarker: function removeMarker(marker) {
    var pos = marker.options.position;
    this._layerPaintPath.spliceLatLngs(pos, 1);

    this.hash.remove(pos);
    this.hash.resetPositions();
    this._layerPaint.removeLayer(marker);
    if (pos !== 0) {
      this._layerPaint.removeLayer(this._tooltip[pos - 1]);
      this._tooltip.splice(pos - 1, 1);
    }

    if (pos === 0 && this._tooltip.length) {
      this._layerPaint.removeLayer(this._tooltip[this._tooltip.length - 1]);
      this._tooltip.pop();
    }

    this.markers.splice(pos, 1);
    this._points.splice(pos, 1);

    this.resetMarkersPositions();
    this._resetTooltipPositions();

    if (this.markers.length === 1) {
      this._tooltip = [];
      this._distance = 0;
    }
  },
  resetMarkersPositions: function resetMarkersPositions() {
    var pos = 0;
    this.markers.forEach(function (node) {
      node.options.position = pos++;
    });
  },
  addHoverMarker: function addHoverMarker(e, prevMarkerIndex) {
    e.target._map = e.target.__dr._map;
    this._hoverMarker = L.marker(e.latlng, {
      icon: new DivIcon(this.rulerOptions.iconOptions),
      draggable: true,
      position: this.hash._length
    }).addTo(this._layerPaint);

    this._hoverMarker.isDragging = false;
    this._hoverMarker.prevMarkerIndex = prevMarkerIndex;
    this._hoverMarker.on('dragstart', this._onDragStartHoverMarker.bind(this));
    this._hoverMarker.on('drag', this._onDragHoverMarker.bind(this));
    this._hoverMarker.on('dragend', this._onDragEndHoverMarker.bind(this));
    this._hoverMarker.node = this.hash.insertAfter(this._hoverMarker, prevMarkerIndex);
  },
  removeHoverMarker: function removeHoverMarker(e) {
    debugger;
    if (this._hoverMarker.prevMarkerIndex !== null) {
      this.hash.remove(this._hoverMarker.prevMarkerIndex + 1);
    }
    this._layerPaint.removeLayer(this._hoverMarker);
    this._hoverMarker = null;
  },
  redrawHoverMarker: function redrawHoverMarker(e, prevMarkerIndex) {
    this._hoverMarker.setLatLng(e.latlng);
    if (prevMarkerIndex !== this._hoverMarker.prevMarkerIndex && !this._hoverMarker.isDragging) {
      this._hoverMarker.node = this.hash.insertAfter(this._hoverMarker, prevMarkerIndex);
      this._hoverMarker.prevMarkerIndex = prevMarkerIndex;
    }
  },
  insertAfter: function insertAfter(pos, data) {
    var marker = this.createMarker(data._latlng);
    var tooltip = this._createTooltip(data._latlng);

    this._layerPaintPath.spliceLatLngs(pos, 0, data._latlng);
    tooltip.addTo(this._layerPaint);

    this.hash.insertAfter(marker, pos);
    marker.node = this.hash;

    this.markers.splice(pos, 0, marker);
    this._tooltip.splice(pos, 0, tooltip);
    this._points.splice(pos, 0, data._latlng);

    this.resetMarkersPositions();
  },
  get: function get() {},
  getLast: function getLast() {},
  getFirst: function getFirst() {},
  clear: function clear() {},
  _onDragStartMarker: function _onDragStartMarker(e) {
    e.target.options.isDragging = true;
    this._points.splice(e.target.options.position, 1, e.target._latlng);
  },
  _onDragMarker: function _onDragMarker(e) {
    this._layerPaintPath.spliceLatLngs(e.target.options.position, 1, e.target._latlng);
  },
  _onDragEndMarker: function _onDragEndMarker(e) {
    e.target.options.isDragging = false;
    this._points.splice(e.target.options.position, 1, e.target._latlng);
    this._resetTooltipPositions();
  },
  _onDragStartHoverMarker: function _onDragStartHoverMarker(e) {
    this._hoverMarker.isDragging = true;
    if (!this._layerPaintTemp) {
      this._layerPaintTemp = L.polyline([this.markers[this._hoverMarker.prevMarkerIndex]._latlng, e.target._latlng, this.markers[this._hoverMarker.prevMarkerIndex + 1]._latlng], Object.assign({
        color: 'black',
        weight: 1.5,
        clickable: false,
        dashArray: '6,3'
      }, this.rulerOptions.paintLineOptions)).addTo(this._layerPaint);
    }
  },
  _onDragHoverMarker: function _onDragHoverMarker(e) {
    this._layerPaintTemp.spliceLatLngs(0, 2, this.markers[this._hoverMarker.prevMarkerIndex]._latlng, e.target._latlng, this.markers[this._hoverMarker.prevMarkerIndex + 1]._latlng);
  },
  _onDragEndHoverMarker: function _onDragEndHoverMarker(e) {
    debugger;
    this._hoverMarker.isDragging = false;
    this.insertAfter(this._hoverMarker.prevMarkerIndex + 1, e.target);
    this._map = this._map.removeLayer(this._hoverMarker);
    this._map.removeLayer(this._layerPaintTemp);
    this._layerPaintTemp = null;
    this._hoverMarker = null;

    this._resetTooltipPositions();
  },
  _onClickMarker: function _onClickMarker(e) {
    var marker = e.target;
    marker._map.__dr.view.removeMarker(marker);
  },


  //inner functions (http://jtreml.github.com/leaflet.measure)
  __enabled: false,
  _toggleMeasure: function _toggleMeasure() {
    this.__enabled = !this.__enabled;

    if (this.__enabled) {
      this._startMeasuring();
    } else {
      this._stopMeasuring();
    }
  },
  _startMeasuring: function _startMeasuring() {
    this._oldCursor = this._map._container.style.cursor;
    this._map._container.style.cursor = 'crosshair';

    this._doubleClickZoom = this._map.doubleClickZoom.enabled();
    this._map.doubleClickZoom.disable();

    L.DomEvent.on(this._map, 'zoomend', this._zoomChanged, this).on(this._map, 'mousemove', this._mouseMove, this).on(this._map, 'click', this._mouseClick, this)
    // .on(this._map, 'dblclick', this._dblClick, this)
    .on(document, 'keydown', this._onKeyDown, this);

    if (!this._layerPaint) {
      this._layerPaint = L.layerGroup().addTo(this._map);
    }

    if (!this._points) {
      this._points = [];
    }
  },
  _stopMeasuring: function _stopMeasuring() {
    this._map._container.style.cursor = this._oldCursor;

    L.DomEvent.off(document, 'keydown', this._onKeyDown, this).off(this._map, 'mousemove', this._mouseMove, this).off(this._map, 'click', this._mouseClick, this);
    // .off(this._map, 'dblclick', this._dblClick, this);

    if (this._doubleClickZoom) {
      this._map.doubleClickZoom.enable();
    }

    if (this._layerPaint) {
      this._layerPaint.clearLayers();
    }

    this._restartPath();
  },
  _mouseMove: function _mouseMove(e) {
    var _this = this;

    if (!e.latlng || !this._lastPoint) {
      return;
    }

    var new_latlng = void 0,
        prevMarkerIndex = void 0,
        markerUnderCursor = void 0;
    var distLine = _cursorOffset;
    var distMarker = _cursorOffset;
    this.markers.forEach(function (item, i) {
      var distanceToCursor = L.point(e.latlng.lat, e.latlng.lng).distanceTo(L.point(_this.markers[i]._latlng.lat, _this.markers[i]._latlng.lng));
      if (distanceToCursor && distanceToCursor < distMarker) {
        markerUnderCursor = _this.markers[i];
        distMarker = distanceToCursor;
      } else {
        if (i !== _this.markers.length - 1) {
          distanceToCursor = _this._calcHoverMarkerCoordinates(e.latlng, _this.markers[i], _this.markers[i + 1]);
          if (distanceToCursor && distanceToCursor.distance && distanceToCursor.distance < distLine) {
            new_latlng = distanceToCursor.latlng;
            distLine = distanceToCursor.distance;
            prevMarkerIndex = i;
          }
        }
      }
    });

    if (!this.isEmpty(new_latlng) && this.isEmpty(this.markers.find(function (marker) {
      return marker.options.isDragging;
    }))) {
      var e_new = e;
      e_new.latlng = new_latlng;
      if (this.isEmpty(this._hoverMarker)) {
        this.addHoverMarker(e_new, prevMarkerIndex);
      } else {
        this.redrawHoverMarker(e_new, prevMarkerIndex);
      }
    } else {
      console.log('!this.isEmpty(this._hoverMarker)', this._hoverMarker && !this._hoverMarker.isDragging);
      if (this._hoverMarker && !this._hoverMarker.isDragging) {
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

    if (this._tooltip.length) {
      var tooltip_latlng = new_latlng ? L.latLng(new_latlng) : e.latlng;
      this._updateTooltipPosition(this._tooltip[this._tooltip.length - 1], tooltip_latlng);
      if (!this._lastPoint.equals(tooltip_latlng)) {
        var distance = tooltip_latlng.distanceTo(this._lastPoint);
        this._updateTooltipDistance(this._tooltip[this._tooltip.length - 1], this._distance + distance, distance);
      }
    }
  },
  _mouseClick: function _mouseClick(e) {
    // Skip if no coordinates
    if (!e.latlng) {
      return;
    }
    if (this.isEmpty(this._hoverMarker)) {
      this.addMarker(e.latlng);

      if (this.markers.length > 1) {
        this._addTooltip(e.latlng);
      }

      // If we have a tooltip, update the distance and create a new tooltip, leaving the old one exactly where it is (i.e. where the user has clicked)
      if (this._lastPoint && this._tooltip.length) {
        this._updateTooltipPosition(this._tooltip[this._tooltip.length - 1], e.latlng);

        var distance = e.latlng.distanceTo(this._lastPoint);
        this._updateTooltipDistance(this._tooltip[this._tooltip.length - 1], this._distance + distance, distance);

        this._distance += distance;
      }

      // If this is already the second click, add the location to the fix path (create one first if we don't have one)
      if (this._lastPoint && !this._layerPaintPath) {
        this._layerPaintPath = new Line([this._lastPoint], this.rulerOptions.lineOptions).addTo(this._layerPaint);
      }

      if (this._layerPaintPath) {
        this._layerPaintPath.addLatLng(e.latlng);
      }

      // Save current location as last location
      this._lastPoint = e.latlng;
    }
  },


  _recalcZoom: function _recalcZoom() {
    var zoom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._map.getZoom();

    return cursorOffset * Math.pow(2, 7 - zoom);
  },

  _zoomChanged: function _zoomChanged() {
    var zoom = this._map.getZoom();

    _cursorOffset = this._recalcZoom(zoom);
  },
  _restartPath: function _restartPath() {
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
  _createTooltip: function _createTooltip(position) {
    var tooltip, icon;

    icon = L.divIcon({
      className: 'ruler-tooltip',
      iconAnchor: [-5, -5]
    });

    tooltip = L.marker(position, {
      icon: icon,
      clickable: false
    });

    return tooltip;
  },
  _addTooltip: function _addTooltip(position) {
    var tooltip = this._createTooltip(position);

    this._tooltip.push(tooltip);

    tooltip.addTo(this._layerPaint);

    return tooltip;
  },
  _updateTooltipPosition: function _updateTooltipPosition(tooltip, latlng) {
    tooltip.setLatLng(latlng);
    tooltip.update();
  },
  _updateTooltipDistance: function _updateTooltipDistance(tooltip, total, difference) {
    var totalRound = total,
        differenceRound = difference;

    var text = '<div class="ruler-tooltip-total">' + totalRound + ' m</div>';
    if (differenceRound > 0 && totalRound != differenceRound) {
      text += '<div class="ruler-tooltip-difference">(+' + differenceRound + ' m)</div>';
    }

    tooltip._icon.innerHTML = text;
  },
  _resetTooltipPositions: function _resetTooltipPositions() {
    var total_distance = 0;
    if (this._points.length && this._tooltip.length) {
      for (var i = 0; i < this._points.length - 1; i++) {
        this._updateTooltipPosition(this._tooltip[i], this._points[i + 1]);
        var distance = this._points[i].distanceTo(this._points[i + 1]);
        this._updateTooltipDistance(this._tooltip[i], total_distance + distance, distance);
        total_distance += distance;
      }
    }
  },
  _onKeyDown: function _onKeyDown(e) {
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

  _calcHoverMarkerCoordinates: function _calcHoverMarkerCoordinates(point, linePoint1, linePoint2) {
    var x0 = point.lat;
    var y0 = point.lng;
    var x1 = linePoint1._latlng.lat;
    var y1 = linePoint1._latlng.lng;
    var x2 = linePoint2._latlng.lat;
    var y2 = linePoint2._latlng.lng;
    var lineLength = L.point(x1, y1).distanceTo(L.point(x2, y2));
    var pointToLinePoint1 = L.point(x0, y0).distanceTo(L.point(x1, y1));
    var pointToLinePoint2 = L.point(x0, y0).distanceTo(L.point(x2, y2));

    var a = y2 - y1;
    var b = x1 - x2;
    var c = -x1 * y2 + x2 * y1;
    var t = L.point(a, b).distanceTo(L.point(0, 0));

    var distance = Math.abs((a * x0 + b * y0 + c) / t);

    if (pointToLinePoint1 >= L.point(pointToLinePoint2, lineLength).distanceTo(L.point(0, 0)) || pointToLinePoint2 >= L.point(pointToLinePoint1, lineLength).distanceTo(L.point(0, 0))) {
      return { latlng: null, distance: distance };
    } else {
      if (distance < _cursorOffset) {
        var k = ((x0 - x1) * (x2 - x1) + (y0 - y1) * (y2 - y1)) / (Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        var x3 = x1 - b * k;
        var y3 = y1 + a * k;

        return { latlng: { lat: x3, lng: y3 }, distance: distance };
      }
    }
  }
});

var options = {
  renderRuler: null,
  iconOptions: {
    draggable: true
  },
  lastNodeOptions: {},
  lineOptions: {},
  paintLineOptions: false
};

L.MapDistanceRuler = L.Class.extend({
  baseOptions: options,
  initialize: function initialize(options$$1) {
    this._options = Object.assign({}, this.baseOptions, options$$1);
  },
  onAdd: function onAdd(map) {
    this._map = map;
    this._map.__dr = this;

    this.view = new View(this._map);
  },
  onRemove: function onRemove(map) {},


  view: null
});

L.mapDistanceRuler = function (options$$1) {
  return new L.MapDistanceRuler(options$$1);
};

Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=build.js.map