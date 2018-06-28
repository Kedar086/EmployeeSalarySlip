'use strict';

angular.module('paySlipGeneratorApp')
    .factory('Payslip', function Payslip($http, $q) {
        return {
            genratePaySlip: function (employee, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.post('/api/payslip', employee).then(function (data) {
                    deferred.resolve(data);
                    return cb();
                }).catch(function (err) {
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));
                return deferred.promise;
            },
        };
    });