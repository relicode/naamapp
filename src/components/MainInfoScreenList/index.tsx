import React, { Component } from 'react'
import { TouchableHighlight } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { NavigationScreenProps } from 'react-navigation'
import { connect, MapStateToProps } from 'react-redux'

import { ReduxStoreState } from '../../store'
import { MainInfoScreenRecord } from '../../utils/types/dynamic-content'
import ListImageBackground from '../utils/ListImageBackground'

interface StateProps {
  mainInfoScreens: MainInfoScreenRecord[],
}

class MainInfoScreenList extends Component<StateProps & NavigationScreenProps> {
  public render() {
    return (
      <FlatList
        data={this.props.mainInfoScreens.map((p) => ({ ...p, key: p.title }))}
        renderItem={({ item }: { item: MainInfoScreenRecord }) => (
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('DynamicContentScreen', { screen: item, title: item.title })}
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
  mainInfoScreens: state.dynamicContent.mainInfoScreens,
})

export default connect(mapStateToProps)(MainInfoScreenList)
