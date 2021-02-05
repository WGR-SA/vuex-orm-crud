export default async function update(path, keys = Object.keys(this.$toJson()), config = null)
{
  /* TODO: parse config for specific: client, dataKey, save, persistBy, persistOptions */
  const conf = Object.assign({}, this.constructor.crud().config, config)

  const { put } = conf.client
  if(_.isUndefined(put)) throw new Error(`HTTP Client has no put method`)

  const data = this.pickKeys(keys)
  const response = await put(path, data, config)

  // merge
  const values = Object.assign({}, data, conf.dataKey? response.data[conf.dataKey]: response.data)

  /* TODO don't save if save = false */
  const stored = await this.$update(values)
  return stored
}
