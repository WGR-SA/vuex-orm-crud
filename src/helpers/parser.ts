import {Service} from '../Service'

import {ParserConfig} from '../filters/parser'

export default function parser(response:Record<string, unknown>, parserConf:ParserConfig, Service:Service = null): never[] | Record<string, unknown> | []
{
  // pagination
  if(Service && parserConf.paginationKey && response.data[parserConf.paginationKey])
  {
    const pagination = response.data[parserConf.paginationKey]
    Service.pagination = pagination
  }

  // records
  let records: never[] | Record<string, unknown> | [] = null;

  // custom dataTransformer or dataKey !
  if (parserConf.dataTransformer) records = parserConf.dataTransformer(this.response)
  else records = parserConf.dataKey? response.data[parserConf.dataKey]: response.data

  //apply filter : )
  if(parserConf.filter && Array.isArray(records)) records = records.filter(parserConf.filter)

  // return result !
  return records
}
