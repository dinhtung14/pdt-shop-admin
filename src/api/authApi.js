import { ENDPOINT } from "constants/gloabalUrl"
import axiosClient from "./axiosClient"

const authApi = {
    confirm: () => {
        return axiosClient.get(ENDPOINT.auth.confirm);
    },
    getAccessToken: (data) => {
        return axiosClient.post(ENDPOINT.auth.getAccessToken, data);
    },
    login: (data) => {
        return axiosClient.post(ENDPOINT.auth.login, data)
    },
    getUser: ({ page, limit }) => {
        const url = `/user?page=${page}&limit=${limit}`;
        return axiosClient.get(url);
    },
    deleteUser: (id) => {
        const url = `/user/${id}`;
        return axiosClient.delete(url);
    }
}

export default authApi;