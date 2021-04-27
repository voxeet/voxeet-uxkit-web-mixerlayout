import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AttendeesParticipantVideoPiP from "./AttendeesParticipantVideoPiP";
import AttendeesParticipantPiP from "./AttendeesParticipantPiP";
import VoxeetSDK from "@voxeet/voxeet-web-sdk";

@connect((state) => {
  return {
    participantsStore: state.voxeet.participants,
  };
})
class TilePiP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null,
      activeSpeaker: null,
      participants: props.participantsStore.participants,
    };
  }

  componentDidMount() {
    this.mounted = true;
    const { participants } = this.state;

    const index = participants.findIndex((p) => p.stream !== null);
    this.setState({ activeSpeaker: participants[index] });

    this._interval = setInterval(() => {
      const { activeSpeaker } = this.state;
      for (let participant of participants) {
        if (participant.participant_id && this.mounted)
          VoxeetSDK.conference.isSpeaking(
            VoxeetSDK.conference.participants.get(participant.participant_id),
            (isSpeaking) => {
              if (isSpeaking) {
                if (activeSpeaker != participant) {
                  this.setState({ activeSpeaker: participant });
                }
              }
            }
          );
      }
    }, 3000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.activeSpeaker != null &&
      this.state.activeSpeaker.participant_id !=
        nextState.activeSpeaker.participant_id
    ) {
      return true;
    } else {
      const tileVideoPiP = document.getElementById("video-participant-pip");
      if (
        tileVideoPiP == null &&
        nextState.activeSpeaker &&
        nextState.activeSpeaker.stream != null
      )
        return true;
      if (
        tileVideoPiP &&
        nextState.activeSpeaker &&
        nextState.activeSpeaker.stream == null
      )
        return true;
    }
    return false;
  }

  componentWillUnmount() {
    this.mounted = false;
    clearInterval(this._interval);
  }

  render() {
    const { activeSpeaker } = this.state;
    return (
      <div id="video-pip" className="video-pip">
          { activeSpeaker &&
            <Fragment>
              <AttendeesParticipantVideoPiP stream={activeSpeaker.stream ? activeSpeaker.stream : null} />
              { activeSpeaker.stream == null &&
                <AttendeesParticipantPiP participant={activeSpeaker} />
              }
            </Fragment>
          }
      </div>
    );
  }
}

TilePiP.propTypes = {
};

export default TilePiP;
