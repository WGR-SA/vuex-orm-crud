import {AxiosResponse} from 'axios'
import {Service} from '@/Service'
import {ParserConfig} from '@/filters/parser'

export default function parser(response:AxiosResponse, parserConf:ParserConfig, Service:Service): never[] | Record<string, unknown> | []
{
  // pagination
  if(Service && parserConf.paginationKey && response.data[parserConf.paginationKey])
  {
    const pagination = response.data[parserConf.paginationKey]
    Service.pagination = pagination
  }

  // records
  let records:any;

  // custom dataTransformer or dataKey !
  if (parserConf.dataTransformer) records = parserConf.dataTransformer(response.data)
  else records = parserConf.dataKey? response.data[parserConf.dataKey]: response.data

  //apply filter : )
  if(parserConf.filter && Array.isArray(records)) records = Array.from(records).filter(parserConf.filter)

  // return result !
  return records
}
