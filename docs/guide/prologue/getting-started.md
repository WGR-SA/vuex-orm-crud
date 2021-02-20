# Getting Started

This page is a quick start guide to begin using Vuex ORM CRUD. It assumes you have a basic understanding of [Vuex ORM](https://github.com/vuex-orm/vuex-orm). If you are not familiar with Vuex ORM, please visit [Vuex ORM Documentation](https://vuex-orm.org/) to learn about Vuex ORM.


## Setup

To setup Vuex ORM CURD, you must do as for Vuex ORM:

1. Define Models.
2. Register Models to Vuex.

And as extra:

3. Define a client such as axios
4. Register the plugin to VuexORM

Don't worry. It's much easier than you think.

### Define Models

Models represent schema of the data which is going to be stored in the Vuex Store. The schema would SHOULD be similar to the API response from the server, but it could be whatever you like as long as you can adjust the path with the optional setter/getter "apiPath"

You can declare models by extending Vuex ORM `Model`.

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

```js
// models/Section.js
import { Model } from '@vuex-orm/core'
import Page from './Page'

export default class Section extends Model
{
  static entity = 'sections'

  static apiPath = 'sections' // optional if your path is same name as entity!

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

### Register Models, create the client and add plugin to Vuex ORM

Now it's time for you to register Models to Vuex. As for regular Vuex ORM projetcs. But we create the client here and we  register the plugin to Vuex ORM.

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

Now you are ready to go. Vuex ORM is going to create an `entities` module in Vuex Store State by default, and register any Models under the `entities` namespace. The state tree inside Vuex Store is going to be as follows.

```js
{
  entities: {
    pages: {
      data: {}
    },
    sections: {
      data: {}
    }
  }
}
```

## Collect data from your API

You may use the `insert` method from any Model you registered to insert a new record in Vuex Store. But firstly you need to collect data from the server. But guess what ? Both are done in one time with a single call to model's function `get`:

```vue
<script>
import Page from '@/models/Page'

export default
{
  props: {
    pageId: Number
  },
  computed:
  {
    page() {
      return Page.query().with('sections').where(this.pageId).first()
    }
  },
  created()
  {
    // load some pages here !!
    Page.crud().get().then(this.readyToGo)
  },
  methods:
  {
    readyToGo(){
      console.log(this.page) // page is ready & store is full : )
    }
  }
}
</script>
```

With above action, Vuex ORM CRUD collects data from your API and creates the following schema in the Vuex Store using default `insertOrUpdate` method.

```js
// Inside `store.state.entities`.
{
  pages: {
    data: {
      1: {
        id: 1,
        title: 'Hello, world!'
      }
      ...
    }
  },

  sections: {
    data: {
      1: {
        id: 1,
        page_id: 1,
        name: 'Section One'
      }
      ...
    }
  }
}
```

See how to `save`, `update` and `delete` in the following doc!

## What's Next?

Vuex ORM CRUD offers a lot more features that help you deal with data. Please read through the documentation to find out more. Here are some good starting points to go from here.

//- [Defining Models](/guide/model/defining-models.md)
