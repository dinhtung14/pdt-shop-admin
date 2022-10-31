import axiosClient from './axiosClient';

const orderApi = {
	getAll: ({ page, limit }) => {
		const url = `/order/admin?page=${page}&limit=${limit}`;
		return axiosClient.get(url);
	}
}

export default orderApi;