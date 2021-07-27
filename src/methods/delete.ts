import { Model, Item } from '@vuex-orm/core'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import {path as pathHelper} from '@/helpers/path'
import {parser} from '@/helpers/parser'
import {Service} from '@/Service.js'
import { ServiceRequestParsingConfig, ServiceAxiosRequestConfig, ServiceOrmInsertConfig } from '@/ServiceConfig';

export async function del(service: Service, path:string | null = null, config:any | null  = {}, id:string | number ): Promise<boolean|never[]|Record<string, unknown>|[]|null>
{
  const axiosRequestConfig:AxiosRequestConfig = ServiceAxiosRequestConfig.fromExist(service.axiosRequestConfig, config)
  const requestParsingConfig:ServiceRequestParsingConfig = ServiceRequestParsingConfig.fromExist(service.requestParsingConfig, config)
  const ormInsertConf:ServiceOrmInsertConfig = ServiceOrmInsertConfig.fromExist(service.ormInsertConf, config)
  const relations: Array<Model> = config && config.relations? config.relations: []

  let model:Item<Model> = service.repository.find(id)
  if(!model) return null
  const response:AxiosResponse = await service.axios.delete(pathHelper(path?? model.apiPath, relations), axiosRequestConfig)

  // merge

  const values = Object.assign({}, model.$toJson(), parser(response, requestParsingConfig, service))

  // don't save if save = false
  if(!ormInsertConf.save) return values;

  const stored:boolean = await model.$delete();
  return stored
}
