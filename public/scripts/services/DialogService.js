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
        }

		return DialogService;
	});