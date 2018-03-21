import { fetchEndpoint } from '../../network/network'

export const categoryList = (shop, category, page, per_page) => fetchEndpoint('/v2/ecapi.category.list', 'POST', {
  'shop': shop,
  'category': category,
  'page': page,
  'per_page': per_page
})
