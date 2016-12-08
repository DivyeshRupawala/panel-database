'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.customer',
  'myApp.order',
  'firebase'
]).

config(['$routeProvider', function($routeProvider) {

    $routeProvider
    .when("/", {
        redirectTo: '/home'
    })
    .when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    })
    .when('/customer', {
        templateUrl: 'customer/createCustomer.html',
        controller: 'CustomerCtrl'
    })
    .when('/addEditCustomer/:id', {
        templateUrl: 'customer/addEditCustomer.html',
        controller: 'AddEditCustomerCtrl'
    })
    .when('/detailCustomer/:id', {
        templateUrl: 'customer/detailCustomer.html',
        controller: 'DetailCustomerCtrl'
    })
    .when('/order', {
        templateUrl: 'order/orderList.html',
        controller: 'OrderListCtrl'
    })
    .when('/addEditOrder/:id', {
        templateUrl: 'order/addEditOrder.html',
        controller: 'AddEditOrderCtrl'
    })
    .when('/pendingPayment', {
        templateUrl: 'pendingPayment/pendingPayment.html',
        controller: 'PendingPaymentCtrl'
    })    
    .otherwise({
        redirectTo: '/home'
    });
}]);

// constant('CUSTOMER_URL', 
//   'https://panel-database.firebaseio.com/customers'                                                    
// );