const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
  this.count = 0;
  this.capacity = numBuckets;
  this.data = Array(numBuckets).fill(null);
}
  //value
  hash(key) {
  return parseInt(sha256(key).slice(0,8),16);
  }

  //key
  hashMod(key) {
   return this.hash(key) % this.capacity
  }


  insertNoCollisions(key, value) {

    let keyValuePair = new KeyValuePair(key,value)
    let dataBucketLocation = this.hashMod(key)
    if (this.data[dataBucketLocation]) {
      throw Error('hash collision or same key/value pair already exists!');
    } else {
      this.data[dataBucketLocation] = keyValuePair;
      this.count++      
    }
  }

  insertWithHashCollisions(key, value) {
    let keyValuePair = new KeyValuePair(key, value);
    let index = this.hashMod(key);
    keyValuePair.next = this.data[index];
    this.data[index] = keyValuePair;
    this.count++;
  }


  insert(key, value) {
    let index = this.hashMod(key)
    let existingPair = this.data[index];
    
    while (existingPair) {
      if (existingPair.key === key && existingPair.value !== value) {
        return existingPair.value = value;
      }
      existingPair = existingPair.next;
    }



    this.insertWithHashCollisions(key, value);
  }


}


hashTable = new HashTable(4);
hashTable.hash("A")







module.exports = HashTable;