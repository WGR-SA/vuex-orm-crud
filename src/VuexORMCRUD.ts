import {AxiosInstance} from 'axios'
import { Store } from 'vuex'
import { VuexORMPlugin, VuexORMPluginComponents } from '@vuex-orm/core'
import storeMixin from '@/mixins/Store'
import repositoryMixin from '@/mixins/Repository'
import modelMixin from '@/mixins/Model'

export interface Options {
  client: AxiosInstance
}

export const VuexORMCRUD: VuexORMPlugin = {
  install(store: Store<any>, components: VuexORMPluginComponents, options: Options):void {
    storeMixin(store, options.client)
    repositoryMixin(components.Repository, options.client, options)
    modelMixin(components.Model)
  }
}
