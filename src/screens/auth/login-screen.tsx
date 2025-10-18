import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../../components/Input'
import { useReducer } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AuthLayout from '../../layouts/auth-layout'
import { useTheme } from '../../context/theme-context'
import Button from '../../components/Button'
import LinkButton from '../../components/LinkButton'
import { useAuth } from '../../context/auth-context'

interface LoginState {
    email: string
    password: string
    error: string | null
}

interface EmailAction {
    type: 'email'
    payload: string
}

interface PasswordAction {
    type: 'password',
    payload: string
}

interface ErrorAction {
    type: 'error',
    payload: string | null
}

type LoginAction = EmailAction | PasswordAction | ErrorAction;

function loginReducer(state: LoginState, action: LoginAction) {
    switch (action.type) {
        case 'email':
            return { ...state, email: action.payload }
        case 'password':
            return { ...state, password: action.payload }
        case 'error':
            return { ...state, error: action.payload }
        default:
            throw new Error('Unhandled action type')
    }
}

export default function LoginScreen({ navigation }: { navigation: any }) {
    const [state, dispatch] = useReducer(loginReducer, { email: '', password: '', error: null })
    const { colors } = useTheme()
    const { login, isLoading } = useAuth()
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background
        },
        forgotPassword: {
            alignSelf: 'flex-end',
            color: colors.primaryAction,
            textDecorationLine: 'underline',
            marginVertical: 8,
        },
        signOptions: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 15,
            marginVertical: 20,
        },
        row: {
            height: 0.7,
            width: 65,
            backgroundColor: colors.mutedText
        },
        orSignWith: {
            fontSize: 14,
            color: colors.mutedText,
            fontWeight: '400',
        },
        signUpLink: {
            fontSize: 14,
            color: colors.mutedText,
            fontWeight: '400',
            textAlign: 'center',
            marginTop: 12,
        },
        signUp: {
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
            marginVertical: 8,
        }
    })


    const handleLogin = async ({ email, password }: { email: string, password: string }): Promise<any> => {
        dispatch({ type: 'error', payload: null }); 
        if (state.email.trim() === '' || state.password.trim() === '') {
            dispatch({ type: 'error', payload: 'Email and Password are required.' });
            return;
        }
        try {
            const result = await login(email, password)
            if (result) return true;
        } catch (error: any) {
            dispatch({ type: 'error', payload: error.message || 'Login failed.' });
            return false;
        }
    }

    const navigateToRegister = () => {
        navigation.navigate('register');
    }
    return (
        <SafeAreaView style={styles.container}>
            <AuthLayout
                heroTitle='Yuk, lanjutkan Ibadahmu'
                heroSubTitle='Masuk untuk melanjutkan perjalanan ibadahmu'
            >
                <Input
                    label='Email'
                    placeholder='user@sample.com'
                    leftIcon="envelope"
                    value={state.email}
                    onChangeText={(text) => dispatch({ type: 'email', payload: text })}
                />
                <Input
                    label='Password'
                    placeholder='********'
                    type='password'
                    leftIcon="lock"
                    value={state.password}
                    onChangeText={(password) => dispatch({ type: 'password', payload: password })}
                />
                {state.error && (
                    <Text style={styles.error}>{state.error}</Text>
                )}
                <Text style={styles.forgotPassword}>Forgot password?</Text>
                <Button
                    title='Masuk'
                    onPress={() => handleLogin({ email: state.email, password: state.password })}
                    size='large'
                    icon="sign-in"
                    isLoading={isLoading}
                    style={{ marginTop: 20 }}
                    disabled={isLoading}
                />
                <View style={styles.signOptions}>
                    <View style={styles.row} />
                    <Text style={styles.orSignWith}>Or sign with</Text>
                    <View style={styles.row} />
                </View>
                <View style={styles.signOptions}>
                    <LinkButton
                        icon="google"
                        iconColor={colors.primaryAction}
                    />
                    <LinkButton
                        icon="facebook"
                        iconColor="#0096c7"
                    />
                </View>
                <Text style={styles.signUpLink}>Don't have an account? <Text style={styles.signUp} onPress={navigateToRegister}>Sign Up</Text></Text>
            </AuthLayout>
        </SafeAreaView>
    )
}