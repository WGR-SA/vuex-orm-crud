# Client

I suggest to use Axios as client or any other client that exposes `get`, `post`, `put` and `delete` methods.

## Create and add client

Here at registration time we had our client with all needed configuration.

```js
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
const client = axios.create({ baseURL: '/api' }) // your api base url here!
VuexORM.use(VuexORMCRUD, { client })

Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [VuexORM.install(database)],
});
```

For illustration purpose we had the `baseURL`.

## How the client is used ?

Well the client is used within the calls at get/save/update/delete times. With corresponding methods. The client is stored in the Model's service and can be retrived as folow:

```js
Post.curd().client
```

### How to deal with API routes ?

The calls are made with client `baseURL` + Model's `apiPath` getter/setter method. If you do not define and  apiPath, then the Model's entity property will be used.

```js
// models/Page.js
import { Model } from '@vuex-orm/core'
import Section from './Section'

export default class Page extends Model
{
  static entity = 'pages'

  static apiPath = 'pages' // optional if your path is same name as entity!

  static fields ()
  {
    return {
      id: this.attr(null).nullable(),
      title: this.attr(null),

      sections: this.hasMany(Section, 'page_id'),
    }
  }
}
```

Then at any time you can override default settings and perform customised calls:

### Read

```js
Post.get() // Will perform GET api/pages
/* OR */
Post.get(path, config) // Will perform GET api/{path} with {config obj}
```

As you see, you keep control as with as regular Axios get method. The other methods based on Model instances are following the same concept. Her for `cretae` you can let magic operate or customise as desired:

### Create
```js
import Page from '@model/Page'
let page = new Page({name: 'My page'})

page.save() // Will perform POST api/pages with Model fields as body
/* OR */
page.save(path, keys, config) // Will perform POST api/{path} with {keys from model} as body with {config obj}
```

### Update
```js
import Page from '@model/Page'
let page = Page.find(1)
page.title = 'Changed'

page.upate() // Will perform PUT api/pages/1 with Model fields as body
/* OR */
page.update(path, keys, config) // Will perform PUT api/{path} with {keys from model} as body with {config obj}
```

### Delete
```js
import Page from '@model/Page'
let page = Page.find(1)
page.title = 'Changed'

page.delete() // Will perform DELETE api/pages/1 with Model fields as body
/* OR */
page.delete(path, config) // Will perform DELETE api/{path}  with {config obj}
```

## Nested Ressources

Some times ressources are nested and calls should be made using related path. Well the plugin handles it for you. Imagine a `Section` model is related to a `Page` Model with page_id. In this particular case to update the section entity, you can pass a page entity to build the nested route.

```js
import Page from '@model/Page'
let page = Page.query().whereId(1).with('sections').first()
let section = page.sections[0]
setion.title = 'As changed'

section.update(null, null, {
  relations: [page]
})
// UPDATE api/pages/1/sections/{id}
```
