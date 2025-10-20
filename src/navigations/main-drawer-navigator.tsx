import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabNavigator from "./main-tab-navigator";

const Drawer = createDrawerNavigator();

export default function MainDrawerNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="home" component={MainTabNavigator} />
        </Drawer.Navigator>
    )
}
