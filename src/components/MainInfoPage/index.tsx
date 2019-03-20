import React, { Component } from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import Markdown from 'react-native-markdown-renderer'

interface MainInfoPageProps { navigation: any }

const { height, width } = Dimensions.get('window')

export default class MainInfoPage extends Component<MainInfoPageProps> {

  public static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
    }
  }

  public render() {
    const { title, content, headerImage } = this.props.navigation.state.params
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
