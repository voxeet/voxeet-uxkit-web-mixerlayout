import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Sdk from '../sdk'
import userPlaceholder from '../../static/images/user-placeholder.png'


class AttendeesParticipantVuMeter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSpeaking: false,
            avatarUrl: this.props.participant.avatarUrl || userPlaceholder
        }
    }

    componentDidMount() {
        const el = this.node
        const { participant } = this.props
        this._interval = setInterval(() => {
            Sdk.instance.isUserSpeaking(participant.participant_id, (isSpeaking) => {

                if (participant.isMuted && this.state.isSpeaking) {
                    this.setState({isSpeaking:false})
                }

                if (this.state.isSpeaking !== isSpeaking && !participant.isMuted)
                    this.setState({isSpeaking})
            })
        }, 100)
    }

    componentWillUnmount() {
        clearInterval(this._interval)
    }

    render() {
        const { height, width, includeName, participant } = this.props;
        let className = 'avatar-vumeter ';
        if (this.props.customClass !== undefined) {
            className += this.props.customClass
        }
        if (this.state.isSpeaking) {
            className += ' avatar-vumeter-active';
        }
        return (
            <div className="container-avatar-vumeter" width={width}>
                <img width={width} height={height} src={this.state.avatarUrl} className={className} />
                { includeName &&
                  <div className="avatar-vumeter-name">
                    {this.props.participant.name}
                  </div>
                }
            </div>
        )
    }
}

AttendeesParticipantVuMeter.propTypes = {
    participant: PropTypes.object.isRequired,
    customClass: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    includeName: PropTypes.bool
}

AttendeesParticipantVuMeter.defaultProps = {
  width: 60,
  height: 60,
  includeName: false
}

export default AttendeesParticipantVuMeter
