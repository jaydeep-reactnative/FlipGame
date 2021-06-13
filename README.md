# FlipGame

The repository for FlipGame.

**Project Name**: `FlipGame`

**Bundle Id**: `com.flipgame`

**Package Name**: `com.flipgame`

[![react-native](https://img.shields.io/badge/react--native-0.64.2-brightgreen)](https://facebook.github.io/react-native/docs/getting-started) [![code-style](https://img.shields.io/badge/code%20style-standard%20JS-brightgreen)](https://standardjs.com/)
---

##  Project Desctiption
A mobile game to flip cards and check scores. 

![alt text](https://github.com/justjd1992/FlipGame/blob/main/Home.png?raw=true)

## Prerequisites

**iOS** : XCode(12.4)

**Android** : Android Studio(4.2.1) with gradle(6.7)

**Editor** : Visual Studio Code

## Main technologies used

- [React Native](https://github.com/facebook/react-native)
A framework for building native apps with React.

- [Redux](http://redux.js.org/)
A state management library used to manage data used by application.

- [Redux Persist](https://github.com/rt2zz/redux-persist)
A persister, which persist and rehydrate a redux store

## How to Setup Project

_Steps to setup the project_

**Step 1:** Clone this repository.

**Step 2:** Go to the cloned repo and open in in termianl.

**Step 3:** Install the Application with `yarn install`

**Step 4:** Install pods with `npx pod install`

**Step 5:** Run Jetify for Third Party library convert in AndroidX `npx jetify`(This needs to be done only for first time after checking out the repo. And for all projects having react-native 0.60 onwards)

## How to Run the Project

_Steps to run the project in ios and andorid_

1. cd to the project directory
2. Run and build for either OS
    * Run iOS app
        ```bash 
        npx react-native run-ios
        ```
    * Run Android app
      * Start Genymotion or Native emulator
      ```bash 
      npx react-native run-android
      ```

## Extra steps for android

- None

## Extra steps for ios

- You will need all the certificates to run the ios project in a real device.
 