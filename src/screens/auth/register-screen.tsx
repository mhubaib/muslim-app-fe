import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../../components/Input'
import { useReducer, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../context/theme-context'
import AuthLayout from '../../layouts/auth-layout'
import Button from '../../components/Button'
import { useAuth } from '../../context/auth-context'

interface RegisterState {
    username: string
    email: string
    password: string
    confirmPassword: string
}

interface UsernameAction {
    type: 'username'
    payload: string
}

interface EmailAction {
    type: 'email'
    payload: string
}

interface Password {
    type: 'password'
    payload: string
}
interface ConfirmPassword {
    type: 'confirmPassword'
    payload: string
}

type RegisterAction = UsernameAction | EmailAction | Password | ConfirmPassword;

const registerReducer = (state: RegisterState, action: RegisterAction) => {
    switch (action.type) {
        case 'username':
            return { ...state, username: action.payload };
        case 'email':
            return { ...state, email: action.payload };
        case 'password':
            return { ...state, password: action.payload };
        case 'confirmPassword':
            return { ...state, confirmPassword: action.payload };
        default:
            return state;
    }
}

export default function RegisterScreen({ navigation }: { navigation: any }) {
    const { colors } = useTheme()
    const [err, setErr] = useState<string | null>(null)
    const { register, error, isLoading } = useAuth();
    const [state, dispatch] = useReducer(registerReducer, { username: '', email: '', password: '', confirmPassword: '' })

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background
        },
        signInLink: {
            fontSize: 14,
            color: colors.mutedText,
            fontWeight: '400',
            textAlign: 'center',
            marginTop: 25,
        },
        signIn: {
            color: colors.primaryAction,
            fontSize: 16,
            fontWeight: '600',
            textDecorationLine: 'underline',
        },
        error: {
            fontSize: 14,
            fontWeight: '600',
            textAlign: 'center',
            color: colors.errorState,
        }
    })

    const navigateToLogin = () => {
        navigation.navigate('login');
    }

    const handleRegister = async () => {
        setErr(null);

        // Validasi Username
        if (!state.username.trim()) {
            setErr('Username tidak boleh kosong');
            return;
        }
        if (state.username.length < 3) {
            setErr('Username minimal 3 karakter');
            return;
        }
        if (!/^[a-zA-Z0-9_.-]+$/.test(state.username)) {
            setErr('Username hanya boleh mengandung huruf, angka, dan karakter _.-');
            return;
        }

        // Validasi Email
        if (!state.email.trim()) {
            setErr('Email tidak boleh kosong');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(state.email)) {
            setErr('Format email tidak valid');
            return;
        }

        // Validasi Password
        if (!state.password) {
            setErr('Password tidak boleh kosong');
            return;
        }
        if (state.password.length < 6) {
            setErr('Password minimal 6 karakter');
            return;
        }
        if (!/[A-Z]/.test(state.password)) {
            setErr('Password harus mengandung setidaknya 1 huruf besar');
            return;
        }
        if (!/[0-9]/.test(state.password)) {
            setErr('Password harus mengandung setidaknya 1 angka');
            return;
        }

        // Validasi Confirm Password
        if (!state.confirmPassword) {
            setErr('Konfirmasi password tidak boleh kosong');
            return;
        }
        if (state.password !== state.confirmPassword) {
            setErr('Password dan konfirmasi password tidak cocok');
            return;
        }

        try {
            const result = await register(state.email, state.password, state.username);
            console.log('Register result:', result);
            if (result) {
                navigation.navigate('verify-email')
                console.log('Navigating to verify-email');
            }
        } catch (error) {
            setErr('Registrasi gagal. Periksa kembali data Anda.');
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <AuthLayout
                heroTitle='Yuk, lanjutkan Ibadahmu'
                heroSubTitle='Masuk untuk melanjutkan perjalanan ibadahmu'
            >
                <Input
                    label='Username :'
                    placeholder='username...'
                    value={state.username}
                    onChangeText={(text) => dispatch({ type: 'username', payload: text })}
                    leftIcon={'user'}
                />
                <Input
                    label='Email :'
                    placeholder='user@sample.com'
                    value={state.email}
                    onChangeText={(text) => dispatch({ type: 'email', payload: text })}
                    leftIcon={'envelope'}
                />
                <Input
                    label='Password :'
                    placeholder='********'
                    leftIcon={'lock'}
                    value={state.password}
                    onChangeText={(text) => dispatch({ type: 'password', payload: text })}
                    type='password'
                />
                <Input
                    label='Confirm Password :'
                    placeholder='********'
                    leftIcon={'lock'}
                    value={state.confirmPassword}
                    onChangeText={(text) => dispatch({ type: 'confirmPassword', payload: text })}
                    type='password'
                />
                {error && (
                    <Text style={styles.error}>{error}</Text>
                )}                
                {err && (
                    <Text style={styles.error}>{err}</Text>
                )}                
                <Button
                    title='Sign Up'
                    size='large'
                    icon={'sign-in'}
                    style={{ marginTop: 20 }}
                    onPress={handleRegister}
                    isLoading={isLoading}
                    disabled={isLoading}
                />
                <Text style={styles.signInLink}>Have an account? <Text style={styles.signIn} onPress={navigateToLogin}>Sign In</Text></Text>
            </AuthLayout>
        </SafeAreaView>
    )
}