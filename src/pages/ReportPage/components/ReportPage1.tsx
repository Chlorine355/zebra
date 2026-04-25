import { Button, KeyboardAvoidingView, Text, TextStyle, View, ViewStyle } from "react-native"
import { pageStyle } from "../../../shared/assets/styles/Pages"
import React, { useState } from "react"
import { Picker } from '@react-native-picker/picker';
import { VIOLATION_OPTIONS } from "../../../shared/data/common";
import DatePicker from 'react-native-date-picker'
import { useNavigation } from "@react-navigation/native";


export const ReportPage1 = () => {
    const [violation, setViolation] = useState();
    const [date, setDate] = useState(new Date());
    const navigation = useNavigation();


    return <KeyboardAvoidingView style={pageStyle} behavior="height">
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
        <View style={styles.item}>
            {/* TODO: opens dialog: снимок с камеры или выбрать из галереи */}
            <Button title="Приложить фото или видео" />
        </View>
        <View style={styles.item}>
            <Button title="Далее" onPress={() => { navigation.navigate('Report2' as never) }} />
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