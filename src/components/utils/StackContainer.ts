import { createAppContainer, createStackNavigator, NavigationScreenOptions } from 'react-navigation'

import HomePage from '../HomePage'
import MainInfoPage from '../MainInfoPage'
import MainInfoPageList from '../MainInfoPageList'
import PerformancePageList from '../PerformancePageList'
import PerformerPageList from '../PerformerPageList'
import ProfilePage from '../ProfilePage'

export const MAIN_PAGE_NAMES = [
  'HomePage', 'MainInfoPageList', 'ProfilePage',
  'PerformerPageList', 'PerformancePageList', 'Kikkelis kokkelis page',
] as const
export const PAGE_NAMES = [...MAIN_PAGE_NAMES, 'MainInfoPage'] as const

export type MainPageNames = typeof MAIN_PAGE_NAMES[number]
export type PageNames = typeof PAGE_NAMES[number]

/*
type GetNavigationOptionsParams = (data: {
    navigation: {
      state: {
        params: {
          title: string,
          content: string,
          headerImage: {
            url: string,
            width: number,
            height: number,
          },
        },
      },
    },
  }) => NavigationScreenOptions

const getNavigationOptions: GetNavigationOptionsParams = ({ navigation }) => ({
  title: `Ze Profile'`,
})

const getNavigationOptions = () => ({
  // title: `Ze Profile'`,
})
*/

type StackNavigatorOptions = { [key in PageNames]: {} }

const stackNavigatorOptions: StackNavigatorOptions = {
  'HomePage': {
    screen: HomePage,
    navigationOptions: () => ({
      header: null,
    }),
  },
  'MainInfoPageList': {
    screen: MainInfoPageList,
    navigationOptions: () => ({ title: 'Yleisinfo' }),
  },
  'MainInfoPage': {
    screen: MainInfoPage,
  },
  'ProfilePage': {
    screen: ProfilePage,
  },
  'PerformerPageList': {
    screen: PerformerPageList,
    navigationOptions: () => ({ title: 'Esiintyjät' }),
  },
  'PerformancePageList': {
    screen: PerformancePageList,
  },
  'Kikkelis kokkelis page': {
    screen: ProfilePage,
  },
}

export default createAppContainer(createStackNavigator(stackNavigatorOptions,
  {
    initialRouteName: 'HomePage',
  },
))
