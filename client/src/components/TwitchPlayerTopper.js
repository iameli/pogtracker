import React, { Component } from 'react';
import styled from 'styled-components';

const TopperW = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;


class TwitchPlayerTopper extends Component {
  render() {
    return (
      <TopperW>
        <p>Hello</p>
        <p>Goodbye</p>
      </TopperW>
    );
  }
}

export default TwitchPlayerTopper;