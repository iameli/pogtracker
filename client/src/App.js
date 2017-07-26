import React, { Component } from 'react';
import { connect } from 'react-redux';
import { jumpToTime, sendVideoRequest }  from './actions/actions';
import styled from 'styled-components';
import TopBar from './components/TopBar';
import Loading from './components/Loading';
import Search from './containers/Search';
import PogTracker from './containers/PogTracker';
import './App.css';

//000 black
//062f4f dark blue
//813772 purple
//B82601 orangered

const AppW = styled.div`
  margin: 0 auto;
  width: 70%;
`;

const Buttons = styled.div`
  display: flex;
`;

class App extends Component {
  render() {
    return(
      <AppW>
        <TopBar channel={this.props.channel ? this.props.channel : undefined}/>
        {
          this.props.requesting 
          ? <Loading />
          : 
            this.props.videoLoaded 
            ? <PogTracker/> 
            : <Search/>
        }
      </AppW>
    )
  }
}

const mapState = ({ videoLoaded, requesting, channel }) => ({
  videoLoaded,
  requesting
});

export default connect(mapState)(App);
