liveApp.controller('announcements_controller', ["$scope","$timeout","$filter","$firebaseArray",function($scope,$timeout,$filter,$firebaseArray){
		console.log("hi admin annoucement controller");


		var rootRef = firebase.database().ref();
    var ref = rootRef.child("announcements");
		$scope.announcementList = $firebaseArray(ref);

    $scope.addAnnouncement = function() {
			if($scope.newAnnouncement !== ''){
						 var a = {};
						 a.time = Date.now();
						 a.description = $scope.newAnnouncement;
						 ref.push(a);
						 $scope.newAnnouncement = '';
			}
		};

}]);
