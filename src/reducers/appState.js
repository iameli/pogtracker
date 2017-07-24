import * as actions from '../actions/actions';

const initialState = {
  isParsingChat: false,
  videoID: 160376138,
  pogs: [],
  bacon: true
};

export default function appState(state=initialState, action){
  switch (action.type){
    default:
      return state;
  }
}