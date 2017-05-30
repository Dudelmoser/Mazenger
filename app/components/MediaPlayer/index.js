import React from "react";
import {findDOMNode} from "react-dom";
import screenfull from "screenfull";
import ReactPlayer from "react-player";
import {IconButton, LinearProgress, Slider} from "material-ui";
import PlayIcon from "material-ui/svg-icons/av/play-arrow";
import PauseIcon from "material-ui/svg-icons/av/pause";
import FullscreenIcon from "material-ui/svg-icons/navigation/fullscreen";
import MuteIcon from "material-ui/svg-icons/av/volume-off";
import UnmuteIcon from "material-ui/svg-icons/av/volume-up";
import muiThemeable from "material-ui/styles/muiThemeable";

/*
 * Audio and video player component.
 * Uses the internal react state to save volume, playback position etc.
 */
export class MediaPlayer extends React.PureComponent {

  /* Audio player height */
  static MIN_HEIGHT = 20;

  styles = {
    volume: {
      position: "relative",
      float: "right",
      width: 100,
      top: -10,
    },
    seeker: {
      position: "relative",
      top: -35,
    },
    buffer: {
      position: "relative",
      top: 0,
    },
    seekerBar: {
      height: 10,
    },
    player: {
      width: this.props.width,
      height: this.props.height || MediaPlayer.MIN_HEIGHT,
      backgroundColor: this.props.height ? "rgba(0,0,0,0.1)" : "transparent",
    },
    controls: {
      width: this.props.width
    }
  };

  state = {
    playing: false,
    volume: 0.8,
    prevVol: 0.8,
    played: 0,
    seek: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0
  };

  playPause = () => {
    this.setState({playing: !this.state.playing});
  };

  setVolume = (evt) => {
    this.setState({volume: parseFloat(evt.target.value)});
  };

  mute = () => {
    this.setState({
      prevVol: this.state.volume,
      volume: 0
    });
  };

  unmute = () => {
    this.setState({
      volume: this.state.prevVol,
    });
  };

  onSeekChange = (evt, value) => {
    this.setState({seek: parseFloat(value)});
  };

  onSeekUp = () => {
    this.player.seekTo(this.state.seek);
  };

  onProgress = (state) => {
    /* Update time slider only if the user is not currently seeking */
    if (!this.state.seeking) {
      this.setState(state)
    }
  };

  onDuration = (duration) => {
    this.setState({duration: duration});
  };

  onClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  };

  render() {
    const {playing, volume, played, loaded, playbackRate} = this.state;

    return (
      <div>
        <div style={this.styles.player}>
          <ReactPlayer
            ref={(player) => {this.player = player}}
            className="react-player"
            width={"100%"}
            height={"100%"}
            url={this.props.url}
            playing={playing}
            volume={volume}
            playbackRate={playbackRate}
            onPlay={() => this.setState({playing: true})}
            onPause={() => this.setState({playing: false})}
            onEnded={() => this.setState({playing: false})}
            onProgress={this.onProgress}
            onDuration={this.onDuration}
          />
        </div>

        <div style={this.styles.controls}>
          <div style={this.styles.seekerBar}>
            <LinearProgress
              max={1}
              mode="determinate"
              value={loaded}
              style={this.styles.buffer}
            />
            <Slider
              value={played}
              onChange={this.onSeekChange}
              onDragStop={this.onSeekUp}
              style={this.styles.seeker}
            />
          </div>

          <div>
            <IconButton onClick={this.playPause}>
              {playing ? <PauseIcon/> : <PlayIcon/>}
            </IconButton>
            <IconButton onClick={volume ? this.mute : this.unmute}>
              {volume ? <MuteIcon/> : <UnmuteIcon/>}
            </IconButton>
            <IconButton onClick={this.onClickFullscreen}>
              {this.props.height ? <FullscreenIcon/> : null}
            </IconButton>

            <Slider
              value={volume}
              onChange={this.setVolume}
              style={this.styles.volume}
            />
          </div>
        </div>
      </div>
    )
  }
}

MediaPlayer.propTypes = {
  url: React.PropTypes.string.isRequired,
  width: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  height: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
};

MediaPlayer.defaultProps = {
  width: 480,
  height: 270,
};

export default muiThemeable()(MediaPlayer);
