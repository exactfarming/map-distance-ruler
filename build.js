System.registerDynamic("npm:core-js@1.2.7/library/modules/$.js", [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var $Object = Object;
  module.exports = {
    create: $Object.create,
    getProto: $Object.getPrototypeOf,
    isEnum: {}.propertyIsEnumerable,
    getDesc: $Object.getOwnPropertyDescriptor,
    setDesc: $Object.defineProperty,
    setDescs: $Object.defineProperties,
    getKeys: $Object.keys,
    getNames: $Object.getOwnPropertyNames,
    getSymbols: $Object.getOwnPropertySymbols,
    each: [].forEach
  };
  return module.exports;
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.defined.js", [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  // 7.2.1 RequireObjectCoercible(argument)
  module.exports = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };
  return module.exports;
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.to-object.js', ['npm:core-js@1.2.7/library/modules/$.defined.js'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var defined = $__require('npm:core-js@1.2.7/library/modules/$.defined.js');
  module.exports = function (it) {
    return Object(defined(it));
  };
  return module.exports;
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.cof.js", [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var toString = {}.toString;

  module.exports = function (it) {
    return toString.call(it).slice(8, -1);
  };
  return module.exports;
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.iobject.js', ['npm:core-js@1.2.7/library/modules/$.cof.js'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var cof = $__require('npm:core-js@1.2.7/library/modules/$.cof.js');
  module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return cof(it) == 'String' ? it.split('') : Object(it);
  };
  return module.exports;
});
System.registerDynamic("npm:core-js@1.2.7/library/modules/$.fails.js", [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };
  return module.exports;
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.object-assign.js', ['npm:core-js@1.2.7/library/modules/$.js', 'npm:core-js@1.2.7/library/modules/$.to-object.js', 'npm:core-js@1.2.7/library/modules/$.iobject.js', 'npm:core-js@1.2.7/library/modules/$.fails.js'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var $ = $__require('npm:core-js@1.2.7/library/modules/$.js'),
      toObject = $__require('npm:core-js@1.2.7/library/modules/$.to-object.js'),
      IObject = $__require('npm:core-js@1.2.7/library/modules/$.iobject.js');
  module.exports = $__require('npm:core-js@1.2.7/library/modules/$.fails.js')(function () {
    var a = Object.assign,
        A = {},
        B = {},
        S = Symbol(),
        K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function (k) {
      B[k] = k;
    });
    return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
  }) ? function assign(target, source) {
    var T = toObject(target),
        $$ = arguments,
        $$len = $$.length,
        index = 1,
        getKeys = $.getKeys,
        getSymbols = $.getSymbols,
        isEnum = $.isEnum;
    while ($$len > index) {
      var S = IObject($$[index++]),
          keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
          length = keys.length,
          j = 0,
          key;
      while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    }
    return T;
  } : Object.assign;
  return module.exports;
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/es6.object.assign.js', ['npm:core-js@1.2.7/library/modules/$.export.js', 'npm:core-js@1.2.7/library/modules/$.object-assign.js'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var $export = $__require('npm:core-js@1.2.7/library/modules/$.export.js');
  $export($export.S + $export.F, 'Object', { assign: $__require('npm:core-js@1.2.7/library/modules/$.object-assign.js') });
  return module.exports;
});
System.registerDynamic('npm:core-js@1.2.7/library/fn/object/assign.js', ['npm:core-js@1.2.7/library/modules/es6.object.assign.js', 'npm:core-js@1.2.7/library/modules/$.core.js'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  $__require('npm:core-js@1.2.7/library/modules/es6.object.assign.js');
  module.exports = $__require('npm:core-js@1.2.7/library/modules/$.core.js').Object.assign;
  return module.exports;
});
System.registerDynamic("npm:babel-runtime@5.8.38/core-js/object/assign.js", ["npm:core-js@1.2.7/library/fn/object/assign.js"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("npm:core-js@1.2.7/library/fn/object/assign.js"), __esModule: true };
  return module.exports;
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.global.js', [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

  return module.exports;
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.a-function.js', [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };
  return module.exports;
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.ctx.js', ['npm:core-js@1.2.7/library/modules/$.a-function.js'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var aFunction = $__require('npm:core-js@1.2.7/library/modules/$.a-function.js');
  module.exports = function (fn, that, length) {
    aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1:
        return function (a) {
          return fn.call(that, a);
        };
      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function () {
      return fn.apply(that, arguments);
    };
  };
  return module.exports;
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.export.js', ['npm:core-js@1.2.7/library/modules/$.global.js', 'npm:core-js@1.2.7/library/modules/$.core.js', 'npm:core-js@1.2.7/library/modules/$.ctx.js'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var global = $__require('npm:core-js@1.2.7/library/modules/$.global.js'),
      core = $__require('npm:core-js@1.2.7/library/modules/$.core.js'),
      ctx = $__require('npm:core-js@1.2.7/library/modules/$.ctx.js'),
      PROTOTYPE = 'prototype';
  var $export = function (type, name, source) {
    var IS_FORCED = type & $export.F,
        IS_GLOBAL = type & $export.G,
        IS_STATIC = type & $export.S,
        IS_PROTO = type & $export.P,
        IS_BIND = type & $export.B,
        IS_WRAP = type & $export.W,
        exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
        target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
        key,
        own,
        out;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      own = !IS_FORCED && target && key in target;
      if (own && key in exports) continue;
      out = own ? target[key] : source[key];
      exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? function (C) {
        var F = function (param) {
          return this instanceof C ? new C(param) : C(param);
        };
        F[PROTOTYPE] = C[PROTOTYPE];
        return F;
      }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
      if (IS_PROTO) (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
    }
  };
  $export.F = 1;
  $export.G = 2;
  $export.S = 4;
  $export.P = 8;
  $export.B = 16;
  $export.W = 32;
  module.exports = $export;
  return module.exports;
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/es6.math.hypot.js', ['npm:core-js@1.2.7/library/modules/$.export.js'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var $export = $__require('npm:core-js@1.2.7/library/modules/$.export.js'),
      abs = Math.abs;
  $export($export.S, 'Math', { hypot: function hypot(value1, value2) {
      var sum = 0,
          i = 0,
          $$ = arguments,
          $$len = $$.length,
          larg = 0,
          arg,
          div;
      while (i < $$len) {
        arg = abs($$[i++]);
        if (larg < arg) {
          div = larg / arg;
          sum = sum * div * div + 1;
          larg = arg;
        } else if (arg > 0) {
          div = arg / larg;
          sum += div * div;
        } else sum += arg;
      }
      return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
    } });
  return module.exports;
});
System.registerDynamic('npm:core-js@1.2.7/library/modules/$.core.js', [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var core = module.exports = { version: '1.2.6' };
  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

  return module.exports;
});
System.registerDynamic('npm:core-js@1.2.7/library/fn/math/hypot.js', ['npm:core-js@1.2.7/library/modules/es6.math.hypot.js', 'npm:core-js@1.2.7/library/modules/$.core.js'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  $__require('npm:core-js@1.2.7/library/modules/es6.math.hypot.js');
  module.exports = $__require('npm:core-js@1.2.7/library/modules/$.core.js').Math.hypot;
  return module.exports;
});
System.registerDynamic("npm:babel-runtime@5.8.38/core-js/math/hypot.js", ["npm:core-js@1.2.7/library/fn/math/hypot.js"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("npm:core-js@1.2.7/library/fn/math/hypot.js"), __esModule: true };
  return module.exports;
});
System.register('lib/app/linked-list.js', [], function (_export) {
  'use strict';

  var posArray, Node;
  return {
    setters: [],
    execute: function () {
      posArray = function posArray(list) {
        var posArray = [];

        list.each(function (item) {
          posArray.push(item._position);
        });

        return posArray;
      };

      Node = L.Class.extend({
        data: null,
        next: null,
        prev: null,
        initialize: function initialize(data) {
          this.data = data;
        },
        index: 0
      });

      _export('default', L.Class.extend({
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
            this._count--;

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
      }));
    }
  };
});
System.register('lib/app/div-icon.js', [], function (_export) {
  'use strict';

  return {
    setters: [],
    execute: function () {
      _export('default', L.DivIcon.extend({
        options: {
          className: 'ruler-icon',
          iconSize: new L.Point(10, 10)
        }
      }));
    }
  };
});
System.register('lib/app/ruler-view.js', ['npm:babel-runtime@5.8.38/core-js/object/assign.js', 'npm:babel-runtime@5.8.38/core-js/math/hypot.js', 'lib/app/linked-list.js', 'lib/app/div-icon.js'], function (_export) {
  var _Object$assign, _Math$hypot, List, DivIcon, Line, cursorOffset;

  return {
    setters: [function (_npmBabelRuntime5838CoreJsObjectAssignJs) {
      _Object$assign = _npmBabelRuntime5838CoreJsObjectAssignJs['default'];
    }, function (_npmBabelRuntime5838CoreJsMathHypotJs) {
      _Math$hypot = _npmBabelRuntime5838CoreJsMathHypotJs['default'];
    }, function (_libAppLinkedListJs) {
      List = _libAppLinkedListJs['default'];
    }, function (_libAppDivIconJs) {
      DivIcon = _libAppDivIconJs['default'];
    }],
    execute: function () {
      'use strict';

      Line = L.Polyline.extend({
        options: {
          color: '#4a4a4a',
          weight: 2,
          clickable: true
        }
      });
      cursorOffset = 0.5;
      // смещение положения курсора относительно линии, при котором появляется метка маркера

      _export('default', L.Class.extend({
        initialize: function initialize(map) {
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

        createMarker: function createMarker(latlng) {
          var marker = L.marker(latlng, {
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
          if (pos === 0) {
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

        resetMarkersPositions: function resetMarkersPositions() {
          var pos = 0;
          this.markers.forEach(function (node) {
            node.options.position = pos++;
          });
        },

        addHoverMarker: function addHoverMarker(e, prevMarkerIndex) {
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

        removeHoverMarker: function removeHoverMarker(e) {
          if (e.target._map.__dr.view._hoverMarker.prevMarkerIndex !== null) {
            this.hash.remove(e.target.__dr._map.__dr.view._hoverMarker.prevMarkerIndex + 1);
          }
          e.target._map.__dr.view._layerPaint.removeLayer(e.target._map.__dr.view._hoverMarker);
          e.target._map.__dr.view._hoverMarker = null;
        },

        redrawHoverMarker: function redrawHoverMarker(e, prevMarkerIndex) {
          this._hoverMarker.setLatLng(e.latlng);
          if (prevMarkerIndex !== e.target._map.__dr.view._hoverMarker.prevMarkerIndex && !e.target._map.__dr.view._hoverMarker.isDragging) {
            e.target._map.__dr.view._hoverMarker.node = this.hash.insertAfter(e.target._map.__dr.view._hoverMarker, prevMarkerIndex);
            e.target._map.__dr.view._hoverMarker.prevMarkerIndex = prevMarkerIndex;
          }
        },

        insertAfter: function insertAfter(pos, data) {
          var marker = this.createMarker(data._latlng);

          this._layerPaintPath.spliceLatLngs(pos, 0, data._latlng);
          this.hash.insertAfter(marker, pos);
          marker.node = this.hash;

          this.markers.splice(pos, 0, marker);
          this._points.splice(pos, 0, data._latlng);

          this.resetMarkersPositions();
        },

        get: function get() {},
        getLast: function getLast() {},
        getFirst: function getFirst() {},
        clear: function clear() {},

        _onDragStartMarker: function _onDragStartMarker(e) {
          e.target.options.isDragging = true;
          e.target._map.__dr.view._points.splice(e.target.options.position, 1, e.target._latlng);
          e.target._map.__dr.view._resetTooltipPositions();
        },

        _onDragMarker: function _onDragMarker(e) {
          e.target._map.__dr.view._layerPaintPath.spliceLatLngs(e.target.options.position, 1, e.target._latlng);
        },

        _onDragEndMarker: function _onDragEndMarker(e) {
          e.target.options.isDragging = false;
          e.target._map.__dr.view._points.splice(e.target.options.position, 1, e.target._latlng);
          e.target._map.__dr.view._resetTooltipPositions();
        },

        _onDragStartHoverMarker: function _onDragStartHoverMarker(e) {
          e.target._map.__dr.view._hoverMarker.isDragging = true;
          if (!this._layerPaintTemp) {
            this._layerPaintTemp = L.polyline([e.target._map.__dr.view.markers[e.target._map.__dr.view._hoverMarker.prevMarkerIndex]._latlng, e.target._latlng, e.target._map.__dr.view.markers[e.target._map.__dr.view._hoverMarker.prevMarkerIndex + 1]._latlng], _Object$assign({
              color: 'black',
              weight: 1.5,
              clickable: false,
              dashArray: '6,3'
            }, e.target._map.__dr.view.rulerOptions.paintLineOptions)).addTo(e.target._map.__dr.view._layerPaint);
          }
        },

        _onDragHoverMarker: function _onDragHoverMarker(e) {
          this._layerPaintTemp.spliceLatLngs(0, 2, e.target._map.__dr.view.markers[e.target._map.__dr.view._hoverMarker.prevMarkerIndex]._latlng, e.target._latlng, e.target._map.__dr.view.markers[e.target._map.__dr.view._hoverMarker.prevMarkerIndex + 1]._latlng);
        },

        _onDragEndHoverMarker: function _onDragEndHoverMarker(e) {
          e.target._map.__dr.view._hoverMarker.isDragging = false;
          e.target._map.__dr.view.insertAfter(e.target._map.__dr.view._hoverMarker.prevMarkerIndex + 1, e.target);
          e.target._map = e.target._map.removeLayer(e.target._map.__dr.view._hoverMarker);
          e.target._map.removeLayer(e.target._layerPaintTemp);
          e.target._layerPaintTemp = null;
          e.target._hoverMarker = null;

          e.target._map.__dr.view._resetTooltipPositions();
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

          L.DomEvent.on(this._map, 'mousemove', this._mouseMove, this).on(this._map, 'click', this._mouseClick, this).on(this._map, 'dblclick', this._finishPath, this).on(document, 'keydown', this._onKeyDown, this);

          if (!this._layerPaint) {
            this._layerPaint = L.layerGroup().addTo(this._map);
          }

          if (!this._points) {
            this._points = [];
          }
        },

        _stopMeasuring: function _stopMeasuring() {
          this._map._container.style.cursor = this._oldCursor;

          L.DomEvent.off(document, 'keydown', this._onKeyDown, this).off(this._map, 'mousemove', this._mouseMove, this).off(this._map, 'click', this._mouseClick, this).off(this._map, 'dblclick', this._mouseClick, this);

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

          var new_latlng = undefined,
              prevMarkerIndex = undefined,
              markerHovered = undefined;
          var distLine = cursorOffset;
          var distMarker = cursorOffset;
          this.markers.forEach(function (item, i) {
            var distanceToCursor = _this._calcDistanceBetweenPoints(e.latlng.lat, e.latlng.lng, _this.markers[i]._latlng.lat, _this.markers[i]._latlng.lng);
            if (distanceToCursor && distanceToCursor < distMarker) {
              markerHovered = _this.markers[i];
              distMarker = distanceToCursor;
            } else {
              if (i !== _this.markers.length - 1) {
                distanceToCursor = _this._calcHoverMarkerCoordinates(e.latlng, _this.markers[i], _this.markers[i + 1]);
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
              var e_new = e;
              e_new.latlng = new_latlng;
              if (Em.isEmpty(e.target.__dr._map.__dr.view._hoverMarker)) {
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
            this._layerPaintPathTemp = L.polyline([this._lastPoint, e.latlng], _Object$assign({
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

        _finishPath: function _finishPath() {
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
              this._createTooltip.call(this, this._points[i + 1]);
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

        _calcDistanceBetweenPoints: function _calcDistanceBetweenPoints(x1, y1, x2, y2) {
          return _Math$hypot(x2 - x1, y2 - y1);
        },
        _calcHoverMarkerCoordinates: function _calcHoverMarkerCoordinates(point, linePoint1, linePoint2) {
          var x0 = point.lat;
          var y0 = point.lng;
          var x1 = linePoint1._latlng.lat;
          var y1 = linePoint1._latlng.lng;
          var x2 = linePoint2._latlng.lat;
          var y2 = linePoint2._latlng.lng;
          var lineLength = this._calcDistanceBetweenPoints(x1, y1, x2, y2);
          var pointToLinePoint1 = this._calcDistanceBetweenPoints(x0, y0, x1, y1);
          var pointToLinePoint2 = this._calcDistanceBetweenPoints(x0, y0, x2, y2);

          var a = y2 - y1;
          var b = x1 - x2;
          var c = -x1 * y2 + x2 * y1;
          var t = this._calcDistanceBetweenPoints(a, b, 0, 0);

          var distance = Math.abs((a * x0 + b * y0 + c) / t);

          if (pointToLinePoint1 >= this._calcDistanceBetweenPoints(pointToLinePoint2, lineLength, 0, 0) || pointToLinePoint2 >= this._calcDistanceBetweenPoints(pointToLinePoint1, lineLength, 0, 0)) {
            return { latlng: null, distance: distance };
          } else {
            if (distance < cursorOffset) {
              var k = ((x0 - x1) * (x2 - x1) + (y0 - y1) * (y2 - y1)) / (Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
              var x3 = x1 - b * k;
              var y3 = y1 + a * k;

              return { latlng: { lat: x3, lng: y3 }, distance: distance };
            }
          }
        }
      }));
    }
  };
});
System.register("lib/app/ruler-options.js", [], function (_export) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export("default", {
        renderRuler: null,
        iconOptions: {
          draggable: true
        },
        lastNodeOptions: {},
        lineOptions: {},
        paintLineOptions: false
      });
    }
  };
});
System.register('lib/app.js', ['npm:babel-runtime@5.8.38/core-js/object/assign.js', 'lib/app/ruler-view.js', 'lib/app/ruler-options.js'], function (_export) {
  var _Object$assign, View, options;

  return {
    setters: [function (_npmBabelRuntime5838CoreJsObjectAssignJs) {
      _Object$assign = _npmBabelRuntime5838CoreJsObjectAssignJs['default'];
    }, function (_libAppRulerViewJs) {
      View = _libAppRulerViewJs['default'];
    }, function (_libAppRulerOptionsJs) {
      options = _libAppRulerOptionsJs['default'];
    }],
    execute: function () {
      'use strict';

      L.MapDistanceRuler = L.Class.extend({
        baseOptions: options,
        initialize: function initialize(options) {
          this._options = _Object$assign({}, this.baseOptions, options);
        },

        onAdd: function onAdd(map) {
          this._map = map;
          this._map.__dr = this;

          this.view = new View(this._map);
        },

        onRemove: function onRemove(map) {},

        view: null
      });

      L.mapDistanceRuler = function (options) {
        return new L.MapDistanceRuler(options);
      };
    }
  };
});
//# sourceMappingURL=build.js.map