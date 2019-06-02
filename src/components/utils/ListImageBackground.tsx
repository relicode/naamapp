import React, { FunctionComponent } from 'react'
import { Dimensions, ImageBackground, Text } from 'react-native'

import { HeaderImage } from '../../utils/types/dynamic-content'

const DEFAULT_IMAGE_WIDTH = 1024
const DEFAULT_IMAGE_HEIGHT = 768

interface StateProps {
  headerImage?: HeaderImage,
  title?: string,
}

const ListImageBackground: FunctionComponent<StateProps> = (props) => {
  const { headerImage, title } = props
  const screenWidth = Math.round(Dimensions.get('window').width)
  const imageHeight = headerImage ? headerImage.height : DEFAULT_IMAGE_HEIGHT
  const imageWidth = headerImage ? headerImage.width : DEFAULT_IMAGE_WIDTH
  return (
    <ImageBackground
      source={headerImage
        ? { uri: `https://${headerImage.url}` }
        : require('../../assets/images/default-image.jpg')
      }
      style={{
        width: screenWidth,
        height: imageHeight * screenWidth / imageWidth,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {title ? (
        <Text style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)', color: 'white', fontSize: 36, padding: 5 }}
        >
          {title}
        </Text>
      ) : null}

    </ImageBackground>
  )
}

ListImageBackground.displayName = 'ListImageBackground'

export default ListImageBackground
