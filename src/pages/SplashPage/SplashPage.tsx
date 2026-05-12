import { Text, TextStyle, View, ViewStyle } from "react-native"
import React, { useEffect } from "react"
import { LocalNavigationProp } from "../../shared/data/types"
import Icon from "react-native-vector-icons/MaterialIcons"
import { apiService } from "../../shared/api/service/apiService"
import { $authInstance } from "../../shared/api/auth/store"
import { useUnit } from "effector-react"
import { setAuthInstanceEv } from "../../shared/api/auth/actions"

export const SplashPage = ({ navigation }: { navigation: LocalNavigationProp }) => {
    const { username, password } = useUnit($authInstance);
    useEffect(() => {
        apiService.users.current().then(() => {
            navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
        }).catch(() => {
            // fail in auth by token, try authenication
            if (username && password) {
                apiService.auth.authenticate({ username, password }).then(({ data }) => {
                    // on success, token is returned and saved, redirect to content
                    setAuthInstanceEv({
                        username, password, token: data.access_token
                    })
                    navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
                    // else redirect to login screen
                }).catch(() => {
                    navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
                })
            } else {
                navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation])
    return <View style={styles.page}>
        <View style={styles.main}>
            <Icon name="local-police" size={180} />
            <Text style={styles.label}>Народный инспектор</Text>
        </View>
    </View>
}

const styles: Record<string, ViewStyle | TextStyle> = {
    page: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
    },
    label: {
        fontSize: 24,
        textAlign: 'center'
    }
}