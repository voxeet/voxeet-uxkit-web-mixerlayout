import React, { Component } from "react";
import PropTypes from "prop-types";
import userPlaceholder from "../../static/images/user-placeholder.png";

class AttendeesParticipantPiP extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { height, width, participant } = this.props;
    return (
      <div className="participant-pip" width={width}>
        <img src={this.props.participant.avatarUrl || userPlaceholder} />
      </div>
    );
  }
}

AttendeesParticipantPiP.propTypes = {
  participant: PropTypes.object.isRequired,
};

export default AttendeesParticipantPiP;
