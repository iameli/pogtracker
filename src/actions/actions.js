export const PARSE_CHAT = 'PARSE CHAT';

//"https://rechat.twitch.tv/rechat-messages?client_id=7vaylot4y76nvfvl5smsdl3lbeiajs&start=0&video_id=v" + videoID, init

export const parseChat = (videoID) => (dispatch, getState) => {
  let startTime, endTime;
  var request = new Request('https://api.twitch.tv/kraken/videos/' + videoID, {
    headers: new Headers({
      'Client-ID': '7vaylot4y76nvfvl5smsdl3lbeiajs'
    })
  });

  return fetch(request)
    .then(res => {
      return res.json();
    }).then(data => {
        startTime = ((new Date(data.created_at)).getTime()) / 1000;
        endTime = startTime + data.length;

        var request = new Request('https://cors-anywhere.herokuapp.com/https://rechat.twitch.tv/rechat-messages?&start='+startTime+"&video_id=v"+ videoID, {
          headers: new Headers({
            'Client-ID': '7vaylot4y76nvfvl5smsdl3lbeiajs'
          })
        });

        return fetch(request)
    }).then(res => {
        return res.json();
    }).then(data => {
        const messages = [];
        data.data.forEach(post => {
          messages.push({
            message: post.attributes.message,
            timestamp: post.attributes.timestamp
          });
        });
    });
}