import { Button, PermissionsAndroid, ScrollView, Text, TextInput, TextStyle, ToastAndroid, TouchableOpacity, View, ViewStyle } from "react-native"
import { pageStyle } from "../../../shared/assets/styles/Pages"
import React, { useEffect, useRef } from "react"
import { Marker, Yamap, YamapRef } from 'react-native-yamap-plus';
import { useUnit } from "effector-react";
import { $reportStore } from "../../../features/report/model/store/store";
import { changeReportStoreEv, sendReportFx } from "../../../features/report/model/store/actions";
import { validateReport } from "../../../features/report/helpers/validate";
import Icon from "react-native-vector-icons/Ionicons";
import CheckBox from "@react-native-community/checkbox";
import { LocalNavigationProp } from "../../../shared/data/types";
import Geolocation from 'react-native-geolocation-service';


export const ReportPage2 = ({ navigation }: { navigation: LocalNavigationProp }) => {
    const { report, isLoading } = useUnit({ report: $reportStore, isLoading: sendReportFx.pending });
    const mapRef = useRef<YamapRef>(null);
    const mapPressHandler = (event: any) => {
        const { lat, lon } = event.nativeEvent;
        changeReportStoreEv({ coords: { lat, lon } })
    }

    const sendHandler = () => {
        const validationResult = validateReport(report);
        if (validationResult.isValid)
            sendReportFx(report).then(() => {
                ToastAndroid.show('Отправлено!', 2000);
                navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
            }).catch(() => ToastAndroid.show('При отправке произошла ошибка', 2000));
        else ToastAndroid.show(validationResult.message || 'Проверьте заполнение всех полей!', 2000)
    }

    const locationClickHandler = async () => {
        const permissionGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (!permissionGranted) {
            const result = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION]);
            if (result["android.permission.ACCESS_FINE_LOCATION"] !== 'granted') return
        }
        // might need to patch node_modules\react-native-geolocation-service\android\build.gradle: 18.0.0 -> 21.0.1
        Geolocation.getCurrentPosition(
            (position) => {
                changeReportStoreEv({ coords: { lat: position.coords.latitude, lon: position.coords.longitude } })
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
        );

    }

    useEffect(() => {
        mapRef.current?.getCameraPosition(({ zoom }) => {
            if (report.coords)
                mapRef.current?.setCenter(report.coords, zoom, 0, 0, 0.3)
        })
    }, [report.coords])

    return <ScrollView contentContainerStyle={{ ...pageStyle, ...styles.page }}>
        <View style={styles.item}>
            <Text style={styles.label}>Выберите геолокацию</Text>
            <View style={styles.mapContainer}>
                <Yamap style={styles.map}
                    ref={mapRef}
                    onMapLoaded={() => { if (report.coords) mapRef.current?.setCenter(report.coords, 17, 0, 0, 0.3) }}
                    rotateGesturesDisabled
                    mapType={'vector'}
                    showUserPosition={false}
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
                <TouchableOpacity style={styles.locateButton} activeOpacity={0.8} onPress={locationClickHandler}>
                    <Icon size={32} name='locate' />
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.item}>
            <TextInput style={styles.textarea} value={report.gosnomer ?? ''} onChangeText={(value) => changeReportStoreEv({ gosnomer: value })} numberOfLines={1} placeholder={'Госномер нарушителя'} />
        </View>
        <View style={styles.item}>
            <TextInput style={styles.textarea} value={report.description ?? ''} onChangeText={(value) => changeReportStoreEv({ description: value })} multiline numberOfLines={5} placeholder={'Подробное описание...'} />
        </View>
        <View style={styles.horizontalItem}>
            <CheckBox value={report.agree} onValueChange={(value) => changeReportStoreEv({ agree: value })} />
            <Text style={styles.warning}>
                Подтверждаю правильность введённых данных и предупрежден(а) об ответственности за ложный донос
            </Text>
        </View>
        <View style={styles.item}>
            <Button title={isLoading ? 'Отправка...' : "Отправить"} onPress={sendHandler} disabled={!report.agree} />
        </View>
    </ScrollView>
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
    mapContainer: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        position: 'relative',
        overflow: 'hidden',
    },
    locateButton: {
        right: 20,
        bottom: 20,
        position: 'absolute',
        padding: 8,
        borderRadius: 32,
        overflow: 'hidden',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        width: '100%',
        height: 200,
    },
    marker: {
        width: 24,
        height: 24,
    },
    warning: {
        color: 'gray',
        width: '80%',
    },
    horizontalItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    textarea: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 12,
    },
    page: {
        rowGap: 24,
    }
}