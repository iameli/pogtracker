import React, { Component } from 'react';
import { sendVideoRequest } from '../actions/actions';
import { connect } from 'react-redux';
import NumericInput from 'react-numeric-input';

import styled from 'styled-components';

const SearchWrapper = styled.form`
  display: flex;
  position: relative;
  margin: 0 auto;
  width: 100%;
`;

const SearchBox = styled(NumericInput)`
  text-align: center;
`;

const Submit = styled.input`
  background: green;
  color: white;
  border: none;
`;

class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
      input : "161763204"
    }
  }

  handleChange(e){
    this.setState({input : e.target.value});
    console.log(this.state)
  }

  render() {
    return (
      <SearchWrapper onSubmit={() => this.props.dispatch(sendVideoRequest(this.state.input))}>
        <SearchBox style={false} value={this.state.input} onKeyUp={(e) => this.handleChange(e)} placeholder="What replay should I analyze for you?"/>
        <Submit type="submit" value="Submit"/>
      </SearchWrapper>
    );
  }
}

export default connect()(Search);
