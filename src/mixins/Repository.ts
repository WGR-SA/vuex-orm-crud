import {kebabCase} from "lodash"
import {AxiosInstance} from 'axios'
import {Repository} from '@vuex-orm/core'
import {ServiceFactory, Service} from '@/Service'

export default function mixin(repositoryClass: typeof Repository, axios: AxiosInstance, options: any): void {
  // crud
  const crudFactory = new ServiceFactory(repositoryClass, axios, options)
  Object.defineProperty(repositoryClass.prototype, '$crud', {
    get():Service  { return crudFactory.getService(this) }
  })

  // apiPath
  let apiPath:string | null = null
  Object.defineProperty(repositoryClass.prototype, 'apiPath',{
    get: function() { return apiPath?? kebabCase(this.entity) },
    set : function(path) { apiPath = path }
  })
}
