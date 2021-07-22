import { AxiosInstance } from 'axios'
import {Service} from '@/Service'

declare module '@vuex-orm/core/dist/src/model/Model' {
  interface Model {
    /**
     * The axios instance.
     */
    baseApiPath: string
    apiPath: string
    pickKeys(keys?: Array<string>):Record<string, unknown>
  }
}

declare module '@vuex-orm/core/dist/src/repository/Repository' {
  interface Repository<M extends Model = Model> {
    /**
     * The axios instance.
     */
    $crud: Service
  }
}
