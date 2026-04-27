import { Button, KeyboardAvoidingView, Text, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { pageStyle } from "../../../shared/assets/styles/Pages"
import React, { useRef } from "react"
import { Circle, Yamap, YamapRef } from 'react-native-yamap-plus';
import { useUnit } from "effector-react";
import { $reportStore } from "../../../features/report/model/store/store";
import { changeReportStoreEv } from "../../../features/report/model/store/actions";


export const ReportPage2 = () => {
    const report = useUnit($reportStore);
    const mapRef = useRef<YamapRef>(null);
    const mapPressHandler = (event: any) => {
        const { lat, lon } = event.nativeEvent;
        changeReportStoreEv({ coords: { lat, lon } })
    }

    return <KeyboardAvoidingView style={pageStyle}>
        <View style={styles.item}>
            <Text style={styles.label}>Выберите геолокацию</Text>
            <Yamap style={styles.map}
                ref={mapRef}
                onMapLoaded={() => { if (report.coords) mapRef.current?.setCenter(report.coords, 17, 0, 0, 0.3) }}
                showUserPosition
                rotateGesturesDisabled
                mapType={'vector'}
                fastTapDisabled={false}
                initialRegion={{
                    lat: 56.326797,
                    lon: 44.006516,
                    zoom: 10,
                    azimuth: 0,
                }}
                onMapPress={mapPressHandler} >{report.coords && <Circle center={report.coords} radius={6.7} fillColor="transparent" strokeColor="red" strokeWidth={1} />
                }</Yamap>
        </View>
        <View style={styles.item}>
            <TextInput value={report.description ?? ''} onChangeText={(value) => changeReportStoreEv({ description: value })} multiline numberOfLines={5} placeholder={'Подробное описание (необязательно)'} />
        </View>
        <View style={styles.item}>
            {/* TODO: send iiiit */}
            <Button title="Отправить" />
        </View>
    </KeyboardAvoidingView>
}

const styles: Record<string, ViewStyle | TextStyle> = {
    item: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },
    label: {
        color: 'gray'
    },
    map: {
        width: '100%',
        height: 200,
        borderRadius: 24,
    }
}