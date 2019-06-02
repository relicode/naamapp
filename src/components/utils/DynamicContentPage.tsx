import React, { Component } from 'react'
import { Dimensions, Image, ScrollView, View } from 'react-native'
import Markdown from 'react-native-markdown-renderer'
import { NavigationScreenProps } from 'react-navigation'

import commonStyles from '../../styles/common'

const { naamatView } = commonStyles

export default class DynamicContentPage extends Component<{} & NavigationScreenProps> {
  public render() {
    const { content, headerImage } = this.props.navigation.getParam('page')
    return (
      <ScrollView style={naamatView}>
        {headerImage ? (
          <Image
            source={{ uri: `https:${headerImage.url}` }}
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').width / headerImage.width * headerImage.height,
            }}
          />
        ) : null}
        <View style={{ padding: 15 }}>
          {[].concat(content).map((c) => <Markdown key={Math.random()}>{c}</Markdown>)}
        </View>
      </ScrollView>
    )
  }
}
