import VoxeetSDK from "@voxeet/voxeet-web-sdk";
import bowser from "bowser";

export const Types = {
  PARTICIPANT_WAITING_ADDED: "PARTICIPANT_WAITING_ADDED",
  PARTICIPANT_WAITING_JOINED: "PARTICIPANT_WAITING_JOINED",
  PARTICIPANT_WAITING_STATUS_UPDATED: "PARTICIPANT_WAITING_STATUS_UPDATED",
  PARTICIPANT_WAITING_LEFT: "PARTICIPANT_WAITING_LEFT",
};

export class Actions {
  static onParticipantWaitingAdded(userId, userInfo) {
    return {
      type: Types.PARTICIPANT_WAITING_ADDED,
      payload: {
        userId,
        userInfo,
      },
    };
  }
  static onParticipantWaitingJoined(userId, stream) {
    return {
      type: Types.PARTICIPANT_WAITING_JOINED,
      payload: {
        userId,
        stream,
      },
    };
  }
  static onParticipantWaitingStatusUpdated(userId, status) {
    return {
      type: Types.PARTICIPANT_WAITING_STATUS_UPDATED,
      payload: {
        userId,
        status,
      },
    };
  }
  static onParticipantWaitingLeft(userId) {
    return {
      type: Types.PARTICIPANT_WAITING_LEFT,
      payload: {
        userId,
      },
    };
  }
}
