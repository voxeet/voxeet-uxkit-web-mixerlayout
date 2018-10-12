import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AttendeesParticipantVideoPiP from './AttendeesParticipantVideoPiP'

@connect((state) => {
    return {
        participantsStore: state.voxeet.participants
    }
})


class TileVideoPiP extends Component {

    constructor(props) {
        super(props)
    }

    shouldComponentUpdate() {
      return true
    }

    render() {
        const { stream, layoutType } = this.props
          return (
              <div id="video-pip" className={(layoutType == "record" || layoutType == "replay") ? "video-pip bottom-left" : "video-pip top-left"}>
                  <AttendeesParticipantVideoPiP stream={stream} />
              </div>
          )
    }
}

TileVideoPiP.propTypes = {
    stream: PropTypes.object.isRequired,
    layoutType: PropTypes.string,
}

export default TileVideoPiP
