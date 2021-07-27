import { Model } from '@vuex-orm/core';
import {joinPath} from '@/utils/joinPath'

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
      let p = this.baseApiPath
      if(this.id) p = joinPath(p, this.id.toString())
      return p
    },
  })

  // pickKeys
  model.prototype.pickKeys = function(keys?: Array<string>):Record<string, unknown> {
    if(!keys) keys = Object.keys(this.$toJson())
    let obj = {}
    keys.forEach((v,k) => {obj[k] = v})
    return obj
  }
}
