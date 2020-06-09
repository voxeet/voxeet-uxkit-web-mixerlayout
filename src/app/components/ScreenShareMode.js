import React, { Component } from "react";
import PropTypes from "prop-types";

import TileVideoScreenShare from "./TileVideoScreenShare";
import TileFilePresentation from "./TileFilePresentation";
import TileVideoPresentation from "./TileVideoPresentation";

class ScreenShareMode extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let presentationHasBeenStarted = false;
    const {
      participants,
      screenShareMode,
      filePresentationMode,
      videoPresentationMode,
    } = this.props;
    return (
      <div>
        {participants.map((participant, i) => {
          if (
            participant.videoPresentation &&
            participant.isConnected &&
            !presentationHasBeenStarted
          ) {
            presentationHasBeenStarted = true;
            return (
              <div
                key={i}
                className={
                  "tile-screenshare tile-current-screenshare" +
                  (participant.isConnected
                    ? " participant-available"
                    : " participant-offline")
                }
              >
                <TileVideoPresentation participant={participant} />
              </div>
            );
          } else if (
            participant.screenShare &&
            participant.isConnected &&
            !presentationHasBeenStarted
          ) {
            presentationHasBeenStarted = true;
            return (
              <div
                key={i}
                className={
                  "tile-screenshare tile-current-screenshare" +
                  (participant.isConnected
                    ? " participant-available"
                    : " participant-offline")
                }
              >
                <TileVideoScreenShare
                  streamScreenshare={participant.streamScreenshare}
                  participant={participant}
                />
              </div>
            );
          } else if (
            participant.filePresentation &&
            participant.isConnected &&
            !presentationHasBeenStarted
          ) {
            presentationHasBeenStarted = true;
            return (
              <div
                key={i}
                className={
                  "tile-screenshare tile-current-screenshare" +
                  (participant.isConnected
                    ? " participant-available"
                    : " participant-offline")
                }
              >
                <TileFilePresentation participant={participant} />
              </div>
            );
          }
        })}
      </div>
    );
  }
}

ScreenShareMode.propTypes = {
  participants: PropTypes.array.isRequired,
  screenShareMode: PropTypes.bool.isRequired,
  filePresentationMode: PropTypes.bool.isRequired,
  videoPresentationMode: PropTypes.bool.isRequired,
};

export default ScreenShareMode;
