(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('MainController', MainController);

    MainController.$inject = ['donService', '$state', 'toastr'];

    /* @ngInject */
    function MainController(donService, $state, toastr) {
        var vm = this;
        vm.title = 'MainController';


        // activate();


        ////////////////

        vm.getTweet = function(tweetTopic) {
            donService.getDonTweet(tweetTopic).then(
                function(response) {
                    vm.getTweets = response.data._embedded.quotes;

                    toastr.success('We got the best data back!!');
                    console.log(response.data._embedded);
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
