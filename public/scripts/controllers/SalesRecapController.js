/**
 * Created by Terence on 4/22/2015.
 */
angular.module("SalesRecap", [])
    .controller("SalesRecapController", ["$scope", "$http", function ($scope, $http) {

        $http({
            url: "/daily/",
            method: "GET"
        })
            .then(function (success) {
                console.log(success.data);
                $scope.recaps = success.data;
            }, function (error) {
                console.log(error);
            })

    }])