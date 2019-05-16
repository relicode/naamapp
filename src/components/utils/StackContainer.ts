import { createAppContainer, createStackNavigator, NavigationScreenOptions } from 'react-navigation'

import styles from '../../styles/common'
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

const { headerTitle } = styles

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
*/

/* HeaderTitle issue: (text slicing off)
This happens to me as well on a OnePlus 5T, and I didn't change the font myself.
Adding fontFamily: 'roboto' to headerTitleStyle fixes it.

https://stackoverflow.com/questions/53420564/react-navigation-header-title-cut-off
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
