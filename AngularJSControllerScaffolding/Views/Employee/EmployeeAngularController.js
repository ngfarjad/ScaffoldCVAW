/**
 * @ngdoc controller
 * @module EmployeeApp
 * @name EmployeeAppDocumentation
 * @description AngularJS controller for Employee View
 * @param {$scope} angularJS scope
 * @param {$http} required for http services
 *
 * ###Additional information
 * This is the EmployeeApp module for model view binding (Employee)
 */
angular.module('EmployeeApp', [])
	.controller('EmployeeCtrl', function ($scope, $http) {
		/**
		* @fields Employees
		* Empty objects for storing data retrieved from http request to WebApi
		*/
		$scope.Employees = [];

		/**
		* Flags for rendering differnt sections of Page
		* Required for making the Single Page Application
		*/
		$scope.loading = false;
		$scope.addMode = false;
		$scope.display = false;

		/**
		* This method retrieves Employee record by calling GET http service to WebApi.
		* It only recieves one specific Employee record which was searched.
		* It also gets other objects related to that Employee record.
		* @method getEmployees
		* @param no parameters
		*/
		$scope.getEmployees = function () {
				$http.get('/api/EmployeesApi/').success(function (data) {
					$scope.Employees = data;
					$scope.loading = false;
					$scope.display = true;
				}).error(function () {
					$scope.error = "An Error has occured while loading posts!";
					$scope.loading = false;
					$scope.display = false;
				});
		};

		/**
		* toggles edit view
		* @method toggleEdit
		*/
		$scope.toggleEdit = function () {
			this.Employee.editMode = !this.Employee.editMode;
		};

		/**
		* toggles add view
		* @method toggleAdd
		*/
		$scope.toggleAdd = function () {
			$scope.addMode = !$scope.addMode;
		};

		 /**
		* toggles hide table
		* @method toggleDisplay
		*/
		$scope.toggleDisplay = function () {
			 $scope.display = !$scope.display;
		};

		/**
		* This method inserts Employee record by sending POST http service to WebApi.
		* @method add
		* @param no parameters
		*/
		$scope.add = function () {
			$scope.loading = true;
			$http.post('/api/EmployeesApi/', this.newEmployee).success(function (data) {
				alert("Added Successfully!!");
				$scope.addMode = false;
				$scope.Employees.push(data);
				$scope.loading = false;
				$scope.newEmployee = null;
			}).error(function (data) {
				$scope.error = "An Error has occured while Adding Employee! " + data;
				$scope.loading = false;
			});
		};

		/**
		* This method updates Employee record by sending PUT http service to WebApi.
		* @method save
		* @param no parameters
		*/
		$scope.save = function () {
			$scope.loading = true;
			var obj = this.Employee;
			$http.put('/api/EmployeesApi/' + obj.id, obj).success(function (data) {
				alert("Saved Successfully !!");
				obj.editMode = false;
				$scope.loading = false;
			}).error(function (data) {
				$scope.error = "An Error has occured while Saving employee! " + data;
				$scope.loading = false;
			});
		};

		/**
		* This method deletes Employee record by sending DELETE http service to WebApi.
		* @method deleteEmployee
		* @param no parameters
		*/
		$scope.deleteEmployee = function () {
			$scope.loading = true;
			var Id = this.Employee.id
			$http.delete('/api/EmployeesApi/' + Id + '/').success(function (data) {
				alert("Deleted Successfully!!");
				$scope.Employees = [];
				$scope.display = false;
				$scope.loading = false;
			}).error(function (data) {
				$scope.error = "An Error has occured while Saving Employee! " + data;
				$scope.loading = false;
			});
		};
	});


