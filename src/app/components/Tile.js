import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TileVideo from './TileVideo'

class Tile extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { participant, nbParticipant } = this.props
        return (
            <div id="tile-item" className={'tile-item tile-' + nbParticipant + (participant.isConnected ? ' participant-available' : ' participant-offline')}>
                <TileVideo stream={participant.stream} participant={participant} />
            </div>
        )
    }
}

Tile.propTypes = {
    participant: PropTypes.object.isRequired,
    nbParticipant: PropTypes.number.isRequired
}

export default Tile
