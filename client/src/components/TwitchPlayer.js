import React, { Component } from 'react';
import 'twitch-embed';
import styled from 'styled-components';
import { convertToTime }  from '../lib/tools';

const PlayerW = styled.div`
	display: flex;
	justify-content: center;
	background-color: rgba(100, 65, 164, 0.2);
	width: 100vw;
	position: relative;
	margin-left: -50vw;
	margin-right: -50vw;
	height: 432px;
	margin-bottom: 20px;
`;

const ButtonW = styled.div`
	display: flex;
	flex-flow: column;
	height: 432px;
	border-left: 2px solid lightpurple;
`;

const TimeButton = styled.button`
	flex: 1;
	padding: 0.8em 1.5em;
	border: none;
	background: rgba(100, 65, 164, 1);
	color: white;
	font-weight: bold;

	&:hover {
		background: rgba(100, 65, 164, 0.8);
	}

`;

class TwitchPlayer extends Component {
  constructor(props){
    super(props);
    this.player = null;
    this.state = {
      id: null
    }
  }

  componentWillMount() {
		this.setId();
	}

	componentDidMount() {
		this.setPlayer();
    this.updateTime(0);
	}

	componentDidUpdate() {
		this.setPlayer();
	}

	componentWillReceiveProps(nextProps) {
		this.setId();
		this.setPlayer();
	}

	generatePogs(emotes){
		return emotes.emotes.find(emote => emote.name === this.props.emote).moments;
	}

  setId() {
		if (!this.state.id) {
			if (this.props.channel) {
				this.channel = true;
				this.setState({
					id: `twitch-${this.props.channel}`
				});
			}
			if (this.props.video) {
				this.channel = false;
				this.setState({
					id: `twitch-${this.props.video}`
				});
			}
		}
	}

	setPlayer() {
    if (!this.player) {
			const options = {};
      options.width = 768;
      options.height = 432;
			options.video = this.props.video;

			if (typeof window !== 'undefined' && window.Twitch) {
				this.player = new window.Twitch.Player(this.state.id, options);
			}
      console.log(options)
		}
	}

  updateTime(time) {
    this.player.seek(time);
  }

  render() {
		return (
      <PlayerW>
					<div id={this.state.id || ''} className="twitch-video-embed"></div>
					<ButtonW>
						{this.generatePogs(this.props.emotes).map(moment => {
							return <TimeButton key={moment} onClick={() => this.updateTime(moment)}>{convertToTime(moment)}</TimeButton>
						})}
					</ButtonW>
      </PlayerW>
		);
	}
}

export default TwitchPlayer;