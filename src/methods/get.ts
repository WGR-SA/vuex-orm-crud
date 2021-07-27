import { Model } from '@vuex-orm/core'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import {path as pathHelper} from '@/helpers/path'
import {parser} from '@/helpers/parser'
import {Service} from '@/Service.js'
import { ServiceRequestParsingConfig, ServiceAxiosRequestConfig, ServiceOrmInsertConfig } from '@/ServiceConfig';

export async function get(service: Service, path:string | null = null, config:any | null  = {}): Promise<never[]|Record<string, unknown>|[]|null>
{
  const axiosRequestConfig:AxiosRequestConfig = ServiceAxiosRequestConfig.fromExist(service.axiosRequestConfig, config)
  const requestParsingConfig:ServiceRequestParsingConfig = ServiceRequestParsingConfig.fromExist(service.requestParsingConfig, config)
  const ormInsertConf:ServiceOrmInsertConfig = ServiceOrmInsertConfig.fromExist(service.ormInsertConf, config)
  const relations: Array<Model> = config && config.relations? config.relations: []

  // request
  const response:AxiosResponse = await service.axios.get(pathHelper(path?? service.repository.getModel().baseApiPath, relations), axiosRequestConfig)
  const records = parser(response, requestParsingConfig, service)

  // don't save if save = false
  if(!ormInsertConf.save) return records;

  // switch method persistBy
  service.repository[ormInsertConf.persistBy](records)

  return records;
}
