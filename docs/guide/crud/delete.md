# Delete

 The plugin provides an easy way to delete your data by exposing `delete()` method straight on the instance object.

 ```js
 import Page from '@model/Page'
 let page = Page.find(1)
 page.title = 'Changed'

 page.delete() // Will perform DELETE api/pages/1 with Model fields as body
 /* OR */
 page.delete(path, config) // Will perform DELETE api/{path}  with {config obj}
 ```

 ## How does it work ?

 Instead of using the Model class, you retrieve a Model instance and then, from the instance, you call `delete()` method. This call will preform following actions:

 1. A DELETE will be executed on corresponding route of your API
 2. The data will be deleted using the Model class of the instance.

 And TADA! All is handled for you. So the existing entity has been deleted in both the `API` and the `store`.

 ## More controll

 Of course you can customise and set the behaviour of this `delete()` method:

 ### delete

 - **`delete(path = null, keys = null, config = null): Promise`**

   Deletes the instance in the API and the Store.

   ```js
   const user = User.find(1)

   user.delte()
   ```

   - **path** String: custom path, default is the apiPath which is custom or entity String + $id.
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

    // if save, the entity will be also delete in the store
    save: true
   }
   ```

   more doc to come :)
