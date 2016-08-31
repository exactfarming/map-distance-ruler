let Node = L.Class.extend({
  data: null,
  next: null,
  prev: null,
  initialize(data) {
    this.data = data;
  },
  index: 0,
});

export default L.Class.extend({
  _length: 0,
  _head: null,
  _tail: null,
  _hash: {},
  _count: 0,

  add(data) {
    let node = new Node(data);

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

    return node;
  },
  insertAfter(data, index) {
    let rslt = this._head;

    if (this._length == 0 || index > this._length || index < 0) {
      return;
    }

    if (rslt !== null) {
      let prev = this.get(index);
      let next = this.get(index + 1);

      let node = this.add(data);

      this._tail = node.prev;

      prev.next = node;
      next.prev = node;

      node.prev = prev;
      node.next = next;

      return node;
    }
  },
  get(index) {
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
  getLast() {
    return this.get(this._length - 1);
  },
  getFirst() {
    return this.get(0);
  },
  remove(index) {
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
      }

      //decrement the length
      this._length--;

      delete this._hash[current.index];

      //return the value
      return current.data;

    } else {
      return null;
    }
  },
  _beforeClear() {},
  clear() {
    this._beforeClear();

    this._length = 0;
    this._head = null;
    this._tail = null;
    this._hash = {};
    this._count = 0;
  }
});