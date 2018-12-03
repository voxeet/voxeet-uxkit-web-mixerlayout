Voxeet Layout Mixer
=====================

<p align="center">
<img src="https://www.voxeet.com/wp-content/themes/wp-theme/assets/images/logo.svg" alt="Voxeet SDK logo" title="Voxeet SDK logo" width="100"/>
</p>


## Table of contents

  1. [Concept](#concet)
  2. [Project setup](#project-setup)
  3. [Customise](#customise)
  4. [Generate Bundle](#generate-bundle)
  5. [Host and deploy](#host-and-deploy)
  6. [Tech](#tech)

## Concept

This layout is used by the Voxeet Mixer to record a conference. You can customise it but be sure to keep some important informations !

1. Some inputs are needed by our system to works. When you edit your layout, inside the file : ConferenceRoom.js, there is some inputs that our system will fill to start the recording.

  ```
  <input type="hidden" value="accessToken" id="accessToken" name="accessToken"/>
  <input type="hidden" value="refreshToken" id="refreshToken" name="refreshToken"/>
  <input type="hidden" value="voxeet" id="conferenceId" name="conferenceId"/>
  <input type="hidden" value="refreshUrl" id="refreshUrl" name="refreshUrl"/>
  <input type="hidden" value="1234" id="thirdPartyId" name="thirdPartyId"/>
  <input type="hidden" value="stream" id="layoutType" name="layoutType"/>
  <button id="joinConference" onClick={this.launchConference.bind(this)}>Join conference</button>
  <button id="replayConference" onClick={this.launchReplayConference.bind(this)}>Replay conference</button>
  ```

  You can just leave them blank; our system will fill informations to make this work properly.
  Our system is going to trigger the button join or replay (depending if it's a replay or a live conference)
  After that the layout is going to join or replay the conference and the mixer is going to record the entire conference.

2. Our system need to know when the conference is over. For that, you have to keep this :

  ```<div id="conferenceEndedVoxeet"></div>``` => Is render when the conference is over

  ```<div id="conferenceStartedVoxeet"></div>``` => Is render when the conference begin

  Our mixer is going to detect if the ```conferenceStartedVoxeet``` exist and will begin the record.
  Same thing for the conferenceEndedVoxeet, this will stop the recording.

  If you want an example, please refer to the ConferenceRoom.js.

  If you forgot to put this div inside your layout, the mixer will not work properly.

3. You can specify a different layout depending on the situation.

  For example, for a live record, our system will fill the input with id ```layoutType``` to : ```record``` and inside your layout you can do a particular layout for this situation

  Values possible are :
  - record => For live recording conference
  - replay => For replay a conference
  - stream => Stream on Youtube or Facebook
  - hls => HLS Streaming

## Project setup

 - Download ```git clone git@github.com:voxeet/voxeet-mix-layout.git```
 - ```yarn install```
 - ```yarn start```

This Voxeet Mixer Layout use React with Redux. This means that the repository is composed by :

- Actions
- Reducers
- Components

And style inside :

- ```styles/css/index.css```

## Test

There is a way to test your layout immediately. Inside the ```index.js``` file you will find the ```ConferenceRoom```. You need to enable the test mode with the ```isDemo``` props (Boolean). 
(Don't forget to put your own ```consumerKey``` and ```consumerSecret```)

! Don't forget to disable the testing mode before pushing in production !

## Customise

- Components

  ```ConferenceRoom.js``` :

  In this file you will find the entry point of the mixer. This will allow our system to begin your layout mixer and join the Conference.
  This file will decide which layout user depending on the situation (screenshare, video presentation, file presentation, conference with presenters, ...), the associated components will be mount. (listening for update from the server => User join, update on the stream, ...)

  ```ScreenShareMode.js``` :

  This components is used when a screenshare, file presentation or video presentation is begin. The layout will change depending on the situation.
    - ```TileVideoPiP.js``` => The video PiP from this presenter who screenshare, file presention or video presentation
    - ```AttendeesParticipantVideoPiP.js``` => This component will draw the PiP video (Called from TileVideoPiP.js)
    - ```TileVideoPresentation.js``` => This component is used when a presenter begin a video presentation (there is no VideoPiP for this one)
    - ```TileFilePresentation.js``` => This component is used when a presenter begin a file presentation (We can see the VideoPiP if the camera is turn on)
    - ```TileVideoScreenShare.js``` => This component is used when a presenter begin a screenshare (We can see the VideoPiP if the camera is turn on)

  ```Tile.js``` :

  This file is use for a classic conference with presenters (depending on the number of participant). The layout will re-render when a new presenter will join the conference.

    - ```TileVideo.js``` => This tile is used to determine if an user have turned on this camera or not (Called the associated component)
    - ```AttendeesParticipantVideo.js``` => This component is used when a presenter have his camera turned on (Called from TileVideo.js)
    - ```AttendeesParticipantVuMeter.js``` => This components is used when a presenter does not have the camera turned on, this will draw the avatar (Called from TileVideo.js)

- Actions/Reducers

  - ```ConferenceActions.js/ConferenceReducer.js``` => This action contains all events from the server (participant join, left, start screenshare, ...)
  - ```ParticipantActions.js/ParticipantReducer.js``` => This action contain all informations about CONNECTED users
  - ```ParticipantWaitingActions.js/ParticipantWaitingReducer.js``` => This action is for 'waiting' participant, when an users is not yet connected or is a listener. We will not add it like a participant (ParticipantActions, to prevent a useless re-render)


## Generate Bundle

```yarn run build```

This command will generate a bundle js of your project.

## Host and deploy

To make the layout works with our mixer, you will need to host and deploy.
When your layout is ready to deploy, go to your account on https://developer.voxeet.com and add your Mixer layout url inside the input associated.

## Tech

  * [Voxeet Web SDK](https://www.npmjs.com/package/@voxeet/voxeet-web-sdk) - The WEB SDK Voxeet to communicate with Voxeet Servers
  * [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces
  * [Redux](https://redux.js.org/) - Redux is a predictable state container for JavaScript apps.
  * [Webpack](https://webpack.js.org/) - Bundle your project

© Voxeet, 2018
