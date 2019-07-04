import { Platform } from 'react-native'

export const getPlatform = (): 'IOS' | 'ANDROID' => (
  Platform.OS === 'ios' ? 'IOS' : 'ANDROID'
)
