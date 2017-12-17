liveApp.controller('admin_announcements_controller', ["$rootScope","$scope","$timeout","AnnouncementsService",function($rootScope,$scope,$timeout,AnnouncementsService){
		console.log("hi admin annoucement controller");
    var mostRecentAnnouncement = '';

    AnnouncementsService.updateAnnouncement(function() {
      console.log("hi callback called me");
      //console.log("ScheduleService.getSchedule()=" + ScheduleService.getSchedule());
			/**
      $scope.$apply(function() {
        $scope.announcementList = AnnouncementsService.getAnnouncementList();
      });**/

			$timeout(function () {
            $rootScope.announcementList = AnnouncementsService.getAnnouncementList();
    }, 200);

    });

    $scope.addAnnouncement = function() {
			$scope.announcement = '';
			console.log(this.announcement);
      console.log("add announcement");
			if($scope.announcement !== ''){
        var a = {};
        a.time = Date.now();
        //a.description = announcement;
				a.description = $scope.announcement;
        firebase.database().ref('announcements').push(a);

        $scope.activeNotification = true;
        mostRecentAnnouncement = getTime()+" |\n "+a.description;
				$scope.announcement = '';
    };
  };
	/**
	$scope.$watch($scope.announcementList, function() {
        alert('hey, myVar has changed!');
    });**/
		/**

		$scope.$watch("announcementList", function(newValue, oldValue) {
		     if (newValue !== oldValue) {
		       $scope.announcementList = oldValue;
		     }
		   });
**/

  function getTime() {
    date = new Date();
    var time = '';

    var min = '';
    if(date.getMinutes() < 10){
      min = '0'+date.getMinutes();
    }else {
      min = date.getMinutes();
    }

    if(date.getHours() === 12){
      time += '12:'+min+'pm';
    }else if(date.getHours() > 12){
      time += (date.getHours()%13+1)+':'+min+'pm';
    }else {
      time += date.getHours()+':'+min+'am';
    }
    //console.log(date.getMinutes());


    return time;
  };
}]);
