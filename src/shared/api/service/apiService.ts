import { ReportRequestBodyType } from "../../data/types";
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
        },
        signup: (data: { username: string, password: string }) => {
            return instance().post(apiLinks.auth.signup, data)
        }
    },
    reports: {
        create: (data: ReportRequestBodyType) => {
            return instance().post(apiLinks.reports.create, data)
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