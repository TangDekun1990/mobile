import { fetchEndpoint } from '../server/network';

// 
export const themePreview =
(theme) =>
fetchEndpoint(
  '/v2/ecapi.theme.preview',
  'POST',
  {
    "theme": theme, 
  }
)

// 
export const themeList =
() =>
fetchEndpoint(
  '/v2/ecapi.theme.list',
  'POST',
  {
  }
)

