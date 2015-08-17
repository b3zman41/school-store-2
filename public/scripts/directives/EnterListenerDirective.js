angular.module("EnterListener", [])
    .directive("ngEnter", function () {
        return {
            restrict: "A",

            controller: function($scope, $element, $attrs) {
                $element.bind("keydown keypress", function ($event) {
                    if(event.which === 13) {
                        $scope.$apply(function () {
                            $scope.$eval($attrs.ngEnter);
                        })
                    }
                })
            }
        }
    })