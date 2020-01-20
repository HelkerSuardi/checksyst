import API from './index';

const remove = ({ state }) => {
    const { basePath, item } = state;
    return API.del(`${basePath}/${item._id}`, item);
};

export default remove;
