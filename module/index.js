import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const createModule = group => ({
  namespaced: true,
  state: {
    list: [],
    itemId: null,
    item: {},
    group: group || ""
  },
  getters,
  mutations,
  actions
});

export { createModule };
