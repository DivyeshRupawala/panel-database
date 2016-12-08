'use strict';
 
var pendingPaymentModule = angular.module('myApp.pendingPayment', ['ngRoute', 'firebase']);
 
orderModule.controller('PendingPaymentCtrl', function($scope,$firebaseArray, $firebaseObject, $window){
  var myCollection = firebase.database().ref('orders');
  $scope.orderList = $firebaseArray(myCollection);
  
  $scope.done = function(id) {
    var updateConfirm = $window.confirm('Are you sure you want make as done?');
    if (updateConfirm) {
      var selectedOrder = firebase.database().ref('/orders/'+id);
   
      selectedOrder.on('value', function (results) {
          $scope.order = results.val();
          $scope.order.isActive = false;

          selectedOrder.update($scope.order).then(function(ref) {
            console.log("Order Updated as inactive successfully");
          }, function(error) {
            console.log("Error:", error);
          });
      });

    }
  };
});