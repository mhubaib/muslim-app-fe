import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import OnBoardingScreen from '../screens/on-boarding/on-boarding-screen';
import MainTabNavigator from './main-tab-navigator';
import AuthStackNavigator from './auth-stack-navigator';
import MainDrawerNavigator from './main-drawer-navigator';
import { useAuth } from '../context/auth-context';

const Stack = createNativeStackNavigator();

enableScreens()

export default function AppStackNavigator() {
    const [hasOnBoarded, setHasOnBoarded] = useState(false);
    const { userToken } = useAuth();
    return (
        <NavigationContainer>
            {
                !hasOnBoarded ? (
                    <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
                ) : userToken ? (
                    <Stack.Screen name="Main" component={MainDrawerNavigator} />
                ) : (
                    <Stack.Screen name="Auth" component={AuthStackNavigator} />
                )
            }
        </NavigationContainer>
    )
}
