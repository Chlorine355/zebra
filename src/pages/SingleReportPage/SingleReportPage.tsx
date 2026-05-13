import { ScrollView, Text, TextStyle, View, ViewStyle } from "react-native"
import { pageStyle } from "../../shared/assets/styles/Pages"
import React, { useEffect, useRef, useState } from "react"
import { RouteProp } from "@react-navigation/native"
import { MainStackNavigationTemplate, ReportResponse } from "../../shared/data/types"
import { loadReportData } from "./lib/helpers"
import { StatusBadge } from "../../widgets/status/StatusBadge"
import Yamap, { Marker, YamapRef } from "react-native-yamap-plus"
import Icon from "react-native-vector-icons/Ionicons";
import { getDateTimeString } from "../../shared/lib/getDateTimeString"


export const SingleReportPage = ({ route }: { route: RouteProp<MainStackNavigationTemplate, 'SingleReport'> }) => {
    const { id } = route.params;
    const [data, setData] = useState<ReportResponse | null>(null)
    const [isLoading, setLoading] = useState(true);
    const mapRef = useRef<YamapRef>(null);


    useEffect(() => {
        loadReportData(id).then((response) => {
            setData(response);
        }).finally(() => {
            setLoading(false)
        })
    }, [id])
    return <ScrollView contentContainerStyle={pageStyle}>
        {isLoading && !data
            ? <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>
                    Загрузка...
                </Text>
            </View>
            : <>
                <View style={styles.item}>
                    <Text style={styles.label}>Статус</Text>
                    <StatusBadge status={data!.status} gap={8} />
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Нарушение</Text>
                    <Text>{data!.violation}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Геопозиция</Text>
                    <Yamap style={styles.map}
                        ref={mapRef}
                        showUserPosition
                        rotateGesturesDisabled
                        mapType={'vector'}
                        fastTapDisabled={false}
                        initialRegion={{
                            lat: data!.coords.lat,
                            lon: data!.coords.lon,
                            zoom: 16,
                            azimuth: 0,
                        }}>
                        <Marker point={data!.coords} visible zIndex={1000}><Icon style={styles.marker} size={24} name="location" color={'red'} /></Marker>
                    </Yamap>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Дата и время</Text>
                    <Text>{getDateTimeString(new Date(data!.datetime))}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Описание</Text>
                    <Text>{data!.description}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Ближайший адрес (автоматически)</Text>
                    <Text>{data!.address || 'Не определено'}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Госномер (автоматически)</Text>
                    <Text>{data!.gosnomer || 'Не определено'}</Text>
                </View>
                {/* TODO: фотки */}
            </>
        }
    </ScrollView >
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
    },
    map: {
        width: '100%',
        height: 200,
    },
    marker: {
        width: 24,
        height: 24,
    },
    label: {
        color: 'gray'
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },
}