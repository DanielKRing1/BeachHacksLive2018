/**liveApp.service('LoginService', function() {
    var user = firebase.auth().currentUser;

    console.log("hi service");

    var login = function(_userName, _password, _callback){

        firebase.auth().signInWithEmailAndPassword(_userName+"@beachlive.com", _password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          logout();
        }).then(function(){
            user = firebase.auth().currentUser;
            _callback(user);
        });
    }

    var checkLogin = function(){
        if(user){
            // Logged In
            return true;
        } else {
            return false;
        }
    }

  var logout = function(){
      firebase.auth().signOut().then(function() {
            // Sign-out successful.
            user = null;
          }, function(error) {
            // An error happened.
          }
      );
  }

  var service = {
        login               : login,
        checkLogin          : checkLogin,
        logout              : logout
    };

    return service;
});




/**$http.get('/schedule').
  success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

var month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN','JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];**/

/**liveApp.service('AngFirebase', function($window) {


    var user                = firebase.auth().currentUser;
    var schedule            = null;
    var time                = null;

    var schedule_callbacks  = [];

    var encoded_schedule_json = "";

    var updateSchedule = function(_schedule){
        console.log("update")
        var obj = {
            schedule: _schedule
        }
        firebase.database().ref("/schedule").update(obj);
    }

    var getSchedule = function(){
        return schedule;
    }

    var getEncodedSchedule = function(){
        return encoded_schedule_json;
    }

*
    var forceRefresh = function(){
        firebase.database().ref("/refresh").update({"timestamp" : Math.floor(Date.now())});
    }

    // EventListenner for when schedule changed
    // Will Trigger callback to whom ever registered
    firebase.database().ref('/schedule').on('value', function(snapshot){
        var snapshotContent = snapshot.val();
        schedule = JSON.parse(snapshotContent.schedule);
        encoded_schedule_json = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(schedule, undefined, 2));
        // Trigger callbacks
        for(var i = 0; i < schedule_callbacks.length; i++){
            schedule_callbacks[i]();
        }
    });

    // Listener for forcing refresh
    firebase.database().ref('/refresh').on('value', function(snapshot){

        if(time == null){
            time = snapshot.val();
        } else {
           $window.location.reload();
        }

    });

    var service = {
        onScheduleChange    : function(_callback){ schedule_callbacks.push(_callback)},
        updateSchedule      : updateSchedule,
        getSchedule         : getSchedule,
        getEncodedSchedule  : getEncodedSchedule,
        forceRefresh        : forceRefresh
    };

    return service;
});




function convertTime(_date){
    var date = new Date(_date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    // var time =  month[date.getMonth()] + ' ' + date.getDate() + ', ' + hours + ':' + minutes + ' ' + ampm;
    var timeStamp = {
        date: month[date.getMonth()] + ' ' + date.getDate(),
        time: hours + ':' + minutes + ' ' + ampm
    }
    // console.log(time);
    // console.log(date);
    // console.log(date.getMonth());
    return timeStamp;
}**/
