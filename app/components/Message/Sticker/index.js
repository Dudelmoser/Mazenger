import React from "react";
import SpriteAnimator from "react-sprite-animator";

/*
A sticker component that shows either animated or static stickers
(in case they aren't animated or likely to be bugged).
*/
function Sticker(props) {

  const uri = props.sticker.get("spriteURI");
  const cols = props.sticker.get("framesPerRow");
  const frames = props.sticker.get("frameCount");
  const fps = props.sticker.get("frameRate");

  /* Extract the image width and height from the URL. */
  const width = props.sticker.get("width");
  const height = props.sticker.get("height");

  const widthRegex = /https:\/\/scontent.*fbcdn.net\/v\/.*\/.(.*)x.*/g;
  const widthMatches = widthRegex.exec(uri);
  const widthTotal = widthMatches && widthMatches.length === 2 ? widthMatches[1] : 0;

  const heightRegex = /https:\/\/scontent.*fbcdn.net\/v\/.*\/.*x(.*)\/.*/g;
  const heightMatches = heightRegex.exec(uri);
  const heightTotal = heightMatches && heightMatches.length === 2 ? heightMatches[1] : 0;

  /*
   Show stickers without or with a uneven sprite URI as static images.
   Those have bugged dimensions inside the URL and the API response for some reason.
   */
  if (!uri || (width % 120 && height % 120) || (widthTotal % 2 || heightTotal % 2))
    return <img src={props.sticker.get("url")}/>;

  return (
    <SpriteAnimator
      sprite={uri}
      width={width}
      height={height}
      frameCount={frames}
      wrapAfter={cols}
      fps={fps / 10}
    />
  );
}

Sticker.propTypes = {
  sticker: React.PropTypes.object.isRequired,
};

export default Sticker;
