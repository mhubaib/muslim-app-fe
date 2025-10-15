import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../../components/Input'
import { useReducer } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AuthContainer from '../../containers/auth-container'
import { useTheme } from '../../context/theme-context'
import Button from '../../components/Button'

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
                <Button
                    title='Masuk'
                    onPress={() => console.log('Masuk')}
                    size='large'
                    icon="sign-in"
                    style={{ marginTop: 20 }}
                />
            </AuthContainer>
        </SafeAreaView>
    )
}