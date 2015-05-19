/**
 * Created by Terence on 4/21/2015.
 */
angular.module("NewSaleDialog", [])
    .controller("NewSaleDialogController", ["$scope", "$http", "$mdDialog", "$mdToast", function ($scope, $http, $mdDialog, $mdToast) {

        $scope.items = [];

        $http({
            url: "/items/",
            method: "GET"
        })
            .then(function (success) {
                $scope.items = success.data;
                console.log(success.data);
            }, function (error) {
                console.log(error.data);
            })


        $scope.submit = function () {
            if($scope.selectedItem && $scope.itemCount) {
                $mdDialog.hide({
                    item: $scope.selectedItem,
                    itemCount: $scope.itemCount
                });
            } else {
                $mdToast.show($mdToast.simple().content("Missing input data"));
            }
        }
    }]);