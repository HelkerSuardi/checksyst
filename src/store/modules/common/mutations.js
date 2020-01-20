const setFilter = (state, filter) => {
  Object.assign(state, { filter });
};

const resetItem = (state, item = {}) => {
  Object.assign(state, { item });
};

const resetItems = state => {
  Object.assign(state, { items: [] });
};

const resetTotalItems = state => {
  Object.assign(state, { totalItems: 0 });
};

const setItem = (state, item) => {
  Object.assign(state, { item });
};

const setItems = (state, items) => {
  Object.assign(state, { items });
};

const setTotalItems = (state, totalItems) => {
  Object.assign(state, { totalItems });
};

const setPagination = (state, pagination) => {
  Object.assign(state, { pagination });
};

const toggleLoading = state => {
  Object.assign(state, { isLoading: !state.isLoading });
};

const setPopulate = (state, populate) => {
  Object.assign(state, { populate });
};

const resetPopulate = state => {
  Object.assign(state, { populate: null });
};

export default {
  resetItem,
  resetItems,
  resetTotalItems,
  setFilter,
  setItem,
  setItems,
  setTotalItems,
  setPagination,
  toggleLoading,
  setPopulate,
  resetPopulate,
};
