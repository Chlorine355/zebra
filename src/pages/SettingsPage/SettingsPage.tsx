import { Switch, Text, TextStyle, View, ViewStyle } from "react-native"
import { pageStyle } from "../../shared/assets/styles/Pages"
import React, { useState } from "react"

export const SettingsPage = () => {
    // TODO: use value received from backend as default and send it to backend 
    const [sendNotifications, setSendNotifications] = useState<boolean>(true);
    return <View style={pageStyle}>
        <View style={styles.item}>
            <Text>Включить уведомления</Text>
            <Switch value={sendNotifications} onValueChange={setSendNotifications} />
        </View>
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