import { ReactNode } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "../context/theme-context";

interface AuthContainerProps {
    children: ReactNode;
    heroTitle: string
    heroSubTitle: string
}

export default function AuthLayout({ children, heroTitle, heroSubTitle }: AuthContainerProps) {
    const { colors } = useTheme()

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
                style={styles.contentContainer}
                enableOnAndroid={true}
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.heroSection}>
                    <Text style={[styles.heroTitle, { color: colors.mainText }]}>{heroTitle}</Text>
                    <Text style={[styles.heroSubTitle, { color: colors.mutedText }]}>{heroSubTitle}</Text>
                </View>
                <View style={styles.children}>
                    {children}
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 50,
        padding: 14,
    },
    heroSection: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 40,
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: '600',
        letterSpacing: 0.3,
        textAlign: 'center'
    },
    heroSubTitle: {
        fontSize: 14,
        marginTop: 14,
        fontWeight: '400',
        letterSpacing: 1,
        textAlign: 'center',
    },
    children: {
        width: '100%',
        paddingHorizontal: 10,
    }
})