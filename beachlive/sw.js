/*
 * CREATE NOTIFICATION
 */
self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {

    // Extends life of event, Service Worker is kept running until this promise is resolved
    // Async pauses execution of function until 'await' promises within the function resolve
    e.waitUntil(async function(){
      // Include Window Client where this Service Worker lives (uncontrolled by default)
      const allClients = await clients.matchAll({includeUncontrolled: true});

      if(allClients.length > 0){
        allClients[0].focus();
      }else{
        clients.openWindow('http://localhost:8001/beachlive/#!/announcements');
      }
    }());

    notification.close();
  }
});
