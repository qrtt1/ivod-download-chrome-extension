此 chrome extension 僅作為立法院隨選視訊系統的下載 UI，
會在查詢頁面增加按钮，將下載任務委託給 [ivod-download-client](https://github.com/billy3321/ivod-download-client)。

## 安裝

1. 安裝 [ivod-download-client](https://github.com/billy3321/ivod-download-client)
1. 安裝 chrome extension 與註冊外部程式
1. 開啟 [立法院 議事轉播 網際網路多媒體隨選視訊(ivod)系統](http://ivod.ly.gov.tw/)，進入到想下載的頁面，點選「排程下載」：


![](https://cloud.githubusercontent.com/assets/193223/4601524/377de92e-5106-11e4-8db4-e1943f8a1739.png)

## 向 chrome 註冊外部程式

我們使用 [Native Messaging](https://developer.chrome.com/extensions/messaging#native-messaging) API 讓 chrome extension 呼叫外部程式。
因此需先手動向 Chrome 註冊讓它知道外部程式的資訊，您需將專案內的 `twly_receiver.json` 檔放在適當的路徑並稍為修改才能正常運作。

```json
{
  "name": "twly_receiver",
  "description": "twly single video download jobs receiver",
  "path": "HOST_PATH",
  "type": "stdio",
  "allowed_origins": [
    "chrome-extension://EXTENSION_ID/"
  ]
}
```

上面的 json 為專案內附的範例檔，其中 `HOST_PATH` 與 `EXTENSION_ID` 是需要依安裝環境修改的。EXTENSION_ID 就是填上安裝 chrome extension 時的 ID 時可。
HOST_PATH 為執行 [ivod-download-client](https://github.com/billy3321/ivod-download-client) 內所提供的 `twly-ivod-dl-chrome-extension-receiver` 的 script 絕對路徑。

假設它的路徑為 `/usr/local/bin/twly-ivod-dl-chrome-extension-receiver`，並且 EXTENSION_ID 為 aaabbbcccdddeeefff，那麼外部程式註冊檔的內容應為：


```json
{
  "name": "twly_receiver",
  "description": "twly single video download jobs receiver",
  "path": "/usr/local/bin/twly-ivod-dl-chrome-extension-receiver",
  "type": "stdio",
  "allowed_origins": [
    "chrome-extension://aaabbbcccdddeeefff/"
  ]
}
```

填寫好檔案後，再來就是將它放在適當的位置就能正常使用。

以 OS X 為例，它可以放在使用者目錄下：

```
~/Library/Application Support/Google/Chrome/NativeMessagingHosts/twly_receiver.json
```

以 Linux 為例，它可以放在使用者目錄下：

```
~/.config/google-chrome/NativeMessagingHosts/twly_receiver.json
```

若是 Windows 使用者，它需修改系統註冊檔，增加下列的 key

```
HKEY_CURRENT_USER\SOFTWARE\Google\Chrome\NativeMessagingHosts\twly_receiver
```


