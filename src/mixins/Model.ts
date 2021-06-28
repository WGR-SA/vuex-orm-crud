import { Model } from '@vuex-orm/core';

import apiPathMethod from '../methods/api-path'
import deleteMethod from '../methods/delete'
import saveMethod from '../methods/save'
import updateMethod from '../methods/update'
import pickKeysMethod from '../methods/pick-keys'

/*
declare global {
  interface Model {
    apiPath(path?: string): string | null;
    delete(path?: string, keys?: Array<string>, config?:Record<string, unknown>): Promise<null|Model>;
    save(path?: string, keys?: Array<string>, config?:Record<string, unknown>): Promise<null|Model>;
    update(path?: string, keys?: Array<string>, config?:Record<string, unknown>): Promise<null|Model>;
    pickKeys(keys?: Array<string>): [];
  }
}
*/

export default function( model: typeof Model): void
{
  // Instance
  model.constructor.prototype.apiPath = apiPathMethod
  model.constructor.prototype.delete = deleteMethod
  model.constructor.prototype.save = saveMethod
  model.constructor.prototype.update = updateMethod
  model.constructor.prototype.pickKeys = pickKeysMethod

}
