angular.module("ItemRecap", [])
    .controller("ItemRecapController", function ($scope, $http) {

        var date = new Date();

        $scope.month = date.getMonth();
        $scope.year = date.getFullYear();
        $scope.order = "desc";

        $scope.updateSales = function () {
            $scope.minDate = null;
            $scope.maxDate = null;

            $http({
                url: "/sales/query",
                method: "GET",

                params: {
                    month: $scope.month,
                    year: $scope.year,
                    order: $scope.order
                }
            })
                .then(function (success) {
                    $scope.sales = success.data;

                    if($scope.sales.length > 0) {
                        $scope.minDate = new Date($scope.sales[0].created_at);
                        $scope.maxDate = new Date($scope.sales[0].created_at);

                        $scope.sales.forEach(function (a) {
                            console.log(a);

                            var created = new Date(a.created_at);

                            if(created.getTime() < $scope.minDate.getTime()) $scope.minDate = created;
                            if(created.getTime() > $scope.maxDate.getTime()) $scope.maxDate = created;
                        });
                    }
                }, function (error) {
                    console.log(error);
                });
        };
        $scope.updateMonth = function (month) {
            $scope.updateSales();
        };

        $scope.updateYear = function (year) {
            $scope.updateSales();
        };

        $scope.updateOrder = function (order) {
            $scope.order = order;
            $scope.updateSales();
        };

        $scope.updateSales();
    });