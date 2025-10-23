import { useEffect } from "react"
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "../context/theme-context";

const { width } = Dimensions.get('window');

const INDICATOR_SIZE = 65;

export default function CustomBottomTab({ state, descriptors, navigation }: BottomTabBarProps) {
    const tabWidth = width / state.routes.length;
    const translateX = useSharedValue(0);
    const { colors } = useTheme();

    useEffect(() => {
        const initialTranslateX = state.index * tabWidth + (tabWidth / 2) - (INDICATOR_SIZE / 2);
        translateX.value = initialTranslateX;
    }, [tabWidth, state.index]);

    useEffect(() => {
        const targetTranslateX = state.index * tabWidth + (tabWidth / 2) - (INDICATOR_SIZE / 2);
        translateX.value = withTiming(targetTranslateX, {
            duration: 200,
        })
    }, [tabWidth, state.index]);

    const animatedIndicatorStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }]
        }
    });

    const styles = StyleSheet.create({
        bottomTab: {
            flexDirection: 'row',
            height: 70,
            backgroundColor: colors.secondarySurface,
            borderTopColor: colors.mainSurface,
            borderTopWidth: 0.7,
            elevation: 5
        },
        indicator: {
            position: 'absolute',
            height: INDICATOR_SIZE / 2,
            width: INDICATOR_SIZE,
            borderRadius: INDICATOR_SIZE / 2,
            top: 8,
            backgroundColor: 'rgba(173, 216, 230, 0.5)',
        },
        tabItem: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
        }
    })

    return (
        <View style={styles.bottomTab}>
            <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />
            {state.routes.map((route, index) => {
                const options = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={styles.tabItem}
                    >
                        {options.options.tabBarIcon && options.options.tabBarIcon({ focused: isFocused, size: 24, color: isFocused ? colors.mainText : colors.mutedText })}
                        <Text style={{ color: colors.mainText, fontSize: 12 }}>
                            {options.options.tabBarLabel !== undefined
                                ? typeof options.options.tabBarLabel === 'function'
                                    ? options.options.tabBarLabel({ focused: isFocused, color: colors.mainText, position: 'below-icon', children: route.name })
                                    : options.options.tabBarLabel
                                : route.name}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}
