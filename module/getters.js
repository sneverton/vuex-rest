const getters = {
  getByProperty: state => (prop, value) =>
    state.list.find(v => v[prop] == value),
  getById: state => id => getters.getByProperty(state)("id", id),
  filterByProperty: state => (prop, value) =>
    state.list.filter(v => v[prop] == value)
};

export default getters;
