'use strict';
/**
 * controller for ng-knob
 */
app.controller('VerifyDetailCtrl', ['$rootScope', "$scope","$state","$http",'cfpLoadingBar','base_url','$stateParams', function ($rootScope, $scope, $state, $http,cfpLoadingBar, base_url,$stateParams) {
    $scope.verify_list = [];
    $scope.verify_detail = null;
    var verify_id = $stateParams['verify_id'];
    console.log(verify_id);
    $http.post(base_url+'/index.php/apis/getVerifyDetail', {verify_id:verify_id}).success(function(resp){ 
      $scope.verify_detail = resp;
      }).error(function(error){
          console.log(error);
    });

    $scope.verify = function(rate){
      $http.post(base_url+'/index.php/apis/updateVerify', {verify_id:verify_id, rate:rate}).success(function(resp){ 
          $state.go('admin.business.verify');
        }).error(function(error){
            console.log(error);
      });
    }
}]);

