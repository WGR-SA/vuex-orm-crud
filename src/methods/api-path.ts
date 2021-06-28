import joinPath from '../utils/joinPath'

export default function apiPath(path?: string): string | null
{
  let p = this.constructor.apiPath

  if(path) p = joinPath(path, p)
  if(this.$id) p = joinPath(this.constructor.apiPath, this.$id.toString())

  return p;
}
