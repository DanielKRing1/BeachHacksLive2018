liveApp.service('ScheduleService', function() {
    var schedule = null;
    var schedule_callbacks = [];

    var getSchedule = function () {
       return schedule;
     }

    firebase.database().ref('/schedule').on("value", function(snapshot) {
      schedule = JSON.parse(snapshot.val());
      //console.log(schedule);
      for (var i = 0; i < schedule_callbacks.length; i++)
      {
          schedule_callbacks[i]();
      }
    });

    var service = {getSchedule: getSchedule,
                   updateSchedule: function(_callback){schedule_callbacks.push(_callback)}};
    return service;
});
