# Read

Let's see how to fetching data from your API

## Fetch from API

Based on Axios or Axios like client, the plugin makes as `GET` request to the given URL.

```js
import Page from '@/models/Page'

export default {
  created() {
    Pages.crud().get()
  }
}
```

Here the `created()` vue hook triggers the action. Via the `crud()` static method, we access the `Service` class and we call its action `get()`. This will perform two actions:

1. Fetch the API with GET /pages
2. Store the result in the `db` via Page Model class with default method `insertorUpdate`

The method `get()` returns a `Promise` and do all the work behind the seen.

## Configure the path

You can configure the API's path in the model or let the plugin use the entity name

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
