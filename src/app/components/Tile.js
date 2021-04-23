import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TileVideo from './TileVideo'

class Tile extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { participant, nbParticipant, participantConnected } = this.props
        let calcWidth = 1;
        let calcHeight  = 0.5;
        if (participantConnected <= 12) {
            if (participantConnected == 1) {
                calcHeight = 1;
            }
            if (participantConnected == 2) {
                calcWidth = 0.5;
            } else {
                if (participantConnected % 2 == 0) {
                    calcWidth = 2 / participantConnected
                } else {
                    calcWidth = 2 / (participantConnected + 1);
                }
            }
        } else {
            if (participantConnected % 2 == 0) {
                calcWidth = (participantConnected / 6) / participantConnected
            } else {
                calcWidth = (participantConnected / 6) / (participantConnected + 1);
            }
            calcHeight = 1 / (Math.ceil(participantConnected / 6));
        }

        return (
            <div id="tile-item" style={{height: (calcHeight * 100) + '%', width: calcWidth * 100 + '%'}} className={'tile-item tile-generic' + (participant.isConnected ? ' participant-available' : ' participant-offline')}>
                <TileVideo width={100} stream={participant.stream} participant={participant} />
            </div>
        )
    }
}

Tile.propTypes = {
    participantConnected: PropTypes.number.isRequired,
    participant: PropTypes.object.isRequired,
    nbParticipant: PropTypes.number.isRequired
}

export default Tile
