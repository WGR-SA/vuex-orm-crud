import { Model, Element } from '@vuex-orm/core'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import pathHelper from '@/helpers/path'
import parserHelper from '@/helpers/parser'
import {Service} from '@/Service.js'
import { ServiceRequestParsingConfig, ServiceAxiosRequestConfig, ServiceOrmInsertConfig } from '@/ServiceConfig';

export default async function save(service: Service, path:string | null = null, config:any | null  = {}, records: Element | Element[],keys: Array<string> | null = null ): Promise<never[]|Record<string, unknown>|[]|null>
{
  const axiosRequestConfig:AxiosRequestConfig = ServiceAxiosRequestConfig.fromExist(service.axiosRequestConfig, config)
  const requestParsingConfig:ServiceRequestParsingConfig = ServiceRequestParsingConfig.fromExist(service.requestParsingConfig, config)
  const ormInsertConf:ServiceOrmInsertConfig = ServiceOrmInsertConfig.fromExist(service.ormInsertConf, config)
  const relations: Array<Model> = config && config.relations? config.relations: []

  let data:Element | Element[] = []
  if(Array.isArray(records))
  {
    records.forEach(record => {
      let model:Model = service.repository.make(record)
      data.push(model.pickKeys(keys?? Object.keys(model.$toJson())))
    })
  } else {
    let model:Model = service.repository.make(records)
    data = model.pickKeys(keys?? Object.keys(model.$toJson()))
  }
  const response:AxiosResponse = await service.axios.post(pathHelper(path?? service.repository.getModel().baseApiPath, relations), data, axiosRequestConfig)

  // merge
  const values = Object.assign({}, data, parserHelper(response, requestParsingConfig, service))

  // don't save if save = false
  if(!ormInsertConf.save) return values;

  // switch method persistBy
  return service.repository[ormInsertConf.persistBy](values)
}
