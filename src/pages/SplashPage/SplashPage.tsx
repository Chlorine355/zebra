import { Text, TextStyle, View, ViewStyle } from "react-native"
import React, { useEffect } from "react"
import { LocalNavigationProp } from "../../shared/data/types"
import Icon from "react-native-vector-icons/MaterialIcons"

export const SplashPage = ({ navigation }: { navigation: LocalNavigationProp }) => {
    // TODO: check access, if success, redirect to Report1, if fail - to auth
    useEffect(() => {
        // imitate loading
        const isAuthSuccess = true;
        setTimeout(() => { navigation.navigate(isAuthSuccess ? "Tabs" : 'Auth') }, 1000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <View style={styles.page}>
        <View style={styles.main}>
            <Icon name="local-police" size={180} />
            <Text style={styles.label}>Народный инспектор</Text>
        </View>
    </View>
}

const styles: Record<string, ViewStyle | TextStyle> = {
    page: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
    },
    label: {
        fontSize: 24,
        textAlign: 'center'
    }
}