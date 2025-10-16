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
    loading: boolean
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

interface LoadingAction {
    type: 'loading',
    payload: boolean
}

interface ErrorAction {
    type: 'error',
    payload: string | null
}

type LoginAction = EmailAction | PasswordAction | LoadingAction | ErrorAction

function loginReducer(state: LoginState, action: LoginAction) {
    switch (action.type) {
        case 'email':
            return { ...state, email: action.payload }
        case 'password':
            return { ...state, password: action.payload }
        case 'loading':
            return { ...state, loading: action.payload }
        case 'error':
            return { ...state, error: action.payload }
        default:
            throw new Error('Unhandled action type')
    }
}

export default function LoginScreen() {
    const [state, dispatch] = useReducer(loginReducer, { email: '', password: '', loading: false, error: null })
    const { colors } = useTheme()
    const { login } = useAuth()
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background
        },
        forgotPassword: {
            alignSelf: 'flex-end',
            color: colors.primaryAction,
            textDecorationLine: 'underline'
        },
        signOptions: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 15,
            marginVertical: 30,
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
        }
    })


    const handleLogin = async ({ email, password }: { email: string, password: string }): Promise<any> => {
        dispatch({ type: 'loading', payload: true })    
        try {
            const result = await login(email, password)
            dispatch({ type: 'loading', payload: false })
        } catch (error) {
            dispatch({ type: 'loading', payload: false })
            dispatch({ type: 'error', payload: (error as Error).message })
        }
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
                <Text style={styles.forgotPassword}>Forgot password?</Text>
                <Button
                    title='Masuk'
                    onPress={() => handleLogin({ email: state.email, password: state.password })}
                    size='large'
                    icon="sign-in"
                    style={{ marginTop: 36 }}
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
            </AuthLayout>
        </SafeAreaView>
    )
}