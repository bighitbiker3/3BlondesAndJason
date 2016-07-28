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
