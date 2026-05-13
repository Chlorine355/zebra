import { ReportDataType } from "../../data/types";
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
            return instance().post(apiLinks.auth.signup, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        }
    },
    reports: {
        create: (data: ReportDataType) => {
            return instance().post(apiLinks.reports.all, data)
        },
        getAll: () => {
            return instance().get(apiLinks.reports.all)
        },
        getOne: (data: { id: number }) => {
            return instance().get(apiLinks.reports.one, { params: { report_id: data.id } })
        }
    }
}