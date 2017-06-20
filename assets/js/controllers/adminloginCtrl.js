'use strict';
/**
 * controller for ng-knob
 */
app.controller('AdminLoginCtrl', ['$rootScope', "$scope","$state",'base_url','$http', function ($rootScope, $scope, $state,base_url,$http) {
    if($rootScope.status){
        $state.go('admin.business.index');
    }
    $scope.checkAdmin = function(arg1, arg2){
        $http.post(base_url+'/index.php/apis/admin_login',{user_name:arg1,password:arg2}).success(function(resp){
            if(resp.status){
                $rootScope.status = true;
                $scope.failed = true;
                $state.go('admin.business.index');
            }else{
                $scope.failed = true;
            }
        }).error(function(error){
            console.log(error);
        });
    }
}]);