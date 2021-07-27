import { Model } from '@vuex-orm/core';
import { joinPath } from '@/utils/joinPath'

export function path(path:string, relations: Array<Model>): string
{
  if(relations.length)
  {
    const prefix = relations.reduce((result, value) => joinPath(result, value['apiPath']), '');
    path = joinPath(prefix, path)
  }

  return path;
}
