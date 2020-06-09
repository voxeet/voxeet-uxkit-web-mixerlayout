import { combineReducers } from 'redux'
import ConferenceReducer from './ConferenceReducer'
import ParticipantReducer from './ParticipantReducer'
import ParticipantWaitingReducer from './ParticipantWaitingReducer'
import ParticipantRecordReducer from './ParticipantRecordReducer'

const reducers = combineReducers({
    conference: ConferenceReducer,
    participants: ParticipantReducer,
    participantsWaiting: ParticipantWaitingReducer,
    participantsRecord: ParticipantRecordReducer
})

export default reducers
