import _ from 'lodash'
import { AxiosRequestConfig } from 'axios'

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
]

export default (obj:Record<string, unknown>, ...rest: []) :AxiosRequestConfig =>  _.pick(Object.assign(obj, ...rest), allowed)
