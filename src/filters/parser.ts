import _ from 'lodash'

const
allowed = [
  'dataKey',
  'paginationKey',
  'dataTransformer',
  'filter',
],
filter = (obj:Record<string, unknown>, ...rest: []) :Record<string, unknown> =>  _.pick(Object.assign(obj, ...rest), allowed)

export default filter
