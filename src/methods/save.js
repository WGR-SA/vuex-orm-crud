export default async function save(path, keys = Object.keys(this.$toJson()), config = null)
{
  /* TODO: parse config for specific: client, dataKey, save, persistBy, persistOptions */
  const conf = Object.assign({}, this.constructor.crud().config, config)

  const { post } = conf.client
  if(_.isUndefined(post)) throw new Error(`HTTP Client has no post method`)

  const data = this.pickKeys(keys)
  const response = await post(path, data, config)

  // merge
  const values = Object.assign({}, data, conf.dataKey? response.data[conf.dataKey]: response.data)

  /* TODO don't save if save = false */
  const stored = await this.$insert({data: values})
  return stored[this.constructor.entity][0]
}
