'use strict';
 

customerModule.controller('DetailCustomerCtrl', 
	function($scope,$firebaseArray, $firebaseObject, $location, $routeParams){
 
 	var isEditMode = function() {
 		return $routeParams.id && $routeParams.id !== "null";
 	};

 	var selectedCustomer;
    var myCollection = firebase.database().ref('customers');
    $scope.customers = $firebaseArray(myCollection);

  	$scope.customer = {
  			  "name" : "",
		      "tinNo" : "",
		      "address" : "",
		      "contactNo" : "",
		      "type" : "",
		      "orders" : {}
		    };

	if(isEditMode()) {
		selectedCustomer = firebase.database().ref('/customers/'+$routeParams.id);

		  selectedCustomer.on('value', function (results) {
			    $scope.customer = results.val();
			    $scope.customer.id = results.key;
			    $('#'+$scope.customer.type).prop("checked", true);
		  });

		  var orderCollection = firebase.database().ref('orders');
  		  $scope.orderList = $firebaseArray(orderCollection);

  		//   $scope.orderList.on('value', function (results) {
			 //     angular.forEach(results, function(value, key) {
  		//    	console.log("vale : "+value.name);
		  //      // if(value.orders) {
		  //        //   angular.forEach(value.orders, function(value, key) {
		  //        //   if(value) {
		  //        //     $scope.orderList.push(value);
		  //        //   }
		  //      		// });
		  //    // } 
		  //   });
		  // });
		  
  		  

		 //  var orderList = firebase.database().ref('orders');

			// orderList.orderByChild("customerId").equalTo($routeParams.id).limitToFirst(10).on("value", 
			// 	function(snapshot) {
			//   console.log(snapshot.key);
			//   snapshot.forEach(function(pSnap) {
			//         console.log(pSnap.key());
			//     });
			// });


	} 
});