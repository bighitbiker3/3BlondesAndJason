app.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/home/admin.html',
        controller: 'adminCtrl'
    })
    .state('admin.users', {
      url: '/users',
      templateUrl: 'js/admin/users/users.admin.html',
      controller: 'usersAdminCtrl'
    })
    .state('admin.userDetail', {
      url: '/users/:userId',
      templateUrl: 'js/admin/users/user.detail.admin.html',
      controller: 'usersDetailAdminCtrl'
    })
    .state('admin.products', {
        url: '/products',
        templateUrl: 'js/admin/products/products.admin.html',
        controller: 'adminProductsCtrl'
    })
    .state('admin.productDetail', {
      url: '/products/:productId',
      templateUrl: 'js/admin/products/product.detail.admin.html',
      controller: 'adminProductDetailCtrl'
    })
    .state('admin.orders', {
      url: '/orders',
      templateUrl: 'js/admin/orders/orders.admin.html',
      controller: 'adminOrdersCtrl'
    })
    .state('admin.orderDetail', {
      url: '/orders/:orderId',
      templateUrl: 'js/admin/orders/order.detail.admin.html',
      controller: 'adminOrderDetailCtrl'
    })

})
