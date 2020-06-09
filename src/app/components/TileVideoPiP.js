import React, { Component } from "react";
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
class TileVideoPiP extends Component {
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

    const index = this.props.participants.findIndex((p) => p.stream !== null);
    this.setState({ activeSpeaker: this.props.participants[index] });

    const { participants } = this.state;
    this._interval = setInterval(() => {
      for (let participant of participants) {
        if (participant.participant_id && this.mounted)
          VoxeetSDK.conference.isSpeaking(
            VoxeetSDK.conference.participants.get(participant.participant_id),
            (isSpeaking) => {
              const { activeSpeaker } = this.state;
              if (isSpeaking && participant.stream) {
                if (activeSpeaker != participant) {
                  this.setState({ activeSpeaker: participant });
                }
              }
            }
          );
      }
    }, 500);
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
        {activeSpeaker && activeSpeaker.stream && (
          <AttendeesParticipantVideoPiP stream={activeSpeaker.stream} />
        )}
      </div>
    );
  }
}

TileVideoPiP.propTypes = {
  participants: PropTypes.array.isRequired,
};

export default TileVideoPiP;
