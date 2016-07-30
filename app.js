var profile = require("./profile.js")
var topic = process.argv.slice(2,3)
var users = process.argv.slice(3);
users.forEach(function(user){profile.get(user,topic)});
