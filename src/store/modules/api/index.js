import { axiosAuthenticatedInstance } from 'boot/axios';

const get = (path, params = {}) => {
    return axiosAuthenticatedInstance.get(path, { params });
};

const put = (path, data) => {
    return axiosAuthenticatedInstance.put(path, data);
};

const post = (path, data) => {
    return axiosAuthenticatedInstance.post(path, data);
};

const del = path => {
    return axiosAuthenticatedInstance.delete(path);
};

export default { get, put, post, del };
