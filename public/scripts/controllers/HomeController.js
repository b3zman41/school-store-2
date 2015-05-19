/**
 * Created by Terence on 3/20/2015.
 */
 angular.module("home", ["ngMaterial"])
 .controller("HomeController", ["$scope", "$mdDialog", "AuthService", "$mdToast", "$http", "DialogService", function($scope, $mdDialog, AuthService, $mdToast, $http, DialogService){
    $scope.AuthService = AuthService;
    $scope.DialogService = DialogService;

    $scope.updateBlog = function () {
        $http({
            url: "/blog/",
            method: "GET"
        })
        .then(function (success) {
            $scope.posts = success.data;
        }, angular.noop);
    };

    $scope.showNewBlogDialog = function () {
        $mdDialog.show({
            templateUrl: "/views/dialogs/newPostDialog.html",
            controller: "BlogDialogController"
        })
        .then(function (success) {
            $mdToast.show($mdToast.simple().content("Successfully saved blog"));
        }, function (error) {
            if(error) {
                $mdToast.show($mdToast.simple().content("Could not save blog post"));
            }
        });
    };

    $scope.deleteBlogPost = function(post, $event) {
        DialogService.showConfirmDialog('Delete Post', 'Are you sure you would like to delete the post labeled <strong>' + post.title + '</strong>', $event)
        .then(function() {
            $http({
                url: "/blog/" + post.id + "/delete",
                method: "GET"
            })
            .then(function(success) {
                $mdToast.show($mdToast.simple().content("Successfully deleted post labeled " + post.title));
                $scope.updateBlog();
            }, function(error) {
                console.log(error);
            });
        }, function() {
        });
    };

    $scope.updateBlog();
}]);