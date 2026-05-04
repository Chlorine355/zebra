import { Text, View } from "react-native"
import { pageStyle } from "../../shared/assets/styles/Pages"
import React from "react"
import { RouteProp } from "@react-navigation/native"
import { MainStackNavigationTemplate } from "../../shared/data/types"

export const SingleReportPage = ({ route }: { route: RouteProp<MainStackNavigationTemplate, 'SingleReport'> }) => {
    const { id } = route.params;
    return <View style={pageStyle}>
        <Text>
            Страница готового сообщения № {id}
        </Text>
    </View>
}