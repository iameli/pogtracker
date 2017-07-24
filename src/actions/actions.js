export const PARSE_CHAT = 'PARSE_CHAT';
export const UPDATE_POGS = 'UPDATE_POGS';

export const parseChat = (videoID) => (dispatch, getState) => {
  let startTime, endTime, currentTime;
  var request = new Request('https://api.twitch.tv/kraken/videos/' + videoID, {
    headers: new Headers({
      'Client-ID': '7vaylot4y76nvfvl5smsdl3lbeiajs'
    })
  });

  return fetch(request)
    .then(res => res.json())
    .then(data => {
        startTime = ((new Date(data.recorded_at)).getTime()) / 1000;
        endTime = startTime + data.length;
        currentTime = startTime;
        const promises = [];
        
        while(currentTime <= endTime){
          let request = new Request('https://cors-anywhere.herokuapp.com/https://rechat.twitch.tv/rechat-messages?&start='+currentTime+"&video_id=v"+videoID, {
            headers: new Headers({
              'Client-ID': '7vaylot4y76nvfvl5smsdl3lbeiajs'
            })
          });

          promises.push(
            fetch(request)
          )
          currentTime += 30;
        }

        return Promise.all(promises);
    }).then(promises => Promise.all(promises.map(promise => promise.json())))
      .then(jsons => {
        const library = [];

        jsons.forEach(chunk => {
          const tracked = [];

          chunk.data.forEach(post => {
            if(post.attributes.message.includes(getState().searchTerm)){
              tracked.push({
                timestamp : post.attributes.timestamp,
                offset : post.attributes["video-offset"],
                message : post.attributes.message
              })
            }
          });

          if(tracked.length > 0){
            library.push({
              timestamp: Math.floor(chunk.data[0].attributes["video-offset"] / 1000),
              count: tracked.length
            });
          }
        });

        library.sort((a, b) => {
          return b.count - a.count;
        });

        dispatch(updatePogs(library.slice(0, 5).map(obj => obj.timestamp)));
    });
}

function updatePogs(pogs){
  return {
    type: UPDATE_POGS,
    pogs
  }
}