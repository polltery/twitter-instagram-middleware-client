/*
Author(s) : Balraj Singh Bains
Date : 14/01/2017
*/

app.controller('profile-controller', function($scope, $rootScope, $location, MiddlewareApi, $routeParams, auth, $log){
    
    // Changes the current view
    $scope.changeView = function(view){
        if(view === '/'){
            $rootScope.isOverview = true;
        }else{
            $rootScope.isOverview = false;
        }
        if(view === '/settings' || view === '/profile'){
            $location.path(view+'/'+$routeParams.username);
        }else{
            $location.path(view);
        }
    };

    // Profile page variables
    $scope.username = $routeParams.username;
    $scope.description = '';
    $scope.profilePictureUrl = '';

    $scope.profileError = false;
    $scope.profileErrorMessage  = '';

    if(!auth){
        $scope.changeView('/login');
    }else{

        // Get user details from the server
        response = MiddlewareApi.getUserDetails($scope.username, $rootScope.token);
    
        $log.debug(response);

        if(response.code === 200){

            // load user variables
            $scope.description = response.data.userDetails.details.description;
            $scope.profilePictureUrl = response.data.userDetails.details.profilePictureUrl;

        }else{

            $scope.profileErrorMessage = response.error;

        }

    }

});