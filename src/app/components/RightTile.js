import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TileVideo from './TileVideo'
import TileVideoPiP from './TileVideoPiP'
import TileFilePresentation from './TileFilePresentation'
import TileVideoPresentation from './TileVideoPresentation'

class RightTile extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { participants } = this.props
        return (
          <div>
            {
              participants.map((participant, i) => {
                if (participant.screenShare && participant.isConnected) {
                  return (
                    <div key={i} className={'tile-screenshare-stream-mode tile-current-screenshare-stream-mode' + (participant.isConnected ? ' participant-available' : ' participant-offline')}>
                        <TileVideo stream={participant.streamScreenshare} participant={participant} />
                        { participant.stream &&
                          <TileVideoPiP stream={participant.stream} />
                        }
                    </div>
                  )
                } else if (participant.filePresentation && participant.isConnected) {
                  return (
                    <div key={i} className={'tile-screenshare-stream-mode tile-current-screenshare-stream-mode' + (participant.isConnected ? ' participant-available' : ' participant-offline')}>
                        <TileFilePresentation participant={participant} />
                        { participant.stream &&
                          <TileVideoPiP stream={participant.stream} />
                        }
                    </div>
                  )
                } else if (participant.videoPresentation && participant.isConnected) {
                  return (
                    <div key={i} className={'tile-screenshare-stream-mode tile-current-screenshare-stream-mode' + (participant.isConnected ? ' participant-available' : ' participant-offline')}>
                        <TileVideoPresentation participant={participant} />
                    </div>
                  )
                }
              })
            }

            {/*<div className="screenshare-participant-bar">
            {
              participants.map((participant, i) => {
                if (!participant.screenShare && !participant.filePresentation && !participant.videoPresentation && participant.isConnected) {
                  return(
                      <div key={i} className={'tile-screenshare' + (participant.isConnected ? ' participant-available' : ' participant-offline')}>
                        <TileVideo stream={participant.stream} participant={participant} />
                      </div>
                  )
                }
              })
            }
            </div>*/}
          </div>
        )
    }
}

RightTile.propTypes = {
    participants: PropTypes.array.isRequired
}

export default RightTile
