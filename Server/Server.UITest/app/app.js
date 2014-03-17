var app = angular.module('uiTestApp', ['ngRoute'])
    .constant("appSetting", {
        "appApiBaseUrl": "http:\\localhost\api"
    })
    .config(function ($routeProvider) {
        console.log('initializing route provider');
        $routeProvider
            .when('/home', {
                templateUrl: 'views/home.html'
            })
            .when("/ngGrid", {
                templateUrl: 'views/pendUtility/deviceList.html'
            })
            .when("/notFound", {
                templateUrl: 'notFound.html'
            })
            .otherwise({
                redirectTo: '/notFound'
            });

    })
    .factory("baseService", ["$http", "$log", function ($http, $log, appSetting) {
        console.log('initializing baseService');
        
        var services = {};
        //services.handleError = function(response) {
        //    $log.error(response);
        //};

        var fullUrl = function(val) {
            return appSetting.appApiBaseUrl + "\\" + val;
        };
        
        services.get = function (url, config) {
            return $http.get(fullUrl(url), config);
        };

        services.post = function (url, data, config) {
            return $http.post(fullUrl(url), data, config);
        };
        return services;
    }])
    .run(function ($rootScope, $route, $location) {
        console.log('running base app');
        
        $rootScope.browserIsIE = navigator.userAgent.indexOf('MSIE') > 0;
        $rootScope.browserIsChrome = navigator.userAgent.indexOf('Chrome') > 0;

        var getBrowserVersion = function(agent) {
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
            } catch(e) {
                value = e;
            }

            return value;
        };

        $rootScope.browserInfo = navigator.appName + ' ' + getBrowserVersion(navigator.userAgent);
        $rootScope.userLanguage = navigator.userLanguage;

    });

