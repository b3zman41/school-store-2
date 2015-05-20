angular.module("daily", [])
    .controller("DailyController", ["$scope", "$http", "$mdDialog", "$mdToast", "$filter", function ($scope, $http, $mdDialog, $mdToast, $filter) {

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

        $http({
            url: "/items/",
            method: "GET"
        })
            .then(function (success) {
                $scope.availableItems = success.data;
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
                if($scope.daily.start[key] < 0) $scope.daily.start[key] = 0;

                if($scope.daily.start[key] !== parseInt($scope.daily.start[key])) $scope.daily.start[key] = 0;

                $scope.daily.values.start[key] = $scope.daily.start[key] * $scope.scaleOrder[key];
            }

            for(key in $scope.daily.end) {
                if($scope.daily.end[key] < 0) $scope.daily.end[key] = 0;

                if($scope.daily.end[key] !== parseInt($scope.daily.end[key])) $scope.daily.end[key] = 0;

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

        $scope.checkDecimal = function (sale) {
            sale.count = Math.round(sale.count);
        }

        $scope.periodClick = function (i) {
            $scope.selectedPeriod = i;
        }

        $scope.submit = function () {
            var data = {};
            data.start_cash = $scope.startSum();
            data.end_cash = $scope.endSum();
            data.period = $scope.selectedPeriod;
            data.start_check = 0;
            data.end_check = 0;

            $scope.soldItems = $scope.soldItems.filter(function (a) {
                console.log(a);
                return (a.count && a.item);
            })

            //Relationships
            data.sales = $scope.soldItems.map(function (a) {
                var newA = {
                    item_id: a.item.id,
                    count: a.count
                };

                return newA;
            });

            if(!data.sales) data.sales = [];

            data.presentStudents = $scope.presentStudents;

            var startSumCheck = $scope.startSum() > 0;
            var endSumCheck = $scope.endSum() > 0;

            var attendanceCheck = $scope.presentStudents.length > 0;

            console.log($scope.soldItems);

            var salesSum = $scope.soldItems.reduce(function (a, b) {
                return a + (b.item.price * b.count);
            }, 0);

            var salesSumCheck =  salesSum + $scope.startSum() === $scope.endSum();

            var errors = [];

            if(!startSumCheck) {
                errors.push("Are you sure you had no money at the beginning of the period?");
            }

            if(!endSumCheck) {
                errors.push("Are you sure you had no money at the end of the period?");
            }

            if(!attendanceCheck) {
                errors.push("You haven't checked anyone off for the attendance.")
            }

            if(!salesSumCheck) {
                var offset = ($scope.startSum() + salesSum) - $scope.endSum();
                errors.push("Funds at the Start of the Period combined with Sales are not equal to Funds at the End of the Period.");
                errors.push("Your sales are off by " + $filter('currency')(offset));
            }

            if(startSumCheck && endSumCheck && attendanceCheck && salesSumCheck) {
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
            } else
            {
                $mdDialog.show({
                    templateUrl: "/views/dialogs/dailyErrorDialog.html",
                    controller: function ($scope, $mdDialog, errors) {
                        $scope.$mdDialog = $mdDialog;
                        $scope.errors = errors;
                    },

                    locals: {
                        errors: errors
                    }
                })
            }
        };
    }]);