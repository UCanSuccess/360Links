'use strict';
/**
 * controller for ng-knob
 */
app.controller('BusinessCtrl', ['$rootScope', "$scope","$state","$http",'cfpLoadingBar','base_url', function ($rootScope, $scope, $state, $http,cfpLoadingBar,base_url) {
    $scope.business = [];
    if(typeof $rootScope.status===undefined||!$rootScope.status){
      $state.go('admin_login.admin_signin');
    }
    $http.post(base_url+'/index.php/apis/getBusinessList').success(function(resp){
      for(var i in resp){
          var temp = {
            business_id:resp[i]._id,
            business_name: resp[i].business_name,
            business_desc:resp[i].business_desc
          }
          $scope.business.push(temp);
        }      
      }).error(function(error){
          console.log(error);
    });

    $scope.detailRow = function(item) {
      $state.go('admin.business.detail_business',{business_id:item.business_id});
    }

    $scope.removeRow = function(item) {

    }

    $scope.addBusiness = function(busi_name, busi_desc){
      cfpLoadingBar.start();
      $http.post(base_url+'/index.php/apis/addBusiness',{business_name:busi_name, business_desc:busi_desc}).success(function(resp){
        cfpLoadingBar.complete();
        $scope.editActive = false;
        var temp = {
            business_id : resp.insert_id,
            business_name: busi_name,
            business_desc:busi_desc
        }
        $scope.business.push(temp);
      }).error(function(error){
          console.log(error);
      });
    }
}]);

