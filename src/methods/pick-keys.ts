import * as _ from "lodash"

export default function pickKeys(keys?: Array<string>):[]
{
  if(!keys) keys = Object.keys(this.$toJson())
  return _.omit(_.pick(this.$toJson(), keys), ['$id']);
}
