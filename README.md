<p align="center">
  <img width="192" src="https://github.com/vuex-orm/vuex-orm/raw/master/logo-vuex-orm.png" alt="Vuex ORM">
</p>

<h1 align="center">Vuex ORM Plugin: vuex-orm-crud</h1>

[Vuex-ORM](https://github.com/vuex-orm/vuex-orm) brings Object-Relational Mapping to the Vuex Store. vuex-orm-rest lets you communicate with RESTful backends.

The plugin extends the basic model of Vuex-ORM with some helful functions to make CRUD operations such as (save, fetch, fetchAll, update and delete).

You no longer need to access your http client manually. All the comunication happens thru the enhanced Vuex-ORM models.

# Dependencies

* [vuex](https://github.com/vuejs/vuex)

``` bash
yarn add vuex
```

* [Vuex-ORM](https://github.com/vuex-orm/vuex-orm)

``` bash
yarn add @vuex-orm/core
```

* [axios](https://github.com/axios/axios) (recommended)

``` bash
yarn add axios
```


# Installation

``` bash
yarn add @wgr/vuex-orm-crud
```
The following exmaple installs the plugin using [axios](https://github.com/axios/axios) as the HTTP-Client and a vue-router instance.

 ``` javascript
import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import VuexORMCRUD from '@wgr/vuex-orm-crud'
import axios from 'axios'

const client = axios.create({ baseURL: '/api' })
const database = new VuexORM.Database()

VuexORM.use(VuexORMCRUD, { client })
Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [VuexORM.install(database)],
});
```
