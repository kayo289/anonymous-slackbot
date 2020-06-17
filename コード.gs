function doPost(e) {
  var data = JSON.parse(e.postData.getDataAsString());
  // event subscriptionsで必要なコード
  if(data.type == 'url_verification') {
    return ContentService.createTextOutput(postData.challenge);
  } else if (data.event.channel_type == 'im') {
    return postMessage(data);
  }
  return 0;
}
function postMessage(data){
  var webhookUrl = PropertiesService.getScriptProperties().getProperty('WEBHOOK_URL');
  var message = {
    'text': data.event.text,
  };
  var options = {
    'method'  : 'POST',
    'headers' : {'Content-type': 'application/json'},
    'payload' : JSON.stringify(message)
  };
  return UrlFetchApp.fetch(webhookUrl, options);
}