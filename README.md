<p align="center">
  <img width="192" src="https://github.com/vuex-orm/vuex-orm/raw/master/logo-vuex-orm.png" alt="Vuex ORM">
</p>

<h1 align="center">Vuex ORM Plugin: vuex-orm-crud</h1>

[Vuex-ORM](https://github.com/vuex-orm/vuex-orm) brings Object-Relational Mapping to the Vuex Store. vuex-orm-rest lets you communicate with RESTful backends.

The plugin extends the basic model of Vuex-ORM with some helful functions to make CRUD operations such as save, get, paginate, update, delete.

You no longer need to access your http client manually. All the comunication happens thru the enhanced Vuex-ORM models.

# Dependencies

* [vuex](https://github.com/vuejs/vuex)

```bash
npm i vuex
```

* [Vuex-ORM](https://github.com/vuex-orm/vuex-orm)

```bash
npm i @vuex-orm/core
```

* [axios](https://github.com/axios/axios) (recommended)

```bash
npm i axios
```


# Installation

```bash
npm i @wgr-sa/vuex-orm-crud
```
The following example installs the plugin using [axios](https://github.com/axios/axios) as the HTTP-Client and a vue-router instance.

## Example

### note: CommonJS usage

```javascript
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
const client = axios.create({ baseURL: '/api' })
VuexORM.use(VuexORMCRUD, { client })

Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [VuexORM.install(database)],
});
```

### note: Vue Component
```html
<template lang="html">
  <div class="">

   <h1>{{page.title}}</h1>

   <ul>
   	<li v-for="s in page.sections">{{s.name}}</li>
   </ul>

  </div>
</template>

<script>
import Page from '@/models/Page'
import Section from '@/models/Section'

export default
{
  props:
  {
    pageId: Number
  },
  computed:
  {
    page()
    {
      return Page.query().with('sections').where(this.pageId).first()
    }
  },
  created()
  {
    // load some pages
    Page.crud().get()
    .then(this.readyToGo)
  },
  methods:
  {
  	readyToGo()
  	{
  		console.log(this.page) // page is ready & store is full : )
  	}
  }
}
</script>

```

## CRUD API
### Static class methods
Every model have a crud service

##### Model.crud()
this returns the service holding settings and client...


### Instance methods
##### (async) model.delete(path = null, keys = null, conf = null)
##### (async) model.save(path = null, keys = null, conf = null)
##### (async) model.update(path = null, keys = null, conf = null)
```javascript
this.section.update(
	null, // here path is guested by entity model's prop
	['order'], // we update only order prop
	[relations:[this.page]] // config, here we explain the path is prefixed by pages/id
)
```
...so here a PUT Method will be performed as follow:

```
Request URL: http://api/pages/1/sections/1
Request Method: PUT
Request Payload: {"order":1}
```
##### model.pickKeys(keys | null)
###### NOTE every instance can save/update/delete itself

### Service methods
##### (async) Model.crud().get(path = null, config = null)
returns records and stores the get query with conf.persistOptions as vuex-orm

```javascript
Section.crud().get(
	
	// path to your api crud model's endpoint
	null, // here path is guested by entity model's prop
	
	// conf object 
	[
		// all axios settings are allowed
		onDownloadProgress: function (progressEvent) {
	    	// Do whatever you want with the native progress event
	  	},
	  	
	  	// client & response settings
	  	client: null,
		dataKey: 'data',
		paginationKey: 'pagination',
		
		// vuex-orm save strategies
		save: true,
		persistBy: 'insertOrUpdate',
		persistOptions: null,
		
		// model instance to prefix path calls ( 
		relations: [this.page], // here pages/id
		
		// Array.filter options ( to do ... )
		filter: {},
	]
)
```
...so here a GET Method will be performed as follow:

```
Request URL: http://api/pages/1/sections
Request Method: GET
```

##### (async) Model.crud().getOne(id, config = null)
returns records and stores the get query with conf.persistOptions as vuex-orm
##### (async) Model.crud().paginate(path = null, config = null, reset = false)
returns get methods result
##### (async) Model.crud().goTo(page)
returns paginate methods result

### Service properties
##### Model.crud().config
##### Model.crud().client
##### (readonly) Model.crud().pagination
##### (readonly) Model.crud().paginator
##### Model.crud().page
##### Model.crud().limit

## Configure all your calls

when performing a get/getOne/save/upadte/delete call you can pass a config object

```javascript
{
	// all axios settings are allowed
	onDownloadProgress: function (progressEvent) {
    	// Do whatever you want with the native progress event
  	},
  	
  	// client & response settings
  	client: null,
	dataKey: 'data',
	paginationKey: 'pagination',
	
	// vuex-orm save strategies
	save: true,
	persistBy: 'insertOrUpdate',
	persistOptions: null,
	
	// model instance to prefix path calls ( 
	relations: [this.page], // here pages/id
	
	// Array.filter options ( to do ... )
	filter: {},
}
```

# TODO
* doc improvments
* tests
* webpack cleaning :)
* filtering in get methods
* and more
