import { AxiosRequestConfig } from 'axios'
import { plainToClass, plainToClassFromExist, classToPlain } from 'class-transformer';

interface arrayManip {
  (value: string|[]|Record<string, unknown>, index?: number, array?: any[]): Record<string, unknown> | [];
}

export class ServiceRequestParsingConfig {
  static fromPlain(plain: any):ServiceRequestParsingConfig{
    return plainToClass(ServiceRequestParsingConfig, plain, { excludeExtraneousValues: true })
  }

  static fromExist(exist:ServiceRequestParsingConfig, plain: any):ServiceRequestParsingConfig {
    return plainToClassFromExist(exist, Object.assign(classToPlain(exist) , plain))
  }

  dataKey:string = 'data'
  paginationKey:string =  'pagination'
  dataTransformer?: arrayManip
  filter?: arrayManip
}

export class ServiceOrmInsertConfig {
  static fromPlain(plain: any):ServiceOrmInsertConfig {
    return plainToClass(ServiceOrmInsertConfig, plain, { excludeExtraneousValues: true })
  }

  static fromExist(exist:ServiceOrmInsertConfig, plain: any):ServiceOrmInsertConfig {
    return plainToClassFromExist(exist, Object.assign(classToPlain(exist) , plain))
  }
  save:boolean = true
  persistBy:string = 'save' // insert | fresh
}

export class ServiceAxiosRequestConfig {
  static fromPlain(plain: any):AxiosRequestConfig {
    return plainToClass(ServiceAxiosRequestConfig, plain, { excludeExtraneousValues: true })
  }

  static fromExist(exist:AxiosRequestConfig, plain: any):AxiosRequestConfig {
    return plainToClassFromExist(exist, Object.assign(classToPlain(exist) , plain))
  }
}
