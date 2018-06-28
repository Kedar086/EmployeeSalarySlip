'use strict';

// directive for accepting only numbers as input
angular.module('paySlipGeneratorApp')
.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (_scope, _element, _attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});