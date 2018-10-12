import { Types } from '../actions/ConferenceActions'

const defaultState = {
  screenShareMode: false,
  conferenceEnded: false,
  filePresentationMode: false,
  videoPresentationMode: false
}

const ConferenceReducer = (state = defaultState, action) => {
    switch (action.type) {
        case Types.CONFERENCE_LEAVE: {
          return state
        }
        case Types.CONFERENCE_ENDED: {
          return {
            ...state,
            screenShareMode: false,
            conferenceEnded: true,
            filePresentationMode: false
          }
        }
        case Types.CONFERENCE_START_SCREENSHARE: {
          return {
            ...state,
            screenShareMode: true
          }
        }
        case Types.CONFERENCE_START_VIDEO_PRESENTATION: {
          return {
            ...state,
            videoPresentationMode: true
          }
        }
        case Types.CONFERENCE_STOP_VIDEO_PRESENTATION: {
          return {
            ...state,
            videoPresentationMode: false
          }
        }
        case Types.CONFERENCE_START_FILE_PRESENTATION: {
          return {
            ...state,
            filePresentationMode: true
          }
        }
        case Types.CONFERENCE_STOP_SCREENSHARE: {
          return {
            ...state,
            screenShareMode: false
          }
        }
        case Types.CONFERENCE_STOP_FILE_PRESENTATION: {
          return {
            ...state,
            filePresentationMode: false
          }
        }
        default:
            return state
    }
}

export default ConferenceReducer
