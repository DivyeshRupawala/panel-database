'use strict';
 

orderModule.controller('AddEditOrderCtrl', 
	function($scope,$firebaseArray, $firebaseObject, $location, $routeParams){

	$('#dp3').datepicker().on('changeDate', function(ev){
    	// on change
    	console.log("change");
   	});

  	$('#dp4').datepicker().on('changeDate', function(ev){
    	// on change
  	});

	var isEditMode = function() {
 		return $routeParams.id && $routeParams.id !== "null";
 	};

 	$scope.isShowCustLabel = isEditMode();

 	var selectedOrder;
    var myCollection = firebase.database().ref('customers');
    $scope.customers = $firebaseArray(myCollection);

    var orderCollection = firebase.database().ref('orders');
    $scope.orderList = $firebaseArray(orderCollection);

	var getRandomNo = function(){
  		return Math.floor(Math.random()*90000) + 10000;
	}

	$scope.order = {
			  "id" : getRandomNo(),
			  "customerId": "",
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
              "paymentType": "",
              "isActive" : true,
              "createdAt" : new Date().getTime()
		    };

	if(isEditMode()) {
		selectedOrder = firebase.database().ref('/orders/'+$routeParams.id);

		  selectedOrder.on('value', function (results) {
			    $scope.order = results.val();
				$('#biilable'+$scope.order.billable).prop("checked", true);
				$('#wiring'+$scope.order.wiring).prop("checked", true);
				$('#'+$scope.order.paymentType).prop("checked", true);
			    $scope.custNameLabel = $scope.order.name;
			    var selectedCustomer = firebase.database().ref('/customers/'+$scope.order.customerId);

				  selectedCustomer.on('value', function (results) {
					    var object = results.val();

					    angular.forEach($scope.customers, function(value, key) {
					       if(value.orders && value.name == object.name) {
					        	  $scope.selectedCustomer = value;
					     	} 
					    });
 				  });
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
		$scope.order.customerId = $scope.selectedCustomer.$id;

		if ($scope.selectedCustomer.orders) {
			$scope.selectedCustomer.orders.push($scope.order);	
		} else {
			$scope.selectedCustomer.orders = [$scope.order];	
		}
		
		if(isEditMode()) {
			selectedOrder.update($scope.order).then(function(ref) {
			  console.log("Added success");
			  $location.url("/order");
			}, function(error) {
			  console.log("Error:", error);
			});
		} else {
			$scope.orderList.$add($scope.order).then(function(ref) {
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