import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { updateActive } from '../actions/actions';
import { convertToTime }  from '../lib/tools';

const PlayerW = styled.div`
	display: flex;
	justify-content: center;
	background-color: rgba(100, 65, 164, 1);
	width: 100vw;
	position: relative;
	margin-left: -50vw;
	margin-right: -50vw;
	height: 432px;
	margin-bottom: 20px;
	background-image: url("https://www.transparenttextures.com/patterns/shattered.png");
`;

const ButtonW = styled.div`
	display: flex;
	flex-flow: column;
	height: 432px;
`;

const TimeButton = styled.button`
	flex: 1;
	padding: 0.8em 1.5em;
	border: none;
	background: rgba(100, 65, 164, 1);
	color: white;
	font-weight: bold;
	border-right: 2px solid silver;

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
		this.updateTime();
	}
 
	componentDidUpdate() {
		this.updateTime();
	}

	componentWillReceiveProps(nextProps) {
		this.setId();
		this.setPlayer();
		this.updateTime();
	}

  setId() {
		if (!this.state.id) {
			this.setState({
				id: `twitch-${this.props.videoID}`
			});
		}
	}


	setPlayer() {
    if (!this.player) {
			const options = {};
      options.width = 768;
      options.height = 432;
			options.video = "v" + this.props.videoID;

			this.player = new window.Twitch.Player(this.state.id, options);
		}

		this.updateTime();
		
		//delayed recall of updateTime due to the twitch embed loading
		//previous view state. Should really only affect people refreshing
		//but good to catch it until I replace the twitch embed with a custom solution
		//arrow functions dont work inside of setTimeout in React? Have to set THAT to have access.
		const that = this;
		setTimeout(function() { that.updateTime() }, 5000 );
	}

  updateTime() {
		const time = this.props.emotes.find(emote => emote.name === this.props.activeEmote).moments[this.props.activeMoment];
    this.player.seek(time);
  }

  render() {
		return (
      <PlayerW>
				<div id={this.state.id || ''} className="twitch-video-embed"></div>
				<ButtonW>
					{this.props.emotes.find(emote => emote.name === this.props.activeEmote).moments.map((moment, index) => {
						return (
							<TimeButton 
								key={moment} 
								onClick={() => this.props.dispatch(updateActive({activeMoment: index}))}>
								{convertToTime(moment)}
							</TimeButton>
						)
					})}
				</ButtonW>
      </PlayerW>
		);
	}
}

const mapState = ({ loadedData }, ownProps) => ({
	query : ownProps.query ? ownProps.query : undefined,
	videoID : loadedData.videoID,
	emotes : loadedData.library.emotes,
	activeEmote : loadedData.activeEmote,
	activeMoment : loadedData.activeMoment
});

export default connect(mapState)(TwitchPlayer);