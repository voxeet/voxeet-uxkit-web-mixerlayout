import { Types } from '../actions/ParticipantRecordActions'
import axios from 'axios'
import https from 'https'
import VoxeetSDK from '@voxeet/voxeet-web-sdk'

const defaultState = {
  participantsRecord: [],
  mediaRecordedUrl: null,
  conferenceId: null,
  thirdPartyId: null,
  splitRecording: false,
  language: "en",
  userData: null
}

const ParticipantRecordReducer = (state = defaultState, action) => {
    switch (action.type) {
        case Types.SAVE_DATA_FOR_RECORD: {
            return {
              ...state,
              mediaRecordedUrl: action.payload.mediaRecordedUrl,
              userData: action.payload.userData,
              splitRecording: action.payload.splitRecording,
              conferenceId: action.payload.conferenceId,
              language: action.payload.language,
              thirdPartyId: action.payload.thirdPartyId
            }
          }
        case Types.PARTICIPANT_INCREMENT_RECORD :{
            if (!state.splitRecording) return state
            let participantsRecord = state.participantsRecord
            const index = participantsRecord.findIndex(p => p.userId === action.payload.userId);
            participantsRecord[index].nbRecord += 1
            return {
                ...state,
                participantsRecord: [...participantsRecord]
            }
        }
        case Types.PARTICIPANT_PEER_RECORD_UPDATE: {
            if (!state.splitRecording) return state
            let participantsRecord = state.participantsRecord
            const index = participantsRecord.findIndex(p => p.userId === action.payload.userId);
            const containAudio = action.payload.stream.getAudioTracks().length > 0 ? true : false;
            const containVideo = action.payload.stream.getVideoTracks().length > 0 ? true : false;
            /*if (participantsRecord[index].audio == containAudio && participantsRecord[index].video == containVideo) {
                return {
                    ...state,
                    participantsRecord: [...participantsRecord]
                }
            }*/
            if (participantsRecord[index].participantMediaRecord != null && participantsRecord[index].participantMediaRecord.state != "inactive") {
                participantsRecord[index].participantMediaRecord.stop()
                console.log("RECORDING STOPPED (update)")
            }

            let rec = new MediaRecorder(action.payload.stream);
            console.log("RECORDING STARTED (update)")
            rec.ondataavailable = e => {
                //let audioChunks = [];
                let participantsRecord = state.participantsRecord
                const index = participantsRecord.findIndex(p => p.userId === action.payload.userId);
                // console.log("SEND PACKAGE => userId: " + action.payload.userId)
                // console.log("SEND PACKAGE => nbRecord: " + participantsRecord[index].nbRecord)
                //audioChunks.push(e.data);
                const agent = new https.Agent({
                    rejectUnauthorized: false,
                });
                axios({
                    method: 'put',
                    url: state.mediaRecordedUrl + "/" + state.thirdPartyId + "/" + state.conferenceId + "/" + action.payload.userId + "/" + participantsRecord[index].nbRecord,
                    httpsAgent: agent,
                    headers: {
                        "Content-Type": "application/octet-stream",
                        "X-VOXEET-MR-TIMESTAMP": e.timeStamp,
                        "X-VOXEET-MR-TIMECODE": e.timecode,
                        "X-VOXEET-MR-USERDATA": state.userData
                    },
                    data: e.data,
                }).then((data) => {
                    //console.log("File successfully send")
                })
                .catch((err) => {
                    console.log("Error during PUT")
                    console.log(err)
                })
            }
            rec.onstop = e => {
                let participantsRecord = state.participantsRecord
                const index = participantsRecord.findIndex(p => p.userId === action.payload.userId);
                // console.log("THIS FILE IS OVER SENDING ... => userId: " + action.payload.userId)
                // console.log("THIS FILE IS OVER SENDING ... => nbRecord: " + participantsRecord[index].nbRecord)
                console.log("Recording stopped, posting data for userId: " + action.payload.userId + ", rec: " + participantsRecord[index].nbRecord)
                const agent = new https.Agent({
                    rejectUnauthorized: false,
                });
                axios({
                    method: 'post',
                    url: state.mediaRecordedUrl + "/" + state.thirdPartyId + "/" + state.conferenceId + "/" + action.payload.userId + "/" + participantsRecord[index].nbRecord,
                    httpsAgent: agent,
                    headers: {
                        "X-VOXEET-MR-TIMESTAMP": e.timeStamp,
                        "X-VOXEET-MR-TIMECODE": e.timecode,
                        "X-VOXEET-MR-USERDATA": state.userData,
                        "X-VOXEET-MR-METADATA": new Buffer(JSON.stringify(participantsRecord[index].metadata)).toString('base64')

                    }
                }).then((data) => {
                    console.log("File successfully send")
                })
                .catch((err) => {
                    console.log("Error during POST")
                    console.log(err)
                })
                participantsRecord[index].nbRecord += 1
                return {
                    ...state,
                    participantsRecord: [...participantsRecord]
                }
            }
            rec.start(500)
            participantsRecord[index].participantMediaRecord = rec
            participantsRecord[index].audio = containAudio
            participantsRecord[index].video = containVideo
            return {
                ...state,
                participantsRecord: [...participantsRecord]
            }
            return state
        }

        case Types.PARTICIPANT_PEER_RECORD_START: {
            if (!state.splitRecording) return state
            let participantsRecord = state.participantsRecord
            const index = participantsRecord.findIndex(p => p.userId === action.payload.userId);
            let rec = new MediaRecorder(action.payload.stream);
            console.log("RECORDING STARTED (start)")
            rec.ondataavailable = e => {
                /*let audioChunks = [];
                audioChunks.push(e.data);*/
                let participantsRecord = state.participantsRecord
                const index = participantsRecord.findIndex(p => p.userId === action.payload.userId);
                // console.log("SEND PACKAGE => userId: " + action.payload.userId)
                // console.log("SEND PACKAGE => nbRecord: " + participantsRecord[index].nbRecord)
                const agent = new https.Agent({
                    rejectUnauthorized: false,
                });
                axios({
                    method: 'put',
                    url: state.mediaRecordedUrl + "/" + state.thirdPartyId + "/" + state.conferenceId + "/" + action.payload.userId + "/" + participantsRecord[index].nbRecord,
                    httpsAgent: agent,
                    headers: {
                        "Content-Type": "application/octet-stream",
                        "X-VOXEET-MR-TIMESTAMP": e.timeStamp,
                        "X-VOXEET-MR-TIMECODE": e.timecode,
                        "X-VOXEET-MR-USERDATA": state.userData

                    },
                    data: e.data,
                }).then((data) => {
                    //console.log("File successfully send")
                })
                .catch((err) => {
                    console.log("Error during PUT")
                    console.log(err)
                })
            }
            rec.onstop = e => {
                let participantsRecord = state.participantsRecord
                const index = participantsRecord.findIndex(p => p.userId === action.payload.userId);
                // console.log("THIS FILE IS OVER SENDING ... => userId: " + action.payload.userId)
                // console.log("THIS FILE IS OVER SENDING ... => nbRecord: " + participantsRecord[index].nbRecord)
                console.log("Recording stopped, posting data for userId: " + action.payload.userId + ", rec: " + participantsRecord[index].nbRecord)
                const agent = new https.Agent({
                    rejectUnauthorized: false,
                });
                axios({
                    method: 'post',
                    url: state.mediaRecordedUrl + "/" + state.thirdPartyId + "/" + state.conferenceId + "/" + action.payload.userId + "/" + participantsRecord[index].nbRecord,
                    httpsAgent: agent,
                    headers: {
                        "X-VOXEET-MR-TIMESTAMP": e.timeStamp,
                        "X-VOXEET-MR-TIMECODE": e.timecode,
                        "X-VOXEET-MR-USERDATA": state.userData,
                        "X-VOXEET-MR-METADATA": new Buffer(JSON.stringify(participantsRecord[index].metadata)).toString('base64')

                    }
                })
                .then((data) => {
                })
                .catch((err) => {
                    console.log("Error during POST")
                    console.log(err)
                })
                participantsRecord[index].nbRecord += 1
                return {
                    ...state,
                    participantsRecord: [...participantsRecord]
                }
            }
            rec.start(500)
            participantsRecord.push({
                'userId': action.payload.userId,
                'metadata': action.payload.metadata,
                'audio': action.payload.stream.getAudioTracks().length > 0 ? true : false,
                'video': action.payload.stream.getVideoTracks().length > 0 ? true : false,
                'nbRecord': 1,
                'participantMediaRecord': rec
            })
            return {
                ...state,
                participantsRecord: [...participantsRecord]
            }
        }
        case Types.PARTICIPANT_PEER_RECORD_STOP: {
            if (!state.splitRecording) return state
            console.log("RECORD STOPPED")
            let participantsRecord = state.participantsRecord
            const index = participantsRecord.findIndex(p => p.userId === action.payload.userId);
            if (participantsRecord[index].participantMediaRecord != null && participantsRecord[index].participantMediaRecord.state != "inactive") {
                participantsRecord[index].participantMediaRecord.stop()
                participantsRecord[index].audio = false
                participantsRecord[index].video = false
                participantsRecord[index].participantMediaRecord = null
            }
            return {
                ...state,
                participantsRecord: [...participantsRecord]
            }
        }
        default:
            return state
    }
}

export default ParticipantRecordReducer
