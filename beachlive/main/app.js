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
					controller: 'admin_announcements_controller'
        })
        .state('public.schedule', {
          url: 'schedule',
					templateUrl: 'schedule/schedule_admin.html',
					controller: 'admin_schedule_controller'
        })
				/**
				.state('admin', {
            url: '/admin',
						templateUrl: 'main/main.html',
						controller: 'admin/login_controller'
        })
				.state('admin.announcements', {
          url: '/admin/announcements',
					templateUrl: 'announcements/announcements.html',
					controller: 'admin_announcements_controller'
        })
				.state('admin.schedule', {
          url: '/admin/schedule',
					templateUrl: 'schedule/schedule_admin.html',
					controller: 'admin_schedule_controller'
        })**/
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit
        });

});

liveApp.filter('customReverse', function() {
	return function(items) {

		if (items == undefined){
        items = [];
				return items;
		}
		return items.slice().reverse();
	};

});
