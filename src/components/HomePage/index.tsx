import React, { Component } from 'react'
import { Alert, Text, TouchableHighlight, View } from 'react-native'
import { NavigationEvents, NavigationScreenProps } from 'react-navigation'

import { action } from '../../store'
import { SYNC } from '../../store/dynamic-content/types'
import commonStyles from '../../styles/common'
import { MainInfoPageRecord } from '../../utils/types/dynamic-content'
import { MAIN_PAGE_NAMES, MainPageNames, pageNameMap } from '../utils/StackContainer'
import landingPageStyles from './styles'

const { alert } = Alert
const { rowStyle, columnStyle, textHeader } = commonStyles
const { landingPageButtonStyle } = landingPageStyles

type HomePageProps = NavigationScreenProps

export default class HomePage extends Component<HomePageProps> {
  public handlePagePress(page: MainInfoPageRecord) {
    alert(page.title, page.content)
  }

  public renderLandingPageButton(text: string, page: MainPageNames) {
    return (
      <TouchableHighlight
        key={text}
        underlayColor="white"
        activeOpacity={0.95}
        style={landingPageButtonStyle}
        onPress={() => this.props.navigation.navigate(page)}
      >
        <Text style={textHeader}>{pageNameMap[text as MainPageNames] || text}</Text>
      </TouchableHighlight>
    )
  }

  public render() {
    return (
      <View style={rowStyle}>
        <NavigationEvents
          onWillFocus={() => action({ type: SYNC })}
        />
        <View style={columnStyle}>
          {MAIN_PAGE_NAMES.slice(0, 3).map((p) => this.renderLandingPageButton(p, p))}
        </View>
        <View style={columnStyle}>
          {MAIN_PAGE_NAMES.slice(3).map((p) => this.renderLandingPageButton(p, p))}
        </View>
      </View>
    )
  }
}
