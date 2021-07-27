export function joinPath(p1:string, p2:string):string
{
  if(p1.substr(-1) === '/') p1 = p1.substr(0, -1)
  if(p2.substr(0) === '/') p2 = p2.substr(1)
  return p1+'/'+p2;
}
