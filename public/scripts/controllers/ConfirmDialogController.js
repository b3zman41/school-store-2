angular.module('ConfirmDialog', [])
	.controller('ConfirmDialogController', ['$scope', '$mdDialog', 'title', 'message', '$sce', function ($scope, $mdDialog, title, message, $sce) {
		$scope.$mdDialog = $mdDialog;
		$scope.title = title;
		$scope.message = $sce.trustAsHtml(message);
	}]);