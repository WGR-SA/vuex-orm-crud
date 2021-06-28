import * as _ from "lodash"
import { Repository } from '@vuex-orm/core'
import {Service} from '../Service.js'

export default function mixin(repository: typeof Repository, options: any): void {
  this.$crud = new Service(this.constructor, options)

  // Static Magic api path
  let _apiPath:string | null = null
  Object.defineProperty(repository.constructor, 'apiPath',
  {
    get: function() { return _apiPath?? _.kebabCase(this.entity) },
    set : function(path) { _apiPath = path }
  })
}
