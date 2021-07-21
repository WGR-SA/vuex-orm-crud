import { AxiosInstance } from 'axios'
import { Model } from '@vuex-orm/core'
import {Service} from '@/Service'

declare module '@vuex-orm/core/dist/src/repository/Repository' {
  interface Repository<M extends Model = Model> {
    /**
     * The axios instance.
     */
    $crud: Service

    apiPath: string
  }
}
