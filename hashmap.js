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
        if (this.buckets[index] === undefined) {
            const linkedList = new LinkedList();
            linkedList.append(key, value);
            this.buckets[index] = linkedList;
        } else {
            this.buckets[index].append(key, value);
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
       
    }

    length() {
        
    }

    clear() {
        
    }

    keys() {
        
    }

    values() {
        
    }

    entries() {
        
    }
}

export { HashMap }