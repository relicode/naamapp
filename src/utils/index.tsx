import moment, { Moment } from 'moment-timezone'
import React from 'react'
import { Dimensions, Image, ImageProps, Platform } from 'react-native'

export const DEFAULT_IMAGE_WIDTH = 1024
export const DEFAULT_IMAGE_HEIGHT = 768
export const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height

export const getPlatform = (): 'IOS' | 'ANDROID' => (
  Platform.OS === 'ios' ? 'IOS' : 'ANDROID'
)

export interface HelsinkiMoment {
  momentHelsinki: Moment,
  str: string,
  dayOfWeek: number,
  fixedDayOfWeek: number,
  hours: number,
  time: string,
}

export const toHelsinkiMoment = (utcString?: string): HelsinkiMoment => {
  const DEFAULT_TIME_ZONE = 'Europe/Helsinki'
  const momentHelsinki = typeof utcString === 'string'
    ? moment.tz(utcString, 'utc').tz(DEFAULT_TIME_ZONE)
    : moment.tz('utc').tz(DEFAULT_TIME_ZONE)

  const str = momentHelsinki.format('YYYY-MM-DDTHH:mm-ss.SSSZ')
  const dayOfWeek = momentHelsinki.day()
  const fixedDayOfWeek = momentHelsinki.clone().subtract(3, 'hours').day()
  const hours = momentHelsinki.hours()
  const time = momentHelsinki.format('HH:mm')

  return {
    momentHelsinki,
    str,
    dayOfWeek,
    fixedDayOfWeek,
    hours,
    time,
  }
}

export const getFittedImageProps = (props: any) => {
  const { source, style } = props
  const { width, height } = (
    (style && style.width && style.height)
    ? style
    : { width: DEFAULT_IMAGE_WIDTH, height: DEFAULT_IMAGE_HEIGHT }
  ) as { width: number, height: number }

  const imageSizeRatio = windowWidth / width
  const fitWidth = width * imageSizeRatio
  const fitHeight = height * imageSizeRatio
  const fitProps: ImageProps = {
    ...props,
    source,
    style: props.style ? {
      ...props.style,
      width: fitWidth,
      height: fitHeight,
    } : {
      width: fitWidth,
      height: fitHeight,
    },
  }

  return fitProps
}

export const FittedImage = (props: any) => (
  <Image {...getFittedImageProps(props)} />
)
