import { createAppContainer, createStackNavigator } from 'react-navigation'

import commonStyles from '../../styles/common'
import HomeScreen from '../HomeScreen'
import MainInfoScreenList from '../MainInfoScreenList'
import PerformanceScreenList from '../PerformanceScreenList'
import DynamicContentScreen from './DynamicContentScreen'

export const MAIN_SCREEN_NAMES = [
  'Naamat20Years', 'PerformanceScreenList',
  'MainInfoScreenList', 'NaamatCam',
] as const
export const SCREEN_NAMES = [...MAIN_SCREEN_NAMES, 'HomeScreen', 'DynamicContentScreen'] as const

export type MainScreenNames = typeof MAIN_SCREEN_NAMES[number]
export type ScreenName = typeof SCREEN_NAMES
export type ScreenNames = typeof SCREEN_NAMES[number]
export type  ScreenNameMap = {
  [key in ScreenNames]?: string
}

export const screenNameMap: ScreenNameMap = {
  Naamat20Years: 'Naamat 20v',
  MainInfoScreenList: 'Info ja palvelut',
  PerformanceScreenList: 'Ohjelma',
  NaamatCam: 'Naamakamera',
}

const { headerTitle, magentaBackground } = commonStyles

/* HeaderTitle issue: (text slicing off)
This happens to me as well on a OnePlus 5T, and I didn't change the font myself.
Adding fontFamily: 'roboto' to headerTitleStyle fixes it.

https://stackoverflow.com/questions/53420564/react-navigation-header-title-cut-off
*/

type StackNavigatorOptions = { [key in ScreenNames]: {} }

const getDefaultNavigationOptions = (navigation: any, additionalOptions = {}) => ({
  headerStyle: {
    ...magentaBackground,
  },
  headerTitleStyle: headerTitle,
  title: screenNameMap[navigation.state.routeName as ScreenNames] || '',
  ...additionalOptions,
})

const stackNavigatorOptions: StackNavigatorOptions = {
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }: any) => getDefaultNavigationOptions(navigation, { header: null }),
  },
  Naamat20Years: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }: any) => getDefaultNavigationOptions(navigation, { header: null }),
  },
  MainInfoScreenList: {
    screen: MainInfoScreenList,
    navigationOptions: ({ navigation }: any) => getDefaultNavigationOptions(
      navigation, getDefaultNavigationOptions(navigation),
    ),
  },
  NaamatCam: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }: any) => getDefaultNavigationOptions(navigation, { header: null }),
  },
  DynamicContentScreen: {
    screen: DynamicContentScreen,
    navigationOptions: ({ navigation }: any) => getDefaultNavigationOptions(
      navigation,
      { title: navigation.getParam('title', '😒') },
    ),
  },
  PerformanceScreenList: {
    screen: PerformanceScreenList,
    navigationOptions: ({ navigation }: any) => getDefaultNavigationOptions(
      navigation, getDefaultNavigationOptions(navigation),
    ),
  },
}

export default createAppContainer(createStackNavigator(stackNavigatorOptions,
  {
    initialRouteName: 'HomeScreen',
  },
))
