import { combineReducers } from "redux";
import ConferenceReducer from "./ConferenceReducer";
import ParticipantReducer from "./ParticipantReducer";
import ParticipantWaitingReducer from "./ParticipantWaitingReducer";
import VideoPresentationReducer from "./VideoPresentationReducer";

const reducers = combineReducers({
  conference: ConferenceReducer,
  participants: ParticipantReducer,
  participantsWaiting: ParticipantWaitingReducer,
  videoPresentation: VideoPresentationReducer,
});

export default reducers;
