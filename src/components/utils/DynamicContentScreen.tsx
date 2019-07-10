import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { getUniqueID } from 'react-native-markdown-renderer'
import { NavigationScreenProps } from 'react-navigation'

import commonStyles from '../../styles/common'
import { FittedImage } from '../../utils'
import NaamatMarkdown from '../utils/NaamatMarkdown'

const { naamatView } = commonStyles

export default class DynamicContentScreen extends Component<{} & NavigationScreenProps> {
  public render() {
    const { navigation } = this.props
    const { getParam } = navigation
    const { content, headerImage } = this.props.navigation.getParam('screen')
    const headerImageSource = getParam('title') === 'Rockfestari Naamat 20 vuotta'
      ? require('../../assets/images/background-images/welcome-bg.png')
      : { uri: `https:${headerImage.url}` }

    return(
      <ScrollView style={ naamatView } >
        <FittedImage source={headerImageSource} />
        <View style={{ flex: 1, padding: 15 }}>
          {[].concat(content).map((c: string) => (
            <NaamatMarkdown key={getUniqueID()}>{c}</NaamatMarkdown>
          ))}
        </View>
      </ScrollView >
    )

  }
}
