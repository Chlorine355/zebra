import { FlatList, Text, TextStyle, TouchableNativeFeedback, View, ViewStyle } from "react-native"
import React, { useEffect, useState } from "react"
import { ReportCardsResponse } from "./model/types"
import { loadReportCardsData } from "./lib/helpers"
import { LocalNavigationProp } from "../../shared/data/types"
import { getDateTimeString } from "../../shared/lib/getDateTimeString"
import { StatusBadge } from "../../widgets/status/StatusBadge"

export const ReportListPage = ({ navigation }: { navigation: LocalNavigationProp }) => {
    const [data, setData] = useState<ReportCardsResponse | null>(null)
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        loadReportCardsData().then((response) => {
            setData(response);
        }).finally(() => {
            setLoading(false)
        })
    }, [])
    return <View style={styles.page}>
        {isLoading
            ? <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>
                    Загрузка...
                </Text>
            </View>
            : data?.length ? <FlatList contentContainerStyle={styles.paddedList} data={data} renderItem={
                (item) => {

                    return (
                        <TouchableNativeFeedback style={styles.wrapper} onPress={() => navigation.navigate('SingleReport', { id: item.item.id })}>
                            <View style={styles.card}>
                                <View style={styles.top}>
                                    <Text style={styles.bold}>№ {item.item.id}</Text>
                                    <StatusBadge status={item.item.status} />
                                </View>
                                <View style={styles.main}>
                                    <Text>{item.item.violation}</Text>
                                    <Text style={styles.date}>{getDateTimeString(new Date(item.item.datetime))}</Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>)
                }} keyExtractor={(item) => String(item.id)} /> :

                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>
                        Вам повезло не встретить ни одного нарушения!
                    </Text>
                </View>}
    </View>
}

const styles: Record<string, ViewStyle | TextStyle> = {
    bold: {
        fontWeight: 500,
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        elevation: 6,
    },
    top: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    main: {
        padding: 16,
        flexGrow: 1,
    },
    page: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 12,
    },
    paddedList: {
        padding: 20,
        gap: 12,
    },
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
    date: {
        textAlign: 'right'
    },
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