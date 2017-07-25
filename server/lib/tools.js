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
    console.log("in tool");


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
    const library = {};

    chatChunks.forEach(chunk => {
      const tracker = {};

      chunk.data.forEach(post => {
        const postOffsetTime = Math.floor(post.attributes["video-offset"] / 1000);

        emoteNames.forEach(emoteName => {
          if(post.attributes.message.includes(emoteName)){
            !tracker[emoteName]
              ?
                tracker[emoteName] = [postOffsetTime]
              :
                tracker[emoteName].push(postOffsetTime)
          }          
        });
      });
      
      console.log(tracker);
    })
  })

  .catch(err => {
    console.log(err);
  });
}

export { parseChat };

// {
//   Kappa : [12, 42],
//   PogChamp : [16, 84]
// }