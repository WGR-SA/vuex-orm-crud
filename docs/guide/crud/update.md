# Update

The plugin provides an easy way to update your data by exposing `update()` method straight on the instance object.

 ```js
 import Page from '@model/Page'
 let page = Page.find(1)
 page.title = 'Changed'

 page.upate() // Will perform PUT api/pages/1 with Model fields as body
 /* OR */
 page.update(path, keys, config) // Will perform PUT api/{path} with {keys from model} as body with {config obj}
 ```
 ## How does it work ?

 Instead of using the Model class, you retrieve a Model instance and then, from the instance, you call `update()` method. This call will preform following actions:

 1. A PUT will be executed on corresponding route of your API
 2. The data will be updated using the Model class of the instance.

 And TADA! All is handled for you. So the existing entity has been updated in both the `API` and the `store`.

 ## More controll

 Of course you can customise and set the behaviour of this `update()` method:

 ### update

 - **`update(path = null, keys = null, config = null): Promise`**

   Updates the instance in the API and the Store.

   ```js
   const user = User.find(1)
   user.first_name = 'changed'

   user.update()
   ```

 - **path** String: custom path, default is the apiPath which is custom or entity String + $id.
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
  relations: [], // here no nested ressource

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
