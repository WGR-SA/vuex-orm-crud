import {AxiosInstance} from 'axios'
import { VuexORMPlugin } from '@vuex-orm/core'
import storeMixin from '@/mixins/Store'
import repositoryMixin from '@/mixins/Repository'
import modelMixin from '@/mixins/Model'

export interface Options {
  client: AxiosInstance
}

export const VuexORMCRUD: VuexORMPlugin = {
  install(store, components, options: Options) {
    storeMixin(store, options.client)
    repositoryMixin(components.Repository, options.client, options)
    modelMixin(components.Model)
  }
}
