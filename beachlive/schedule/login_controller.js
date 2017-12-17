// liveApp.controller('login_controller', ["$scope","AngFirebase","$state", function($scope, AngFirebase, $state){
// // liveApp.controller('admin_schedule_controller', ["$scope","$timeout","ScheduleService",function($scope,$timeout,ScheduleService){
//     /** Admin Login **/
//     $scope.checkLogin = AngFirebase.checkLogin;
//     $scope.failed = false;
//     var clicks = 0;
//     var startTime = 0;

//     $scope.login = function(){
//         // Login to Firebase
//         console.log("this is working");
//         AngFirebase.login($scope.username, $scope.password, function(user){
//             console.log("user: " + user);
//             if(user){
//                 // User is signed in.
//                 $scope.failed = false;
//                 // $('#loginModal').modal('hide')
//                 console.log("Logged In")
                
//                 // BUG...
//                 setTimeout(function(){
//                     //do what you need here
//                     console.log("going to admin announcements");
//                     $state.go("admin.announcement");
//                 }, 1000);
                
//             } else {
//                 // No user is signed in.
//                 $scope.failed = true;
//                 console.log("Failed Login");

//             }
//             // Clear  
//             // $scope.admin.user = "";
//             // $scope.admin.password = "";

//             if(!$scope.$$phase) {
//                 $scope.$apply();
//             }
//         }); 
//     };

//     $scope.displayLogin = function(_event) {
//         // console.log("StartTime: " + startTime);
//         var currentTime = Math.floor(Date.now());
//         // console.log("CurrentTime: " + currentTime);
//         if (currentTime - startTime >= 1000) {
//             clicks = 0;
//         }       
//         clicks++;
//         console.log("clickds: " + clicks);
//         if (clicks == 1) {
//             startTime = Math.floor(Date.now());
//         }
//         if (clicks == 5) {
//             // $state.go("login")
//             console.log("Showing Login!");
//             // $('#loginModal').modal('show');
//             clicks = 0;
//         }
//     };

//     $scope.logout = function(){
//         console.log("Logged out");
//         AngFirebase.logout();
//         $state.go("public.announcement");
//     };

//     $scope.logIn = function(){
//         console.log("Displaying Login");
//         $('#loginModal').modal('show'); 
//     }
// }]);
// // 'use strict';

// // angular.module('Authentication')

// // .controller('LoginController',
// //     // ['$scope', '$rootScope', '$location', 'AuthenticationService',
// //     ['$scope', '$rootScope', '$state', 'AuthenticationService',
// //     // function ($scope, $rootScope, $location, AuthenticationService) {
// //     function ($scope, $rootScope, $state, AuthenticationService) {
// //         // reset login status
// //         AuthenticationService.ClearCredentials();

// //         $scope.login = function () {
// //             $scope.dataLoading = true;
// //             AuthenticationService.Login($scope.username, $scope.password, function (response) {
// //                 if (response.success) {
// //                     AuthenticationService.SetCredentials($scope.username, $scope.password);
// //                     // $location.path('/');
// //                     $state.go('/');
// //                     // $state.go('announcement');
// //                 } else {
// //                     $scope.error = response.message;
// //                     $scope.dataLoading = false;
// //                 }
// //             });
// //         };
// //     }]);