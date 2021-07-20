import { Repository, Model } from '@vuex-orm/core'
import { AxiosInstance } from 'axios'
import { plainToClass } from 'class-transformer';
import getMethod from '@/methods/get'

export class ServiceConfig {
  dataKey:string = 'data'
  paginationKey:string =  'pagination'
}

export class Service {

  protected repository: Repository<Model>

  axios: AxiosInstance
  config: ServiceConfig

  constructor(repository: Repository<Model>, axios: AxiosInstance, options: any){
    this.repository = repository
    this.axios = axios
    this.config = plainToClass(ServiceConfig, options, { excludeExtraneousValues: true })

  }

  async get(path:string | null = null, config:any | null  = null){
    return await getMethod(this, path, config)
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
