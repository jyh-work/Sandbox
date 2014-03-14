var app = angular.module('uiTestApp', ['ngRoute'])
    .run(function ($rootScope, $route, $location) {
        $rootScope.browserIsIE = navigator.userAgent.indexOf('MSIE') > 0;
        $rootScope.browserIsChrome = navigator.userAgent.indexOf('Chrome') > 0;
        
        var getBrowserVersion = function (agent) {
            var value = '';
            try {
                if ($rootScope.browserIsIE == true) {
                    value = agent.substring(agent.indexOf('MSIE'), agent.length);
                    value = value.substring(5, value.indexOf(';'));
                } else if ($rootScope.browserIsChrome == true) {
                    value = agent.substring(agent.indexOf('Chrome'), agent.length);
                    value = value.substring(0, value.indexOf(' '));
                } else {
                    value = agent.substring(0, value.indexOf(' '));
                }
            } catch (e) {
                value = e;
            }
           
            return value;
        };
        
        $rootScope.browserInfo = navigator.appName + ' ' + getBrowserVersion(navigator.userAgent);
        $rootScope.userLanguage = navigator.userLanguage;

    });

app.config(function ($routeProvider) {

    $routeProvider
        .when("/directives", {
            controller: "placesExplorerController",
            templateUrl: "/app/views/placesresults.html"
        });
    $routeProvider.otherwise({ redirectTo: "/explore" });

});