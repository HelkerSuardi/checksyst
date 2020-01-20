import paginate from '../api/paginate';
import retrieve from '../api/retrieve';
import create from '../api/create';
import update from '../api/update';
import remove from '../api/remove';

const resetItem = ({ commit }, item = {}) => {
    commit('resetItem', item);
};

const setFilter = ({ commit }, filter) => {
    commit('setFilter', filter);
};

const setItem = ({ commit }, item) => {
    commit('setItem', item);
};

const setPagination = ({ commit }, pagination) => {
    commit('setPagination', pagination);
};

const resetList = ({ commit }) => {
    commit('resetItems');
    commit('resetTotalItems');
};

const setPopulate = ({ commit }, populate) => {
    commit('setPopulate', populate);
};

export default {
    resetItem,
    resetList,
    setFilter,
    setItem,
    setPagination,
    paginate,
    retrieve,
    create,
    update,
    remove,
    getItems: paginate,
    setPopulate,
};
