import { Types } from '../actions/ParticipantActions'
import Sdk from '../sdk'
import { STATUS_CONNECTING, STATUS_LEFT, STATUS_INACTIVE, STATUS_CONNECTED } from '../constants/ParticipantStatus'

const defaultState = {
  participants: []
}

const ParticipantReducer = (state = defaultState, action) => {
    switch (action.type) {
        case Types.PARTICIPANT_CLEAR: {
          return {
            ...state,
            participants: []
          }
        }
        case Types.PARTICIPANT_ADDED: {
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
        case Types.PARTICIPANT_LEFT: {
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
        case Types.PARTICIPANT_START_VIDEO_PRESENTATION: {
          const { userId } = action.payload;
          const participants = state.participants
          const index = participants.findIndex(p => p.participant_id === action.payload.userId)
          if (index === -1) return state
          participants[index].isConnected = true
          participants[index].videoUrl = action.payload.url
          participants[index].videoPresentation = true
          participants[index].videoPresentationTime = action.payload.timestamp
          return {
              ...state,
              participants: [...participants]
          }
        }
        case Types.PARTICIPANT_STOP_VIDEO_PRESENTATION: {
          let participants = state.participants
          participants.map((el, i) => {
            participants[i].videoUrl = null
            participants[i].videoPresentation = false
            participants[i].videoPresentationTime = 0
          })
          return {
              ...state,
              participants: [...participants]
          }
        }
        case Types.PARTICIPANT_START_FILE_PRESENTATION: {
              const { userId, position } = action.payload;
              const participants = state.participants
              const index = participants.findIndex(p => p.participant_id === action.payload.userId)
              if (index === -1) return state
              participants[index].isConnected = true
              participants[index].fileUrl = action.payload.url
              participants[index].filePosition = position
              participants[index].oldFilePosition = position
              participants[index].filePresentation = true
              return {
                  ...state,
                  participants: [...participants]
              }
        }
        case Types.PARTICIPANT_UPDATE_FILE_PRESENTATION: {
              const { userId, position, url } = action.payload;
              const participants = state.participants
              const index = participants.findIndex(p => p.participant_id === action.payload.userId)
              if (index === -1) return state
              participants[index].oldFilePosition = participants[index].filePosition
              participants[index].filePosition = position
              participants[index].fileUrl = url
              return {
                  ...state,
                  participants: [...participants]
              }
        }
        case Types.PARTICIPANT_STOP_FILE_PRESENTATION: {
            let participants = state.participants
            participants.map((el, i) => {
              participants[i].fileUrl = null
              participants[i].filePresentation = false
            })
            return {
                ...state,
                participants: [...participants]
            }
        }
        case Types.PARTICIPANT_START_SCREENSHARE: {
          const { userId } = action.payload;
              const participants = state.participants
              const index = participants.findIndex(p => p.participant_id === action.payload.userId)
              if (index === -1) return state
              participants[index].isConnected = true
              participants[index].streamScreenshare = null
              participants[index].screenShare = true
              if (action.payload.stream && action.payload.stream.getVideoTracks().length > 0) {
                  participants[index].streamScreenshare = action.payload.stream
              }
              return {
                  ...state,
                  participants: [...participants]
              }
        }
        case Types.PARTICIPANT_STATUS_UPDATED: {


          const userInfo = action.payload.userInfo
          const status = action.payload.status
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
                      'isAdmin': userInfo.isAdmin,
                      'isConnected': true,
                      'status': status,
                      'screenShare': false,
                      'isListener': false,
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



            /*const participants = state.participants
            console.log("PARTICIPANT STATUS UPDATED")
            const index = participants.findIndex(p => p.participant_id === action.payload.userId);
            if (Sdk.instance.userId === action.payload.userId) return state
            if (index === -1) return state
            participants[index].isConnected = false
            if (action.payload.status == STATUS_CONNECTED) {
              participants[index].isConnected = true
            }
            participants[index].status = action.payload.status
            return {
                ...state,
                participants: [...participants]
            }*/











        }
        case Types.PARTICIPANT_STOP_SCREENSHARE: {
          let participants = state.participants
          participants.map((el, i) => {
            participants[i].streamScreenshare = null
            participants[i].screenShare = false
          })
          return {
              ...state,
              participants: [...participants]
          }
        }
        case Types.PARTICIPANT_JOINED:{
        const { userId } = action.payload;
            if (Sdk.instance.userId === action.payload.userId) {
                if (action.payload.stream && action.payload.stream.getVideoTracks().length > 0) {
                    return {
                        ...state,
                        userStream: action.payload.stream
                    }
                }
                return state
            }
            const participants = state.participants
            const oldParticipants = state.participants
            const index = participants.findIndex(p => p.participant_id === action.payload.userId)
            if (index === -1) return state
            participants[index].isListener = false
            participants[index].isConnected = true
            participants[index].stream = null
            if (action.payload.stream && action.payload.stream.getVideoTracks().length > 0) {
                participants[index].stream = action.payload.stream
            }
            return {
                ...state,
                participantUpdated: userId,
                participants: [...participants]
            }
          }
        case Types.PARTICIPANT_UPDATED: {
          const { userId } = action.payload;
              if (Sdk.instance.userId === action.payload.userId) {
                  if (action.payload.stream && action.payload.stream.getVideoTracks().length > 0) {
                      return {
                          ...state,
                          userStream: action.payload.stream
                      }
                  }
                  return state
              }

              const participants = state.participants
              const oldParticipants = state.participants
              const index = participants.findIndex(p => p.participant_id === action.payload.userId)
              if (index === -1) return state
              participants[index].isConnected = true
              participants[index].stream = null
              if (action.payload.stream && action.payload.stream.getVideoTracks().length > 0) {
                  participants[index].stream = action.payload.stream
              }
              return {
                  ...state,
                  participantUpdated: userId,
                  participants: [...participants]
              }
            }
        default:
            return state
    }
}

export default ParticipantReducer
