'use strict';
 

customerModule.controller('AddEditCustomerCtrl', 
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
			    $('#'+$scope.customer.type).prop("checked", true);
		  });
	} 

	$scope.addCustomer = function() {
		var typeValue = $('input[name=optradio]:checked').val();
		if(typeValue) {
			$scope.customer.type = typeValue;
		}
		
		if(isEditMode()) {
			if(selectedCustomer) {
				selectedCustomer.update($scope.customer).then(function(ref) {
				  console.log("Updated success");
				  $location.url("/customer");
				}, function(error) {
				  console.log("Error updated:", error);
				});
			}
		} else {
			$scope.customers.$add($scope.customer).then(function(ref) {
			  console.log("Added success");
			  $location.url("/customer");
			}, function(error) {
			  console.log("Error:", error);
			});	
		}
		
	};
});