import { plainToClass } from 'class-transformer';

interface arrayManip {
  (value: string|[]|Record<string, unknown>, index?: number, array?: []): Record<string, unknown> | [];
}

export class ParserConfig
{
  dataKey: string = null
  paginationKey?: string = null
  dataTransformer?: arrayManip = null
  filter?: arrayManip = null
}

export default (obj:Record<string, unknown>) :ParserConfig =>  plainToClass(ParserConfig, obj)
