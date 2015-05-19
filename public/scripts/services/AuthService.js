/**
 * Created by Terence on 3/20/2015.
 */
angular.module("school-store-service", ["ngMaterial"])
    .factory("AuthService", ["$http", function ($http) {
        var AuthService = {};

        AuthService.login = function (credentials, successCallback, errorCallback) {
            $http({
                method: "POST",
                url: "/auth/login",
                data: credentials
            })
                .then(function (user) {
                    AuthService.user = user.data;

                    successCallback(user);
                }, function (error) {
                    errorCallback(error);
                });
        };

        AuthService.logout = function () {
            $http({
                method : "GET",
                url: "/auth/logout"
            })
                .then(function (success) {
                    location.reload();
                }, function (error) {
                    console.log(error);
                });
        };

        AuthService.init = function ($scope) {
            $http({
                method: "GET",
                url: "/auth"
            })
                .then(function (user) {
                    AuthService.user = user.data;
                }, function (error) {
                    console.log(error);
                });
        };

        AuthService.isAdmin = function () {
            if(AuthService.user) {
                return AuthService.user.role === "admin";
            }

            return false;
        };

        return AuthService;
    }]);

