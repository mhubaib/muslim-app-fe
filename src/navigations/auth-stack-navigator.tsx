import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/login-screen';
import RegisterScreen from '../screens/auth/register-screen';
import VerifyEmailScreen from '../screens/auth/verify-email-screen';

const Stack = createNativeStackNavigator();

export default function AuthStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="login-screen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="register-screen" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="verify-email-screen" component={VerifyEmailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}


