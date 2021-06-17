import _ from 'lodash'

const
allowed = [
  'relations',
],
filter = (obj:Record<string, unknown>, ...rest: []) :Record<string, unknown> => _.pick(Object.assign(obj, ...rest), allowed).relations

export default filter
