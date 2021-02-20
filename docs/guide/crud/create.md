# Create

 doc todo

 ```js
 import Page from '@model/Page'
 let page = new Page({name: 'My page'})

 page.save() // Will perform POST api/pages with Model fields as body
 /* OR */
 page.save(path, keys, config) // Will perform POST api/{path} with {keys from model} as body with {config obj}
 ```
