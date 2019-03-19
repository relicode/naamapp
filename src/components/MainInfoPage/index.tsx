import React, { Component } from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import Markdown from 'react-native-markdown-renderer'
import { NavigationScreenProp } from 'react-navigation'

// import { Page } from '../../store/pages/types'

const { height, width } = Dimensions.get('window')

export default class MainInfoPage extends Component {

  public static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
    }
  }

  public constructor(props) {
    super(props)
  }

  public render() {
    const { title, content, headerImage } = this.props.navigation.state.params
    return (
      <View>
        <Image
          source={{ uri: `https://${headerImage}` }}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width / 1024 * 768,
          }}
        />
        <ScrollView style={{ padding: 15 }}>
          <Markdown>{content}</Markdown>
        </ScrollView>
      </View>
    )
  }
}
