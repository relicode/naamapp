import React, { Component } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { NavigationScreenProps } from 'react-navigation'
import { connect, MapStateToProps } from 'react-redux'

import { ReduxStoreState } from '../../store'
import commonStyles from '../../styles/common'
import { MainInfoScreenRecord } from '../../utils/types/dynamic-content'
import ListImageBackground from '../utils/ListImageBackground'
import styles from './styles'

const {
  mainInfoScreenRow,
  mainInfoScreenRowStart,
  mainInfoScreenRowEnd,
} = styles

const { naamatView, textHeader } = commonStyles

interface StateProps {
  mainInfoScreens: MainInfoScreenRecord[],
}

class MainInfoScreenList extends Component<StateProps & NavigationScreenProps> {
  public render() {
    return (
      <View style={naamatView}>
        <ListImageBackground
          title={'Info ja palvelut'}
        />
        <FlatList
          data={this.props.mainInfoScreens.map((p) => ({ ...p, key: p.title }))}
          renderItem={({ item }: { item: MainInfoScreenRecord }) => (
            <TouchableHighlight
              key={item.title}
              onPress={
                () => this.props.navigation.navigate('DynamicContentScreen', { screen: item, title: item.title })
              }
            >
              <View style={mainInfoScreenRow}>
                <View style={mainInfoScreenRowStart}>
                  <Text style={textHeader}>{item.title}</Text>
                </View>
                <View style={mainInfoScreenRowEnd}>
                  <Text style={textHeader}>{'>'}</Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    )
  }
}

const mapStateToProps: MapStateToProps<StateProps, NavigationScreenProps, ReduxStoreState> = (state) => ({
  mainInfoScreens: state.dynamicContent.mainInfoScreens,
})

export default connect(mapStateToProps)(MainInfoScreenList)
