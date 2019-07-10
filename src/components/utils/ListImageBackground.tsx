import React, { FunctionComponent } from 'react'
import { ImageBackground, Text } from 'react-native'

import { getFittedImageProps } from '../../utils'
import { HeaderImage } from '../../utils/types/dynamic-content'
import styles from './ListImageBackgroundStyles'

const { listImageBackground } = styles

interface StateProps {
  headerImage?: HeaderImage,
  title?: string,
}

const generateSource = (headerImage?: any) => {
  if (typeof headerImage === 'number') { return headerImage }
  if (headerImage && headerImage.url) { return { uri: `https://${headerImage.url}` } }
  return require('../../assets/images/default-image.jpg')
}

const ListImageBackground: FunctionComponent<StateProps> = (props) => {
  const { headerImage, title } = props

  const source = generateSource(headerImage)

  return (
    <ImageBackground
      {...getFittedImageProps({ source, style: {
        justifyContent: 'center',
        alignItems: 'center',
      }})}
    >
      {title ? (
        <Text style={listImageBackground}>
          {title}
        </Text>
      ) : null}

    </ImageBackground>
  )
}

ListImageBackground.displayName = 'ListImageBackground'

export default ListImageBackground
