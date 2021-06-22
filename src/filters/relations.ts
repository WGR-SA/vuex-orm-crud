import _ from 'lodash'

const
allowed = [
  'relations',
],
filter = (obj:Record<string, unknown>, ...rest: []) :any[] => _.pick(Object.assign(obj, ...rest), allowed).relations

export default filter
