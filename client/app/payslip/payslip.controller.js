'use strict';

angular.module('paySlipGeneratorApp')
    .controller('payslipController', function ($scope, Payslip) {
        // form submit function
        $scope.load = false;
        $scope.submit = function () {
            const employee = {
                fname: $scope.fname,
                lname: $scope.lname,
                salary: $scope.salary,
                srate: $scope.srate,
                date: $scope.date
            };

            Payslip.genratePaySlip(employee)
                .then(function (response) {
                    $scope.load = true;
                    $scope.data = response.data;
                })
                .catch(function (err) {
                    $scope.errors.other = err.message;
                });
        }
    });