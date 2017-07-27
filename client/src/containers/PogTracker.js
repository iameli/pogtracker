import React, { Component } from 'react';
import { sendVideoRequest, updateActive } from '../actions/actions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import qs from 'query-string'

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
    const queries = this.props.location.search ? qs.parse(this.props.location.search) : undefined;
    const toDispatch = {};

    for(let query in queries){
      query === "e" && (toDispatch["activeEmote"] = queries[query]);
      query === "m" && (toDispatch["activeMoment"] = queries[query]);
    }
    console.log(toDispatch)
    
    this.props.dispatch(updateActive(toDispatch));
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
                  <TwitchPlayer/>
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