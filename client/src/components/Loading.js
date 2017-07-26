import React, { Component } from 'react';
import ReactLoading from 'react-loading';

class Loading extends Component {
  render() {
    return (
      <div>
        <ReactLoading type={"cylon"} color={"#062f4f"} />
        <p>Processing your replay</p>
      </div>
    );
  }
}

export default Loading;