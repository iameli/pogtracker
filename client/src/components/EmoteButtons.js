import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateEmote } from '../actions/actions';
import styled from 'styled-components';

import { data } from '../lib/data';

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 70%;
`;

const Button = styled.button`
`;

class EmoteButtons extends Component {
  render() {
    console.log(this.props.emotes)
    return (
      <ButtonWrapper>
        {this.props.emotes.emotes.map(emote => {
          return(
            <Button key={emote.name} onClick={() => this.props.dispatch(updateEmote(emote.name))}>
              <img src={`https://static-cdn.jtvnw.net/emoticons/v1/${data[emote.name].id}/1.0`} alt={emote}/>
            </Button>
          ) 
            
        })}
      </ButtonWrapper>
    );
  }
}

const mapState = ({ emotes }) => ({
  emotes
});

export default connect(mapState)(EmoteButtons);