Utilitário para Vuex e API Rest.

## Instalando

Usando npm:

```bash
$ npm install axios
```

## Example

##### main.js

```js
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VuexRest from "./vuex-rest";

Vue.config.productionTip = false;

Vue.use(VuexRest, {
  base: "http://localhost/v1",
});

new Vue({
  store,
  render: (h) => App,
}).$mount("#app");
```

##### App.vue

```vue
<template>
  <v-app>
    <span>example</span>
  </v-app>
</template>

<script>
export default {
  computed: {
    examples() {
      return this.$rest("examples").list;
    },
  },
  beforeCreate() {
    this.$rest("examples").get();
  },
};
</script>
```

## API

##### $vm.$rest(module).get(Number id, ?Object params) // GET: /module/id?params

##### $vm.$rest(module).getAll(?Object params) // GET: /module?params

##### $vm.$rest(module).post(Object data, ?Object params) // POST: /module?params { ...data }

##### $vm.$rest(module).upload(File file, ?Object params) // POST: /module?params { ...file }

##### $vm.$rest(module).upload(Number id, String prop, File file) // POST: /module/id/prop { ...file }

##### $vm.$rest(module).upload(Number id, File file, ?Object params) // POST: /module/id?params { ...file }

##### $vm.$rest(module).put(Object data, ?Object params) // PUT: /module?params { ...data }

##### $vm.$rest(module).put(Number id, String prop, Object data) // PUT: /module/id/prop { ...data }

##### $vm.$rest(module).put(Number id, Object data, ?Object params) // PUT: /module/id?params { ...data }

##### $vm.$rest(module).delete(?Object params) // DELETE: /module?params

##### $vm.$rest(module).delete(Number id, ?Object params) // DELETE: /module/id?params
