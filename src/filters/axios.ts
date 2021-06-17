import _ from 'lodash'

const
allowed = [
  'baseURL',
  'transformRequest',
  'transformResponse',
  'headers',
  'params',
  'paramsSerializer',
  'timeout',
  'withCredentials',
  'adapter',
  'auth',
  'responseType',
  'responseEncoding',
  'xsrfCookieName',
  'xsrfHeaderName',
  'onUploadProgress',
  'onDownloadProgress',
  'maxContentLength',
  'maxBodyLength',
  'validateStatus',
  'maxRedirects',
  'socketPath',
  'httpAgent',
  'httpsAgent',
  'proxy',
  'cancelToken',
  'decompress',
],
filter = (obj:Record<string, unknown>, ...rest: []) :Record<string, unknown> =>  _.pick(Object.assign(obj, ...rest), allowed)

export default filter
