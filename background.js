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

var port = null;
var hostName = 'twly_receiver';


function onNativeMessage(message) {
    console.log(message);
}

function onDisconnected() {
    port = null;
    console.log("Failed to connect: " + chrome.runtime.lastError.message);
}

function connectNative() {
    port = chrome.runtime.connectNative(hostName);
    port.onMessage.addListener(onNativeMessage);
    port.onDisconnect.addListener(onDisconnected);
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    var uri = message.uri
    var speaker = message.speaker.trim()

    var video_info = "";
    var text_lines = speaker.split("\n");
    for (var i in text_lines) {
        video_info += ("\n"+text_lines[i].trim());
    }
    
    sendNotification("影片：" + uri + "\n" + video_info);

    if (port != null){
        port.postMessage({uri:uri});
    }
    else{
        console.log("no port to post messages");
    }
});


connectNative();

