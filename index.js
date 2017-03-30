let twitMethods = require('./twitMethods.js')
let T = require('twit');
let myVars = require('./myVars.js');



let client = new T({
    consumer_key : myVars.consumer_key ,
    consumer_secret : myVars.consumer_secret ,
    access_token : myVars.access_token_key ,
    access_token_secret : myVars.access_token_secret
    })


let stream = client.stream('user')

console.log("starting streaming")

stream.on('tweet', justLog)
stream.on('follow', followed)

console.log("streaming now")

function followed(eventMsg){
  console.log(eventMsg.source.id + " followed you.")
  followTreatment(eventMsg.source.id)
}


function justLog(eventMsg){

  if(!(eventMsg.user.name === "IAmTheJamMachine")){

    let myData = {
      ats : getAts(eventMsg.text),
      sender : {
        name: eventMsg.user.name ,
        followers_count: eventMsg.user.followers_count ,
        following: eventMsg.user.following
      }
    };

    
    console.log("YOU GOT TWEETED")
    console.log("you got tweeted by: " + myData.sender.name)
    console.log("has " + myData.sender.followers_count + " followers")
    console.log(" following " + myData.sender.name + " : " + myData.sender.following)

    console.log("******")
    console.log("whole obj for reference")
    console.log(myData)

    if( myData.sender.name === "suddenly_here1211" ) {
      let toPost = "Oh you bet @" + myData.sender.name
      postTweet(toPost)
    }
  }
}

async function followTreatment(follower){
  client.get('friends/list', { count : "3"}, function(error, response) {
    try {
      console.log(response)
      for( let o of response.users ) { 
        if( o.following ) {
          console.log("already following this one")
        } else {
          client.post('friendships/create', {screen_name : o.screen_name, follow : true}, function(error) {
            try {
              console.log("followed " + o.screen_name)
            } catch (error) {
              console.log(error)
            }
          })
        }
      }

    } catch (error) {
      console.log("smtin went wrong")
      console.log(error)
    }
  })
}

async function postTweet(postingStatus){
  client.post('statuses/update', { status : postingStatus}, function(error, tweet, response) {
            try {
            console.log("tweeted")
            } catch (error){
            console.log(error)
            }
        })
}


function getAts( p ) {
  let ats = p.split(" ")
  let resultAts = []

  for ( let o of ats ) {
    let que = o.split("")
    
    if(que[0] === "@"){
      resultAts.push(o)
    }
  }
  return resultAts
}



