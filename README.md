<p align="center">
  <img width="192" src="https://github.com/vuex-orm/vuex-orm/raw/master/logo-vuex-orm.png" alt="Vuex ORM">
</p>

<h1 align="center">Vuex ORM Plugin: vuex-orm-crud</h1>

[Vuex-ORM](https://github.com/vuex-orm/vuex-orm) brings Object-Relational Mapping to the Vuex Store. vuex-orm-rest lets you communicate with RESTful backends.

The plugin extends the basic model of Vuex-ORM with some helful functions to make CRUD operations such as (save, fetch, fetchAll, update and delete).

You no longer need to access your http client manually. All the comunication happens thru the enhanced Vuex-ORM models.

# Dependencies

* [vuex](https://github.com/vuejs/vuex)

```bash
npm i vuex
```

* [Vuex-ORM](https://github.com/vuex-orm/vuex-orm)

```bash
npm i @vuex-orm/core
```

* [axios](https://github.com/axios/axios) (recommended)

```bash
npm i axios
```


# Installation

```bash
npm i @wgr-sa/vuex-orm-crud
```
The following example installs the plugin using [axios](https://github.com/axios/axios) as the HTTP-Client and a vue-router instance.

# Store  - Vuex

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import VuexORMCRUD from '@wgr-sa/vuex-orm-crud'
import axios from 'axios'

// models ( check vuex doc )
import Page from '../models/Page'
import Section from '../models/Section'

// DB
const database = new VuexORM.Database()
database.register(Page)
database.register(Section)

// Vuex ORM
const client = axios.create({ baseURL: '/api' })
VuexORM.use(VuexORMCRUD, { client })

Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [VuexORM.install(database)],
});
```

# Work with
```html
<template lang="html">
  <div class="">

   <h1>{{page.title}}</h1>
   
   <ul>
   	<li v-for="s in page.sections">{{s.name}}</li>
   </ul>

  </div>
</template>

<script>
import Page from '@/models/Page'
import Section from '@/models/Section'

export default
{
  name: 'page',
  props:
  {
    originalPage: Object
  },
  computed:
  {
    page()
    {
      return Page.query().with('sections').where(this.originalPage.id).first()
    }
  },
  created()
  {
    // load some pages
    Page.crud().get('cms/api/pages/'+this.originalPage.id)
  }
}
</script>

```

# API
## Class methods
* Model.crud() return the service 


## Instance methods
* (async) model.save(path, [..keys]) 
* (async) model.update(path, [..keys]) 
* model.pickKeys(keys | null)

## Service methods
* (async) Model.crud().get(path, config = null) returns records and stores the get query with conf.persistOptions as vuex-orm
* (async) Model.crud().paginate(path, config = null, reset = false) returns get methods result
* (async) Model.crud().goTo(page) returns paginate methods result

## Service properties
* Model.crud().config
* Model.crud().client
* (readonly) Model.crud().pagination
* (readonly) Model.crud().paginator
* Model.crud().page
* Model.crud().limit

