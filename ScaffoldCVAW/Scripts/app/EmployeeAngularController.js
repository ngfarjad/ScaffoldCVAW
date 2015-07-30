/**
 * @ngdoc controller
 * @module EmployeeApp
 * @name EmployeeAppDocumentation
 * @description AngularJS controller for Employee View
 * @param {vm} angularJS scope
 * @param {$http} required for http services
 *
 * ###Additional information
 * This is the EmployeeApp module for model view binding (Employee)
 */
function config($routeProvider) {
    $routeProvider
        .when("/Edit/:employeeId", {
            templateUrl: "",
            controller: "articleController",
            controllerAs: "vm"
        });
};
angular.module('EmployeeApp', ['datatables', 'datatables.tabletools', 'ngRoute'])
    .config(config)
	.controller('EmployeeCtrl', function ($http, DTOptionsBuilder, $routeParams) {
	    var vm = this;
	    vm.dtOptions = DTOptionsBuilder
            .fromSource(vm.Employees)
            // Add Table tools compatibility
            .withTableTools('/Content/vendor/datatables-tabletools/swf/copy_csv_xls_pdf.swf')
            .withTableToolsButtons([
                'copy',
                'print', {
                    'sExtends': 'collection',
                    'sButtonText': 'Save',
                    'aButtons': ['csv', 'xls', 'pdf']
                }
            ]);

	    /**
		* @fields Employees
		* Empty objects for storing data retrieved from http request to WebApi
		*/


	    vm.Employees = [];
	    vm.Employee = {};
	    vm.Employee.EmployeeSalaries = [];

	    /**
            * Flags for rendering differnt sections of Page
            * Required for making the Single Page Application
            */
	    vm.loading = false;
	    vm.addMode = false;
	    vm.display = false;
	    $http.get('/api/EmployeesApi/').success(function (data) {
	        vm.Employees = data;
	        vm.loading = false;
	        vm.display = true;
	    }).error(function () {
	        vm.error = "An Error has occured while loading posts!";
	        vm.loading = false;
	        vm.display = false;
	    });
	    /**
		* This method retrieves Employee record by calling GET http service to WebApi.
		* It only recieves one specific Employee record which was searched.
		* It also gets other objects related to that Employee record.
		* @method getEmployees
		* @param no parameters
		*/
	    vm.getEmployees = function () {
	        $http.get('/api/EmployeesApi/').success(function (data) {
	            vm.Employees = data;
	            vm.loading = false;
	            vm.display = true;
	            
	        }).error(function () {
	            vm.error = "An Error has occured while loading posts!";
	            vm.loading = false;
	            vm.display = false;
	        });
	    };
	    vm.getEmployeeById = function (id) {
	        $http.get('/api/EmployeesApi/' + id).success(function (data) {
	            vm.Employee = data;
	            vm.loading = false;
	            if (!vm.DisplayDetail) {
	                vm.DisplayDetail = true;
	            }
	            vm.display = true;
	        }).error(function () {
	            vm.error = "An Error has occured while loading posts!";
	            vm.loading = false;
	            vm.display = false;
	        });
	    };

	    /**
		* toggles edit view
		* @method toggleEdit
		*/
	    vm.toggleEdit = function () {
	        vm.Employee.editMode = !vm.Employee.editMode;
	    };

	    vm.AddDetail = function () {

	        if (!vm.DisplayDetail) {
	            vm.DisplayDetail = true;
	        }
	        vm.Employee.EmployeeSalaries.push({});
	    }

	    /**
		* toggles add view
		* @method toggleAdd
		*/
	    vm.toggleAdd = function () {
	        vm.addMode = !vm.addMode;
	    };

	    /**
       * toggles hide table
       * @method toggleDisplay
       */
	    vm.toggleDisplay = function () {
	        vm.display = !vm.display;
	    };

	    /**
		* This method inserts Employee record by sending POST http service to WebApi.
		* @method add
		* @param no parameters
		*/
	    vm.editEmployee = function () {
	        vm.loading = true;
	        $http.post('/api/EmployeesApi/' + vm.Employee.Id, vm.Employee).success(function (data) {
	            alert("Added Successfully!!");
	            vm.addMode = false;
	            vm.Employees.push(data);
	            vm.loading = false;
	            vm.Employee = {};
	        }).error(function (data) {
	            vm.error = "An Error has occured while Adding Employee! " + data;
	            vm.loading = false;
	        });
	    };

	    /**
		* This method updates Employee record by sending PUT http service to WebApi.
		* @method save
		* @param no parameters
		*/
	    vm.saveEmployee = function () {
	        vm.loading = true;
	        $http.post('/api/EmployeesApi/', vm.Employee).success(function (data) {
	            alert("Saved Successfully !!");
	        }).error(function (data) {
	            vm.error = "An Error has occured while Saving employee! " + data;
	        });
	        vm.loading = false;
	    };

	    /**
		* This method deletes Employee record by sending DELETE http service to WebApi.
		* @method deleteEmployee
		* @param no parameters
		*/
	    vm.deleteEmployee = function () {
	        vm.loading = true;
	        var Id = this.Employee.id;
	        $http.delete('/api/EmployeesApi/' + Id + '/').success(function (data) {
	            alert("Deleted Successfully!!");
	            vm.Employees = [];
	            vm.display = false;
	            vm.loading = false;
	        }).error(function (data) {
	            vm.error = "An Error has occured while Saving Employee! " + data;
	            vm.loading = false;
	        });
	    };
	});


