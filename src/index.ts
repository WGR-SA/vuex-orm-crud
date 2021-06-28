import { Store } from 'vuex'
import {VuexORMPluginComponents} from '@vuex-orm/core'
import storeMixin from './mixins/Store'
import repositoryMixin from './mixins/Repository'
import modelMixin from './mixins/Model'

export default
{
  install (store: Store<any>, components: VuexORMPluginComponents, options: any): void
  {
    storeMixin(store, options.client)
    repositoryMixin(components.Repository, options)
    modelMixin(components.Model)
  }
}
