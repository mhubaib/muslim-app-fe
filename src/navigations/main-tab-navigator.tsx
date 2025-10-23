import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/main/home-screen';
import CalenderScreen from '../screens/main/calender-screen';
import CompassScreen from '../screens/main/compass-screen';
import PrayerTimesScreen from '../screens/main/prayer-times-screen';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import BottomTab from '../components/BottomTab';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (route: any, color: string) => {
    switch (route.name) {
        case 'home-screen':
            return <FontAwesome name="home" size={24} color={color} />;
        case 'prayer-times-screen':
            return <FontAwesome name="clock-o" size={24} color={color} />;
        case 'calender-screen':
            return <FontAwesome name="calendar" size={24} color={color} />;
        case 'compass-screen':
            return <FontAwesome name="compass" size={24} color={color} />;
        default:
            return null;
    }
}

export default function MainTabNavigator() {
    return (
        <Tab.Navigator
            tabBar={prop => <BottomTab {...prop} />}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color }) => getTabBarIcon(route, color),
            })}
        >
            <Tab.Screen name="home-screen" component={HomeScreen} options={{ headerShown: false, tabBarLabel: 'Home' }} />
            <Tab.Screen name="prayer-times-screen" component={PrayerTimesScreen} options={{ headerShown: false, tabBarLabel: 'Times' }} />
            <Tab.Screen name="calender-screen" component={CalenderScreen} options={{ headerShown: false, tabBarLabel: 'Calender' }} />
            <Tab.Screen name="compass-screen" component={CompassScreen} options={{ headerShown: false, tabBarLabel: 'Compass' }} />
        </Tab.Navigator>
    )
}