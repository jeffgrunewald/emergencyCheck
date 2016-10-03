'use strict';

angular.module('emergencyCheck')

.controller('CheckinController', ['$scope', 'studentFactory', function ($scope, studentFactory) {

    $scope.students = studentFactory.query();

    $scope.toggleSafety = function(student) {
        student.safe = !student.safe;
        studentFactory.save(student);
    };

    $scope.toggleAbsence = function(student) {
        student.absent = !student.absent;
        studentFactory.save(student);
    };

}])

.controller('UpdateController', ['$scope', 'studentFactory', 'staffFactory', function ($scope, studentFactory, staffFactory) {
    $scope.message = "Loading ...";
    $scope.students = studentFactory.query();
    $scope.staff = staffFactory.query();
    $scope.studentFilter = null;
    $scope.staffFilter = null;
    $scope.invalidRecord = false;

    $scope.resetAll = function () {
        for (var i = 0; i < $scope.students.length; i++) {
            $scope.students[i].safe = false;
            $scope.students[i].absent = false;
            studentFactory.save($scope.students[i])
        }
    }

    $scope.deleteAll = function () {
        for (var i = $scope.students.length - 1; i >= 0; i--) {
            studentFactory.delete($scope.students[i]);
        }
        for (var i = $scope.staff.length - 1; i >= 0; i--) {
            staffFactory.delete($scope.staff[i]);
        }
    }

    $scope.deleteStudent = function(student) {
        studentFactory.delete(student);
        $scope.studentFilter = null;
    }

    $scope.deleteStaff = function(staff) {
        staffFactory.delete(staff);
        $scope.staffFilter = null;
    }

    $scope.studentRecord = {
        id: "",
        first_name: "",
        last_name: "",
        grade: "",
    };

    $scope.sendStudent = function () {
        if ($scope.studentRecord.first_name == "" && $scope.studentRecord.last_name == "" && $scope.studentRecord.grade == "") {
            $scope.invalidRecord = true;
        } else {
            $scope.invalidRecord = false;
            studentFactory.save($scope.studentRecord);
            $scope.studentRecord = {
                id: "",
                first_name: "",
                last_name: "",
                grade: "",
            };
            $scope.studentForm.$setPristine();
        }
    };

    $scope.staffRecord = {
        id: "",
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        admin: false
    }

    $scope.sendStaff = function () {
        if ($scope.staffRecord.first_name == "" && $scope.staffRecord.last_name == "" && $scope.staffRecord.username == "") {
            $scope.invalidRecord = true;
        } else {
            $scope.invalidRecord = false;
            staffFactory.save($scope.staffRecord);
            $scope.staffRecord = {
                id: "",
                first_name: "",
                last_name: "",
                username: "",
                password: "",
                admin: false
            };
            $scope.staffForm.$setPristine();
        }
    };
}])

.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', function ($scope, $state, $rootScope, ngDialog, AuthFactory) {

    $scope.loggedIn = false;
    $scope.username = '';

    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
    }

    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
    };

    $scope.logOut = function() {
       AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
    };

    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });

    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });

    $scope.stateis = function(curstate) {
       return $state.is(curstate);
    };

}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {

    $scope.loginData = $localStorage.getObject('userinfo','{}');

    $scope.doLogin = function() {
        if($scope.rememberMe)
           $localStorage.storeObject('userinfo',$scope.loginData);

        AuthFactory.login($scope.loginData);

        ngDialog.close();

    };

    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };

}])

.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {

    $scope.register={};
    $scope.loginData={};

    $scope.doRegister = function() {
        console.log('Doing registration', $scope.registration);

        AuthFactory.register($scope.registration);

        ngDialog.close();

    };
}])
;
