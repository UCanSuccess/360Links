'use strict';
/**
 * controller for ng-knob
 */
app.controller('providerCtrl', ['$rootScope', "$scope","$state","$http",'$stateParams','cfpLoadingBar','base_url', 'SweetAlert', function ($rootScope, $scope, $state, $http,$stateParams,cfpLoadingBar,base_url,SweetAlert) {
  $scope.userInfo = {};
  $scope.my_business = [];
  $scope.endorsed_business = [];
  var user_id = $stateParams.user_id;
  //business select box
  if(user_id){
    //get Provider Information
    $http.post(base_url+'/index.php/apis/getUser',{user_id:user_id}).success(function(resp){
        $scope.userInfo = {
            email: resp.email,
            name: resp.name,
            avatar: resp.profile_url
        }
    }).error(function(error){
        console.log(error);
    });

    //get Provider's business information
    $http.post(base_url+'/index.php/apis/getUserBusiness',{user_id:user_id}).success(function(resp){
        for (var i in resp){
            var endorseflag = false;
            var temp = {
                header: resp[i].business_name,
                content: {
                    business_id : resp[i].business_id,
                    description: resp[i].description,
                    rate: resp[i].rate,
                    flag: endorseflag
                }
            }
            $scope.my_business.push(temp);
        }
        for(var i in $scope.my_business){
        $http.post(base_url+'/index.php/apis/checkEndorse',{endorser_id:$rootScope.user.user_id,provider_id:user_id, business_id:$scope.my_business[i].content.business_id}).success(function(resp){
                if(resp.status=='duplicated'){
                    $scope.my_business[i].content.flag = true; }
                }).error(function(error){
                    console.log(error);
            });
        }
    }).error(function(error){
        console.log(error);
    });
    $scope.indexOfField = function(arrayVal, propertyName,value){
        for (var i = 0; i < arrayVal.length; i++){
            if (arrayVal[i][propertyName] == value)
                return i;
        }
        return -1;
    }

    //get Provider's endorsed business information
    $http.post(base_url+'/index.php/apis/getEndorsedBusiness',{user_id:user_id}).success(function(resp){
        for (var i in resp){
            var index = $scope.indexOfField($scope.endorsed_business,'header',resp[i].business_name);
            if(index===-1)
            {
                var temp = {
                    header: resp[i].business_name,
                    content: [{
                        profile_url:resp[i].profile_url,
                        name: resp[i].name,        
                        rate: resp[i].rate
                    }]
                }
                $scope.endorsed_business.push(temp);
            }else{
                var temp = {
                    profile_url:resp[i].profile_url,
                    name: resp[i].name,        
                    rate: resp[i].rate
                }
                $scope.endorsed_business[index].content.push(temp);
            }             
        }
    }).error(function(error){
        console.log(error);
    });

    $scope.endorseBusiness = function(business){
        console.log($rootScope.user);
      $http.post(base_url+'/index.php/apis/endorseBusiness',{endorser_id:$rootScope.user.user_id,provider_id:user_id, business_id:business.business_id}).success(function(resp){
        if(resp.status=='success'){
            SweetAlert.swal({
                title: "Good job!",
                text: "You have endorsed successfully!",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
        }else{
            SweetAlert.swal({
                title: "Warning!",
                text: "You have already endorsed!",
                type: "warning",
                confirmButtonColor: "#007AFF"
            });
        }
        }).error(function(error){
            console.log(error);
        });
    }

  }else{
    window.history.back();
  }  
}]);

