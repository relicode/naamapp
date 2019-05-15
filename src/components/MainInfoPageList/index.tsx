import React, { Component } from 'react'
import { Dimensions, ImageBackground, Text, TouchableHighlight, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { NavigationScreenProps } from 'react-navigation'
import { connect, MapStateToProps } from 'react-redux'

import { ReduxStoreState } from '../../store'
import { MainInfoPageRecord } from '../../utils/types/dynamic-content'

interface StateProps {
  mainInfoPages: MainInfoPageRecord[],
}

class MainInfoPageList extends Component<StateProps & NavigationScreenProps> {
  public render() {
    const screenWidth = Math.round(Dimensions.get('window').width)
    return (
      <FlatList
        data={this.props.mainInfoPages.map((p) => ({ ...p, key: p.title }))}
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('MainInfoPage', { page: item, title: item.title })}
          >
            <ImageBackground
              source={{ uri: `https://${item.headerImage.url}` }}
              style={{
                width: screenWidth,
                height: item.headerImage.height * screenWidth / item.headerImage.width,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)', color: 'white', fontSize: 36, padding: 5 }}>{item.title}</Text>
            </ImageBackground>
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
