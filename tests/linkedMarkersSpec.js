import List from '../lib/app/linked-list';

var list;

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
    expect(list).not.toBe(null);
  });

  it('list: remove', function () {
    expect(list.remove(1000)).toEqual(null);
  });

  it('list: remove last item', function () {
    list.clear();

    list.add('other');
    expect(list.remove(0)).toEqual('other');
  });

  it('list: add/remove', function () {

    expect(Object.keys(list._hash)).toEqual(['0', '1', '2', '3', '4']);

    list.remove(3);

    expect(Object.keys(list._hash)).toEqual(['0', '1', '2', '4']);

    list.remove(3);

    expect(Object.keys(list._hash)).toEqual(['0', '1', '2']);

    list.add('five');
    list.remove(0);

    expect(Object.keys(list._hash)).toEqual(['1', '2', '5']);

    expect(list._head.data).toBe('one');
    expect(list._head.next.data).toBe('two');

    expect(list._tail.data).toBe('five');
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

    expect(node).toBe(list.get(1));

    console.log(list.get(0));
    console.log(list.get(1));
    console.log(list.get(2));
    console.log(list.get(3));
    console.log(list.get(4));
    console.log(list.get(5));

    expect(list.get(0).data).toBe('zero');
    expect(list.get(1).data).toBe('five');
    expect(list.get(2).data).toBe('one');

    let node2 = list.insertAfter('five', 0);

    expect(node2).toBe(list.get(1));

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
    expect(list.getFirst().data).toEqual('zero');
  });
  it('list: getLast', function () {
    expect(list.getLast().data).toEqual('four');
  });
  it('list: clear', function () {

    list.clear();

    expect(list._length).toBe(0);
    expect(list.get(0)).toEqual(jasmine.any(Object));
    expect(list._length).toBe(0);
  });
});