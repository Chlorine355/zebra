import { Button, Switch, Text, TextStyle, View, ViewStyle } from "react-native"
import { pageStyle } from "../../shared/assets/styles/Pages"
import React from "react"
import { LocalNavigationProp } from "../../shared/data/types";
import { clearAuthInstanceEv, setCurrentUserEv } from "../../shared/api/auth/actions";
import { useUnit } from "effector-react";
import { $currentUser } from "../../shared/api/auth/store";
import { apiService } from "../../shared/api/service/apiService";

export const SettingsPage = ({ navigation }: { navigation: LocalNavigationProp }) => {
    const currentUser = useUnit($currentUser)
    const exitHandler = () => {
        clearAuthInstanceEv();
        navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
    }

    const changeHandler = (value: boolean) => {
        if (currentUser) {
            setCurrentUserEv({ ...currentUser, receives_notifications: value })
            apiService.users.setNotifications({ receives_notifications: value })
        }
    }

    return <View style={pageStyle}>
        <View style={styles.item}>
            <Text>Включить уведомления</Text>
            <Switch value={!!currentUser?.receives_notifications} onValueChange={changeHandler} />
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