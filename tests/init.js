function initMap(useCustomRender = true) {

  let mapId = `mapid_${new Date().getTime()}`;
  let $body = $('body');

  $body.append(`<div id="${mapId}"></div>`);
  var map = L.map(mapId).setView([52, 37], 13);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

  $body.append(`<div id="distance"></div>`);

  let options;
  if (useCustomRender) {
    options = {
      center: [52, 37],
      renderRuler: function (map, _el) {
        $('#distance').append(_el);
      },
      onChange: function (distance, distanceArray, rulerHTMLObjects) {
      }
    };
  } else {
    options = {
      center: [52, 37]
    };
  }

  let mapDistanceRuler = L.mapDistanceRuler(options);
  map.addLayer(mapDistanceRuler);

  return map;
}

function destroyMap() {
  $('body').html('');
}