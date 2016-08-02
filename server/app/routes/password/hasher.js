var crypto = require('crypto');
var secret = 'sdfadfsassssf';
var hashStore = {};
var hashMethods = {};
var _ = require('lodash')

//CLEAR STORE EVERY HOUR
setInterval(function(){
  // hashStore = _.pickBy(hashStore, function(val){return val.expire > Date.now()}) - WOULD LIKE TO KNOW WHY THIS WONT WORK
  for(var key in hashStore){
    if(hashStore[key].expire < Date.now()) delete hashStore[key]
  }
}, 9000);

hashMethods.createHash = function(email){
  return crypto.createHmac('sha1', secret).update(email).digest('hex')
}

hashMethods.store = function(){
  return hashStore;
}

hashMethods.addUserHash = function(email){
  hashStore[hashMethods.createHash(email)] = {email: email, expire: Date.now() + 100000 }
  return hashMethods.createHash(email)
}

hashMethods.findUserHashWithEmail = function(email){
  if(!hashStore[hashMethods.createHash(email)]) return false;
  else return hashStore[hashStore[hashMethods.createHash(email)]].email;
}

hashMethods.findUserHashWithHash = function(hash){
  if(!hashStore[hash]) return false;
  else return hashStore[hash].email;
}


module.exports = hashMethods;
