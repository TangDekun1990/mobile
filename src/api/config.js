import { fetchEndpoint } from '../server/network';

// 
export const configGet =
() =>
fetchEndpoint(
  '/v2/ecapi.config.get',
  'POST',
  {
  }
)

