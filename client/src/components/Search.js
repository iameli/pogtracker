import React, { Component } from 'react';
import { sendVideoRequest } from '../actions/actions';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import NumericInput from 'react-numeric-input';

import styled from 'styled-components';

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
    this.props.history.push('/replay/' + this.state.input);
  }

  render() {
    const SearchW = styled.form`
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;

      & > i {
        color: rgba(100, 65, 164, 1);
      }

      ${this.props.landing && `
        display: flex;
        justify-content: center;
        font-size: 5rem;

        & > span {
          flex-basis: 0;
          flex: 1;
        }

        & > i {
          position: absolute;
          font-size: 0.8em;
          right: 0.5em;
          bottom: 0.4em;
        }
      `};
    `;

    const SearchBox = styled(NumericInput)`
      text-align: center;
      margin-right: 10px;
      border-radius: ${this.props.landing ? "10px" : "2px"}
      z-index: 1;
    `;

    const Submit = styled.input`
      background: green;
      color: white;
      border: none;
      flex-basis: 0;
      flex: 1;
    `;

    return (
      <SearchW onSubmit={(e) => this.handleSubmit(e)}>
        <SearchBox 
          style={false} 
          value={this.state.input} 
          onKeyUp={(e) => this.handleChange(e)} 
          placeholder="What replay, yo?"
        />
        <i onClick={(e) => this.handleSubmit(e)} className="fa fa-search fa-lg" aria-hidden="true"></i>
      </SearchW>
    );
  }
}

export default withRouter(connect()(Search));
