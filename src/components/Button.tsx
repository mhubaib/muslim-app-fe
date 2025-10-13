import FontAwesome from "@react-native-vector-icons/fontawesome";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle, View } from "react-native";
import { useTheme } from '../context/theme-context';

export default function Button({ title, onPress, isLoading, disabled, icon, style, size = "medium", loadingText }: {
    title: string;
    onPress: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    icon?: any;
    style?: ViewStyle;
    size?: 'small' | 'medium' | 'large';
    loadingText?: string;
}) {
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        button: {
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.button.background, // Menggunakan warna primary dari tema
        },
        small: {
            padding: 5,
        },
        medium: {
            padding: 10,
        },
        large: {
            padding: 15,
        },
        text: {
            color: colors.button.text, // Menggunakan warna text dari tema
        },
        smallText: {
            fontSize: 12,
        },
        mediumText: {
            fontSize: 16,
        },
        largeText: {
            fontSize: 20,
        },
        loadingStyle: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    })

    const buttonStyle = [
        styles.button,
        style,
        size === 'small' && styles.small,
        size === 'medium' && styles.medium,
        size === 'large' && styles.large,
    ];
    const textStyle = [
        styles.text,
        size === 'small' && styles.smallText,
        size === 'medium' && styles.mediumText,
        size === 'large' && styles.largeText,
    ];

    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={disabled || isLoading}>
            {icon && (
                <FontAwesome name={icon} size={20} color={colors.button.text} /> // Menggunakan warna text dari tema
            )}
            {isLoading ? (
                <View style={styles.loadingStyle}>
                    <ActivityIndicator color={colors.button.text} /> // Menggunakan warna text dari tema
                    <Text style={textStyle}>{loadingText || 'Loading'}</Text>
                </View>
            ) : (
                <Text style={textStyle}>{title}</Text>
            )}
        </TouchableOpacity>
    )

}