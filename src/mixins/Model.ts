// import {kebabCase} from 'lodash'
import { Model } from '@vuex-orm/core';

export default function( model: typeof Model): void
{
  // apiPath
  let apiPath:string | null = null
  Object.defineProperty(model.prototype, 'apiPath', {
    get():string  { return apiPath?? this.$self().entity },
    set(path:string):void { apiPath = path }
  })
}
