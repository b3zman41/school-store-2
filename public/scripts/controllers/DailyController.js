angular.module("daily", [])
    .controller("DailyController", ["$scope", "$http", "$mdDialog", "$mdToast", function ($scope, $http, $mdDialog, $mdToast) {

        $scope.presentStudents = [];
        $scope.daily = {
            start: {},
            end: {},
            values: {
                start: {},
                end: {}
            }
        };

        $scope.scaleOrder = {
            ones: 1,
            fives: 5,
            tens: 10,
            twenties: 20,
            pennies: 0.01,
            nickels: 0.05,
            dimes: 0.1,
            quarters: 0.25,
            check: 1.0
        };

        $scope.soldItems = [];

        $http({
            url: "/student/periods",
            method: "GET"
        })
            .then(function (success) {
                $scope.periods = success.data;
                console.log($scope.periods);
            }, angular.noop);

        $scope.$watch("daily.period", function (newVal, oldVal) {
            if(newVal !== oldVal) {
                $scope.presentStudents = [];
            }
        });

        $scope.studentSelectionChange = function (student) {
            if($scope.presentStudents.indexOf(student) > -1)
            {
                $scope.presentStudents.splice($scope.presentStudents.indexOf(student), 1);
            } else
            {
                $scope.presentStudents.push(student);
            }
            
            console.log($scope.presentStudents);
        };

        $scope.updateValues = function () {
            var key;

            for(key in $scope.daily.start) {
                $scope.daily.values.start[key] = $scope.daily.start[key] * $scope.scaleOrder[key];
            }

            for(key in $scope.daily.end) {
                $scope.daily.values.end[key] = $scope.daily.end[key] * $scope.scaleOrder[key];
            }
        };

        $scope.startSum = function () {
            var returnValue = 0.0;

            for(var key in $scope.daily.start) {
                returnValue += $scope.daily.start[key] * $scope.scaleOrder[key];
            }

            return returnValue;
        };

        $scope.endSum = function () {
            var returnValue = 0.0;

            for(var key in $scope.daily.end) {
                returnValue += $scope.daily.end[key] * $scope.scaleOrder[key];
            }

            return returnValue;
        };

        $scope.arrayLength = function (length) {
            var array = [];

            for(var i = 0; i < length; i++)
            {
                array.push(i);
            }

            return array;
        };

        $scope.submit = function () {
            var data = {};
            data.start_cash = $scope.startSum();
            data.end_cash = $scope.endSum();
            data.period = $scope.daily.period;
            data.start_check = 0;
            data.end_check = 0;

            //Relationships
            data.sales = $scope.soldItems.map(function (a) {
                var newA = {
                    item_id: a.item.id,
                    count: a.itemCount
                };

                return newA;
            });

            data.presentStudents = $scope.presentStudents;

            $http({
                url: "/daily/create",
                method: "POST",
                data: data,
                headers: {'Content-Type': 'application/json'}
            })
                .then(function (success) {
                    console.log(success);
                }, function (error) {
                    console.log(error);
                });
        };
    }]);