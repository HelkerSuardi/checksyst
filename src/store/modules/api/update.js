import API from './index';

const update = ({ state }) => {
    const { basePath, item } = state;
    return API.put(`${basePath}/${item._id}`, item);
};

export default update;
