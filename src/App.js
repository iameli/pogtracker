import React, { Component } from 'react';
import { connect } from 'react-redux';
import { parseChat }  from './actions/actions';
import './App.css';


// VID: 160891561
// start epoch: 1500484578
// apiUrl = 'https://rechat.twitch.tv/rechat-messages?
// https://rechat.twitch.tv/rechat-messages?start=TIMESTAMP&video_id=VOD_ID'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>HOT LOADING MOFO</h1>
        <button onClick={() => this.props.dispatch(parseChat(this.props.videoID))}>CHECK ME</button>
      </div>
    );
  }
}

const mapState = ({ videoID }) => ({
  videoID
});

export default connect(mapState)(App);
