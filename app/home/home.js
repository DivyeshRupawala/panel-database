'use strict';
 
angular.module('myApp.home', ['ngRoute', 'firebase'])
 
// Home controller
.controller('HomeCtrl', function($scope, $location, $window, $timeout, $rootScope) {
	var auth = firebase.auth();
	$scope.SignIn = function(event) {
		event.preventDefault();
		
	    var username = $scope.user.email;
	    var password = $scope.user.password;
	    
	    $rootScope.isUserAuthenticated = false;

	    var promise = auth.signInWithEmailAndPassword(username, password);
	    promise.then(function(user) {
	            // Success callback
	            $timeout(function() {
	            	$rootScope.isUserAuthenticated = true;
	            	$location.url("/customer");	
	            }, 10);
	             
	            console.log('Authentication successful');	            
	        }, function(error) {
	            // Failure callback
	            console.log('Authentication failure');
	        });
	}

	$(function(){ 
	     var navMain = $("#navbar");
	     navMain.on("click", "a", null, function () {
	         navMain.collapse('hide');
	     });
	 });
});
