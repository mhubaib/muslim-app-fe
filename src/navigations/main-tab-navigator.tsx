import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/main/home-screen';
import CalenderScreen from '../screens/main/calender-screen';
import CompassScreen from '../screens/main/compass-screen';
import PrayerTimesScreen from '../screens/main/prayer-times-screen';
import { CustomBottomTab } from '../components/CustomBottomTab';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
    return (
        <Tab.Navigator
            tabBar={prop => <CustomBottomTab {...prop} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="home-screen" component={HomeScreen} options={{ headerShown: false, tabBarLabel: 'Home' }} />
            <Tab.Screen name="prayer-times-screen" component={PrayerTimesScreen} options={{ headerShown: false, tabBarLabel: 'Times' }} />
            <Tab.Screen name="calender-screen" component={CalenderScreen} options={{ headerShown: false, tabBarLabel: 'Calender' }} />
            <Tab.Screen name="compass-screen" component={CompassScreen} options={{ headerShown: false, tabBarLabel: 'Compass' }} />
        </Tab.Navigator>
    )
}