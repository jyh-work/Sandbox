pendUtilityModule.controller("pendUtilityDeviceListController", [
    "$scope", "$log", "baseService", "pendUtilitySetting",
    function ($scope, $log, service, setting, pendUtilityService) {
        $scope.devices = [];
        
        var devicePromise = service.get(deviceListUrl);
        devicePromise.then(function (response) {
            $scope.devices = response.data;
        }, service.handleError);

        $scope.featureTitle = 'Pend Utility Device List';
        $scope.gridOptions = { data: "devices" };
    }
]);
