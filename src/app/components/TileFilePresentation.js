import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TileFilePresentation extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { participant } = this.props
        return (
            <span id="tile-presenter" className="tile-presentation">
              <img src={participant.fileUrl} />
            </span>
        )
    }
}

TileFilePresentation.propTypes = {
    participant: PropTypes.object.isRequired,
}

export default TileFilePresentation
