import { createAppContainer, createStackNavigator, NavigationScreenOptions } from 'react-navigation'

import commonStyles from '../../styles/common'
import HomePage from '../HomePage'
import MainInfoPageList from '../MainInfoPageList'
import PerformancePageList from '../PerformancePageList'
import PerformerPageList from '../PerformerPageList'
import ProfilePage from '../ProfilePage'
import DynamicContentPage from './DynamicContentPage'

export const MAIN_PAGE_NAMES = [
  'Naamat20Years', 'MainInfoPageList',
  'PerformerPageList', 'PerformancePageList',
] as const
export const PAGE_NAMES = [...MAIN_PAGE_NAMES, 'HomePage', 'DynamicContentPage'] as const

export type MainPageNames = typeof MAIN_PAGE_NAMES[number]
export type PageNames = typeof PAGE_NAMES[number]
export type  PageNameMap = {
  [key in PageNames]?: string
}

export const pageNameMap: PageNameMap = {
  Naamat20Years: 'Naamat 20v',
  MainInfoPageList: 'Info ja palvelut',
  PerformerPageList: 'Esiintyjät',
  PerformancePageList: 'Aikataulu',
}

const { headerTitle, magentaBackground } = commonStyles

/* HeaderTitle issue: (text slicing off)
This happens to me as well on a OnePlus 5T, and I didn't change the font myself.
Adding fontFamily: 'roboto' to headerTitleStyle fixes it.

https://stackoverflow.com/questions/53420564/react-navigation-header-title-cut-off
*/

type StackNavigatorOptions = { [key in PageNames]: {} }

const getDefaultNavigationOptions = (navigation: any, additionalOptions = {}) => ({
  headerStyle: {
    ...magentaBackground,
  },
  headerTitleStyle: headerTitle,
  title: pageNameMap[navigation.state.routeName as PageNames] || '😒',
  ...additionalOptions,
})

const stackNavigatorOptions: StackNavigatorOptions = {
  HomePage: {
    screen: HomePage,
    navigationOptions: ({ navigation }: any) => getDefaultNavigationOptions(navigation, { header: null }),
  },
  Naamat20Years: {
    screen: HomePage,
    navigationOptions: ({ navigation }: any) => getDefaultNavigationOptions(navigation, { header: null }),
  },
  MainInfoPageList: {
    screen: MainInfoPageList,
    navigationOptions: ({ navigation }: any) => getDefaultNavigationOptions(
      navigation, getDefaultNavigationOptions(navigation),
    ),
  },
  PerformerPageList: {
    screen: PerformerPageList,
    navigationOptions: ({ navigation }: any) => getDefaultNavigationOptions(
      navigation, getDefaultNavigationOptions(navigation),
    ),  ProfilePage: {
      screen: ProfilePage,
    },
  },
  DynamicContentPage: {
    screen: DynamicContentPage,
    navigationOptions: ({ navigation }: any) => getDefaultNavigationOptions(
      navigation,
      { title: navigation.getParam('title', '😒') },
    ),
  },
  PerformancePageList: {
    screen: PerformancePageList,
    navigationOptions: ({ navigation }: any) => getDefaultNavigationOptions(
      navigation, getDefaultNavigationOptions(navigation),
    ),
  },
}

export default createAppContainer(createStackNavigator(stackNavigatorOptions,
  {
    initialRouteName: 'HomePage',
  },
))
