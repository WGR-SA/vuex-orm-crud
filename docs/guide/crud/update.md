# Update

 doc todo

 ```js
 import Page from '@model/Page'
 let page = Page.find(1)
 page.title = 'Changed'

 page.upate() // Will perform PUT api/pages/1 with Model fields as body
 /* OR */
 page.update(path, keys, config) // Will perform PUT api/{path} with {keys from model} as body with {config obj}
 ```
