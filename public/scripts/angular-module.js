/**
 * Created by Terence on 3/20/2015.
 */
angular.module("school-store", [
    "ngMaterial",
    "ui.router",
    "home",
    "nav",
    "school-store-service",
    "daily",
    "NewSaleDialog",
    "SalesRecap",
    "DialogService",
    "ConfirmDialog",
    "BlogDialog",
    "SemanticDropdown",
    "EnterListener",
    "ItemRecap",
    "ItemSettings",
    "StudentSettings"
])
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider)
    {
        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "/views/home.html",
                controller: "HomeController"
            })
            .state("daily", {
                url: "/daily",
                templateUrl: "/views/daily.html",
                controller: "DailyController",

                auth: true
            })
            .state("salesRecap", {
                url: "/salesrecap",
                templateUrl: "/views/salesrecap.html",
                controller: "SalesRecapController",

                auth: true
            })
            .state("itemRecap", {
                url: "/itemrecap",
                templateUrl: "/views/itemrecap.html",
                controller: "ItemRecapController",

                auth: true
            })
            .state("itemSettings", {
                url: "/itemsettings",
                templateUrl: "/views/itemsettings.html",
                controller: "ItemSettingsController",

                auth: true
            })
            .state("studentSettings", {
                url: "/studentsettings",
                templateUrl: "/views/studentsettings.html",
                controller: "StudentSettingsController",

                auth: true
            });
    }])

    .filter("lDate", ["dateFilter", function(dateFilter) {
        return function (input, params) {
            if(typeof(input) === "object") return dateFilter(d, params);

            if(input) {
                var t = input.split(/[- :]/);

                // Apply each element to the Date function
                var d = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);

                return dateFilter(d.getTime(), params);
            }
        };
    }])

    .filter("round", function () {
        return function (input) {
            return Math.round(input);
        }
    })

    .run(function ($rootScope, $location, AuthService) {
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            //Is the route protected
            if(toState.auth) {

                //Are we logged in?
                AuthService.account()
                    .then(angular.noop, function (error) {
                        $location.path('/');
                    });
            }
        });
    });;
