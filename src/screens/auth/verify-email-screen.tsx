import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../../components/Input'
import { useReducer } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../context/theme-context'
import AuthLayout from '../../layouts/auth-layout'

export default function VerifyEmailS() {
    const { colors } = useTheme()
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background
        }
    })
    return (
        <SafeAreaView style={styles.container}>
            <AuthLayout
                heroTitle='Yuk, lanjutkan Ibadahmu'
                heroSubTitle='Masuk untuk melanjutkan perjalanan ibadahmu'
            >
                <Input
                    label='Email'
                    placeholder='Masukkan email'
                />
                <Input
                    label='Email'
                    placeholder='Masukkan email'
                />
                <Input
                    label='Email'
                    placeholder='Masukkan email'
                />
            </AuthLayout>
        </SafeAreaView>
    )
}