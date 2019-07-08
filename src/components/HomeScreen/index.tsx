import React, { Component } from 'react'
import { Alert, Image, Text, TouchableHighlight, View } from 'react-native'
import { NavigationEvents, NavigationScreenProps } from 'react-navigation'
import { connect, MapStateToProps } from 'react-redux'

import { action, ReduxStoreState } from '../../store'
import { SYNC } from '../../store/dynamic-content/types'
import commonStyles, { GREEN } from '../../styles/common'
import { MainInfoScreenRecord } from '../../utils/types/dynamic-content'
import ListImageBackground from '../utils/ListImageBackground'
import NaamatModal from '../utils/NaamatModal'
import { MAIN_SCREEN_NAMES, MainScreenNames, screenNameMap } from '../utils/StackContainer'
import landingScreenStyles from './styles'

const { alert } = Alert
const { columnStyle, textHeader } = commonStyles
const {
  landingScreenButtonStyle,
  landingScreenImageSectionStyle,
  landingScreenButtonSectionStyle,
} = landingScreenStyles

interface StateProps {
  naamat20years: MainInfoScreenRecord | undefined,
  syncedAtLeastOnce: boolean,
}
type HomeScreenProps = NavigationScreenProps & StateProps
type AlternatePressFn = () => void

const backgroundImageMap: { [key in MainScreenNames]: any } = {
  Naamat20Years: require(`./navigation-icons/icon-Naamat20Years.png`),
  MainInfoScreenList: require(`./navigation-icons/icon-MainInfoScreenList.png`),
  PerformanceScreenList: require(`./navigation-icons/icon-PerformanceScreenList.png`),
  NaamatCam: require(`./navigation-icons/icon-NaamatCam.png`),
}

class HomeScreen extends Component<HomeScreenProps> {
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
        <NaamatModal visible={!this.props.syncedAtLeastOnce} content="Haetaan sisältöä..." />
        <View style={landingScreenImageSectionStyle}>
          <ListImageBackground />
        </View>
        <View style={landingScreenButtonSectionStyle}>
          <NavigationEvents
            onWillFocus={() => action({ type: SYNC })}
          />
          <View style={columnStyle}>
            {MAIN_SCREEN_NAMES.slice(0, 2).map((s) => (
              (s !== 'Naamat20Years')
                ? this.renderLandingScreenButton(s)
                : this.renderLandingScreenButton(s, () => {
                  const item = this.props.naamat20years
                  if (item) {
                    this.props.navigation.navigate('DynamicContentScreen',
                      { screen: item, title: item.title },
                    )
                  }
                })
            ))}
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

const mapStateToProps: MapStateToProps<StateProps, NavigationScreenProps, ReduxStoreState> = (state) => ({
  naamat20years: state.dynamicContent.mainInfoScreens.find((s) => s.title === 'Rockfestari Naamat 20 vuotta'),
  syncedAtLeastOnce: state.dynamicContent.synced ? true : false,
})

export default connect(mapStateToProps)(HomeScreen)
