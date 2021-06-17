import _ from 'lodash'

const
allowed = [
  'save',
  'persistBy',
  'persistOptions',
],
filter = (obj:Record<string, unknown>, ...rest: []) :Record<string, unknown> =>  _.pick(Object.assign(obj, ...rest), allowed)

export default filter
