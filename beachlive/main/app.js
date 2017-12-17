/** Firebase **/
console.log("hi app");
//REPLACE THIS WITH YOUR FIREBASE PROJECT (THIS ONE IS MINE)
var config = {
    apiKey: "AIzaSyBInKVQWTepYKbcvrN2zOqk2vVuJFOUP6E",
    authDomain: "roleauth.firebaseapp.com",
    databaseURL: "https://roleauth.firebaseio.com",
    projectId: "roleauth",
    storageBucket: "",
    messagingSenderId: "134934995956"
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
            // controller: 'admin_announcements_controller'
        })
        .state('public.schedule', {
            url: 'schedule',
			templateUrl: 'schedule/schedule.html',
			// controller: 'admin_schedule_controller'
        })
        

        //ADMIN
        .state('admin', {
            url: '/admin',
            templateUrl: 'admin/admin_main.html',
            controller: 'admin_controller'
        })
        .state('admin.announcements', {
            url: 'announcements',
            templateUrl: 'announcements/admin_announcements.html',
            controller: 'admin_announcements_controller'
        })        
        .state('admin.schedule', {
            url: 'schedule',
            templateUrl: 'schedule/admin_schedule.html',
            controller: 'admin_schedule_controller'
        })

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
