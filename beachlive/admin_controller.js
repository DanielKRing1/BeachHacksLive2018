liveApp.controller('admin_controller', ["$scope", "LoginService", "$state", function($scope, LoginService, $state){
	//Kicks user out if they are not logged in
	console.log("Entered admin_controller!");
	if(!LoginService.checkLogin()){
		console.log("Kicked odut");
		LoginService.logout();
		$state.go("public.announcements");
	}

	$scope.forceRefresh = function(){
		LoginService.forceRefresh();
	}
}]);