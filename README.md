<p align="center">
<img width="192" src="https://github.com/vuex-orm/vuex-orm/raw/master/logo-vuex-orm.png" alt="Vuex ORM">
</p>

<h1 align="center">Vuex ORM Plugin: vuex-orm-crud</h1>

[Vuex-ORM](https://github.com/vuex-orm/vuex-orm) brings Object-Relational Mapping to the Vuex Store. vuex-orm-rest lets you communicate with RESTful backends.

The plugin extends the basic model of Vuex-ORM with some helful functions to make CRUD operations such as save, get, paginate, update, delete.

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
The following example installs the plugin using [axios](https://github.com/axios/axios) and registers two models to play with.

## Example

### note: CommonJS usage

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

### note: vuex-orm models
```javascript
// models/Page.js
import { Model } from '@vuex-orm/core'
import Section from './Section'

export default class Page extends Model
{
  static entity = 'pages'

  static fields ()
  {
    return {
      id: this.attr(null).nullable(),
      title: this.attr(null),

      sections: this.hasMany(Section, 'page_id'),
    }
  }
}

// models/Section.js
import { Model } from '@vuex-orm/core'
import Page from './Page'

export default class Section extends Model
{
  static entity = 'sections'

  static fields ()
  {
    return {
      id: this.attr(null).nullable(),
      page_id: this.attr(null),
      name: this.attr(null),

      page: this.belongsTo(Page, 'page_id'),
    }
  }
}
```

### note: Vue Component
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
  props:
  {
    pageId: Number
  },
  computed:
  {
    page()
    {
      return Page.query().with('sections').where(this.pageId).first()
    }
  },
  created()
  {
    // load some pages
    Page.crud().get()
    .then(this.readyToGo)
  },
  methods:
  {
    readyToGo()
    {
      console.log(this.page) // page is ready & store is full : )
    }
  }
}
</script>

```

## CRUD API
### Static class methods
Every model have a crud service

##### Model.crud()
this returns the service holding settings and client...


### Instance methods
##### (async) model.delete(path = null, keys = null, conf = null)
##### (async) model.save(path = null, keys = null, conf = null)
##### (async) model.update(path = null, keys = null, conf = null)
```javascript
this.section.update(
  null, // if null, the path is guested by _.kebabCase(section.entity) / section.$id
  ['order'], // we update only order prop
  [relations:[this.page]] // config.relations: here we add a path prefix with this.page ( = pages/$id )
)
```
...so here a PUT Method will be performed as follow:

```
Request URL: http://api/pages/1/sections/1
Request Method: PUT
Request Payload: {"order":1}
```
##### model.pickKeys(keys | null)
###### NOTE every instance can save/update/delete itself

### Service methods
##### (async) Model.crud().get(path = null, config = null)
returns records and stores the get query with conf.persistOptions as vuex-orm

```javascript
Section.crud().get(

  // path to your api crud model's endpoint
  null, // here path is guested by entity model's prop

  // conf object
  [
    // client
    client: null,

    // all axios settings are allowed
    onDownloadProgress: function (progressEvent) {
      // Do whatever you want with the native progress event
    },

    // model instance to prefix path calls (
    relations: [this.page], // here pages/id

    dataKey: 'data',
    paginationKey: 'pagination',
    dataTransformer: null,
    filter: null,

    // vuex-orm save strategies
    save: true,
    persistBy: 'insertOrUpdate',
    persistOptions: null,
  ]
)
```
...so here a GET Method will be performed as follow:

```
Request URL: http://api/pages/1/sections
Request Method: GET
```

##### (async) Model.crud().getOne(id, config = null)
fetches model/id record...
##### (async) Model.crud().paginate(path = null, config = null, reset = false)
handles pagination for you through some automated settings

```javascript
{
  params: {page: this.page, limit: this.limit}, // axios query params ?page=&limt=
  persistBy: 'create' // for the vuex-orm store behaviour
}
```

##### (async) Model.crud().goTo(page)
returns paginate methods result

### Service properties
##### Model.crud().config
##### Model.crud().client
##### (readonly) Model.crud().pagination

```javascript
{
  count: 1,
  current_page: 1,
  has_next_page: false,
  has_prev_page: false,
  limit: null,
  page_count: 1,
}
```

##### (readonly) Model.crud().paginator

```javascript
{
  page: 1,
  limit: 1,
  path: '',
  config: {}
}
```

##### Model.crud().page (int)
##### Model.crud().limit (int)

## Configure all your calls

when performing a get/getOne/save/upadte/delete call you can pass a config object

```javascript
{
  // client
  client: null,

  // all axios settings are allowed
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // model instance to prefix path calls (
  relations: [this.page], // here pages/id

  dataKey: 'data',
  paginationKey: 'pagination',
  dataTransformer: null, // function (response) return [] | {} | null #!if set: bypass the dataKey!
  filter: null, // Array.filter fct

  // vuex-orm save strategies
  save: true,
  persistBy: 'insertOrUpdate', // GET ONLY
  persistOptions: null, // GET ONLY
}
```

# TODO
* doc improvments + vue press 🙏
* tests
* add skills
* filtering in get methods
* and more
