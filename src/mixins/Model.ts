// import {kebabCase} from 'lodash'
import { Model } from '@vuex-orm/core';
import joinPath from '@/utils/joinPath'

export default function( model: typeof Model): void
{
  // base apiPath
  let baseApiPath:string | null = null
  Object.defineProperty(model.prototype, 'baseApiPath', {
    get():string  { return baseApiPath?? this.$self().entity },
    set(path:string):void { baseApiPath = path }
  })

  // apiPath
  Object.defineProperty(model.prototype, 'apiPath', {
    get():string  {
      let p = this.$self().baseApiPath
      if(this.$id) p = joinPath(p, this.$id.toString())
      return p
    },
  })
}
