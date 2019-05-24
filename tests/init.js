export function initMap(useCustomRender = true) {
  const bodyEl = document.querySelector('#test-wrapper');

  bodyEl.innerHTML = `
    <div id="map" style="width: 400px; height: 400px;"></div>
    <div id="distance"></div>
  `;

  const map = L.map('map').setView([52, 37], 13);

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

  let options;
  if (useCustomRender) {
    options = {
      center: [52, 37],
      renderRuler: function (map, _el) {
        document.querySelector('#distance').appendChild(_el);
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

export function destroyMap() {
  document.querySelector('#test-wrapper').innerHTML = '';
}
