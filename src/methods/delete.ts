import _ from 'lodash'
import axiosFilter from '../filters/axios.js'
import parserFilter from '../filters/parser.js'
import ormInsertFilter from '../filters/orm-insert.js'
import relationsFilter from '../filters/relations.js'
import pathHelper from '../helpers/path.js'
import parserHelper from '../helpers/parser.js'

export default async function del(path = null, keys = null, config = null): Promise<boolean>
{
  const
  conf = Object.assign({}, this.constructor.crud().config, config),
  axiosConf = axiosFilter(conf),
  parserConf = parserFilter(conf),
  ormInsertConf = ormInsertFilter(conf),
  relations = relationsFilter(conf)

  const { delete: del } = conf.client
  if(_.isUndefined(del)) throw new Error(`HTTP Client has no delete method`)

  const data = this.pickKeys(keys?? Object.keys(this.$toJson()))
  const response = await del(pathHelper(path?? this.apiPath(), relations), data, axiosConf)

  // merge
  const values = Object.assign({}, data, parserHelper(response, parserConf))

  // don't save if save = false
  if(!ormInsertConf.save) return values;

  const stored = await this.$delete();
  return stored
}
