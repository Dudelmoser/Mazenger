import React from "react";
import {findDOMNode} from "react-dom";
import screenfull from "screenfull";
import ReactPlayer from "react-player";
import {IconButton, LinearProgress, Slider} from "material-ui";
import PlayIcon from "material-ui/svg-icons/av/play-arrow";
import PauseIcon from "material-ui/svg-icons/av/pause";
import FullscreenIcon from "material-ui/svg-icons/navigation/fullscreen";
import FasterIcon from "material-ui/svg-icons/av/fast-forward";
import SlowerIcon from "material-ui/svg-icons/av/fast-rewind";
import MuteIcon from "material-ui/svg-icons/av/volume-off";
import UnmuteIcon from "material-ui/svg-icons/av/volume-up";

export default class MediaPlayer extends React.PureComponent {

  static propTypes = {
    url: React.PropTypes.string,
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

  slowDown = () => {
    this.setState({playbackRate: this.state.playbackRate * .5});
  };

  speedUp = () => {
    this.setState({playbackRate: this.state.playbackRate * 2});
  };

  onSeekChange = (evt, value) => {
    this.setState({seek: value});
  };

  onSeekUp = () => {
    this.player.seekTo(this.state.seek);
  };

  onProgress = (state) => {
    // We only want to update time slider if we are not currently seeking
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
        <ReactPlayer
          ref={(player) => {this.player = player}}
          className="react-player"
          width="100%"
          height="100%"
          url={this.props.url}
          playing={playing}
          volume={volume}
          playbackRate={playbackRate}
          onPlay={() => this.setState({playing: true})}
          onPause={() => this.setState({playing: false})}
          onEnded={() => this.setState({playing: false})}
          onProgress={this.onProgress}
          onDuration={this.onDuration}
          // onReady={}
          // onStart={}
          // onError={}
          // onBuffer={}
        />

        <div>
          <Slider
            value={played}
            onChange={this.onSeekChange}
            onDragStop={this.onSeekUp}
          />
          <LinearProgress
            max="1"
            mode="determinate"
            value={loaded} />
        </div>

        <div>
          <IconButton onClick={this.playPause}>
            {playing ? <PauseIcon/> : <PlayIcon/>}
          </IconButton>
          <IconButton onClick={this.onClickFullscreen}>
            <FullscreenIcon/>
          </IconButton>
          <IconButton onClick={this.slowDown}>
            <SlowerIcon/>
          </IconButton>
          <IconButton
            onClick={this.speedUp}>
            <FasterIcon/>
          </IconButton>
          <IconButton onClick={volume ? this.mute : this.unmute}>
            {volume ? <MuteIcon/> : <UnmuteIcon/>}
          </IconButton>

          <Slider
            value={volume}
            onChange={this.setVolume}
            style={{
              width:100,
              float: "right",
              position: "relative",
              top: -10,
            }}
          />
        </div>
      </div>
    )
  }
}
