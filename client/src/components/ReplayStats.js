import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StatsW = styled.div`
  display: flex;
  width: 100%;
  font-family: 'Open Sans', serif;
  margin-bottom: 10px;
  justify-content: flex-end;
`;

const ChannelLogo = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 10px;
`;

const InfoW = styled.div`
  display: flex; 
  flex-flow: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const ChannelLink = styled.a`
  text-decoration: none;
  color: rgba(100, 65, 164, 1);
`;

const Title = styled.p`
  margin: 0;
  font-size: 0.8em;
`;

const GameName = styled.p`
  margin: 0;
  font-size: 0.8em;
`

class ReplayStats extends Component {
  render() {
    return (
      <StatsW>
        <InfoW>
          <ChannelLink href={`http://www.twitch.tv/${this.props.name}`}>{this.props.displayName}</ChannelLink>
          <Title>{this.props.title}</Title>
          <GameName>{this.props.game}</GameName>
        </InfoW>
        <ChannelLogo src={this.props.logo} alt="Channel Logo"/>
      </StatsW>
    );
  }
}


const mapState = ({ loadedData }) => {
  const { channelData, replayData } = loadedData;
  console.log(channelData);
  return {
    title : replayData.title,
    displayName : channelData.displayName,
    logo : channelData.logo,
    game : replayData.game
  };
};
export default connect(mapState)(ReplayStats);