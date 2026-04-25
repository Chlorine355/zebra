import { Button, Text, View } from "react-native"
import { pageStyle } from "../../shared/assets/styles/Pages"
import React from "react"
import { LocalNavigationProp } from "../../shared/data/types"


export const AuthPage = ({ navigation }: { navigation: LocalNavigationProp }) => {
    return <View style={pageStyle}>
        <Text>Страница авторизации</Text>
        <Button title="Аминь" onPress={() => { navigation.navigate('Tabs') }} />
    </View>
}