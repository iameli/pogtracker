import React, { Component } from 'react';
import { sendVideoRequest } from '../actions/actions';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import NumericInput from 'react-numeric-input';

import styled from 'styled-components';

const SearchBox = styled(NumericInput)`
  margin-right: 10px;
  z-index: 1;
  transition: all 0.25s ease-in-out;

  &:focus {
    outline: none;
  }

  ${props => props.landing && `
    border: none;
    border-bottom: 2px solid rgba(100, 65, 164, 0.2); 
    font-family: 'Lato', serif;
    font-weight: 900;
    font-style: italic;
    letter-spacing: 0.5rem;

    &:hover, &:focus {
      border-bottom: 2px solid rgba(100, 65, 164, 0.8);
    }

    &:focus {
      background: linear-gradient(rgba(100, 65, 164, 0) 80%, rgba(100, 65, 164, 0.1));
    }

    &::placeholder {
      text-align: center;
      letter-spacing: 0;
      font-weight: 400;
      font-style: italic;
      padding-bottom: 2rem;
      font-size: 0.7em;
    }
  `}
`;

const SearchW = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;

  & > i {
    color: rgba(100, 65, 164, 1);
  }

  ${props => props.landing && `
    display: flex;
    justify-content: center;
    font-size: 5rem;

    & > i {
      position: absolute;
      font-size: 0.8em;
      right: 0.5em;
      bottom: 0.4em;
    }
  `};
`;

const SearchIcon = styled.i`
  cursor: pointer;
  transition: all 0.2 ease-in-out;
  
  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;

const CursorW = styled.div`
  position: relative;

  ${props => props.landing && `
    & > span {
      flex-basis: 0;
      flex: 1;
    }

    & > i {
    position: absolute;
    left: 0;
    bottom: 10%;
    width: 4px;
    height: 80%;
    background-color: rgba(100, 65, 164, 1);
    animation-name: blink;
    animation-duration: 1500ms;
    animation-iteration-count: infinite;
    opacity: 1;

    @keyframes blink {
      0% { opacity: 1; }
      25% { opacity: 0; }
      50% { opacity: 0; }
      75% { opacity: 1}
      100% { top: 1;}
    }
  `}
`;

const HiddenTextW = styled.p`
  display: flex;
  margin: 0;
  padding: 0;
  font-family: 'Lato', serif;
  font-weight: 900;
  font-style: italic;
  letter-spacing: 0.5rem;
`;

class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
      input : "161763204"
    };
  }

  handleChange(e){
    this.setState({input : e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.history.push('/replay/' + this.state.input);
  }

  render() {
    return (
      <SearchW onSubmit={(e) => this.handleSubmit(e)} landing={!!this.props.landing}>
        <CursorW landing={!!this.props.landing}>
          <SearchBox 
            style={false} 
            value={this.state.input} 
            onKeyUp={(e) => this.handleChange(e)} 
            placeholder="What replay, yo?"
            landing={!!this.props.landing}
          />

          {this.props.landing && <i></i>}
        </CursorW>
        <SearchIcon onClick={(e) => this.handleSubmit(e)} className="fa fa-search fa-lg" aria-hidden="true"></SearchIcon>
      </SearchW>
    );
  }
}

export default withRouter(connect()(Search));
