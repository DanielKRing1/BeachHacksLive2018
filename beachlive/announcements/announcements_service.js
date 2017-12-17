liveApp.service('AnnouncementsService', function() {
    var announcementList = [];
    var announcements_callbacks = [];

    console.log("hi announcement service");

    var getAnnouncementList = function () {
       return announcementList;
     }

     
     firebase.database().ref('announcements').on("value", function(snapshot) {
       announcementList = [];
       snapshot.forEach(function(item) {
            var itemVal = item.val();
            announcementList.push(itemVal);
        });

        announcementList.reverse();

       //console.log("list:"+announcementList);
       for (var i = 0; i < announcements_callbacks.length; i++)
       {
           announcements_callbacks[i]();
       }

     });

    var service = {getAnnouncementList: getAnnouncementList,
                   updateAnnouncement: function(_callback){announcements_callbacks.push(_callback)}};
    //setTimeout(2000);
    return service;
});
