'use strict';
/** 
  * controller for User Profile Example
*/
app.controller('UserCtrl', ['$rootScope', "$scope", "flowFactory","$state","$http","$stateParams", 'FileUploader','base_url',function ($rootScope, $scope, flowFactory,$state,$http,$stateParams,FileUploader,base_url) {
    $scope.userInfo = {};
    $scope.business = [];
    $scope.my_business = [];
    $scope.endorsed_business = [];
    $scope.friends = [];
    $scope.providers = [];
    var user_id = $stateParams['user_id'];
    if($rootScope.user!==undefined&&$rootScope.user!=0){
        user_id = $rootScope.user.user_id;
    }
    // user_id = 6;
    if(user_id==0){
        $state.go('login.signin');
    }
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
            user_id:resp._id,
            email: resp.email,
            name: resp.name,
            avatar: resp.profile_url,
            privileage:resp.privileage
        }
        console.log($scope.userInfo);
        $rootScope.user = $scope.userInfo;
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

    $http.post(base_url+'/index.php/apis/getUsersFromMe',{user_id:user_id}).success(function(resp){
        for(var i in resp){
            var temp = {
                user_id:resp[i]._id,
                email: resp[i].email,
                name: resp[i].name,
                avatar: resp[i].profile_url
            }
            $scope.providers.push(temp);
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
        console.log(resp);
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
                        rate: resp[i].rate
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
    // FB.api('/me/friends', function(response) {
    //     $scope.$apply(function() {
    //         $scope.myFriends = response.data;
    //         console.log($scope.myFriends);
    //     });
    // });

    //Verify Tab

    
    $scope.selectProvider = function(provider)
    {
        $http.post(base_url+'/index.php/apis/getUserBusiness',{user_id:provider['user_id']}).success(function(resp){
        $scope.business = [];
        for(var i in resp){
            var temp = {
              business_id:resp[i]._id,
              name: resp[i].business_name
            }
            $scope.business.push(temp);
        }
        console.log($scope.business);      
      }).error(function(error){
          console.log(error);
      });
    }

    var uploaderImages = $scope.uploaderImages = new FileUploader({
        url: 'upload.php'
    });

    // FILTERS

    uploaderImages.filters.push({
        name: 'imageFilter',
        fn: function (item/*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    // CALLBACKS

    uploaderImages.onWhenAddingFileFailed = function (item/*{File|FileLikeObject}*/, filter, options) {
        // console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploaderImages.onAfterAddingFile = function (fileItem) {
        // if(uploaderImages.queue.length>1){
        //     var temp = uploaderImages.queue[1];
        //     uploaderImages.queue[0] = temp;
        //     uploaderImages.queue[1].remove();
        // }
        console.log(uploaderImages);
        // console.info('onAfterAddingFile', fileItem);
    };
    uploaderImages.onAfterAddingAll = function (addedFileItems) {
        // console.info('onAfterAddingAll', addedFileItems);
        if (uploaderImages.getNotUploadedItems().length > 1)
        {
            uploaderImages.removeFromQueue(0);
        }
    };
    uploaderImages.onBeforeUploadItem = function (item) {
        // console.info('onBeforeUploadItem', item);
    };
    uploaderImages.onProgressItem = function (fileItem, progress) {
        // console.info('onProgressItem', fileItem, progress);
    };
    uploaderImages.onProgressAll = function (progress) {
        // console.info('onProgressAll', progress);
    };
    uploaderImages.onSuccessItem = function (fileItem, response, status, headers) {
        // console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploaderImages.onErrorItem = function (fileItem, response, status, headers) {
        // console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploaderImages.onCancelItem = function (fileItem, response, status, headers) {
        // console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploaderImages.onCompleteItem = function (fileItem, response, status, headers) {
        // console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploaderImages.onCompleteAll = function () {
        // console.info('onCompleteAll');
    };


    console.info('uploader', uploaderImages);
        
}]);