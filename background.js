function getNotificationId() {
    var id = Math.floor(Math.random() * 9007199254740992) + 1;
    return id.toString();
}


function sendNotification(message)
{
    chrome.notifications.create(getNotificationId(), 
        {
            title: '排程下載',
            iconUrl: 'notify.png',
            type: 'basic',
            message: message
        }, 
        function(notificationId){}
    );
}

var hostAppId = 'twly-ivod-dl-chrome-extension-receiver';

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    chrome.runtime.sendNativeMessage(hostAppId, {uri:message});
    sendNotification(message);
    console.log(chrome.runtime.lastError)
});

