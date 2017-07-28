import React, { Component } from 'react';
import styled from 'styled-components';
import Search from './Search';

const LandingW = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;


class Landing extends Component {
  render() {
    return (
      <LandingW>
        <h1>I do what now?</h1>
        <Search landing/>
        <p>Some extra info here, yes?</p>
      </LandingW>
    );
  }
}

export default Landing;