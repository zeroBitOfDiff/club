var app = angular.module("sparkdemo", []);

app.controller("FrameCtrl", ['$scope', '$http', function($scope, $http) {
  var FrameCtrlVM = this;
  FrameCtrlVM.code = "";

  FrameCtrlVM.signIn = function(code) {
    FrameCtrlVM.code = code;
    $http.get("/spark/" + FrameCtrlVM.code + ".txt").then(function(res) {
      FrameCtrlVM.device = res.data;
    });
  };
}]);

app.directive("sparkApiExecute", function($http) {
  return {
    restrict: 'E',
    scope: {
      device: '=',
      endpoint: '@',
      params: '@',
    },
    templateUrl: "/spark-execute.html",
    transclude: true,
    controller: ['$scope', function($scope) {
      $scope.properties = {
        endpoint: $scope.endpoint,
        params: $scope.params,
      };
      $scope.execute = function() {
        console.log($scope);
        $http({ method: 'POST', url: "https://api.particle.io/v1/devices/" + $scope.device.device + "/" + $scope.properties.endpoint, data: "access_token=" + $scope.device.access_token + "&params=" + $scope.properties.params, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function(res) { console.log(res) });
      };
    }],
  }
});

app.directive("sparkApiVariable", function($http) {
  return {
    restrict: 'E',
    scope: {
      device: '=',
    },
    templateUrl: "/spark-variable.html",
    link: function(scope, elem, attr) {
      scope.properties = {
        endpoint: "",
        params: "",
      };
      scope.getVariable = function() {
        $http.get("https://api.particle.io/v1/devices/" + scope.device.device + "/" + scope.properties.endpoint + "?access_token=" + scope.device.access_token).then(function(res) { console.log(res); scope.result = res.data; });
      };
    },
  }
});

app.directive("sparkApiExecuteButton", function($http) {
  return {
    restrict: 'E',
    scope: {
      device: '=',
      endpoint: '@',
      params: '@',
      text: '@',
    },
    templateUrl: "/spark-execute-button.html",
    transclude: true,
    link: function(scope) {
      scope.execute = function() {
        $http({ method: 'POST', url: "https://api.particle.io/v1/devices/" + scope.device.device + "/" + scope.endpoint, data: "access_token=" + scope.device.access_token + "&params=" + scope.params, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function(res) { console.log(res) });
      };
    },
  }
});
