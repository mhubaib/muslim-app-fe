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
            flexDirection: 'row',
            gap: 12,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primaryAction, // Menggunakan warna primary dari tema
        },
        small: {
            padding: 8,
        },
        medium: {
            padding: 10,
        },
        large: {
            padding: 12,
        },
        text: {
            color: colors.mainText, 
            fontFamily: 'poppins',
            fontWeight: '600'
        },
        smallText: {
            fontSize: 12,
        },
        mediumText: {
            fontSize: 14,
        },
        largeText: {
            fontSize: 16,
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
                <FontAwesome name={icon} size={20} color={colors.mainText} /> // Menggunakan warna text dari tema
            )}
            {isLoading ? (
                <View style={styles.loadingStyle}>
                    <ActivityIndicator color={colors.mainText} /> 
                    <Text style={textStyle}>{loadingText || 'Loading'}</Text>
                </View>
            ) : (
                <Text style={textStyle}>{title}</Text>
            )}
        </TouchableOpacity>
    )

}