import {AxiosInstance} from 'axios'
import {Repository} from '@vuex-orm/core'
import {ServiceFactory, Service} from '@/Service'

export default function mixin(repositoryClass: typeof Repository, axios: AxiosInstance, options: any): void {
  // crud
  const crudFactory = new ServiceFactory(repositoryClass, axios, options)
  Object.defineProperty(repositoryClass.prototype, '$crud', {
    get():Service  { return crudFactory.getService(this) }
  })
}
