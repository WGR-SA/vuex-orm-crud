import { Model } from '@vuex-orm/core'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import pathHelper from '@/helpers/path'
import parserHelper from '@/helpers/parser'
import {Service} from '@/Service.js'
import { ServiceRequestParsingConfig, ServiceAxiosRequestConfig, ServiceOrmInsertConfig } from '@/ServiceConfig';

export default async function get(service: Service, path:string | null = null, config:any | null  = {}): Promise<never[]|Record<string, unknown>|[]|null>
{
  const axiosRequestConfig:AxiosRequestConfig = ServiceAxiosRequestConfig.fromExist(service.axiosRequestConfig, config)
  const requestParsingConfig:ServiceRequestParsingConfig = ServiceRequestParsingConfig.fromExist(service.requestParsingConfig, config)
  const ormInsertConf:ServiceOrmInsertConfig = ServiceOrmInsertConfig.fromExist(service.ormInsertConf, config)
  const relations: Array<Model> = config.relations?? []

  // request
  const response:AxiosResponse = await service.axios.get(pathHelper(path?? service.repository.apiPath, relations), axiosRequestConfig)
  const records = parserHelper(response, requestParsingConfig, service)

  // don't save if save = false
  if(!ormInsertConf.save) return records;

  // switch method persistBy
  service.repository[ormInsertConf.persistBy](records)

  return records;
}
