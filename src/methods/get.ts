import { plainToClassFromExist } from 'class-transformer';
import { AxiosRequestConfig } from 'axios'
// import axiosFilter from '@/filters/axios'

class AxiosRequestConfigClass {}

const arcc: AxiosRequestConfig = new AxiosRequestConfigClass()

/*
import * as _ from "lodash"

import parserFilter from '../filters/parser.js'
import ormInsertFilter from '../filters/orm-insert.js'
import relationsFilter from '../filters/relations.js'
import pathHelper from '../helpers/path.js'
import parserHelper from '../helpers/parser.js'
*/
import {ServiceConfig, Service} from '@/Service.js'

export default async function get(service: Service, path:string | null = null, config:any | null  = {}): Promise<never[]|Record<string, unknown>|[]|null>
{
  // filter stuff
  let conf:ServiceConfig  = plainToClassFromExist(service.config, config)
  let axiosConf:AxiosRequestConfig = plainToClassFromExist(arcc, config, { excludeExtraneousValues: true, enableImplicitConversion: true })
  console.log(conf)
  console.log(path, conf, axiosConf)

  // records
  let records:any = [{name:'yo'}];

  return records;

  /*
  const
  conf = Object.assign({}, service.config, config),
  axiosConf = axiosFilter(conf),
  parserConf = parserFilter(conf),
  ormInsertConf = ormInsertFilter(conf),
  relations = relationsFilter(conf)

  // check client
  const { get } = conf.client
  if(_.isUndefined(get)) throw new Error(`HTTP Client has no get method`)

  // request
  const response = await get(pathHelper(path?? service.repository.apiPath, relations), axiosConf)
  const records = parserHelper(response, parserConf, service)

  // don't save if save = false
  if(!ormInsertConf.save) return records;

  // persistOptions
  const storeObject = {data: records, persistOptions: null}
  if(ormInsertConf.persistOptions) storeObject.persistOptions = ormInsertConf.persistOptions

  // switch method persistBy
  service.repository[ormInsertConf.persistBy](storeObject)

  return records;
  */
}
