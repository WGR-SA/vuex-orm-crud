# Create

Let's see how to create data Fetching your API

## Fetch from API

Based on Axios or Axios like client, let's see how to fetch data

```js
import Page from '@/models/Page'

export default {
  computed: {
    pages () {
      return Pages.all()
    }
  },
  created() {
    Pages.crud().get()
  }
}
```

Here the `created()` vue hook triggers the action. Via the `crud()` static method, we access the `Service` class we call its action `get()`. This will call two actions:

1. Fetch the API with GET /pages
2. Stores the result in the via Page Model class with default method `insertorUpdate`

The method `get()` returns a `Promise` a do all the work behind the seen.

## Fetch from Database

You can fetch models through database instance, which Vuex ORM injects into the Vuex Store instance. When you're doing SSR, you should be using this approach.

After installing Vuex ORM, you can access `$db` method in the store instance. `$db` will fetch the database instance, and from there, you can use the `model` method to retrieve the model object. You should pass the model's entity name as the argument.

```js
export default {
  computed: {
    users () {
      return this.$store.$db().model('users').all()
    }
  }
}
```

If you need to use the model object in many places, you can always define it separately.

```js
export default {
  computed: {
    User () {
      return this.$store.$db().model('users')
    },

    users () {
      return this.User.all()
    }
  }
}
```

You can also pass the model object as an argument. This is good, especially for TypeScript users, because now you'll get correct typings.

```ts
import Vue from 'vue'
import User from '@/models/User'

export default Vue.extend({
  computed: {
    User (): typeof User {
      return this.$store.$db().model(User)
    },

    users (): User[] {
      return this.User.all()
    }
  }
})
```

## Which to Use?

As the rule of thumb, if you want to do SSR, always fetch model from injected database instance.

When importing models via `import` statement, you're using the global singleton. Well, having a singleton object is not always bad. As long as you are using it in a single app, everything will work fine. However, it's a bad practice when doing SSR, as stated here at Vue SSR doc.

By importing models from the database instance, you can avoid having any stateful singleton. It's up to you which method you'll be using, but **we strongly recommend not to mix 2 methods in your app**. Decide one way to do it, and stick to it.
