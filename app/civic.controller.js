(function() {
    'use strict';
    angular
        .module('myApp')
        .controller('CivicController', CivicController);
    CivicController.$inject = ['donService', '$stateParams', 'toastr'];
    /* @ngInject */
    function CivicController(donService, $stateParams, toastr) {
        var ci = this;
        ci.title = 'CivicController';
        ci.civicArray = [];
        var numberArray = [];
        var numRandoms = 15;
        ci.getCivic = function(zipInput) {
            donService.getCivicInfo(zipInput).then(
                function(response) {
                    ci.civicDetails = response.data.officials;
                    ci.civicTitle = response.data.offices;
                    // ci.civicArray = ci.civicDetails.concat(ci.civicTitle)
                    toastr.success('We have data!!');
                    console.log(response.data);
                },
                ci.getRandomSpan = function() {
                    if (!numberArray.length) {
                        for (var i = 1; i < numRandoms; i++) {
                            numberArray.push(i);
                        }
                    }
                    var index = Math.floor(Math.random() * numberArray.length);
                    var val = numberArray[index];

                    numberArray.splice(index, 1);

                    return val;
                },
                function(error) {
                    if (error.data) {
                        toastr.error('There was a problem:' + error);
                    } else {
                        toastr.info('no data found :(');
                    }
                }
            )
        }
    }
})();
