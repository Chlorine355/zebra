import { TouchableOpacity, View, ViewStyle, Text, TextStyle, ToastAndroid, Button } from "react-native"
import React, { useState } from "react"
import { LocalNavigationProp } from "../../shared/data/types"
import { TextInput } from "react-native"
import { apiService } from "../../shared/api/service/apiService"
import { setAuthInstanceEv } from "../../shared/api/auth/actions"


export const SignupPage = ({ navigation }: { navigation: LocalNavigationProp }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");


    const signup = () => {
        apiService.auth.signup({ username, password }).then(() => {
            // on successful signup, retrieve access token, redirect to tabs
            apiService.auth.authenticate({ username, password }).then(({ data }) => {
                setAuthInstanceEv({
                    username, password, token: data.access_token
                })
                navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
            })
        }).catch(() => ToastAndroid.show('Что-то пошло не так', 2000))
    }
    return <View style={styles.page}>
        <TextInput style={styles.input} placeholder="Логин" value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Пароль" secureTextEntry value={password} onChangeText={setPassword} />
        <TextInput style={styles.input} placeholder="Повторите пароль" secureTextEntry value={repeatPassword} onChangeText={setRepeatPassword} />
        <Button title='зарегистрироваться' onPress={signup} />
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Auth' }] })}>
            <Text style={styles.link}>Уже зарегистрированы? Войти</Text>
        </TouchableOpacity>
    </View>
}


export const styles: Record<string, ViewStyle | TextStyle> = {
    page: {
        paddingTop: 20,
        height: '100%',
        paddingHorizontal: 20,
        paddingBottom: 0,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 12,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        width: 300,
        paddingLeft: 8,
    },
    link: {
        color: 'gray',
    }
}