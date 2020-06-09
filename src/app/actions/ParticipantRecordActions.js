import VoxeetSDK from '@voxeet/voxeet-web-sdk'
import bowser from 'bowser'

export const Types = {
    SAVE_DATA_FOR_RECORD: 'SAVE_DATA_FOR_RECORD',
    PARTICIPANT_PEER_RECORD_START: 'PARTICIPANT_PEER_RECORD_START',
    PARTICIPANT_PEER_RECORD_STOP: 'PARTICIPANT_PEER_RECORD_STOP',
    PARTICIPANT_INCREMENT_RECORD: 'PARTICIPANT_INCREMENT_RECORD',
    PARTICIPANT_PEER_RECORD_UPDATE: 'PARTICIPANT_PEER_RECORD_UPDATE'
}

export class Actions {

    static onParticipantPeerRecordStart(userId, stream, metadata) {
        return {
            type: Types.PARTICIPANT_PEER_RECORD_START,
            payload: {
                userId,
                stream,
                metadata
            }
        }
    }
    static incrementParticipantRecord(userId) {
        return {
            type: Types.PARTICIPANT_INCREMENT_RECORD,
            payload: {
                userId
            }
        }
    }
    static onParticipantPeerRecordUpdate(userId, stream) {
        return {
            type: Types.PARTICIPANT_PEER_RECORD_UPDATE,
            payload: {
                userId,
                stream
            }
        }
    }
    static saveDataForRecord(conferenceId, userData, mediaRecordedUrl, thirdPartyId, splitRecording, language) {
        return {
            type: Types.SAVE_DATA_FOR_RECORD,
            payload: {
                conferenceId,
                userData,
                mediaRecordedUrl,
                thirdPartyId,
                splitRecording,
                language
            }
        }
    }
    static onParticipantPeerRecordStop(userId, status) {
        return {
            type: Types.PARTICIPANT_PEER_RECORD_STOP,
            payload: {
                userId,
                status
            }
        }
    }
}
