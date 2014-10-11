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

function urlRequest(url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (state, status) {
        console.log("s:"+state+","+status)
    };
    xhr.open("GET", 'http://127.0.0.1:8000'+url, true);
    xhr.send();
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    urlRequest(message);
    sendNotification(message);
});

