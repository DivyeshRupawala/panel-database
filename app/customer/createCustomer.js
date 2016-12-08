'use strict';
 
var customerModule = angular.module('myApp.customer', ['ngRoute', 'firebase']);
 
customerModule.controller('CustomerCtrl', function($scope,$firebaseArray, $firebaseObject, $window){
  // var ref = firebase.database().ref();
  // var obj = $firebaseObject(ref);

      // to take an action after the data loads, use the $loaded() promise
     // obj.$loaded().then(function() {
     //    $scope.customers = obj.customers;

        // update value
        // $scope.customers[1].name = "updated by div";

        // Add
  //       var newVal = {
		//       "name" : "New",
		//       "tinNo" : 111111,
		//       "address" : "address",
		//       "contactNo" : 9999999999,
		//       "type" : "House Hold"
		//     };
		// $scope.customers.push(newVal);


		// Save
  //       obj.$save().then(function(ref) {
		//   console.log("updated success");
		// }, function(error) {
		//   console.log("Error:", error);
		// });   
		    
     // });

  var myCollection = firebase.database().ref('customers');
  $scope.customers = $firebaseArray(myCollection);

  $scope.deleteRecord = function(id) {
  	var deleteConfirm = $window.confirm('Are you sure you want to delete?');
    if (deleteConfirm) {
      	var selectedCustomer = firebase.database().ref('/customers/'+id);	

		// update name property
		selectedCustomer.remove();
    }
  };

});