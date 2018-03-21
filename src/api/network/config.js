import { fetchEndpoint } from '../../network/network';

//
export const configGet =
() =>
fetchEndpoint(
  '/v2/ecapi.config.get',
  'POST',
  {
  }
)

