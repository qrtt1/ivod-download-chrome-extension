function getNotificationId() {
    var id = Math.floor(Math.random() * 9007199254740992) + 1;
    return id.toString();
}


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    chrome.notifications.create(getNotificationId(), 
        {
            title: '排程下載',
            iconUrl: 'notify.png',
            type: 'basic',
            message: message
        }, 
        function(notificationId){}
    );
});

