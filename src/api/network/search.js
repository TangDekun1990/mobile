import { fetchEndpoint } from '../../network/network'

export const getKeywords = () => fetchEndpoint('/v2/ecapi.search.keyword.list', 'POST')
