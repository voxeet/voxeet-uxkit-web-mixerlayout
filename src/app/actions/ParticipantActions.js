import Sdk from '../sdk'
import bowser from 'bowser'

export const Types = {
  PARTICIPANT_ADDED: 'PARTICIPANT_ADDED',
  PARTICIPANT_LEFT: 'PARTICIPANT_LEFT',
  PARTICIPANT_CLEAR: 'PARTICIPANT_CLEAR',
  PARTICIPANT_JOINED: 'PARTICIPANT_JOINED',
  PARTICIPANT_STATUS_UPDATED: 'PARTICIPANT_STATUS_UPDATED',
  PARTICIPANT_START_SCREENSHARE: 'PARTICIPANT_START_SCREENSHARE',
  PARTICIPANT_START_VIDEO_PRESENTATION: 'PARTICIPANT_START_VIDEO_PRESENTATION',
  PARTICIPANT_START_FILE_PRESENTATION: 'PARTICIPANT_START_FILE_PRESENTATION',
  PARTICIPANT_UPDATE_FILE_PRESENTATION: 'PARTICIPANT_UPDATE_FILE_PRESENTATION',
  PARTICIPANT_STOP_FILE_PRESENTATION: 'PARTICIPANT_STOP_FILE_PRESENTATION',
  PARTICIPANT_STOP_VIDEO_PRESENTATION: 'PARTICIPANT_STOP_VIDEO_PRESENTATION',
  PARTICIPANT_STOP_SCREENSHARE: 'PARTICIPANT_STOP_SCREENSHARE',
  PARTICIPANT_UPDATED: 'PARTICIPANT_UPDATED'
}

export class Actions {

    static onParticipantAdded(userId, userInfo) {
      return {
        type: Types.PARTICIPANT_ADDED,
        payload: {
            userId,
            userInfo,
        }
      }
    }

    static onParticipantLeft(userId) {
      return {
        type: Types.PARTICIPANT_LEFT,
        payload: {
            userId
        }
      }
    }

    static onParticipantJoined(userId, stream) {
      return {
          type: Types.PARTICIPANT_JOINED,
          payload: {
              userId,
              stream
          }
      }
    }

    static clearParticipants() {
      return {
          type: Types.PARTICIPANT_CLEAR
      }
    }

    static onParticipantStartScreenShare(userId, stream) {
      return {
          type: Types.PARTICIPANT_START_SCREENSHARE,
          payload: {
              userId,
              stream
          }
      }
    }

    static onParticipantStopFilePresentation() {
      return {
          type: Types.PARTICIPANT_STOP_FILE_PRESENTATION
      }
    }

    static onParticipantStartVideoPresentation(userId, url, timestamp) {
        return {
          type: Types.PARTICIPANT_START_VIDEO_PRESENTATION,
          payload: {
              userId,
              url,
              timestamp
          }
        }
    }

    static onParticipantStopVideoPresentation() {
      return {
          type: Types.PARTICIPANT_STOP_VIDEO_PRESENTATION
      }
    }

    static onParticipantUpdateFilePresentation(userId, position, url) {
      return {
          type: Types.PARTICIPANT_UPDATE_FILE_PRESENTATION,
          payload: {
              userId,
              position,
              url
          }
      }
    }

    static onParticipantStartFilePresentation(userId, position, url) {
      return {
          type: Types.PARTICIPANT_START_FILE_PRESENTATION,
          payload: {
              userId,
              position,
              url
          }
      }
    }

    static onParticipantStopScreenShare() {
      return {
          type: Types.PARTICIPANT_STOP_SCREENSHARE
      }
    }

    static onParticipantStatusUpdated(userId, userInfo, status) {
      return {
          type: Types.PARTICIPANT_STATUS_UPDATED,
          payload: {
              userId,
              userInfo,
              status
          }
      }
    }

    static onParticipantUpdated(userId, stream) {
      return {
          type: Types.PARTICIPANT_UPDATED,
          payload: {
              userId,
              stream
          }
      }
    }

}
