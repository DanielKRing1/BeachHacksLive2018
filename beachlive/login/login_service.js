liveApp.service('LoginService', function() {

    var user = firebase.auth().currentUser;

    var login = function(_userName, _password, _callback){
        firebase.auth().signInWithEmailAndPassword(_userName+"@gmail.com", _password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
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
            console.log("Not Logged In");
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
