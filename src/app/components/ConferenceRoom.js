import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import '../../styles/css/index.css';
import ReactDOM from 'react-dom'
import Sdk from '../sdk'
import Tile from './Tile'
import ScreenShareMode from './ScreenShareMode'
import { Actions as ConferenceActions } from '../actions/ConferenceActions'
import { Actions as ParticipantActions } from '../actions/ParticipantActions'
import TileVideoPiP from './TileVideoPiP'
import hangUp from '../../static/images/hang-up.svg'

@connect((state) => {
    return {
        conferenceStore: state.voxeet.conference,
        participantsStore: state.voxeet.participants
    }
})

class ConferenceRoom extends Component {

  constructor(props) {
      super(props);
      this.state = {
        isLaunch: false,
        layoutType: "record"
      }
  }

  componentDidMount() {
    Sdk.create()
  }

  launchConference() {

    /* FOR DEBUG !
    const constraints = {
      video: false,
      audio:false
    }
    const userInfo = {user: {type: 'mixer'}}
    const initialized = this.props.dispatch(ConferenceActions.initialize("consumerKey", "consumerSecret", { name: "Mixer", externalId: 'Mixer_' }))
    initialized.then(() => this.props.dispatch(ConferenceActions.join("conference_name", constraints, userInfo)).then(() => this.setState({ isLaunch: true })))
    */

    const accessToken = document.getElementById("accessToken").value
    const refreshToken = document.getElementById("refreshToken").value
    const refreshUrl = document.getElementById("refreshUrl").value
    const conferenceId = document.getElementById("conferenceId").value
    const thirdPartyId = document.getElementById("thirdPartyId").value
    const layoutType = document.getElementById("layoutType").value
    const userInfo = {user: {type: 'mixer'}}
    const constraints = {
      video: false,
      audio:false
    }
    const initialized = this.props.dispatch(ConferenceActions.initializeWithToken(accessToken, { name: "Mixer", externalId: 'Mixer_' + layoutType, thirdPartyId: thirdPartyId }, refreshToken, refreshUrl))
    initialized.then(() => this.props.dispatch(ConferenceActions.join(conferenceId, constraints, userInfo)).then(() => this.setState({ isLaunch: true, layoutType: layoutType })))
  }

  launchReplayConference() {
    const accessToken = document.getElementById("accessToken").value
    const refreshToken = document.getElementById("refreshToken").value
    const refreshUrl = document.getElementById("refreshUrl").value
    const conferenceId = document.getElementById("conferenceId").value
    const thirdPartyId = document.getElementById("thirdPartyId").value
    const layoutType = document.getElementById("layoutType").value
    const userInfo = {user: {type: 'user'}}
    /* FOR DEBUG
    const initialized = this.props.dispatch(ConferenceActions.initialize("consumerKey", "consumerSecret", { name: "Mixer", externalId: 'Mixer_' }))
    initialized.then(() => this.props.dispatch(ConferenceActions.replay("conferenceIdToReplay", 0, userInfo)).then(() => this.setState({ isLaunch: true, layoutType: layoutType })))
    */
    const initialized = this.props.dispatch(ConferenceActions.initializeWithToken(accessToken, { name: "Mixer", externalId: 'Mixer_' + layoutType, thirdPartyId: thirdPartyId }, refreshToken, refreshUrl))
    initialized.then(() => this.props.dispatch(ConferenceActions.replay(conferenceId, 0, userInfo)).then(() => this.setState({ isLaunch: true, layoutType: layoutType })))
  }

  hangup() {
    this.props.dispatch(ConferenceActions.leave()).then(() => {
      this.props.dispatch(ParticipantActions.clearParticipants())
    })
    this.setState({ isLaunch: false })
  }

  render() {
    const { participants } = this.props.participantsStore
    const { screenShareMode, conferenceEnded, filePresentationMode, videoPresentationMode } = this.props.conferenceStore
    const { isLaunch, layoutType } = this.state
    let count = -1;
    let participantConnected = participants.filter(p => p.isConnected)
    let className = "tiles-list"
    if (participantConnected.length <= 6) {
      className += "-" + participantConnected.length
    }
    return (
      <div>
      { !isLaunch && conferenceEnded &&
        <div className="conference-ended-picto">
            <div id="conferenceEndedVoxeet"></div>
        </div>
      }
      { isLaunch ?
        conferenceEnded ?
          <div className="conference-ended-picto">
              <div id="conferenceEndedVoxeet"></div>
          </div>
        :
        (screenShareMode || filePresentationMode || videoPresentationMode) ?
              <div className="tiles-container" data-number-user={participantConnected.length}>
                  <div id="conferenceStartedVoxeet"></div>
                  <div>
                    {
                      participantConnected.map((participant, i) => {
                        if ((participant.screenShare || participant.filePresentation) && participant.stream != null && participant.isConnected) {
                          return (<TileVideoPiP key={i} layoutType={layoutType} stream={participant.stream} />)
                        }
                      })
                    }
                    { participantConnected.length > 0 ?
                        <ScreenShareMode screenShareMode={screenShareMode} filePresentationMode={filePresentationMode} videoPresentationMode={videoPresentationMode} participants={participants} />
                    :
                      <div className="conference-empty">
                        <div className='wave -one'></div>
                        <div className='wave -two'></div>
                        <div className='wave -three'></div>
                        <div className='title'>Waiting for other participants...</div>
                      </div>
                    }
                  </div>
                  <div className="hangup-button">
                    <button
                      onClick={this.hangup.bind(this)}
                    ><img src={hangUp} /></button>
                  </div>
              </div>
        :
            <div className="tiles-container" data-number-user={participantConnected.length}>
                <div id="conferenceStartedVoxeet"></div>
                <div id="tile-list" className={className}>
                  { participantConnected.length > 0 ?
                    participantConnected.map((participant, i) => {
                        count = count + 1;
                        return (<Tile key={i} nbParticipant={count} participant={participant} />)
                    })
                  :
                    <div className="conference-empty">
                      <div className='wave -one'></div>
                      <div className='wave -two'></div>
                      <div className='wave -three'></div>
                      <div className='title'>Waiting for other participants...</div>
                    </div>
                  }
                </div>
                <div className="hangup-button">
                  <button
                    onClick={this.hangup.bind(this)}
                  ><img src={hangUp} /></button>
                </div>
            </div>
        :
            <div>
              <input type="hidden" value="accessToken" id="accessToken" name="accessToken"/>
              <input type="hidden" value="refreshToken" id="refreshToken" name="refreshToken"/>
              <input type="hidden" value="voxeet" id="conferenceId" name="conferenceId"/>
              <input type="hidden" value="refreshUrl" id="refreshUrl" name="refreshUrl"/>
              <input type="hidden" value="1234" id="thirdPartyId" name="thirdPartyId"/>
              <input type="hidden" value="stream" id="layoutType" name="layoutType"/>
              <button id="joinConference" onClick={this.launchConference.bind(this)}>Join conference</button>
              <button id="replayConference" onClick={this.launchReplayConference.bind(this)}>Replay conference</button>
            </div>
      }
      </div>
    )
  }
}

export default ConferenceRoom;
