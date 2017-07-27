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
    this.dispatchNewRequest();
  }

  componentWillReceiveProps(newProps){
    console.log(newProps);
    console.log(newProps.match.params.id, this.props.loadedVideoID);
    newProps.match.params.id != this.props.loadedVideoID && this.dispatchNewRequest();
  }

  getQueries(){
    const queries = this.props.location.search ? qs.parse(this.props.location.search) : undefined;
    const formattedDispatchQueries = {};

    for(let query in queries){
      query === "e" && (formattedDispatchQueries["activeEmote"] = queries[query]);
      query === "m" && (formattedDispatchQueries["activeMoment"] = queries[query]);
    }

    return formattedDispatchQueries;
  }

  dispatchNewRequest(){
    this.props.dispatch(updateActive(this.getQueries()));
    !this.props.requesting && this.props.dispatch(sendVideoRequest(this.props.match.params.id));
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

const mapState = ({ requesting, videoLoaded, loadedData}) => ({
  loadedVideoID : loadedData.videoID,
  requesting,
  videoLoaded
});

export default connect(mapState)(PogTracker);