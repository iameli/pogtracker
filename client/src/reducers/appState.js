import * as actions from '../actions/actions';

const initialState = {
  videoLoaded: false,
  isParsingChat: false,
  loadedData : {
    videoID: "",
    library : {},
    channelData : {},
    replayData : {}
  },
  activeEmote: "PogChamp",
  requesting: false
};


//grimmz 161763204
//doc video 160891561
//doc emoteset 16847
//doc channel ID 17337557
//beyondthesummit 159832455

//https://api.twitch.tv/kraken/users?login=drdisrespectlive provides channelID (v5)

export default function appState(state=initialState, action){
  switch (action.type){
    case actions.UPDATE_EMOTE:
      return {...state, activeEmote : action.emote}
    case actions.REQUEST_SENT:
      return {...state, requesting: true}
    case actions.REQUEST_COMPLETE :
      return {
        ...state, 
        requesting: false, 
        videoLoaded: true,
        loadedData: {
          videoID: action.data.videoID,
          library: action.data.library,
          channelData: action.data.channelData,
          replayData: action.data.replayData
        }
      }
    default:
      return state;
  }
}