import { TextStyle, View, ViewStyle, Text } from "react-native"
import { STATUS_COLORS, STATUS_LABELS } from "../../shared/data/common"
import React from "react"
import { ReportStatusEnum } from "../../shared/data/types"

export const StatusBadge = ({ status, gap }: { status: ReportStatusEnum, gap?: number }) => {
    return (<View style={gap ? { ...styles.status, gap } : styles.status}>
        <View style={[styles.circle, { backgroundColor: STATUS_COLORS[status] }]} />
        <Text>{STATUS_LABELS[status]}</Text>
    </View>)
}


const styles: Record<string, ViewStyle | TextStyle> = {
    circle: {
        width: 8,
        height: 8,
        borderRadius: 8,
    },
    status: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
}