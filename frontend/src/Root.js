import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreToken } from './_modules/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

import IonIcon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GuidePage from './pages/GuidePage';
import CustomPage from './pages/CustomPage';
import SocialNavigation from './navigation/SocialNavigation';
import MyPageNavigation from './navigation/MyPageNavigation';
import SettingPage from './pages/SettingPage';
import SignIn from './auth/SignIn';

const Root = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('token');
      } catch (e) {
        console.log(e);
      }
      dispatch(restoreToken(token));
    }
    bootstrapAsync();
  }, [])

  return (
    <>
      {
        user.userToken === null ? <SignIn /> :
        (
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen
                name="Guide" 
                component={GuidePage} 
                options= {{
                  tabBarStyle: { backgroundColor: '#ffb687', height: '8%', width: '100%', borderTopRightRadius: 21, borderTopLeftRadius: 21 },
                  tabBarInactiveTintColor: '#ffecd0',
                  tabBarActiveTintColor: '#262444',
                  tabBarLabelStyle: {marginBottom: '5%'},
                  headerShown: false,
                  tabBarIcon: ({focused}) => {
                    return (
                      <IonIcon 
                        name={focused ? "today" : "today-outline"}
                        size={25} 
                        color={focused ? "#262444" : "#ffecd0"} 
                        style={{marginBottom: '-5%'}}
                      />
                    )
                  }
                }} 
              />
              <Tab.Screen 
                name="Custom" 
                component={CustomPage} 
                options= {{
                  tabBarStyle: { backgroundColor: '#ffb687', height: '8%', position: 'absolute', borderTopRightRadius: 21, borderTopLeftRadius: 21 },
                  tabBarInactiveTintColor: '#ffecd0',
                  tabBarActiveTintColor: '#262444',
                  tabBarLabelStyle: {marginBottom: '5%'},
                  headerShown: false,
                  tabBarIcon: ({focused}) => {
                    return (
                      <IonIcon 
                        name={focused ? "images" : "images-outline"}
                        size={25} 
                        color={focused ? "#262444" : "#ffecd0"} 
                        style={{marginBottom: '-5%'}}
                      />
                    )
                  }
                }}
              />
              <Tab.Screen 
                name="Social" 
                component={SocialNavigation} 
                options= {{
                  tabBarHideOnKeyboard: true,
                  tabBarStyle: { backgroundColor: '#ffb687', height: '8%', position: 'absolute', borderTopRightRadius: 21, borderTopLeftRadius: 21 },
                  tabBarInactiveTintColor: '#ffecd0',
                  tabBarActiveTintColor: '#262444',
                  tabBarLabelStyle: {marginBottom: '5%'},
                  headerShown: false,
                  tabBarIcon: ({focused}) => {
                    return (
                      <IonIcon 
                        name={focused ? "earth" : "earth-outline"}
                        size={25} 
                        color={focused ? "#262444" : "#ffecd0"} 
                        style={{marginBottom: '-5%'}}
                      />
                    )
                  }
                }}
              />
              <Tab.Screen 
                name="My Page" 
                component={MyPageNavigation} 
                options= {{
                  tabBarHideOnKeyboard: true,
                  tabBarStyle: { backgroundColor: '#ffb687', height: '8%', position: 'absolute', borderTopRightRadius: 21, borderTopLeftRadius: 21 },
                  tabBarInactiveTintColor: '#ffecd0',
                  tabBarActiveTintColor: '#262444',
                  tabBarLabelStyle: {marginBottom: '5%'},
                  headerShown: false,
                  tabBarIcon: ({focused}) => {
                    return (
                      <IonIcon 
                        name={focused ? "folder-open" : "folder-outline"}
                        size={25} 
                        color={focused ? "#262444" : "#ffecd0"} 
                        style={{marginBottom: '-5%'}}
                      />
                    )
                  }
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>     
        )
      }
    </>
  )
}

export default Root;
