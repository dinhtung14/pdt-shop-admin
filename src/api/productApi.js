import axiosClient from './axiosClient';

const productApi = {
	getAll: ({ page, limit }) => {
		const url = `/product?page=${page}&limit=${limit}`;
		return axiosClient.get(url);
	},
	getAllCate: () => {
		const url = `/category`;
		return axiosClient.get(url);
	},
	delete: (id) => {
		const url = `product/${id}`;
		return axiosClient.delete(url);
	},
	create: (formData) => {
		const url = `/product`;
		return axiosClient.post(url, formData);
	},
	update: (id, data) => {
		const url = `/product/${id}`;
		return axiosClient.put(url, data);
	}
}

export default productApi;