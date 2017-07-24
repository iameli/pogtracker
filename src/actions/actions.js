export const PARSE_CHAT = 'PARSE CHAT';

//"https://rechat.twitch.tv/rechat-messages?client_id=7vaylot4y76nvfvl5smsdl3lbeiajs&start=0&video_id=v" + videoID, init

export const parseChat = (videoID) => (dispatch, getState) => {
  let startTime, endTime, currentTime;
  var request = new Request('https://api.twitch.tv/kraken/videos/' + videoID, {
    headers: new Headers({
      'Client-ID': '7vaylot4y76nvfvl5smsdl3lbeiajs'
    })
  });

  return fetch(request)
    .then(res => {
      return res.json();
    }).then(data => {
        console.log(data);
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
    }).then(promises => {
        return Promise.all(promises.map(promise => promise.json()));
        // return promises.map(promise => {
        //   return promise.json();
        // });
    }).then(jsons => {
        const library = {}

        jsons.forEach(json => {
          const tracked = [];

          json.data.forEach(post => {
            post.attributes.message.includes(getState().searchTerm) &&
            tracked.push({
              timestamp : post.attributes.timestamp,
              message : post.attributes.message,
              videoOffset : post.attributes["video-offset"]
            });
          })

          if(tracked.length > 0){
            library[json.data[0].attributes.timestamp] = { posts : tracked };
          }

        });
        console.log(library);
    });
}