import React, { Component } from 'react';
import 'twitch-embed';

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
      options.width = 1280;
      options.height = 720;
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

	convertToTime(sec){
    sec = Number(sec);		
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor(sec % 3600 / 60);
    let seconds = Math.floor(sec % 3600 % 60);

		const times = [hours, minutes, seconds].map(time => time < 10 ? "0" + time : time);

    const hourShow = times[0] > 0 ? times[0] + ":" : "00:";
    const minuteShow = times[1] > 0 ? times[1] + ":" : "00:";
    const secondShow = times[2] > 0 ? times[2] : "00";

    return hourShow + minuteShow + secondShow; 
	}

  render() {
		return (
      <div>
			  <div id={this.state.id || ''} className="twitch-video-embed"></div>
        {this.generatePogs(this.props.emotes).map(moment => {
          return <button key={moment} onClick={() => this.updateTime(moment)}>{this.convertToTime(moment)}</button>
        })}
      </div>
		);
	}
}

export default TwitchPlayer;