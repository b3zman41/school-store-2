angular.module("ItemSettings", [])
    .controller("ItemSettingsController", function ($scope, $http, DialogService) {

        $http({
            url: "/items",
            method: "GET"
        })
            .then(function (success) {
                $scope.items = success.data;
            }, function (error) {
                console.log(error);
            });

        $scope.addItem = function ($event) {
            DialogService.addNewItemDialog($event)
                .then(function (item) {
                    $http({
                        url: "/items",
                        method: "POST",

                        data: item
                    })
                        .then(function (success) {
                            location.reload();
                        }, function (error) {
                            console.log(error);
                        });
                }, angular.noop);
        };

        $scope.editItem = function (item, $event) {
            DialogService.editItemDialog(item, $event)
                .then(function (newItem) {
                    $http({
                        url: "/items/" + item.id,
                        method: "PUT",

                        data: newItem
                    })
                        .then(function (success) {
                            location.reload();
                        }, angular.noop);
                }, angular.noop);
        };

        $scope.deleteItem = function (item, $event) {
            DialogService.showConfirmDialog("Confirmation", "Are you sure you would like to delete " +  item.name + "?", $event)
                .then(function (success) {
                    $http.delete("/items/" + item.id)
                        .then(function (success) {
                            location.reload();
                        }, angular.noop);
                }, function (error) {
                    console.log(error);
                })
        };

    })
    .controller("NewItemDialogController", function ($scope, $mdDialog) {
        $scope.$mdDialog = $mdDialog;
    })
    .controller("EditItemDialogController", function ($scope, $mdDialog, item) {
        $scope.$mdDialog = $mdDialog;
        $scope.item = item;
    });