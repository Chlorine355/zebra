import { Text, View } from "react-native"
import { pageStyle } from "../../shared/assets/styles/Pages"
import React, { useEffect } from "react"
import { LocalNavigationProp } from "../../shared/data/types"

export const SplashPage = ({ navigation }: { navigation: LocalNavigationProp }) => {
    // TODO: check access, if success, redirect to Report1, if fail - to auth
    useEffect(() => {
        // imitate loading
        const isAuthSuccess = true;
        setTimeout(() => { navigation.navigate(isAuthSuccess ? "Tabs" : 'Auth') }, 2000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <View style={pageStyle}><Text>Будущий сплэш! Типа загрузка...</Text></View>
}