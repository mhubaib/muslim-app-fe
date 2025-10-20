import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/main/home-screen';
import FontAwesome from '@react-native-vector-icons/fontawesome';

const Tab = createBottomTabNavigator();

const getTabIconName = (routeName: string) => {
    switch (routeName) {
        case 'home':
            return 'home';
        case 'prayer-times':
            return 'clock'
    default:
            return 'home';
    }
}
const getTabBarIcon = (name: any) => {
    const iconName = name === 'Home' ? 'home' : name.toLowerCase();
    return ({ focused }: { focused: string }) => {
        return (
            <FontAwesome name={iconName} size={24} color={focused ? 'red' : 'black'} />
        )
    }
}

export default function MainTabNavigator() {
    return (
        <Tab.Navigator
            
        >
            <Tab.Screen name="home-screen" component={HomeScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}