import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateActive } from '../actions/actions';
import styled from 'styled-components';

import { data } from '../lib/data';

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Button = styled.button`
`;

class EmoteButtons extends Component {
  render() {
    return (
      <ButtonWrapper>
        {this.props.emotes.map(emote => {
          return(
            <Button key={emote.name} onClick={() => this.props.dispatch(updateActive({activeEmote: emote.name}))}>
              <img src={`https://static-cdn.jtvnw.net/emoticons/v1/${data[emote.name].id}/1.0`} alt={emote}/>
            </Button>
          ) 
            
        })}
      </ButtonWrapper>
    );
  }
}

const mapState = ({ loadedData }) => ({
  emotes : loadedData.library.emotes
});

export default connect(mapState)(EmoteButtons);