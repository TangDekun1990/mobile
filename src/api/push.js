import { fetchEndpoint } from '../server/network';

// 更新设备ID
export const pushUpdate =
(device_id) =>
fetchEndpoint(
  '/v2/ecapi.push.update',
  'POST',
  {
    "device_id": device_id, 
  }
)

