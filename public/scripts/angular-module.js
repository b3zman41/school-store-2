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
    "SemanticDropdown"
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
                controller: "DailyController"
            })
            .state("salesRecap", {
                url: "/salesrecap",
                templateUrl: "/views/salesrecap.html",
                controller: "SalesRecapController"
            });
    }])

.filter("lDate", ["dateFilter", function(dateFilter) {
        return function (input, params) {
            return dateFilter(new Date(input).getTime(), params);
        };
    }])

.filter("round", function () {
        return function (input) {
            return Math.round(input);
        }
    });
