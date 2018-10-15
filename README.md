Voxeet Layout Mixer
=====================

<p align="center">
<img src="https://www.voxeet.com/wp-content/themes/wp-theme/assets/images/logo.svg" alt="Voxeet SDK logo" title="Voxeet SDK logo" width="100"/>
</p>


## Table of contents

  1. [Project setup](#project-setup)
  1. [Customise](#customise)

## Project setup

 - Download
 - yarn i
 - yarn start

This Voxeet Mixer Layout use React with Redux. This means that the repository is composed by :

- Actions
- Reducers
- Components

There is also the styles inside :

- styles/css/index.css

## Customise

- Components

  ConferenceRoom.js:

  In this file you will find the entry point of the mixer. This will allow our system to begin your layout mixer and join the Conference.
  This file will decide which layout user depending on the situation (screenshare, video presentation, file presentation, conference with presenters, ...), the associated components will be mount. (listening for update from the server => User join, update on the stream, ...)

  ScreenShareMode.js:

  This components is used when a screenshare, file presentation or video presentation is begin. The layout will change depending on the situation.
    - TileVideoPiP.js => The video PiP from this presenter who screenshare, file presention or video presentation
    - AttendeesParticipantVideoPiP.js => This component will draw the PiP video (Called from TileVideoPiP.js)
    - TileVideoPresentation.js => This component is used when a presenter begin a video presentation (there is no VideoPiP for this one)
    - TileFilePresentation.js => This component is used when a presenter begin a file presentation (We can see the VideoPiP if the camera is turn on)
    - TileVideoScreenShare.js => This component is used when a presenter begin a screenshare (We can see the VideoPiP if the camera is turn on)

  Tile.js :

  This file is use for a classic conference with presenters (depending on the number of participant). The layout will re-render when a new presenter will join the conference.

    - TileVideo.js => This tile is used to determine if an user have turned on this camera or not (Called the associated component)
    - AttendeesParticipantVideo.js => This component is used when a presenter have his camera turned on (Called from TileVideo.js)
    - AttendeesParticipantVuMeter.js => This components is used when a presenter does not have the camera turned on, this will draw the avatar (Called from TileVideo.js)

- Actions/Reducers

  - ConferenceActions.js/ConferenceReducer.js => This action contains all events from the server (participant join, left, start screenshare, ...)
  - ParticipantActions.js/ParticipantReducer.js => This action contain all informations about CONNECTED users
  - ParticipantWaitingActions.js/ParticipantWaitingReducer.js => This action is for 'waiting' participant, when an users is not yet connected or is a listener. We will not add it like a participant (ParticipantActions, to prevent a useless re-render)

- Reducers

When your layout is ready to deploy, go to your account on https://developer.voxeet.com and add your Mixer layout url inside the input associated.

  -
© Voxeet, 2018
