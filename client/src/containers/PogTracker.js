import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import EmoteButtons from '../components/EmoteButtons';
import TwitchPlayer from '../components/TwitchPlayer';
import TwitchPlayerTopper from '../components/TwitchPlayerTopper';

const PogTrackerW = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

class PogTracker extends Component {
  render() {
    return (
      <PogTrackerW>
        <TwitchPlayer emote={this.props.emote} emotes={this.props.emotes} video={"v" + this.props.videoID}/>
        <EmoteButtons />
      </PogTrackerW>
    );
  }
}

const mapState = ({ videoID, emotes, emote, videoLoaded, requesting }) => ({
  videoID,
  emotes,
  emote
});

export default connect(mapState)(PogTracker);