'use strict';
 
var orderModule = angular.module('myApp.order', ['ngRoute', 'firebase']);
 
orderModule.controller('OrderListCtrl', function($scope,$firebaseArray, $firebaseObject, $window){
  // var ref = firebase.database().ref();
  // var obj = $firebaseObject(ref);
  // $scope.orderList = [];

  //     // to take an action after the data loads, use the $loaded() promise
  //    obj.$loaded().then(function() {
  //       $scope.customers = obj.customers;
        
  //       angular.forEach($scope.customers, function(value, key) {
  // 			if(value.orders) {
		// 		angular.forEach(value.orders, function(value, key) {
		//   			if(value) {
		//   				$scope.orderList.push(value);
		//   			}
		// 		});
  //  			}
		// });
  // });

  // Working example
  // var myCollection = firebase.database().ref('customers');
  // $scope.orderList = $firebaseArray(myCollection);

  //  $scope.orderList.$add({
  //     "name" : "Test",
  //     "tinNo" : 123456,
  //     "address" : "Bangalore updated Hennur",
  //     "contactNo" : 1234567890,
  //     "type" : "Contract",
  //     "orders" : {
  //           "0" : {
  //             "name" : "Diveyakabash test",
  //             "orderDate" : "24-11-2016",
  //             "deliveryDate" : "29-11-2016",
  //             "billable" : true,
  //             "wiring" : false,
  //             "totalCost" : 1100,
  //             "fabricationCost" : 500,
  //             "materialComponent" : "Need to Check",
  //             "paymentType": "Cash"
  //           },
  //           "1" : {
  //             "name" : "Vinsmdjjaksod test",
  //             "orderDate" : "25-11-2016",
  //             "deliveryDate" : "30-11-2016",
  //             "billable" : false,
  //             "wiring" : true,
  //             "totalCost" : 2000,
  //             "fabricationCost" : 700,
  //             "materialComponent" : "Need to Check",
  //             "paymentType": "Check"
  //           }      
  //         }
  //   });

// before
  // var myCollection = firebase.database().ref('customers');
  // $scope.customers = $firebaseArray(myCollection);
  // $scope.orderList = [];

  // $scope.customers.$loaded().then(function() { 
  //   angular.forEach($scope.customers, function(value, key) {
  //      if(value.orders) {
  //          angular.forEach(value.orders, function(value, key) {
  //          if(value) {
  //            $scope.orderList.push(value);
  //          }
  //      });
  //    } 
  //   });
  // });

  var myCollection = firebase.database().ref('orders');
  $scope.orderList = $firebaseArray(myCollection);
  $scope.isActive = true;

  $scope.deleteRecord = function(id) {
    var deleteConfirm = $window.confirm('Are you sure you want to delete?');
    if (deleteConfirm) {
      var selectedOrder = firebase.database().ref('/orders/'+id);
   
      selectedOrder.remove();
    }
  };

  $scope.displayActive = function(isActive) {
    if(isActive) {
      //alert("isActive");
    } else {
      //alert("inActive");
    }

    $scope.isActive = !$scope.isActive;
  };

});