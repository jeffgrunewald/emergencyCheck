'use strict';

angular.module('emergencyCheck', ['ui.router','ngResource','ngDialog'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/checkin.html',
                        controller  : 'CheckinController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })

            // route for the aboutus page
            .state('app.update', {
                url:'update',
                views: {
                    'content@': {
                        templateUrl : 'views/update.html',
                        controller  : 'UpdateController'
                    }
                }
            })

        $urlRouterProvider.otherwise('/');
    })
;
