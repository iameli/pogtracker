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

  render() {
		return (
      <div>
			  <div id={this.state.id || ''} className="twitch-video-embed"></div>
        <button onClick={() => this.updateTime(0)}>Start at 0</button>
        <button onClick={() => this.updateTime(60)}>1 minute</button>
        <button onClick={() => this.updateTime(300)}>5 minute</button>
        {this.props.pogs.map(pog => {
          return <button onClick={() => this.updateTime(pog)}>{pog}</button>
        })}
      </div>
		);
	}
}

export default TwitchPlayer;