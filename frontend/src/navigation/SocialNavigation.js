import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SocialPage from '../pages/SocialPage';
import DetailedSocialPage from '../pages/DetailedSocialPage';
import CommentPage from '../pages/CommentPage';
import WritePostPage from '../pages/WritePostPage';

const Stack = createNativeStackNavigator();

const SocialNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        safeAreaInsets: {top: 25},
      }}>
      <Stack.Screen
        name="SocialPage"
        component={SocialPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailedSocialPage"
        component={DetailedSocialPage}
        options={{
          headerTitle: 'Post',
          headerTintColor: '#262444',
          headerStyle: {
            elevation: 0,
            backgroundColor: '#ffe6d3',
          },
        }}
      />
      <Stack.Screen
        name="CommentPage"
        component={CommentPage}
        options={{
          headerTitle: 'Comments',
          headerTintColor: '#262444',
          headerStyle: {
            elevation: 0,
            backgroundColor: '#ffe6d3',
          },
        }}
      />
      <Stack.Screen
        name="WritePostPage"
        component={WritePostPage}
        options={{
          headerTitle: 'Write a Post',
          headerTintColor: '#ffe6d3',
          headerStyle: {
            elevation: 0,
            backgroundColor: '#262444',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default SocialNavigation;
