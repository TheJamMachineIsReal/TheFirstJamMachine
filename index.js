let Twitter = require('twitter');

let myVars = require('./myVars.js');

console.log(myVars)

let client = new Twitter({
  consumer_key : myVars.consumer_key ,
  consumer_secret : myVars.consumer_secret ,
  access_token_key : myVars.access_token_key ,
  access_token_secret : myVars.access_token_secret
})

let params = {screen_name: 'nodejs'}

let testStatus = " First tweet for this one. Machine Learning..."

client.post('statuses/update', { status : testStatus}, function(error, tweet, response) {
  if(error) {
    console.log(error)
    console.log(tweet)
    console.log(response)
  } else {
    console.log("tweeted fine?")
  }
})