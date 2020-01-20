import API from './index';

const retrieve = ({ commit, state }, id) => {
    state.isLoading = true;
    const { basePath, populate } = state;

    const params = {};
    if (populate) {
        params['populate'] = populate;
    }

    return API.get(`${basePath}/${id}`, params).then(({ data }) => {
        commit('setItem', data);
        state.isLoading = false;
        return data;
    });
};

export default retrieve;
