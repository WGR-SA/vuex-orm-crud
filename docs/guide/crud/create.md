# Create

The plugin provides an easy way to save your data by exposing `save()` method straight on the instance object.

 ```js
 import Page from '@model/Page'
 let page = new Page({name: 'My page'})

 page.save() // Will perform POST api/pages with Model fields as body
 /* OR */
 page.save(path, keys, config) // Will perform POST api/{path} with {keys from model} as body with {config obj}
 ```

 ## How does it work ?

 Instead of using the Model class, you create a Model instance and then, from the instance, you call `save()` method. This call will preform following actions:

1. A POST will be executed on corresponding route of your API
2. The data will be stored using the Model class of the instance.

And TADA! All is handled for you. So the fresh entity has been created in both the `API` and the `store`.

## More controll

Of course you can customise and set the behaviour of this `save()` method:

### save

- **`save(path = null, keys = null, config = null): Promise`**

  Saves the instance in the API and the Store.

  ```js
  const user = new User({first_name:'toto', last_name: 'foo'})

  user.save()
  ```

- **path** String: custom path, default is the apiPath which is custom or entity String.
- **keys** Array: Keys to forward to the API, default is all model's fields
- **config** Object: An object you can pass with a lot of optional values. default is null:

```js
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
  dataTransformer: null,
  filter: null,

  // vuex-orm save strategies
  save: true,
  persistBy: 'insertOrUpdate',
  persistOptions: null,
}
```

more doc to come :)
