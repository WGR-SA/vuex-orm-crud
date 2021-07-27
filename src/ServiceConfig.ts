import { AxiosRequestConfig, Method } from 'axios'

interface arrayManip {
  (value: string|[]|Record<string, unknown>, index?: number, array?: any[]): Record<string, unknown> | [];
}

interface SRPC {
  dataKey:string | null
  paginationKey:string
  dataTransformer?: arrayManip
  filter?: arrayManip
}

export class ServiceRequestParsingConfig {
  dataKey:string | null
  paginationKey:string
  dataTransformer?: arrayManip
  filter?: arrayManip

  constructor({dataKey = null, paginationKey = 'pagination', dataTransformer, filter} : SRPC){
    this.dataKey = dataKey
    this.paginationKey = paginationKey
    if(dataTransformer) this.dataTransformer = dataTransformer
    if(filter) this.filter = filter
  }

  static fromExist(exist:SRPC, plain: any):ServiceRequestParsingConfig {
    return new ServiceRequestParsingConfig(Object.assign({}, exist, plain))
  }
}

interface SOIC {
  save:boolean
  persistBy:string
}

export class ServiceOrmInsertConfig {
  save:boolean
  persistBy:string

  constructor({save = true, persistBy = 'save'} : SOIC) {
    this.save = save
    this.persistBy = persistBy
  }

  static fromExist(exist:ServiceOrmInsertConfig, plain: any):ServiceOrmInsertConfig {
    return new ServiceOrmInsertConfig(Object.assign({}, exist, plain))
  }
}

export class ServiceAxiosRequestConfig {
  url?: string
  method?: Method
  baseURL?: string
  headers?: any
  params?: any
  data?: any

  constructor({
    url,
    method,
    baseURL,
    headers,
    params,
    data,
  } : AxiosRequestConfig) {
    if(url) this.url = url
    if(method) this.method = method
    if(baseURL) this.baseURL = baseURL
    if(headers) this.headers = headers
    if(params) this.params = params
    if(data) this.data = data
  }

  static fromExist(exist:AxiosRequestConfig, plain: any):ServiceAxiosRequestConfig {
    return new ServiceAxiosRequestConfig(Object.assign({}, exist, plain))
  }
}
