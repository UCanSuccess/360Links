'use strict';
/** 
  * controller for User Profile Example
*/
app.controller('FriendCtrl', ['$rootScope', "$scope", "flowFactory","$state","$http","$stateParams",'base_url', function ($rootScope, $scope, flowFactory,$state,$http,$stateParams,base_url) {
    $scope.userInfo = {};
    $scope.my_business = [];
    $scope.endorsed_business = [];
    $scope.friends = [];
    var user_id = $stateParams.user_id;
    //test enviroment
    $scope.firstAccordionControl = {
            onExpand: function (expandedPaneIndex) {
                console.log('expanded:', expandedPaneIndex);
            },
            onCollapse: function (collapsedPaneIndex) {
                console.log('collapsed:', collapsedPaneIndex);
            }
        };
    $http.post(base_url+'/index.php/apis/getUser',{user_id:user_id}).success(function(resp){
        $scope.userInfo = {
            email: resp.email,
            name: resp.name,
            avatar: resp.profile_url
        }
        // $rootScope.user = $scope.userInfo;
    }).error(function(error){
        console.log(error);
    });

    $http.post(base_url+'/index.php/apis/getUsersFromMe',{user_id:user_id}).success(function(resp){
        for(var i in resp){
            var temp = {
                user_id:resp[i]._id,
                email: resp[i].email,
                name: resp[i].name,
                avatar: resp[i].profile_url
            }
            $scope.friends.push(temp);
        }
    }).error(function(error){
        console.log(error);
    });

    $http.post(base_url+'/index.php/apis/getUserBusiness',{user_id:user_id}).success(function(resp){
        for (var i in resp){
            var temp = {
                header: resp[i].business_name,
                content: {
                    description: resp[i].description,
                    rate: resp[i].rate
                }
            }
            $scope.my_business.push(temp);
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
    $http.post(base_url+'/index.php/apis/getEndorsedBusiness',{user_id:user_id}).success(function(resp){
        for (var i in resp){
            var index = $scope.indexOfField($scope.endorsed_business,'header',resp[i].business_name);
            if(index===-1)
            {
                var temp = {
                    header: resp[i].business_name,
                    content: [{
                        provider_id:resp[i].provider_id,
                        profile_url:resp[i].profile_url,
                        name: resp[i].name,        
                        rate: 4
                    }]
                }
                $scope.endorsed_business.push(temp);
            }else{
                var temp = {
                    provider_id:resp[i].provider_id,
                    profile_url:resp[i].profile_url,
                    name: resp[i].name,        
                    rate: 4
                }
                $scope.endorsed_business[index].content.push(temp);
            }             
        }
    }).error(function(error){
        console.log(error);
    });

    $scope.goToProfile = function(item) {
      $state.go('front.pages.provider_profile',{user_id:item.provider_id});
    }

    $scope.visitFriend = function(item) {
        $state.go('front.pages.friend_profile',{user_id:item.user_id});
    }

    $scope.goBack = function() {
        window.history.back();
    }

    // FB.api('/me/friends', function(response) {
    //     $scope.$apply(function() {
    //         $scope.myFriends = response.data;
    //         console.log($scope.myFriends);
    //     });
    // });
        
    if(!$rootScope.user){
        // $state.go('login.signin');
    }else{
        $scope.removeImage = function () {
            $scope.noImage = true;
        };
        $scope.obj = new Flow();

        $scope.userInfo = {
            name: $rootScope.user.name,
            email: $rootScope.user.email,
            avatar: $rootScope.user.imageUrl,
        };
        if ($scope.userInfo.avatar == '') {
            $scope.noImage = true;
        }
    }
}]);