import React, { Component } from 'react';
import { connect } from 'react-redux';
import { jumpToTime, sendVideoRequest }  from './actions/actions';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import TopBar from './components/TopBar';
import Loading from './components/Loading';
import Search from './components/Search';
import PogTracker from './containers/PogTracker';
import './App.css';

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
      <Router>
        <AppW>
          <TopBar channel={this.props.channel ? this.props.channel : undefined}/>
            <Route path="/replay/:id" component={PogTracker}/>
        </AppW>
      </Router>
    )
  }
}

const mapState = ({ videoLoaded, requesting, channel }) => ({
  videoLoaded,
  requesting
});

export default connect(mapState)(App);
