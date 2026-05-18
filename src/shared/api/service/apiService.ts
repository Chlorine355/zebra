import { apiLinks } from "./apiLinks";
import { axiosInstance } from "./baseInstance";
import { REACT_APP_BACKEND_URL } from '@env'

const instance = () =>
    axiosInstance(REACT_APP_BACKEND_URL);

export const apiService = {
    users: {
        current: () => {
            return instance().get(apiLinks.users.current)
        },
        setNotifications: (data: { receives_notifications: boolean }) => {
            return instance().post(apiLinks.users.notifications, data)
        }
    },
    auth: {
        authenticate: (data: { username: string, password: string }) => {
            return instance().post(apiLinks.auth.token, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        },
        signup: (data: { username: string, password: string }) => {
            return instance().post(apiLinks.auth.signup, data,)
        }
    },
    reports: {
        create: (formdata: FormData) => {
            return instance().post(apiLinks.reports.create, formdata, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                transformRequest: () => {
                    return formdata;
                }
            })
        },
        getAll: () => {
            return instance().get(apiLinks.reports.all)
        },
        getOne: (data: { id: number }) => {
            return instance().get(apiLinks.reports.one, { params: { report_id: data.id } })
        },
        stats: () => {
            return instance().get(apiLinks.reports.stats)
        },
    }
}