# Delete

 doc todo

 ```js
 import Page from '@model/Page'
 let page = Page.find(1)
 page.title = 'Changed'

 page.delete() // Will perform DELETE api/pages/1 with Model fields as body
 /* OR */
 page.delete(path, config) // Will perform DELETE api/{path}  with {config obj}
 ```
