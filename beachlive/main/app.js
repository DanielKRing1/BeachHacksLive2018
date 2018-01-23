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
