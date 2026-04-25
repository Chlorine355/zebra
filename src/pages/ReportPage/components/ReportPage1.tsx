import { Button, FlatList, Image, ImageStyle, ScrollView, Text, TextStyle, View, ViewStyle } from "react-native"
import { pageStyle } from "../../../shared/assets/styles/Pages"
import React, { useState } from "react"
import { Picker } from '@react-native-picker/picker';
import { VIOLATION_OPTIONS } from "../../../shared/data/common";
import DatePicker from 'react-native-date-picker'
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from "@react-navigation/native";


export const ReportPage1 = () => {
    const [violation, setViolation] = useState();
    const [date, setDate] = useState(new Date());
    const [images, setImages] = useState<Asset[]>([]);
    const navigation = useNavigation();


    return <ScrollView contentContainerStyle={pageStyle}>
        <View style={styles.item}>
            {/* populate list */}
            <Text style={styles.label}>Вид нарушения</Text>
            <Picker
                selectedValue={violation}
                onValueChange={(itemValue, _) =>
                    setViolation(itemValue)
                }>
                {VIOLATION_OPTIONS.map((option) => <Picker.Item label={option.label} value={option.value} />)}
            </Picker>
        </View>
        <View style={styles.item}>
            <Text style={styles.label}>Дата и время</Text>
            <DatePicker
                date={date}
                onConfirm={setDate}
            />
        </View>
        {images.length ? <View style={[styles.item]}>
            {/* TODO: opens dialog: снимок с камеры или выбрать из галереи */}
            <FlatList
                data={images}
                horizontal
                renderItem={
                    (image) =>
                        <Image style={styles.img as ImageStyle} source={{ uri: image.item.uri }} />
                }
                contentContainerStyle={styles.images} />
        </View> : null}
        <View style={styles.item}>
            {/* TODO: opens dialog: снимок с камеры или выбрать из галереи */}
            <Button title={images.length ? 'Добавить изображения' : "Приложить изображения"}
                onPress={() => {
                    launchImageLibrary({ mediaType: 'photo', selectionLimit: 5 },
                        (pickerResponse) => setImages((prev) => [...prev, ...pickerResponse?.assets ?? []]))
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
    }
}