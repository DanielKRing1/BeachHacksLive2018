liveApp.controller('mentors_controller', ["$scope","$timeout","$http","$firebaseArray",function($scope,$timeout,$http,$firebaseArray){
/* Database Display */
      $scope.tech = ['web', 'iOS', 'Android', 'VR', 'Hardware', 'Other'];
      $scope.requestInfo = {
        name : '',
        pending : '',
        requestTime : '',
        mentorKey : '',
        mentorName : '',
        acceptTime : '',
        table : '',
        technology : '',
        description : ''
      };


      var rootRef = firebase.database().ref();
      var refMentor = rootRef.child("mentors/mentorList");
      $scope.mentorList = $firebaseArray(refMentor);
      var refRequest = rootRef.child("mentors/requestList");
      $scope.requestList = $firebaseArray(refRequest);

      $scope.mentorAccept = {
        mentorObj : []
      };


       $scope.startRequest = function() {
         $scope.isRequesting = true;
       };
       
       $scope.addMentor = function(){
         if($scope.newMentor !== ''){
           var a = {};
           a.name = $scope.newMentor;
           a.available = true;
           refMentor.push(a);
           $scope.newMentor = '';
         }
       };

       $scope.setAvailability = function(key, availability) {
          $scope.mentorList[$scope.mentorList.$indexFor(key)].available = availability;
          $scope.mentorList.$save($scope.mentorList.$indexFor(key)).then(function(key) {
             //key.key === $scope.requestList[$scope.requestList.$indexFor(key)].$id; // true
           }, function(error) {
             console.log("Error:", error);
         });
          console.log(availability);
       };

       $scope.deleteMentor = function(mentorKey) {
         firebase.database().ref('mentors/mentorList/'+mentorKey).remove();
       };

       $scope.addRequest = function() {
         $scope.requestInfo.requestTime = Date.now();
         $scope.requestInfo.pending = true;

         console.log($scope.requestInfo.mentorKey);
         refRequest.push($scope.requestInfo);

         //$scope.postMentorRequestToSlack();
         $scope.requestInfo = {
           name : '',
           pending : '',
           requestTime : '',
           mentorKey : '',
           mentorName : '',
           acceptTime : '',
           table : '',
           technology : '',
           description : ''
         };
         console.log('successfully submitted request');
         $scope.isRequesting = false;
       };

       $scope.acceptRequest = function(_key,_index) {
         console.log($scope.mentorAccept.mentorObj[_index]);
         var requestIndex = $scope.requestList.$indexFor(_key);
         var mentorIndex = $scope.mentorList.$indexFor($scope.mentorAccept.mentorObj[_index].$id);
         console.log(mentorIndex);
         $scope.requestList[requestIndex].mentorKey = $scope.mentorAccept.mentorObj[_index].$id;
         $scope.requestList[requestIndex].mentorName = $scope.mentorAccept.mentorObj[_index].name;
         $scope.requestList[requestIndex].pending = false;
         $scope.requestList[requestIndex].acceptTime = Date.now();
         $scope.mentorList[mentorIndex].available = false;

         $scope.requestList.$save(requestIndex);

         $scope.mentorList.$save(mentorIndex);
       };
/**


       $scope.addRequest = function() {
         $scope.requestInfo.requestTime = Date.now();
         $scope.requestInfo.pending = true;

         console.log('request function');
         firebase.database().ref('mentors/requestList').push($scope.requestInfo);

         $scope.postMentorRequestToSlack();
         $scope.requestInfo = ""mentor;

         console.log('successfully submitted request');
       };

/**
       this.getPendingStatus = function(key) {
         firebase.database().ref('mentors/requestList/'+key);
       };
**/


       $scope.postMentorRequestToSlack = function() {
         $http({
           method: 'POST',
           url: 'https://hooks.slack.com/services/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',
           headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
           },
           data: {
             "attachments": [{
               "fallback": "The attachement isn't loading.",
               "callback_id": "mentor_request_app",
               "title": "****Mentor Request @"+$scope.requestInfo.time+'****',
               "color": "#9C1A22",
               "mrkdwn_in": ["text","fields"],
               "fields": [
                 {
                   "title": "Name",
                   "value": $scope.requestInfo.name,
                   "short": true
                 },
                 {
                   "title": "Table",
                   "value": $scope.requestInfo.table,
                   "short": true
                 },
                 {
                   "title": "Type of Tech",
                   "value": $scope.requestInfo.technology,
                   "short": true
                 },
                 {
                   "title": "Problem",
                   "value": $scope.requestInfo.description,
                   "short": false
                 }
               ],
               "actions": [
               {
                   "name": "recommend",
                   "text": "Recommend",
                   "type": "button",
                   "value": "recommend"
               },
               {
                   "name": "no",
                   "text": "No",
                   "type": "button",
                   "value": "bad"
               }
           ]
             }]
           }
         }).then(function successCallback(response) {
             // this callback will be called asynchronously
             // when the response is available
             console.log("sent to slack");
           }, function errorCallback(response) {
             // called asynchronously if an error occurs
             // or server returns response with an error status.
             console.log("failed to send to slack");
           });
    };
}]);
