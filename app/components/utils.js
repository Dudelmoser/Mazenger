import {drawerWidthPerc} from "../containers/App/components";
import MediaPlayer from "./MediaPlayer/index";
import * as React from "react";

/*
 * Factory function that creates a video player for videos and an audio player for audio files.
 * Returns null for unsupported file types, which is quite uncommon for React components
 * (hence the factory).
 */

/* Regular expressions for type checking. */
export const URL_REGEX = /^https?:\/\/.*/i;
export const IMAGE_REGEX = /^https?:\/\/.*\/.*(\.jpg|\.jpeg|\.png|\.bmp|\.gif)(\?.*)?$/i;
export const AUDIO_REGEX = /^https?:\/\/.*\/.*(\.mp4|\.mp3|\.ogg)(\?.*)?$/i;
export const VIDEO_REGEX = /^https?:\/\/.*\/.*(\.mp4|\.webm|\.ogv|\.mpd|\.m3u8)(\?.*)?$/i;
export const STREAM_REGEX = /^https?:\/\/(www.youtube.com\/watch\?v=|soundcloud.com|www.facebook.com\/facebook\/videos|vimeo.com|streamable.com|vid.me|home.wistia.com\/medias|www.dailymotion.com\/video|video.xx.fbcdn.net).*$/i;

const FB_PROXY_URL = "https://l.facebook.com/l.php?u=";

/* Extract real URL from facebook proxy URL. */
export function unwrapFacebookProxyURL(url) {
  let plain = url;
  /* Only decode the URL and discard GET params if it's a proxy URL. */
  if (url.startsWith(FB_PROXY_URL))
    plain = decodeURIComponent(url
      .substr(0, url.indexOf("&"))
      .replace("https://l.facebook.com/l.php?u=", "")
    );
  return plain;
}

export function createMediaPlayer(props) {
  /*
   * Player width and height calculated as a function of the thread width times 2/3
   * (which is in turn dependent on the width of the two drawers based on the window width).
   * Should ideally be calculated inside a container and passed via properties...
   */
  const width = window.innerWidth * 2 * drawerWidthPerc * 0.67;
  const height = 9 / 16.0 * width;

  /* Extract real URL from facebook proxy URL. */
  const url = unwrapFacebookProxyURL(props.url)

  /* Checks the type property to avoid displaying mp4-audio in a video player. */
  if (AUDIO_REGEX.test(url) && props.type !== "video") {
    return (
      <MediaPlayer
        url={url}
        width={width}
        height={0}
      />
    );
  }
  if (VIDEO_REGEX.test(url) || STREAM_REGEX.test(url)) {
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
