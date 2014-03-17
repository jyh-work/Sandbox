var app = angular.module('uiTestApp', ['ngRoute', 'ngGrid'])
    .constant("appSetting", {
        "appApiBaseUrl": "http://localhost/api/"
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
    .factory("baseService", ["$http", "$log", 'appSetting', function ($http, $log, appSetting) {
        console.log('initializing baseService');
        
        var services = {};
        //services.handleError = function(response) {
        //    $log.error(response);
        //};

        var fullUrl = function(val) {
            return appSetting.appApiBaseUrl  + val;
        };
        
        services.get = function (url, config) {
            console.log('url = ' + url);
            var getUrl = fullUrl(url);
            console.log('getUrl = ' + getUrl);
            return $http.get(getUrl, config);
        };

        services.post = function (url, data, config) {
            return $http.post(fullUrl(url), data, config);
        };
        return services;
    }])
    .factory('pendUtilityService', [function (baseService) {
        console.log('initializing pendUtilityService...');

        var getDevicesUrl = 'api/Search/GetDeviceItems';

        return {
            getDeviceList: function () {
                var data = baseService.services.get(getDevicesUrl);
            }
        };
    }])
    .constant("pendUtilitySetting", {
        //"deviceListUrl": "/PendUtility/GetDevices",
        "deviceListUrl": "/Search/GetDeviceItems"
    })
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

app.controller("pendUtilityController", [
    "$scope", "$log", "baseService", "pendUtilitySetting",
    function ($scope, $log, service, setting, pendUtilityService) {
        console.log('initializing pendUtilityDeviceListController');
        $scope.devices = [];

        var devicePromise = service.get(setting.deviceListUrl);
        devicePromise.then(function (response) {
            $scope.devices = response.data;
        }, service.handleError);

        $scope.featureTitle = 'Pend Utility Device List';
        $scope.gridOptions = {
            data: "devices",
            showFilter: false,
            multiSelect: false,
            columnDefs: [
                { field: 'Name', displayName: 'Device Name'},
                { field: 'ParentName', displayName: 'Facility' },
                { field: 'OutOfService', displayName: 'Out of Service', cellClass: 'red: 5 > 1' },
                { field: 'CriticalOverride', displayName: 'Critical Override', cellClass: 'yellow' }
            ]
        };

        $scope.getBooleanCellClass = function(val) {
            return 'red';
        };
    }
]);


