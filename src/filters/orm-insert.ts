import { plainToClass } from 'class-transformer';

export class OrmConfig
{
  save = true
  persistBy = 'insertOrUpdate'
  persistOptions?: string
}

export default (obj:Record<string, unknown>) :OrmConfig =>  plainToClass(OrmConfig, obj)
