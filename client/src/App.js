import React, { Component } from 'react';
import { connect } from 'react-redux';
import { jumpToTime, sendVideoRequest }  from './actions/actions';
import styled from 'styled-components';

import Search from './containers/Search';
import TwitchPlayer from './components/TwitchPlayer';
import './App.css';

const Buttons = styled.div`
  display: flex;
`;

class App extends Component {
  render() {
    if(this.props.videoLoaded){
      return (
        <div className="App">
          <h1>POGTRACKER</h1>
          <TwitchPlayer pogs={this.props.pogs} channel={ this.props.channel } video={"v" + this.props.videoID}/>
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

const mapState = ({ videoID, channel, pogs, videoLoaded, requesting }) => ({
  videoLoaded,
  channel,
  videoID,
  pogs,
  requesting
});

export default connect(mapState)(App);
