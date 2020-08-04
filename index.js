import axios from "axios";
import { createModule } from "./module";
import { camelCaseToHyphen } from "./utils";

const http = axios.create();

const VuexRest = {
  install: (Vue, { base }) => {
    http.defaults.baseURL = base || "/";

    Vue.prototype.$rest = function(module) {
      const store = this.$store;

      if (!store.hasModule(module)) {
        store.registerModule(module, createModule(camelCaseToHyphen(module)));
      }

      const getters = {
        getByProperty: store.getters[`${module}/getByProperty`],
        getById: store.getters[`${module}/getById`],
        filterByProperty: store.getters[`${module}/filterByProperty`]
      };

      const rest = {
        get: (a = null, b = null) => {
          if (Number.isInteger(a))
            return store.dispatch(`${module}/get`, { id: a, params: b });
          else if (typeof a === "object")
            return store.dispatch(`${module}/get`, { params: a });
        },
        post: (data, params = null) =>
          store.dispatch(`${module}/add`, { data, params }),
        upload(a, b = null, c = null) {
          if (Number.isInteger(a) && typeof b === "string")
            return store.dispatch(`${module}/upload`, {
              id: a,
              prop: b,
              file: c
            });
          else if (Number.isInteger(a) && b instanceof File)
            return store.dispatch(`${module}/upload`, {
              id: a,
              file: b,
              params: c
            });
          else if (a instanceof File)
            return store.dispatch(`${module}/upload`, { file: a, params: b });
        },
        put(a, b = null, c = null) {
          if (Number.isInteger(a) && typeof b === "string")
            return store.dispatch(`${module}/set`, { id: a, prop: b, data: c });
          else if (Number.isInteger(a) && typeof b === "object")
            return store.dispatch(`${module}/set`, {
              id: a,
              data: b,
              params: c
            });
          else if (typeof a === "object")
            return store.dispatch(`${module}/set`, { data: a, params: b });
        },
        delete(a, b = null) {
          if (Number.isInteger(a))
            return store.dispatch(`${module}/remove`, { id: a, params: b });
          else if (typeof a === "object")
            return store.dispatch(`${module}/remove`, { params: a });
        },
        getters,
        list: store.state[module].list,
        item: store.state[module].item
      };

      return rest;
    };
  }
};

export { http };
export default VuexRest;
