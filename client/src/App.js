import React, { Component } from 'react';
import { connect } from 'react-redux';
import { parseChat, jumpToTime, sendVideoRequest }  from './actions/actions';
import styled from 'styled-components';
import TwitchPlayer from './components/TwitchPlayer';
import './App.css';

const Buttons = styled.div`
  display: flex;
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>POGTRACKER</h1>
        <TwitchPlayer pogs={this.props.pogs} channel={ this.props.channel } video={"v" + this.props.videoID}/>
        <button onClick={() => this.props.dispatch(parseChat(this.props.videoID))}>CHECK ME</button>
        <button onClick={() => this.props.dispatch(sendVideoRequest(this.props.videoID))}>Add video?</button>
      </div>
    );
  }
}

const mapState = ({ videoID, channel, pogs }) => ({
  channel,
  videoID,
  pogs
});

export default connect(mapState)(App);
