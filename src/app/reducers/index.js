import { combineReducers } from 'redux'
import ConferenceReducer from './ConferenceReducer'
import ParticipantReducer from './ParticipantReducer'
import ParticipantWaitingReducer from './ParticipantWaitingReducer'

const reducers = combineReducers({
    conference: ConferenceReducer,
    participants: ParticipantReducer,
    participantsWaiting: ParticipantWaitingReducer
})

export default reducers
