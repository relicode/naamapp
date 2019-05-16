import React, { Component } from 'react'
import { TouchableHighlight } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { NavigationScreenProps } from 'react-navigation'
import { connect, MapStateToProps } from 'react-redux'

import { ReduxStoreState } from '../../store'
import { MainInfoPageRecord } from '../../utils/types/dynamic-content'
import ListImageBackground from '../utils/ListImageBackground'

interface StateProps {
  mainInfoPages: MainInfoPageRecord[],
}

class MainInfoPageList extends Component<StateProps & NavigationScreenProps> {
  public render() {
    return (
      <FlatList
        data={this.props.mainInfoPages.map((p) => ({ ...p, key: p.title }))}
        renderItem={({ item }: { item: MainInfoPageRecord }) => (
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('MainInfoPage', { page: item, title: item.title })}
          >
            <ListImageBackground
              headerImage={item.headerImage}
              title={item.title}
            />
          </TouchableHighlight>
        )}
      />
    )
  }
}

const mapStateToProps: MapStateToProps<StateProps, NavigationScreenProps, ReduxStoreState> = (state) => ({
  mainInfoPages: state.dynamicContent.mainInfoPages,
})

export default connect(mapStateToProps)(MainInfoPageList)
