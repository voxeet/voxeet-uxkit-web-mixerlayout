import Sdk from '../sdk'
import bowser from 'bowser'
import axios from 'axios';
import { Actions as ConferenceActions } from './ConferenceActions'
import { Actions as ParticipantActions } from './ParticipantActions'
import { Actions as ParticipantWaitingActions } from './ParticipantWaitingActions'

export const Types = {
  CONFERENCE_LEAVE: "CONFERENCE_LEAVE",
  CONFERENCE_START_SCREENSHARE: "CONFERENCE_START_SCREENSHARE",
  CONFERENCE_START_FILE_PRESENTATION: "CONFERENCE_START_FILE_PRESENTATION",
  CONFERENCE_START_VIDEO_PRESENTATION: "CONFERENCE_START_VIDEO_PRESENTATION",
  CONFERENCE_UPDATE_FILE_PRESENTATION: "CONFERENCE_UPDATE_FILE_PRESENTATION",
  CONFERENCE_STOP_SCREENSHARE: "CONFERENCE_STOP_SCREENSHARE",
  CONFERENCE_STOP_VIDEO_PRESENTATION: "CONFERENCE_STOP_VIDEO_PRESENTATION",
  CONFERENCE_STOP_FILE_PRESENTATION: "CONFERENCE_STOP_FILE_PRESENTATION",
  CONFERENCE_ENDED: "CONFERENCE_ENDED"
}

export class Actions {

    static initialize(consumerKey, consumerSecret, userInfo) {
        return dispatch => {
            return this._initializeListeners(dispatch)
                .then(() => Sdk.instance.userId || Sdk.instance.initialize(consumerKey, consumerSecret, userInfo))
                .then()
                .catch(() => {
                  dispatch(this._conferenceEnded())
                })
        }
    }

    static initializeWithToken(token, userInfo, refreshToken, refreshUrl) {
           return dispatch => {
               return this._initializeListeners(dispatch)
                   .then(() => Sdk.instance.userId || Sdk.instance.initializeToken(token, userInfo, () => {
                       return axios.post(refreshUrl + "/v1/oauth2/mixer/refresh", { refresh_token: refreshToken })
                           .then(res => {
                               return res.data.access_token;
                           })
                   }))
                   .then()
                .catch(() => {
                  dispatch(this._conferenceEnded())
                })
        }
    }

    static join(conferenceId, constraints, userInfo) {
        return (dispatch, getState) => {
            return Sdk.instance.joinConference(conferenceId, {
                    constraints,
                    'audio3D': false,
                    ...userInfo,
                })
                .then()
                .catch()
        }
    }

    static replay(conferenceId, offset, userInfo) {
        return dispatch => {
            return Sdk.instance.replayConference(conferenceId, offset, userInfo)
                .then(res => {
                })
                .catch()
        }
    }

    static startVideoPresentationMode() {
      return {
          type: Types.CONFERENCE_START_VIDEO_PRESENTATION
      }
    }

    static stopVideoPresentationMode() {
      return {
          type: Types.CONFERENCE_STOP_VIDEO_PRESENTATION
      }
    }

    static startScreenShareMode() {
      return {
          type: Types.CONFERENCE_START_SCREENSHARE
      }
    }

    static startFilePresentationMode() {
      return {
          type: Types.CONFERENCE_START_FILE_PRESENTATION
      }
    }

    static stopScreenShareMode() {
      return {
          type: Types.CONFERENCE_STOP_SCREENSHARE
      }
    }

    static stopFilePresentationMode() {
      return {
          type: Types.CONFERENCE_STOP_FILE_PRESENTATION
      }
    }

    static leave() {
      return dispatch => {
        return Sdk.instance.leaveConference()
            .then(() => {
                dispatch({
                    type: Types.CONFERENCE_LEAVE
                })
            })
      }
    }

    static checkIfUpdateStatusUser(userId, status) {
      return (dispatch, getState) => {
          const { voxeet: { participantsWaiting } } = getState()
          const index = participantsWaiting.participants.findIndex(p => p.participant_id === userId)
          if (status != "Connecting" && status != "Inactive" && status != "Left") {
              dispatch(ParticipantActions.onParticipantStatusUpdated(userId, participantsWaiting.participants[index],status))
          }
      }
    }

    static checkIfUpdateUser(userId, stream) {
      return (dispatch, getState) => {
          const { voxeet: { participants } } = getState()
          const index = participants.participants.findIndex(p => p.participant_id === userId)
          if (index == -1) {
            const { voxeet: { participantsWaiting } } = getState()
            const index = participantsWaiting.participants.findIndex(p => p.participant_id === userId)
            dispatch(ParticipantActions.onParticipantStatusUpdated(userId, participantsWaiting.participants[index], "Connecting"))
          }
          dispatch(ParticipantActions.onParticipantUpdated(userId, stream))
      }
    }

    static checkIfUserExistScreenShareStart(userId, stream) {
      return (dispatch, getState) => {
          const { voxeet: { participants } } = getState()
          const index = participants.participants.findIndex(p => p.participant_id === userId)
          if (index == -1) {
            const { voxeet: { participantsWaiting } } = getState()
            const index = participantsWaiting.participants.findIndex(p => p.participant_id === userId)
            dispatch(ParticipantActions.onParticipantStatusUpdated(userId, participantsWaiting.participants[index], "Connecting"))
          }
          dispatch(this.startScreenShareMode())
          dispatch(ParticipantActions.onParticipantStartScreenShare(userId, stream))
      }
    }

    static checkIfUserExistFilePresentationStart(userId, data) {
      return (dispatch, getState) => {
          const { voxeet: { participants } } = getState()
          const index = participants.participants.findIndex(p => p.participant_id === userId)
          if (index == -1) {
            const { voxeet: { participantsWaiting } } = getState()
            const index = participantsWaiting.participants.findIndex(p => p.participant_id === userId)
            dispatch(ParticipantActions.onParticipantStatusUpdated(userId, participantsWaiting.participants[index], "Connecting"))
          }
          Sdk.instance.getImage(data.fileId, data.position).then((res) => {
            dispatch(this.startFilePresentationMode())
            dispatch(ParticipantActions.onParticipantStartFilePresentation(data.userId, data.position, res))
          })
      }
    }

    static checkIfUserExistVideoPresentationStart(userId, data) {
      return (dispatch, getState) => {
          const { voxeet: { participants } } = getState()
          const index = participants.participants.findIndex(p => p.participant_id === userId)
          if (index == -1) {
            const { voxeet: { participantsWaiting } } = getState()
            const index = participantsWaiting.participants.findIndex(p => p.participant_id === userId)
            dispatch(ParticipantActions.onParticipantStatusUpdated(userId, participantsWaiting.participants[index], "Connecting"))
          }
          dispatch(this.startVideoPresentationMode())
          dispatch(ParticipantActions.onParticipantStartVideoPresentation(userId, data.url, (data.timestamp / 1000)))
      }
    }

    static checkIfUserExistFilePresentationUpdated(userId, data) {
      return (dispatch, getState) => {
          const { voxeet: { participants } } = getState()
          const index = participants.participants.findIndex(p => p.participant_id === userId)
          if (index == -1) {
            const { voxeet: { participantsWaiting } } = getState()
            const index = participantsWaiting.participants.findIndex(p => p.participant_id === userId)
            dispatch(ParticipantActions.onParticipantStatusUpdated(userId, participantsWaiting.participants[index], "Connecting"))
          }
          Sdk.instance.getImage(data.fileId, data.position).then((res) => {
            dispatch(ParticipantActions.onParticipantUpdateFilePresentation(data.userId, data.position, res))
          })
      }
    }

    static _initializeListeners(dispatch) {
        return new Promise((resolve, reject) => {
              Sdk.instance.on('conferenceStatusUpdated', (status) => {
                console.log("CONFERENCE STATUS UPDATED");
              })

            Sdk.instance.on('participantAdded', (userId, userInfo) => {
                console.log("PARTICIPANT ADDED: " + userId);
                dispatch(ParticipantWaitingActions.onParticipantWaitingAdded(userId, userInfo))
            })

            Sdk.instance.on('conferenceLeft', () => {
                console.log("CONFERENCE LEFT");
                dispatch(this._conferenceEnded())
            })

            Sdk.instance.on('conferenceEnded', () => {
                console.log("CONFERENCE ENDED");
                dispatch(this._conferenceEnded())
            })

            Sdk.instance.videoPresentation.on('started', (data) => {
                console.log("RECORDING STARTED: " + data.userId + " / " + data.url + " / " + data.timestamp);
                dispatch(this.checkIfUserExistVideoPresentationStart(data.userId, data))
           });

           Sdk.instance.recording.on('stopped', () => {
                console.log("RECORDING STOPPED");
           });

            Sdk.instance.videoPresentation.on('stopped', (data) => {
                console.log("VIDEO PRESENTATION STOPPED");
                dispatch(this.stopVideoPresentationMode())
                dispatch(ParticipantActions.onParticipantStopVideoPresentation())
            });

            Sdk.instance.videoPresentation.on('play', (data) => {
                console.log("VIDEO PRESENTATION PLAY: " + data.timestamp);
                var videoPresentation = document.getElementById('video-file-presentation');
                videoPresentation.currentTime = (data.timestamp / 1000);
                videoPresentation.play();
            });

            Sdk.instance.videoPresentation.on('pause', (data) => {
                console.log("VIDEO PRESENTATION PAUSE: " + data.timestamp);
                var videoPresentation = document.getElementById('video-file-presentation');
                videoPresentation.currentTime = (data.timestamp / 1000);
                videoPresentation.pause();
            });

            Sdk.instance.videoPresentation.on('seek', (data) => {
                console.log("VIDEO PRESENTATION SEEK: " + data.timestamp);
                var videoPresentation = document.getElementById('video-file-presentation');
                videoPresentation.currentTime = (data.timestamp / 1000);
            });

            Sdk.instance.on('participantJoined', (userId, stream) => {
                console.log("PARTICIPANT JOINED: " + userId);
                dispatch(ParticipantActions.onParticipantJoined(userId, stream))
            })

            Sdk.instance.on('participantUpdated', (userId, stream) => {
                console.log("PARTICIPANT UPDATED: " + userId);
                dispatch(this.checkIfUpdateUser(userId, stream))
                //dispatch(ParticipantActions.onParticipantUpdated(userId, stream))
            })

            Sdk.instance.on('participantLeft', (userId) => {
                console.log("PARTICIPANT LEFT: " + userId);
                dispatch(ParticipantWaitingActions.onParticipantWaitingLeft(userId))
                dispatch(ParticipantActions.onParticipantLeft(userId))
            })

            Sdk.instance.on('participantStatusUpdated', (userId, status) => {
                console.log("PARTICIPANT STATUS UPDATED: " + userId);
                dispatch(this.checkIfUpdateStatusUser(userId, status))
                //dispatch(ParticipantActions.onParticipantStatusUpdated(userId, status))
            })

            Sdk.instance.on('screenShareStarted', (userId, stream) => {
                console.log("SCREENSHARE STARTED: " + userId);
                dispatch(this.checkIfUserExistScreenShareStart(userId, stream))
            })

            Sdk.instance.on('screenShareStopped', () => {
                console.log("SCREENSHARE STOPPED");
                dispatch(this.stopScreenShareMode())
                dispatch(ParticipantActions.onParticipantStopScreenShare())
            })

            Sdk.instance.on('filePresentationStarted', (data) => {
                console.log("FILE PRESENTATION STARTED: " + data.userId);
                dispatch(this.checkIfUserExistFilePresentationStart(data.userId, data))
            })

            Sdk.instance.on('filePresentationUpdated', (data) => {
                console.log("FILE PRESENTATION UPDATED: " + data.userId);
                dispatch(this.checkIfUserExistFilePresentationUpdated(data.userId, data))
            })

            Sdk.instance.on('filePresentationStopped', () => {
                console.log("FILE PRESENTATION STOPPED");
                dispatch(this.stopFilePresentationMode())
                dispatch(ParticipantActions.onParticipantStopFilePresentation())
            })

            resolve();
        })
    }

    static _conferenceEnded() {
        return {
          type: Types.CONFERENCE_ENDED
        }
    }

    static _conferenceJoined(conferenceId) {
        return {
        }
    }
}
