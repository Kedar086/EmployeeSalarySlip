'use strict';

// defining routes here
angular.module('paySlipGeneratorApp')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider) {
        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: 'app/payslip/payslip.html'

            })
    }]);