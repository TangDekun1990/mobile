import { fetchEndpoint } from '../server/network';

// 
export const splashPreview =
(splash) =>
fetchEndpoint(
  '/v2/ecapi.splash.preview',
  'POST',
  {
    "splash": splash, 
  }
)

// 
export const splashList =
() =>
fetchEndpoint(
  '/v2/ecapi.splash.list',
  'POST',
  {
  }
)

