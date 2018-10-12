import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AttendeesParticipantVideo from './AttendeesParticipantVideo'

class TileVideoPresentation extends Component {

    constructor(props) {
      super(props)
    }

    componentDidMount() {
      var videoPresentation = document.getElementById('video-file-presentation');
      videoPresentation.currentTime = this.props.participant.videoPresentationTime;
    }

    render() {
        const { participant } = this.props
        return (
          <span className="tile-video video-frame">
              <div id="tile-presenter" className="stream-media">
                  <video
                      id="video-file-presentation"
                      className="video-participant"
                      src={participant.videoUrl}
                      width={"80"}
                      height={"80"}
                      autoPlay
                  />
              </div>
          </span>
        )
    }
}

TileVideoPresentation.propTypes = {
    participant: PropTypes.object.isRequired,
}

export default TileVideoPresentation
