import React, { Component } from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import Markdown from 'react-native-markdown-renderer'
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation'

import { MainInfoPageRecord } from '../../utils/types/dynamic-content'

export default class MainInfoPage extends Component<MainInfoPageRecord & NavigationScreenProps> {
  public static navigationOptions = ({ navigation }: NavigationScreenProps) => {
    return {
      title: navigation.getParam('title', '???'),
    }
  }
  public render() {
    const { content, headerImage } = this.props.navigation.getParam('page')
    return (
      <ScrollView>
        <Image
          source={{ uri: `https:${headerImage.url}` }}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width / headerImage.width * headerImage.height,
          }}
        />
        <View style={{ padding: 15 }}>
          <Text></Text>
          <Markdown>{content}</Markdown>
        </View>
      </ScrollView>
    )
  }
}
