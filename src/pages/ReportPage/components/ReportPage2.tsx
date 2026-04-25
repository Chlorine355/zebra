import { Button, KeyboardAvoidingView, Text, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { pageStyle } from "../../../shared/assets/styles/Pages"
import React, { useState } from "react"
import { Yamap } from 'react-native-yamap-plus';


export const ReportPage2 = () => {

    const [description, setDescription] = useState('');

    return <KeyboardAvoidingView style={pageStyle}>
        <View style={styles.item}>
            {/* TODO: opens map */}
            <Text style={styles.label}>Выберите геолокацию</Text>
            <Yamap style={styles.map} />
        </View>
        <View style={styles.item}>
            <TextInput value={description} onChangeText={setDescription} multiline numberOfLines={5} placeholder={'Подробное описание (необязательно)'} />
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