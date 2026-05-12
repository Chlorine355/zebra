import { apiLinks } from "./apiLinks";
import { axiosInstance } from "./baseInstance";
import { REACT_APP_BACKEND_URL } from '@env'

const instance = () =>
    axiosInstance(REACT_APP_BACKEND_URL);

export const apiService = {
    users: {
        current: () => {
            return instance().get(apiLinks.users.current)
        }
    },
    auth: {
        authenticate: (data: { username: string, password: string }) => {
            return instance().post(apiLinks.auth.token, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        }
    }
}