var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/insert", {
            templateUrl: "insert.html",
            controller: "insertController"
        }).when("/search", {
            templateUrl: "search.html",
            controller: "searchController"
        }).otherwise({
            templateUrl: "showAll.html",
            controller: "myController"
        });
});

app.controller("myController", function ($scope, $http) {
    $http.get("/user").then(function (response) {
        $scope.users = response.data;
        // console.log($scope.users);
    });
});


app.controller("insertController", function ($scope, $http) {
    $scope.insertUser = function () {
        $http({
            method: "post",
            url: "/user",
            data: $scope.user,
            headers: {
                "content-type": "application/json"
            }
        }).then(function (response) {
            if (response.data == "success") {
                alert("Data is inserted");
            }
        });
    }
});


app.controller("searchController", function ($scope, $http) {
    $scope.fill = function () {
        $http.get("/search/" + $scope.user.id).then(function (response) {
            $scope.user = JSON.parse(JSON.stringify(response.data[0]));
            // console.log($scope.user);
        });
    }
});