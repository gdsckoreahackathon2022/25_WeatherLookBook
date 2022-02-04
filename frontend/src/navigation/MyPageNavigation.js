import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPage from '../pages/MyPage';
import EditProfilePage from '../pages/EditProfilePage';
import ShoppingPage from '../pages/ShoppingPage';
import MyGalleryPage from '../pages/MyGalleryPage';
import LikedGalleryPage from '../pages/LikedGalleryPage';

const Stack = createNativeStackNavigator();

const MyPageNavigation = () => {

    return (
        
        <Stack.Navigator
            screenOptions={{
                safeAreaInsets: {top: 25}
            }}
        >
            <Stack.Screen 
                name="MyPage" 
                component={MyPage} 
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="EditProfilePage" 
                component={EditProfilePage} 
                options={{
                    headerTitle: 'Edit Profile',
                    headerTintColor: '#ffe6d3',
                    headerStyle: {
                        elevation: 0,
                        backgroundColor: '#262444',
                    }
                }}
            />
            <Stack.Screen 
                name="ShoppingPage" 
                component={ShoppingPage} 
                options={{
                    headerTitle: 'Shopping',
                    headerTintColor: '#ffe6d3',
                    headerStyle: {
                        elevation: 0,
                        backgroundColor: '#262444',
                    }
                }}
            />
            <Stack.Screen 
                name="MyGalleryPage" 
                component={MyGalleryPage} 
                options={{
                    headerTitle: 'My Posts',
                    headerTintColor: '#ffe6d3',
                    headerStyle: {
                        elevation: 0,
                        backgroundColor: '#262444',
                    }
                }}
            />
            <Stack.Screen 
                name="LikedGalleryPage" 
                component={LikedGalleryPage} 
                options={{
                    headerTitle: 'Liked Posts',
                    headerTintColor: '#262444',
                    headerStyle: {
                        elevation: 0,
                        backgroundColor: '#ffe6d3',
                    }
                }}
            />
        </Stack.Navigator>
        
    );
};

export default MyPageNavigation;
