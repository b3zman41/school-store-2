angular.module("SemanticDropdown", [])
    .directive("dropdown", function () {
        return {
            restrict: "C",

            controller: function ($element) {
                $($element).dropdown();
            }
        }
    })