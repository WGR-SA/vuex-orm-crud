import _ from 'lodash'

const
allowed = [
  'dataKey',
  'paginationKey'
],
filter = (obj, ...rest) =>  _.pick(Object.assign(obj, ...rest), allowed)

export default filter
