import { AxiosInstance } from 'axios'
import {Service} from '@/Service'

declare module '@vuex-orm/core/dist/src/model/Model' {
  interface Model {
    /**
     * The axios instance.
     */
    apiPath: string
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
