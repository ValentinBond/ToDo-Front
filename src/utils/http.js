import axios from './axios';

export function httpRequest(options, params) {
  if (!options.url || !options.method) {
    return false;
  }

  const _method = options.method.toLowerCase();
  const dataParam =
    _method === 'post' || _method === 'put' || _method === 'patch'
      ? 'data'
      : 'params';

  const headers = {
    'X-Requested-With': 'XMLHttpRequest'
  };

  return axios({
    ...params,
    method: options.method,
    headers,
    url: options.remote ? options.url : `${process.env.REACT_APP_API}/api/${options.url}`,
    [dataParam]: options.data
  })
    .then(result => {
      return result;
    })
    .catch(err => {
      throw err.response.data.errors;
    });
}