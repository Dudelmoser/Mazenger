import {drawerWidthPerc} from "../../containers/App/components";
import MediaPlayer from "./index";
import * as React from "react";

/*
 * Factory function that creates a video player for videos and an audio player for audio files.
 * Returns null for unsupported file types, which is quite uncommon for React components
 * (hence the factory).
 */
export function createMediaPlayer(props) {
  /*
   * Player width and height calculated as a function of the thread width times 2/3
   * (which is in turn dependent on the width of the two drawers based on the window width).
   * Should ideally be calculated inside a container and passed via properties...
   */
  const width = window.innerWidth * 2 * drawerWidthPerc * 0.67;
  const height = 9 / 16.0 * width;

  /* Extract real URL from facebook proxy URL. */
  const url = props.url
    .replace("https://l.facebook.com/l.php?u=", "")
    .replace("%3A", ":").replace("%2F%2F", "//").replace("%2F", "/").replace("%3F", "?").replace("%3D", "=");

  /* Regex to check for playback compatibility. */
  const audioFile = /.*(\.mp4|\.mp3|\.ogg).*/i;
  const videoFile = /.*(\.mp4|\.webm|\.ogv|\.mpd|\.m3u8).*/i;
  const videoStream = /^https?:\/\/(www.youtube.com\/watch\?v=|soundcloud.com|www.facebook.com\/facebook\/videos|vimeo.com|streamable.com|vid.me|home.wistia.com\/medias|www.dailymotion.com\/video|video.xx.fbcdn.net).*$/i;

  /* Checks the type property to avoid displaying mp4-audio in a video player. */
  if (audioFile.test(url) && props.type !== "video") {
    return (
      <MediaPlayer
        url={url}
        width={width}
        height={0}
      />
    );
  }
  if (videoFile.test(url) || videoStream.test(url)) {
    return (
      <MediaPlayer
        url={url}
        width={width}
        height={height}
      />
    );
  }
  return null;
}
