import { fetchEndpoint } from '../server/network'

export const getKeywords = () => fetchEndpoint('/v2/ecapi.search.keyword.list', 'POST')