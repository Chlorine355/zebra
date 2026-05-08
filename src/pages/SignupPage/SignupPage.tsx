import { TouchableOpacity, View, ViewStyle, Text, TextStyle } from "react-native"
import React from "react"
import { LocalNavigationProp } from "../../shared/data/types"
import { TextInput } from "react-native"


export const SignupPage = ({ navigation }: { navigation: LocalNavigationProp }) => {
    return <View style={styles.page}>
        <TextInput style={styles.input} placeholder="Логин" />
        <TextInput style={styles.input} placeholder="Пароль" secureTextEntry />
        <TextInput style={styles.input} placeholder="Повторите пароль" secureTextEntry />
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