liveApp.controller('announcements_controller', ["$scope","$timeout","$filter","$firebaseArray",function($scope,$timeout,$filter,$firebaseArray){
		console.log("hi admin annoucement controller");


		var rootRef = firebase.database().ref();
    var ref = rootRef.child("announcements");
		$scope.announcementList = $firebaseArray(ref);
		$scope.announcementList.$loaded(
			function(data) {
				annCount = data.length;
				setInterval(checkForNewAnn, 1000);
			});

		var annCount;


    $scope.addAnnouncement = function() {
			if($scope.newAnnouncement !== ''){
						 var a = {};
						 a.time = Date.now();
						 a.description = $scope.newAnnouncement;
						 ref.push(a);
						 $scope.newAnnouncement = '';
			}
		};


		// Notification display
		function checkForNewAnn(){
			if(annCount < $scope.announcementList.length){
				annCount = $scope.announcementList.length;
				newestAnn = $scope.announcementList.length-1;
				displayNotification($scope.announcementList[newestAnn]);
			}
		};

		function displayNotification(a){

			if(Notification.permission === 'granted'){
				navigator.serviceWorker.getRegistration().then(function(reg){

					var body = $filter('date')(a.time, 'h:mma')+" | "+a.description;

					reg.showNotification('BeachHacks 2018', {
							icon: 'https://i.imgur.com/yHASg5C.png',
							body: body,
							vibrate: [100, 50, 100],
					actions: [
						{action: 'close', title: 'Close notification'}
					]});
				});
			}
		};

}]);
