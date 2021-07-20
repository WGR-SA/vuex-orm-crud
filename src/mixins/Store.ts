import { AxiosInstance } from 'axios'
import { Store } from 'vuex'

export default function mixin(store: Store<any>, axios?: AxiosInstance): void {
  Object.defineProperty(store, '$client', {
    get: function() { return axios?? null }
  })
}
