var contactApp = angular.module("contactApp",[]);

contactApp.controller('appCtrl', function($scope,$http){
	console.log("Hi reply from Angular Controller");
	$scope.refresh = function () {
		$scope.contact = {};
		$scope.getContactList();
	};
	$scope.getContactList = function(){
		$http.get('/getContactList').then(function(response){
			console.log("I have received the data", response);
			$scope.contactList = response.data;
		});
	};
	$scope.addContact = function(){
		console.log($scope.contact);
		if(!$scope.contact._id){
			$http.post('/addContact', $scope.contact).then(function(response){
			console.log(response);
			$scope.refresh();
			});
		}
		else{
			alert("Please click on save button");
		}
		

	};
	$scope.removeContact = function(id){
		console.log("deleting data : " + id);
		$http.delete('/removeContact/' + id).then(function(response){
			console.log(response);
			$scope.refresh();
		});
	};
	$scope.editContact = function(contact){
		console.log("contact to edit : " + contact._id);
		$scope.contact = angular.copy(contact);
	};
	$scope.updateContact = function(){
		if($scope.contact._id){
			console.log("received object to update : " +  $scope.contact._id);
			$http.put('/updateContact/' + $scope.contact._id , $scope.contact).then(function(response){
				console.log(response);
				$scope.refresh();
			});
		}
		else{
			alert("first click on edit to save changes");
		}
	}

	$scope.refresh();
});
    