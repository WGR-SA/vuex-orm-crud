import { plainToClass } from 'class-transformer';

export class OrmConfig
{
  save: boolean = true
  persistBy: string = 'insertOrUpdate'
  persistOptions?: string = null
}

export default (obj:Record<string, unknown>) :OrmConfig =>  plainToClass(OrmConfig, obj)
