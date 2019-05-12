import React, { Component } from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import Markdown from 'react-native-markdown-renderer'
import { NavigationScreenProps } from 'react-navigation'
import { MapStateToProps, connect } from 'react-redux'

import { ReduxStoreState } from '../../store'
import { PerformerRecord } from '../../utils/types/dynamic-content'

interface StateProps {
  performerPages: PerformerRecord[],
}

class PerformerPageList extends Component<StateProps & NavigationScreenProps> {
  public render() {
    return (
      <ScrollView>
        {this.props.performerPages.map((p) => <Text key={p.name}>{JSON.stringify(p, null, 2)}</Text>)}
      </ScrollView>
    )
  }
}

const mapStateToProps: MapStateToProps<StateProps, NavigationScreenProps, ReduxStoreState> = (state) => ({
  performerPages: state.dynamicContent.performers,
})

export default connect(mapStateToProps)(PerformerPageList)
