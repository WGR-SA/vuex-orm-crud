import { AxiosInstance } from 'axios'
import { Store } from 'vuex'

export default function mixin(store: Store<any>, axios?: AxiosInstance): void {
  if (axios) {
    store.$axios = axios
  }
}
