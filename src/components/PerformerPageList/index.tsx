import React, { Component } from 'react'
import { Dimensions, ImageBackground, Text, TouchableHighlight } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { NavigationScreenProps } from 'react-navigation'
import { connect, MapStateToProps } from 'react-redux'

import { ReduxStoreState } from '../../store'
import { PerformerRecord } from '../../utils/types/dynamic-content'

interface StateProps {
  performers: PerformerRecord[],
}

class PerformerPageList extends Component<StateProps & NavigationScreenProps> {
  public render() {
    const screenWidth = Math.round(Dimensions.get('window').width)
    return (
      <FlatList
        data={this.props.performers.map((p) => ({ ...p, key: p.name }))}
        renderItem={({ item }) => {
          const { headerImage } = item
          const imageHeight = headerImage ? headerImage.height : 768
          const imageWidth = headerImage ? headerImage.width : 1024
          return (
            <TouchableHighlight
              // onPress={() => this.props.navigation.navigate('MainInfoPage', { page: item, title: item.title })}
              onPress={() => console.log('eeh')}
            >
              <ImageBackground
                source={headerImage
                  ? { uri: `https://${item.headerImage.url}` }
                  : require('../../assets/images/default-image.jpg')
                }
                style={{
                  width: screenWidth,
                  height: imageHeight * screenWidth / imageWidth,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.6)', color: 'white', fontSize: 36, padding: 5 }}
                >
                  {item.name}
                </Text>
              </ImageBackground>
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
