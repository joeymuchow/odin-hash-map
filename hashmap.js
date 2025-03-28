import { LinkedList } from "./linkedList.js";

class HashMap {
    capacity;
    loadFactor;
    buckets;
    constructor(capacity = 16, loadFactor = 0.8) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.buckets = new Array(capacity);
    }

    hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        if (this.buckets[index] === undefined) {
            const linkedList = new LinkedList();
            linkedList.append(key, value);
            this.buckets[index] = linkedList;
        } else {
            const currentNode = this.buckets[index].head;
            while (currentNode.nextNode !== null) {
                if (currentNode.key === key) {
                    break;
                }
                currentNode = currentNode.nextNode;
            }
            if (currentNode.key === key) {
                currentNode.value = value;
            } else {
                this.buckets[index].append(key, value);
            }
        }

        if (this.length() > (this.capacity * this.loadFactor)) {
            // increase capacity and remake hashmap
            this.increaseCapacity();
        }
    }

    increaseCapacity() {
        const current = this.buckets;
        this.capacity = this.capacity * 2;
        this.buckets = new Array(this.capacity);

        for (const bucket of current) {
            if (bucket !== undefined) {
                let currentNode = bucket.head;
                while (currentNode.nextNode !== null) {
                    this.set(currentNode.key, currentNode.value);

                    currentNode = currentNode.nextNode;
                }
                this.set(currentNode.key, currentNode.value);
            }
        }
    }

    get(key) {
        let value = null;
        for (const bucket of this.buckets) {
            if (bucket !== undefined) {
                const index = bucket.find("key", key);
                if (index !== null) {
                    const node = bucket.at(index);
                    value = node.value;
                }
            }
        }
        return value;
    }

    has(key) {
        for (const bucket of this.buckets) {
            if (bucket !== undefined) {
                if (bucket.contains("key", key)) {
                    return true;
                }
            }
        }
        return false;
    }

    remove(key) {
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] !== undefined) {
                const index = this.buckets[i].find("key", key);
                if (index !== null) {
                    this.buckets[i].removeAt(index);
                    if (this.buckets[i].size === 0) {
                        this.buckets[i] = undefined;
                    }
                    return true;
                }
            }
        }
        return false;
    }

    length() {
        let total = 0;
        for (const bucket of this.buckets) {
            if (bucket !== undefined) {
                let currentNode = bucket.head;
                while (currentNode.nextNode !== null) {
                    total += 1;
                    currentNode = currentNode.nextNode;
                }
                total += 1;
            }
        }
        return total;
    }

    clear() {
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] !== undefined) {
                this.buckets[i] = undefined;
            }
        }
        this.capacity = 16;
    }

    keys() {
        const arr = [];
        for (const bucket of this.buckets) {
            if (bucket !== undefined) {
                let currentNode = bucket.head;
                while (currentNode.nextNode !== null) {
                    arr.push(currentNode.key);
                    currentNode = currentNode.nextNode;
                }
                arr.push(currentNode.key);
            }
        }
        return arr;
    }

    values() {
        const arr = [];
        for (const bucket of this.buckets) {
            if (bucket !== undefined) {
                let currentNode = bucket.head;
                while (currentNode.nextNode !== null) {
                    arr.push(currentNode.value);
                    currentNode = currentNode.nextNode;
                }
                arr.push(currentNode.value);
            }
        }
        return arr;
    }

    entries() {
        const arr = [];
        for (const bucket of this.buckets) {
            if (bucket !== undefined) {
                let currentNode = bucket.head;
                while (currentNode.nextNode !== null) {
                    const pair = [];
                    pair.push(currentNode.key);
                    pair.push(currentNode.value);
                    arr.push(pair);
                    currentNode = currentNode.nextNode;
                }
                const lastPair = [];
                lastPair.push(currentNode.key);
                lastPair.push(currentNode.value);
                arr.push(lastPair);
            }
        }
        return arr;
    }
}

export { HashMap }