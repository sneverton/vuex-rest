import { http } from "../index";
import { filesUpload } from "../utils";

const actions = {
  get: ({ state, commit }, { id, params }) => {
    if (id) commit("refreshItem", id);

    params = params ? new URLSearchParams(params).toString() : "";

    let url = `/${state.group}`;
    if (id) url = url.concat("/" + id);
    if (params) url = url.concat("?" + params);

    return http.get(url).then(({ data }) => {
      if (id) commit("udateItem", { id, data });
      else commit("updateList", data);

      return data;
    });
  },
  add: ({ state, commit }, { data, params }) => {
    params = params ? new URLSearchParams(params).toString() : "";

    let url = `/${state.group}`;
    if (params) url = url.concat("?" + params);

    if (typeof data !== "object") {
      data = { value: data };
    }

    return http.post(url, data).then(({ data }) => {
      commit("updateList", data);
      return data;
    });
  },
  set: ({ state, commit }, { id, prop, data, params }) => {
    if (id && prop) {
      const data_ = state.list.find((v) => v.id == id)[prop];
      if (data == data_) return;
    } else if (id) {
      const data_ = state.list.find((v) => v.id == id);
      if (data == data_) return;
    }

    params = params ? new URLSearchParams(params).toString() : "";

    let url = `/${state.group}`;
    if (id) url = url.concat("/" + id);
    if (prop) url = url.concat("/" + prop);
    if (params) url = url.concat("?" + params);

    if (data instanceof FormData) {
      data = Object.fromEntries(data.entries());
    } else if (typeof data !== "object") {
      data = { value: data };
    }

    return http.put(url, data).then(() => {
      if (id && prop) {
        commit("setProperty", {
          id,
          prop,
          data: typeof data === "object" ? data.value : data,
        });
      } else if (id) {
        commit("udateItem", { id, data });
      }
    });
  },
  upload: ({ rootState, state, commit }, { id, prop, file, params }) => {
    params = params ? new URLSearchParams(params).toString() : "";

    let url = `${rootState.server}/${state.group}`;
    if (id) url = url.concat("/" + id);
    if (prop) url = url.concat("/" + prop);
    if (params) url = url.concat("?" + params);

    return filesUpload(url, [file]).response.then((data) =>
      commit("setProperty", { id, prop, data: data.file })
    );
  },
  remove: ({ state, commit }, { id, params } = {}) => {
    params = params ? new URLSearchParams(params).toString() : "";

    let url = `/${state.group}`;
    if (id) url = url.concat("/" + id);
    if (params) url = url.concat("?" + params);

    return http.delete(url).then(() => commit("remove", id));
  },
};

export default actions;
