export const Types = {
    VIDEO_PRESENTATION_PLAY: "VIDEO_PRESENTATION_PLAY",
    VIDEO_PRESENTATION_PAUSE: "VIDEO_PRESENTATION_PAUSE",
    VIDEO_PRESENTATION_SEEK: "VIDEO_PRESENTATION_SEEK",
  };
  
  export class Actions {
  
    static play() {
      return {
        type: Types.VIDEO_PRESENTATION_PLAY
      };
    }
  
    static pause() {
      return {
        type: Types.VIDEO_PRESENTATION_PAUSE
      };
    }
  
    static seek(ts) {
      return {
        type: Types.VIDEO_PRESENTATION_SEEK,
        payload: { ts }
      };
    }
  }
  