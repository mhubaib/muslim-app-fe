import FontAwesome from "@react-native-vector-icons/fontawesome";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface InputProps {
    leftIcon?: any
    placeholder?: string
    value?: string
    onChangeText?: (text: string) => void
    secureTextEntry?: boolean
    setFocused?: () => void
    setBlur?: () => void
    rightIcon?: any
    type?: 'text' | 'password'
}

export default function Input({ leftIcon, placeholder, value, onChangeText, type, setFocused, setBlur, rightIcon }: InputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const isPassword = type === 'password'
    const secureTextEntry = isPassword && !isPasswordVisible

    const changeVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const styles = StyleSheet.create({
        inputContainer: 
    })
    
    return (
        <View style={styles.inputContainer}>
            {leftIcon && (
                <FontAwesome name={leftIcon} size={24} color={styles.icon} />
            )}
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#81C784"
                value={value}
                onChangeText={onChangeText}
                style={styles.input}
                secureTextEntry={secureTextEntry}
                onFocus={setFocused}
                onBlur={setBlur}
            />
            {isPassword && (
                <FontAwesome name={rightIcon} size={24} color={styles.icon} onPress={changeVisibility} />
            )}
        </View>
    )
}