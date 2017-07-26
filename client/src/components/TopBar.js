import React, { Component } from 'react';
import Search from './Search';
import styled from 'styled-components';

const BarW = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h3`
  font-size: 2.3em;
  font-family: 'Lato', sans-serif;
  font-weight: 900;
  letter-spacing: 5px;

  & > img {
    margin-right: 4px;
  }
`;

class TopBar extends Component {
  render() {
    return (
      <BarW>
        <Logo>P<img src="https://static-cdn.jtvnw.net/emoticons/v1/88/1.0" alt="PogChamp!"/>GTRACKER</Logo>
        <Search />
      </BarW>
    );
  }
}

export default TopBar;