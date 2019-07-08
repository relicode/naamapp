/* tslint:disable */

import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Markdown, { getUniqueID } from 'react-native-markdown-renderer'

import commonStyles from '../../styles/common'

const { naamatView, naamatText } = commonStyles

const lineHeight = naamatText.fontSize ? naamatText.fontSize * 2 : 28

const rules = {
  list_item: (node: any, children: any, parent: any, styles: any) => {
    const textContent = children[0].props.children[0].props.children
      .filter((c: any) => c.type.displayName === 'Text')
      .reduce((acc: Array<string>, cur: any) => ([...acc, cur.props.children]), []).join('\n')
    return (
      <View key={node.key} style={naamatView}>
        <Text style={{...naamatText, lineHeight }}>{'\u25C9'} {textContent}</Text>
      </View>
    )
  }
}

const style = StyleSheet.create({
  view: naamatView,
  text: naamatText,
})

const NaamatMarkdown = (props: any) => (
    <Markdown rules={rules} style={style} {...props} />
)

export default NaamatMarkdown
  