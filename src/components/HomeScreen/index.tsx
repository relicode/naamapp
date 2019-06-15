import React, { Component } from 'react'
import { Alert, Text, TouchableHighlight, View } from 'react-native'
import { NavigationEvents, NavigationScreenProps } from 'react-navigation'

import { action } from '../../store'
import { SYNC } from '../../store/dynamic-content/types'
import commonStyles from '../../styles/common'
import { MainInfoScreenRecord } from '../../utils/types/dynamic-content'
import ListImageBackground from '../utils/ListImageBackground'
import { MAIN_SCREEN_NAMES, MainScreenNames, screenNameMap } from '../utils/StackContainer'
import landingScreenStyles from './styles'

const { alert } = Alert
const { rowStyle, columnStyle, textHeader } = commonStyles
const { landingScreenButtonStyle } = landingScreenStyles

type HomeScreenProps = NavigationScreenProps

export default class HomeScreen extends Component<HomeScreenProps> {
  public handleScreenPress(screen: MainInfoScreenRecord) {
    alert(screen.title, screen.content)
  }

  public renderLandingScreenButton(text: string, screen: MainScreenNames) {
    return (
      <TouchableHighlight
        key={text}
        underlayColor="white"
        activeOpacity={0.95}
        style={landingScreenButtonStyle}
        onPress={() => this.props.navigation.navigate(screen)}
      >
        <Text style={textHeader}>{screenNameMap[text as MainScreenNames] || text}</Text>
      </TouchableHighlight>
    )
  }

  public render() {
    return (
      <View style={columnStyle}>
        <View style={rowStyle}>
          <ListImageBackground />
        </View>
        <View style={rowStyle}>
          <NavigationEvents
            onWillFocus={() => action({ type: SYNC })}
          />
          <View style={columnStyle}>
            {MAIN_SCREEN_NAMES.slice(0, 2).map((s) => this.renderLandingScreenButton(s, s))}
          </View>
          <View style={columnStyle}>
            {MAIN_SCREEN_NAMES.slice(2).map((s) => this.renderLandingScreenButton(s, s))}
          </View>
        </View>
      </View>

    )
  }
}
