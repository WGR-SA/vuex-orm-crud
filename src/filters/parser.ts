import { plainToClass } from 'class-transformer';

interface arrayManip {
  (value: string|[]|Record<string, unknown>, index?: number, array?: any[]): Record<string, unknown> | [];
}

export class ParserConfig
{
  dataKey: string = ''
  paginationKey?: string
  dataTransformer?: arrayManip
  filter?: arrayManip
}

export default (obj:Record<string, unknown>) :ParserConfig =>  plainToClass(ParserConfig, obj)
