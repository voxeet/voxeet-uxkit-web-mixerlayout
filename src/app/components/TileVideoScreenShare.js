import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AttendeesParticipantVideo from './AttendeesParticipantVideo'

class TileVideoScreenShare extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { participant, streamScreenshare } = this.props
        return (
            <span className="tile-video video-frame">
                <div id="tile-presenter" className="stream-media">
                    <AttendeesParticipantVideo stream={streamScreenshare} />
                </div>
            </span>
        )
    }
}

TileVideoScreenShare.propTypes = {
    participant: PropTypes.object.isRequired,
    streamScreenshare: PropTypes.object
}

export default TileVideoScreenShare
