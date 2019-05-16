import React, { Component } from 'react'
import { TouchableHighlight } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { NavigationScreenProps } from 'react-navigation'
import { connect, MapStateToProps } from 'react-redux'

import { ReduxStoreState } from '../../store'
import { PerformerRecord } from '../../utils/types/dynamic-content'
import ListImageBackground from '../utils/ListImageBackground'

interface StateProps {
  performers: PerformerRecord[],
}

class PerformerPageList extends Component<StateProps & NavigationScreenProps> {
  public render() {
    return (
      <FlatList
        data={this.props.performers.map((p) => ({ ...p, key: p.name }))}
        renderItem={({ item }) => {
          const { headerImage, name } = item
          const listImageProps = {
            headerImage,
            title: name,
          }
          return (
            <TouchableHighlight
              // onPress={() => this.props.navigation.navigate('MainInfoPage', { page: item, title: item.title })}
              onPress={() => console.log('eeh')}
            >
              <ListImageBackground {...listImageProps} />
            </TouchableHighlight>
          )
        }}
      />
    )
  }
}

const mapStateToProps: MapStateToProps<StateProps, NavigationScreenProps, ReduxStoreState> = (state) => ({
  performers: state.dynamicContent.performers,
})

export default connect(mapStateToProps)(PerformerPageList)
