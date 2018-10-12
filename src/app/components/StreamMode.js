import React, { Component } from 'react'
import PropTypes from 'prop-types'

import RightTile from './RightTile'
import LeftTiles from './LeftTiles'

class StreamMode extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { participants } = this.props
        let count = -1;
        return (
          <div>
            <div className="left-panel">
            {
              participants.map((participant, i) => {
                count = count + 1;
                return (<LeftTiles participant={participant} key={i} nbParticipant={count} />);
              })
            }
            </div>
            <div className="focus">
              <RightTile participants={participants} />
            </div>
          </div>
        )
      }
}

StreamMode.propTypes = {
    participants: PropTypes.array.isRequired
}

export default StreamMode
