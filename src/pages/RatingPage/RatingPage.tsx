import { Text, TextStyle, View, ViewStyle } from "react-native"
import { pageStyle } from "../../shared/assets/styles/Pages"
import React, { useEffect, useState } from "react"
import { StatsType } from "./model/types"
import { loadStatsData } from "./lib/helpers"
import { STATUS_LABELS } from "../../shared/data/common"
import { ReportStatusEnum } from "../../shared/data/types"

const Item = ({ label, valueStyle, value = 0 }: { label: string, value?: number, valueStyle?: TextStyle }) => {
    return <View style={styles.item}>
        <Text style={styles.item_label}>{label}</Text>
        <Text style={{ ...styles.item_value, ...valueStyle }}>{value}</Text>
    </View>
}

export const RatingPage = () => {
    // TODO: in future, add global rating
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
                <Item value={data?.accepted_at_gai} label={STATUS_LABELS[ReportStatusEnum.acceptedAtGAI]} valueStyle={styles.text_success} />
                <Item value={data?.pending} label={STATUS_LABELS[ReportStatusEnum.pending]} />
                <Item value={data?.processing} label={STATUS_LABELS[ReportStatusEnum.processing]} />
                <Item value={data?.denied_at_gai} label={STATUS_LABELS[ReportStatusEnum.deniedAtGAI]} valueStyle={styles.text_warning} />
                <Item value={data?.denied_by_admin} label={STATUS_LABELS[ReportStatusEnum.deniedByAdmin]} valueStyle={styles.text_danger} />
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
        padding: 24,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 3,

    },
    item_label: {
        fontSize: 16,
        fontWeight: 500,

    },
    item_value: {
        fontSize: 16,
        fontWeight: 500,
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