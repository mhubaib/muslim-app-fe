import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../../components/Input'
import { useReducer } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AuthContainer from '../../containers/auth-container'
import { useTheme } from '../../context/theme-context'

export default function LoginScreen() {
    const { colors } = useTheme()
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background
        }
    })
    return (
        <SafeAreaView style={styles.container}>
            <AuthContainer
                heroTitle='Yuk, lanjutkan Ibadahmu'
                heroSubTitle='Masuk untuk melanjutkan perjalanan ibadahmu'
            >
                <Input
                    label='Email'
                    placeholder='Masukkan email'
                />
                <Input
                    label='Password'
                    placeholder='********'
                    type='password'
                />
            </AuthContainer>
        </SafeAreaView>
    )
}