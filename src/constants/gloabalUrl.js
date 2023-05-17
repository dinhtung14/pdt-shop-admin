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
      value: "1",
      name: "Waiting confirmation",
    },
    {
      value: "2",
      name: "Confirm",
    },
    {
      value: "3",
      name: "Preparing goods",
    },
    {
      value: "4",
      name: "Delivering",
    },
    {
      value: "5",
      name: "Successful delivery",
    },
    {
      value: "6",
      name: "Canceled",
    },
];
  
export const ORDER_STATUS_PAYMENT = [
    {
      value: 1,
      name: "Unpaid",
    },
    {
      value: 2,
      name: "Paid",
    },
]
  