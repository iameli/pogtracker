import React, { Component } from 'react';
import { connect } from 'react-redux';
import { jumpToTime, sendVideoRequest }  from './actions/actions';
import styled from 'styled-components';

import Search from './containers/Search';
import EmoteButtons from './components/EmoteButtons';
import TwitchPlayer from './components/TwitchPlayer';
import './App.css';

//000 black
//062f4f dark blue
//813772 purple
//B82601 orangered

const Buttons = styled.div`
  display: flex;
`;

class App extends Component {
  render() {
    if(this.props.videoLoaded){
      return (
        <div className="App">
          <h1>POGTRACKER</h1>
          <TwitchPlayer emote={this.props.emote} emotes={this.props.emotes} channel={ this.props.channel } video={"v" + this.props.videoID}/>
          <EmoteButtons />
        </div>
      );
    }else if(this.props.requesting){
      return <div><h1>requesting, yo</h1></div>
    } else {
      return(
        <Search/>
      )
    }
  }
}

const mapState = ({ videoID, emotes, emote, videoLoaded, requesting }) => ({
  videoLoaded,
  videoID,
  emotes,
  emote,
  requesting
});

export default connect(mapState)(App);
