import { Types } from "../actions/VideoPresentationActions";

const defaultState = {
    playing: false,
    ts: 0,
};

const VideoPresentationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Types.VIDEO_PRESENTATION_PLAY: {
      return {
        ...state,
        playing: true
      };
    }
    case Types.VIDEO_PRESENTATION_PAUSE: {
      return {
        ...state,
        playing: false
      };
    }
    case Types.VIDEO_PRESENTATION_SEEK: {
      return {
        ...state,
        ts: action.payload.ts
      };
    }
    default: {
      return state;
    }
  }
};

export default VideoPresentationReducer;
