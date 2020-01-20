import API from './index';

const paginate = ({ commit, state }) => {
    state.isLoading = true;
    const { basePath, filter, pagination, filterBy, populate } = state;
    const sortBy = pagination.sortBy;
    const direction = pagination.descending ? 'desc' : 'asc';
    const page = pagination.page;

    const path = `${basePath}/?order[${sortBy}]=${direction}`;

    const params = {
        [filterBy]: filter,
        page,
    };

    if (populate) {
        params['populate'] = populate;
    }

    return API.get(path, params).then(({ data }) => {
        commit('setItems', data.items);
        commit('setTotalItems', data.totalItems);
        state.isLoading = false;
    });
};

export default paginate;
