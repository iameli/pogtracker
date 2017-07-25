import * as actions from '../actions/actions';

const initialState = {
  isParsingChat: false,
  videoID: "159832455",
  channel: "drdisrespectlive",
  pogs: [],
  bacon: true,
  searchTerm: "PogChamp",
  requesting: false
};

//doc video 160891561
//doc emoteset 16847
//doc channel ID 17337557
//beyondthesummit 159832455

//https://api.twitch.tv/kraken/users?login=drdisrespectlive provides channelID (v5)

export default function appState(state=initialState, action){
  switch (action.type){
    case actions.REQUEST_SENT:
      return {...state, requesting: true}
    case actions.REQUEST_COMPLETE :
      return {...state, requesting: false}
    case actions.UPDATE_POGS:
      return {...state, pogs : action.pogs}
    default:
      return state;
  }
}