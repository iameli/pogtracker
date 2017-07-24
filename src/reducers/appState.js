import * as actions from '../actions/actions';

const initialState = {
  isParsingChat: false,
  videoID: "160891561",
  channel: "beyondthesummit",
  pogs: [],
  bacon: true,
  searchTerm: "PogChamp"
};

//doc 160891561
//beyondthesummit 159832455

export default function appState(state=initialState, action){
  switch (action.type){
    case actions.UPDATE_POGS:
      return {...state, pogs : action.pogs}
    default:
      return state;
  }
}