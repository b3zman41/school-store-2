/**
 * Created by Terence on 3/20/2015.
 */
 angular.module("nav", ["ngMaterial"])
 .controller("NavController", ["$scope", "$mdDialog", "$http", "AuthService", "DialogService", function($scope, $mdDialog, $http, AuthService, DialogService)
 {
    AuthService.init($scope);
    $scope.AuthService = AuthService;

    $scope.showLoginDialog = function ($event) {
        DialogService.showLoginDialog($event);
    };

    $scope.logout = function () {
        AuthService.logout();
    };
}])
 .controller("LoginDialogController", ["$scope", "$http", "AuthService", "$mdDialog", function($scope, $http, AuthService, $mdDialog){
    $scope.$mdDialog = $mdDialog;

    $scope.login = function (credentials) {
        AuthService.login(credentials, function (success) {
            location.reload();
        }, function (error) {
            $scope.errorMessage = error.data;
        });
    };
}]);
