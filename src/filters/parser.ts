import { plainToClass } from 'class-transformer';

const arrayFilter = (value: any, index: number, array: any[]):any => true
type ArrayFilter = typeof arrayFilter

export class ParserConfig
{
  dataKey: string = null
  paginationKey?: string = null
  dataTransformer?: Function = null
  filter?: ArrayFilter = null
}

export const filter = (obj:Record<string, unknown>) :ParserConfig =>  plainToClass(ParserConfig, obj)
