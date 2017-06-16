'use strict';
/**
 * controller for ng-knob
 */
app.controller('VerifyCtrl', ['$rootScope', "$scope","$state","$http",'cfpLoadingBar','base_url', function ($rootScope, $scope, $state, $http,cfpLoadingBar, base_url) {
    $scope.verify_list = [];

    $http.post('http://localhost/index.php/apis/getVerifyList').success(function(resp){
      for(var i in resp){
          $scope.verify_list.push(resp[i]);
        }      
      }).error(function(error){
          console.log(error);
    });

    $scope.detailRow = function(item) {
      $state.go('admin.business.verify_detail',{verify_id:item._id});
    }

}]);

