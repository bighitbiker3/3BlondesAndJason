app.config(function ($stateProvider) {
  $stateProvider.state('profile.addresses', {
    url: '/addresses',
    templateUrl: 'js/profile/addresses/myaddresses.html',
    controller: 'ProfileAddressCtrl',
    resolve: {
      addresses: function(Address) {
        return Address.getMyAddresses();
      }
    }
  });
});
