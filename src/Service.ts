import { Repository, Model, Element } from '@vuex-orm/core'
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ServiceRequestParsingConfig, ServiceAxiosRequestConfig, ServiceOrmInsertConfig } from '@/ServiceConfig';
import getMethod from '@/methods/get'
import saveMethod from '@/methods/save'
import updateMethod from '@/methods/update'
import deleteMethod from '@/methods/delete'

export class Service {

  repository: Repository<Model>
  axios: AxiosInstance
  axiosRequestConfig: AxiosRequestConfig
  requestParsingConfig: ServiceRequestParsingConfig
  ormInsertConf:ServiceOrmInsertConfig
  pagination: any

  constructor(repository: Repository<Model>, axios: AxiosInstance, options: any) {
    this.repository = repository
    this.axios = axios
    this.axiosRequestConfig = ServiceAxiosRequestConfig.fromPlain(options)
    this.requestParsingConfig = ServiceRequestParsingConfig.fromPlain(options)
    this.ormInsertConf = ServiceOrmInsertConfig.fromPlain(options)
  }

  async get(path:string | null = null, config:any | null  = null){
    return await getMethod(this, path, config)
  }

  async save(records: Element | Element[],keys: Array<string> | null = null, path:string | null = null, config:any | null  = null,){
    return await saveMethod(this, path, config, records, keys)
  }

  async update(records: Element | Element[],keys: Array<string> | null = null, path:string | null = null, config:any | null  = null,){
    return await updateMethod(this, path, config, records, keys)
  }

  async delete(id: string | number, path:string | null = null, config:any | null  = null,){
    return await deleteMethod(this, path, config, id)
  }
}

export class ServiceFactory {

  protected repositoryClass: typeof Repository

  axios: AxiosInstance
  options: any
  registry: { [name: string]: Service } = {}

  constructor(repositoryClass: typeof Repository, axios: AxiosInstance, options: any){
    this.repositoryClass = repositoryClass
    this.axios = axios
    this.options = options
  }

  getService(repository: Repository<Model>): Service
  {
    let entity = repository.getModel().$self().entity
    if(!this.registry[entity])
    {
      this.registry[entity] = new Service(repository, this.axios, this.options)
    }
    return this.registry[entity]
  }
}
