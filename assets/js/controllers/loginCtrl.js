'use strict';
/**
 * controller for ng-knob
 */
app.controller('LoginCtrl', ['$rootScope', "$scope","$state",'base_url','$http', function ($rootScope, $scope, $state,base_url,$http) {
    $rootScope.$on('event:social-sign-in-success', function(event, userDetails){
        // $state.go('app.pages.user');
        console.log(userDetails);
        var loginInfo = {
            'email':userDetails.email,
            'name':userDetails.name,
            'profile_url':userDetails.imageUrl,
            'token':userDetails.uid
        }
        $http.post(base_url+'/index.php/apis/login',{loginInfo:loginInfo}).success(function(resp){
	        if(resp){
                $state.go('front.pages.user', {user_id:resp});
            }
	    }).error(function(error){
	        console.log(error);
	    });
    });
}]);