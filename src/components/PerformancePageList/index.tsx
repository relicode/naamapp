import React, { Component } from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import Markdown from 'react-native-markdown-renderer'
import { NavigationScreenProps } from 'react-navigation'
import { MapStateToProps, connect } from 'react-redux'

import { ReduxStoreState } from '../../store'
import { PerformanceRecord } from '../../utils/types/dynamic-content'

interface StateProps {
  performancePages: PerformanceRecord[],
}

class PerformancePageList extends Component<StateProps & NavigationScreenProps> {
  public render() {
    return (
      <ScrollView>
        {this.props.performancePages.map((p) => <Text key={p.name}>{JSON.stringify(p, null, 2)}</Text>)}
      </ScrollView>
    )
  }
}

const mapStateToProps: MapStateToProps<StateProps, NavigationScreenProps, ReduxStoreState> = (state) => ({
  performancePages: state.dynamicContent.performances,
})

export default connect(mapStateToProps)(PerformancePageList)
