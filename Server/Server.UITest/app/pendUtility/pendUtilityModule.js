(function () {
    console.log('pendUtilityModule.js');
    
    angular.module("pendUtilityModule", ["ngGrid", "baseModule"])
    .constant("pendUtilitySetting", {
        "deviceListUrl": "/PendUtility/GetDevices"
    })
    .factory('pendUtilityService', [function (baseService) {
        console.log('initializing pendUtilityService...');

        var getDevicesUrl = 'api/Search/GetDeviceItems';

        return {
            getDeviceList: function () {
                var data = baseService.services.get(getDevicesUrl);
            }
        };
    }])
    .controller("pendUtilityController", [
    "$scope", "$log", "baseService", "pendUtilitySetting",
        function ($scope, $log, service, setting, pendUtilityService) {
            console.log('initializing pendUtilityDeviceListController');
            $scope.devices = [];

            var devicePromise = service.get(deviceListUrl);
            devicePromise.then(function (response) {
                $scope.devices = response.data;
            }, service.handleError);

            $scope.featureTitle = 'Pend Utility Device List';
            $scope.gridOptions = { data: "devices" };
        }
    ])
    .run(function ($rootScope) {
        console.log('running pendUtilityModule');
    });
});


