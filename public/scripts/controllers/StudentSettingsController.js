angular.module("StudentSettings", [])
    .controller("StudentSettingsController", function ($scope, $http, DialogService) {

        $http({
            url: "/student/",
            method: "GET"
        })
            .then(function (success) {
                $scope.students = success.data;
            }, function (error) {
                console.log(error);
            });

        $scope.addStudent = function ($event) {
            DialogService.addNewStudentDialog($event)
                .then(function (student) {
                    $http.post("/student/create", student)
                        .then(function (success) {
                            location.reload();
                        }, function (error) {
                            console.log(error);
                        });
                }, angular.noop);
        };

        $scope.editStudent = function (student, $event) {
            DialogService.editStudentDialog(student, $event)
                .then(function (student) {
                    $http.post("/student/" + student.id + "/edit", student)
                        .then(function (success) {
                            location.reload();
                        }, function (error) {
                            console.log(error);
                        });
                }, angular.noop);
        };

        $scope.deleteStudent = function (student, $event) {
            DialogService.showConfirmDialog("Confirmation", "Are you sure you would like to remove " + student.name + "?", $event)
                .then(function (success) {
                    $http.post('/student/' + student.id + '/delete')
                        .then(function () {
                            location.reload();
                        }, angular.noop);
                }, angular.noop);
        }

    })
    .controller("NewStudentDialogController", function ($scope, $mdDialog) {

        $scope.$mdDialog = $mdDialog;

    })
    .controller("EditStudentDialogController", function ($scope, student, $mdDialog) {

        $scope.$mdDialog = $mdDialog;
        $scope.student = student;

    });
