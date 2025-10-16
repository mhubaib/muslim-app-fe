import FontAwesome from "@react-native-vector-icons/fontawesome";
import { StyleSheet,  TouchableOpacity } from "react-native";
import { useTheme } from "../context/theme-context";

interface LinkButtonProps {
    icon: any
    iconColor?: string
}

export default function LinkButton({ icon, iconColor = 'black' }: LinkButtonProps) {
    const { colors } = useTheme()

    const styles = StyleSheet.create({
        linkButton: {
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: colors.successState,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff'
        }
    })

    return (
        <TouchableOpacity style={styles.linkButton}>
            <FontAwesome name={icon} size={30} color={iconColor} />
        </TouchableOpacity>
    )
}
