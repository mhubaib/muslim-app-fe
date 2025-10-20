import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import OnBoardingScreen from '../screens/on-boarding/on-boarding-screen';
import AuthStackNavigator from './auth-stack-navigator';
import MainDrawerNavigator from './main-drawer-navigator';
import { useAuth } from '../context/auth-context';

const Stack = createNativeStackNavigator();

enableScreens()

export default function AppStackNavigator() {
    const { userToken, hasOnBoarded } = useAuth();
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {
                    !hasOnBoarded ? (
                        <Stack.Screen name="on-boarding" component={OnBoardingScreen} />
                    ) : userToken ? (
                        <Stack.Screen name="main" component={MainDrawerNavigator} />
                    ) : (
                        <Stack.Screen name="auth" component={AuthStackNavigator} />
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}
