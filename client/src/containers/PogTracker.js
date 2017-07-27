import React, { Component } from 'react';
import { sendVideoRequest } from '../actions/actions';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Loading from '../components/Loading';
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

  componentWillMount(){
    const videoID = this.props.match.params.id;
    this.props.dispatch(sendVideoRequest(videoID));
  }

  render() {
    return (
      <div>
         {
          this.props.requesting 
            ? <Loading />
            : 
            this.props.videoLoaded 
              ? 
                <PogTrackerW>
                  <ReplayStats />
                  <TwitchPlayer />
                  <EmoteButtons />
                </PogTrackerW>
              : undefined
         }
      </div>
    );
  }
}

const mapState = ({ requesting, videoLoaded}) => ({
  requesting,
  videoLoaded
});

export default connect(mapState)(PogTracker);