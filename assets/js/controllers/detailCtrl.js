'use strict';
/**
 * controller for ng-knob
 */
app.controller('DetailCtrl', ['$rootScope', "$scope","$state","$http",'cfpLoadingBar','$stateParams','base_url', function ($rootScope, $scope, $state, $http,cfpLoadingBar,$stateParams,base_url) {
  var business_id = $stateParams.business_id;
  $scope.business_detail = {};
  $scope.business_temp = {};
  $scope.providers_list = [];
  $scope.out_business = [];
  $scope.added_providers = [];
  $scope.providers_temp = [];
  $scope.out_business_temp = [];
  $scope.remove_list = [];
  $scope.add_list = [];
  if(!business_id){
    window.history.back();
  }

  $http.post(base_url+'/index.php/apis/getBusinessDetail',{business_id:business_id}).success(function(resp){
      $scope.business_detail = JSON.parse(JSON.stringify(resp.business_detail));
      $scope.providers_list = JSON.parse(JSON.stringify(resp.providers_list));
      $scope.out_business = JSON.parse(JSON.stringify(resp.out_business));
      $scope.providers_temp = JSON.parse(JSON.stringify(resp.providers_list));
      $scope.out_business_temp = JSON.parse(JSON.stringify(resp.out_business));
      $scope.business_temp = JSON.parse(JSON.stringify(resp.business_detail));
  }).error(function(error){
      console.log(error);
  });

  $scope.removeProvider = function(item)
  {
   $scope.removeArray($scope.providers_list, item);
   $scope.remove_list.push(item._id);
   // $scope.out_business.push(item);
  }

  $scope.addProvider = function(item)
  {
    $scope.removeArray($scope.out_business, item);
    item.rate = 0;
    $scope.providers_list.push(item);
    $scope.add_list.push(item._id);
  }

  $scope.removeArray = function(arr, item)
  {
    var index = arr.indexOf(item);
    if(index>-1){
      arr.splice(index,1);
    }
  }      

  $scope.cancelEdit = function(){
    $scope.providers_list = JSON.parse(JSON.stringify($scope.providers_temp));
    $scope.out_business = JSON.parse(JSON.stringify($scope.out_business_temp));
    $scope.remove_list = [];
    $scope.business_detail = JSON.parse(JSON.stringify($scope.business_temp));
    $scope.editActive = false;
  }

  $scope.saveEdit = function() {
    cfpLoadingBar.start();
    $http.post(base_url+'/index.php/apis/editBusiness',{business_id:business_id, business_detail:$scope.business_detail, remove_list:$scope.remove_list, add_list:$scope.add_list}).success(function(resp){
      cfpLoadingBar.complete();
      $scope.editActive = false;
    }).error(function(error){
        console.log(error);
    });
  }

}]);

