import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../../components/Input'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../context/theme-context'
import AuthLayout from '../../layouts/auth-layout'
import { OtpInput } from 'react-native-otp-entry'
import Button from '../../components/Button'
import { useState } from 'react'
import { useAuth } from '../../context/auth-context'


export default function VerifyEmailScreen({ navigation, route }: { navigation: any, route: any }) {
    const { colors } = useTheme()
    const [otp, setOtp] = useState('')
    const [error, setError] = useState<string | null>(null)
    const { verifyEmail, isLoading } = useAuth()

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background
        },
        error: {
            fontSize: 14,
            fontWeight: '600',
            textAlign: 'center',
            color: colors.errorState,
            marginVertical: 8,
        },
        message: {
            fontSize: 14,
            color: colors.mutedText,
            textAlign: 'center',
            marginTop: 30,
        },
        link: {
            color: colors.primaryAction,
            textDecorationLine: 'underline',
        },
        button: {
            marginTop: 100,
        }
    })

    const handleResendOtp = async () => {
        // Implement resend OTP logic here
        // You might need to get the email from route.params
    }

    const handleVerifyOtp = async () => {
        setError(null)
        const emailFromRoute = route.params?.email || '';
        if (!emailFromRoute.trim() || !otp.trim()) {
            setError('Email and OTP are required.')
            return
        }
        try {
            await verifyEmail(emailFromRoute, otp)
        } catch (e: any) {
            setError(e.message || 'Email verification failed.')
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <AuthLayout
                heroTitle='Kode Verifikasi'
                heroSubTitle={`Silahkan masukkan kode yang telah dikirim pada ${route.params?.email ?? 'user@sample.com'}`}
            >
                <OtpInput
                    numberOfDigits={6}
                    placeholder='------'
                    focusColor={colors.primaryAction}
                    blurOnFilled={true}
                    type='numeric'
                    onTextChange={(code) => setOtp(code)}
                    theme={{
                        pinCodeContainerStyle: {
                            borderColor: colors.mainText
                        }
                    }}
                />
                {error && <Text style={styles.error}>{error}</Text>}
                <Text style={styles.message}>
                    Belum menerima kode?{' '}
                    <Text style={styles.link} onPress={handleResendOtp}>
                        Kirim ulang
                    </Text>
                </Text>
                <Button
                    title='Verifikasi'
                    size='large'
                    style={styles.button}
                    icon={'sign-in'}
                    onPress={handleVerifyOtp}
                    isLoading={isLoading}
                    disabled={isLoading}
                />
            </AuthLayout>
        </SafeAreaView>
    )
}