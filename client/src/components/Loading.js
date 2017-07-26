import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const strings = [
  "So how are you today?",
  "This will be worth the wait",
  "Tip: Corridors are bad for firefights",
  "There's a light at the end of the tunnel",
  "3 streamers walked into a bar...",
  "Raise your dongers",
  "FailFish FailFish FailFish"
];

const LoadingW = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 250px auto;
`;

const Notification = styled.p`
  font-family: 'Lato', sans-serif;
  margin: 0;
`;

class Loading extends Component {

  generateNotifications(initial){
    
  }

  render() {
    return (
      <LoadingW>
        <ReactLoading type={"cylon"} color={"rgba(100, 65, 164, 1)"} />
        <Notification>Processing your replay</Notification>
      </LoadingW>
    );
  }
}

export default Loading;