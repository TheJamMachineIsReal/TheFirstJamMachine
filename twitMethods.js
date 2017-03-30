let Twitter = require('twitter');
let myVars = require('./myVars.js');

let client = new Twitter({
    consumer_key : myVars.consumer_key ,
    consumer_secret : myVars.consumer_secret ,
    access_token_key : myVars.access_token_key ,
    access_token_secret : myVars.access_token_secret
    })

module.exports = {
    testStatus : " this one is the last of today, but mostly just for luck",

    postFirstTweet : async function(testStatus){
        client.post('statuses/update', { status : testStatus}, function(error, tweet, response) {
            if(error) {
            console.log(error)
            console.log(tweet)
            console.log(response)
            } else {
            console.log("tweeted fine?")
            }
        })
    },

    //postFirstTweet(testStatus) 847196768387452929

    getSomeTweets : async function(){
        try {
            let fi = await client.get('statuses/user_timeline', {user_id: "847191736900366337", count: "2" })
            //console.log(fi)
            return fi
        } catch (err){
            console.log(err)
        }
    }
}


