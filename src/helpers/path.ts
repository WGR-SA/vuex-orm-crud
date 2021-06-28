import * as _ from "lodash";
import joinPath from '../utils/joinPath'

export default function createPath(path:string|null, relations = []): string | null
{

  if(relations.length)
  {
    const prefix = _.reduce(relations, (result, rel) => joinPath(result, rel.apiPath()), '');
    path = joinPath(prefix, path)
  }

  return path;
}
