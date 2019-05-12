import React, { Component } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { Alert } from 'react-native'
import { NavigationEvents, NavigationScreenProps } from 'react-navigation'
import { MapStateToProps, connect } from 'react-redux'

import { action } from '../../store'
import { ReduxStoreState } from '../../store'
import { SYNC } from '../../store/dynamic-content/types'
import commonStyles from '../../styles/common'
import { MainInfoPageRecord, PerformanceRecord, PerformerRecord } from '../../utils/types/dynamic-content'
import { MAIN_PAGE_NAMES, MainPageNames } from '../utils/StackContainer'
import landingPageStyles from './styles'

const { alert } = Alert
const { rowStyle, columnStyle, textHeader } = commonStyles
const { landingPageButtonStyle } = landingPageStyles

interface StateProps {}

type HomePageProps = NavigationScreenProps & StateProps

class HomePage extends Component<HomePageProps> {
  public handlePagePress(page: MainInfoPageRecord) {
    alert(page.title, page.content)
  }

  public renderLandingPageButton(text: string, page: MainPageNames, pageParams?: any) {
    return (
      <TouchableHighlight
        key={text}
        underlayColor="white"
        activeOpacity={0.95}
        style={landingPageButtonStyle}
        onPress={() => this.props.navigation.navigate(page, pageParams)}
      >
        <Text style={textHeader}>{text}</Text>
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

const mapStateToProps: MapStateToProps<StateProps, NavigationScreenProps, ReduxStoreState> = (state) => ({
  // mainInfoPages: state.dynamicContent.mainInfoPages,
})

export default connect(mapStateToProps)(HomePage)
