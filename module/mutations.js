const mutations = {
  updateList: (state, data) => {
    if (Array.isArray(data)) state.list = data;
    else state.list = [];
  },
  refreshItem: (state, id) => {
    const item = state.list.find(v => v.id == id);
    if (item) state.item = item;
  },
  udateItem: (state, { id, data }) => {
    state.itemId = id;
    state.item = data;

    const item = state.list.find(v => v.id == id);

    if (!item) {
      state.list.push({ ...data, id });
    } else {
      for (let prop in data) item[prop] = data[prop];
    }
  },
  setProperty: (state, { id, prop, data }) => {
    const item = state.list.find(v => v.id == id);
    if (item) item[prop] = data;
  },
  remove: (state, id) =>
    state.list.splice(
      state.list.findIndex(v => v.id == id),
      1
    )
};

export default mutations;
