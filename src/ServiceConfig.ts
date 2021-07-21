import { AxiosRequestConfig } from 'axios'
import { Expose, plainToClass, plainToClassFromExist, classToPlain } from 'class-transformer';

interface arrayManip {
  (value: string|[]|Record<string, unknown>, index?: number, array?: any[]): Record<string, unknown> | [];
}

export class ServiceRequestParsingConfig {
  static fromPlain(plain: any):ServiceRequestParsingConfig{
    return plainToClass(ServiceRequestParsingConfig, Object.assign({dataKey: 'data', paginationKey:'pagination'} , plain), { excludeExtraneousValues: true })
  }

  static fromExist(exist:ServiceRequestParsingConfig, plain: any):ServiceRequestParsingConfig {
    return plainToClassFromExist(exist, Object.assign(classToPlain(exist) , plain))
  }

  @Expose() dataKey:string = 'data'
  @Expose() paginationKey:string =  'pagination'
  @Expose() dataTransformer?: arrayManip
  @Expose() filter?: arrayManip
}

export class ServiceOrmInsertConfig {
  static fromPlain(plain: any):ServiceOrmInsertConfig {
    return plainToClass(ServiceOrmInsertConfig, Object.assign({save: true, persistBy:'insert'} , plain), { excludeExtraneousValues: true })
  }

  static fromExist(exist:ServiceOrmInsertConfig, plain: any):ServiceOrmInsertConfig {
    return plainToClassFromExist(exist, Object.assign(classToPlain(exist) , plain))
  }
  @Expose() save:boolean = true
  @Expose() persistBy:string = 'insert' // save | insert | fresh
}

export class ServiceAxiosRequestConfig {
  static fromPlain(plain: any):AxiosRequestConfig {
    return plainToClass(ServiceAxiosRequestConfig, plain, { excludeExtraneousValues: true })
  }

  static fromExist(exist:AxiosRequestConfig, plain: any):AxiosRequestConfig {
    return plainToClassFromExist(exist, Object.assign(classToPlain(exist) , plain))
  }
}
