
/** Firebase **/
console.log("hi app");
var config = {
		apiKey: "AIzaSyAif6z5dFWTN2KdRgT60e6fkczE9qC2-Gw",
		authDomain: "angulardemo-17478.firebaseapp.com",
		databaseURL: "https://angulardemo-17478.firebaseio.com",
		storageBucket: "angulardemo-17478.appspot.com",
		messagingSenderId: "449211195314"
	};
firebase.initializeApp(config);

var liveApp = angular.module('myApp', ['ui.router','firebase']);

liveApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
						templateUrl: 'main/main.html'
        })
				.state('home.annoucements', {
          url: '/annoucements',
					templateUrl: 'annoucements/announcements.html'
        })
        .state('home.schedule', {
          url: '/schedule',
					templateUrl: 'schedule/schedule.html',
					controller: 'admin_schedule_controller'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit
        });

});
