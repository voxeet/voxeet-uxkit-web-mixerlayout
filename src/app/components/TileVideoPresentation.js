import React, { Component } from "react";
import PropTypes from "prop-types";
import AttendeesParticipantVideo from "./AttendeesParticipantVideo";
import { Actions as VideoPresentationActions } from "../actions/VideoPresentationActions";
import ReactPlayer from "react-player";
import { connect } from "react-redux";

@connect(store => {
  return {
    videoPresentation: store.voxeet.videoPresentation
  };
})

class TileVideoPresentation extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.videoPresentation.ts != prevProps.videoPresentation.ts) {
      this.videoPresentation.seekTo(this.props.videoPresentation.ts, "seconds");
    }
  }

  render() {
    const { participant } = this.props;
    const { ts, playing } = this.props.videoPresentation;
    return (
      <span className="tile-video video-frame">
        <div id="tile-presenter" className="stream-media">
          <ReactPlayer
            id="video-presentation"
            url={participant.videoUrl}
            playsinline
            ref={ref => (this.videoPresentation = ref)}
            playing={playing}
            controls={false}
            pip={false}
            width="100%"
            height="100%"
          />
        </div>
      </span>
    );
  }
}

TileVideoPresentation.propTypes = {
  participant: PropTypes.object.isRequired,
};

export default TileVideoPresentation;
