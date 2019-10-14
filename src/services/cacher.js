import camelCase from 'camel-case';

let instance = null;


export class Cacher{
cache = {};
//camel case
constructor(){
if(!instance){
  instance = this;
}// instance is this (Cacher class)

return instance;
}
   isValueCached(key){
    return this.getCachedValue(key);
  }
  //get value
  chachValue(key,value){
    this.cache[key] = value;

  }
  getCachedValue(key){
  return this.cache[key];
  }
}  