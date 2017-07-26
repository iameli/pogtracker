import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ReplayStats from '../components/ReplayStats';
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
        <ReplayStats />
        <TwitchPlayer />
        <EmoteButtons />
      </PogTrackerW>
    );
  }
}

export default PogTracker;