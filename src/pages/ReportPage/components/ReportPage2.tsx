import { Button, KeyboardAvoidingView, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { pageStyle } from "../../../shared/assets/styles/Pages"
import React, { useState } from "react"


export const ReportPage2 = () => {

    const [description, setDescription] = useState('');

    return <KeyboardAvoidingView style={pageStyle} behavior="height">
        <View style={styles.item}>
            {/* TODO: opens map */}
            <Button title="Выбрать геолокацию" />
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
    }
}