export const SEND_VIDEO_REQUEST = 'SEND_VIDEO_REQUEST';
export const REQUEST_SENT = 'REQUEST_SENT';
export const REQUEST_COMPLETE = 'REQUEST_COMPLETE';

export const sendVideoRequest = (videoID) => (dispatch) => {
  dispatch(requestSent());
  return fetch(`http://localhost:8080/api/replay/${videoID}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    dispatch(requestCompleted());
  })
  .catch(e => {
    console.log(e)
  });
}

function requestSent(){
  return {
    type: REQUEST_SENT
  }
}

function requestCompleted(){
  return {
    type: REQUEST_COMPLETE
  }
}