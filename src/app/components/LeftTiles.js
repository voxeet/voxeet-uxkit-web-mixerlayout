import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TileVideo from './TileVideo'

class LeftTiles extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { participant, nbParticipant } = this.props
        return (
            <div className={'tile-item-stream tile-' + nbParticipant + (participant.isConnected ? ' participant-available' : ' participant-offline')}>
                <TileVideo stream={participant.stream} participant={participant} />
            </div>
        )
    }
}

LeftTiles.propTypes = {
    participant: PropTypes.object.isRequired,
    nbParticipant: PropTypes.number.isRequired
}

export default LeftTiles
