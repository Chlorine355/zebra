import { createStore } from "effector";
import { setAuthInstanceEv, AuthInstanceType, resetAuthInstanceEv, clearAuthInstanceEv } from "./actions";
import { createMMKV } from 'react-native-mmkv';


const storage = createMMKV();


const INITIAL_VALUE = {
    token: storage.getString('token'),
    username: storage.getString('username'),
    password: storage.getString('password'),
}

// saved credentials
export const $authInstance = createStore<AuthInstanceType>(INITIAL_VALUE)
    .on(setAuthInstanceEv, (store, payload) => ({ ...store, ...payload }))
    .on(clearAuthInstanceEv, () => ({}))
    .reset(resetAuthInstanceEv)


export const getAuthorization = () =>
    `Bearer ${$authInstance.getState()?.token}`;

$authInstance.watch(({ username, password, token }) => {
    storage.set('username', username || '');
    storage.set('password', password || '');
    storage.set('token', token || '');
})