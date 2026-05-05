import { Button, Switch, Text, TextStyle, View, ViewStyle } from "react-native"
import { pageStyle } from "../../shared/assets/styles/Pages"
import React, { useState } from "react"
import { LocalNavigationProp } from "../../shared/data/types";

export const SettingsPage = ({ navigation }: { navigation: LocalNavigationProp }) => {
    // TODO: use value received from backend as default and send it to backend 
    const [sendNotifications, setSendNotifications] = useState<boolean>(true);
    const exitHandler = () => {
        // delete credentials etc, .then() => 
        navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
    }
    return <View style={pageStyle}>
        <View style={styles.item}>
            <Text>Включить уведомления</Text>
            <Switch value={sendNotifications} onValueChange={setSendNotifications} />
        </View>
        <Button title="Выйти из профиля" onPress={exitHandler} />
    </View>
}

const styles: Record<string, ViewStyle | TextStyle> = {
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}