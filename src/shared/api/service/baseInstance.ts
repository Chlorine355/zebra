import axios, { AxiosInstance } from "axios";
import { getAuthorization } from "../auth/store";

const commaParamsSerializer = {
    indexes: null,
    encode: encodeURIComponent,
};

export const axiosInstance = (baseURL: string): AxiosInstance => {
    return axios.create({
        baseURL,
        paramsSerializer: commaParamsSerializer,
        headers: {
            Authorization: getAuthorization(),
        },
    })
}