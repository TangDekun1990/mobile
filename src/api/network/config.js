import { fetchEndpoint } from '../../network/network';

//
export const configGet =
() =>
fetchEndpoint(
  '/v2/ecapi.config.get',
  'POST',
  {
  }
);

export const jssdkConfig = (url) => fetchEndpoint('/v2/ecapi.wechat.jssdkconfig', 'POST', {'url': url})

