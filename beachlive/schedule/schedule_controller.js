liveApp.controller('schedule_controller', ["$rootScope","$scope","$timeout","ScheduleService",function($rootScope,$scope,$timeout,ScheduleService){

			ScheduleService.updateSchedule(function() {
				console.log("hi callback called me");
				//console.log("ScheduleService.getSchedule()=" + ScheduleService.getSchedule());
				$scope.$apply(function() {
					$rootScope.schedule = ScheduleService.getSchedule();
				});
				console.log("outside admin" + $rootScope.schedule);
				//console.log($scope.schedule);
			});

		$scope.uploadFile = function() {
			console.log("upload");
			var f = document.getElementById('file').files[0],
	      	r = new FileReader();

			r.onload = (function (f) {
			return function (e) {
					json = JSON.parse(e.target.result);
					console.log(JSON.stringify(json));
					firebase.database().ref('schedule/').set(JSON.stringify(json));
			}
			})(f);
			r.readAsText(f);
		};
}]);
