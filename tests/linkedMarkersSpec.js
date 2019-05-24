import { initMap, destroyMap } from './init.js';
import { triggerEventSync } from './helpers.js';

import List from '../lib/app/linked-list.js';

let list;

const posArray = function (view) {
  let posArray = [];

  view.hash.each((item) => {
    posArray.push(item._position);
  });

  return posArray;
};

describe('Linked List', function () {
  beforeEach(function () {
    window.map = initMap();

    list = new List();

    list.add('zero');
    list.add('one');
    list.add('two');
    list.add('three');
    list.add('four');
  });

  afterEach(function () {
    destroyMap();

    list.clear();

    console.log(list.getLast());
  });

  it('init list', function () {
    expect(list).not.to.eql(null);
  });

  it('list: remove', function () {
    expect(list.remove(1000)).to.eql(null);
  });

  it('list: remove last item', function () {
    list.clear();

    list.add('other');
    expect(list.remove(0)).to.eql('other');
  });

  it('list: add/remove', function () {

    expect(Object.keys(list._hash)).to.eql(['0', '1', '2', '3', '4']);

    list.remove(3);

    expect(Object.keys(list._hash)).to.eql(['0', '1', '2', '4']);

    list.remove(3);

    expect(Object.keys(list._hash)).to.eql(['0', '1', '2']);

    list.add('five');
    list.remove(0);

    expect(Object.keys(list._hash)).to.eql(['1', '2', '5']);

    expect(list._head.data).to.eql('one');
    expect(list._head.next.data).to.eql('two');

    expect(list._tail.data).to.eql('five');
  });

  it('list: get', function () {
    console.log(list.get(0));
    console.log(list.get(1));
    console.log(list.get(2));
    console.log(list.get(3));
    console.log(list.get(4));
    console.log(list.get(486));
  });

  it('list: insertAfter', function () {
    list.insertAfter('five', -5);

    console.log(list.get(0));
    console.log(list.get(1));
    console.log(list.get(2));
    console.log(list.get(3));
    console.log(list.get(4));
    console.log(list.get(5));

    list.insertAfter('five', -5);

    list.insertAfter('five', 100);

    let node = list.insertAfter('five', 0);

    expect(node).to.eql(list.get(1));

    console.log(list.get(0));
    console.log(list.get(1));
    console.log(list.get(2));
    console.log(list.get(3));
    console.log(list.get(4));
    console.log(list.get(5));

    expect(list.get(0).data).to.eql('zero');
    expect(list.get(1).data).to.eql('five');
    expect(list.get(2).data).to.eql('one');

    let node2 = list.insertAfter('five', 0);

    expect(node2).to.eql(list.get(1));

    console.log(list.get(0));
    console.log(list.get(1));
    console.log(list.get(2));
    console.log(list.get(3));
    console.log(list.get(4));
    console.log(list.get(5));
    console.log(list.get(6));
    console.log(list.get(65));
  });
  it('list: getFirst', function () {
    expect(list.getFirst().data).to.eql('zero');
  });
  it('list: getLast', function () {
    expect(list.getLast().data).to.eql('four');
  });
  it('list: clear', function () {

    list.clear();

    expect(list._length).to.eql(0);
    assert.isNotEmpty(list.get(0));
    expect(list._length).to.eql(0);
  });

  it('list: isEmpty', () => {
    expect(list.isEmpty()).to.eql(false);
  });

  it('list: add/remove markers - 1', () => {
    list.clear();
    expect(list.isEmpty()).to.eql(true);

    const ruler = map.__dr;

    ruler.view._startMeasuring();

    triggerEventSync('click', '#map', {position: {x: 0, y: 50}});
    triggerEventSync('click', '#map', {position: {x: 10, y: 100}});
    triggerEventSync('click', '#map', {position: {x: 10, y: 200}});
    triggerEventSync('click', '#map', {position: {x: 10, y: 300}});
    triggerEventSync('click', '#map', {position: {x: 10, y: 400}});

    expect(posArray(ruler.view)).to.eql([0, 1, 2, 3, 4]);

    console.log('posArray - before', posArray(ruler.view));

    ruler.view.removeMarker(ruler.view.markers[4]);
    expect(posArray(ruler.view)).to.eql([0, 1, 2, 3]);
    ruler.view.removeMarker(ruler.view.markers[3]);
    expect(posArray(ruler.view)).to.eql([0, 1, 2]);
    ruler.view.removeMarker(ruler.view.markers[2]);
    expect(posArray(ruler.view)).to.eql([0, 1]);
    ruler.view.removeMarker(ruler.view.markers[1]);
    expect(posArray(ruler.view)).to.eql([0]);
  });

  it('list: add/remove markers - 2', () => {
    list.clear();
    expect(list.isEmpty()).to.eql(true);

    var ruler = map.__dr;

    ruler.view._stopMeasuring();
    ruler.view._startMeasuring();

    triggerEventSync('click', '#map', {position: {x: 0, y: 50}});
    triggerEventSync('click', '#map', {position: {x: 10, y: 100}});
    triggerEventSync('click', '#map', {position: {x: 10, y: 200}});
    triggerEventSync('click', '#map', {position: {x: 10, y: 300}});
    triggerEventSync('click', '#map', {position: {x: 10, y: 400}});

    expect(posArray(ruler.view)).to.eql([0, 1, 2, 3, 4]);

    ruler.view.removeMarker(ruler.view.markers[1]);
    expect(posArray(ruler.view)).to.eql([0, 1, 2, 3]);
    ruler.view.removeMarker(ruler.view.markers[1]);
    expect(posArray(ruler.view)).to.eql([0, 1, 2]);
    ruler.view.removeMarker(ruler.view.markers[1]);
    expect(posArray(ruler.view)).to.eql([0, 1]);
    ruler.view.removeMarker(ruler.view.markers[1]);
    expect(posArray(ruler.view)).to.eql([0]);
  });

  it('list: add/remove markers - 3', () => {
    list.clear();
    expect(list.isEmpty()).to.eql(true);

    var ruler = map.__dr;

    ruler.view._stopMeasuring();
    ruler.view._startMeasuring();

    triggerEventSync('click', '#map', {position: {x: 0, y: 50}});
    triggerEventSync('click', '#map', {position: {x: 10, y: 100}});
    triggerEventSync('click', '#map', {position: {x: 10, y: 200}});
    triggerEventSync('click', '#map', {position: {x: 10, y: 300}});
    triggerEventSync('click', '#map', {position: {x: 10, y: 400}});

    expect(posArray(ruler.view)).to.eql([0, 1, 2, 3, 4]);

    ruler.view.removeMarker(ruler.view.markers[3]);
    expect(posArray(ruler.view)).to.eql([0, 1, 2, 3]);
    ruler.view.removeMarker(ruler.view.markers[2]);
    expect(posArray(ruler.view)).to.eql([0, 1, 2]);
    ruler.view.removeMarker(ruler.view.markers[1]);
    expect(posArray(ruler.view)).to.eql([0, 1]);
    ruler.view.removeMarker(ruler.view.markers[0]);
    expect(posArray(ruler.view)).to.eql([0]);
  });
});
