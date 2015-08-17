angular.module("DialogService", [])
	.factory("DialogService", function($mdDialog) {
		var DialogService = {};

		DialogService.showConfirmDialog = function(title, message, $event) {
			return $mdDialog.show({
				templateUrl: "views/dialogs/confirmDialog.html",
				controller: "ConfirmDialogController",
				targetEvent: $event,

				locals : {
					"title" : title,
					"message": message
				}
			});
		};

		DialogService.showLoginDialog = function($event) {
			return $mdDialog.show({
				templateUrl: "views/dialogs/loginDialog.html",
				controller: "LoginDialogController",
				targetEvent: $event
			});
		};

        DialogService.newPostDialog = function ($event) {
            return $mdDialog.show({
                templateUrl: "views/dialogs/newPostDialog.html",
                controller: "BlogDialogController",
                targetEvent: $event
            });
        };

        DialogService.addNewItemDialog = function ($event) {
            return $mdDialog.show({
                templateUrl: "views/dialogs/addNewItemDialog.html",
                controller: "NewItemDialogController",
                targetEvent: $event
            });
        };

        DialogService.editItemDialog = function (item, $event) {
            return $mdDialog.show({
                templateUrl: "views/dialogs/addNewItemDialog.html",
                controller: "EditItemDialogController",
                targetEvent: $event,

                locals: {
                    item: item
                }
            });
        };

        DialogService.addNewStudentDialog = function ($event) {
            return $mdDialog.show({
                templateUrl: "views/dialogs/addNewStudentDialog.html",
                controller: "NewStudentDialogController",
                targetEvent: $event
            });
        };

        DialogService.editStudentDialog = function (student, $event) {
            return $mdDialog.show({
                templateUrl: "views/dialogs/addNewStudentDialog.html",
                controller: "EditStudentDialogController",
                targetEvent: $event,

                locals: {
                    student: student
                }
            });
        };

		return DialogService;
	});