import { fetchEndpoint } from '../../network/network';

// 页面预览
export const cardpagePreview =
(name) =>
fetchEndpoint(
  '/v2/ecapi.cardpage.preview',
  'POST',
  {
    "name": name,  // 页面key
  }
)

// 页面详情
export const cardpageGet =
(name) =>
fetchEndpoint(
  '/v2/ecapi.cardpage.get',
  'POST',
  {
    "name": name,  // 页面key
  }
)

