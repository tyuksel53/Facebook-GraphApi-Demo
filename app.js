console.log("App is starting");

const config = require("./config.js");

var getAccessToken = `https://graph.facebook.com/oauth/access_token?client_id=${config.appID}&client_secret=${config.appSecret}&grant_type=client_credentials`;
var request = require('request');
var access_token;

request(getAccessToken, function (error, response, body) {
  if (!error && response.statusCode == 200) {
     var importedJSON = JSON.parse(body);
     access_token = importedJSON.access_token;
    //  console.log(access_token);
     getData(access_token);
  }
});

var getData = (token) => {
    var dataUrl = `https://graph.facebook.com/${config.pageName}?fields=posts.limit(10)&access_token=${token}`;
    request(dataUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var importedJSON = JSON.parse(body);
            for(var name in  importedJSON.posts.data)
            console.log(name + " " + importedJSON.posts.data[name].message);
        }
      });
}


