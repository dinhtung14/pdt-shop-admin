export const ENDPOINT = {
    auth: {
        login: "/auth/login",
        register: "/auth/register",
        confirm: "/auth",
        updateInfo: "/auth",
        getAccessToken: "/auth/token",
    }
};

export const LOCAL_STORAGE = {
    accessToken: 'sober-admin-token',
    refreshToken: 'sober-admin-refresh-token',
};

export const ORDER_STATUS = [
    {
        value: "Chờ xác nhận",
        name: "Chờ xác nhận"
    },
    {
        value: "đang giao",
        name: "Đang giao"
    },
    {
        value: "Giao hàng thành công",
        name: "Giao hàng thành công"
    },
    {
        value: "Hủy",
        name: "Hủy"
    },

]