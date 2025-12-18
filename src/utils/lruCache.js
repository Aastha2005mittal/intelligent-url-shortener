class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
        this.head = new Node(0, 0); // dummy head
        this.tail = new Node(0, 0); // dummy tail
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    _remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    _add(node) {
        node.next = this.head.next;
        node.next.prev = node;
        node.prev = this.head;
        this.head.next = node;
    }

    get(key) {
        if (!this.map.has(key)) return null;
        const node = this.map.get(key);
        this._remove(node);
        this._add(node); // move to front (most recently used)
        return node.value;
    }

    put(key, value) {
        if (this.map.has(key)) {
            this._remove(this.map.get(key));
        }
        const node = new Node(key, value);
        this._add(node);
        this.map.set(key, node);

        if (this.map.size > this.capacity) {
            // remove LRU
            const lru = this.tail.prev;
            this._remove(lru);
            this.map.delete(lru.key);
        }
    }
}

module.exports = LRUCache;
