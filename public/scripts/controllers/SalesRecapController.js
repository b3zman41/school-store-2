/**
 * Created by Terence on 4/22/2015.
 */
angular.module("SalesRecap", [])
    .controller("SalesRecapController", ["$scope", "$http", "DialogService", "$filter", function ($scope, $http, DialogService, $filter) {

        var date = new Date();

        $scope.period = null;
        $scope.month = date.getMonth() + 1;
        $scope.year = date.getFullYear();
        $scope.order = "desc";

        $scope.updateRecap = function () {
            $http({
                url: "/daily/query",
                method: "GET",

                params: {
                    period: $scope.period,
                    month: $scope.month,
                    year: $scope.year,
                    order: $scope.order
                }
            })
                .then(function (success) {
                    $scope.recaps = success.data;
                }, function (error) {
                    console.log(error);
                });
        };

        $scope.removeRecap = function (recap, $event) {
            DialogService.showConfirmDialog("Confirm removal of recaps log on " + $filter('lDate')(recap.created_at, 'short'), "Are you sure you would like to remove this sales log?", $event)
                .then(function () {
                    $http({
                        method: "DELETE",
                        url: "/daily/" + recap.id
                    })
                        .then(function (success) {
                            $scope.updateRecap();
                        }, console.log)
                }, function () {

                });
        };

        $scope.updatePeriod = function (period) {
            $scope.period = period;
            $scope.updateRecap();
        };

        $scope.updateMonth = function (month) {
            $scope.updateRecap();
        };

        $scope.updateYear = function (year) {
            $scope.updateRecap();
        };

        $scope.updateOrder = function (order) {
            $scope.order = order;
            $scope.updateRecap();
        }

        $scope.updateRecap();

    }])