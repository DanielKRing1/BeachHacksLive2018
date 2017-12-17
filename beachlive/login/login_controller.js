liveApp.controller('login_controller', ["$scope", "LoginService", "$state", function($scope, LoginService, $state){

    /** Admin Login **/
    $scope.checkLogin = LoginService.checkLogin;
    $scope.error = false;

    var clicks = 0;
    var startTime = 0;

    $scope.login = function(username, password){
        // Login to Firebase
        LoginService.login(username, password, function(user){
            if(user){
                // User is signed in.
                $scope.error = false;
                $('#loginModal').modal('hide')
                console.log("Logged In")
                console.log("going to admin announcements");
                $state.go("admin.announcements");
                
            } else {
                // No user is signed in.
                $scope.error = true;
                console.log("Failed Login");
            }
            // Clear  
            // $scope.username = "";
            // $scope.password = "";

            if(!$scope.$$phase) {
                $scope.$apply();
            }
        }); 
    };

    $scope.displayLogin = function(_event) {
        var currentTime = Math.floor(Date.now());
        if (currentTime - startTime >= 1000) {
            clicks = 0;
        }       
        clicks++;
        console.log("clicks: " + clicks);
        if (clicks == 1) {
            startTime = Math.floor(Date.now());
        }
        if (clicks == 5) {
            $('#loginModal').modal('show');
            clicks = 0;
        }
    };

    $scope.logout = function(){
        console.log("Logged out");
        LoginService.logout();
        $state.go("public.announcements");
    };
}]);