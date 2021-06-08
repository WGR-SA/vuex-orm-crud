import _ from 'lodash'
import joinPath from 'path.join';
import getMethod from '@/methods/get.js';

export default class Service {

  model = null

  #paginator = {
    page: 1,
    limit: 1,
    path: '',
    config: {}
  }

  #pagination = {
    count: 1,
    current_page: 1,
    has_next_page: false,
    has_prev_page: false,
    limit: null,
    page_count: 1,
  }

  #config = {}

  #defaultConfig = {

    // call
    client: null,
    relations: [],

    // response
    dataKey: 'data',
    paginationKey: 'pagination',
    dataTransformer: null,
    filter: null,

    // store
    save: true,
    persistBy: 'insertOrUpdate',
    persistOptions: null,
  }

  constructor(model, config)
  {
    let msg = `ORM CRUD Service ${model.name} created`

    this.model = model
    this.config = config
  }

  set config(config)
  {
    // REST Client needs to be installed to make http requests
    if(_.isUndefined(this.#config.client))
    {
      let methods = ['post', 'put', 'get', 'delete']
      if (_.isUndefined(config.client)) throw new Error('HTTP-Client is not defined')
      methods.forEach(method => {if(_.isUndefined(config.client[method])) throw new Error(`HTTP Client has no '${method}' method`) })
    }

    // SET CONFIG
    let clone = Object.assign({}, this.#config)
    this.#config = Object.assign(this.#config, this.#defaultConfig, clone, config)
  }

  get config()
  {
    return this.#config
  }

  get client()
  {
    return this.#config.client
  }

  get pagination()
  {
    return this.#pagination
  }

  set pagination(pagination)
  {
    this.#pagination = pagination
  }

  get paginator()
  {
    return this.#paginator
  }

  get page()
  {
    return this.#paginator.page
  }

  set page(uint)
  {
    this.#paginator.page = uint
  }

  get limit()
  {
    return this.#paginator.limit
  }

  set limit(uint)
  {
    this.#paginator.limit = uint
  }

  async goTo(page)
  {
    this.page = page
    return await this.paginate(this.#paginator.path, this.#paginator.config)
  }

  async paginate(path = null, config = null, reset = false)
  {
    let page = reset? 1: this.page

    // store call
    Object.assign(this.#paginator, {page,path,config})

    // setup get config
    config = Object.assign({}, {
      params: {page: this.page, limit: this.limit},
      persistBy: 'create'
    }, config)

    return await this.get(path, config)
  }

  async getOne(id, config = null)
  {
    return await this.get(joinPath(this.model.apiPath, id.toString()), config)
  }

  async get(path = null, config = null)
  {
    return await getMethod(this, path, config)
  }

  save(where)
  {
    return this.model.query().where(where).get().shift().save
  }

  update(where)
  {
    return this.model.query().where(where).get().shift().update
  }
}
