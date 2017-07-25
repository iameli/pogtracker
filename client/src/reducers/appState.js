import * as actions from '../actions/actions';

const initialState = {
  isParsingChat: false,
  videoID: "159832455",
  channel: "grimmmz",
  pogs: [],
  bacon: true,
  searchTerm: "PogChamp",
  requesting: false
};

//doc 160891561
//beyondthesummit 159832455

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