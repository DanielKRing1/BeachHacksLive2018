/** Firebase **/
console.log("hi app");
//REPLACE THIS WITH YOUR FIREBASE PROJECT (THIS ONE IS MINE)
var config = {
  apiKey: "AIzaSyAif6z5dFWTN2KdRgT60e6fkczE9qC2-Gw",
  authDomain: "angulardemo-17478.firebaseapp.com",
  databaseURL: "https://angulardemo-17478.firebaseio.com",
  projectId: "angulardemo-17478",
  storageBucket: "angulardemo-17478.appspot.com",
  messagingSenderId: "449211195314"
  };
firebase.initializeApp(config);

var liveApp = angular.module('myApp', ['ui.router','firebase']);

liveApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/announcements');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('public', {
            url: '/',
      			templateUrl: 'main/main.html'
        })
      	.state('public.announcements', {
            url: 'announcements',
            templateUrl: 'announcements/announcements.html',
            controller: 'announcements_controller'
        })
        .state('public.schedule', {
            url: 'schedule',
      			templateUrl: 'schedule/schedule.html',
      			controller: 'schedule_controller'
        })
        .state('public.mentors', {
            url: 'mentors',
      			templateUrl: 'mentors/mentors.html',
      			controller: 'mentors_controller'
        })


        //ADMIN
        .state('admin', {
            url: '/admin',
            templateUrl: 'main/main.html',
            controller: 'admin_controller'
        })
        .state('admin.announcements', {
            url: 'announcements',
            templateUrl: 'announcements/admin_announcements.html',
            controller: 'announcements_controller'
        })
        .state('admin.schedule', {
            url: 'schedule',
            templateUrl: 'schedule/admin_schedule.html',
            controller: 'schedule_controller'
        })
        .state('admin.mentors', {
            url: 'mentors',
      			templateUrl: 'mentors/admin_mentors.html',
      			controller: 'mentors_controller'
        })
});

liveApp.controller('notif-ctrl', ["$scope","$filter","$firebaseArray", function($scope,$filter,$firebaseArray){
  // Check if NOTIFICATION API supported
  if ("Notification" in window) {
    // Get PERMISSION to display Notifications
    Notification.requestPermission().then(function(status){
      //console.log('Notification permission status: ', status);
    });
  }else{
    console.warn('This browser does not support Notifiation API')
  }

  // Check if PUSH API supported
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      // REGISTER Service Worker
      navigator.serviceWorker.register('sw.js').then(function(reg) {
        // console.log('ServiceWorker registration successful: ', reg);
      }, function(err) {
        // console.log('ServiceWorker registration failed: ', err);
      });
    });
  }else{
    console.warn('This browser does not have a registered Service Worker');
  }
  var rootRef = firebase.database().ref();
  var ref = rootRef.child("announcements");
  $scope.announcementList = $firebaseArray(ref);

  $scope.announcementList.$loaded(
    function(data) {
      $scope.announcementList.$watch(function(e) {
        if(e.event == 'child_added'){
          var newestAnn = $scope.announcementList.length-1;

          displayNotification($scope.announcementList[newestAnn]);
        }
      });
    });

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
            ]
          });
        });
      }
    };
}]);
