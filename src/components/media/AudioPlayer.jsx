import PropTypes from "prop-types";
function AudioPlayer({ src, style }) {
  return <audio style={style} src={src} controls preload="metadata"></audio>;
}

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default AudioPlayer;
