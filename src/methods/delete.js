export default async function del(path, keys = Object.keys(this.$toJson()), config = null)
{
  /* TODO: parse config for specific: client, dataKey, save, persistBy, persistOptions */
  const conf = Object.assign({}, this.constructor.crud().config, config)

  const { delete: del } = conf.client
  if(_.isUndefined(del)) throw new Error(`HTTP Client has no delete method`)

  const data = this.pickKeys(keys)
  const response = await del(path, data, config)

  const stored = await this.$delete();
  return stored
}
