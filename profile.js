var https = require("https");
var http = require("http");

function printMessage(username, badgeCount, points, topic){
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in " + topic;
  console.log(message);
}

function printError(error){
  console.error(error.message);
}

function get(username, topic){
  var request = https.get("https://teamtreehouse.com/" + username + ".json", function (response){
    var body = '';
    response.on('data', function(chunk){
      body += chunk;
    });
    response.on('end', function(){
      if (response.statusCode === 200){
        try {
          var profile = JSON.parse(body);
          console.log(profile);
          if (profile.points.hasOwnProperty(topic)){
            printMessage(username, profile.badges.length, profile.points[topic], topic);
          } else {
            printMessage(username, profile.badges.length, 0, topic);
          }
        }
        catch(error) {
          //PARSE ERROR
          printError(error);
        }
      } else {
        //statusCode error
          printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
      }
    });
  });

  //CONNECTION ERROR
  request.on('error', printError);
}

module.exports.get = get;
