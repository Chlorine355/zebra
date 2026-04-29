import { Button, KeyboardAvoidingView, Text, TextInput, TextStyle, ToastAndroid, View, ViewStyle } from "react-native"
import { pageStyle } from "../../../shared/assets/styles/Pages"
import React, { useEffect, useRef } from "react"
import { Marker, Yamap, YamapRef } from 'react-native-yamap-plus';
import { useUnit } from "effector-react";
import { $reportStore } from "../../../features/report/model/store/store";
import { changeReportStoreEv, sendReportFx } from "../../../features/report/model/store/actions";
import { validateReport } from "../../../features/report/helpers/validate";
import Icon from "react-native-vector-icons/Ionicons";


export const ReportPage2 = () => {
    const { report, isLoading } = useUnit({ report: $reportStore, isLoading: sendReportFx.pending });
    const mapRef = useRef<YamapRef>(null);
    const mapPressHandler = (event: any) => {
        const { lat, lon } = event.nativeEvent;
        changeReportStoreEv({ coords: { lat, lon } })
    }

    const sendHandler = () => {
        const validationResult = validateReport(report);
        if (validationResult.isValid) sendReportFx(report).then(() => ToastAndroid.show('Отправлено!', 2000)); else ToastAndroid.show(validationResult.message || 'Проверьте заполнение всех полей!', 2000)
    }

    useEffect(() => {
        mapRef.current?.getCameraPosition(({ zoom }) => {
            if (report.coords)
                mapRef.current?.setCenter(report.coords, zoom, 0, 0, 0.3)
        })
    }, [report.coords])

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
                onMapPress={mapPressHandler} >
                {report.coords && <Marker point={report.coords} visible zIndex={1000}><Icon style={styles.marker} size={24} name="location" color={'red'} /></Marker>
                }</Yamap>
        </View>
        <View style={styles.item}>
            <TextInput value={report.description ?? ''} onChangeText={(value) => changeReportStoreEv({ description: value })} multiline numberOfLines={5} placeholder={'Подробное описание'} />
        </View>
        <View style={styles.item}>
            {/* TODO: send iiiit */}
            <Button title={isLoading ? 'Отправка...' : "Отправить"} onPress={sendHandler} />
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
    },
    marker: {
        width: 24,
        height: 24,
    }
}