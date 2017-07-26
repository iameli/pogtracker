import emoteNames from './data';
import rp from 'request-promise';

function parseChat(videoID){
  let startTime, endTime, currentTime;

  const initialOptions = {
    uri: 'https://api.twitch.tv/kraken/videos/' + videoID,
    headers: {
      'Client-ID': '7vaylot4y76nvfvl5smsdl3lbeiajs'
    },
    json: true
  };

  return rp(initialOptions)
  .then(data => {
    console.log("Initial request successful.");

    startTime = ((new Date(data.recorded_at)).getTime()) / 1000;
    endTime = startTime + data.length;
    currentTime = startTime;
    const requests = [];

    while(currentTime <= endTime){
      const requestOptions = {
        uri: 'https://rechat.twitch.tv/rechat-messages?&start='+currentTime+"&video_id=v"+videoID,
        headers: {
          'Client-ID': '7vaylot4y76nvfvl5smsdl3lbeiajs'
        },
        json: true
      };

      requests.push(rp(requestOptions));
      currentTime += 30;
    }
    
    return Promise.all(requests);
  })
  .then(chatChunks => {
    console.log("Whew! Promise.all successful!")
    const library = makeLibrary(chatChunks);
    const formattedLibrary = formatLibrary(library);

    return formattedLibrary;
  })
  .catch(err => {
    console.log(err);
  });
}


function makeLibrary(chunks){
  //library will hold keys with the name of emotes used
  //the value will be an array of arrays, each subarray representing
  //a 30 second chunk of chat time
  const library = {};

  //for every 30 seconds chunk of chat
  //analyze each post
  //check each post string for every emote
  //if an emote is found, track it as a key in emoteTracker
  //insert the currently tracked emotes into the library
  //before moving on to the next chat chunk
  chunks.forEach(chunk => {
    const emoteTracker = {};

    chunk.data.forEach(post => {
      const postOffsetTime = Math.floor(post.attributes["video-offset"] / 1000) - 20;

      emoteNames.forEach(emoteName => {
        if(post.attributes.message.includes(emoteName)){
          !emoteTracker[emoteName] ? emoteTracker[emoteName] = [postOffsetTime] : emoteTracker[emoteName].push(postOffsetTime)
        }          
      });
    });

    for(let emote in emoteTracker){
      !library[emote] ? library[emote] = [emoteTracker[emote]] : library[emote].push(emoteTracker[emote])
    }
  });

  return library;
}

function formatLibrary(library){
  const formattedLibrary = {
    mostUsed : "",
    emotes : []
  };
  
  let mostUsedTracker = {
    emote : "default",
    count : 0
  }

  for(let emote in library){
    const chunks = library[emote];
    const topChunks = chunks.sort((a, b) => b.length - a.length).slice(0, 10);
    const moments = topChunks.map(chunk => Math.min(...chunk));
    let avg, count = 0;
    

    chunks.forEach(chunk => count += chunk.length);
    avg = count / chunks.length;


    if(count > mostUsedTracker.count){
      mostUsedTracker = {
        emote,
        count
      }
    } 

    formattedLibrary.emotes.push({
      emote,
      count,
      moments
    });
  }

  formattedLibrary.mostUsed = mostUsedTracker.emote;

  return formattedLibrary;
}

export { parseChat };

// {
//   mostUsed : "WutFace",
//   Kappa : {
//     activity : 437,
//     moments : [1237, 8976, 120]
//   }
// }