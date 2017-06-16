'use strict';
/**
 * controller for ng-knob
 */
app.controller('EndorseCtrl', ['$rootScope', "$scope","$state","$http",'cfpLoadingBar','base_url', function ($rootScope, $scope, $state, $http,cfpLoadingBar,base_url) {
  $scope.business = [];
  $scope.people = [];
  //business select box
  $http.post(base_url+'/index.php/apis/getBusinessList').success(function(resp){
      for(var i in resp){
        var temp = {
          business_id:resp[i]._id,
          name: resp[i].business_name
        }
        $scope.business.push(temp);
      }      
  }).error(function(error){
      console.log(error);
  });

    $scope.searchBusiness = function(busi){
      cfpLoadingBar.start();
      $http.post(base_url+'/index.php/apis/searchResult',{user_id:6, business_id:busi.business_id}).success(function(resp){
        $scope.people = [];
          for(var i in resp){
            var temp = {
              provider_id:resp[i].user_id,
              profile_url:resp[i].profile_url,
              name: resp[i].name
            }

            $scope.people.push(temp);
          }
          cfpLoadingBar.complete();
      }).error(function(error){
          console.log(error);
      });
    	
    }

    $scope.goToProfile = function(item) {
      $state.go('front.pages.provider_profile',{user_id:item.provider_id});
    }
}]);

