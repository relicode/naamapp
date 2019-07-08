import React, { Component } from 'react'
import { Dimensions, Image, ScrollView, View } from 'react-native'
import { getUniqueID } from 'react-native-markdown-renderer'
import { NavigationScreenProps } from 'react-navigation'

import commonStyles from '../../styles/common'
import NaamatMarkdown from '../utils/NaamatMarkdown'

const { naamatView } = commonStyles

export default class DynamicContentScreen extends Component<{} & NavigationScreenProps> {
  public render() {
    const { content, headerImage } = this.props.navigation.getParam('screen')
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
        <View style={{ flex: 1, padding: 15 }}>
          {[].concat(content).map((c: string) => (
            <NaamatMarkdown key={getUniqueID()}>{c}</NaamatMarkdown>
          ))}
        </View>
      </ScrollView>
    )
  }
}
