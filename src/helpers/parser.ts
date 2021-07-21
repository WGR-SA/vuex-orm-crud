import { Element, Elements } from '@vuex-orm/core'
import {AxiosResponse} from 'axios'
import {Service} from '@/Service'
import { ServiceRequestParsingConfig } from '@/ServiceConfig';

export default function parser(response:AxiosResponse, requestParsingConfig:ServiceRequestParsingConfig, service:Service): never[] | Element | Elements
{

  // pagination
  if(service && requestParsingConfig.paginationKey && response.data[requestParsingConfig.paginationKey])
  {
    const pagination = response.data[requestParsingConfig.paginationKey]
    service.pagination = pagination
  }

  // records
  let records:any;

  // custom dataTransformer or dataKey !
  if (requestParsingConfig.dataTransformer) records = requestParsingConfig.dataTransformer(response.data)
  else records = requestParsingConfig.dataKey? response.data[requestParsingConfig.dataKey]: response.data

  //apply filter : )
  if(requestParsingConfig.filter && Array.isArray(records)) records = Array.from(records).filter(requestParsingConfig.filter)

  // return result !
  return records
}
