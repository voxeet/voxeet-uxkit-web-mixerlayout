import Sdk from '../sdk'
import bowser from 'bowser'

export const Types = {
  PARTICIPANT_WAITING_ADDED: 'PARTICIPANT_WAITING_ADDED',
  PARTICIPANT_WAITING_LEFT: 'PARTICIPANT_WAITING_LEFT'
}

export class Actions {

    static onParticipantWaitingAdded(userId, userInfo) {
      return {
        type: Types.PARTICIPANT_WAITING_ADDED,
        payload: {
            userId,
            userInfo,
        }
      }
    }
    static onParticipantWaitingLeft(userId) {
      return {
        type: Types.PARTICIPANT_WAITING_LEFT,
        payload: {
            userId
        }
      }
    }
}
