import React, { Component } from 'react';
import { sendVideoRequest } from '../actions/actions';
import { connect } from 'react-redux';
import NumericInput from 'react-numeric-input';

import styled from 'styled-components';

const SearchWrapper = styled.div`
  display: flex;
  height: 75px;
  position: relative;
  margin: 0 auto;
  width: 50%;
`;

const SearchBox = styled(NumericInput)`
  flex: 1;
  width: 500px;
  text-align: center;
  height: 100%;
`;

const Submit = styled.button`
  width: 200px;
  height: 100%;
  background: green;
  color: white;
  border: none;
`;

class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
      input : null
    }
  }

  handleChange(e){
    this.setState({input : e.target.value});
    console.log(this.state)
  }

  render() {
    return (
      <SearchWrapper>
        <SearchBox style={false} value={this.state.input} onKeyUp={(e) => this.handleChange(e)} placeholder="What replay should I analyze for you?"/>
        <Submit type="button" onClick={() => this.props.dispatch(sendVideoRequest(this.state.input))}>POGTRACK</Submit>
      </SearchWrapper>
    );
  }
}

export default connect()(Search);