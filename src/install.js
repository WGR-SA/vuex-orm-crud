import _ from 'lodash';

/* eslint-disable no-param-reassign */
export default function install({ Model }, { client = null, useCache = true } = {})
{
  console.log('hello from CRUD');
  // REST Client needs to be installed to make http requests
  if (_.isUndefined(client)) {
    //throw new Error('HTTP-Client is not defined');
  }
}
/* eslint-enable no-param-reassign */
