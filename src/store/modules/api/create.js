import API from './index';

const create = ({ commit, state }) => {
    const { basePath, item } = state;
    return API.post(basePath, item).then(({ data }) => {
        commit('setItem', data);
    });
};

export default create;
