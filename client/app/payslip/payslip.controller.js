'use strict';

angular.module('paySlipGeneratorApp')
    .controller('payslipController', function ($scope, Payslip) {
        // form submit function
        $scope.load = false;
        $scope.submit = function () {
            const employee = {
                fname: $scope.fname,
                lname: $scope.lname,
                salary: parseInt($scope.salary),
                srate: parseInt($scope.srate),
                date: $scope.date
            };

            Payslip.genratePaySlip(employee)
                .then(function (response) {
                    $scope.load = true;
                    $scope.errorMsg = "";
                    $scope.data = response.data;
                })
                .catch(function (err) {
                    $scope.errorMsg = err.data.message;
                });
        }
    });