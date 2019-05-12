import React, { Component } from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import Markdown from 'react-native-markdown-renderer'
import { NavigationScreenProps } from 'react-navigation'
import { MapStateToProps, connect } from 'react-redux'

import { ReduxStoreState } from '../../store'
import { MainInfoPageRecord } from '../../utils/types/dynamic-content'

interface StateProps {
  mainInfoPages: MainInfoPageRecord[],
}

class MainInfoPageList extends Component<StateProps & NavigationScreenProps> {
  public render() {
    return (
      <ScrollView>
        {this.props.mainInfoPages.map((p) => <Text key={p.title}>{JSON.stringify(p, null, 2)}</Text>)}
      </ScrollView>
    )
  }
}

const mapStateToProps: MapStateToProps<StateProps, NavigationScreenProps, ReduxStoreState> = (state) => ({
  mainInfoPages: state.dynamicContent.mainInfoPages,
})

export default connect(mapStateToProps)(MainInfoPageList)
