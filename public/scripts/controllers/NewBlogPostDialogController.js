angular.module("BlogDialog", [])
    .controller("BlogDialogController", ["$scope", "$http", "$mdToast", "$mdDialog", function ($scope, $http, $mdToast, $mdDialog) {
        $scope.$mdDialog = $mdDialog;

        $scope.submit = function (title, text) {
            $http({
                url: "/blog/post",
                method: "GET",
                params: {
                    text: text,
                    title: title
                }
            })
                .then(function (success) {
                    $mdDialog.hide(success);
                    location.reload();
                }, function (error) {
                    $mdDialog.cancel(error);
                });
        };

        $scope.close = function () {
            $mdDialog.cancel();
        };
    }]);