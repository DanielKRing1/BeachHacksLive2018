liveApp.controller('admin_schedule_controller', ["$scope","$timeout","ScheduleService",function($scope,$timeout,ScheduleService){
		console.log("hi admin controller");
		//$scope.schedule = ScheduleService.getSchedule();
		//$scope.schedule = ScheduleService.getSchedule();
		//console.log($scope.schedule);
		/**$scope.schedule = ScheduleService.getSchedule();
		//console.log($scope.schedule);        /**$.getJSON("http://localhost:8000/Desktop/websitetest/schedule.json", function(json) {
		    	console.log(JSON.stringify(json)); // this will show the info it in firebug console
**/
		// this waits for the data to load and then logs the output. Therefore,
		// data from the server will now appear in the logged output. Use this with care!
		/**ScheduleService.updateSchedule(function() {
			//console.log("hi admin update");
			$scope.$apply(function() {
				$scope.schedule = ScheduleService.getSchedule();
			});
		});**/

			ScheduleService.updateSchedule(function() {
				console.log("hi callback called me");
				//console.log("ScheduleService.getSchedule()=" + ScheduleService.getSchedule());
				$scope.$apply(function() {
					$scope.schedule = ScheduleService.getSchedule();
				});
				//console.log($scope.schedule);
			});
	  //ScheduleService.addScheduleCallback(updateSchedule);

		console.log("outside admin" + $scope.schedule);


		$scope.uploadFile = function() {
			console.log("upload");
			var f = document.getElementById('file').files[0],
	      	r = new FileReader();

	    	//console.log(JSON.stringify(json)); // this will show the info it in firebug console
			//console.log(r.readAsBinaryString(f));

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
