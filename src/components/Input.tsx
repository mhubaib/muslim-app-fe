import FontAwesome from "@react-native-vector-icons/fontawesome";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../context/theme-context";

interface InputProps {
    leftIcon?: any
    placeholder?: string
    value?: string
    label: string
    onChangeText?: (text: string) => void
    secureTextEntry?: boolean
    onFocus?: () => void
    onBlur?: () => void
    rightIcon?: any
    type?: 'text' | 'password'
}

export default function Input({ leftIcon, placeholder, value, onChangeText, type, onFocus, onBlur, rightIcon, label }: InputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false); // State untuk melacak fokus
    const { colors } = useTheme();

    const isPassword = type === 'password'
    const secureTextEntry = isPassword && !isPasswordVisible

    const changeVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const styles = StyleSheet.create({
        container: {
            width: '100%',
        },
        label: {
            fontFamily: 'poppins',
            fontSize: 16,
            fontWeight: '600',
            letterSpacing: 1,
            color: colors.mainText
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            backgroundColor: colors.mainSurface, // Warna latar belakang dinamis
            borderWidth: 1,
            borderColor: isFocused ? colors.primaryAction : colors.mainSurface, // Border dinamis saat fokus
            borderRadius: 8,
            marginVertical: 10,
            height: 50,
        },
        input: {
            flex: 1,
            color: colors.mainText,
            fontSize: 16,
            paddingHorizontal: 10,
        },
        icon: {
            color: colors.mutedText,
        }
    })

    return (
        <View style={styles.container}>
            {label && (
                <Text style={styles.label}>{label}</Text>
            )}
            <View style={styles.inputContainer}>
                {leftIcon && (
                    <FontAwesome name={leftIcon} size={20} color={styles.icon.color} />
                )}
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={colors.mutedText}
                    value={value}
                    onChangeText={onChangeText}
                    style={styles.input}
                    secureTextEntry={secureTextEntry}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {isPassword && (
                    <FontAwesome name={isPasswordVisible ? 'eye' : 'eye-slash'} size={20} color={styles.icon.color} onPress={changeVisibility} />
                )}
            </View>
        </View>
    )
}