import { Button, FlatList, Image, ImageStyle, ScrollView, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { pageStyle } from "../../../shared/assets/styles/Pages"
import React from "react"
import { Picker } from '@react-native-picker/picker';
import { VIOLATION_OPTIONS } from "../../../shared/data/common";
import DatePicker from 'react-native-date-picker'
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from "@react-navigation/native";
import { $reportStore } from "../../../features/report/model/store/store";
import { useUnit } from "effector-react";
import { addImagesEv, changeReportStoreEv, removeImageEv } from "../../../features/report/model/store/actions";
import Icon from "react-native-vector-icons/Ionicons";


export const ReportPage1 = () => {
    const report = useUnit($reportStore);
    const navigation = useNavigation();


    return <ScrollView contentContainerStyle={pageStyle}>
        <View style={styles.item}>
            {/* populate list */}
            <Text style={styles.label}>Вид нарушения</Text>
            <Picker
                numberOfLines={6}
                placeholder="Не выбрано"
                selectedValue={report.violation}
                onValueChange={(itemValue, _) =>
                    changeReportStoreEv({ violation: itemValue })
                }>
                {VIOLATION_OPTIONS.map((option) => <Picker.Item label={option.label} value={option.value} />)}
            </Picker>
        </View>
        <View style={styles.item}>
            <Text style={styles.label}>Дата и время</Text>
            <DatePicker
                date={report.date ?? new Date()}
                onDateChange={(date) => changeReportStoreEv({ date })}
            />
        </View>
        {report.images?.length ? <View style={[styles.item]}>
            {/* TODO: opens dialog: снимок с камеры или выбрать из галереи */}
            <FlatList
                data={report.images}
                horizontal
                keyExtractor={(image) => image.uri ?? image.id ?? ''}
                renderItem={
                    (image) =>
                        <View style={styles.imageContainer}>
                            <Image style={styles.img as ImageStyle} source={{ uri: image.item.uri }} />
                            <TouchableOpacity style={styles.closeIcon} activeOpacity={0.5} onPress={() => image.item.uri && removeImageEv(image.item.uri)}>
                                <Icon name='close' size={24} color='white' />
                            </TouchableOpacity>
                        </View>
                }
                contentContainerStyle={styles.images} />
        </View> : null}
        <View style={styles.item}>
            {/* TODO: opens dialog: снимок с камеры или выбрать из галереи */}
            <Button title={report.images?.length ? 'Добавить файлы' : "Приложить фото или видео"}
                onPress={() => {
                    launchImageLibrary({ mediaType: 'mixed', selectionLimit: 5, includeBase64: true },
                        (pickerResponse) => { if (pickerResponse.assets) addImagesEv(pickerResponse.assets) })
                }} />
        </View>
        <View style={[styles.item, styles.sendButton]}>
            <Button title="Далее" onPress={() => { navigation.navigate('Report2' as never) }} />
        </View>
    </ScrollView>
}

const styles: Record<string, ViewStyle | TextStyle | ImageStyle> = {
    item: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },
    sendButton: {
        marginTop: 'auto',
    },
    label: {
        color: 'gray'
    },
    img: {
        width: 100, height: 100,
        borderRadius: 24,
        objectFit: 'cover'
    },
    images: {
        flexDirection: 'row',
        gap: 4,
    },
    imageContainer: {
        position: 'relative'
    },
    closeIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 50,
    }
}