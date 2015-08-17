/**
 * Created by Terence on 3/21/2015.
 */
angular.module("blog-service", [])
    .factory("BlogService", ["$http", function ($http) {
        var BlogService = {};

        BlogService.post = function (text, success, error) {
            $http({
                method: "POST",
                url: "/blog/post",
                params: {text: text}
            }).then(success, error);
        };

        BlogService.delete = function (post) {
            return $http({
                method: "DELETE",
                url: "/blog/" + post.id
            })
        };

        return BlogService;
    }]);