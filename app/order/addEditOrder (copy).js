'use strict';
 

orderModule.controller('AddEditOrderCtrl', 
	function($scope,$firebaseArray, $firebaseObject, $location, $routeParams){

	$('#dp3').datepicker().on('changeDate', function(ev){
    	// on change
  	});

  	$('#dp4').datepicker().on('changeDate', function(ev){
    	// on change
  	});

	var isEditMode = function() {
 		return $routeParams.id && $routeParams.id !== "null";
 	};


 	var pQuery;
    var myCollection = firebase.database().ref('customers');
    $scope.customers = $firebaseArray(myCollection);

	var getRandomNo = function(){
  		return Math.floor(Math.random()*90000) + 10000;
	}

	$scope.order = {
			  "id" : getRandomNo(),
  			  "name" : "",
              "orderDate" : "",
              "deliveryDate" : "",
              "nameOfPanel" : "",
              "billable" : false,
              "wiring" : false,
              "totalCost" : 0,
              "fabricationCost" : 0,
              "wiringCost" : 0,
              "materialComponent" : "",
              "paymentType": ""
		    };

	if(isEditMode()) {
		//pQuery = firebase.database().ref('/customers/orders/'+$routeParams.id);
		
		var test = myCollection.child("orders").child($routeParams.id);

		  test.on('value', function (results) {
			    var hh = results.val();
			    console.log("tes"+hh);
		  });
	}
	
	$scope.addOrder = function() {
		var billable = $('input[name=billable]:checked').val();
		var wiring = $('input[name=wiring]:checked').val();
		var paymentType = $('input[name=paymentType]:checked').val();
		
		$scope.order.billable = billable;
		$scope.order.wiring = wiring;
		$scope.order.paymentType = paymentType;
		$scope.order.name = $scope.selectedCustomer.name;

		if ($scope.selectedCustomer.orders) {
			$scope.selectedCustomer.orders.push($scope.order);	
		} else {
			$scope.selectedCustomer.orders = [$scope.order];	
		}
		
		console.log("selected customer" +$scope.selectedCustomer);

		if(isEditMode()) {
			// if(selectedCustomer) {
			// 	selectedCustomer.update($scope.customer).then(function(ref) {
			// 	  console.log("Updated success");
			// 	  $location.url("/order");
			// 	}, function(error) {
			// 	  console.log("Error updated:", error);
			// 	});
			// }
		} else {
			$scope.customers.$save($scope.selectedCustomer).then(function(ref) {
			  console.log("Added success");
			  $location.url("/order");
			}, function(error) {
			  console.log("Error:", error);
			});
				
		}
		
	};

 //  	var ref = firebase.database().ref();
 //  	var obj = $firebaseObject(ref);

	// $('#dp3').datepicker().on('changeDate', function(ev){
 //    	// on change
 //  	});

 //  	$('#dp4').datepicker().on('changeDate', function(ev){
 //    	// on change
 //  	});

 //  	// to take an action after the data loads, use the $loaded() promise
 //     obj.$loaded().then(function() {
 //        $scope.customers = obj.customers;
    
 //     });

 //  $scope.customer = {
 //  			  "name" : "",
	// 	      "tinNo" : "",
	// 	      "address" : "",
	// 	      "contactNo" : "",
	// 	      "type" : ""
	// 	    };

	// $scope.addCustomer = function() {
	// 	var typeValue = $('input[name=optradio]:checked').val();
	// 	if(typeValue) {
	// 		$scope.customer.type = typeValue;
	// 	}
	// 	$scope.customers.push($scope.customer);
	// 	obj.$save().then(function(ref) {
	// 		  console.log("Added success");
	// 		  $location.url("/customer");
	// 		}, function(error) {
	// 		  console.log("Error:", error);
	// 		});
	// };

 //    // to take an action after the data loads, use the $loaded() promise
 //     obj.$loaded().then(function() {
 //        $scope.customers = obj.customers;
 //    });
});