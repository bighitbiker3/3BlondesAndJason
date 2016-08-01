'use strict';

app.factory('Utility', function ($http) {
  return {
    convertCentsToDollars: function(cents){
      return cents / 100;
    },

    convertDollarsToCents: function(dollars){
      return dollars * 100;
    },

    convertToQuery: function(json){
        // JA and BG: consider using something found on lodash for this, or Object.keys
        // for example, _.values or _.mapValues or _.map
      var superQuery = [];
      for (var key in json) {
        if(json.hasOwnProperty(key)){
          superQuery.push(json[key]);
        }
      }
      superQuery = '?' + superQuery.join('&');

      return superQuery;
    }
  }
})

