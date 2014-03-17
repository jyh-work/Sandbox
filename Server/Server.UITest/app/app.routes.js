app.config(function ($routeProvider) {

    $routeProvider
        .when("/ngGrid", {
            controller: "pendUtilityDeviceListController",
            templateUrl: "/views/pendUtility/deviceList.html"
        })
        .when("/home", {
            templateUrl: "/index.html"
        })
        .otherwise({
         redirectTo: "/home"
        });

});