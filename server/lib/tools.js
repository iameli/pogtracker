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

    const requestOptions = {
      uri: 'https://rechat.twitch.tv/rechat-messages?&start='+ currentTime+ "&video_id=v"+ videoID,
      headers: {
        'Client-ID': '7vaylot4y76nvfvl5smsdl3lbeiajs'
      },
      json: true
    };

    while(currentTime <= endTime){
      requests.push(rp(requestOptions));
      currentTime += 30;
    }
    
    return Promise.all(requests);
  })
  .then(chatChunks => {
    const library = {};

    chatChunks.forEach(chunk => {
      console.log(chunk);
    })
  })
  .catch(err => {
    console.log(err);
  });
}

export { parseChat };