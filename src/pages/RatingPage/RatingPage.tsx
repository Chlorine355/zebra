import { Text, TextStyle, View, ViewStyle } from "react-native"
import { pageStyle } from "../../shared/assets/styles/Pages"
import React, { useEffect, useState } from "react"
import { StatsType } from "./model/types"
import { loadStatsData } from "./lib/helpers"

const Item = ({ label, valueStyle, value = 0 }: { label: string, value?: number, valueStyle?: TextStyle }) => {
    return <View style={styles.item}>
        <Text style={styles.item_label}>{label}</Text>
        <Text style={{ ...styles.item_value, ...valueStyle }}>{value}</Text>
    </View>
}

export const RatingPage = () => {
    // TODO: in future, add global rating
    // for now, it's pending (модерация), 
    // denied (отказано), 
    // processing (обработка в ГАИ), 
    // accepted at GAI (принято в ГАИ), 
    // denied at GAI (отказано в ГАИ)
    const [data, setData] = useState<StatsType | null>(null)
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        loadStatsData().then((response) => {
            setData(response);
        }).finally(() => {
            setLoading(false)
        })
    }, [])
    return <View style={pageStyle}>
        {isLoading
            ? <Text>Загрузка...</Text>
            : <View style={styles.stats}>
                <Item value={data?.acceptedAtGAI} label="Принято ГАИ" valueStyle={styles.text_success} />
                <Item value={data?.pending} label="На модерации" />
                <Item value={data?.processing} label="На рассмотрении ГАИ" />
                <Item value={data?.deniedAtGAI} label="Отклонено ГАИ" valueStyle={styles.text_warning} />
                <Item value={data?.deniedByAdmin} label="Предупреждения" valueStyle={styles.text_danger} />

            </View>}
    </View>
}

const styles: Record<string, ViewStyle | TextStyle> = {
    stats: {
        display: 'flex',
        gap: 12,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    item_label: {
        fontSize: 16,
    },
    item_value: {
        fontSize: 16,
    },
    text_success: {
        color: 'green'
    },
    text_warning: {
        color: 'orange'
    },
    text_danger: {
        color: 'crimson'
    }

}