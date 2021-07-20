import { Repository, Model } from '@vuex-orm/core'
import { AxiosInstance } from 'axios'

export class Service {

  protected repository: Repository<Model>

  axios: AxiosInstance

  constructor(repository: Repository<Model>, axios: AxiosInstance, options: any){
    this.repository = repository
    this.axios = axios
    console.log(options)
  }

  hello():void {

  }
}

export class ServiceFactory {

  protected repositoryClass: typeof Repository

  axios: AxiosInstance

  options: any

  constructor(repositoryClass: typeof Repository, axios: AxiosInstance, options: any){
    this.repositoryClass = repositoryClass
    this.axios = axios
    this.options = options
  }

  getService(repository: Repository<Model>): Service
  {
    return new Service(repository, this.axios, this.options)
  }
}
