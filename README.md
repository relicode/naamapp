
# Naamapp
Official React Native application for the Naamat festival

## Requirements

Yarn, Global React Native and JDK.

### [Oracle JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

### [Android Studio](https://developer.android.com/studio/index.htm)

## Installation

### React Native

`npm install -g react-native-cli`

### Android studio

Android Studio installs the latest Android SDK by default. Building Naamapp requires the Android 9 (Pie) SDK in particular.

> The SDK Manager can also be found within the Android Studio "Preferences" dialog, under Appearance & Behavior → System Settings → Android SDK.

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 9 (Pie) entry, then make sure the following items are checked:

`Android SDK Platform 28`
`Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image`

Add the following lines to your $HOME/.bash_profile config file:

`export ANDROID_HOME=$HOME/Android/Sdk`
`export PATH=$PATH:$ANDROID_HOME/emulator`
`export PATH=$PATH:$ANDROID_HOME/tools`
`export PATH=$PATH:$ANDROID_HOME/tools/bin`
`export PATH=$PATH:$ANDROID_HOME/platform-tools`

### Watchman
Follow the [Watchman](https://facebook.github.io/watchman/docs/install.html#buildinstall) installation guide to compile and install Watchman from source.

### For debugging, install global react-native-debugger
`npm install -g react-native-debugger`

### Project dependencies
Run `yarn` to install dependencies.

## Setup
Copy the .env.base file as .env and set the following environment variables:

`API_BASE_URL` Base url for NaamApi

## Development

### 1. Run emulator
`emulator @<emulator name>`

### 2. Run Metro Bundler
`yarn start`

### 3. Run React Native Debugger
`react-native-debugger`

### 4. Launch Android Application
`yarn run:android`

### 5. Wave gesture
In order to enable developer options in the application use `ctrl-m` or iOS equivalent. If this does not work, you can send the shake gesture from the CLI: `yarn shake`.

## Building

### Signing APK

Android requires that all apps be digitally signed with a certificate before they can be installed, so to distribute your Android application via Google Play store, you'll need to [generate a signed release APK](https://facebook.github.io/react-native/docs/signed-apk-android).

### Building the APK
For debug `build:debug` and for release `build:release`.

