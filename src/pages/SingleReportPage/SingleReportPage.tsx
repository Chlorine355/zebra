import { Text, TextStyle, View, ViewStyle } from "react-native"
import { pageStyle } from "../../shared/assets/styles/Pages"
import React, { useEffect, useState } from "react"
import { RouteProp } from "@react-navigation/native"
import { MainStackNavigationTemplate } from "../../shared/data/types"
import { loadReportData } from "./lib/helpers"
import { ReportResponse } from "../../features/report/model/types"

export const SingleReportPage = ({ route }: { route: RouteProp<MainStackNavigationTemplate, 'SingleReport'> }) => {
    const { id } = route.params;
    const [data, setData] = useState<ReportResponse | null>(null)
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        loadReportData(id).then((response) => {
            setData(response);
        }).finally(() => {
            setLoading(false)
        })
    }, [id])
    return <View style={pageStyle}>
        {isLoading
            ? <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>
                    Загрузка...
                </Text>
            </View>
            : <View></View>
        }
    </View>
}

const styles: Record<string, ViewStyle | TextStyle> = {
    placeholder: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    placeholderText: {
        textAlign: 'center',
        color: 'gray',
        maxWidth: '60%',
    }
}