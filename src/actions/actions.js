export const PARSE_CHAT = 'PARSE CHAT';

//"https://rechat.twitch.tv/rechat-messages?client_id=7vaylot4y76nvfvl5smsdl3lbeiajs&start=0&video_id=v" + videoID, init

export const parseChat = (videoID) => (dispatch, getState) => {
  var request = new Request('https://api.twitch.tv/kraken/videos/' + videoID, {
    headers: new Headers({
      'Client-ID': '7vaylot4y76nvfvl5smsdl3lbeiajs'
    })
  });

  const init = { 
    mode: 'no-cors'
  };
  return fetch(request)
    .then(res => {
      return res.json();
    }).then(data => {
        const epoch = ((new Date(data.created_at)).getTime()) / 1000;
        console.log(epoch)
        // return fetch("https://rechat.twitch.tv/rechat-messages?client_id=7vaylot4y76nvfvl5smsdl3lbeiajs&start=" + startTime + "&video_id=v" + videoID);
    });
}