import React, { Component } from 'react';
import { sendVideoRequest } from '../actions/actions';
import { connect } from 'react-redux';
import NumericInput from 'react-numeric-input';

import styled from 'styled-components';

const SearchWrapper = styled.form`
  display: flex;
  align-items: center;

  & > i {
    color: rgba(100, 65, 164, 1);
  }
`;

const SearchBox = styled(NumericInput)`
  text-align: center;
  margin-right: 10px;
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
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.dispatch(sendVideoRequest(this.state.input))
  }

  render() {
    return (
      <SearchWrapper onSubmit={(e) => this.handleSubmit(e)}>
        <SearchBox 
          style={false} 
          value={this.state.input} 
          onKeyUp={(e) => this.handleChange(e)} 
          placeholder="What replay should I analyze for you?"
        />
        <i onClick={(e) => this.handleSubmit(e)} className="fa fa-search fa-lg" aria-hidden="true"></i>
      </SearchWrapper>
    );
  }
}

export default connect()(Search);
