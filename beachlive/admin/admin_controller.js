/**liveApp.controller('login_controller', function($scope, LoginService, $state, $rootScope){

	$scope.checkLogin = LoginService.checkLogin;
	$scope.failed = false;

	$scope.login = function(_userName, _password){
		LoginService.login(_userName, _password, function(user){
			if(user){

                $scope.failed = false;
                $('#loginModal').modal('hide')
				console.log("Logged In")

				// BUG...
				setTimeout(function(){
				    //do what you need here
					$state.go("admin.announcement")
				}, 1000);

            } else {
                // No user is signed in.
	            $scope.failed = true;
	         	console.log("Failed Login");

            }
            // Clear
			$scope.admin.user = "";
			$scope.admin.password = "";

			if(!$scope.$$phase) {
				$scope.$apply();
			}
		});
	};

	$scope.logout = function(){
		LoginService.logout();
		$state.go("public.announcements");
	};


});**/
