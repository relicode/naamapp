# NaamApp

Naamat 20 years app

## Requirements

`Node v10.16.0 LTS` or higher. Yarn and global `React Native`.

### Generic

##### Node.js

The preferred way to use `node.js` for the project is via [nvm](https://github.com/nvm-sh/nvm#installation-and-update).

##### React Native and other project dependencies

Run `npm install -g react-native-cli` to install react-native-cli.
Run `yarn` to install dependencies.

### Android

##### OpenJDK

Installable [here](https://adoptopenjdk.net/)

##### Android Studio

[Android Studio](https://developer.android.com/studio/index.htm) installs the latest Android SDK by default. Building Swipe-app requires the Android 9 (Pie) SDK in particular.

> The SDK Manager can also be found within the Android Studio "Preferences" dialog, under Appearance & Behavior → System Settings → Android SDK.

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 9 (Pie) entry, then make sure the following items are checked:

`Android SDK Platform 28`
`Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image`

Add the following lines to your `\$HOME/.bash_profile` file:

`export ANDROID_HOME=$HOME/Android/Sdk`
`export PATH=$PATH:$ANDROID_HOME/emulator`
`export PATH=$PATH:$ANDROID_HOME/tools`
`export PATH=$PATH:$ANDROID_HOME/tools/bin`
`export PATH=$PATH:$ANDROID_HOME/platform-tools`

### iOS

???

### Development tools

##### Watchman

Follow the [Watchman](https://facebook.github.io/watchman/docs/install.html#buildinstall) installation guide to compile and install Watchman from source.

##### For debugging, install global react-native-debugger

Install binary from `https://github.com/jhen0409/react-native-debugger/releases`

## Setup

Copy the .env.base file as .env and set the following environment variables:

`API_BASE_URL` Base url for API

## Development

1. (Android only) Run emulator `emulator @<emulator name>`

2. (Android only) Run Metro Bundler `yarn start`

3. Run React Native Debugger `react-native-debugger` (Optional but highly recommended)
  3.5 You can also run the above commands at once using `EMULATOR=<emulator name> yarn server`

4. Launch Application
   **Android:** `yarn run:android`
   **iOS:** `yarn run:ios`

5. Wave gesture
   In order to enable developer options in the application use `ctrl-m` or iOS equivalent. If this does not work, you can send the shake gesture from the CLI: `yarn shake`.

## Building

### Signing APK

Android requires that all apps be digitally signed with a certificate before they can be installed, so to distribute your Android application via Google Play store, you'll need to [generate a signed release APK](https://facebook.github.io/react-native/docs/signed-apk-android).

### Building the APK

For debug `build:debug` and for release `build:release`.

