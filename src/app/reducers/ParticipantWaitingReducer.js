import { Types } from '../actions/ParticipantWaitingActions'
import Sdk from '../sdk'
import { STATUS_CONNECTING, STATUS_LEFT, STATUS_INACTIVE, STATUS_CONNECTED } from '../constants/ParticipantStatus'

const defaultState = {
  participants: []
}

const ParticipantWaitingReducer = (state = defaultState, action) => {
    switch (action.type) {
        case Types.PARTICIPANT_WAITING_ADDED: {
          const userInfo = action.payload.userInfo
          if (Sdk.instance.userId != action.payload.userId) {
              let participants = state.participants
              const index = participants.findIndex(p => p.participant_id === action.payload.userId)
              if (index === -1) {
                  participants.push({
                      'participant_id': action.payload.userId,
                      'name': userInfo.name,
                      'avatarUrl': userInfo.avatarUrl,
                      'externalId': userInfo.externalId,
                      'metadata': userInfo.metadata,
                      'isAdmin': (userInfo.metadata.admin === 'true'),
                      'isConnected': false,
                      'status': userInfo.status,
                      'screenShare': false,
                      'isListener': true,
                      'filePresentation': false,
                      'videoPresentation': false,
                      'videoPresentationTime': 0,
                      'isMuted': false,
                      'x' : -1,
                      'y' : -1
                  })
              }
              return {
                  ...state,
                  participants: [...participants]
              }
          }
          return state
        }
        case Types.PARTICIPANT_WAITING_LEFT: {
            const participants = state.participants
            const index = participants.findIndex(p => p.participant_id === action.payload.userId);

            if (Sdk.instance.userId === action.payload.userId) return { ...state, participants: [] }

            if (index === -1) return state
            participants[index].isConnected = false
            participants[index].status = STATUS_LEFT

            return {
                ...state,
                participants: [...participants]
            }
        }
        default:
            return state
    }
}

export default ParticipantWaitingReducer
