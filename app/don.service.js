(function() {
    'use strict';

    angular
        .module('myApp')
        .service('donService', donService);

    donService.$inject = ['$state', '$http', '$q'];

    /* @ngInject */
    function donService($state, $http, $q) {
        this.getDonTweet = getDonTweet;
        this.getCivicInfo = getCivicInfo;

        ////////////////

        function getDonTweet(tweetTopic) {
            var defer = $q.defer();
            $http({
                method: 'GET',

                url: 'https://api.tronalddump.io/search/quote',
                params: {
                    query: tweetTopic
                }
            }).then(function(response) {
                if (typeof response.data === 'object') {
                    defer.resolve(response);

                } else {
                    defer.reject('no data found :(')
                }

                // error code
            }, function(error) {
                console.log(error);
                defer.reject(error);

            });

            return defer.promise;
        }

        function getCivicInfo(zipInput) {
            var defer = $q.defer();
            $http({
                method: 'GET',

                url: 'https://www.googleapis.com/civicinfo/v2/representatives',
                params: {
                    key: 'AIzaSyDgRHn-wC98eklYhRbGnUcznqRqwmAvPkQ',
                    address: zipInput
                }
            }).then(function(response) {
                if (typeof response.data === 'object') {
                    defer.resolve(response);

                } else {
                    defer.reject('no data found :(')
                }

                // error code
            }, function(error) {
                console.log(error);
                defer.reject(error);

            });

            return defer.promise;
        }
    }
})();
