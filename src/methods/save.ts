import { Model, Element } from '@vuex-orm/core'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import {path as pathHelper} from '@/helpers/path'
import {parser} from '@/helpers/parser'
import {Service} from '@/Service.js'
import { ServiceRequestParsingConfig, ServiceAxiosRequestConfig, ServiceOrmInsertConfig } from '@/ServiceConfig';

export async function save(service: Service, path:string | null = null, config:any | null  = {}, record: Element,keys: Array<string> | null = null ): Promise<never[]|Record<string, unknown>|[]|null>
{
  const axiosRequestConfig:AxiosRequestConfig = ServiceAxiosRequestConfig.fromExist(service.axiosRequestConfig, config)
  const requestParsingConfig:ServiceRequestParsingConfig = ServiceRequestParsingConfig.fromExist(service.requestParsingConfig, config)
  const ormInsertConf:ServiceOrmInsertConfig = ServiceOrmInsertConfig.fromExist(service.ormInsertConf, config)
  const relations: Array<Model> = config && config.relations? config.relations: []

  let data:Element
  let model:Model = service.repository.make(record)
  data = keys? model.pickKeys(keys): record

  const response:AxiosResponse = await service.axios.post(pathHelper(path?? model.baseApiPath, relations), data, axiosRequestConfig)

  // merge
  const values = Object.assign({}, data, parser(response, requestParsingConfig, service))

  // don't save if save = false
  if(!ormInsertConf.save) return values;

  // switch method persistBy
  return service.repository[ormInsertConf.persistBy](values)
}
