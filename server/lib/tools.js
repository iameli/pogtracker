import emoteNames from './data';
import rp from 'request-promise';

function getStartTime(videoID){
  var options = {
    uri: 'https://api.twitch.tv/kraken/videos/' + videoID,
    headers: {
      'Client-ID': '7vaylot4y76nvfvl5smsdl3lbeiajs'
    },
    json: true
  };

  return rp(options)
  .then(data => {
    console.log("in tool");
    return ((new Date(data.recorded_at)).getTime()) / 1000;
  })
  .catch(err => {
    console.log(e);
  });
}

export { getStartTime };