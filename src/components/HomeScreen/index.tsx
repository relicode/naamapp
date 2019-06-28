import React, { Component } from 'react'
import { Alert, Image, Text, TouchableHighlight, View } from 'react-native'
import { NavigationEvents, NavigationScreenProps } from 'react-navigation'

import { action } from '../../store'
import { SYNC } from '../../store/dynamic-content/types'
import commonStyles, { GREEN } from '../../styles/common'
import { MainInfoScreenRecord } from '../../utils/types/dynamic-content'
import ListImageBackground from '../utils/ListImageBackground'
import { MAIN_SCREEN_NAMES, MainScreenNames, screenNameMap } from '../utils/StackContainer'
import landingScreenStyles from './styles'

const { alert } = Alert
const { columnStyle, textHeader } = commonStyles
const {
  landingScreenButtonStyle,
  landingScreenImageSectionStyle,
  landingScreenButtonSectionStyle,
} = landingScreenStyles

type HomeScreenProps = NavigationScreenProps
type AlternatePressFn = () => void

const backgroundImageMap: { [key in MainScreenNames]: any } = {
  Naamat20Years: require(`./navigation-icons/icon-Naamat20Years.png`),
  MainInfoScreenList: require(`./navigation-icons/icon-MainInfoScreenList.png`),
  PerformanceScreenList: require(`./navigation-icons/icon-PerformanceScreenList.png`),
  NaamatCam: require(`./navigation-icons/icon-NaamatCam.png`),
}

export default class HomeScreen extends Component<HomeScreenProps> {
  public handleScreenPress(screen: MainInfoScreenRecord) {
    alert(screen.title, screen.content)
  }

  public renderLandingScreenButton(screen: MainScreenNames, alternatePressFn?: AlternatePressFn) {
    return (
      <TouchableHighlight
        key={screen}
        underlayColor={GREEN}
        activeOpacity={1.00}
        style={ landingScreenButtonStyle }
        onPress={alternatePressFn ? alternatePressFn : () => this.props.navigation.navigate(screen)}
      >
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Image
            source={backgroundImageMap[screen]}
            style={{
              width: 75,
              height: 75,
            }}
          />
          <Text style={textHeader}>
            {screenNameMap[screen as MainScreenNames] || screen}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }

  public render() {
    return (
      <View style={columnStyle}>
        <View style={landingScreenImageSectionStyle}>
          <ListImageBackground />
        </View>
        <View style={landingScreenButtonSectionStyle}>
          <NavigationEvents
            onWillFocus={() => action({ type: SYNC })}
          />
          <View style={columnStyle}>
            {MAIN_SCREEN_NAMES.slice(0, 2).map((s) => this.renderLandingScreenButton(s))}
          </View>
          <View style={columnStyle}>
            {MAIN_SCREEN_NAMES.slice(2).map((s) => (
              s !== 'NaamatCam'
                ? this.renderLandingScreenButton(s)
                : this.renderLandingScreenButton(s, () => (
                  alert('Naamakamera', 'Ota kiva naamakuva kaverista tai lipusta tai jotain. Ei ehditty toteuttaa.')
                ))
            ))}
          </View>
        </View>
      </View>

    )
  }
}